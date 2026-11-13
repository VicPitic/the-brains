## Accelerated computing is a full-stack problem, not a chip problem

- Jensen starts from "What do we need to be?", not "What am I not?". He does not worry about being squeezed into a "chip company" box.
- Early on Nvidia realized accelerated computing is a full-stack problem. To accelerate an application you must:
  - understand the application
  - build the developer ecosystem
  - have deep algorithm expertise, because algorithms written for CPUs do not work well on GPUs and must be rewritten or refactored
- The payoff justifies the work: "50 times speed up, 100 times speed up, 10 times speed up, and so it's totally worth it."
- Nvidia is "an accelerated computing company, not a GPU company". It is "not obsessed about where computing is done"; it wants to accelerate the application.
- Accelerated computing is not parallel computing. About 30 years ago there were roughly 10 to 30 parallel computing companies and only Nvidia survived, because it recognized the goal was never to get rid of the CPU but to accelerate the application.

## Why AI agents mean accelerating all the world's software

- AI will use tools built for humans (Excel, Photoshop, Synopsys and Cadence logic synthesis tools, databases). Because AIs are fast, those tools must be "super-accelerated".
- Example: SQL is "the ground truth of businesses". Soon agents, not just people, will hammer SQL databases, so the first job is to accelerate SQL.
- His stated priority: get all the world's software accelerated "as fast as possible", then put it in front of AI so it can use it agentically. Data processing is the first big example, which is why the GTC 2026 keynote opened with an IBM partnership.
- He used the first hour of the keynote to retell the CUDA story, partly for Nvidia's own employees, to remind them what is important.
- Tool use comes in two types:
  - Structured (CLIs, APIs): explicit commands and arguments. Mostly SQL and database work in data centers.
  - Unstructured: apps never designed for CLIs or APIs. AI must learn multi-modal use, such as browsing sites and recognizing buttons and menus. This will run on PCs.

## Building AI factories: help customers de-risk, and co-design the whole system

- A gigawatt AI factory costs roughly $50-60 billion. About $15-17 billion of that is land, power and shell; the rest is compute, networking and storage.
- At that scale, "unless you're helping customers achieve the level of confidence that they're going to succeed in building it, you just have no hope, nobody's going to risk $50 billion."
- Nvidia's progression: help customers build chips, then systems, then AI factories. Factories contain a lot of software (cooling management, electricals, redundancies), not all of it Nvidia's.
- Over-design is the cost of siloed teams: "When you have a lot of people who don't talk to each other... you have to, by definition, over-design your part of it." Working as one team lets you push limits and get more throughput from the same power or save money.
- Biggest wish on supply: land, power and shell stood up faster.
- On supply chain: Nvidia plans upstream and downstream, has a couple of hundred partners with long-term partnerships, and "prepared everyone for growth". He does not think there is twice as much of anything (power, chips) as needed.

## CPUs, Amdahl's Law and the Vera CPU

- Moore's law is over, and the idea of general-purpose computing that just keeps adding transistors is "so dead". But Nvidia was "never against CPUs" and does not want to violate Amdahl's Law.
- Nvidia buys the best, most expensive CPUs for its systems, because a weak CPU "holds back millions of dollars of chips". GPU time must never sit idle. That is why it built Grace: the highest-performance single-threaded CPU, moving data faster.
- Vera is designed for agentic tool use, unlike the last decade of CPUs built for hyperscale cloud:
  - Cloud monetizes by rentable core, so those CPUs maximize core count (a couple of hundred to 300-400 cores) with performance secondary.
  - For agents, with a GPU waiting on a tool call, the priority is the fastest single-threaded performance plus very strong I/O and memory bandwidth.
  - Vera's bandwidth per CPU core is three times higher than any CPU ever designed, so it never throttles the GPUs.
- x86 remains important: some of the world is happy with Arm, but enterprises have stacks they won't move. Nvidia's own PCs and workstations are still x86, which is why the Intel partnership matters.

## Groq: extending the inference frontier, and building for a pain you feel yourself

