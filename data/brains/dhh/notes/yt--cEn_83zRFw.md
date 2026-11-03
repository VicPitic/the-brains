## Rails 8 and the no build, no PaaS mission

- DHH calls Rails 8 one of the most exciting releases since Rails 7. Its mission is a one-person framework with an on-ramp "on the freaking floor": a single developer can take a Rails app from Hello World to IPO.
- Rails 7 delivered Hello World (no build, Hotwire). Rails 8 builds the bridge to the IPO, and the first step is deployment.
- He says the goal is that Rails does not require "a commercial vendor to go to production in a way that feels reasonable and approachable". PaaS offerings become optional extras for minor use cases.
- Teams should deploy to any hardware in any configuration: cloud VM, their own computer, or "a Pi in the closet".
- Rails stays a "big tent". Apps built with React or other stacks are fine, and people can opt out of any part. The Rails 7 and 8 path is not a dictate.
- He lists the Rails 8 pieces: generated authentication, Propshaft, the Solid trifecta (Cable, Cache, Queue), Thruster, Kamal 2, and SQLite as a production database.
- He says all of it is shipping that day: Rails 8 beta, Kamal 2 final, and Solid Queue 1.0.

## Pattern language, context change, and cache invalidation of mental models

- DHH uses the pattern-language template to judge technology: a problem, a context, a solution, and consequences. When the context changes, the pattern is invalidated.
- Before Rails 7, he felt unease about following the rest of the industry on the front end and in the cloud. He could not yet articulate why.
- Rails 7's context change was ES6 JavaScript working in the browser with no transpilation, HTTP/2 making bundling unnecessary, and import maps allowing modern code directly in the browser.
- Old patterns such as browsers only open four connections, so bundle everything and browsers are bad at JavaScript, so transpile no longer hold.
- He says developers are historically bad at naming things and cache invalidation. The cache invalidation of mental models is what he cares about most: ES6, HTTP/2 and import maps arrived years before people took advantage of them.
- Hotwire is "a pattern fit for 2024", not 2012. It was reachable only after "the necessary jungle of complexity" had been crossed.
- His haiku: "Progress is our path / Complexity builds the bridge / Simplicity waits." Complexity is a necessary ingredient of progress, but "we're done by the time we've made it simple", not by the time we've solved it.

## Extraction, shipping proof, and no-build at 37signals

- Rails does not build speculative frameworks. It takes solutions proven in real applications "with real customers under real production pressures", packages them, and shares them.
- Hey, which he started in 2018, was where he discovered the new patterns. The launch in 2020 still used webpack, and it took about another year to move fully off it.
- DHH says Hey went 100% no-build the day before the keynote, with no JavaScript build step and no CSS pipeline. Every application 37signals has made since Hey is no-build.
- The industry argument says heavy build pipelines, bundling and tree shaking are required. His answer is "everyone must be wrong" on that premise.
- He does not want to win it by arguing. Shipping working software creates "a monument to the argument that is simply immovable". He can't say no-build doesn't work for you, but he can say "you can't claim that it doesn't work".
- His example is Tobi's yearly tweet about one million requests per second on the largest Rails app in the world, answering 20 years of Rails doesn't scale. He says: "This argument has been settled."
- Hey serves JavaScript with no source maps and no bundling, exactly as written.
- He argues minification is "one of the absolute atrocities inflicted on the open web". Saving 2-5% of overhead is not worth destroying view source as a learning platform. Adding source maps layers complexity on complexity, and "the tower will fall".
- The trigger for his interest in no-build was returning to a JavaScript project left alone for about five minutes. He could not compile it, lost half a day to Webpacker (an integration he had himself made for Rails), and concluded the model was fundamentally broken.
- He says "only the browser is forever". It runs markup and styling from 30 years ago without modification. Craigslist's 1995 design, essentially unchanged, is his example of longevity worth aspiring to.
- His rule: the more intermediaries between you and the browser you remove, the more likely your code still runs five minutes from now.
- Rails 8 assumes a modern browser. Some apps must support a longer tail of browsers, but for a new application he says you should do this.

## Optimizing for limited brain budget and the zero-to-one problem

