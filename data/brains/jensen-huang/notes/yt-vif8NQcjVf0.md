## Extreme co-design: why the company is organised like the system it builds

- Jensen says extreme co-design is necessary because the problem no longer fits in one computer or on one GPU. Adding 10,000 computers should make things a million times faster, so you must shard the pipeline, the data and the model.
- Amdahl's law bites: if computation is 50% of the problem and you speed it up a million times, the total workload only speeds up about 2x. CPU, GPU, networking, switching and workload distribution all become problems at once.
- Moore's law has largely slowed, so he says every technology has to be brought to bear. Over the last 10 years Moore's law would have given about 100x; Nvidia scaled computing about a million times.
- He treats co-design as three questions: what it is (optimising across architectures, chips, systems, system software, algorithms and applications, plus power and cooling), why it is needed, and how to do it.
- On the "how": he says org charts at hamburger, software and car companies all look the same, and that makes no sense to him. "The architecture of the company should reflect the environment by which it exists." The company is the machinery that produces the product.
- His direct staff is about 60 people. He does no one-on-ones: "no conversation is ever one person." A problem is presented and everyone attacks it, and people tune in or out as relevant. He calls out anyone who could have contributed and didn't.
- Most of the staff have a foot in engineering: memory, CPUs, optics, GPUs, architecture, algorithms.
- He says the Vera Rubin pod has 7 chip types, 5 rack types and 40 racks, and Nvidia builds about 200 pods a week. An NVL72 rack has about 1.3 million components, and about 200 suppliers contribute to the Vera Rubin rack.
- His complexity rule: "as complex as necessary but as simple as possible." Test and challenge every bit of complexity, and treat the rest as gratuitous.

## Speed of light thinking and rejecting continuous improvement

- About 30 years ago Jensen started a method he calls "the speed of light". It means comparing everything against the limit of what physics allows: memory speed, math speed, power, cost, time, effort, headcount and manufacturing cycle time.
- Test each constraint separately against its limit. For example, find the speed of light for a high-throughput system and for a low-latency system, which are architected fundamentally differently. Then make trade-offs across the whole system.
- He doesn't love continuous improvement. Engineer from first principles first, and improve afterwards.
- Example: if someone says a task takes 74 days today and can be done in 72, he would rather strip it back to zero. Ask why it's 74, then ask how long it would take built from scratch. It might be 6 days. The gap between 74 and 6 can then be discussed as explicit compromises, which he says is much more effective.
- He admires Elon Musk's approach to the Memphis Colossus build for the same reasons. Elon questions whether each thing is necessary, whether it has to be done this way and whether it has to take this long. He strips things to the minimum, is present at the point of action, and his personal urgency makes suppliers treat his project as top priority.

## Becoming a computing company: CUDA on GeForce and installed base

- Nvidia started as a narrow accelerator company. Narrow specialisation limits market size, and market size sets R&D capacity and ultimate influence. Becoming a computing company meant walking a narrow path that expanded the aperture without losing specialisation.
- The steps he lists: the programmable pixel shader, then IEEE-compatible FP32 in shaders, then C on top (Cg), then CUDA.
- Putting CUDA on GeForce was the strategic decision closest to an existential threat. It raised the GPU's cost by about 50% when Nvidia was a 35% gross-margin company, and it consumed all the gross profit dollars. He says market cap fell from roughly $6-8 billion to about $1.5 billion, and recovery took about a decade.
- His reasoning: "install base defines an architecture." Developers go where the install base is large. x86 won despite criticism, while elegant RISC architectures largely failed.
- The plan was to put CUDA in every PC whether customers used it or not, then attract developers by going to universities, writing books and teaching classes. Researchers and gamers discovered CUDA on GeForce. He calls Nvidia "the house that GeForce built." GeForce is still his number one marketing strategy because people learn the brand as teenagers.
- He sold the board on the idea that workstations and supercomputers could later capture more margin.
- His moat answer: the CUDA install base, amplified by yearly execution on very complex systems. Developers know it will be 10x better in about 6 months and will be maintained indefinitely. It took 43,000 people and millions of developers, not three people, to make CUDA succeed.
- The second advantage is the ecosystem: vertically designed, but horizontally integrated into every cloud, OEM, supercomputer, car, robot and satellite. Nvidia doesn't sell a finished product; it is a platform company.

## Shaping belief before announcing a bet

- Jensen's method for big bets: reason to a conclusion, then spend months or years shaping the belief system of the board, management, employees, partners and customers. He avoids annual manifestos, big layoffs and reorganisations.
- He uses each new piece of external information, discovery or milestone to move people step by step. He says he's "laying down the bricks" so that the day he announces a move (buying Mellanox, going all in on deep learning), everyone's reaction is "what took you so long?" Leading this way can look like leading from behind.
- GTC keynotes do the same for partners and industry. He says he talked about the Groq stepping stones for two and a half years, and showed agentic systems resembling OpenClaw two years ago at GTC.
- Reasoning in the open: he explains his steps in meetings so people can disagree with a reasoning step rather than the conclusion, and pull him in other directions. He describes this as a "collective patriarchal method" and ties it to staying humble and open-minded.
- Specification as leadership: he describes strategy specifically enough to be actionable but under-specifies on purpose so 43,000 people can make it better than he imagined.
- No succession planning in the usual sense: instead, pass on knowledge continuously. Nothing he learns sits on his desk for more than a fraction of a second. Every meeting is a reasoning meeting.

## Anticipating architectures and aligning the supply chain

