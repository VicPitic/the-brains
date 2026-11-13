## Three scaling laws and why inference is going up by a billion times

- Jensen says AI now has three scaling laws, not one: pre-training, post-training and inference ("thinking").
- Post-training is "AI practicing" a skill until it gets it right. It needs inference, so training and inference are now integrated in reinforcement learning.
- Old inference was one shot. New inference is thinking before answering: doing research, checking ground truth, learning, thinking more, then generating. The longer it thinks, the better the answer.
- A year earlier he argued inference would go up by a billion times, not 100x or 1,000x. He says he is more confident now and "underestimated."
- Reason for the confidence: AI is no longer a single language model. It is a system of models running concurrently, using tools, doing research and working across modalities (including video).
- He says over 40% of Nvidia's revenue is already inference.
- Two compounding exponentials drive compute demand:
  - Usage: more customers, because the AI keeps getting better. He cites OpenAI at roughly 800 million weekly active users, less than two years after ChatGPT.
  - Compute per use: each query now thinks before it answers.

## The size of the market: $5 trillion of AI capex, and why a glut is unlikely

- He gives three points for why Nvidia's opportunity is larger than Wall Street consensus (he says analysts model flat growth from 2027, and Nvidia is comfortable beating them).
- Point 1 (laws of physics): general-purpose computing is over and Moore's law is dead. Trillions of dollars of installed computing must be refreshed, and it will be refreshed as accelerated computing and AI.
- Point 2: hyperscale infrastructure is moving from CPUs to GPUs. Recommenders, search, shopping, TikTok, YouTube Shorts and personalised content all depend on AI now. This is "hundreds of billions of dollars" before any new application is considered.
- Point 3 (new applications): AI factories generate tokens that augment human intelligence, which he sizes at roughly 55-65% of world GDP, or about $50 trillion.
- Worked example:
  - Take a $100,000 employee and add a $10,000 AI that makes them 2-3x more productive. "Heartbeat," he would do it.
  - He does this across every software engineer and chip designer at Nvidia (100% coverage). Nvidia is hiring more people, building more chips, with higher revenue and profitability.
  - Assume the $50 trillion is augmented by about $10 trillion of tokens, at 50% gross margin. That implies about $5 trillion of AI infrastructure capex a year.
- He puts today's annual market at about $400 billion, so the TAM is a 4-5x increase.
- He says Nvidia's revenue is almost correlated to power. Alibaba's CEO said data centre power will rise 10x by the end of the decade, and the market is power-limited.
- On a glut: he says the chance is extremely low until all general-purpose computing, recommenders, content generation, shopping and e-commerce have moved to accelerated computing and AI, which will take a few years.
- Other points on demand:
  - Nvidia sits at the end of the supply chain, so it responds to demand. Customers' forecasts have all been too low, which leaves Nvidia "in scramble mode."
  - Nvidia has geared up the supply chain (wafer starts, CoWoS, HBM) and says "if we need to double we'll double."
  - Accelerated data processing (SQL, Databricks, Snowflake, Oracle) is a huge CPU-run market that has yet to move to accelerated computing. A big initiative is coming.
- He says the world's GDP growth must accelerate because AI adds "billions of co-workers."
- His prediction: Nvidia will likely be the first $10 trillion company. People said a decade ago there could never be a trillion-dollar company, and now there are 10.

## The OpenAI partnership and "circular revenue" criticism

- He says OpenAI is likely the next multi-trillion-dollar hyperscale company, with both consumer and enterprise services.
- Nvidia works with OpenAI on four tracks:
  - Microsoft Azure buildout, with several years and hundreds of billions of dollars of work to go.
  - OCI buildout, with roughly 5-7 gigawatts (with Oracle and SoftBank), already contracted.
  - CoreWeave.
  - A new track: helping OpenAI build its own AI infrastructure for the first time, working directly at the chip, software, systems and AI-factory levels. It is additive to everything else.
- He says OpenAI wants a direct working and purchasing relationship, as Meta, Google, Microsoft and xAI already have with Nvidia.
- His figures: 10 gigawatts is roughly $400 billion. The announced investment is up to $100 billion.
- Reply to the circular-revenue critics:
  - The $400 billion must be funded by OpenAI's offtake (revenue), equity and debt. The size of the equity and debt depends on investors' and lenders' confidence in that revenue.
  - The investment side "is not tied to anything." It is an opportunity to invest in a company he expects to be hugely valuable.
  - Nvidia is not required to invest and OpenAI is not required to use Nvidia chips. If Vera Rubin isn't good, they can buy other chips.
  - Underlying demand is real: consumers paying for ChatGPT, a billion and a half monthly users, enterprises and sovereigns.
- His only regret is that Nvidia was "so poor" when OpenAI first invited it to invest that it didn't invest enough. He also names early investments in xAI and CoreWeave.

## Extreme co-design and the annual release cycle

- Why Nvidia moved to an annual cadence: token generation and usage are both growing exponentially, but Moore's law is dead, so transistors cost about the same each year and power is about the same. Performance has to come from somewhere else. A discount of a few percent cannot make up for two exponentials.
- Performance gains he cites:
  - Kepler to Hopper: about 100,000x over 10 years.
  - Hopper to Blackwell: 30x in one year, thanks to NVLink 72.
  - Rubin and Feynman: further X-factors.
- Extreme co-design means optimizing the model, algorithm, system and chip at the same time, "innovating outside the box" when the chip alone can't get faster.
  - He changes the CPU, GPU, networking chip, NVLink scale-up and Spectrum-X scale-out together, plus the whole software stack. Scale-across links multiple AI factories.
  - Spectrum-X is "not just Ethernet." He says it is the fastest-growing Ethernet business in the world.
  - Nvidia builds six or seven chips a year and optimizes across all of them.