- DHH says "our limited monkey brains" cannot hold much. If they are spent learning a complicated build pipeline, there's little room for anything else.
- The goal is the full-stack developer who can see the whole problem and the whole solution, and keep it in their head as long as possible. Eventually that stops working. He doubts anyone can hold Shopify's five-million-line monolith in their head, but Tobi did for a long time, and that enabled the growth.
- To the objection great for the beginning, but what about when you're making billions a day, he answers that by then you can do whatever it takes because you have all the money in the world. The problem to optimize for is "how do we get to the billions".
- Rails' headline mission is to compress the complexity of modern web apps. Compressing each part into small units lets them all fit side by side, without splitting the industry into tiny slices of expertise. That kind of specialization is a billion-dollar problem, not a zero-to-one problem.
- He uses relearning Vim as his own example of something that takes brain space and has to be compressed.
- Competence is also a pleasure: "it's more fun to be competent", and it's more fun to know Linux because that's where your applications live.

## Leaving the cloud: pink elephants, AWS margins, and Heroku pricing

- DHH says the industry cultivated a fear of touching a server, and developers became "pink elephants tied with a tiny rope of learned helplessness". The rope is tiny compared with the elephant's mass.
- He grants AWS a good origin: Amazon had huge usage spikes on certain days and idle capacity on others, so renting it out made sense for their context. Most applications don't have that context, and the insurance premium is high both in money and in complexity.
- He argues AWS's incentive is to keep developers petrified of servers. He cites roughly 40% margins for AWS against about 5% for Dell, which actually makes the computers, and calls this "a failed market" with unchallenged super-profits.
- He gives Heroku "endless accolades". It reduced deployment to git push in 2007, before most people understood containers. Rails developers owe it for getting from "Hello World" to online.
- His price comparison, said with the caveat that he's talking about software:
  - Heroku Performance-M dyno: one core, three threads, 2.5 GB RAM, $250 a month.
  - A Hetzner box he signed up for a couple of weeks earlier: 40 cores, 96 threads, 256 GB RAM, 2 TB of NVMe RAID storage, $220 a month.
  - He calls $250 for the Heroku spec "preposterous" and "offensive" in 2024, and says it implies paying about 100x more for RAM and 50x more for compute.
- On the business model: if you convince programmers they can't touch a computer, you can charge 100x. VCs see "the insecurity of developers" as a mass market.
- He uses drug patents as an analogy. He hates software patents but accepts medical patents, which pay for roughly a billion dollars of trials. Those expire after 20 years and generics arrive. He says deployment is well overdue for generics, and open source is the generic.
- He ties this to his claim that if a market opportunity is egregious enough, a Martin Shkreli-style figure appears, so the industry should fix itself first.

## Linux as the cure for server phobia, and Omakub

- DHH's prescription for server phobia is Linux, which "runs all of our servers" and also runs on your laptop. He frames it as cognitive behavioral therapy: one small exposure at a time.
- He demoed a Framework 13 laptop running Linux. He had not used a non-Apple computer for about 20 years before this.
- He built Omakub, a "comfortable, productive, great looking" Linux setup, to lower the barrier. He says it may lead people to other discoveries, such as finally finding Vim just right.
- On the fear of hackers, he says to ignore "the pink elephant talking". Basic server security covers about 90% of the problem:
  - Put an SSH key on the box and make it the only way to authenticate.
  - Turn on the firewall with a simple UI.
  - His analogy is a locked door: attackers can jiggle the handle but can't get in.
- He wants people to level up from beginner to competent, not stay at the beginner stage forever.

## Rails 8 features: generated auth, Propshaft, and the Solid trifecta on SQLite

