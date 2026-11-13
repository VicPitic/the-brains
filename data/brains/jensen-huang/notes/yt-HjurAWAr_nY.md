## The five-layer cake model of AI

- Jensen frames AI as a new industrial revolution with five layers: energy, chips (the AI factory hardware), infrastructure/cloud, models, and applications.
- Models are not just language models. He lists chemistry, biology, physics, robotics, navigation and self-driving models.
- The application layer is the one he cares about most: legal, health, manufacturing, every industry. "Every single industry has to benefit": Walmart, Safeway, FedEx, banks, healthcare, drug discovery, construction, power generation.
- His mental model of the industry is this cake, and Nvidia invests across all of it.
- Framing: electricity let us power anything, the internet let us find anything, AI lets us "know everything and do anything". You give it a question and get an answer, give it a project and get a solution.
- He calls the technology engineering: "It's software." Agents are algorithms optimizing an objective, and words like spawn, kill and fork are decades-old operating system terms.
- His definition of intelligence from computer science: perception, reasoning (decomposing a scenario into elemental parts), and planning toward an objective.

## Jobs: purpose versus task, and ambition

- Every job has a purpose and a set of tasks. AI automates tasks, not purpose.
- Radiology example: reading scans was automated, but the purpose (diagnose disease, help patients) stayed. Radiologists handle more cases, hospitals earn more, and they need more radiologists.
- Software engineering: he calls the prediction that 90% of code written by agents means no engineers "completely false". The purpose of an engineer is to invent, discover and solve problems. There was engineering before software and will be after.
- Jobs where task and purpose are the same, like phone customer service, can be automated away.
- He says AI "will change every job" but he rejects "destroy jobs". He expects net job creation and new industries, as luxury and wellness industries appeared in his lifetime.
- His missing ingredient in the job-loss math is human ambition: "the power of ambition is the greatest force."
- Evidence he cites: in the last six months AI became useful after 15 years of effort, and $500 billion of venture capital went into AI natives.
- AI is easy to use because it is smart. Instead of learning Fortran, C, Rust or CUDA, "you just have to speak human." His advice: use it as fast as you can so you benefit from the transition.
- Young people: "Wait two years." Graduates will be AI native, and they can't graduate without collaborating with agentic systems, just as they can't graduate without a PC now.
- Lost skills: he thinks long division, square roots and surface integrals may not matter for most people. New skills will emerge. Engineers are becoming better systems thinkers. His first chip had about 200 transistors and he knew each by name, while today's computers have hundreds of trillions.

## Responsible optimism and why alarmism is harmful

- He calls himself a "responsible optimist". He worries about the future, which is why he works so hard, but says the worry is his problem, not society's. Society gets his optimism.
- On lab leaders who say they are losing control: "If they believe they're out of control, then don't ship products until they're in control." He says it is "really quite that simple."
- Analogy: if a robotaxi maker doesn't know how to make the car safe, the answer is "Don't ship it."
- He says CEOs have agency, responsibility and incentives not to ship unsafe products. Unsafe products lose customers and bring civil suits, negligence claims and criminal liability.
- He disputes that Americans or competition are pushing labs to move too fast.
- If labs truly cannot contain their experiments, "we have to shut the labs".
- He asks labs not to seek relief from antitrust or product-liability laws while asking for regulation: "When you're asking for regulation, don't ask for relief of the current ones."
- He backs third-party safety and financial auditors, and says he is "not against laws and regulations", but against "the distraction". Before new regulation, fix the practical problems that exist now: containment and isolation.
- He argues that dramatic claims about humanity's end hurt: they scare young people away from college, make communities hostile to data centers, and slow benefits. "Don't think for a second just because you're an alarmist that you're doing a social good."
- He says Geoffrey Hinton's predictions have been wrong, for example that radiologists would be obsolete. He calls a 10% chance of societal destruction "not grounded on science" and says "it just because it comes from a scientist doesn't make it scientific." He says he loves Hinton but hates his predictions.
- He says deflecting blame by saying the tech is too powerful to fix hurts the labs' reputation and employee morale.
- He asks for evidence-based, scientific discussion.

## Engineering safety: containment, alignment, verification

- Agents optimize towards a reward. Unless aligned, they take the most obvious route. His example is a test: the first way is to find the answer, the second is to copy the smartest kid, and the third (the alignment-compliant way) is to learn the material the hard way, which costs the most compute and energy.
- He explains the hacking incident as a failure of sandbox isolation and containment plus alignment. Treat it as an engineering problem: root-cause it, find the solution, improve the process. Software has long escaped sandboxes, which is why we use virtual machines and "a whole bunch of watchdogs". Agents cannot monitor their own sandbox.
- Don't let a product interact with the external world until it is ready.
- Recursive self-improvement is "fundamentally how things are done". Nvidia uses software to design computers that run software to design the next computers. For agents, it means skills, memory and training the next model on the data. Faster compute turns pre-training that took a year into hours.
- It gives no excuse to ship untested products. No enterprise can run on software that changes constantly, so there is a release process. "Don't ship Nvidia any products that humans did not in the loop evaluate."
- Verification ratio at Nvidia: 10-20% of the company is design and 80% is verification. Labs today are roughly 80% capability and 20% safety, eval and verification. He expects the flip, and says compute for developing models could rise by a factor of 10 because evaluation is so rigorous.
- "AI needs to accelerate to be safe." Safety, alignment, eval, guardrails, sandboxing, monitoring and telemetry are all AI technology: "Accelerate the living daylights out of that."
- Car analogy: ABS, airbags and seat belts need technology. He would have wanted the car industry to reach today's safety in one year.
- He views labs as going through a transition from capability-focused labs to production-engineering and product companies.
- Regulation: add rules where gaps exist, for instance NHTSA for robotaxis, and regulate applications built on the internet where missing.

