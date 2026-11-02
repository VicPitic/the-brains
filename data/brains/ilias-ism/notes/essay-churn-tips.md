## Churn is a segmentation problem before it is a tactics problem

Ilias refuses to treat churn as one number ("Our churn is 8%. Cool. What kind?"). He splits it before fixing anything, because mixing causes leads to building the wrong fix.

- **Voluntary:** they chose to cancel.
- **Involuntary:** failed card or billing problem.
- **Bad-fit:** never matched the customer you serve.
- **Activation:** never reached a first meaningful result.
- **Value:** used it, understood it, still not enough value.
- **Success:** project ended or the job disappeared.

Matching fixes: if people can't connect Stripe, fix setup; if they don't want to pay, fix qualification; if the product is buggy, stop adding features and "fix the kitchen." Also segment by plan, acquisition channel, cohort and customer segment. 20% churn on impulse B2C users is a different problem from 20% on $500/month B2B accounts.

## Measure churn correctly or you celebrate nonsense

He warns that "churn dashboards can lie in a very polite font." He cites a founder whose churn dropped only because trials stopped being counted as active; that is a measurement cleanup, not a product win.

Track separately:
- Logo churn (share of customers lost)
- Revenue churn
- Net revenue retention (expansion minus contraction and churn)
- Trial-to-paid dropoff (often confused with churn)
- Cohort retention
- Plan-level churn (cheap monthly plans behave differently from annual or team plans)

Don't mix free trials, failed payments, one-off users and serious customers in one spreadsheet. Churn is not always bad: the goal is to reduce "avoidable churn from customers you actually want."

## Fix the product before the funnel

Ilias says the real churn fix is usually product quality, not a clever cancellation popup or retention newsletter ("if your product is leaky, newsletters are just scented candles on a house fire").

- People leave when felt cost (setup time, switching pain, bugs, confusion, dread of opening the app) exceeds value.
- The tempting move is adding more features, emails, discounts and AI. Churn often drops when you remove reasons for users to feel betrayed.
- Checklist: the core job works every time; first result is fast; users don't need support for basics; docs answer the top 20 confused-user questions; UI uses customers' words, not database words; bugs blocking value get fixed before new features ship.
- He points to Chatbase (a MagicSpace SEO client) and its founder Yasser's public focus on quality over "feature confetti," and its falling churn. The levers: fewer bugs, clearer setup, better docs, stronger activation, smarter pricing, human save calls for valuable accounts, cancellation feedback reaching product decisions, promises matching reality. "No magic sauce. Just fewer reasons to leave."
- For GenPPT, the retention question is whether a founder can paste rough notes and get a deck they'd actually send, not how many export formats exist.

## Onboarding: shorten time to value "until it feels almost rude"

Onboarding is "not a museum tour." Get users to the first real outcome with minimal choices. Examples: first usable deck, first ranked SEO opportunity, first resolved support conversation, the "oh, that's why revenue moved" moment.

- Simple product: self-serve onboarding. High-ticket or complex: get people on a call, but the call should complete setup and remove blockers, not be "customer success theater."
- Suggested first 14 days:
  - Day 0: welcome email, one login link, one goal, one 5-minute setup path.
  - Day 1: help complete the core action.
  - Day 3: show one advanced use case based on what they did.
  - Day 5: plain reply-to email asking if they got the promised result.
  - Day 7: value recap of what they created, saved, launched or fixed.
  - Day 14: invite to upgrade, add a teammate, or book help if stalled.
- The sequence should be "a guided shove toward the thing they came for," not a feature drip.
- Define the one action that predicts retention, rewrite onboarding around it, and cut every step that doesn't help reach it.

## Watch behavior before cancellation day

By the time someone clicks cancel they've usually been gone a while. Warning signs: setup never completed, a couple of logins then silence, only one feature used, repeated docs visits on one topic, frustrated tickets ("again," "still," "why," "broken"), usage drops after a failed export, integration or billing moment.

Blunt rules he suggests (no ML needed):
- No login for 3 days during trial: send a human-looking check-in.
- Zero projects created by day 2: trigger setup help.
- Same error twice: route to support before they ask.
- Billing page viewed three times: offer plan help or annual savings.
- Heavy usage but no upgrade: show ROI or the next limit.

Tools: Hotjar, Microsoft Clarity, PostHog. The aim is finding the moment the product made someone feel "dumb, blocked, or doubtful," like ten trial users stalling on the same "connect workspace" screen ("a tiny product crime scene").

## Stickiness without hostage-taking, and cancellation flows

Bad sticky is a cancel process hidden behind phone calls. Good sticky is saved context that would hurt to lose because it's useful: history, automations, team workflows, integrations, trained preferences, recurring reports, shared libraries, benchmarks over time. If canceling changes nothing in the customer's week, churn stays high.

His cancellation flow:
1. User clicks cancel.
2. Ask the main reason with honest options.
3. If the reason is confusion, missing setup, bug or price, offer the matching path.
4. If they still want out, let them cancel.
5. Send a short win-back or feedback email based on the reason.

- Reasons to collect: too expensive, missing feature, confusing, bug/quality, switched to competitor, no longer needed, project ended, wanted free plan, other (with required comment).
- The comment matters more than the category: "too expensive because I only needed one deck" is a packaging signal (sell a one-off credit pack), not a reason to discount.
- Don't overreact to one angry note; do react when ten people say the same thing.
- Worst flows: instant cancel with zero learning, and dark-pattern mazes.

## Talk to customers, use community carefully, send value recaps

- Lightweight customer contact: a monthly founder email asking "What almost made you cancel this month?", a Slack or Discord for power users only, monthly office hours, a 15-minute rescue call for high-intent accounts, a public changelog of fixes users asked for, a "Was this confusing?" prompt on docs and empty states.
- Support tickets are "churn research written by people who cared enough to complain." Close the loop by telling users when you fix what they reported.
- Community helps with examples, accountability, implementation help, benchmarks, templates and momentum. It is no substitute for clarity: "If users need a Discord to understand your app, your app is not community-led. It is confusing."
- Send value recaps instead of "we miss you" emails ("brand sadness in HTML"). Examples: 12 decks created, 6 hours of editing saved, 18 more keywords ranked, 320 support chats resolved, 43 trials generated. "People renew what they remember." Surface quiet background value or the customer only feels the invoice.

## Pricing as a bouncer, plus a 30-day cleanup plan

**Pricing:** cheap plans attract experimenters. A $9 plan may bring volume and feedback but also users who judge you like a free Chrome extension. Higher prices attract people with a real problem, budget and urgency, but raise expectations (no B2B prices with toy onboarding). "Think of pricing like a bouncer, not just a cashier."

Pricing audit questions: which plan and which acquisition channel churn worst; which plan creates the most support tickets per dollar; which customers expand; who complains about price before seeing value. Sometimes the fix is removing the plan that invites the wrong customer, not discounting.

**30-day churn cleanup:**
- Week 1, measurement: separate trial dropoff from paid churn; split by plan, channel, segment; pull the last 50 cancellation comments and tag them (fit, activation, value, price, bug, support, project ended, other).
- Week 2, activation: define the retention-predicting action, rewrite onboarding around it, send a day-3 rescue email to users who haven't done it.
- Week 3, cancellation: add reasons, offer save paths only when they match, route high-value confused users to a call, let the rest cancel cleanly.
- Week 4: ship one concrete fix for the most repeated reason (a confusing empty state, broken export, missing template, bad integration error, hidden docs page, pricing surprise), then tell users.

Closing line: "Fix the bucket. Then go buy traffic."
