## AI is a new industry powered by "AI factories"

- Jensen says Nvidia has reinvented itself into a data-center-scale company. Its technology is "wholly integrated to work together, but disintegrated so that the whole ecosystem could work with it."
- He argues Nvidia is now building computers "not just for the technology industry" but for a new industry called AI. AI is partly technology and partly labor, because it augments labor, and robotics will make that clearer.
- This industry will be powered by factories. What people call data centers are really "AI factories," and he expects the computing they need to be "quite large."
- On Microsoft's reported token count, he says actual token generation is far higher. Microsoft's figure covers only what it generated for third parties, and excludes its own consumption and OpenAI.
- Nvidia's goal is to "reinvent Nvidia" so it is "ahead of the puck," where the industry will go, and to solve hard problems.

## Moving from the IT budget to a roughly $50 trillion market

- For 60 years the IT industry sold technology and tools used by people. Jensen says Nvidia is about to leave the IT budget and move into the manufacturing (CapEx) and OpEx budgets.
- Manufacturing budget: robots, and robotic systems used to build products. OpEx budget: digital workers.
- He puts world OpEx plus CapEx at about $50 trillion, against an IT industry of about a trillion. AI brings the industry into that larger pool.
- His reasoning on jobs: some jobs will be lost and many created. Labor is short (unemployment at lows, restaurants and factories struggling to staff), so robots and agents are likely to expand world GDP over the next 5-10 years.
- He would hire a $100,000-a-year AI agent "in a heartbeat." If it amplifies someone paid $500,000 a year, it is a bargain.
- Foresight: he says what he shows in keynotes today he spoke about five years ago, with less precise vocabulary. He has talked about robotics for about three years and expects it to happen in a couple of years.
- Nvidia's original TAM estimate when it started was $300 million.

## Why AI leadership means the full stack, and why chip controls backfire

- Jensen calls the AI diffusion rule "exactly wrong" for America. If the goal is American leadership, the rule as written would cause the US to lose its lead.
- AI is a full stack: chips, factories, infrastructure, models and applications. America must lead at every layer, and "you can't just... protect one layer at the expense of everything else."
- The goal should be "accelerating the adoption of American technology everywhere before it's too late," not limiting other countries' access.
- Platform flywheel: a larger, more capable platform gets a bigger install base. More developers build on it, so applications improve. That sells more, which grows the install base further. He says this positive feedback is "the reason why Nvidia is successful today."
- China holds about 50% of the world's AI developers. Staying out of that market makes no sense architecturally.
- If American companies don't compete in China, a Chinese ecosystem will build new, non-American platforms. As AI diffuses worldwide, China's technology would diffuse with it.
- He says not competing in China is "about 90%" of the problem, versus about 10% for the Gulf deals.
- On China's capability: 50% of AI researchers are Chinese and "you're not going to hold them back." DeepSeek is "deeply excellent work." Huawei is a formidable, world-class company. He says restrictions spur competitors, but he expected China to be there every step of the way.
- Cost of the H20 ban: Nvidia wrote off $5.5 billion of inventory ("no company in history has ever written off that much"), walked away from $15 billion of sales, and lost roughly $3 billion in taxes. He says the China market is about $50 billion a year, "like Boeing, not the plane, the whole company."
- Long-run risk: leaving China means losing profits, scale and ecosystem building, and lets China build an alternative to CUDA. Anyone who thinks banning H20s cuts off China's AI is "deeply uninformed."
- On competing: "We want America to win. Every company should want their country to win." He says he doesn't begrudge anyone who aspires to be great, and argues "we ought to go faster." Nvidia got where it is with "absolutely zero support from anybody," so he says to "just let us keep running hard."

## Building policy presence late, and the Gulf partnerships

