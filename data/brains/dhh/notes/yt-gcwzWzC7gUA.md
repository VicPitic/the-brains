## Rails as a "mega framework" built on the crud monkey

- DHH argues the industry has regressed: in 1999 he deployed a PHP/HTML change by dragging a file via FTP, live in 5 seconds. Today teams take 30 minutes, an hour, three hours, even 8 days to deploy.
- Modern apps do the same job as in 1999 ("reading from a database and writing to a database and then formatting that output into some HTML tables") with far more moving parts, and three nines of uptime was common in '99 but is now hard despite Kubernetes, AWS and Datadog.
- Cause: big problems sliced into tiny isolated ones, so progress on each slice adds up to going backwards overall.
- Merchants of complexity exist, but they only profit because developers buy. The root cause is a psychological need to be seen as more than a crud monkey. DHH: "We have to get back to embracing happily, proudly the monkey."
- Embracing CRUD frees you to solve problems end to end. This is maximalism, not minimalism: Rails covers HTML templates, database access, routing, email, background jobs and more.
- He criticizes new frameworks for not trying to address the whole problem.
- He frames Rails as a philosophy modeled on the Pax Romana: libertas (freedom, e.g. `bundle open`, monkey patching), proprietas (ownership, sharp tools, no one dictating how), and pax duty (contributing back to the framework and open source).

## New in the framework: Rails 8.1 and beyond

- **Markdown:** `format.md` and `render markdown:` duck-type any object to `to_markdown`, because AI prefers Markdown. A pending Writebook PR would let you download an entire book as one markdown file.
- **Lexxy editor:** Action Text's new default replaces Trix. Trix got little outside help and sat on 37signals' back burner. The new editor is built on Meta's Lexical (used by WhatsApp, Instagram, Facebook; about 1.7 billion people daily). It has live syntax highlighting, pastes Markdown into WYSIWYG, and exports Markdown. It is used in Fizzy. DHH likes that Meta's team does the maintenance work.
- **House dropped:** House, the Markdown editor from last year, is not being invested in further. In Fizzy and another unannounced product they found most people don't want Markdown; they switched to Lexical.
- **Action Job continuations:** jobs can be interrupted and resumed without losing progress. Needed since leaving the cloud for Kamal: old containers are shut down within 30 seconds of a deploy, but jobs like exporting a big Basecamp account can take hours.

## Native frontier: offline, push and Hotwire Native

- DHH says teams can't pretend native apps aren't needed. When Hey launched about four years ago, Apple "unceremoniously tried to murder us". He holds a grudge but still builds native apps because customers want them.
- **Turbo offline:** coming soon, built by Rosa. It is solved at the Turbo layer, so it helps all web apps, not just native. V1 is "cache as you go" (a visited Hey email is cached for offline). V2 is "cache as I say so" (preemptively cache, e.g. a travel folder).
- **Action Push Native:** replaces AWS Pinpoint, sending directly to Apple and Google. It is configured via a new `config/push.yml` with keys for each platform, supports silent notifications, and has run in production for a few weeks, sending millions of notifications.
- **Action Web Push:** used in Campfire, not yet extracted, and clunkier (a JavaScript dance for keys). Native push still has advantages: notifications can be pulled back, and deliverability is slightly better.
- **Campfire now free:** instead of $2.99, Campfire is free with an asterisk. He wants a community member to extract Action Web Push.
- Hotwire Native 1.3 is covered in a later keynote.

## Pruning: localhost, Docker for databases only, no system tests

- **Localhost instead of Puma-dev:** since 2017 localhost is a secure context, so no local SSL setup or extra process is needed. Puma-dev took about six steps on Linux. 37signals now uses explicit ports (e.g. 3010 for Queen Bee). He argues each port maps to a process, so writing them down is fine and the convoluted fix isn't worth it.
- **Docker only for databases:** Docker is great for versioned services like MySQL or Redis, since apps may need different versions, but painful for development. The setup: native Ruby managed by `mise`, plus shared versioned Docker databases on set ports.
- **System tests nuked:** DHH said 10 years ago on stage that system tests were the future. Now: "It never worked. It never works. It's always brittle. It's always broken. It's always slow and it's totally not worth it." Hey had many and fought their stability. They deleted them and kept about 10 as a smoke path. He knows of no production bug they would have caught. Rails 8.1 no longer generates system tests for new controllers.

## Run CI locally instead of on cloud runners

