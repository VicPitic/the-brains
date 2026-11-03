## DHH's path into programming and the Ruby aesthetic

- DHH failed to learn programming twice as a kid. First try at age 6-7 was typing in magazine source code on an Amstrad 464. He didn't understand the purpose of a variable. Second try at 11-12 was EasyAMOS on the Amiga 500, where he got as far as conditionals and loops and concluded "maybe I'm not smart enough."
- It clicked on the third attempt, around age 19-20, through the web: HTML first, then ASP, then PHP. PHP gave him the first working web applications.
- He says late-'90s PHP set the bar for web developer ergonomics: write a script, FTP it to a server, and it's live. Change the file and reload. No build, no setup. He says he has chased that feeling for the rest of his career.
- Ruby was the first language he thought of as a calling. He found it through Dave Thomas and Martin Fowler, who used Ruby to explain patterns in IEEE-style magazine articles because it read like pseudo code. A proof of concept (talk to a database, pull records, format them, show an HTML page) took one weekend. He had budgeted two weeks.
- He describes Ruby as "made for my brain like a perfect tailored glove."
- He considers the web mostly forms writing to databases. Many developers are uncomfortable being "CRUD monkeys" and compensate by overcomplicating things.

## Why Ruby is beautiful: aesthetics over machine convenience

- DHH says Ruby is built for human readers and writers even when that makes the interpreter harder to write. Its goal is programmer happiness, and none of this affects what the computer does.
- Examples he gives:
  - `5.times { ... }` iterates five times, with primitives being objects.
  - No semicolons and optional parentheses. "If the human doesn't need the additional characters, we're not just gonna put them in."
  - Predicate methods like `user.admin?`. The question mark means nothing to the computer and everything to the human.
  - Statement-first conditionals: `user.upgrade if user.admin?`, and `unless` instead of `if !`.
  - A readable initializer, `def initialize`, versus Python's `def __init__(self, ...)`, which he says offends his sensibilities.
- He says Ruby is not abbreviation-minded: `initialize` is longer than `init` but reads better, and you don't type it often.
- He contrasts Matz with James Gosling. In his reading, Gosling's Java assumes average programmers can't be trusted with sophisticated features. Matz believes in humanity's capacity to learn, trusting even a stranger to extend his classes.
- Open classes: DHH added `5.days` (returns seconds) to Number in Active Support so he can write cache expiry as `expires_in 5.days`. "A reader of Ruby could not tell the difference between the code Matz wrote and the code that I wrote."
- Ruby philosophy shows in the interactive shell, where both `exit` and `quit` work because humans pick either. Python's `exit` gives a lesson instead. Ruby accepts ambiguity; Python wants one obvious way.
- He says Ruby's first draft was about 90% of what's still used 30 years later, and no other language has copied its essence. Early Ruby was very slow, and getting it fast took hundreds of person-years.

## Metaprogramming, dynamic typing, and why he rejects static typing

- Metaprogramming in Rails means the framework adds keywords to the language. `has_many :comments` and `belongs_to :account` look like part of Ruby but are Rails domain-specific languages. He says you can't tell his metaprogramming from Matz's keywords, with zero line noise.
- He defends dynamic typing as the essence of Ruby: "Why would you wanna turn one of the most beautiful languages into something far uglier?"
- His objections to static typing:
  - It makes metaprogramming harder. Trying to write metaprogramming in TypeScript infuriated him, and the team pulled TypeScript out of Turbo.
  - It repeats itself. `User user = new User` states "user" three times.
  - The usual benefits (autocomplete, catching calls to missing methods, fewer null errors) don't matter to him. He writes in a text editor, not an IDE, and catches logic bugs with unit and integration tests.
  - He says great tooling raises a language's tolerance for boilerplate because "you're not typing it anyway." He doesn't want that.
  - Duck typing: ask whether an object responds to a method, not whether its class has it. That underpins runtime method adding and metaprogramming.
