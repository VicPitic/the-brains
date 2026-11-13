## Nvidia's moat is the full stack and the learning flywheel, not the chip

- Jensen calls the "flips and flops and bits and bytes" chip-comparison view "old thinking". It dates from when software was static, pre-compiled and shrink-wrapped, and only faster chips improved the system.
- Machine learning is not just software. The thing to design for is the whole data-to-model flywheel: AI curates data, synthetic data is generated, data is processed, then training, post-training and inference.
- He applies Amdahl's law: if a step is 30% of the time and you speed it up 3x, you have not sped up the process much. So Nvidia accelerates every step, because only then does cycle time (the rate of learning) fall materially.
- Nvidia's accelerated-computing work is driven by domain-specific libraries below PyTorch: cuDNN, Optix, cuQuantum, RAPIDS. He says "nobody talks about cuDNN" yet it made deep learning work.
- Parallel computing is hard because every algorithm must be refactored for the architecture. There is no compiler that targets multiple ISAs, so the architecture company must write its own "OpenGL" for each domain.
- He says a company's view of what it is really doing "manifests itself into the product". Nvidia's view is the flywheel, so the products accelerate all of it.
- He argues the moat is greater today than three to four years ago, because the advantage compounds across the stack.

## Parallel vs serial processing and why Nvidia differs from Intel

- Jensen credits Intel as extraordinary at manufacturing and process engineering, fused with x86 chip design.
- Serial processing needs every transistor to be excellent. Parallel processing needs many transistors to be cost effective. He would rather have 10x more transistors that are 20% slower than 10x fewer that are 20% faster.
- Nvidia's world is "much better going up" (scale and architecture), not about being incrementally better going down.
- Marginal cost of computing fell about 100,000x over 10 years, versus roughly 100x from Moore's law. He credits accelerated computing, new numerical precisions, the tensor core, NVLink, HBM, NVLink and InfiniBand scaling, and work across the whole stack.
- Old model: static software on hardware improving at Moore's law. New model: the whole stack improves at once, so innovations compound.

## Annual cadence, install base and why custom ASICs don't change the mission

- Jensen treats the data center as the unit of computing: "when I think about a computer I'm not thinking about that chip", the whole system with software and orchestration is the computer.
- Nvidia builds a new one every year. Each year it delivers 2-3x more performance, 2-3x lower cost and 2-3x better energy efficiency. He tells customers not to buy everything at once but to "buy a little every year" and cost-average, since all of it is architecturally compatible.
- The harder part is that Nvidia disaggregates the system and integrates it into GCP, AWS, Azure, X and others, each differently: libraries, frameworks, security and networking. That is about 10 integrations a year. He calls this "the miracle".
- The supply chain works because APIs, methodologies and design rules were propagated backward and forward and hardened over decades.
- Install base matters. Gear used for training yesterday becomes inference capacity today, a "trail of free infrastructure" that is CUDA compatible. Nvidia keeps compatibility and keeps writing new algorithms, so Hopper, Ampere and even Volta improve. Hopper can become 2-4x better than when it was bought.
- A vision-language model built in the cloud runs on a robot at the edge without modification.
- On ASICs (Trainium, TPU, MTIA): Jensen is "situationally aware" of alternatives, sometimes adversarial, but that "doesn't change what the purpose of the company is". The purpose is a platform available everywhere.
- Nvidia is "a market maker, not a share taker". He says no company slide talks about market share. The questions are the next problem in the flywheel and how to cut a one-year loop to a month.
- He shows his roadmap to cloud partners years ahead while they do not show him their ASIC roadmaps, and says it does not offend him. A sole, meaningful purpose lets you be transparent.
- Pitch to a startup: choose CUDA and you can go everywhere and defer other chip decisions. Nvidia is "the onramp to the world of AI".
- Test for any company: is the mission necessary, valuable and impactful?

## First-principles case that demand is durable (not Cisco 2000)

- His method: "reason about it from first principles". State ground truths, then ask what follows.
- Ground truth 1: computing is reinvented. Applications will be highly machine-learned, and agents will help people use them.
- Step 2: there is about $1 trillion of installed data-center infrastructure to modernize over four or five years. Given $50 billion of capex, spend it on generative AI, since Moore's law has largely ended and the old capex is already in place.
- Step 3: new "AI factories" run digital employees 24/7 in companies, factories and autonomous systems. This layer does not exist today. Size is unknowable, "probably a few trillion dollars". The architecture for modernized data centers and AI factories is the same.
- He jokes that the 25 analysts who forecast about $26B for 2023 when Nvidia did $60B made "the single greatest failure of forecasting the world has ever seen".
- Companies are limited by the size of their fish pond. Share takers can only be so big, market makers can be large. Nvidia had to invent its market from the beginning (the 3D gaming PC market and graphics-card ecosystem), so inventing new markets is comfortable.

