## Why agents multiply compute demand: reasoning, harnesses and tool use

- Jensen explains the "billion times more" compute claim with how thinking works. Early chatbots mostly regurgitated knowledge encoded in the model, then added a quick search to ground it. Real problem solving means reasoning step by step, generating several options, rolling them out, reflecting, pruning and repeating.
- He compares this to human strategy: "great strategists love strategic optionality." You don't prune too fast, but you still optimise resources. AIs now do the same, which costs far more compute.
- Demand compounds twice: each task uses more compute, and because AI does the job well, people hire it for more jobs.
- Last year's unlock was the harness, the "exoskeleton" around the language model. It has two parts:
  - **Memory:** working memory, short and long term, and offline knowledge-graph building, much like humans compact and consolidate memories when they sleep.
  - **Tool use:** agents learn the tools humans already built (SPICE, Verilog, simulators, design compilers, Photoshop, AutoCAD, Synopsys, Cadence, Siemens tools) rather than rebuilding them.
- Coding was the first on-ramp. Next come design, creative and marketing work, and science. He cites OpenAI's Astra turning a photo into CAD that engineers can then fine-tune.
- Open challenge: deploying agents safely and securely into enterprises.

## Falling cost of intelligence, Navier-Stokes and why demand is insatiable

- Jensen notes the Navier-Stokes result did not come from nothing. It built on decades of mathematicians' foundational work, plus exhaustive AI search of a huge search space. Other fields are on similar precipices and need massive compute to get over.
- He expects the cost of intelligence to fall quickly: more compute comes online and smarter models are more efficient. The host's figure was about $4 million of compute for the Navier-Stokes instance, expected to drop 5-10x.
- Analogy to Moore's law: three decades of compute cost halving every year. He wants intelligence cost to fall 2x or 20x a year, because consumption "more than make[s] up for it."
- GPT-1 example: roughly $10-20 million to train then, about $100 now (his estimates, over about 10 years). Ambition rose just as fast: models are now 3, 10 and 30 trillion parameters, and use is up roughly a million times in 10 years.
- On Keynes's prediction of a 15-hour work week: he argues Keynes "got wrong... the human spirit." Work and discovery are purpose. Each thing you learn opens a new door with more opportunity and problems, so AI will create more ambition, not more leisure. He is working harder and having more fun than ever.

## Physical AI and the three-computer model

- Jensen says NVIDIA did $10 billion in physical AI in the first six months of this year. Last year's first $10 billion year followed about $5 billion the year before. He says his earlier "$100 billion market" estimate was probably understated and calls NVIDIA the world's largest physical AI company.
- Physical AI covers the whole electromagnetic spectrum: CT machines, ultrasound, imaging radar, 5G sensing networks, satellites and 3D reconstruction, plus robotics, self-driving, warehouse and surgical robots. AI has three parts: perception, reasoning, and planning/actuation.
- His thesis is that industries that were mechanical or electrical become technology industries. Examples: Tesla remade cars into computing; FedEx, Walmart and every car company become AI/technology companies; telecoms (AT&T, Verizon) become technology industries again.
- Building a physical AI platform takes three computers:
  1. A training computer to create the brain.
  2. A digital twin, built on Omniverse, where the robot learns. Labs will also need a digital twin of the internet so agents don't learn on the live one.
  3. The computer inside the robot, car or surgical instrument.
- NVIDIA builds a full stack for each. Customers can take one, two or three: "We don't care." He thinks NVIDIA may eventually not be categorised as a chip company.

## Safety as engineering: containment, out-of-band monitoring, and winning

- Jensen frames safety as something you build ("an engineering word") and says if it can't be built safely, it shouldn't be built.
- Perfect alignment is a "forever problem" because even "be successful in life" has endless interpretations. Waiting for it means never shipping. His approach mirrors raising children or hiring employees:
  - **Zero trust and containment:** start with minimum rights and tools, and expand access as you test and gain confidence.
  - **Out-of-band monitoring:** a system watched in-band behaves differently, like staff when the boss is in the room. The monitor must detect policy violations and be able to escalate or shut down.
  - He points to NVIDIA's recently announced OpenShell, with over 100 companies joining.
- Safety is part of AI technology, not separate, like airbags, ABS and radar in a car. "Accelerate" means accelerating safety and security too. Without them, "the functionality will never get a chance to speak."
- On the White House meeting, he says every lab leader was constructive and committed to being fast and safe. He says the industry has not been through a transition like this before, so it must prove usefulness first (reached about six months ago) and now deploy safely.
- He redefines "America winning" as every industry, state, county, company, school and citizen winning (Lilly, Walmart, FedEx, Boeing, the military), not only tech.
- On the three-legged security framework (frontier model review, the accord, the SI force): "argue about what is perfect versus what's first" and you never get there. Take action quickly, make it tangible with real teeth, and keep it dynamic. His advice to critics is to learn the problem and the existing solution, then be constructive.
- He is "99.99%" confident the outcome will be good. Smart people are doing smart things without him: "Smart people do smart things. They do more impactful things when you organize" them. Concern is good, but predicting the end of the world underestimates human capacity.

