## Riva 128 in 1997: the bet-the-company tape-out

- Jensen calls 1997 "probably nvidia's best moment". The company was nearly out of money (about six months left), time and hope, and it had made the wrong architecture bet with NV1 and NV2 (forward texture mapping, curves rather than triangles).
- Microsoft had already shipped DirectX, which was incompatible with Nvidia's architecture, and about 30 competitors had appeared. Riva 128 was a "reset" of the company.
- Decisions he made:
  - Stop fighting DirectX and build the best thing in the world for it.
  - Build the first fully hardware-accelerated 3D pipeline, with every stage down to the frame buffer in hardware.
  - Add a texture cache and push the bus and frame buffer limits as far as physics allowed.
  - Make the biggest chip anyone had imagined, use the fastest memories, and price it above what competitors would dare to go.
  - Target the enthusiast market, which would pay for the best because 3D graphics "is never good enough".
- Tape out once. The normal loop (build chip, write software, find bugs, re-tape) would have bankrupted the company. He bought an emulator from a company called IKOS that was shutting down, with no promises needed.
- The software team ran the full stack on the emulator before tape-out: drivers, QA, every game and every VGA application. Frames took very long to paint (he recalls an hour per frame).
- When leaders asked how he knew the chip would be perfect: "if it's not we'll be out of business and so let's make it perfect."
- Because the chip was assumed perfect, production, the marketing blitz and developer relations started on tape-out day.
- The lesson he draws is not "push all your chips in". When you bet the farm, you pull all the risky future work forward and simulate it in advance, so you bet when you know it will work. He says Nvidia still designs chips this way: "why tape out a chip seven times if you could tape it out one time".
- The luck he credits: Carmack (Quake on OpenGL) and Tim Sweeney (Unreal) created the first two killer apps for consumer 3D.

## Seeing deep learning and positioning for it

- Before CUDA there was Cg, and Nvidia was already using GPUs for CT reconstruction and image processing. A programmable shader is a highly parallel, massively threaded processor.
- CUDA's early adopters were researchers, across molecular dynamics, CT, seismic processing, weather and quantum chemistry. So when AlexNet arrived, Nvidia went to every AI researcher it could find (LeCun, Andrew Ng, Hinton, Ilya Sutskever) and asked how it could help.
- On AlexNet he went back to first principles and asked why it worked and whether it scaled:
  - With enough example data, it is a universal function approximator.
  - Layers are trained one at a time, so networks can go very deep.
  - Many problems need prediction, not causality (toothpaste, ketchup with hot dogs, movies, music, weather, feed ranking).
- Conclusion: almost all software could eventually be written this way, so how computers and chips are built "can be completely changed". The remaining question was "do you have the courage to put your chips behind it".
- He delivered the first DGX to OpenAI. In early years it "wasn't very useful in its current state", but he believed a few more steps would make it remarkable, and he read the arXiv papers himself.
- On BERT: masking words and predicting them is "self-supervised learning at its best". Language encodes reasoning, so emergent abilities are consistent with first-principles reasoning.

## Positioning near opportunities: the data center and Mellanox

- CEO job: "look around corners" and position the company near future opportunity even without knowing exactly what or when. His image: stand near the tree so you can make a diving catch when the apple falls. You need not be perfectly right, only the first to pick it up.
- About 17 years before the interview, he worried that Nvidia's market was limited to GPUs plugged into desktop PCs next to a monitor. Separating computing from the viewing device would make the market "explode".
- Path to the data center:
  1. GeForce Now (cloud gaming), Nvidia's first data center product.
  2. GPUs for enterprise data centers (RemoteFX-era graphics).
  3. CUDA plus GPU as a supercomputer.
- Those earlier products taught Nvidia to build data center computers before AI arrived.
- Latency: you cannot beat the speed of light, but across the planet it is only roughly 70-120 milliseconds (he is unsure of the exact figure), so the other obstacles can be removed.
- Mellanox, which he calls one of his best strategic decisions:
  - A data center differs from a desktop by networking, infrastructure, distribution and security, not by the chip.
  - Hyperscale virtualizes many users on one machine over commodity Ethernet. AI is the inverse: one training job orchestrated across millions of processors, so Ethernet is not ideal.
  - Mellanox was the leading high-performance networking company, and its Israel team now has about 3,200 people.

## Org design: the company as a computing stack