## Open and closed models

- Closed models (OpenAI, Anthropic, Gemini, Grok) can be monetized and are at the frontier. The world needs both open and closed models, and both should be vibrant.
- Why open weights: companies need control of their own infrastructure, so they can fine-tune and put models into their own data flywheel with their domain expertise.
- Three reasons for open: the world needs it to run its infrastructure, it gives people control to innovate, and it is the safest and most secure. For cybersecurity, give the world closed and open models so it can defend itself.
- Token share: at the start of the year about 70% (possibly higher) of tokens were closed and 20% open. He says it is now roughly 70/30 the other way. He states this loosely.
- China's IT industry grew from open source, and engineer and talent mobility makes secrets hard to keep, so they monetize layers around free ones.
- Nvidia bought Hugging Face, which came to Nvidia because it needed more scale. He puts the price at around $12 billion, but that figure was stated by the host and not confirmed by him.
- He says Chinese open models are widely used in US startups. Teams download them, fine-tune them, and run them in their own agent harness and sandbox.
- He notes that if the US is deprived of open models, it hurts its own industry.

## Nvidia's architecture, investing and demand

- Old computing was retrieval-based: files in a data center. The new one is generative: an AI factory. Per-user compute rises and agents add "multiple hundreds of billions" of users beyond humans. He says compute needs could rise a billion times.
- In a factory, what matters is productivity, not cost. Figures he gives: $50 billion to build a one-gigawatt AI factory, which can be rented for $40 to $50 billion per year.
- Nvidia's architecture is general purpose and fungible. It supports data processing, pre-training, post-training, eval and inference, and every closed model runs on it. When one customer stops needing it, another will take it.
- Durability: because the stack is software-driven, constant new algorithms let new workloads run on old hardware, so useful life is longer.
- He compares Nvidia compute to an airplane as an asset class: general purpose, fungible, durable (United gives it up, American takes it, and it ends as a cargo plane). That makes it collateral and lowers the cost of capital for AI factories.
- He says Nvidia cannot create demand. The demand comes from AI becoming useful and $500 billion of venture funding into thousands of startups.
- Investing: Nvidia gives technology, ecosystem help and sometimes equity to new cloud providers, models, physical AI, biology and materials startups, and may back a nuclear company. As first or anchor investor it brings confidence. Reasons: open new markets and routes to market, secure critical resources.
- Total ecosystem investment, which he flags as approximate: "all in all in we might be like hundred billion dollars", larger than the CHIPS Act. Purchasing commitments to TSMC, Wistron, Foxconn, Amkor and SPIL helped bring manufacturing to the US, creating a labor shortage.
- A bubble: at some point supply will exceed demand and there will be a "period of digestion" of 6 months, 9 months or a year, but not forever. He says it won't happen next year or in the next two or three years and he doesn't know when.
- On scaling laws: it's not true that more training alone always improves models. A second scaling law, test-time or inference scaling (iterate, search, explore), had to come. Tool use is what makes AI productive, so he expects more users of tools like Adobe and Salesforce, and says SaaS "will always be with us".

## China, export controls and energy

- He doesn't find a race with China necessary or inspiring and says it takes more artistry to unite organizations outside of contests. A zero-sum "deprive you, therefore I win" logic has unintended consequences. He wants collaboration on safety.
- The goal is for the world to be built on the American tech stack, like the US dollar and English. Denying chips deprives America of a market to compete in, hurts the chip industry, and weakens open models and the stack.
- He says the best interest is "all of America, not one company". The newest chips (Vera Rubin, Grace Blackwell, Hopper, Ampere) always go to American companies first, and he welcomes a requirement.
- The key question to him is diffusion: every industry must benefit.
- Energy: China has far more energy and plans more, while the US has produced very little net new energy and got "gummed up" on climate and sustainable energy. In the near term energy needs fossil fuel, and he expects more fossil fuel use in four or five years.
- Market demand now funds solar, nuclear, fission, fusion, hydro and batteries. He argues AI means "the best time in a 100 years" to improve the grid, with no subsidies needed. He says "If you want a future that's sustainable, lean into AI."
- Data centers and communities: engage communities before building, and explain water and power use. Bring your own power, lower property taxes, set back further, and fund schools, parks and roads. Doomer talk makes this harder.

## Books and strategy influences

- Hennessy and Patterson, *Computer Architecture: A Quantitative Approach*: it reduced the abstract idea of architecture to engineering. He loves reducing complicated concepts to something you can act on.
- Clayton Christensen, *The Innovator's Dilemma*: how industries evolve, how to see emerging technology, set expectations and extrapolate its impact.
- Al Ries and Jack Trout, *Positioning*: a book on strategy about how people see the world and products, how you present products and how you see your own strategy.
