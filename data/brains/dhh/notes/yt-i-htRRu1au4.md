## Dynamic vs. static typing as a matter of programmer happiness

- DHH has preferred dynamically typed languages for his whole career. Ruby (used for about 20 years at 37signals) and JavaScript both fall in the camp he likes: loose, permissive, "freedom loving".
- He says TypeScript sits on top of JavaScript and gives it a typed experience, with benefits in IDEs and autocomplete. It also forces you to write code in a certain way, and he never liked that way of writing.
- His core test is enjoyment. He wrestled with the TypeScript type system on a new Turbo feature and asked the team whether anyone still liked working that way. The answer was "not me, not me, not me".
- He treats the dynamic vs. static split as a real schism in programming, one that has run for his 20-plus years in software and for at least 20 years before that.
- He still appreciates the statically typed side. He spent a couple of weeks in Swift, read the language manuals, and could see the benefits (IDE support and so on). He took some ideas away, then went back to Ruby with a sense of relief: "this is what me likes".
- He compares it to a vacation in Japan. A statically typed language is like a trip to a different, quirky, interesting country. You enjoy it because it is different, then you come home. A good trip doesn't mean you move.
- He doesn't want everyone to program the same way: "life would be so boring" if every chef used the same technique and the food all came off an assembly line.

## Why Turbo 8 dropped TypeScript

- Turbo is the framework 37signals uses to build its applications. It exists to minimize the amount of JavaScript you write while still building highly interactive apps.
- The decision came from the team itself. A new group was working on Turbo for a major new release. The new feature, plus the question "does anyone like this way of working anymore?", showed that nobody did.
- The discussion had started several months earlier. The new feature brought it back.
- His reasoning: Turbo is mainly a tool 37signals uses internally. It has some external effects, but "if we're not enjoying ourselves why don't we just yank it".
- It was cheap to test. Alberto, one of the programmers, removed TypeScript from the codebase in roughly 40 minutes, and the result was a pull request (a diff).
- Seeing the diff settled it. DHH says it looked "so much nicer" and reminded him why he is "such a big fan of JavaScript". His response was "let's just ship it".
- His message to users was short: some people like the statically typed experience and that's fine, but the people working on Turbo don't, so they are taking it out. He is glad JavaScript exists in the form he likes.
- Internally there was no fallout. His line: "we had the knife we didn't like cutting with so much so we put it at the side and used another knife."

## Why the typing debate can't be argued to a conclusion

- DHH loves technical debates and going into the weeds. He says this one is different because it carries "identity politics" stickiness.
- He says he has never seen a conversation between two programmers where one said "excellent point, I will now switch from statically typed to dynamically typed". People change their minds on this occasionally, but not from a single interaction.
- All the arguments have already been made over the decades, so he chose not to re-argue them. His position was "we're not going to change anyone's mind", so the team did what suited them.
- He thinks engaging with ideas is still worthwhile, because the debate sometimes produces breakthroughs. It breaks down when the discussion turns into tribal dynamics, where people say "you're an idiot because you like this knife" or "because you like statically typed".
- Jason Fried's observation (not DHH's): binary issues like air-cooled vs. water-cooled Porsches, or original paint vs. respray, give no gray space and so produce flame wars.
- DHH's view is that once the thread becomes personal, minds close and ideas stop moving: "it's actually the place where the discussion about ideas go to die".

## Handling internet backlash and social media dynamics

- DHH says he has built up immunity to this level of vitriol. He has been in flame wars since the mailing-list days, and the intensity has ratcheted up slowly over 20 years.
- He compares it to bigger fights. 37signals spent two weeks battling Apple for hey.com's right to exist. Next to that, this was a small thing.
- He says the pile-on was partly about his reputation: people had already formed opinions about him. It also echoed the cloud exit, where he did the opposite of what "everyone" seemed to be doing, which confuses people's sense of the narrative.
- He sees the pattern on social media as a spectator sport. Outrage that targets people (one person calling another an idiot) spreads fastest, and people show up "with the popcorn" for what looks like a fight.
- He expects a news cycle of about 24 hours, plus maybe 36 more to crest, then a small ember. People cannot remember last week's controversy. Most of the "tourists" never knew what Turbo was.
- He suggests sports as a healthy outlet for the human urge to belong to a tribe, and says nerds who don't follow sports have nowhere else to put that energy. He now thinks he should get more into sports for the same reason.
- His practical advice: "you can also close Twitter" and most of the noise goes away, apart from some leakage into GitHub, such as frivolous pull requests meant to obstruct.

## Open source as a gift, not an obligation

- Turbo is released under the MIT license ("do whatever the hell you want, but don't hold me responsible"). 37signals paid for Hotwire's development on company time, and he says they have spent "literally millions" on it. They give it away with no licensing deals and no revenue share.
- He describes the common backlash as people receiving a free gift and demanding a refund or a different gift. He has seen many open source maintainers quit over this.
- He is open about why he does it: "I'm predominantly doing open source for me". He enjoys sharing, but he is not a volunteer labor force building whatever others want. 37signals builds these tools because they need and enjoy them. Take them or don't, he says, "but could you not spit in the soup for everyone else".
- He recalls an early Rails slide that said "[expletive] you": if you don't like the gift, he'll keep making it for himself anyway.
- This episode did not change his view on open source. The loud voices on X are a small group, even if it is thousands of people. When he meets people directly or by email, they are appreciative and discussions are good.
- He reports many emails from people saying they also disliked TypeScript but were afraid to say so because opponents are so loud. He calls this preference falsification, and says being affirmed in a view that runs against the dominant narrative is valuable.
- He sees this as a recurring theme in 37signals' writing: Rework readers write in to say they also believed meetings are toxic or that inspiration is perishable but didn't think they could say it out loud. He says he likes saying aloud what others are hesitant to.
