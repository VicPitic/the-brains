/**
 * Optional LinkedIn posts path for pipeline/linkedin.mjs.
 * The default actor stays harvestapi/linkedin-profile-posts.
 * Set THE_BRAINS_LINKEDIN_POSTS_ACTOR=johnvc/linkedin-posts-api to opt in.
 */

export const DEFAULT_LINKEDIN_POSTS_ACTOR = "harvestapi/linkedin-profile-posts";
export const OPTIONAL_LINKEDIN_POSTS_ACTOR = "johnvc/linkedin-posts-api";
export const LINKEDIN_POSTS_ACTOR_ENV = "THE_BRAINS_LINKEDIN_POSTS_ACTOR";

const POSTS_CAP = 200;

export function linkedInPostsActor(envValue) {
  if (envValue === OPTIONAL_LINKEDIN_POSTS_ACTOR) return OPTIONAL_LINKEDIN_POSTS_ACTOR;
  return DEFAULT_LINKEDIN_POSTS_ACTOR;
}

export function linkedInPostsInput(actorId, profileUrl, maxPosts) {
  if (actorId === OPTIONAL_LINKEDIN_POSTS_ACTOR) {
    const limit = Number(maxPosts);
    const cap = Number.isFinite(limit) && limit > 0 ? Math.min(POSTS_CAP, Math.floor(limit)) : 1;
    return { profileUrls: [profileUrl], maxPostsPerProfile: cap };
  }
  return {
    targetUrls: [profileUrl],
    maxPosts,
    includeReposts: false,
    includeQuotePosts: false,
  };
}

function handleOf(url) {
  const match = /\/in\/([^/?#]+)/i.exec(url || "");
  return match ? decodeURIComponent(match[1]).toLowerCase() : "";
}

function pipelinePost(item) {
  return {
    id: String(item.id),
    platform: "linkedin",
    url: item.linkedinUrl ?? item.socialContent?.shareUrl ?? `https://www.linkedin.com/feed/update/urn:li:activity:${item.id}/`,
    date: (item.postedAt?.date ?? new Date(item.postedAt?.timestamp ?? Date.now()).toISOString()).slice(0, 10),
    text: item.content,
    likes: item.engagement?.likes ?? 0,
    comments: item.engagement?.comments ?? 0,
    views: 0,
    isReply: false,
    isRetweet: false,
  };
}

function optionalPipelinePost(item, expectedHandle) {
  if (!item || item.result_type !== "post" || !item.postId || !item.text || !item.datePosted) return null;
  const handle = handleOf(item.authorUrl);
  if (handle !== String(expectedHandle || "").toLowerCase()) return null;
  return {
    id: String(item.postId),
    platform: "linkedin",
    url: item.postUrl || "",
    date: String(item.datePosted).slice(0, 10),
    text: item.text,
    likes: item.numLikes ?? 0,
    comments: item.numComments ?? 0,
    views: 0,
    isReply: false,
    isRetweet: false,
  };
}

export function linkedInPostsForPipeline(actorId, items, expectedHandle) {
  if (actorId === OPTIONAL_LINKEDIN_POSTS_ACTOR) {
    return (items || []).map((item) => optionalPipelinePost(item, expectedHandle)).filter(Boolean);
  }
  return (items || [])
    .filter((item) => item.type === "post" && item.id && item.content)
    .filter((item) => (item.author?.publicIdentifier ?? expectedHandle) === expectedHandle)
    .map(pipelinePost);
}

export function linkedInAuthor(actorId, items, expectedHandle) {
  if (actorId === OPTIONAL_LINKEDIN_POSTS_ACTOR) {
    const row = (items || []).find(
      (item) => item?.result_type === "post" && handleOf(item.authorUrl) === String(expectedHandle || "").toLowerCase(),
    );
    return { name: row?.authorName || null, info: row?.authorHeadline || null };
  }
  const row = (items || []).find((item) => item.author?.publicIdentifier === expectedHandle);
  return row?.author ?? {};
}