## Compute buildout bottlenecks and NVIDIA's resilience

- Jensen agrees demand is there "and more." The binding constraint is land, power and shell (permitting, power generation, skilled trades, moratoriums). Moving from digital to physical creates many obstacles, and he expects land, power and shell to be hard next year.
- His mitigations:
  - NVIDIA serves every CSP, neocloud, enterprise (via Dell, HP, Lenovo) and industry across the full AI lifecycle, so if one site stalls, he re-allocates supply. Demand exceeds supply.
  - Global reach: Europe, Africa, Central Asia, Southeast Asia, Latin America and the Middle East. Two gigawatts were announced in Australia, about $80 billion to NVIDIA. He says he doesn't love that the US can't keep up.
- If power is scarce, buyers shift to the most productive compute (most tokens per watt), because CEOs must hit revenue targets. NVIDIA's share is rising even at its size.
- Content per gigawatt has risen from roughly $18 billion, to $20-something billion, to $40+ billion, as NVIDIA moved from GPUs to networking, CPUs, storage, knowledge infrastructure and security (OpenShell). He says it was $5 billion per gigawatt in the general-purpose era and about $50 billion for Vera Rubin.
- Share of capex: single digits six years ago; about 40% with CSPs now; about 80% outside CSPs (on-prem, neoclouds). Both halves of the business are doubling yearly.
- Remaining supply constraints include substrates (larger packages, warpage, thermal coefficients), silicon photonics and more. He told the market 18 months of work lay ahead, and says new orders arrive almost daily.
- Space data centres: he says only NVIDIA compute makes sense there, since high value per watt makes launch cost a small share. Work with Elon's team is on a new server architecture for space and Earth.

## Does AI revenue justify the capex? His three-segment answer

- Jensen says NVIDIA is about 80% of AI infrastructure revenue share. He breaks the business into three roughly equal segments:
  1. **Classical computing, about a third:** data processing, simulation, XGBoost fraud detection, recommenders. Growing about 30-40% a year with no AI labs at all.
  2. **Frontier labs, about a quarter to 30%:** more than two, including Meta, Grok, Gemini and Anthropic (which started this year).
  3. **Next-generation startups and clouds, about a third:** thousands renting NVIDIA compute, "AWS for the future" (physical, biological and materials AI, Prometheus and others).
- His conclusion: "putting way too pressure on two labs." Don't extrapolate OpenAI or Anthropic revenue into multiple trillions. They will be hugely successful without it.
- Macro argument: infrastructure of $3-4 trillion a year by decade end (closer to four), of which about $1.5 trillion is compute. It was about half a trillion before AI. Moore's law is over, so twice the capacity now costs twice as much. He would not be surprised by roughly $10 trillion in annual capacity building and refresh.
- He advocates open models: about 80% of startups use them. They are not competing with frontier labs but customising models (including Nemotron) into domain "super intelligence" on proprietary data. Closed labs provide general intelligence; vertical companies go deep.

## Moat, fungibility and new business models

- Jensen says the moat is increasing. The "$100 billion cheque" test: placing an order sight unseen for Vera Rubin Ultra, who else can you trust? Systems costing $50 billion cannot be benchmarked before purchase, and each generation is trusted because the last one (Grace Blackwell) delivered.
- Parallel with TSMC: NVIDIA gives it 100% of that business because he can plan five years out and trust the next process node, its capacity, its agility through his shifts and its scale.
- NVIDIA is infrastructure, so the pitch is risk reduction: CUDA runs pre-training, post-training, agentic inference and every new architecture (flash attention, sharding across NVLink 72, SSM hybrids). Fungibility across workloads, models, customers and geographies lowers risk.
- "Specialization is the enemy of fungibility" and of durability. His chain: fungibility and durability give rentability, then financeability, then lowest TCO. Software updates continue for GPUs sold eight years ago.
- Two new growth vectors beyond hardware sales:
  - **Software licensing for enterprises:** roughly a couple of thousand dollars per GPU per year (his simple math), with about 20 million GPUs shipped a year, half going to enterprises, who need NVIDIA to maintain, secure and support under an SLA.
  - **Revenue share with clouds** that rely on NVIDIA's offtake, ecosystem and financing help, in return for an investment and ongoing economics.
- Capital allocation: buybacks were over 50% of free cash flow, "60 some odd" last quarter. Ecosystem investments will shrink as a share of cash flow because "OpenAI and Anthropic isn't going to come around again," and because cash generation is growing fast.
