## Optimize for programmer happiness as the first design principle

- DHH says the first pillar of the Rails Doctrine comes straight from Ruby's core motivation: Matz's "original heresy" was to put the programmer's happiness above competing concerns like safety, uniformity, or purity.
- He contrasts Python ("one and preferably only one way to do something"), Java (protecting programmers from themselves) and Smalltalk (purity of message passing) with Ruby's expressiveness, sharp knives and keyword accumulation.
- Ruby makes the machine "appear to smile at and flatter its human co-conspirator", often via complex implementation hidden behind simple-looking code. He says these choices "were not free", which is why they are commendable.
- He describes discovering Ruby as finding "a magical glove that just fit my brain perfectly" and a "fountain of flow" (Csikszentmihalyi), which moved him from programming because he needed programs to programming for love of it. He says it set the course of his life's work.
- Optimizing for happiness is hard to measure at the micro level but clear at the macro level: the Rails community is full of people who report "better, more fulfilled working lives".
- He concludes it is "perhaps the most formative key to Ruby on Rails".

## The Principle of The Bigger Smile (Rails' version of Least Surprise)

- Ruby's early Principle of Least Surprise (PoLS) meant behaving as expected. Example: Ruby's `irb` accepts both `exit` and `quit`, while Python's console says "Use exit() or Ctrl-D" even though it clearly knows what was meant.
- PoLS faded because it is subjective ("least surprising to whom?" Matz), and it fed fruitless bike-shedding on the mailing lists as the community grew.
- Rails follows an equivalent: the Principle of The Bigger Smile (of DHH). APIs are designed around whatever makes him smile more and broader.
- He admits this sounds "comically narcissistic" and says creating something like Ruby or Rails is at the outset "a deeply narcissistic endeavor": "I created Rails for me. To make me smile, first and foremost."
- Examples of silly lengths taken for the principle:
  - The Inflector, which maps Person to people, Analysis to Analyses, Comment to Comments. It was fiercely controversial early on and is now unquestioned.
  - `Array#second` through `#fifth` (and `#forty_two`), which critics decried as bloat versus `Array#[1]`.
- He still relishes writing `people.third` in a test or the console. It is "not logical", "not efficient", maybe "pathological", but it makes him smile and helps justify 12 years of involvement with Rails.

## Convention over Configuration

- An early Rails productivity motto: "You're not a beautiful and unique snowflake." Giving up vain individuality lets you skip mundane decisions and move faster on what matters.
- Example: whether primary keys are "id", "postId", "posts_id" or "pid" is not worth recurrent deliberation. Thousands of such decisions only need to be made once, and Rails swings its machete at that jungle.
- Conventions also give a field for deeper abstractions. If `Person` reliably maps to a `people` table, the same inflection lets `has_many :people` find the `Person` class. Good conventions "pay dividends across a wide spectrum of use".
- They lower the barrier for beginners: much of Rails can be benefited from in ignorance, so great applications can be built "without knowing why everything is the way it is". A blank page and a thick textbook make it hard even to know where to start ("finding a thread to pull").
- For experts, an obvious next step for every change lets you move through the parts of an app that resemble every other app. "A place for everything and everything in its place. Constraints liberate even the most able minds."
- The peril: most worthwhile apps have some unique part, maybe 5% or 1%. He contends most impulses to be a unique snowflake are ill-considered and the cost of "going off the Rails" is under-appreciated, but enough of them are justified that each must be examined carefully.

## The menu is omakase

- Omakase: letting the chef choose gives a good meal even before you know what "good" is. For programming, it means letting others assemble your stack.
- Convention over Configuration concerns how to use individual frameworks. Omakase concerns which frameworks, and how they fit together.
- He challenges "use the best tool for the job": picking the best tool requires a foundation for judging "best" with confidence, which is hard. Choosing each library in isolation is like picking each course of an eight-course meal; the objective is the whole system.
- Rails trades each programmer's individual privilege to choose every tool for "a better tool box for all". Three dividends:
  1. Safety in numbers: shared default setups make it easier to teach, help and debate ("We all watched the same show last night at 7"), and strengthen community.
  2. Everyone perfects the same basic toolbox: much software pain comes from component interaction, so shared configurations that fail the same way get fixed for everyone.
  3. Substitutions are possible but not required: you can delay swaps until you have developed a personal palate, then swap diligently and enjoy the rest of the shared stack.

## No one paradigm: Rails is a quilt

- DHH says there is a strong emotional pull toward picking one central idea and following it to its logical conclusion. Rails is instead "a quilt", a composite of paradigms that would conflict if contrasted one by one. There is no championship with a sole winner.
- View helpers are by default one big pot of functions in a single namespace ("PHP soup"). He argues PHP had it right for rarely interacting functions. Presenter objects can fit when methods depend on each other, but that is the rare fit.
- Models are the "prime bastion of object-oriented goodness": finding the right names, increasing coherence and lowering coupling is the fun of domain modeling. Even there, Rails concerns (a specialization of Ruby mixins) give models a wide surface area with direct access to their data.
- Active Record mixes database interfacing with domain logic, which offends purists, but he says it is the practical way to build a web app that almost always talks to a database.
- Ideological flexibility lets Rails tackle a wide array of problems; overlapping paradigms "cover the flanks and guard the rear".
- The cost is conceptual overhead: you benefit from procedural and functional experience as well as OO, and from knowing JavaScript and SQL for the peaks. The mitigation is a "rush to Hello World", delivering real value early so people level up and treat learning as a joy.

