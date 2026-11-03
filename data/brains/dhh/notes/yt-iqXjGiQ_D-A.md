## Rails World 2023 keynote: why Rails and the 20-year mindset

- DHH says he has spent about half his life (he is 44) working on Rails, and the 20th anniversary leaves him "this fired up" to keep improving it.
- He treats the Rails community as a gift-swapping environment built on the ethos of the MIT license: no transactional I give you X, you owe me Y, just gifts with no strings attached.
- Code is foundational but not enough. Without understandable documentation and flattering marketing "no one's going to care."
- Rails 7.1 shipped that day. About 700 people contributed code to it (roughly 4,000 commits since Rails 7.0, almost two years earlier). Almost 7,000 people have contributed over 20 years.
- The Rails Foundation was set up as a new institution. Eight founding companies put in a million dollars: Cookpad, Fleet, GitHub, Intercom, Procore, Shopify and 37signals. Contributing members include AppSignal, Big Binary, CedarCode and Planet Argon.
- He argues the industry is young: 2003 is as far from 2023 as 1983 was from 2003. He prefers looking forward over nostalgia.

## Interest rates, the "productivity Dark Ages" and the pendulum swinging back

- DHH ties the last decade-plus of tech to the US Federal Reserve rate, which hit zero around 2009 and stayed there about six years. In his view this produced "a sloth," an indifference to productivity and to how capable individual programmers needed to be.
- He calls the period from 2009 onward a "productivity Dark Ages": primitive tools that demanded far more labor for slightly better versions of the same things. "The low productivity tolerance was a zero interest phenomenon."
- He welcomes the pressure of rising rates (5.5% at the time), and of AI, because pressure forces people to stay productive. That was the original pitch of Rails.
- Evidence he cites: Basecamp was built in about six months by one developer and two designers part-time, and went on to generate hundreds of millions of dollars. If that was possible in 2003-2004, 2023 should allow far more, yet startup team sizes and specialization show the opposite.
- Twitter example: a former employee's account says they left Rails because of a badly designed Rails app, moved to a constellation of Java microservices, and then "nothing happened for 10 years" while thousands of people were hired. He says Airbnb followed a similar trend.
- He expects the pendulum to swing back as economic forces demand it.

## Full-stack and Renaissance developers versus specialization

- DHH argues against ever-smaller specialization. Developers should design, install, maintain and know how to do all of it themselves.
- He cites an anecdote from the Elon Musk biography: solar panel installation was unprofitable because designers were not present during installation. Every split between who has the ideas, who implements them and who maintains them "created just inefficiencies" and cumbersome products.
- This is the same as the split between specialized developers and full-stack developers. Unless you both design and implement and feel "the pressures of all the little bolts," you get it wrong.
- He recommends Joel Spolsky's 2001 article "Don't Let Architecture Astronauts Scare You": architects solve problems they think they can solve, not useful ones. His test for the last 10 years: what new things could we do that we couldn't before?
- His ideal is Leonardo da Vinci, who merged art and engineering. He says "full stack" has aged a bit and prefers "Renaissance developers": interested in design, implementation, maintenance and deployment. Developers are writers and artists, "code poets."
- Ruby's openness supports this: `bundle open active_support` shows you that framework code is the same Ruby you write, so there is no divide between framework makers and users, and you can level up over a decade.
- "Progress is not synonymous with complexity. Complexity is a bridge we use to get to simplicity."

## Front end: no-build JavaScript and CSS, and Propshaft

- Webpacker was added in 2019 as a bridge he hoped would not last, and it is now gone. He likes JavaScript as a "wonderful second language" but likes Ruby much more.
- esbuild was 40x to 80x faster than webpack, and he integrated it via `jsbundling-rails`. Bun is a further marginal gain and a sign of weariness with splitting everything into billions of packages.
- Import maps were a gamble in Rails 7 (experimental in Chrome in 2020, now supported everywhere). Combined with HTTP/2, there is no longer a penalty for loading many individual scripts, so bundling is unnecessary. "What is even better than esbuild, what is even better than Bun? No build... literally infinitely faster."
- HEY ships plain-text, uncompiled JavaScript with zero build, and you can view source with no source maps. This answers the old claim that you couldn't build something like Gmail as a multi-page app: HEY is an email client written that way.
- CSS is catching up. Nesting and custom properties (variables) are supported in all browsers. 37signals' new applications (the "ONCE" line) use no build step for JavaScript or CSS, with nesting and variables.
- He still recommends Tailwind CSS for those who build CSS, and praises Tailwind's standalone executable that needs no Node or Bun. 37signals does not use it because its designers prefer working directly in CSS.
- Propshaft is a clean-sheet replacement for Sprockets (introduced around 2009), built with Breno. Sprockets carries a "graveyard of experiments" (Bower, a 2011-era compressor) and roughly 35,000-40,000 lines of code. Propshaft is under 3,000 lines.
- Propshaft does two things: a load path for assets (including gems) and digest stamps for far-future expiration and caching. It has no compression and no CoffeeScript. His point: fewer lines mean far fewer issues and code people can actually understand.
- He cites the Rails Doctrine: when choosing between momentary disruption and progress, choose progress. Rails adopted WebSockets (Action Cable) on that principle.

