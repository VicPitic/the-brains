// Step 1c: pull a person's recent LinkedIn posts and profile through Apify (no cookies).
// harvestapi/linkedin-profile-posts costs $0.002 per post; the profile lookup is about $0.004.
// Usage: node pipeline/linkedin.mjs <slug> [maxPosts=400]
// Needs `linkedin` (the profile's public id, e.g. "ruben-hassid") in pipeline/people.json.
// Merges into candidates.json `posts` (platform "linkedin", deduped by id) and sets `linkedinProfile`.
import { join } from "node:path";
import { apifyRun, brainDir, loadPerson, readJson, writeJson } from "./lib.mjs";
import {
  OPTIONAL_LINKEDIN_POSTS_ACTOR,
  linkedInAuthor,
  linkedInPostsActor,
  linkedInPostsForPipeline,
  linkedInPostsInput,
} from "./linkedin_posts_adapter.mjs";

const [slug, maxPostsArg] = process.argv.slice(2);
if (!slug) throw new Error("Usage: node pipeline/linkedin.mjs <slug> [maxPosts]");
const person = await loadPerson(slug);
if (!person.linkedin) throw new Error(`${slug} has no "linkedin" id in people.json`);
const maxPosts = Number(maxPostsArg ?? 400);
const profileUrl = `https://www.linkedin.com/in/${person.linkedin}/`;

const postsActor = linkedInPostsActor(process.env.THE_BRAINS_LINKEDIN_POSTS_ACTOR);
const [items, profiles] = await Promise.all([
  apifyRun(postsActor, linkedInPostsInput(postsActor, profileUrl, maxPosts), 600),
  apifyRun("harvestapi/linkedin-profile-scraper", { profileScraperMode: "Profile details no email ($4 per 1k)", urls: [profileUrl] }, 120).catch((error) => {
    console.warn(`profile lookup failed: ${error.message}`);
    return [];
  }),
]);

const posts = linkedInPostsForPipeline(postsActor, items, person.linkedin);

const author = linkedInAuthor(postsActor, items, person.linkedin);
const profile = profiles[0] ?? {};
const linkedinProfile = {
  id: person.linkedin,
  url: profileUrl,
  name: author.name ?? ([profile.firstName, profile.lastName].filter(Boolean).join(" ") || null),
  headline: profile.headline ?? author.info ?? null,
  about: profile.about ?? null,
  followers: profile.followerCount ?? profile.followersCount ?? profile.followers ?? null,
  avatar: author.avatar?.url ?? profile.photo ?? profile.profilePicture?.url ?? null,
  website: author.website ?? null,
};

const path = join(brainDir(slug), "candidates.json");
const candidates = await readJson(path);
const known = new Set(candidates.posts.map((p) => `${p.platform ?? "x"}:${p.id}`));
const added = posts.filter((p) => !known.has(`linkedin:${p.id}`));
candidates.posts.push(...added);
candidates.counts.posts = candidates.posts.length;
candidates.counts.linkedinPosts = candidates.posts.filter((p) => p.platform === "linkedin").length;
candidates.linkedinProfile = linkedinProfile;
candidates.linkedin = {
  ranAt: new Date().toISOString(),
  returned: items.length,
  added: added.length,
  estUsd: postsActor === OPTIONAL_LINKEDIN_POSTS_ACTOR ? null : +(items.length * 0.002 + 0.004).toFixed(2),
};
await writeJson(path, candidates);
console.log(slug, { ...candidates.linkedin, profile: { ...linkedinProfile, about: linkedinProfile.about?.slice(0, 60) } });
