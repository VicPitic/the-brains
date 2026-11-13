## How Nvidia nearly died in 1995 and what Jensen learned

- Nvidia started in 1993 with a mission "that has no chance of success": build a new kind of computer for problems normal computers can't solve. The catch is that apps for such a computer don't exist, so the company had to create the problem as well as the chip.
- With no customers, the three founders spent afternoons in arcades studying Sega's 3D games (Virtua Fighter, Daytona). Jensen went to Japan and pitched Sega: port your games to the PC, and Nvidia builds a chip for your game console.
- About two years in, the first architecture proved wrong. It used forward texture mapping instead of inverse, curved surfaces instead of triangles, and no Z-buffer. Meanwhile Silicon Valley was full of 3D graphics startups (3dfx, Rendition, Silicon Graphics, Intel), which Jensen put at eventually about 100.
- His call on strategy: "we don't know what the right strategy is, but we know what the wrong technology is." So stop doing it the wrong way and give the company a chance to work out the strategy.
- He told Sega's CEO Shoichiro Irimajiri (his own account of the pitch):
  - The technology doesn't work.
  - He should be let out of the contract and Sega should find another partner.
  - Nvidia still needed the last $5 million, as an investment instead of a payment.
- Irimajiri said yes after a couple of days. Jensen says the odds of getting that money back looked like 0%, and he would not have invested himself. Sega sold the stake at the IPO, at a valuation of about $300 million.
- He laid off most of the company. He bought three Silicon Graphics 3D-graphics textbooks with the $200 in his pocket ($60 each) and gave one to each architect: "Read that and let's go save the company."

## Narrow focus and platform strategy: how Nvidia beat about 30 competitors

- The team learned the best-known art from Silicon Graphics, then reimplemented it from first principles.
- Silicon Graphics ran its geometry engine as general-purpose software on processors. Nvidia stripped out the generality and hardcoded only what video games needed into the chip.
- The result was one chip producing images about as fast as a $1 million image generator. That was the RIVA 128, which Jensen says saved the company.
- The strategic choices were:
  - Build a 3D chip for one application, video games, not CAD or flight simulators. Jensen "bet the farm" on it. Narrowing the problem let him reject all other complexity.
  - Build an ecosystem with game developers, porting and adapting their games to Nvidia silicon. That turned a technology business into a platform business.
  - GeForce was, at heart, a game console inside the PC.
- Nvidia was the first technology company to serve one audience, gamers, and the gaming industry itself didn't exist in 1993. Doom and Quake later made it take off.

## Surviving on fumes: the emulator and the unproven chip

- With $5 million draining monthly, a normal cycle of tape-out, silicon back, test, bug, tape-out again was unaffordable.
- The workaround was an emulator, a machine that pretends to be your chip so software can be tested before the fab. Jensen spent about half of the roughly $1 million left in the bank on one. The maker (he names it as IOS) was already out of business, and he bought the unit from inventory.
- He then asked TSMC to go straight to production with no first-silicon test. They told him nobody had ever taped out a working chip first time. Morris Chang backed him anyway. Jensen says the company had a strong purchase order from a customer (Diamond Multimedia) but not all the money, so the risk was real.
- The chip was a hit, and Nvidia became the fastest-growing technology company in history to go from zero to $1 billion, by his account. He says the emulator-first methodology is now used across the chip industry.
- What he says the crisis taught:
  - How to develop winning strategies and how to create a market (3D gaming then, AI later: "exactly the same blueprint").
  - How to stay calm and think systematically in a crisis.
  - How to cut all waste and work from first principles, doing only what is essential, "living on fumes at all times."

## Fear, vulnerability and daily operating habits

- Jensen still feels "30 days from going out of business" every morning. He has used the phrase for 33 years. He says "I have a greater drive from not wanting to fail than the drive of wanting to succeed."
- On vulnerability as a leader:
  - The company doesn't need him to be a genius who was right all along.
  - The more vulnerable a leader is, the more people will tell him "that's not exactly right" or bring information he hasn't considered.
  - "If you're always right, how can you possibly pivot? Because pivoting requires you to be wrong."
- His method is to reason from first principles all the time and reassess continuously. He admits the constant reassessing is partly what causes continuous anxiety.
- His image for the job is surfing: you can't predict the waves, you deal with the ones you have, and skill matters.
- He calls himself the longest-running tech CEO in the world. His two goals: don't get fired, don't get bored. What keeps him going is not always enthusiasm. Sometimes it is fear or frustration, "whatever keeps you moving."
- Habits: up at 4am reading emails, which he says run to several thousand a day. He sleeps six to seven hours. He works every day, including Thanksgiving and Christmas, even on vacation. Both of his kids work at Nvidia.
- He pushes back on the idea that success is all joy. Much of it is "long periods of suffering and loneliness and uncertainty and fear and embarrassment and humiliation." People often disbelieve you when you invent something new. He thinks it's healthy to say this openly, and says the suffering makes the good outcomes far more deeply appreciated.