- Nvidia invented CUDA and GPUs, and "invented the idea of co-design at a very large scale." He says it checks in more open-source software than almost anyone, which makes deep co-design possible.
- Without AI inside Nvidia, this velocity and scale would not be possible.
- Releases and products he names: Hopper, Grace Blackwell, Vera Rubin (second half of 2026), Rubin Ultra (2027), Feynman (2028), Rubin CPX (context processing and video generation), Dynamo (open-source disaggregated inference orchestration) and NVLink Fusion.

## Moat, ASICs and pricing competitors at zero

- He says competition is greater than ever but winning is harder, for these reasons:
  - Wafer costs keep rising, so without extreme co-design nobody can deliver X-factor gains.
  - It is not about building an ASIC. It is about building an AI factory with many co-designed chips.
  - Scale: a gigawatt is about 400,000-500,000 GPUs working together, "a miracle." Few customers would place a $50 billion purchase order on an unproven architecture, and few suppliers would start hundreds of billions of dollars of wafers and DRAM for a chip that has just taped out. Nvidia's proven architecture and delivery record allow it.
- On ASICs:
  - Google's advantage was foresight. It started TPU 1 before the market existed, which is how a startup should operate.
  - His startup rule: "You're supposed to take 100% of a tiny industry," not a few percent of a large one. He calls "just take a few percent of a big market" a fallacy.
  - He describes three chip categories: architectural (x86, ARM, Nvidia GPUs, with rich ecosystems), ASICs and customer-owned tooling (COT).
  - He worked at LSI Logic, which invented the ASIC and is no longer around. ASICs suit small markets, where a contractor charges 50-60 points of margin. When volume is large, customers move to COT (Apple's smartphone chips are the example), and he expects TPUs to follow.
  - ASICs fit narrow workloads (video transcoders, smart NICs). AI workloads keep changing (low latency, high throughput, chat, thinking, video), and CUDA's programmability lets labs experiment with attention variants and disaggregation.
- Why competitors can price at zero and Nvidia still wins:
  - Customers are power-limited. If tokens per watt are twice as high, the customer earns twice the revenue from the same gigawatts.
  - The gap between Nvidia's roughly 75-point gross margin and others' 50-65 points is small next to a 30x performance gap.
  - Land, power and shell alone cost about $15 billion, so the opportunity cost of weaker performance is "insanely high."
- He sells any way customers like: full rack, a single chip, networking only, CPU only. His only ask is "just buy a little something from us."
- He describes Nvidia as "an AI infrastructure company," not a chip company.
- Partnership over rivalry: NVLink Fusion links Intel (which he says tried for most of its life to put Nvidia out of business) and ARM into the Nvidia ecosystem. His logic: "bring it on," and the future is big enough that "it could be us and them."

## Sovereign AI, China, and talent

- Sovereign AI: "Nobody needs atomic bombs. Everybody needs AI." Every country needs AI infrastructure as it needs energy and communications infrastructure.
  - Countries should use OpenAI, Gemini, Anthropic, Grok and open models. They should also build sovereign capability to encode their history, culture and values, and to build industrial, manufacturing and national-security models.
- He calls AI the "greatest equalizer": people no longer need C++ or Python, they "just have to learn human." If you don't know how to program an AI, you ask the AI.
- China:
  - He says Nvidia had about 95% market share there and now guides with no China included.
  - He argues that forcing Nvidia out gave Huawei monopoly profits and a path to compete globally, and that the policy backfired.
  - He describes Chinese competitors as "formidable, innovative, hungry, fast-moving, under-regulated." China has strong STEM schools and many AI engineers ("996" culture: 9am-9pm, 6 days a week), and he calls claims that they are "years behind" absurd: "nanoseconds."
  - His position is that selling in China serves both countries, and "those two truths can coexist." He stays patient and believes wisdom will prevail.
  - On the skeptic who says he only wants to sell chips: "Just because I want America in ecosystem and economy to grow doesn't make me wrong."
  - He argues against decoupling and for maximizing exports so the world builds on American technology.
- Talent and the "American dream":
  - He calls the $100,000 H-1B fee "a great start" that "sets the bar a little too high" but cuts abuse. He hopes it is not the end, and notes it may push investment overseas.
  - His principle: "Start somewhere, move towards the right answer." Don't wait for the perfect answer.
  - He treats smart people's desire to come to and stay in America as KPIs, "early indicators of future success." He is concerned about falling numbers of Chinese students staying.
  - He says to compete with China, "but be careful not to be tough on Chinese," and calls damaging the pipeline "not patriotic."
  - His own story: his parents had no money, and he bussed tables, washed dishes and cleaned toilets.

## Jobs, AI adoption and getting on the train

- Jobs: AI changes tasks, not whole jobs. Some tasks are eliminated and many are created. Nvidia hires more engineers because it has more ideas and more productivity. The "mass job destruction" claim "starts with the premise that we have no more ideas."
- "Intelligence is not a zero-sum game": more intelligent people around him means more ideas, more problems to solve, more work and more jobs.
- He says reindustrializing America (skilled trades and manufacturing) brings people along, and he loves "people who make things with their hands." He supports the Invest America accounts for children, with $1,000 invested in American companies at birth.
- Near-term predictions: AI fused with robotics ("our own R2-D2"), a personal AI model for each person (8 billion GPUs), and digital twins for health care.
- Advice on exponential change: "If you have a train that's about to get faster and faster... the only thing that you really need to do is get on it." Don't try to predict where it will be, "just get on it while it's going kind of slowly" and figure out the rest as you go.
- On Elon Musk as a builder: AI supercomputers are "the most complex systems problem humanity has ever endeavored." Musk has an advantage because all the interdependencies (technology, financing, land, power) sit in one head, along with a sense of urgency.