## Hotwire: Turbo 8 morphing, view transitions, local storage and Strada

- He says the pendulum has swung from sending JSON everywhere back to HTML. HTML is good, needs no translation step, and search engines can reach it. HTMX shares this idea.
- Turbo's layers: Turbo Drive (full body replacement, the speed win with no changes needed, "peak of developer happiness"), Turbo Frames (segments, simpler back end) and Turbo Streams (updating individual page pieces most efficiently). More responsiveness the further up the chain you go.
- Turbo 8 adds morphing, borrowed in spirit from React's virtual DOM diffing: compare the two DOMs and update only what changed. It keeps scroll position and reduces flicker, giving Turbo Drive ergonomics for cases where you'd reach for Frames or Streams. Demo: the Basecamp card table with horizontal and vertical scroll.
- He is also integrating the View Transitions API (Chrome only at the time) to make web apps feel native, "skating where the puck is going to be."
- Local storage work would let Turbo Drive cache across tabs and open a path to offline support, avoiding the pain of service workers.
- Strada, announced around late 2020 and finally shipped, is the last piece of Hotwire. It drives native controls from web markup so more work stays on the web side, and it sidesteps App Store and Google review for many updates.

## Back end: Solid Cache, Solid Queue and Mission Control

- Storage transfer rates went from about 100 MB/s in 2009 to two orders of magnitude faster with Gen 5 SSDs. "Two orders of magnitude is the kind of change that should reset all your fundamental assumptions."
- Redis was born in 2009. He loves it (and found the right Rails abstraction in Kredis) but says he doesn't need it for as many things now.
- Solid Cache uses the database as a cache backend, since RAM is 5 to 10 times as expensive as storage. Longer cache life (months instead of days or hours) makes apps faster.
- HEY measured 0.8 ms per cache request on Redis versus 1.2 ms on Solid Cache, 50% slower on a scale that doesn't matter. Basecamp's 95th percentile dropped from about 350 ms to 250 ms after switching.
- Cache trimming is set by data retention policy, not storage limit: 60 days of fragment caching for Basecamp, matching what 37signals promises customers about deletion after cancellation. It includes encryption and built-in sharding. It was available the day before the talk.
- Solid Queue is a new job backend for Rails, built on the same idea (why use RAM for queuing?). 37signals had used Resque for 10 to 12 years and needed six gems to make it work. Sidekiq is excellent but commercial, and he says that should exist but never be required in Rails.
- Delayed Job (Toby, 15 years ago) pioneered database-backed jobs but is hard to scale. GoodJob inspired Solid Queue but is Postgres-only and built on Delayed Job. 37signals uses MySQL, and MySQL 8 gained the needed query features.
- Goal: install Rails, add a database, and get excellent caching and jobs with no further changes. It was running in production for some workloads and he hoped to release it within months and possibly make it a Rails 8 default.
- Mission Control, built for Resque and then targeting Active Job, shows and controls queues so any backend works (including Solid Queue). It came out of a Basecamp outage where they couldn't pause expensive jobs while the database needed less load.

## Kamal, leaving the cloud and ONCE

- Rails should be free, open source and not owned by any commercial entity, end to end. Commercial vendors can offer alternatives but must not be required. He praises Heroku (2009, four years before Docker in 2013) as a pioneer whose developer economics stayed ahead for 10 years.
- Kamal was built to get 37signals off AWS and onto their own hardware (cutting an "exorbitant" cloud bill). It aims to make deploying Rails to any vanilla VM anywhere as easy as Heroku, and he says it is pretty close.
- ONCE: after 20 years of all SaaS all the time, he is "sick of it" because you don't control your data and pay recurring fees for everything. He wants software people can own and run themselves, but it must be Heroku easy to install, not 15 pages of manual.
- This has given him new love for SQLite: if the whole app runs in one process, he calls it the best database, simplifying setup, maintenance and backup. It's not just a development tool.
- Goal: Rails as a one-person framework, where one individual can make everything happen from start to end.