- The BCX (Basecamp 2) cloud test run took 10 minutes across 8 parallel projects. Hey's suite (30,000 assertions) took well over 15 minutes in a cloud run. Basecamp 3's has 13,000 assertions.
- Claim: Intel stagnated, then TSMC (via Apple and others) made local CPUs faster than rented cloud ones. Hey's suite runs in 1 minute 12 seconds on the fastest AMD chip, under 4 minutes on an M4, 2:22 on an M4 Max, 2:05 on his Framework laptop and 2:23 on the Framework desktop. Linux is about twice as fast as Mac.
- Shopify-scale suites are an exception (about 0.001% of Rails apps); most apps can run everything locally.
- "Works on my machine" is answered by pinning Ruby with `mise` and database versions with Docker.
- PRs are gated by a GitHub required sign-off: a human attests they ran the tests and they passed. DHH says trust works: programmers want to ship working software and know lying could get them fired.
- Rails 8.1 adds a DSL for declaring a local CI run (RuboCop, gem audit, tests, then sign-off).
- Fortnite renders a scene in about 8 milliseconds, yet tests take 15 minutes in the cloud. He proposes a "frame budget" for everything.

## Bootstrap budget and Omarchy

- 37signals' bootstrap budget: from a cold machine to a change deployed in production in 15 minutes.
- Live demo: installing Omarchy (his Arch/Hyprland-based Linux distro) from a USB key on a new Framework desktop took 4:44, and a Rails blog scaffold was running in about 6.5 minutes.
- He switched to Linux about 18 months ago via Ubuntu, then fell into tiling window managers and Hyprland after a YouTube video by TJ DeVries (Typecraft). He argues computers should be fun and look like a hacker movie.
- Omarchy ships with git, mise, Docker, databases, Neovim, lazygit, Starship prompt, short aliases (`r` for rails), and git username/email pre-set from the signup form.
- 37signals also built a tailoring script so a new machine is ready quickly. Fizzy deploys in 58 seconds; Basecamp 4 takes about 4 minutes, and he promises to cut it to 3.
- His reasoning for owning the OS: "I should not have to ask Apple for permission about anything at all."

## Cloud exit, mini PCs and micro data centers

- Campfire for the conference ran on a roughly $300 mini PC in DHH's closet. He estimates the same performance would cost $300 a month on DigitalOcean droplets and upwards of $1,200 a month on Heroku.
- 37signals runs two main data centers and added an outpost in Amsterdam for Hey.
- Plan for Fizzy: many small outposts instead of mega data centers, to cut latency. Light lag math: Earth's circumference is 40 million meters, light in fiber is about 300 million m/s, so a full circle is 137 ms in theory.
- Measured RTT: New York to LA 70 ms, New York to Sydney 220 ms. A POST needs a TLS handshake, the POST and a redirected GET, so roughly 660 to 700 ms of pure latency to Sydney. From Copenhagen: 2 ms local, 8 ms across Denmark, 17 ms to Falkenstein (Hetzner), 25 ms to Amsterdam.
- With a 150 ms POST and 75 ms GET, New York to Sydney is almost a second; Copenhagen to Copenhagen is about 200 ms. The goal is to not exceed a Formula 1 driver's reaction time (about 200 ms).
- He concedes edge computing has been "all [ __ ]" so far, but sees it as a fun challenge.

## Active Record Tenanting, Beamer and geo routing

- Cost is in the data, not compute, so each outpost should store all data but serve only a fraction of queries. This requires splitting the single database into one database per customer.
- **Active Record Tenanting:** Mike's work, one tenant per customer database. It also helps isolation, backup and privacy.
- **Beamer:** Kevin's replicator for SQLite databases, built for tens of thousands of databases and tens of thousands of transactions per second (unlike LiteFS in scale). DHH thinks SQLite suits one database per customer.
- **Kamal Proxy geo routing:** readers are served from the nearest app server; writes go to the single dominant writer (distributed writes are not solved).
- Design rule from RFC 2616: GET should have no side effects. All writes happen on POST (other methods piggyback on it), so routing works.
- Session affinity uses a transaction ID instead of a guessed delay: after a write, the reader serves the user only once it has that transaction, otherwise a header redirects them.

## Closing principles

- Do more end-to-end problem solving and open source; own the whole stack (computer, server, framework) so you can change anything.
- "I want libertas. I want proprietas. I want pax. I want freedom, ownership, and duty."