- He says he hates TypeScript "as much as I like JavaScript" and sees only costs: extra typing, type gymnastics, people falling back to `any`. He says he's not willing to turn a dynamic language into a pretend statically typed language. He doesn't want to take TypeScript away from people who enjoy it, and tells anyone using it only because they think professionals should that "you don't have to."
- He distinguishes contexts. What's right for 10 million lines and 100,000 programmers isn't right "in my bedroom to create Basecamp." He compares using one tool for both to using a Pagani to pick up groceries at Costco.
- He says it's idiotic to claim static typing is the only way to build reliable systems, "in the face of mountains of evidence to the contrary."
- Evidence: Shopify runs on Rails, with roughly 1 million dynamic requests per second on Black Friday and about 5 million lines in a monolith. Its YJIT compiler contribution makes Ruby faster. He notes the monolith is 5 million lines; in Go or Java it could have been 25 million or more, which he says would be harder to understand.
- He says he has mellowed from the old evangelism. Programmers' brains are configured differently, so his brain suits dynamic duck-typed Ruby while others want the security of an IDE.
- He ranks his languages: Ruby first, JavaScript a distant second (he likes modern ES6 with proper classes), TypeScript nowhere. For a beginner who wants the web, he recommends Ruby (with Rails for something real), JavaScript, and Go. He uses Go for HTTP proxies and recommends writing business logic in Ruby instead.
- He identifies as a "software writer," not a software engineer. He says it fits high-level business software and that the engineer label flattens different levels of abstraction.

## The Rails doctrine

- He wrote the Rails doctrine down (nine points, 2012) because a community that doesn't record its values drifts as new people arrive. His analogy is Chesterton's Fence.
- **Optimize for programmer happiness.** Accept trade-offs against runtime or performance in favor of beautiful code.
- **Convention over configuration.** It came from hundreds or thousands of lines of Java XML config. Foreign key naming (`post_id` vs `postID` vs `PID`) doesn't matter, so pick one and it becomes a convention. Rails hands you a finished toy, not a box of Lego for the Millennium Falcon. Programmers love the Lego box and make many decisions that don't matter.
- **The menu is omakase.** Someone chef-like decided the whole menu. He points to the JavaScript ecosystem, where about 25 ways to do the controller layer multiplied by the data layer means "no retained wisdom" and no durable skills.
- **Integrated systems / the monolith.** Rails tries to solve the whole web problem. He's been against microservices since the term appeared. Microservices solve a Netflix-scale problem; applying them to 20 programmers and 500,000 lines is "idiotic." The first rule of distributed programming is "do not distribute your programming." He hates "premature decomposition."
- Basecamp and HEY are each roughly 100,000 lines of Ruby, and Basecamp has about 420 screens. He says a single human can understand a system at that scale, and it starts breaking down beyond roughly 500,000 lines.
- He also decries splitting front end and back end as "one of the great crimes against web development." HEY shipped about 40 KB of JavaScript, versus Gmail's roughly 28 MB uncompressed (about 6 MB compressed).
- **No one paradigm.** Ruby is object-oriented at its core but borrows functional ideas (blocks, immutable strings). He says Rails is a remix of ideas from many camps. He notes functional languages struggle on the roughly 10% of problems that need mutation, and he's an "object oriented guy."
- **Exalt beautiful code.** **Provide sharp knives.** He trusts developers, like Matz does, and says "maybe you cut off a finger... you're not gonna do that again."
- **Value integrated systems.**
- **Progress over stability.** He says this is the point he'd rewrite today. Rails has been very stable (Rails 8 was nearly a no-upgrade from 7, which was nearly a no-upgrade from 6). The 2010s JavaScript churn showed him that stability matters. He says Basecamp from 2003 still runs and looks like today's Rails code.
- Active Record is the crown jewel. It follows Martin Fowler's pattern from "Patterns of Enterprise Application Architecture," which he has reread many times. It turns tables into classes and rows into objects. He accepts SQL rather than hiding it, calling SQL "very humanly readable" and still worth learning ("SQL was a good thing to invest your time in learning"). Rails provides a "soft ramp that goes to infinity."
- He accepts Worse Is Better. He releases open source slightly broken to invite contributors, because people join a project they know how to fix.

## Rails 8, no build, and the JavaScript dark ages

- No build is his rejection of the JavaScript tooling of the 2010s. He says he doesn't hate JavaScript but hated pipelines like webpack, which wouldn't compile after sitting for five minutes.
- His view of the cause:
  - Browsers had stagnated since IE5's freeze, so everyone pre-compiled their JavaScript into a dialect they wanted.
  - Huge companies like Facebook sliced web development into 15 niche roles, which injected complexity.
  - Some complexity was a necessary bridge, in his view. Browsers are now strong enough that you can write text files and serve them with no pre-processing.
- He wants to combine the '90s ease (FTP a PHP file) with modern progress. Pieter Levels (PHP, jQuery, SQLite) proves it's not nostalgia.
- He gives Chrome credit as a gift to web developers and opposes the DOJ's push to split it up. Google's Chrome kept the open web viable as a development platform, he says. He praises Ladybird as a rare independent browser engine.
- He calls GDPR cookie banners "a monument to good intentions leading straight to hell." They made the internet ugly, helped no one's privacy, and benefit only lawyers, accountants, and bureaucrats.

