## Why DHH left the rental cloud: the promises did not hold

- DHH says 37signals had been on the cloud for over a decade (S3 early, then compute clouds). Its fundamental promises never materialized: more with less complexity, lower cost, faster execution, smaller teams.
- He says they could not run with a smaller team or at lower cost. The one real advantage was spinning up "a hundred beefy machines" with a snap of the fingers, which he calls unique but very expensive, and not worth the premium for a stable, profitable company with predictable demand.
- hey.com (the email service launched a couple of years earlier) was running entirely in the cloud and performed fine. The disappointment was economics and the broken promises, not availability.
- He was once a "cheerleader" for the cloud inside the company. He bought the pitch that running your own hardware is like running a generator in your backyard instead of buying from the grid, and calls it a trillion-dollar argument. It took years to deprogram.
- He compares the situation to the emperor's new clothes: many people can't see the magic of the cloud but stay quiet because they assume everyone else does. He says 37signals is playing the little boy who says "he's naked."

## The cost trigger: 2022 numbers and the savings math

- Philosophy came first; cost was the tipping point. When he ran the numbers, he says, "this is absurd."
- 37signals spent $3,201,564 on cloud in 2022, more than a quarter of a million dollars per month.
- About $2.4M of that was managed services (EKS, RDS, OpenSearch, ElastiCache). Half a million dollars went to RDS (managed database) and just over half a million to OpenSearch (managed logging and search).
- About $900K went to S3. He calls S3 the best-priced service and the most cumbersome to replace, partly because egress costs to get data out are "so astronomical."
- Their napkin calculation: the $2.4M could be cut to under $900K, including buying replacement gear, amortizing it over five years, and paying for hosting. He calls that "almost misdirectingly conservative."
- He thinks the real figure is closer to $2M a year saved, taking a $2.4M budget to roughly $400K. The stated target was at least $1.5M a year saved, possibly more.
- He calls $1.5M a year of extra bottom line "very material" for a medium-sized SaaS company.
- His advice is not to take his word: run your own numbers. 37signals published a full accounting of its cloud spend per application and per service.

## Why hardware economics shifted

- Hyperscalers were supposed to buy hardware far cheaper and pass the savings on through lower prices. He says the opposite happened: services got more expensive, especially cloud-native managed services (managed databases, managed search).
- The cloud peaked while Intel stumbled, with roughly five years of CPUs that barely improved in performance per dollar.
- In the last three to five years ARM (Apple in particular) and TSMC advances have made computers much faster. Comparing cores and speed from a vendor like Dell against cloud pricing gave a "staggering" gap.
- He regrets not running that comparison two and a half to three years earlier. Faith in the cloud being the future made the spell hard to break.
- He says AWS is the most profitable part of Amazon, generating about $40 billion a year in profit, and "those profits don't come from nothing."

## Centralization and the philosophical objection

- DHH says he was already down on big tech owning everything, starting with the app store duopoly (Apple and Google) and what it did to innovation. The web is a permissionless platform; mobile stores require begging a corporation for permission.
- Cloud consolidation undermines the internet's decentralized design. When AWS US-East-1 goes down, a large part of the internet goes offline. He says DARPA designed a system meant to survive nuclear attack.
- Handing all computing to three companies destroys that design, which he calls "utterly tragic."

## What a cloud exit actually involves

- 37signals ran its own hardware in colocation alongside the cloud, so it knew how to buy and operate hardware. He says the industry has a "general amnesia" about this and has been scared into thinking you aren't smart enough to run your own servers.
- Cloud exit does not mean building your own data center. Below the scale of Meta, Apple and Google, nobody does. You rent space in a colocation facility and own the hardware inside it.
- Colocation is similar to the rental cloud experience, but lead time is a few weeks to receive and rack machines instead of minutes.
- Network and power are shared infrastructure either way. No one owns their own transatlantic cables. His line: own the core competencies and core infrastructure, not homestead with no connection to society.
- Two data centers were enough for 37signals. Adding a third would not be materially more complicated, and backup and coordination between sites works the same in a rental cloud or a sovereign one.

## Sovereign cloud and the migration

- He prefers the term "sovereign cloud" to "private cloud" (which he associates with CIO white papers): you still use containers, VMs and the same stack, but you own the footprint.
- The cloud runs the same software everyone else does (Postgres, MySQL, Redis, containers). It has no special magic, only marginal extras such as automated backups.
- Work done to make apps cloud-ready carries over. Stateless app servers, shared state kept elsewhere, and containerized apps move to owned hardware just as well. Getting into the cloud took years; getting out was very fast.
- 37signals had seven cloud applications at the start of 2023. The move started in earnest in January and was due to finish around the end of May. The original Basecamp had been pulled out the previous week, and performance was better after leaving.
- The one new tool they built is MRSK (mrsk.dev), a deployment wrapper around Docker. He says Kubernetes suits running a large rental cloud but is horrendously complicated for a medium-sized company running a sovereign cloud.
- The plan was to leave S3 as the only lingering cloud footprint by the end of summer, and eventually reach zero spend on the rental cloud.

## Who should do the math, and banks as the example

- DHH says "software is eating the world": a bank today is a software company, since its value is in operating software, not branches. Operating software is a core competency to keep in-house.
- His advice targets companies buying hundreds of thousands or millions of dollars of compute directly from rental clouds. Mere users of a SaaS product like Basecamp are not the audience.
- He says a bank that can't do a financial rent-versus-buy analysis, or can't amortize hardware over five years, is one he would not trust with his money.
- Banks have boring, predictable demand with no sudden spikes of millions of customers (KYC throttles growth), so they fit owned hardware well.
- He argues the rent-versus-buy break-even clicks in around five years of amortization for stable businesses.
- He calls hybrid setups "soft pedaling." He says run the math yourself, and expects most stable businesses to find zero rental cloud dollars is the answer. File storage like S3 is the likeliest exception for those without philosophical objections.
- Bank technologists are herd animals: many probably knew the math didn't add up but followed consultant hype. He expects the pendulum to swing back and conservative businesses to revisit cloud decisions.
