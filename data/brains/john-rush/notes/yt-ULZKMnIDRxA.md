## Why John builds AI agents: replacing hired people with agents

- As a VC-backed founder, John built departments (content, sales, development) by hiring. He found hired people's work quality is lower than founders' work, and non-owners lose motivation. Giving equity to everyone didn't fix it for non-entrepreneurial people.
- His fix, since 2022: create artificial employees. Agents "work 24/7", are always motivated, scale infinitely and can keep being improved.
- He wants an organization of just him and agents. Full automation isn't possible everywhere. In development he still needs a coder to bring things to production. SEO had a clear path to 100% automation.
- His first agent was for coding, the second was SEO Bot. He built SEO Bot with a friend, shared demos on Twitter, and it went viral. It replaced the people who did that job in his own business.
- He is honest that agent output is lower quality than the best qualified people. But most startups can't hire or retain the best people, and against a junior or inexperienced hire the agent often does a better job.
- He says he is probably one of the first people running something sizeable who spends more on AI agents than on human labor.

## Three-step process for building an agent

1. **Prototype in Zapier.** Build a simple workflow, not really an agent. John acts as the interface, passing information to it and back, and watches everything it does so he can tune it. It is an internal tool and can't be given to users.
2. **Move to an agent-oriented no-code builder** (the chat-based, prompt-driven kind such as Lindy). Connect what was built in Zapier so users can use it and he can test a more real-world scenario.
3. **Hardcode it in regular code** (JavaScript, Python, built with tools like Cursor or Windsurf). You need to understand code even if AI generates it.

Why step 3: the agent is only a small part of the software. You also need user profiles, search, payments and other regular parts, which are easier in regular code. Making the agent smarter in builders ends with lots of custom code anyway. John cares about UX and the "wow effect" and wants to control every bit of the interface.

His view of the tooling: there are many tools for simple agents and none good for complex ones. Heavily funded tool companies work more on marketing, perception and simple cases than on serious agent building.

## Specialized agents beat general agents

- A general agent needs AGI-level intelligence because AI still makes many mistakes. In a specialized agent you know what to expect, so you can hardcode error catching.
- SEO Bot example: it generates blog articles. It also finds a master keyword, tests keywords for traffic through a paid-API vendor, and pushes articles to Framer or Webflow. A general agent wouldn't have those connections.
- Corner-case rule he hardcoded: only link to sites above a certain domain rating, never to low-rated ones.
- SEO Bot has been taught SEO for about three years and will keep being improved. A general agent with broad knowledge and no tight CMS or API connections can't compete.
- He compares it to software history. Microsoft built giant suites, then startups built one product at a time, much better.
- He predicts agents will decouple and get even more niche. In SEO, one agent only does blog articles and another only does on-page SEO. "The market will reward the agent that does only one thing really, really well."

## Agent-to-agent collaboration and payments

- John finds MCP interesting but thinks Google's agent-to-agent (A2A) protocol will be bigger because it is better thought through.
- In A2A, agents talk in natural language instead of JSON API calls. Each agent has an "agent card", like a CV. You browse a marketplace of cards, pick an agent and talk to it. He expects agents to be small and talk to each other.
- The main bottleneck is payment. If SEO Bot calls other agents, they should get a share of its revenue. He imagines a marketplace where an agent owner gets a monthly bill from other agents and pays a fraction of earnings.
- Nobody has done anything on this, and neither MCP nor A2A has it in the spec. He says they were built as if all agents are free, which they aren't.

## Building his own tool portfolio: distribution first

- Ideas are hard to predict; he says hits are partly luck. To cut the risk he is his own perfect customer: a solopreneur, not VC-backed, with a full-time or part-time job and little time for side projects.
- Building can be slow because no one is waiting for you. Distribution can't wait, because SEO and social following take months to build and benefit from time and effort put in early. So he automated distribution first, to let him relax and build while agents distribute his products.
- Listing Bot came from his own analytics. His first tool got traffic from directories, so he listed on more directories and traffic grew. He built Listing Bot so he doesn't spend days listing each of his 20-30 tools on directories. He describes directories as "pretty much free traffic almost instantly."
- His idea method: spot something that costs him time, automate it on autopilot, and keep the benefit (mainly distribution).
- Revenue from one tool funds the next. He spends little on building because he doesn't hire.

## Co-maker model: 50/50 with no salaries

- John finds a developer who is good at building but never succeeded because of weak distribution skills. They team up and own the product 50/50.
- There is no salary. They share revenue or profits, so his upfront cost is zero, with no funds to raise and no investors.
- He says nobody else does this at his scale. He expects it to become common: if you have good idea intuition, taste and distribution, raising money and hiring is the wrong move. Millions of developers want to build something great and don't know what to build.

## Distribution vs product, and validating ideas

- Code is no longer scarce, so distribution matters more. He knows of people who raised VC on a vibe-coded product. The last 5-10% (security, solidity) still needs a real developer.
- He holds two views at once: distribution is king, but the best products still win. User expectations are now far higher than three years ago.
- Two ways to win:
  - Great distribution. Risk: if people don't like the product they leave and churn is high.
  - A product so good users recommend it to friends. Then distribution comes through users, churn is near zero and growth is viral. He says too many people think distribution alone solves everything.
- Advice for non-coders: first ask what to build, not how, because "the quality idea defines everything." Steps:
  1. Validate the idea. Pay influencers to tweet it and link a waitlist, run paid ads to a waitlist, or DM people honestly asking whether he should build it.
  2. Scope down to the smallest MVP, one or two features.
  3. Build it with Lovable, Bolt, Replit or Windsurf. He has seen people do this, get paid users, get VC funding and then hire a developer. You have to be disciplined at every step.

## Predicting what's new, not what disappears; idea examples

- John doesn't bet on things disappearing. Habits are strong ("people are still cutting grass with a hand knife"), and he doesn't expect Google to disappear in 2, 5 or 10 years. Bet that everything still exists, then predict what new thing will appear and build early for it.
- His own example: in 2018 he predicted the rise of bootstrappers and solopreneurs and VC struggling, and built tools for that audience before it existed. Now millions want AI agents.
- AI search: chat products use Google or Bing search internally, so optimizing for Google is the same as optimizing for ChatGPT search. "Exactly the same."
- He says people wrongly think everything is built. He has hundreds of ideas and could produce millions. To find ideas, take a person in a specific situation (a parent, employee, athlete, someone who is sick), list their problems and automate solutions.
- Example ideas buildable in a weekend to a week:
  - A dog-owner app: log everything about the dog, and it advises on training, feeding and health. He has used AI himself to treat his sick animals instead of going to a vet, but ChatGPT needs a lot of context each time.
  - A personal-health app where you enter blood tests and biomarkers every six months and get an AI doctor view of progress. He would pay for both.
  - Build these per country (he is in Turkey), since they need to connect to local labs and formats.
- Filter: pick high-value things people already pay a lot for and automate them with AI.