- Inference has a tension: maximize throughput on one side, maximize token intelligence on the other. Smarter tokens command higher prices.
- Nvidia still covers the whole curve better than any other system. The Groq-based system extends the Pareto frontier at extremely high token rates and very low latency, at some cost to throughput.
- Motivation: coding agents are attached to very valuable humans, so token speed has high economic value. He would "absolutely pay" for a Claude Code tier that is 10 times faster. "Most great products are kind of [built for yourself] because you see a pain point and you feel the pain point and you know that that's where the market's going to go."
- Technical approach: disaggregated inference, going down to the attention part of decode, which needs very tight coupling and close software integration. Groq's architecture is "such an extreme version of ours" that it could not deliver its results without being paired with Vera Rubin.
- Timeline: Dynamo was announced a year earlier, after two years of work. Nvidia started working with Groq maybe six months before the deal. He called the timing "strategic serendipity".
- Deal structure: Nvidia did not want Groq's cloud service. It acquired the team and licensed the technology, then will evolve the architecture. The earlier precedent was Mellanox: Nvidia put parts of its computing stack into the network, and NVLink at scale would not be possible without in-network computing.
- When it makes sense for customers:
  - A business with mostly free-tier users (for example two-thirds free, one-third paid) and few enterprise use cases should not add Groq. It costs power and displaces servers that could serve the free tier.
  - A business with strong paid coding economics (Anthropic-like, OpenAI Codex-like) that wishes it could generate more tokens can boost revenue with the accelerator.

## Reasoning, coding and new model architectures

- Last year's step change: generative AI hallucinated, so it was grounded through reasoning, reflection, retrieval and search. Grounding enabled decomposing problems and then tool use.
- Search was a service nobody paid for: information alone is not worth enough to pay for. Doing things is. "The bar to reach to get somebody to pay you for something has to be higher than just information."
- Coding is almost a new modality. Code cannot be generated one token at a time; it must be reflected on as a chunk, factored well, and compile. It is "grounded on execution", not probable truth.
- Nvidia's engineers, paid several hundred thousand dollars a year, all use coding agents ("100%"). Many have not written a line of code in a while but are "super productive and super busy". They now describe software by specification and architecture instead of code.
- He argues agents also work in subjective domains. They can compare results against a reference and iterate. "The more probabilistic, the more aesthetic, the more subjective, if you will, AI actually does better." He is "fairly certain" AI can do architecture and design kitchens and living rooms, elevating the capability of, for example, carpenters.
- Transformers alone are not enough. Attention scales quadratically, so long memory and long conversations are a problem (KV cache decays into "garbage"). Nvidia built a hybrid transformer plus SSM architecture, behind Nemotron 3.
- Other needs:
  - Geometry-aware models, such as cuEquivariance, because nature is symmetrical and outputs must be physically based, not just statistically plausible.
  - Continuous generation for motion, versus discrete tokens for words.

## Nvidia's unifying theory, open ecosystem and why it moves fast

- Nvidia moves fast because the company has "a unifying theory", and coming up with it is Jensen's job: define what is important, how things connect, then build "an organism" that delivers on it.
- The theory has three platforms:
  - the CUDA-X software platform
  - the computing systems platform (extreme co-design across the stack, integrated into all clouds and OEMs)
  - the data center / AI factory platform
- Strategy: "We create a thing vertically and then we open it horizontally." Nvidia builds, integrates and optimizes vertically, then gives away source so customers can use any piece without taking all Nvidia chips or software.
- Nvidia is "a technology stack", not a solutions manufacturer or service provider. It is at the frontier in many domains but never turns them into products, and he says that will always be so.
- On open models: winning the open frontier model space is "not important to us", but someone must build open models and Nvidia can, and building them teaches it about computation.
- Blackwell's challenge was "100% NVLink 72", which was "backbreaking work". He thanked the audience for working with Nvidia: "we tortured everybody, but everybody loves it now."

## China, American tech stack leadership and the doomers

- AI is a five-layer cake (power, chips, infrastructure, models, applications), and America must win every layer. It is "a terrible mistake" to bundle all layers top to bottom into one holistic stack; let every layer compete for the market.
- He has been consistent that the American tech stack needs to be in China. Open source will come: China contributes more to open source than any other country, and about 50% of the world's AI researchers come from China. DeepSeek, Kimi and Qwen are serious. When the technology diffuses out of China into American industry, Southeast Asia and Europe, it should land on the American stack. He calls this "probably the single most geopolitical strategic issue for the American tech industry".
- He is not surprised China has stymied Nvidia: it wants its own stack. Since Nvidia left the market, Huawei had a record year and there were five or six AI chip IPOs.
- On Washington, he was surprised by how deeply doomers are embedded and how their messaging shapes policymakers' psychology. His concerns:
  - If the US does not let AI diffuse and use it itself, it risks Europe's fate in the last Industrial Revolution (invented the technology, others exploited it).
  - AI's popularity in US polls is falling, like electricity or the internet in earlier eras. Giving it a "mystical science fiction embodiment" scares people.
- He distinguishes genuine warning from rhetoric that scares people. He suggests doomerism helps with fundraising and regulatory capture, and warns it will likely backfire on those pushing it.
