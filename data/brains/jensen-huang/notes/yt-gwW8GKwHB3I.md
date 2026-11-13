## How Jensen decides what to build: hard, never done, and tied to Nvidia's superpowers

- Jensen says choosing strategy is "the job of the CEO": define the vision and strategy. Engineers and technologists inform it, but the CEO has to shape the future.
- His filter is a confluence of conditions:
  - It must be insanely hard. If it is easy, "lots of competitors" will do it, so Nvidia should back away.
  - It must never have been done before.
  - It must tap into the special superpowers of the company.
- He expects pain and suffering to come with anything that meets this standard: "There are no great things that are invented because it was just easy to do." His conclusion: "you better enjoy it."
- Nvidia's strategy is shown openly at GTC years ahead of execution. He introduced the AI factory operating system, Dynamo, 2.5 years before this talk, and it is built on disaggregated inference.
- Physical AI is an example of the long bets. He called it a 10-year journey that started 10 years ago. It is now close to $10 billion a year and growing exponentially.
- He says digital biology is near its "ChatGPT moment" (representing genes, proteins and cells), and that healthcare will inflect within about five years.

## From GPU company to AI factory company: disaggregated, heterogeneous computing

- Jensen says inference is the most complicated computing problem today. The idea of disaggregating the pipeline, so parts run on different GPUs, led to heterogeneous computing. The same thinking led to Mellanox.
- Nvidia's computing now spans GPUs, CPUs, scale-up and scale-out switches, networking processors, BlueField storage processors and Groq. The aim is "the right workload on the right chips". He says Nvidia evolved "from a GPU company to an AI factory company."
- Agentic workloads drive this. Agents use working and long-term memory, tools and storage, and work with other agents. Those agents run models of varied sizes and types, including diffusion and autoregressive. Vera Rubin was built for that diverse workload.
- Nvidia went from a one-rack company to adding four more racks, which he says raised its TAM by roughly 33-50%. He said about 25% of Vera Rubin data center space should pair with Groq.
- He describes three computers for physical AI:
  - one to train the model
  - one to evaluate it in a physics-obeying virtual world (Omniverse)
  - one at the edge (car, robot, teddy bear, or telecom base stations, a $2 trillion industry that will become AI infrastructure)

## Price of the factory is not the price of the token

- Jensen rejects the claim that a $50 billion Nvidia inference factory loses to $25-30 billion alternatives. He says not to equate the price of the factory with the cost of tokens, and that the $50 billion factory will produce the lowest-cost tokens because of its throughput, about 10 times.
- His argument is that about $20 billion of a factory is land, power and shell. Storage, networking, CPUs, servers and cooling are needed regardless. So the GPU price difference moves the total only from, say, $50 billion to $40 billion, which is small against 10x throughput.
- His line: if a chip can't keep up with the pace of technology, "even when the chips are free, it's not cheap enough."

## Why he thinks Nvidia keeps gaining share against custom ASICs

- Jensen says Nvidia is "the only AI company in the world that works with every AI company." Customers never show him what they build, and he shows them what he builds. He is "delighted to compete on what is the best technology."
- His claimed advantages:
  - It is the only architecture that can be in every cloud, and also on-prem, in cars, in any region and in space.
  - About 40% of the business is customers who want a full AI factory and the CUDA stack, not chips. Those customers "don't know what to do" with a chip vendor.
  - Competitors discover that "it's not about building the chip, it's about building the system."
- He says share is rising because Anthropic and Meta are coming to Nvidia, open models are growing (all on Nvidia), and growth is happening outside the big clouds in regions, enterprise, industries and the edge.
- He said AWS announced a purchase of a million chips over the next couple of years.
- On analyst forecasts that show his growth slowing, he says they misunderstand the scale and breadth of AI. Most people think AI is only the top five hyperscalers. How big you can be "depends on what is it that you make": Nvidia is not making chips, it is solving the AI infrastructure problem.
- Platform principle for partners such as automakers: "We vertically optimize, we horizontally innovate, and we let everybody decide." Customers can buy one computer, several, or the full stack. "We want to solve the problem. We're not the solution provider."

## The agent era: compute, tokens and how engineers work

- Jensen describes three inflection points: generative (ChatGPT put a user interface on technology that had sat in plain sight for months), reasoning (o1, o3, more grounded answers), and agentic (Claude Code, then OpenClaw bringing agents into popular awareness).
- He says OpenClaw is important culturally and because it structures a computing model: memory, resource management and scheduling (cron jobs, spawning agents, decomposing tasks), IO subsystems (WhatsApp, etc.) and skills. Together these define a computer, the first "personal artificial intelligence computer," open source. Nvidia contributed governance and security work.
- Security rule for agents: an agent should have two of the three capabilities (access sensitive information, execute code, communicate externally), never all three at once.
- Compute scaling: about 100x going from generative to reasoning, about another 100x to agentic, so 10,000x in two years, with perhaps 100x more consumption. He says people "mostly pay for work," not information.
- Nvidia has 43,000 employees, about 38,000 of them engineers. His token rule: if a $500,000 engineer did not consume at least $250,000 of tokens in a year, "I am going to be deeply alarmed." He compares it to a chip designer refusing CAD tools for paper and pencil.
- He expects thoughts like "this is too hard" or "this takes too long" to disappear. Engineers will write ideas, architectures and specifications, define what a good outcome looks like, and each will manage about a hundred agents.
- Enterprise software will not be destroyed. Tools like SQL, Synopsys, Cadence and Photoshop are limited by "butts and seats" and will get 100 times more agents using them. They are also how humans control and ground-truth the work.

## Open and proprietary models, and moats for application companies

- Jensen says models are "a technology, not a product." It is "A and B," not "A or B": proprietary models for general intelligence (ChatGPT, Claude, Gemini, X), open models for industries that need to capture and control domain expertise.
- Open models are near the frontier. He says a router connects the two, so a company gets the best model on day one while it cost-reduces, fine-tunes and specializes.
- Moat for application companies: deep specialization. Combine general models with specialized sub-agents trained on your own vertical data.
- He says to connect agents to customers early, since that flywheel makes the agent better.
- He says every enterprise software company will resell Anthropic and OpenAI tokens as value-added resellers, and that this expands their go-to-market.

## Jobs, policy, national security and advice to young people

- Jensen says AI is "not a biological being... not alien... not conscious," it is software. He opposes doomerism: "warning is good, scaring is less good." Tech leaders should be circumspect and humble because their words now matter.
- On policy: inform policy makers, but don't get policy ahead of the technology. His main national security worry is that other countries adopt AI while the US is too afraid or angry to use it.
- He wants the American tech stack used by about 90% of the world. Solar, rare earths, motors and telecoms are examples he doesn't want AI to repeat.
- He said Nvidia went from 95% share in China, the second largest market, to 0%, and described applying for and receiving licenses and purchase orders to resume shipping.
- On Taiwan, his three steps are re-industrializing the US, diversifying the manufacturing supply chain, and showing restraint.
- On jobs: some jobs will be eliminated, many created, and every job transformed. Radiology is his example: computer vision was predicted to eliminate radiologists, yet their numbers and demand rose. A job has a task (reading scans) and a purpose (helping diagnose disease), and faster scans let hospitals treat more patients.
- Advice to students: "be the expert of using AI," and keep studying deep science, math and language, since language is now the programming language of AI. Specifying without over-prescribing "requires artistry."
- On robotics, he says humanoids and other robots will be everywhere in three to five years. He notes China's strength in motors, magnets and rare earths.