## Exalt beautiful code

- DHH says aesthetically pleasing code is a value unto itself and deserves a "full seat at the table of priorities", though it does not always trump other concerns.
- In Ruby, beauty is often at the intersection of native idioms and a custom DSL. His Active Record example: `belongs_to :account`, `has_many :participants, class_name: 'Person'`, `validates_presence_of :name`. It looks like a DSL but is just three class-method calls taking symbols and options, yet gives immense power. It also honors Convention over Configuration: `belongs_to :account` assumes an `account_id` column in the `projects` table.
- Migrations are the "essence of framework power": declare an `ActiveRecord::Migration` subclass with `#change` and the framework handles the plumbing, including running it forward with `rails db:migrate` and reversing it to drop the table. The programmer does not stitch the workflow together from libraries.
- Beauty can be subtle and about rhythm. `if people.include? person` focuses on the collection, while `if person.in? people` makes the person the subject. He finds the second more beautiful when the condition is about the person.

## Provide sharp knives

- Ruby deliberately includes sharp knives, the best known being monkey patching. Critics predicted calamity from trusting programmers with it, for example overwriting `String#capitalize`.
- Nothing in Ruby stops that. Good sense is enforced "by convention, by nudges, and through education. Not by banning sharp knives from the kitchen and insisting everyone use spoons to slice tomatoes."
- The flip side is wonders like `2.days.ago`. If you would trade that for safety, he says, "Ruby is probably not for you." The language flourished because it trusted programmers and taught them to use capable tools, assuming most want to become better.
- He notes it is always about other programmers: "I've yet to hear a single programmer put up their hand and say 'I can't trust myself with this power, please take it away from me!'" He rejects that paternalism.
- Rails concerns are his current example. A thin layer of sugar over Ruby modules, they let one class encapsulate multiple related concerns. Critics say they give bloat-prone programmers new drawers for clutter, which is true, but he calls it a fallacy that withholding the feature leads to architectural bliss: "If you can't be trusted to keep the kitchen sink out of your overstuffed concerns, you're probably not going to end up with a shining beacon of elegance otherwise."
- The framework should be a patient tutor, and the only route to expertise goes through mistakes ("a bit of blood, sweat, and perhaps even some tears"). Rails is "an environment for chefs and those who wish to become chefs".

## Value integrated systems: the majestic monolith

- Rails' first love is integrated systems, "majestic monoliths": a whole system that addresses an entire problem, from front-end JavaScript for live updates to production database migrations.
- The scope is broad but still understandable by one person. Rails aims to equip generalist individuals rather than segregate specialists into niches needing whole teams.
- The integrated system cuts needless abstractions, reduces duplication between layers (such as templates on both server and client), and avoids distributing the system "before we absolutely, positively have to".
- Complexity comes from new boundaries: method calls between objects are far simpler than remote procedure calls between microservices, which bring failure states, latency issues and dependency update schedules.
- Some distribution is necessary, for example an HTTP API for others. Handling inbound requests is easier than sending outbound ones ("your downtime is someone else's failure state").
- Worse is premature disintegration into services or microservices, driven by the misconception that a Modern Internet Application must be built many times over: server, JavaScript MVC client, each native mobile app. He says this is not a law of nature.
- Large chunks can be shared across apps, such as the same controllers and views for desktop web and embedded in native mobile apps, without giving up speed or user experience. The goal: "All the power of individually tuned and distributed applications with the ease-of-use and understanding of a single, integrated system."

## Progress over stability, and a big tent

- Mature systems ossify because every change hurts someone who depended on past behavior. DHH says listening too closely to conservatism means never seeing the other side, so Rails must dare to break things occasionally. This is not a license for "needless or excessive hurt"; the 2.x to 3 migration left scars and left many behind, but "in the grand scheme of things, it was still worth it".
- The test: will Rails be better off in five years for today's changes, or for adopting another problem domain such as job queuing or WebSockets? If yes, "suck it up and do the work."
- Rails should push Ruby's progress too. It has moved through Ruby 1.6, 1.8, 1.9, 2.0 to 2.6 and helped everyone upgrade faster. Bundler, the asset pipeline and Spring were controversial but are now taken for granted because of Rails' insistence.
- Progress is about people: there are no lifetime seats in Rails Core or Rails Committers, which are for those actively making progress. New blood and fresh ideas are needed.
- Big tent: Rails would become insular if everyone had to defer to every tenet, so it has "so few if any litmus tests". Proof: RSpec thrives despite his "grave discontent" with it. Rails as an API for people who want separate clients and servers is welcome as a secondary mission, even though his personal focus is the integrated system including the view.
- A big tent does not mean being all things to all people: "welcome all people to your party, and allow them to bring their own drinks." It takes real work to be welcoming and to lower barriers to entry, and a thank-you for even a small contribution (a documentation typo fix) may start the next great feature contributor.
