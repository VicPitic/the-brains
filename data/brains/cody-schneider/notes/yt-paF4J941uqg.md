## What GTM engineering is and how Cody defines it

- GTM (go-to-market) engineering originally meant the cold email and outreach process. Clay (clay.com) "solidified or owned" the term.
- Cody says it is quickly expanding to everything related to marketing: customer experience, product, paid ads, SEO, and anything in the go-to-market process where AI does the engineering, software development and build-outs.
- It is all the "middle work" that used to be hands-on keyboard and mouse. The person's role becomes having the ideas, handing the middle work to Claude Code, then acting as "the polish, the endpoint".
- Cody frames the person as a conductor and curator of what the agents do.
- He says this is actual work getting done, not a skill: keyword research, writing the blog post and publishing it; researching Facebook ad angles, making and publishing the ads, then analyzing low and high performers.
- Cody has done marketing for over 15 years and is co-founder of graph.com, an AI data analyst for go-to-market teams.

## Setting up Claude Code as a GTM workspace (folder, env file, CLAUDE.md)

Cody says setup takes about 10 minutes:
1. Create a folder to work out of. His is "Graft Growth Agents"; for the demo he made a folder called "demo".
2. Open it in the Claude desktop app or the Claude terminal. Cody prefers the terminal so he can have multiple windows open and jockey between them.
3. In the terminal: `cd documents/demo`, then type `claude`.
4. Tell Claude to create an environment file (.env) in the directory and a CLAUDE.md file. The CLAUDE.md instructs: anytime he provides an API key, add it to the environment file so keys accumulate and can be reused in future.

- This is the foundation that lets Claude do the middle work for you.
- He dictates prompts with Super Whisper (transcription software), triggered with option + space.
- His real working folder already has all his stack's API keys stored, so Claude knows which APIs are available (for example Keywords Everywhere, Strapi, the Graph MCP).
- Cody's vision: open about five terminals at once and bounce between them, "jockeying the agents" while work gets done. During the demo he edited his video script while Claude worked in the background.

## Why Claude Code instead of Claude Cowork or n8n

- Cody says he would send people "immediately to this instead of Claude Co-work or n8n" for GTM work.
- His reasoning: Claude Code can do the actual work end to end (call APIs, write, publish), and the work extends into building personal software and personal agents to get your job done.
- He says everyone in a growth role will be affected by this, and that anyone who thinks their job won't be augmented is "getting high on your own supply".

## Demo: keyword research to published blog post in about 5 minutes

Workflow Cody runs in Claude Code:
1. **Keyword research:** "Use the Keywords Everywhere API and find all of the versus keywords you can" for the "Looker Studio vs Y" pattern (X vs Y keywords). Claude finds the API and returns the keyword list.
2. **Pick a target:** he chose "Looker Studio vs Metabase".
3. **Gather source material:** scrape what currently ranks on page one of Google for that keyword. His reasoning: Google is signaling "this is what we think a good search result looks like", so those pages are the model for what to write.
4. **Write:** prompt for a 1,500-word article based on that source material.
5. **Publish:** "Publish this article to our blog using the Strapi API." Graph uses Strapi as its CMS, but he says the same process works with Webflow, WordPress or anywhere content is published. The post went live on the site.
6. **Scale:** the same process can run for every keyword. He says to tell Claude to write and publish for each one.

## How to make AI-written content good, not slop

- Cody disagrees that this produces "AI slop": "that is a skill issue. You can 100% get good content to come out of this. You are just not providing it guardrails of what good content looks like."
- The demo version (scraped page-one results as source) is "pretty good, and these will rank".
- His higher-quality version:
  1. Have an AI interview you for about 30 minutes about the topic.
  2. Take that transcript, which holds your perspective, opinions and point of view.
  3. Combine it with the scraped page-one source material, your tone of voice, and a style guide.
  4. Have the AI write from all of it. He says this gives "an unbelievable piece of content".
- He argues people who say AI SEO content doesn't work are usually not refreshing or improving the content at all.

## Tracking and improving content with Graph, Google Search Console and the MCP

Cody's measure-and-improve loop:
1. **Dashboard:** in graph.com, connect the Google Search Console data source and ask it to make a dashboard for the "versus" campaign. It builds a line chart.
2. **Refine by prompting:** he asked for a scorecard of impressions for blog URLs containing "versus", then added clicks to the chart. Because clicks were far smaller than impressions, he said "Move clicks to the right side of the Y axis" (impressions left, clicks right).
3. **Share and filter:** the dashboard can be filtered daily, weekly or monthly and shared with the team via a link.
4. **Optimize from inside Claude Code via the Graph MCP:** prompt: "Use the Graph MCP and find the other versus articles in the blog... use the Google Search Console data connection and pull the top five versus pages. Find the keywords related to those pages and give me insights on how I can optimize them. Look at both the content and the data from Google Search Console."
5. Claude returns optimization recommendations based on his live data. Cody says he still can't get over it when this happens.

- This is how he says you can continuously improve marketing in parallel and handle reporting for all the go-to-market work.
- Graph offers a free 14-day trial with 10 seats for the team (this is Cody's own product).

## Cody's operating model: parallel agents and the middle-work handoff

- Expand your thinking beyond one article: any repeatable growth task (keywords, ads, publishing, analysis, reporting) can be handed to an agent and run across every item.
- Run several terminals in parallel, one agent per task, and spend your own time on ideas, direction and final polish.
- Store all API keys in one .env via CLAUDE.md so every new agent in the folder inherits the whole stack.
- Pair the doing (Claude Code publishing through APIs) with the measuring (Graph and Google Search Console via MCP) so content is refreshed based on data, not left static.
- Cody points people to gtmengineeringcourse.com, a free course and newsletter of tutorials from him and Graph on this workflow.
