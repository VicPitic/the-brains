## Why DHH picked Ruby and why programmer happiness drives his career

- DHH first saw Ruby in articles by Martin Fowler and Dave Thomas, written in Ruby to explain programming concepts. He wondered "is this a programming language or are they just writing pseudo code because this looks too good", with no semicolons and none of the line noise of other languages.
- He had worked with PHP, Perl, some Python and a fair bit of Java before, all "fine in their own regard". Ruby gave him a desire for "Peak Aesthetics".
- Ruby taught him metaprogramming ("a program can program itself"). He says whoever teaches you that next tier of programming gets a bond with you.
- He did not care that Ruby had fewer libraries and frameworks, because he could write what he needed himself. It still had "just enough" to bootstrap from.
- Early Rails came fast: about two weeks to get HTML talking to a database, and a couple of months in "the shape of rails as it exists today was visible".
- Ruby's motto, from Matz, is "optimized for programmer happiness". DHH's analogy is photography: the best camera is the one that makes you want to go out and shoot. Ruby made him want to program, so programming itself became the reward.
- He spent years trying to persuade everyone to use Ruby for everything. He later concluded that the larger part of the superpower is helping programmers find the experience he found with Ruby, whether in PHP, Python, Elixir or something else.
- The world of web languages is small. Of all languages ever made, perhaps 50 were used seriously and 10-20 are real options for web work today. After sampling nearly all of them, he still picks Ruby. He compares other languages to a vacation: JavaScript is fine when he needs it, "then I come back to Ruby and I go like holy [ __ ] this is good to be home".
- He thinks the 2010s made it almost dirty to say you liked programming, as if passion were discriminatory against people who hate their jobs. He says it is easier if you like it, and that few programmers who built something notable lacked a passionate phase.

## Competence, the soft ramp, and why "I don't know anything" is a bad message

- DHH rejects the "I don't know anything" dog meme and the idea that competence doesn't exist. He calls it a luxury belief: people who already have marketable skill pretend it doesn't matter, and juniors who embrace it are the ones who suffer.
- He agrees that getting started should be easy. In a Java shop he watched a new project wait a week for "XML situps" to configure a Spring web app server, and judged that a lack of sophistication, not a sign of mastery.
- The first-run experience matters most: "can you do a thing and then see a thing". Once you're in that loop you're well on the way to becoming a programmer.
- His principle is "the ramp needs to be soft but it needs to go to infinity". Day one can be knowing nothing, but a year later you shouldn't be a "copy pasta monkey" who doesn't know what you're inserting.
- He notes the JavaScript world has recreated some of the madness where early difficulty is mistaken for mastery, when it is just boilerplate.
- Pulling the thread is a transferable skill. He applies the same "I'm going to figure it out" mindset to a ventilation problem at home (identify the variables in a closed-loop system) and to race car driving (find the main levers, such as the brake trace).
- Bugs feel like magic only until you remember "there is no magic, there's just sand shoved together into silicon", so it will be logical once understood.
- He expects AI slop to make it easier to give up on understanding, and wants juniors to build stamina and perseverance to figure things out.

## How DHH struggled to learn programming and found the right level of abstraction

- He failed to learn programming three times:
  - Around 1985-86, age five or six, he typed in code listings from a magazine and couldn't make them work.
  - Around 12 or 13 (Amos), he couldn't see the point of a variable.
  - Around 15-16, his friends were into assembler, and he balked at needing vector math for games.
- There was no Stack Overflow, Google or AI, and little help.
- It clicked around age 20 on the gaming site dailyrush.dk (around 2000), written in PHP. There were real programmers on the project to ask and code to read.
- He found his level of abstraction: concepts, words and domain models, not vector math. Ruby's English-like flexibility (such as `unless`) delighted him.
- He is "an object-oriented programmer through and through". He likes functional elements inside his objects but doesn't want to separate functions and data.
- He likes CRUD: "almost everything on the internet is some [ __ ] database getting inserts, updates, writes and deletes", and he embraces that.
- He tried Commodore 64 assembler about a year earlier and lasted about 45 minutes. He likens it to boats: he likes the image but wants to get back to shore.
- He deliberately flunked high school math by copying a friend's homework, then recognized math is unforgiving. He thinks that is fine because open source lets him trade: other contributors who love math made Rails fast. Roughly 7,000 people have contributed code to Rails.

## Open source is a gift exchange and a meritocracy, not a democracy

- DHH says open source looks democratic but is "meritocratic". The person who does most of the work, in the best way, ends up with the most say, which is what you want.
- Every project he respects (Linux, SQLite, neovim, Ruby, Rails) has someone at the top who does the bulk of the work and sets the direction. Projects run as a "Kumbaya circle" go nowhere.
- Maintainers aren't vendors or employees. His slide at his first Rails conference talk (about three months after release) said "[ __ ] you", aimed at people demanding things like Oracle adapters. He later softened it to "PDI": please do investigate. If you want it, submit the patch, and if the code is good he'll take it and thank you.
- Users can be fired, and the fork button is always available. He is wrong often and changes his mind, but the power dynamics should still be accepted.
- Forks and tension are healthy. Git exists because Linus was evicted from BitKeeper and wrote his own.
- He wants plurality, not convergence: programmers are "weird and wonderful in very idiosyncratic ways that are incompatible", so there should be many languages and frameworks. The vim/neovim relationship (patches flow both ways) is an example.
- He doesn't want to be paid to do open source, so he has no need to "smash everything" or capture market share. He smiles when he sees Rails-isms in Elixir or Laravel.
- That plurality gives permission to be opinionated. Static typing is the hill he'll die on for Ruby: "we're not putting static typing into Ruby", since plenty of statically typed languages exist.
- The open internet lets you use any language, unlike iOS or Android, where you are a second- or third-tier citizen if you don't use the platform's language.