- AI model architectures change about every six months, while system and hardware architectures change about every three years, so he has to anticipate what will matter 2-3 years out.
- His three tools:
  - basic and applied research, including building Nvidia's own models (such as Nemotron, a transformer-plus-SSM hybrid)
  - working with essentially every AI company in the world
  - keeping CUDA flexible enough to adapt (the interview mentions CUDA 13.2)
- Example: mixture of experts led to NVLink 72 instead of NVLink 8, so a 4-10 trillion parameter model runs in one computing domain. The Vera Rubin rack adds storage accelerators, the Vera CPU and Groq racks because agents "bang on tools", not just run LLMs.
- He says he reasons about the future through thought experiments. A digital worker needs ground truth (files), research and tools. A humanoid robot would use your microwave and read its manual rather than turn its hand into a microwave.
- Supply chain: he tells upstream and downstream CEOs the business conditions and growth drivers, and flies out to explain, draw pictures and reason from first principles. About three years ago he convinced several DRAM CEOs to invest in HBM and in low-power LPDDR memory for data centres. Several hundred CEOs attended his GTC keynote.
- He moved supercomputer integration from the data centre into the supply chain with NVLink 72, shipping racks of 2-3 tons, which required partners to make capital investments of several billion dollars each.
- Why he doesn't lose sleep over bottlenecks: he told partners what he needs, they told him what they'd do, and he believes them. He says he sleeps because he has listed everything that could harm people and told someone who can act on it.
- Power: push tokens per second per watt up by orders of magnitude yearly, so token cost falls about an order of magnitude a year even as computer prices rise. He also wants to use the idle capacity of the grid, which he says runs at about 60% of peak most of the time. His proposals are:
  - make customer CEOs aware of the uptime guarantees in their contracts
  - build data centres that degrade gracefully
  - have utilities sell lower-guarantee power sooner

## Resilience, suffering and a first-principles mindset

- He attributes success partly to a child-like "how hard can it be?" mindset. If you simulated all the setbacks in advance you wouldn't start, so go in fresh and expect it to be great. Then bring endurance and grit, because the setbacks, embarrassments and humiliations will still surprise you.
- His method for pressure and anxiety:
  - decompose the problem into parts
  - separate what you can act on from what you can't
  - either do it or get someone else to do it
  - tell the person who can fix it, so the burden is shared
  - after that, "stop crying about it" and go to sleep
- Forget setbacks quickly, like an athlete worrying about the next point, and let the next opportunity pull you forward.
- He keeps reassessing: if the assumptions behind his picture of the future haven't materially changed, the expected outcome hasn't either.
- Humility: because he works publicly, he's often visibly wrong, and he says that keeps him humble. He emulates and learns from everyone he watches.
- He says he has hit psychological low points "all the time."

## Strategy, new markets and AI's economics

- Four scaling laws: pre-training, post-training, test-time and agentic. He argues synthetic data means training becomes limited by compute, not data. Inference is thinking, which is harder than reading, so it won't commoditise into tiny chips.
- Agentic scaling means spawning sub-agents, which he compares to hiring more employees being easier than scaling himself.
- Why he sees Nvidia's growth as inevitable: computing shifted from retrieving pre-written files to generating contextual tokens in real time, which needs far more computation. And the computer has changed from a warehouse into a factory that generates revenue.
- He says tokens are segmenting like iPhones into free, premium and high-end tiers, and that $1,000 per million tokens is "just around the corner." He calls OpenClaw "the iPhone of tokens."
- He says Nvidia is not in the market-share business because the markets he's addressing mostly don't exist yet. He recalls being told a fabless semiconductor company couldn't exceed $1 billion, and later that Nvidia would never top $25 billion, and calls such claims not first-principles thinking. He says $3 trillion in revenue is not limited by any physical limit he can see.
- His mental unit of what he builds has grown from the chip to the computer, the cluster and the gigawatt AI factory, and he hopes to think at planetary scale next.
- Open source: Nvidia builds open models (it open-sources weights, data and method for Nemotron 3) to learn how models evolve, to let every industry and country join AI, and to push non-language AI (biology, weather, physical AI). "We don't build cars, but we want to make sure every car company has access to great models."
- On TSMC, he says the biggest misunderstanding is that its technology is all it has. He credits its orchestration of customer demand, its balance of technology and customer service, and its trust. Nvidia has done business with it for three decades without a contract. In 2013 he declined Morris Chang's offer to run TSMC.

## Jobs, intelligence and advice to students

- Purpose versus tasks: "the purpose of your job and the tasks and the tools that you use to do your job are related, not the same." If your job is a task, you are highly exposed. If your job's purpose includes tasks, learn to use AI to automate them.
- Radiology example: computer vision became superhuman around 2019-2020, yet the number of radiologists grew and there is now a shortage. The purpose is diagnosing disease, and faster scan reading means more patients seen and more radiologists needed.
- Nvidia's software engineer headcount will grow, not shrink. He wants engineers to solve problems, not write lines of code. He says coding is becoming specification, so the pool of people who can code goes from about 30 million to potentially 1 billion.
- Advice: every student should graduate expert in AI, and every worker, from carpenter to pharmacist, should use it. Given two graduates, one AI-expert and one not, he'd hire the expert.
- He argues intelligence is becoming a commodity. He's surrounded by 60 people who are superhuman in their areas, yet he orchestrates them. What matters more is character, compassion, generosity, tolerance for pain and determination.
- He says he has been CEO for 34 years and that his tools have changed continuously while the purpose of his job hasn't.