## Scaling, inference and the Elon/xAI cluster

- Scaling now has three vectors: pre-training (model and data size roughly doubling, so compute up about 4x a year), post-training (synthetic data, reward systems, reinforcement learning) and inference.
- "Everything is hard now." People thought inference was easy. One-shot thinking is "ridiculous"; there is fast and slow thinking, reflection, iteration and simulation.
- Inference reasoning can't be done a priori; it needs runtime context. Some answers need a quick reply, others "take a night" or "a week". He imagines telling his AI to think overnight.
- Interactive inference needs time to first token, which needs enormous bandwidth and FLOPs together. Nvidia built Grace Blackwell with NVLink for this, thinking ahead from training work.
- Training a few years ahead pays off: Nvidia invented Megatron (about seven years ago), NCCL and GPU Direct, which enabled large-scale parallel training.
- He expects distributed or federated asynchronous training to be invented, and that millions of GPUs will be needed. Data centers could be gigawatt or 250 MW scale; he expects both.
- On xAI: 100,000 GPUs as one cluster, in 19 days from power-on to first training. Normally about three years to plan plus one year to bring up. He credits Elon as "an N of one", and the hardened Nvidia platform and pre-planning by both engineering teams.
- He says Nvidia uses its own agents: cybersecurity can't run without them, and AI chip designers, software engineers and verification engineers are built in-house. "Hopper wouldn't be possible... Blackwell wouldn't be possible, Rubin don't even think about it" without them.

## Layers of the stack: model vs AI vs company

- A model is "necessary but not sufficient" for AI. AI for self-driving cars, humanoid robots and chatbots are related but not the same.
- Every layer has opportunities, but not infinite ones. Same logic as GPU vs accelerated computing vs AI infrastructure: each layer needs different skills. Many companies build GPUs, few are accelerated-computing companies.
- Founders should decide where to play, watch what gets commoditized, and tell a feature from a product from a company.
- On OpenAI he calls it one of the most consequential companies of our time, and praises its velocity and singular purpose, and the economic engine that can fund the next frontier.
- Open and closed both matter: closed models are the engine of an economic model that sustains innovation, and open models let every industry build domain-specific AI. Nvidia's Nemotron 340B is meant for synthetic data and reward modeling, "the best critique" for improving other models.
- Synthetic data logic: one AI looping alone is like a super smart person in a padded room for a month. Two or three with different knowledge debating can all come out smarter.

## AI, jobs, productivity and safety

- Nvidia has 32,000 employees today. Jensen hopes for 50,000 with 100 million AI assistants. AIs will recruit other AIs and sit in Slack channels with humans.
- Productivity gains show up as better earnings or growth, so "the next email from the CEO is likely not a layoff announcement". There are more ideas than can be explored, and people are needed to pick which problems to solve before automating.
- Evidence inside Nvidia: chip and computer complexity rising exponentially while employee count grows "barely linearly". He cautions this could be overfit.
- He has 60 direct reports who are world class and better than him at their jobs, and he has no trouble "prompt engineering" them. He says everyone will become a CEO of AI agents, and the skills are creativity, will, knowledge and breaking problems down.
- How he prompts people and AI is the same: give context, constraints and the mission, be clear on the outcome, and leave ambiguous space for creativity so they can surprise him.
- Intelligence is "the single most valuable commodity the world's ever known", now manufactured at scale.
- Safety: much safe-AI work is under-celebrated (red teaming, model cards, guardrail AIs, AIs monitoring AIs, evals), voluntary and coordinated by builders. Treat AI as a system of engineered systems.
- Regulation: mostly at the application level through existing bodies (FAA, NHTSA, FDA), not one universal "galactic AI council".

## Staying relevant and the job is important, not always fun

- Jensen says his job is not fun all the time, nor does he expect it to be. It is important all the time. "I don't take myself too seriously. I take the work very seriously."
- Fun is not always there, but love is: like family, "do we always love it? Absolutely."
- The real question is not how long he can do it but how long he can stay relevant, which depends on continuing to learn.
- He uses AI daily as tutor, assistant and brainstorm partner. No research without AI, and even when he knows the answer he double-checks, and the next two or three questions reveal something he didn't know.