## No-build, TypeScript, and why DHH removed it from Turbo

- DHH pulled TypeScript out of Turbo, a front-end library, "last year" (relative to 2024). He objects to people who show up to tell maintainers it was the wrong decision, and to PRs opened to put it back.
- He is fine with others using TypeScript but won't "ram it down my throat". He is working toward a TypeScript-free future.
- He is big on no-build, and TypeScript doesn't fit because it must be built. He would welcome browsers running TypeScript natively, which would let both camps coexist.
- Evidence he cites: hey.com runs as a million-dollar business, serving email to tens of thousands of customers, on a no-build setup for about four years. It serves roughly 120 individual JavaScript files.
- He argues it works better for caching. About 98% of code rarely changes, so small files live in cache forever. A single bundle turns over entirely when one semicolon changes, which hurts people on slow connections.
- He compares critics to someone insisting swans can't fly while watching one flap past, or noting that one black swan disproves "all swans are white".
- Cloud exit, no-build and "no thank you" to TypeScript are not trolling or engagement farming to him. They are how his company is run, and he will have to maintain them for years.

## Staying calm in online arguments

- With age he stopped taking the bait. Discussions are public, and others are watching the "Coliseum".
- His approach is to plant seeds. People can't be convinced in real time because of the ego and community "barricades", but a good argument can land over the barricades. Months later people have said they tried it and it worked.
- He compares it to parenting: exposure to bodily fluids desensitizes you, and a trauma surgeon stays calm at a missing leg. Enough exposure makes Twitter's insults routine.
- He prefers open discourse to policed discourse, since over the past five years many "consensus" views turned out wrong. He tries to model good behavior publicly, including not calling people names even if he thinks them. He lets it run "four laps" in his head instead of tweeting it.
- He expects to hold views he thinks are idiotic today in a couple of years, and expects others to think the same of him.

## AI coding: a better Google, not an autocompleter

- DHH enjoys AI as a superior Google, Stack Overflow and API doc, and as a pair programmer who doesn't drive. He says he enjoys projects slightly more since AI arrived.
- He doesn't want AI writing his code. While writing his Ubuntu setup project Omakub (he calls it a remix of Ubuntu as a programming environment) in bash, he used AI to translate Ruby into bash. He found himself asking the same question a fourth time and decided: "the training wheels are great when you're first learning to balance but if you keep them on forever you're never going to find balance".
- When it starts autocompleting his code he's "out". He likes the code part and likens it to wanting to move the joystick himself in Street Fighter, not watch a robot play.
- He distinguishes two phases of his career: first programming for outcomes, then, after Ruby, programming for its own sake. He is keeping the second phase.
- He is skeptical that AI will definitely get to the promised land. His analogies: Elon Musk's 2017 self-driving promises, and VR (he mentions The Lawnmower Man and Zuckerberg putting about $40 billion into it) that "five people in a dog showed up" for. He notes nobody can predict what will become reality, and even AI researchers say they don't fully understand why models work.
- He says "maybe there's five years left" of manual programming and he'll enjoy them. He'll keep programming afterward anyway, like people who program the 1 MHz Commodore 64 for the challenge.

## Metaprogramming moment, hiring juniors and open source as a cheat code

- His decisive moment was discovering Ruby metaprogramming and building Active Record. Writing `class Person < ActiveRecord::Base` and `has_many :comments` showed that he could write DSLs at the same level of expression as the language designer. In his words, you couldn't tell his `has_many` apart from a keyword.
- He tries to scatter many "golden ticket" moments like this in Rails so people find their own early.
- Race driving as a parallel: a lap is a clock cycle, optimizing it is like micro-benchmarking, and a race team is a miniature company compressed into six months. He got a license at 25, bought an Audi S4 on arriving in the US for 37signals, and later set the goal of the 24 Hours of Le Mans. He wants "a little bit" of risk as seasoning.
- On hiring juniors: they are hired on promise, not accomplishments, so look for "sparkle".
  - Don't use AI for cover letters: he can tell, and the same phrases appear across about 50 other applicants. His company requires cover letters specific to the opening.
  - Commit to being good and to figuring things out ("not the dog that doesn't know"), and peel back the onion.
  - Good bug reports show analytical ability, especially reducing an issue to the smallest reproducible case.
  - He reads a candidate's code assuming he will maintain it in 5-10 years, so he hires people whose code he wants to look at again.
- At their last hiring round they received 1,500 applications. He notes feedback to all would take about three weeks of full-time work (5 minutes each), which is why detailed rejections aren't possible.
- Open source is "a cheat code" for juniors because he can read their actual lines of code. He looks at open source contributions before almost anything else and doesn't look at grades, though it isn't a requirement.
- He also recommends running Linux on your own laptop as a differentiator, since a Mac is now the vanilla AI wrapper of computing in web circles. He had switched to Linux full-time relatively recently.
