## The Majestic Monolith as the default architecture

- DHH argues the vast majority of web applications should start life as a Majestic Monolith: "A single codebase that does everything the application needs to do."
- This contrasts with a constellation of services, whether micro or macro, that carves the application into little islands each doing a piece of the work.
- He says the vast majority of applications will be served well by the monolith for their entire lifespan.
- The limits of the pattern are "much higher than most people like to imagine when they fantasize about being capital-a Architects."
- He expects the pendulum to swing back as more people realize the chase for microservices "ended in a blind alley". The monolith is waiting for "microservice refugees".

## When a monolith may need help, and what to try first

- Two situations he names where a monolith might need support:
  - Very large teams that constantly trip over each other. He adds that many very large organizations use the monorepo pattern, so size alone is not proof.
  - Performance or availability problems under extreme load that cannot be fixed within the monolith's technology choices.
- His rule: the first instinct should be to improve the Majestic Monolith until it can cope.
- Only after having tried that and failed should you look to the next step.
- The next step is the Citadel, not a wholesale carve-up into services.

## The Citadel pattern: a monolith at the center with Outposts

- The Citadel keeps the Majestic Monolith at the center, supported by a set of Outposts.
- Each Outpost extracts a small subset of application responsibilities.
- Outposts let the monolith offload a slice of divergent behavior for organizational, performance, or implementation reasons.
- The key contrast with microservices: you extract a single Outpost, not the whole app. "We didn't try to carve the entire app up into little services, each written in a different language."
- The Citadel is there to give peace of mind that the pattern will stretch if an app ever hits "that jackpot of becoming a mega-scale app".

## Case study: Campfire's polling Outpost at Basecamp

- Campfire, Basecamp's old chat app, was built in 2005 when Ajax was still novel, so it used polling rather than persistent connections.
- Every connected client fired a request every three seconds asking "are there any new messages for me?".
- Most replies were "no", but each still required authenticating the request and querying the database.
- That service had very different performance characteristics from the rest of the app: roughly 99% of all requests at any given time.
- It was also a very simple system. In Ruby it was, by his recollection, about 20 lines. That made it a perfect Outpost candidate.
- Because it could usually be written in a few hundred lines in any language, rewriting this Outpost in high-performance languages became a hobby. It was written in C, C++, Go, Erlang, and a few others he may be forgetting.
- The rest of the application stayed a Majestic Monolith in Ruby on Rails.
- Later, Campfire was retired. Basecamp 3 has chat built in using Action Cable inside the monolith, and it needs no Outposts to scale.

## How Outposts talk to the monolith

- Campfire's poller integrated through the database. It fetched directly from the monolith's database, so no additional chatting between services was needed.
- HEY's inbound email intake is another Outpost-style setup:
  - Postfix receives the inbound email and can buffer it on disk if the app is down.
  - It then POSTs the raw email to a monolith controller, via a dead-simple HTTP request in a shell script called by postfix.
  - The raw email goes onto Action Mailbox, which decides whether to record or reject it. All of that logic lives within the monolith.
  - The emails themselves are stored in encrypted cloud storage.
- He says both integration styles (shared database, or HTTP POST to a monolith controller) work.
