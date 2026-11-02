## Running an AI-native company: the video production pipeline

Simon's rule: the ideas and opinions stay human, and AI does the production. He says nothing has moved his business more consistently over five years than video (YouTube plus social, putting his face behind the products). He used to spend "hundreds, maybe even thousands of hours editing" and had people on research, strategy, editing and thumbnails.

- **Script first.** He talks to his agents by voice, spills the argument and nuance, and an AI script writer structures it. If AI invents the ideas you get "generic AI slop." Every line has to sound like something he would say.
- **Record to the script.** He follows it almost word for word on a teleprompter, which takes practice.
- **Script as map.** A transcription model returns every word with a timestamp. The editing agent matches the recording to the script and finds fail takes, restarts and the right take.
- **Editing stack.** DaVinci Resolve is scripted and controlled by agents (computer use only when needed). Remotion handles most motion graphics, Blender is used for 3D, and AI-generated visuals are used when they fit. A library of reusable components and Fusion templates is built against exact script lines.
- **QA loop.** The AI team reviews exports for broken renders, bad graphics and pacing, and sends problems back to the agent that made them. He then spends about 30 minutes on a final polish in Resolve.
- **Distribution.** Done through FeedHive (one of his products), which connects to Claude Code and OpenClaw via REST API and MCP. Agents prepare posts and media, schedule, and he reviews the plan before anything goes out.
- **Weekly output:** one long-form YouTube video, three clips for Twitter/LinkedIn, and three Shorts/TikToks/Reels.

## AI coding: discipline, harnesses and self-hosting

Simon runs a portfolio of four SaaS products (tens of thousands of users, seven figures in yearly revenue). He warns AI coding is a double-edged sword: "complete utter garbage software and slop websites" are everywhere, and it "requires discipline."

- **Infrastructure.** He moved from AWS (DynamoDB, Lambda, Fargate; expensive and locked in) to self-hosted Docker, Kubernetes and Postgres, with AI help.
- **AI as 24/7 DevOps.** Agents watch the cluster, detect anomalies and often fix them before users notice. Setup: a privileged Ubuntu user with a Kubernetes role, and agents SSH in with it to run commands.
- **Team change.** The dev team went from four (including him) to him plus one human dev. Neither writes code, and "we barely even read code anymore." They act as product managers: plan features, talk to users, set the roadmap, make architecture decisions and review.
- **QA gates.** Agents use browser automation like Puppeteer. Work needs automated tests plus screen recordings from agents proving the feature works before it reaches production.
- **Making the codebase agent-friendly.** Moving fragmented code into monorepos (which he "used to hate"), plus linting, eval rules and change locks the agents can access.
- **Takeaway:** spraying code with AI is not leverage. The advantage comes from the harness, QA and guardrails, which large engineering teams can't easily copy.

## Paid ads run by agents

Early FeedHive marketing was Simon sharing builds on Twitter, but that keeps you in the "founder bubble." Paid ads reach cold audiences and quickly show whether people care, but they are a lot of work (offer, creatives, setup, tracking, new versions).

- **Weak-signal risk.** "If you optimize for a weak signal, Meta will happily find thousands of people who produce more of that weak signal." Asking an agent for 50 headlines from a landing page is "almost completely useless"; creatives are the easiest part.
- **Setup.** Agents connect via the Google Ads API (developer token) and Meta API (access token), with exposed actions, budget limits and campaign rules. Bigger changes need his approval.
- **Context given to the agent:** the offer, audience, landing page, previous creatives, and the post-click events that matter.
- **Creative production.** Remotion and HeyGen templates let the agent swap hooks, footage, text, screenshots and CTA, then render for each placement. When a human is needed, he records on his phone.
- **Example: the Founders Stack campaign.** Two phone-recorded videos: one for cold audiences, one for skeptical visitors doubting a lifetime deal across four SaaS products. Agents built the Meta ads with separate audiences, exclusions, tracking and copy.
- **Analysis.** Agents pull Meta and Google data and compare it with his own backend: click, trial, purchase, real usage. With FeedHive they compared Meta against Google Search and Performance Max, found wasteful search terms, added negative keywords, and separated curiosity signups from people with a real problem.
- **Loop:** pause a variation, make three more hooks, remove terms, scale a test. He approves large changes, and the agent applies them. This replaces handoffs between copywriter, editor, media buyer and analyst.

## Personalized outreach through Gmail

Simon likes direct outreach for testing an offer early: no audience needed, just find the right people and see the reply. Manual work is heavy, and big Apollo/Clay/Instantly/Zapier stacks often end up as "spam with more software involved."

- **Setup.** Connect Gmail via API, give the agent the offer, target company type and campaign rules, set hard sending limits, and put sensitive actions behind approval.
- **Research first.** The agent uses Puppeteer and web search to find companies, their customers and products, and why the offer is relevant. If it can't explain the fit in plain English, "the email just doesn't go out."
- **Slow and case by case.** No big lists or blasts. The research becomes the message, and the agent sends from Gmail within the limits.
- **Replies.** The agent reopens the original thread with the offer, research, sent email and reply in front of it, so follow-ups reflect the real conversation. He takes over when a reply crosses an approval rule.
- **Safeguards:** narrow permissions, a hard sending ceiling, and a separate approval step for anything sensitive.
- **Tradeoff:** it won't scale as far as outbound stacks, "but it also doesn't have to." Quality emails to vetted leads beat spam.

## Support as an agent workflow

Simon says the support inbox tells you what is actually wrong with the business, and it catches bugs, confusing decisions and annoyances. But support gets expensive: a hard ticket moves from frontline to technical support to a developer and back, with the account re-explained at each handoff, and "a strange ticket can eat up half a day."

- **Agent capability.** Six months ago such jobs often failed halfway (lost context, bad calls). Now an agent can use tools, inspect logs and traces, investigate, and keep working until the ticket is resolved.
- **Tooling.** He uses AbBase (his own product), which connects to OpenClaw, Hermes, Claw Code or other agent setups through a full API for the support workflow.
- **In-app forms.** Each product has an in-app support form that can ask for product-specific details and attach existing customer and account data. The agent gets the message, form data, customer history and account.
- **Resolution path.** The agent pulls logs and traces, reproduces the problem, follows the evidence into the codebase, prepares the fix, runs tests, and in many cases ships it and replies, "without any human involvement." The conversation stays in one ticket, and the agent asks the customer for missing info there.
- **Pattern detection.** One agent handles all conversations, so it spots the same bug in different wording, confusing workflows and small frustrations, and shows what to fix or redesign.
- **Results:** customers report "higher satisfaction than ever before," and the agent does work that used to occupy several full-time employees.

## Small AI-native team as a bootstrapping advantage

Simon went from 11 people to three (himself included). Under tight human supervision, his agents plan, execute and run most of the business. He says a large team is "straight up a disadvantage," and that running "a highly efficient small AI native team is the biggest business opportunity you get right now."

- **Human roles that remain:** deciding what to say, recording the video, approving results, product management, architecture decisions, and approving sensitive actions.
- **Pattern across every function:** give agents API/tool access, business context, hard limits and approval gates, then review evidence-backed recommendations.
- **Caveat:** "It's not for everyone and it's not always as easy as some people make it seem."
- **Lifetime-license model.** His tools (FeedHive for social, AbBase for support) are sold as one-time lifetime licenses with no monthly subscription, bundled at foundersstack.pro.
- **Advice:** give your AI the video link plus his full list of tools, models, versions and harnesses, and ask how to apply the ideas to your business.