- Jensen has 40+ direct reports. He says it is not special to Nvidia, "we had the courage to build a system like this".
- Nvidia is not built like a military with generals and colonels, and has no command-and-control information flow. It is built like a computing stack (architecture, chip, software, modules on top), with people running layers.
- Title does not determine position. The best person at running a module owns it, as "pilot in command".
- "Your organization should be the architecture of the machinery of building the product." Most org charts look identical even though companies build different things, which makes no sense to him.
- "Mission is the boss." Each mission (for example, ship DGX Cloud, or build Hopper, CUDA for Hopper, cuDNN for Hopper) pulls the best skills, teams and resources from across the company, wired "like a neural network".
- Information goes to everyone at once. In a robotics meeting, new grads, three VPs and two E-staff heard a decision at the same moment, so nobody holds more power through privileged information. Leaders earn their jobs by reasoning well and helping others succeed.
- Trade-off: pressure on leaders is high, because they cannot rely on positional information advantage.
- Pace: Nvidia ships flagship products at a cadence others could not imagine.

## Strategy: zero-billion-dollar markets, platforms and CUDA compatibility

- Competition: position where a need hasn't emerged yet, in "zero billion dollar markets". By the time the market appears there are few competitors.
- Examples: cars as software-defined (a CTO told him cars cannot tolerate the blue screen of death; 15 years later Nvidia was largely right), PC gaming, design workstations, democratized supercomputing, machine learning, and Omniverse today (about 40 customers).
- Moat versus network:
  - If you create the market and help an ecosystem succeed with you, you get a "network of networks" of developers and customers. That network is the moat.
  - He dislikes the word moat because it means building around your castle. He prefers enabling others to enjoy the market's success too.
- Nvidia was always a platform company internally. The architecture was "UDA" (the root of CUDA) from the first day, and the first strategy was a game console inside the PC (DirectNvidia). It needed developers, so one of the first hires was developer relations.
- Microsoft's DirectX undercut that plan in 1995. CUDA was later an extension that let chips paid for by DirectX and OpenGL build an install base.
- His one non-negotiable rule: every Nvidia GPU is architecturally compatible with CUDA. Roughly 250-300 million active CUDA GPUs are an install base no other accelerator has: "everything else is negotiable".
- Developers also expose you to ideas beyond your own.
- Market size: the opportunity is set by what you produce. Moving from selling a chip for a car to selling an autonomous "chauffeur" grows the market. By becoming an AI company, he says, the opportunity has grown by probably a thousand times, so technology companies may get much larger.

## Learning from others, planning and AI's effect on jobs

- Business books: enjoy them and be inspired, but do not adopt them. Ask what each means for your world, your company and your goals, then build your own strategy. Learn from competitors and adjacent industries. He names Clayton Christensen's books and Andy Grove's as favorites.
- A business plan should be short. It should force clarity on the true problem, the unmet need you believe will emerge, and what you will do that is hard enough that others will not swarm it once they see the idea. He says forecasts matter little and skills like pricing, positioning and go-to-market can be learned.
- Time: "there's plenty of time if you prioritize". Make sacrifices and "don't let Outlook control what you do".
- AI safety: keep humans in the loop for a long time, avoid AI self-learning in the wild, and collect data, train, test and validate before release. He cites aviation (redundancy, diversity, air traffic control) as a model. Nvidia partnered with Getty and Shutterstock for commercially fair generative AI instead of scraping the internet.
- Jobs: productivity brings prosperity, and prosperous companies hire more to expand into new areas, since "the world has infinite ambition". He expects more jobs overall, with some people losing jobs to someone using AI. His advice: everyone should learn to use AI.

## Suffering, resilience and what he fears

- If he were 30 again he would not start Nvidia. It was "a million times harder than I expected". The entrepreneur's superpower is not knowing how hard it is. He still tricks his brain daily by asking "how hard can it be".
- Costs of the journey: pain, suffering, vulnerability, embarrassment and shame. Nvidia had two, if not three, drawdowns of 80% or more, and at one point traded at about two to three billion dollars (he is unsure of the exact figure) after the CUDA decision. "Your belief system has to be really really strong."
- Support system: family, long-tenured colleagues (Chris, Jeff Fisher and Dwight about 30 years, Jonah and Brian about 25), and early backers like Tench Coxe, Mark Stevens, Harvey Jones and Don Valentine. "You need that."
- His biggest fear is the same as at the start: letting employees down, since they adopted his hopes and dreams.
- Skills are learnable, but luck and market timing also matter: you can do many dumb things and succeed, or all the smart things and fail.
- Early career: LSI Logic's move to high-level design languages (abstraction plus optimizing compilers) shaped him at 21. He wants the same for digital biology, perhaps via large language models. Don Valentine's investment line: "if you lose my money I'll kill you".
