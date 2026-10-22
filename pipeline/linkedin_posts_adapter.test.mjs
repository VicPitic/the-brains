import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  DEFAULT_LINKEDIN_POSTS_ACTOR,
  OPTIONAL_LINKEDIN_POSTS_ACTOR,
  linkedInAuthor,
  linkedInPostsActor,
  linkedInPostsForPipeline,
  linkedInPostsInput,
} from "./linkedin_posts_adapter.mjs";

const profileUrl = "https://www.linkedin.com/in/example/";

describe("linkedin posts adapter", () => {
  it("keeps the current actor and input unless the env value matches", () => {
    assert.equal(linkedInPostsActor(undefined), DEFAULT_LINKEDIN_POSTS_ACTOR);
    assert.equal(linkedInPostsActor("other/actor"), DEFAULT_LINKEDIN_POSTS_ACTOR);
    assert.deepEqual(linkedInPostsInput(DEFAULT_LINKEDIN_POSTS_ACTOR, profileUrl, 400), {
      targetUrls: [profileUrl],
      maxPosts: 400,
      includeReposts: false,
      includeQuotePosts: false,
    });
  });

  it("sends profile URLs and a capped per-profile maximum when opted in", () => {
    assert.equal(linkedInPostsActor(OPTIONAL_LINKEDIN_POSTS_ACTOR), OPTIONAL_LINKEDIN_POSTS_ACTOR);
    assert.deepEqual(linkedInPostsInput(OPTIONAL_LINKEDIN_POSTS_ACTOR, profileUrl, 400), {
      profileUrls: [profileUrl],
      maxPostsPerProfile: 200,
    });
  });

  it("maps the current actor onto the pipeline post fields", () => {
    const posts = linkedInPostsForPipeline(DEFAULT_LINKEDIN_POSTS_ACTOR, [{
      type: "post",
      id: "1",
      content: "hello",
      linkedinUrl: "https://www.linkedin.com/posts/example",
      postedAt: { date: "2026-01-02T00:00:00.000Z" },
      engagement: { likes: 3, comments: 1 },
      author: { publicIdentifier: "example", name: "Example" },
    }], "example");
    assert.equal(posts.length, 1);
    assert.equal(posts[0].id, "1");
    assert.equal(posts[0].text, "hello");
    assert.equal(posts[0].url, "https://www.linkedin.com/posts/example");
    assert.equal(posts[0].date, "2026-01-02");
    assert.equal(posts[0].likes, 3);
    assert.equal(posts[0].comments, 1);
    assert.equal(linkedInAuthor(DEFAULT_LINKEDIN_POSTS_ACTOR, [{
      author: { publicIdentifier: "example", name: "Example" },
    }], "example").name, "Example");
  });

  it("maps an optional post row and drops an error row or a different author", () => {
    const items = [
      {
        result_type: "post",
        postId: "",
        postUrl: "",
        text: "",
        authorName: "",
        authorHeadline: "",
        authorUrl: "https://www.linkedin.com/in/example",
        datePosted: "",
        numLikes: 0,
        numComments: 0,
      },
      { result_type: "error", error_type: "CollectionError", error_message: "none" },
      {
        result_type: "post",
        postId: "other",
        text: "nope",
        authorUrl: "https://www.linkedin.com/in/someone-else",
        datePosted: "2026-01-03T00:00:00.000Z",
      },
    ];
    assert.deepEqual(linkedInPostsForPipeline(OPTIONAL_LINKEDIN_POSTS_ACTOR, items, "example"), []);
    const kept = linkedInPostsForPipeline(OPTIONAL_LINKEDIN_POSTS_ACTOR, [{
      result_type: "post",
      postId: "post-1",
      postUrl: "https://www.linkedin.com/posts/example",
      text: "hello",
      authorName: "",
      authorHeadline: "",
      authorUrl: "https://www.linkedin.com/in/example/",
      datePosted: "2026-01-02T03:04:05.000Z",
      numLikes: 0,
      numComments: 0,
    }], "example");
    assert.deepEqual(kept, [{
      id: "post-1",
      platform: "linkedin",
      url: "https://www.linkedin.com/posts/example",
      date: "2026-01-02",
      text: "hello",
      likes: 0,
      comments: 0,
      views: 0,
      isReply: false,
      isRetweet: false,
    }]);
  });
});
