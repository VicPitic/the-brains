## "As much as needed, as little as possible": Nvidia's operating philosophy

- Jensen's mental model of Nvidia: the input is electrons, the output is tokens, and Nvidia sits in the middle. Its job is to "do as much as necessary as little as possible" to enable that transformation.
- Anything he does not need to do himself, he partners on and makes part of the ecosystem. Nvidia has ecosystems across all five layers of the "AI cake" (energy, chips, infrastructure, models, applications), upstream and downstream.
- What Nvidia does do is "insanely hard", and he believes it would not get done otherwise. His examples:
  - 20 years of CUDA, "losing money most of that time".
  - Building NVLink and the whole stack.
  - Creating domain-specific CUDA-X libraries (ray tracing, data processing, cuLitho for computational lithography) about 15 years ago.
- Applied to clouds: Nvidia backs neoclouds such as CoreWeave, Nscale and Nebius so they exist, but does not become a cloud or a financier. "There are people in the financing business and we'd rather work with all of them." He keeps the business model "as simple as possible".
- He thinks the transformation from electrons to tokens will not be commoditized. Making one token more valuable than another takes "artistry, engineering, science, invention", and the journey is "far from over".

## Supply chain: informing partners, prefetching bottlenecks, no contracts

- Upstream partners invest for Nvidia because Jensen explains how big the industry will be and why, and because Nvidia's downstream demand is large enough to buy what they build.
- He spends much of his time educating the supply chain, directly or indirectly. Keynotes include a deliberately "torturous" educational part so that suppliers and the ecosystem can reason about the opportunity "just like I reason about it". GTC brings upstream and downstream into one place so each can see the other.
- Bottlenecks get swarmed. CoWoS got "double, double, double" for two years and people no longer talk about it. CoWoS and HBM went from specialty to mainstream.
- Nvidia now prefetches bottlenecks years ahead. For silicon photonics it:
  - partnered with TSMC on COUPE;
  - invented new technology and new test equipment (e.g. double-sided probing);
  - licensed the patents to the supply chain;
  - invested in companies such as Lumentum and Coherent to scale capacity.
- His view is that no bottleneck lasts longer than 2-3 years: "once you can build one you can build 10." The slow constraints are downstream of Nvidia, such as energy. Plumbers and electricians can also limit data center builds.
- He wants a market where instantaneous demand exceeds total supply.
- Nvidia and TSMC have had no legal contract in nearly 30 years, only "rough justice". He says he can "completely trust them".
- He recalls the Micron team doubling down early after a meeting where he laid out the predictions.

## Pricing and allocation: be dependable, don't auction

- Nvidia sets a price and sticks to it. It does not sell to the highest bidder or raise prices when demand spikes. "That's a bad business practice."
- Allocation is forecasting first, then purchase orders, then mostly first in, first out. If a customer's data center isn't ready, Nvidia may serve another customer first to keep its factory throughput up.
- He denies that Larry Ellison and Elon Musk "begged" for GPUs at a dinner. They just had to place an order.
- He wants Nvidia to be "the foundation of the industry": a public annual roadmap (Vera Rubin, Rubin Ultra, Feynman, then a name not yet announced) and a "no second-guessing" price.
- Customers can buy at any scale: one graphics card, one rack, $10M, $100M, $1B, or a $100B AI factory.
- He also says every year Nvidia delivers a big leap, and customers can count on token cost falling by an order of magnitude.

## Why CUDA and the architecture moat persist

- Moore's law gives about 25% a year. 10x-100x leaps need algorithm and architecture change every year, which needs a programmable, extreme codesign company.
- Hopper to Blackwell: transistors improved about 75% over 3 years, yet Blackwell delivers about 50x Hopper's energy efficiency. Jensen originally claimed 35x and says Dylan Patel found it was actually 50x. It came from new models, parallelism, disaggregation and offloading compute into NVLink and Spectrum-X, changed across processors, system, fabric, libraries and algorithms at once.
- Why developers pick CUDA first:
  1. Ecosystem richness. It supports every framework (Triton, vLLM, SGLang, RL frameworks such as Verl and NeMo RL). If something breaks, it is more likely in your code than in the stack below.
  2. Install base. Developers want their software to run on as many machines as possible, and Nvidia has several hundred million GPUs, from robots to every cloud.
  3. Presence in every cloud and on-prem, so AI companies do not have to choose a CSP.
