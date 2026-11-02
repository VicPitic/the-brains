## Why most SaaS products fail, and why Simon builds a factory

- Simon says SaaS has become very competitive, and going all in on a single SaaS is risky.
- For a beginner on a first product, he says failure is "statistically overwhelmingly likely... almost a guarantee."
- Amazon, Google, Apple and Microsoft each have a "massive graveyard of failed products", much bigger than their portfolio of successes.
- The most successful indie hackers are successful because they have "been pushing and failing more and faster than most other people."
- His answer is to test the market constantly with new ideas, which needs tooling that makes it sustainable.
- A SaaS Factory makes it easier and faster to test and launch new products and take them to market.
- He built 8base, FeedHive, LinkDrip and other products in his factory.

## Room 1: a code library of packages, templates and boilerplates

- Simon keeps a GitHub organization full of reusable packages, such as custom utilities, list manipulation, themes, common Stripe operations, login, user permissions, subscriptions, workspaces and team management.
- Every new project goes out on the same tech stack: React, Chakra UI, AWS and Pulumi.
- A full-stack SaaS boilerplate (backend, front end, authentication, payments and a basic UI) lets him spin up a working SaaS in under 30 minutes.
- His team also built a small CLI that asks a few questions and choices at project start, then generates the new SaaS.
- How to build it:
  - Stop regularly, go through your code and pick out pieces you are fairly sure can be reused.
  - Refactor them into general-purpose solutions.
  - Push each to a GitHub repository and publish it as an npm package.
  - Write a good README with documentation and getting-started instructions ("be nice to future you").
  - Turn boilerplate repositories into GitHub templates so a new repo is one click.
- Simon says indie hackers tend to under-prioritize staying organized in the heat of building.
- Maintenance is real: you must keep packages updated and compatible with each other (he jokes about a SaaS breaking because the Chakra version was out of date).
- His argument: once this room is running, it saves "hundreds if not thousands of hours" on engineering, probably the most expensive part of a SaaS business.

## Room 2: a no-code automation library

- Simon says it isn't code versus no-code; a proper factory needs both.
- He uses Zapier and Make for backend operations that involve third-party tools:
  - adding new users to retargeting lists for Facebook and Google
  - segmenting users into lists for email drips
  - writing product updates in Notion and pushing them to FeedHive to share on social media
  - adding each new sign-up/sale to a spreadsheet for financial planning
- These are things not directly tied to the app's backend.
- Tactic: Zapier's integration platform lets you build private custom integrations.
  - Private integrations don't need approval from the Zapier team, and are free.
  - Hook them to your own APIs and use them in your own Zapier account.
  - Build a custom integration once and reuse it for every new SaaS, instead of spending hours on complex automation each time.
- Combined with the GitHub packages and boilerplates, a new SaaS means installing an npm package and using a custom Zap.
- It takes time to learn and set up initially, "that's the whole point of a factory: it's time-consuming once and fast in the future."

## Room 3: a creative library of reusable graphics and video templates

- Simon stores reusable images, graphics and video templates for thumbnails, ad creatives, social media graphics, video demos and video ads.
- His reasoning: "Getting stuck creatively is horrible," so whenever he needs something new he picks up a template.
- Tools:
  - Figma for images: use components to build template graphics with variants so new graphics can be composed easily. Also build a library of reusable parts such as fonts, scribbles, characters and icons.
  - Adobe After Effects for video: turn animations and clips into Essential Graphics with customizable layers, then adjust them in Adobe Premiere when editing.
- These serve as building blocks to speed up editing.
- He stresses keeping it nice and organized, because the factory is about making future life easier.
- If you don't want to set this up yourself, he notes you can buy a ready-made version, but see the next section for why that is risky.

## The lesson from buying a ready-made SaaS factory

- Simon once bought a ready-made SaaS factory in a hurry to get his first SaaS started. The seller said it had everything and he could start printing SaaS products right away.
- He had no idea how to operate it, and the manual was extremely poorly written. He spent a lot of money on it, got frustrated, pressed a button, something went wrong and it all "burned to the ground."
- At his most demoralized, he decided to build a new factory from scratch, planning how it would work in detail.
- Because he built it himself, he knew it "inside and out", and it did not fail on him.
- His argument: using someone else's factory and expecting the same results "is most likely going to end in disaster."
- What gives you superpowers is the process of building the factory: "all the hard-earned lessons that make up the foundation you're building on... it's not something you can buy."

## Protocol: checklists, setup requirements and documentation

- Every new SaaS needs a checklist of setup requirements: payment system, email system, user authentication, privacy policy, terms and conditions, and so on.
- Simon suggests using Notion for this:
  - save all legal documents as templates
  - keep checklists for all parts of SaaS development
  - cross off everything on the list every time you set up a new SaaS
- He treats this as quality control.
- Document all parts of the factory and describe all processes so you don't end up confused and forgetting what to do.

## The playbook: play the same game again and again

- A playbook goes beyond the factory: a framework of practices and strategies, a rule set you follow to plan and execute each SaaS.
- Simon says most successful serial entrepreneurs and indie creators "tend to play the same game again and again."
- He follows the same playbook himself in how he launches and markets his products.
- He deliberately refuses to sell his playbook or factory, saying he's "not some snake oil salesman." Even though it works for him, it is highly unlikely to work the same for you.
- Takeaway: build your own factory, playbook and protocol, because the lessons from building them are the asset.