- Jensen says he never had to deal with government for most of Nvidia's life. The focus was building technology, the company, the industry, the supply chain and the ecosystem, and competing "every single day."
- Nvidia built a presence in Washington DC over the last several years. It has a handful of people where companies its size have hundreds. They explain how chips and AI ecosystems work and the unintended consequences of policy.
- He says he supports the President's vision and senses a desire to compete while looking for opportunities to cooperate.
- Why the Gulf: Saudi Arabia and Abu Dhabi leaders asked him to attend. He says they have abundant energy and a shortage of labor, so AI converts energy into digital and robotic labor (agents, robots).
- Nvidia helped launch HUMAIN in Saudi Arabia, which aims to build AI factories and host international companies such as OpenAI.

## Data-center economics: throughput per watt and the Pareto frontier

- A data center is limited by energy: "100 megawatts is 100 megawatts." The factory's job is to maximize throughput per watt in tokens.
- Token quality varies, from free-to-use tokens to premium ones that might be worth $1,000 or $10,000 a month. A chip designed for only one end is underutilized, and an overly fragmented architecture makes it hard to move workload around.
- Systems tuned for a high token rate have low overall throughput, and the reverse. "It's easy to hug the X-axis, it's easy to hug the Y-axis, it's hard to fill out that area."
- Filling the curve is the Blackwell invention. It combines FP4, NVLink 72, the balance of HBM memory capacity and bandwidth against floating point, and the Dynamo software.
- Perf-per-watt matters even where power is plentiful, because a factory is always a fixed size.
- Worked example for 1 GW: about $30 billion for shell, power, land and operations, plus about $50 billion for compute, networking and storage. An architecture with half the perf-per-watt means doubling the $30 billion to $60 billion. His conclusion: "even free is not cheap enough" if the architecture is poor enough.
- Speed outlook: Grace Blackwell is 40 times faster, and another 40x step is plausible. He sees agentic models 100,000 times faster within five years, so reasoning models become the baseline and "even slow thinking is fast."

## Dynamo: the operating system of an AI factory

- Inference has different stages. Dynamo disaggregates the large language model's processing and spreads it across the data center, metering workload and processor load.
- Pre-fill is context processing (memory, reading PDFs) and is floating-point intensive.
- Decode generates the reasoning and predicts the next token. It needs a lot of bandwidth, and chain-of-thought feeds more tokens back into context.
- Needs vary with the user, model and context. A one-shot query with a strong KV cache needs little floating point, while loading context needs a lot.
- He calls Dynamo "super important" and "essentially the operating system of an AI factory."

## Integrated but disaggregated: serving customers however they want to buy

- Nvidia builds fully integrated systems because software must be integrated with hardware, but "with enough discipline" that software can be separated from hardware, and system parts can be swapped.
- Grace Blackwell is stood up in many clouds, each slightly different, all on Nvidia standards, and Nvidia fits into each.
- He calls this "the real challenge of Nvidia's business model," and it goes with being a computing platform company.
- On compute and networking stacks, he says adoption of either is "terrific" and both is "incredible." He feels as strongly about networking as about compute. NVLink Fusion lets customers integrate NVLink with their own ASICs.
- He still believes Nvidia builds the better overall system. With 36-38,000 people united on one job, it would be "quite painful to internalize" a 14-person team doing better, so Nvidia strives to do better.
- Principle: "Serving a customer is just smart." He has preferences, but wants "to serve every customer however they'd like to be served."

## GeForce, drivers and abstraction layers

- Jensen says RTX PRO, Omniverse, robotics and Newton "wouldn't be possible without GeForce." GTC is not the audience for GeForce launches, since Nvidia has a separate game developer conference.
- Nvidia renders only 1 out of 10 pixels in games, and AI generates the rest.
- Drivers: the driver abstraction, which Microsoft helped pioneer, lets an API stay stable while hardware changes significantly. Nvidia's driver is open source, but few outside contribute because each new GPU makes earlier driver work obsolete.
- He says the isolation layer, whether CUDA or DirectX, is what lets people build on top. He adds "I love GeForce actually."