- **Authentication by generation:** Rails 8 won't ship Devise or a black box. It generates the code so you must look at it and understand it. He says authenticating a user isn't worth being a pink elephant over, let alone paying someone else for. The generator gives a roughly "90% authentication system" from handcrafted templates he extracted from 37signals applications.
- **Propshaft:** a replacement for Sprockets (the asset pipeline since 2009), written on a clean sheet of paper for the modern browser context. With JavaScript shipping directly to the browser, what remains is a load path and digesting assets for far-future caching. The code is small enough to read via `bundle open propshaft`, and he says you will understand it, unlike Sprockets.
- **One database instead of many stores:** a modern app used to need separate stores for queues, caches and WebSocket routing. Databases and NVMe drives are now fast enough that RAM is not needed for most operations. NVMe drives jumped two orders of magnitude, which wasn't possible in 2009.
- **Solid trifecta:** database-backed adapters for Action Cable (Solid Cable), caching (Solid Cache) and jobs (Solid Queue), all running on one database. A new Rails 8 app gets four SQLite files: primary, cache, queue and cable. SQLite means no database process to run, just files.
- **Solid Cable:** extracted about two weeks before the talk, when his demo still needed Redis. It was built by Nick Pezza, and he says it reaches within 50% of the performance of Redis pub/sub while writing to a file.
- **Solid Cache** (from Basecamp's needs):
  - Basecamp stores 10 TB of cache for 60 days, with a 96% hit ratio. Cache lifetime was previously 17 hours.
  - Switching to it cut P95 request time from about 400 ms to about 200 ms.
  - It supports Active Record encryption, which was designed for Hey, so cached data stays encrypted.
  - Hey promises that deleted data is gone from logs, database and cache within 60 days. A 60-day cache cap backs that retention warranty. He criticizes the common "little Boolean" soft-delete.
  - Being built on Active Record means it can be sharded beyond one machine.
- **Solid Queue:** built because a new application needed "one, two, three, four, five, six, seven gems" just to process jobs, some of them private forks.
  - It works on SQLite, Postgres and MySQL, and is full-featured, so it needs no extra gems.
  - It can run attached to Puma in the default setup, or as separate job hosts via `bin/jobs` at larger scale.
  - Recurring jobs are built in, replacing cron inside containers.
  - Hey runs about 20 million jobs per day on it. Basecamp and other apps add about 80 million, for roughly 100 million a day total.
  - He says it lets you kick Redis out of the stack.

## Thruster and Kamal 2: container to the internet with no configuration

- **Thruster:** a Go proxy in the default Rails 8 Docker image, run in front of Puma. The goal is that the container image should be directly exposable to the internet, fast and secure, with no expertise required. It provides:
  - X-Sendfile acceleration, so large file sends don't tie up Puma.
  - Caching of anything marked public via cache control.
  - Gzip compression, with Brotli planned.
  - Zero configuration by default.
  - Go was chosen because it is "better at that part", and he's happy to use it for it. In Kevin's testing on his laptop it handled 60,000 requests per second, and he says it will not be your bottleneck.
- **Kamal 2:** the missing step in his "leave the cloud" plan. Features:
  - Automatic SSL via Let's Encrypt, with no certificate knowledge needed.
  - Multiple applications on one server, so it scales down as well as up.
  - A minimal deploy YAML.
  - A new Go proxy replacing Traefik, to be faster and need zero configuration.
  - Aliases such as running a console against production.
- **The demo:** he pointed two domains (alpha and bravo) at one Hetzner server and deployed two Rails apps to it.
  - He generated a scaffold and tested it in development.
  - For production he filled in only the registry user, the server IP, and the hostname, committed to git, and ran `kamal setup`.
  - Kamal builds the Docker image, includes Thruster, runs an entry point that prepares the databases, and pushes to a registry (he is working to remove the Docker Hub step).
  - The second app used a Rails template and Tailwind.
  - The server needed only a fresh Ubuntu box, with no pre-cooking.
  - Both apps ran on the same server with auto SSL, Action Cable live updates, caching and queuing, all on SQLite.
  - He viewed logs, ran the production console and changed a record, then ran `kamal remove`. A removed app returned a 502 from the built-in proxy.
- **Compression claim:** the original Rails video took 15 minutes and didn't reach production (2005). He took two apps to production in five minutes, which he calls a compression of complexity "six times over".

## Next up: Action Notifier, Active Record Search, and Markdown in Action Text

- **Action Notifier:** a new framework for web push notifications, so apps can avoid native clients. Campfire already uses an early version for conference chat. It handles the awkward parts: service workers, subscriptions, and reliable sending.
- **Active Record Search:** built on the same premise as the Solid libraries. He says Elasticsearch is "wonderful" but a torture for developers and operators, and most people only need to search their Active Record models. The API he showed declares searchable attributes, then calls something like `Post.search("announcement")`. The name changed from Solid Search because it isn't an adapter for another database.
- **Markdown in Action Text:** a markdown option for people who prefer it over a WYSIWYG editor, called House MD. It already powers Writebook, a free-to-download book-publishing app from 37signals.
