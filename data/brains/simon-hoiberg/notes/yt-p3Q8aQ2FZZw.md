## Giving an AI agent real business data to find the true ICP

Simon argues the standard advice ("use AI for execution, keep judgment for the founder") no longer holds. He now runs three continuous AI audits where the agent decides what to focus on, fix and test next.

- **The ICP audit starts from real signals, not persona brainstorming.** Asking ChatGPT for a persona gives "generic founder BS".
- **The agent needs three inputs:**
  - The payment signal (Stripe or the billing platform), which shows who stays long enough to matter.
  - Product behavior from the database, even if analytics tracking is imperfect.
  - Customer context, such as what the company does, usually visible from the website behind the user's email domain.
- **Why AI beats the founder here:** founders look at Stripe, dashboards and support in separate pieces. The agent connects payment, behavior and context at once and shows which customers look alike.
- **The simple version:** give the agent Stripe and read-only database access, let it enrich users from their domains, websites and support history, then ask which customers get the most value and how to find more of them.
- **Read-only database access is enough.** The agent can query raw tables even when tracking was never finished.

## FeedHive: the ICP was more technical than assumed

Simon ran the ICP audit on FeedHive using mostly raw database data rather than the formal tracking setup.

- **His assumed ICP:** social media managers, agencies and small businesses wanting a clean UI to schedule content. These users exist, so it wasn't wrong.
- **What the audit found:** many of the strongest users are more technical. These are startup teams, founders and technical marketers who want social media plugged into a larger automation workflow. They are comfortable with APIs, MCPs and agents, and care about connecting FeedHive to the rest of their operating system.
- **Implications he drew:** the landing page, the ad angle and the first features shown to new users might all need to change for this segment.
- **The loop he runs with agents:** audit, hypothesis, experiment, validation. The research agent turns its findings into a landing page version for the segment, a few ad angles, a campaign structure and the metrics to judge it by.
- **Agent setup:** agents that code, agents with direct access to his Google and Meta ad accounts, and an ICP research agent that feeds them.

## Churn audit: reconstruct the journey, don't summarize the cancellation reason

- **Cancellation reasons are a thin version of the truth.** They show how the customer explained the decision at the end, not what caused it. Causes can include slow time to value, signing up for the wrong thing, a landing page attracting the wrong customer, or getting stuck in onboarding.
- **The problem is fragmentation.** The cancellation form, support conversations, product usage and the pre-signup promise (ad or landing page) each tell part of the story.
- **His goal for the agent:** reconstruct the customer journey around churn rather than summarize churn reasons.
- **His 8base setup** (an AI-powered support tool he and his team run):
  - Support emails go into 8base.
  - Each app has an in-app support page that creates tickets.
  - An 8base form replaces Stripe's generic cancellation question and collects the churn reason before the customer cancels.
  - The embedded form sends context with each ticket: who the user is, which account, what they last did in the app.
- **Without a full agent setup:** export the support data from 8base as a CSV and let ChatGPT or Claude analyze it.

## Separating wrong-fit churn from product-failure churn

Simon wants the churn agent to do one simple thing: split customers who were probably never a good fit from customers who should have succeeded but didn't. These are different problems.

- **Wrong customers leaving** points back to positioning, ads or the promise made before sign-up.
- **Right customers leaving** points to where the product failed them: confusing onboarding, never reaching the first useful result, or support seeing the same issue repeatedly without it becoming product work.
- **The simple version:**
  1. Get cancellation feedback and support history into one place.
  2. Add product context around each customer.
  3. Have the agent compare that with what they did in the product before leaving.
  4. Have it prepare the next fix: an onboarding step, a support article, a product fix or a positioning change.

## Opportunity audit: find new SaaS ideas from repeated buyer pain

- **Ideas come from repeated market signals, not brainstorming.** Examples: a customer asks for an integration, a community says existing tools are too complicated, a review says one workflow is still painful. Simon did this manually for years by looking at products people already pay for and finding where users are clearly unhappy.
- **Don't ask ChatGPT for 20 SaaS ideas.** He calls the result generic "micro SaaS garbage ideas that everyone else gets".
- **Agent inputs:** categories to watch, competitors and adjacent tools near his portfolio (for example near FeedHive, 8base and the business systems he has built), and the products he already runs.
- **Where it collects signals:** review sites (G2, Capterra, Trustpilot), Reddit threads, comparison pages, comments and competitor communities.
- **What it looks for:** repeated complaints, missing workflows, integration requests, pricing complaints, and awkward workarounds where people stitch several tools together.

## Filtering ideas by portfolio fit and preparing validation

- **Fit filter:** the agent checks whether an idea serves a customer he already understands, sits close to an existing product, connects naturally into the portfolio, and can be validated with his existing audience.
- **Principle:** "the best idea is not always the biggest market." Sometimes it is the one you can test fastest because you have an unfair advantage around it.
- **Validation step the agent prepares:** a simple landing page, a waitlist form, a few ad angles around the pain point, and a clear metric for whether people care.
- **The simple version:** give the agent categories, nearby competitors and your products. Ask it to find repeated buyer pain, rank opportunities by pain and portfolio fit, and prepare one small validation test for the best idea.

## AI as an advisor inside the business

- Simon used to see agents as useful only when he already knew what he wanted done. With enough real business context, they can now look at the situation, say what is going on, and point toward the next decision.
- **Why:** the agent can hold more messy context than he can.
- **His guardrails:** start read-only, and decide where approval is required before anything goes live.
- His conclusion: founder judgment is no longer completely off-limits to AI. With the right context, an agent can help run the business at a higher level.