- Nvidia engineers work with AI labs to tune their stacks. He says they often get 2x, and sometimes 50% to 3x, out of a kernel or stack. For a lab with a large fleet, a 2x speedup directly doubles revenue. He uses the analogy that a CPU is a Cadillac and an accelerator is an F1 car.
- He claims the best performance per TCO and per watt, pointing to InferenceMAX and MLPerf and inviting TPU and Trainium to show their cost advantage.
- On ASIC margins: he argues that an ASIC vendor's margin is also high (about 65% vs his 70%), so "what are you really saving?"
- On TPUs and Anthropic: Anthropic is "a unique instance, not a trend". Without Anthropic there would be no TPU or Trainium growth. Nvidia is not offended by others trying alternatives.
- His own admitted miss: he did not realize Anthropic and OpenAI needed supplier investments of $5-10B, which VCs would not provide, and Nvidia could not have afforded it then. He says he will not make that mistake again and now invests in OpenAI and Anthropic.
- Without AI, Nvidia would still be very large because general-purpose computing has run its course and accelerated computing serves molecular dynamics, seismic processing, data processing, graphics and more.

## Don't pick winners

- Nvidia invests in all the foundation labs: "when I invest in one of them, I invest in all of them." It isn't Nvidia's job to pick winners.
- His reasoning is humility from Nvidia's own history. There were about 60 3D graphics companies at the start, and Nvidia was the only survivor.
- He says Nvidia would have been at the top of the list of companies not to make it. Its first graphics architecture was "precisely wrong", reasoned from good first principles but landing on the wrong solution.
- Investments in neoclouds and labs happen because they ask, have a plan and passion, and the world needs them. He does not want to be in the financing business.

## Software companies, agents and tools

- He argues the opposite of the "AI commoditizes software" view. Most software companies make tools (Excel, PowerPoint, Cadence, Synopsys), and agents are tool users.
- He expects agents to grow exponentially, so instances of tools like Synopsys Design Compiler, floor planners and design-rule checkers will "skyrocket". Today usage is limited by the number of engineers.
- It hasn't happened yet because agents aren't good enough at using the tools. He expects it to come from software companies building agents, agents improving, or both.
- He expects engineers to be supported by agents exploring the design space far more widely.

## Product segmentation: Groq and premium tokens

- Nvidia added Groq and is folding it into the CUDA ecosystem, because token value has risen enough to support different price points by response time.
- Jensen says he would pay for faster, more responsive tokens for Nvidia's own software engineers.
- Nvidia chose to expand the Pareto frontier and add a faster, lower-throughput inference segment, expecting high-ASP tokens to make up for lower factory throughput.
- He decided against running parallel exotic chip projects (wafer-scale, a Dojo-style big package, one without CUDA) because Nvidia simulates them and finds them "provably worse". He would put extra money behind the existing architecture.

## China, export controls and American tech stack leadership

- He says Nvidia wants the US to be ahead, and notes the US has about 100 times more compute than anywhere else, with the newest Nvidia hardware available in abundance there.
- His arguments against export controls:
  - China already has plenty of compute. Huawei just had its largest year. China has abundant energy ("ghost data centers"), makes about 60% of mainstream chips and has about 50% of the world's AI researchers.
  - Abundant energy can substitute for chip efficiency, and AI is a parallel computing problem, so 7nm chips can be ganged together. He says Mythos was trained on fairly mundane capacity.
  - The key lever is computer science. Most AI advances came from algorithms, so researchers with less compute build smarter algorithms.
- His strategic fear is that China is the largest contributor to open models, and if models like DeepSeek run best on Huawei first, that is "a horrible outcome". He does not want two ecosystems, open source on a Chinese stack and closed on an American stack.
- He argues that 50% of AI developers are in China. Conceding the market (about 40% of the technology industry, the second largest market) hurts American leadership, as telecoms did. Ecosystems like x86 and ARM are sticky, and "computing is not like a car".
- He says export controls accelerated China's chip industry and forced its AI ecosystem onto internal architectures, and that Nvidia's China share has fallen rather than grown.
- He wants US dialogue with Chinese researchers on what not to use AI for, and says AI cyber defense needs an open ecosystem with thousands of safety agents watching each powerful agent.
- He rejects the enriched-uranium analogy and calls "extremes" and "absolutes" childish. He calls for "nuance" and "maturity".
- He says the US should win at all five layers, including chips, and most of all at the application layer.

## Warning against doomer narratives on jobs

- He worries that telling people not to become software engineers will leave a shortage of them. He compares it to predictions 10 years ago that radiologists would disappear, when there is now a shortage.
- His distinction: a radiologist's job is patient care, while reading a scan is just one task.
- He says scaring people about AI hurts the US, since the layer that diffuses AI into society benefits most from this industrial revolution.