## AI, vibe coding, and learning to program

- DHH uses AI in a separate window, not an agent driving his editor. He tried Cursor and Windsurf and disliked it: "I can literally feel competence draining out of my fingers."
- When he wrote Omakub's Bash with AI doing the typing, he kept asking for the same conditional syntax and wasn't learning it. His fix: type the code yourself, because "you learn with your fingers" (the guitar analogy). He prefers Claude Code in the terminal but finds it too slow and impatient-making.
- He says AI makes him a bit smarter each day when he uses it for explanations: ELI5 answers to things he'd be embarrassed to Google. Estimate: about half a percent a day, compounding. He treats it as a pair programmer, which he wouldn't tolerate from humans for more than five minutes as an introvert.
- On Ruby specifically, AI impresses him occasionally but would be told to shape up if it were a junior programmer. He is skeptical of Dario Amodei's claim that 90% of code will be AI-written by year end. He notes Tobi's Shopify memo asking teams whether a task could be done by AI before hiring.
- Ruby's high bandwidth (lots of concept per character) matters for human-AI collaboration, because both sides can read compact human-readable code.
- Programming might become like horses, a recreational skill. He says he'd feel gratitude, not regret, after decades of an economically valuable career. His own motive: the joy is in typing the code, like playing "Stairway to Heaven" yourself rather than playing a recording. If he stopped programming to manage AI he'd become "a project manager of a murder of AI crows."
- On learning: write more from scratch than you vibe code. "You're not gonna get fit by watching fitness videos." Vibe coding gives "empty calories." If you can only vibe code, you're not a programmer. He compares it to Excel making accountants into model builders, which he finds wonderful but not programming.
- On skill: he rejects the idea that you can be a good editor without being a good doer. Editing is the reward of being a good writer. He doesn't buy prompt-engineering wizards, and thinks the real promise of AI is that messy natural language works. Today, vibe coding falls apart on real products, creating a whack-a-mole where fixing one thing breaks five (the same mistake junior programmers make).
- On the future: "nobody fucking knows anything." He cites VR (Lawnmower Man in '95, still not here), airplanes (huge progress to the 747, then flat), and COBOL still running Social Security. He advises being content with all outcomes.

## Small teams, no managers, and 37signals' way of working

- Default team size at 37signals is two: one programmer, one designer, one feature. Small teams "just do." No roadmap argument, no 18-month plan, just build something and see if it's good. He says you know more about the next step when you're one step behind than when you plan ahead.
- The first version of Basecamp took him about 400 hours in 2004. At the time Jason paid him $15 then $25 an hour. The whole company was four people. He says you can't build Basecamp with a thousand-person team. "You will build the kind of software that a thousand people builds."
- Managers: he tried hiring engineering managers for a couple of years, concluded he was right, and went back. He argues feedback on work needs someone better at your craft than you, which middle managers aren't. Programmers who become managers lose touch fast. Meetings are toxic and he'd rather leave people alone for long uninterrupted blocks. He calls manager, lawyer and similar roles services to call in occasionally.
- He cites Quake II (id Software): about eight designers and programmers, no managers.
- The company stayed bootstrapped. No venture capital because once you take other people's money, they want a huge return and the enterprise-sales playbook follows. Jeff Bezos bought secondary shares from Jason and DHH, with 100% going to them personally and nothing to the company. DHH says it acted as "a vaccine" against taking VC and a vote of confidence. He now regrets having taken that vote of confidence for granted.
- Finance: 37signals went almost 19 years without a head of finance. A sales-tax nexus mistake across US states cost about two years and $5 million in settlements before they hired one. They once had a full-time data analytics person for 10 years, then chose an accountant over analytics.
- Work rhythm: 40 hours a week is "a ton if you don't piss it away." Remote work lets him close the door for six hours. Kids made his schedule stricter (roughly 9 to 5:30) without changing his total hours. He says overwork claims of 80 to 100 hours are padded with fluff.
- His partnership with Jason Fried lasts because each trusts the other's area (technology vs design/product). They argue about ideas, not people, spend little direct time together (maybe two hours a week), and follow "disagree and commit," which he credits to Bezos.
- He says small is not a stepping stone. "Mojito Island is a mirage"; flow research (Csikszentmihalyi) shows peak happiness comes from stretching your skills, not retiring. He doesn't want to be the best in the world at one thing, just the top 5% at several.

## Cloud exit, owning hardware, and home labbing

- 37signals left the cloud. The AWS bill peaked at about $3.2-3.4 million a year. Realization in early 2023: servers had gotten much faster, so costs should fall, but his bills rose.
- The cloud pitch of easier, cheaper, faster he judged mostly false. AWS isn't easier now (IAM is "hella complicated"), isn't cheaper, and only speed held true. AWS runs at roughly 40% margins, which undercuts the "competitor's margin is my opportunity" idea.
- The move: in just over six months, seven major applications (compute, caching, databases, workers) went onto new Dell servers in a professionally managed colocation data center. They hired no extra staff. White-glove remote hands (Summit, previously Deft) swap parts, so "it's not that different" from the cloud's view.
- Savings: cut infrastructure spend by half to two-thirds. They projected about $10 million over five years. They kept S3 on a four-year contract for petabytes of files because discounts require long commitments.
- His reasoning: it's cheaper to own what you use for years than rent it. He cites the internet's distributed design (DARPA) and notes outages like US-East-1 take down large parts of the net. Modern CPUs jumped again after TSMC and Apple pushed process technology, so servers are exciting again.
- His next experiment is home labbing: running server hardware in his apartment with a 5-gigabit connection. He notes that when Basecamp ran on a single box in 2004, a 100 Mbps link sufficed.
- He admits the argument against it: someone said "imagine losing to Jira but boasting that you have a couple million dollars per year." His reply: saving $2 million a year matters, an inefficient business is "a splinter in my brain," and opportunity cost isn't ignored but doesn't justify indifference to cost.

## Open source, WordPress, and Apple's 30%

- Open source philosophy: build it primarily for yourself; users aren't customers. Early on he put a slide saying "fuck you" in answer to demands like "unless you implement an Oracle adapter this is always a toy." Open source is a gift exchange, not a vendor relationship, and walking away is allowed. He argues there's no funding crisis and that people wanting money should sell software or get hired by a company that does open source.
- He prefers the MIT license for being short and clear, and dislikes GPL's demand for code.
- WordPress: he criticized Matt Mullenweg's conflict with WP Engine. You can't give away a gift and then demand a share once the user succeeds, he says. Licenses define the obligations on both sides, and violating them "upends decades of open source licensees and the essential de facto case law." He says Matt should drop it, and that the grab destroyed value (trust) rather than capturing "easy money."
- Apple: when HEY launched in 2020 (one week before WWDC), Apple blocked updates unless HEY used in-app payment with a 30% cut. DHH refused: "I will burn this business down before I hand over 30% of it to Apple." Public pressure produced a truce with a dummy-account workaround.
- He credits Epic and Tim Sweeney (over $100 million in legal fees, by DHH's account) for the ruling that lets apps link out to web payments. 37signals plans new HEY apps that take payment on the web, giving a direct billing relationship that works across platforms.
- He says Apple's toll booth soured his 20 years of evangelism, and that he lost Apple partly over the Vision Pro, whose lack of developer goodwill hurt. He now runs Linux (Ubuntu with his Omakub setup), Neovim with LazyVim, and a Lofree Flow84 keyboard. He keeps his Apple 6K XDR monitor and a Logitech MX3 mouse. He says Linux is closer to what he deploys on and a fresh machine takes about 30 minutes to set up. Switching virtual desktops on Linux is nearly instant, unlike macOS's animation.

## Priorities, flow, hiring, and racing

- Hiring: he judges work, not resumes. Candidates need a good cover letter (he works remotely, so writing matters) and a real programming test that mimics how the team works. He says the capacity to evaluate work products is a superpower, which he compares to Elon Musk and Steve Jobs pushing for simplification while knowing enough to be credible.
- Gut over analytics: the upcoming book with Jason Fried is about trusting your gut when you don't know what you're doing upfront. "Inspiration is perishable" (the last essay in "Rework").
- Family: he says his three boys and wife matter more than all his work. He has logged over 1,000 hours of Fortnite with his kids, and is taking up go-karting with his oldest. He thinks the Coco Chanel line applies: the best things in life are free, the second best are very expensive. He wants to be content with all outcomes and recommends people treat inspiration as a thing to follow.
- Racing: he got his license at 25 (Danish car taxes were over 200%). A friend took him to a track in Chicago in about 2007, he drove a single-seat Mazda race car, and he got hooked. He raced seriously from 2009, reached Le Mans in 2012, and won his class at Le Mans in 2014. He drives in LMP2 as a gentleman driver alongside a professional co-driver. Flow is nearly guaranteed in a race car because it takes 100% of his brain, unlike programming flow, which is a lottery. Driving at the edge of adhesion balances danger and skill. A key mistake at the 2024 Le Mans came in the rain.
- His car is a Pagani Zonda HH, which he says he'll never sell. His fastest speed was about 340 km/h (just over 200 mph) at Le Mans.