## Seeing the future: how Nvidia spotted deep learning and bet on it

- In 2012, Alex Krizhevsky and Ilya Sutskever, in Geoffrey Hinton's Toronto lab, built AlexNet. It beat 30 years of hand-built computer-vision algorithms, and they trained it on two Nvidia GTX 580 cards in SLI. Jensen calls that "the big bang of modern AI."
- Nvidia was already working on computer vision, and he noticed deep learning cropping up at many universities. He reasoned that a deep neural network is a "universal function approximator": give it inputs and outputs and it learns the function in between, for almost any problem.
- Two things had to be true. It had to scale, and it had to learn without human-labelled data. Unsupervised learning (for example, predicting masked words in text) arrived a few years later.
- His point is that a flash like that is brief, and the company succeeded because it paid attention to it.
- In 2016 he built the DGX-1, eight chips linked with NVLink. It cost "a few billion dollars" to develop and sold for $300,000. At launch the audience was silent and there were no purchase orders. Elon Musk was the first taker, for a nonprofit AI lab (OpenAI). Jensen drove one to San Francisco and delivered it himself.
- The DGX Spark he gave Musk in 2025 delivers the same 1 petaflop at about $4,000 and the size of a small book.
- His radar for what comes next:
  - Surround yourself with the best computer scientists. He says Nvidia's culture draws people who want to serve the technology itself, not an advertising or social business.
  - Run one of the largest industrial research labs and partner with universities and outside researchers.
  - Use customers across every industry as signals, which he calls the broadest radar of any company.
  - Stay alert by paying attention: "I haven't found a single way of being able to stay alert without paying attention."

## Betting on conviction: CUDA

- Around 2005-2006, Nvidia added CUDA to its chips. Nobody paid for it, but costs about doubled. Nvidia's valuation fell from about $12 billion to roughly $2-3 billion, by his recollection.
- At CUDA's launch the audience was silent, no customer wanted it and nobody understood it.
- His rule for the team: ask "do we believe this or not?" If the belief is grounded in first principles and not hearsay, the thing is really hard, and Nvidia is the right company to do it, "we owe it to ourselves to go pursue it." Not acting on a belief you hold means a lifetime of regret.
- He notes that every Nvidia invention (GPUs, programmable shaders, real-time ray tracing, CUDA) was undervalued by the market at first while costs rose.
- CUDA is what enabled AI on Nvidia hardware.

## AI, jobs and safety: how Jensen frames them

- **Purpose versus task:** He argues a job's purpose is not its tasks. AI now sweeps radiology, and Hinton predicted radiologists would disappear, yet their numbers have grown. Their purpose is diagnosing disease, not studying images. Faster, cheaper image analysis means more scans and patients, better hospital economics and more hiring. "If your job is the task," AI replaces you. If your job has a purpose beyond the task, it changes but survives.
- **New industries:** He expects robots to create maintenance, manufacturing and even apparel jobs, as cars created mechanics.
- **Technology divide:** He hopes AI narrows the divide, because anyone can use it in their own language. He expects yesterday's AI to be excellent and to run on phones. Only frontier AI needs vast energy.
- **Energy:** Moore's law cut the cost and energy of computing about 10x every five years. He says accelerated computing improved performance about 100,000x in the last 10 years. He expects AI's energy needs for most people to become "minuscule", and expects small nuclear reactors of hundreds of megawatts to power AI factories within six or seven years.
- **Safety:** He says most added AI capability goes toward safety and accuracy, such as step-by-step reasoning, research before answering, reflection and tool use, which cut hallucination. He compares it to car horsepower going into handling, ABS and traction control.
- **Cybersecurity as the model:** Defenders share breaches and patches across companies. He expects AI defence to work like this, with millions of AI agents defending against attackers. He also expects postquantum encryption to be developed.
- **Consciousness:** He rejects the idea that today's AI is conscious. It has knowledge and intelligence, not experience, and its blackmail-style outputs are pattern generation. He is wary of doomsday scenarios and says there will likely be gradual progress, not one AI that arrives with no one else's matching it.
- **Synthetic knowledge:** He predicts that within a couple of years about 90% of the world's knowledge will likely be AI-generated, which he is fine with as long as it is fact-checked against first principles.
