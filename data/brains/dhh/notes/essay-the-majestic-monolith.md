## Why the monolith fits small teams and not behemoths

- DHH separates patterns about code from patterns about "how the code is being written, by whom, and within which organization." The Majestic Monolith is the second kind.
- Micro/services oriented architecture (M/SOA) breaks an application into many smaller parts, each run as its own application, with the constellation solving the larger problem.
- He calls M/SOA "a great pattern" for Amazon, Google or any organization with thousands of developers. Each service can be its own team with its own timeline, staff and objectives, evolving somewhat independently. At that scale there is "simply no other reasonable way" to coordinate effort, or everyone steps on each other and endless merge conflicts follow.
- M/SOA fits the organizational shape of very large corporations. The mistake is copying them: "hey it works for The Most Successful, I'm sure it'll work for me too."
- He calls this cargo culting. Patterns that suit organizations orders of magnitude larger are often the exact opposite of what suits you. The same goes for non-technical patterns: you shouldn't run HR like a 50,000-person company when you have 50.

## Why premature services are a bad trade

- Prematurely turning an application into services violates "the #1 rule of distributed computing: Don't distribute your computing!" if you can avoid it.
- Every time you extract a collaboration between objects into a collaboration between systems, you accept "a world of hurt with a myriad of liabilities and failure states."
- Examples of that pain:
  - what to do when services are down
  - how to migrate in concert
  - the cost of running many services in the first place
- He says the pain is worth it when you have no choice, but most people do have a choice.

## What a majestic monolith is

- It is "an integrated system that collapses as many unnecessary conceptual models as possible." It eliminates as much needless abstraction as you can swing a hammer at.
- It is a big no to distributing your system unless that truly prevents you from doing what needs to be done.
- "Monolithic" is usually said in derision. DHH says to embrace it with pride.
- The point is to choose a monolithic design with intent, not drift into one: "Any monolith worth erecting is worth making majestic!"
- An accidental monolith cannot meet the goal of beautiful, understandable, succinct code. It "just gotta be majestic."

## Basecamp as the case study

- DHH has written Basecamp as a majestic monolith since 2003. Basecamp 3 extends the pattern to the web and all native platforms.
- Platforms: web, iOS, Android, Mac, Windows and email (6 in total).
- Team: about 12 programmers (many busy keeping decade-old systems running) and 7 designers, counting Jason, his partner and CEO.
- Size of the app:
  - hundreds of screens
  - 200 controllers with 900 methods
  - 190 model classes with 1,473 methods
  - this counts only what is inside `app/*`, not the front end such as the Trix text editor
- Scale and commitments: millions of users, plus a back catalogue of apps committed to being maintained "until The End of the Internet."
- His summary: "a very broad scope, deep commitments, and a very small budget."
- That situation is incompatible with a labour-intensive pattern like M/SOA. It is also incompatible with writing 100% native apps, but it fits the hybrid application model "like a glove."
- He believes the only way a team of about 12 programmers can cover six platforms concurrently is to choose and commit to the Majestic Monolith.

## Understanding, ownership and code quality

- A majestic monolith presumes that the people who work on it also understand it. Knowledge and responsibility are easier to silo with a proliferation of smaller systems.
- He saw this with the few external shared services Basecamp has, such as Basecamp ID (shared authentication for all generations of the app): "Oh, you gotta talk to Jeff about that."
- This puts "immense pressure on making the application understandable and changeable by individuals, not teams." That forces you to take the time to turn a long letter into a short one.
- Slipping standards matter more in a shared monolith: "you're not just pissing in your own corner, you're pissing all over that majestic monolith we all have to polish every day."
- The mission is code that makes you smile when you write it and when you later extend or patch it.

## Rails philosophy and the limits of architecture

- The pattern reflects Ruby and Rails' view of programmers: given the right incentives and nudges, most will rise to the occasion and write beautiful code.
- Systems should be "a red carpet invitation to become a better, more productive programmer."
- He doesn't worry about people who use the tools and patterns to hurt themselves. Maybe everyone needs to do that once or twice before appreciating the ropes that guide them.
- The Majestic Monolith "doesn't pretend to provide a failsafe architectural road to glory." Programmers under oppressive influences can turn any architecture, in any tool, into a big pile of mud.
- Worrying too much about saving people who are likely out of reach is unproductive and pulls the ones who do care down the wrong path.
- His summary: if you run a small team, not a tech behemoth, embrace the monolith and make it majestic.

## Does it still hold? DHH's 2019 answer

- In a comment, a reader asked in 2019 whether the view still stood, given a very small team (about 5) considering M/SOA and whether tooling had improved enough to make it manageable.
- DHH replied that he saw no fundamental improvement that alters the equation.
- His rule of thumb: "Integrate your systems until it's impossible for one person to hold it all in their head."
- He said Basecamp and their other apps had still not reached that point.
