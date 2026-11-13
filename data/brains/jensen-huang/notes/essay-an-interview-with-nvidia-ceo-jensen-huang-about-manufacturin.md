## Why Nvidia built a fully integrated stack, deliberately, over decades

- Jensen says every step of the path from fixed-function graphics to CUDA to AI "was done on purpose." What the outside view leaves out is "all the mistakes that we made" along the way.
- The sequence: accelerate defined graphics functions, invent the programmable shader, build a programming model (CUDA), then add SDKs, libraries and frameworks on top.
- He describes the company's growth as a repeating move: "You build one thing and you generalize it and you realize it could be used for other things, and then you build that thing derived from the first thing and then you generalize it." GPU led to deep learning, which led to robotics and autonomous driving, which led to medical imaging. "That's how we built the company."
- On why deep learning needed full integration: it "needed a brand new stack," just as graphics once did. That meant a new processor, compiler, engine and framework (PyTorch and TensorFlow at the top). It happened that the best processor for deep learning about ten years earlier was an Nvidia GPU.
- The Tensor Core GPU is "a thousand times better at doing deep learning than our original GPU."
- The four layers he describes are hardware, system software, platform and application frameworks.

## Programmability as a bet against commoditisation

- Fixed-function chips are super efficient, but there are only so many pixels and so many functions, and transistor counts keep growing. His conclusion: graphics would become good enough for anyone, and "we will be commoditized out of existence" unless Nvidia reinvented itself. Integrated graphics today shows the prediction was right.
- Two motives drove the programmable shader at once:
  - Defensive: avoid being commoditised.
  - Creative: games looked like "OpenGL Flight Simulator" with blurry textures and "no life," and he felt the medium would die if artists could not tell different stories.
- The cost was unexpected. Programmability carries overhead that current applications do not need. Nvidia built for the future, so existing games did not benefit, the chip was too expensive for a competitive market, and gross margins were "under pressure all the time."
- What saved it: the core GPU still ran old applications at the best performance in the world.
- Becoming a processor company forced Nvidia to build everything around it:
  - a compiler team
  - SDKs and libraries
  - developer evangelism
  - helping developers port their applications, even doing the library work itself
  - helping them market their software
  - GTC, the developer conference
- In his words, the day you become a processor company you must internalise that this is a brand-new programming model and create everything associated with a computing platform.

## Install base, backward compatibility and technical bets

- Rule: "If you want developers, they're going to want install base, and if you want install base, they have to be compatible with each other."
- That forced CUDA into GeForce, Quadro and data center GPUs, so that "in every single chip that we make, it's all CUDA compatible." Every generation stays backward compatible so existing software runs faster on new chips.
- Technical choices he calls good ones:
  - GeForce FX used IEEE-compatible 32-bit floating point, although the DirectX shader spec at the time was 24-bit. Results matched a CPU, which opened GPUs to general-purpose computing.
  - RIVA 128 introduced a floating point setup engine, a texture cache and very wide memory. TNT doubled everything, with dual textures and two pixel pipelines, and started the multi-pixel-pipeline architecture.
- Memory bandwidth mattered from the start. Rendering is a painter's algorithm with read-modify-write and blending, so graphics chews through bandwidth. Machine learning, with its huge data volumes, is "all just memory bandwidth," so Nvidia was comfortable in that territory.
- The GPU needed a latency-tolerant design with heavy threading: up to 10,000 threads in flight, versus two in a typical CPU core.
- Mistakes along the way included Cg ("C for Graphics"), which taught Nvidia that processors need shared on-board memory, and GeForce FX itself.
- He chose not to rename the GPU (GPGPU, XPU and VPU were all considered). His view: buyers are smart enough to work out what it does, and Nvidia explains the benefits.

## Where Nvidia chooses to play: partnerships and not squandering resources

- Company rule: "not squander the resources of our company to do something that already exists." If an x86 CPU or a cloud service exists, Nvidia uses it or partners.
- If something makes sense for Nvidia but not for others, Nvidia first asks others to do it, and builds it only if they decline. "We try to be very selective about the things that we do."
- On services: any Nvidia service would run on GPUs in everybody's clouds, plus something of its own only if needed.
- Partnerships are long-running. He calls himself probably TSMC's longest-running CEO partner and cites SPIL, Foxconn, Asus and MSI.
- Nvidia nurtures old partners (it keeps expanding its PC vision) but "forks off" into data center acceleration, AI and robotics, and keeps adding new partners. He says the company can "reinvent ourselves at will."
- His pride point: "we're the only AI company in the world that works with every AI company in the world." Nvidia contributes from chips through the AI operating-system layers to algorithms.

## The ARM bid and Grace

- Jensen gives three reasons for wanting ARM:
  1. It was up for sale.
  2. It is "a singular asset," and "you'll never find another ARM asset again."
  3. Mobile is ARM's strength, but its future ought to be the data center. Servers are far smaller in units than mobile, so ARM's economic motive to focus there is questionable. Under Nvidia's ownership, he could have channelled ARM purposefully toward data centers.
- After the deal failed, he says the two years spent seeing the future together were still helpful. ARM's single-thread performance roadmap has improved tremendously since, and ARM now sees the data center as a real opportunity.
- His stance now: Nvidia stays focused on what is best for Nvidia, and ARM does what is best for ARM, including investing in software. His response to losing the breakup-fee money: "We can always go make more money. It was worth a try."

## Manufacturing intelligence: why every company becomes an AI company

- Definition: "Intelligence is the ability to recognize patterns, recognize relationships, reason about it and make a prediction or plan an action." He says it has nothing to do with general intelligence; "intelligence is just solving problems."
- Claim: for the first time in history, humans can produce "the single most valuable commodity the world's ever known, which is intelligence."
- Deep neural network capability is doubling every six months, versus Moore's Law at every two years.
- GTC keynote framing: data centers become "AI factories," and companies become intelligence manufacturers. Over a decade, Nvidia-accelerated computing delivered a million-x speed-up in AI, and he talks about "the next million-x."
- He predicts some part of every company will codify and automate the production of its intelligence, so every company will be an AI company. The AI will augment humans, with humans in the loop.
- The first wave of AI was perception and inference (recognising images, speech, recommendations). The next wave is robotics: AI that perceives, plans and acts, via digital robots, avatars and physical robots. Omniverse is meant to be essential for making robotics software, as PyTorch and TensorFlow are for AI software.
- Recommender systems as the example: a trillion things on the internet and one small phone, so an AI filter must predict what you want from content features and your explicit and implicit preferences. He calls it "a miracle." Future predictions he lists: best financial strategy, medical therapy, health regimen, vacation plan.
- Autonomous driving as the robotics case: it needs real-time, isochronous processing of radar, camera, lidar and ultrasonic data with diverse, redundant algorithms, producing perception, localisation, a world map and a drive plan.

## Resilience, hard work and surrounding yourself with great people

- Childhood: he moved to Kentucky in 1973 at age nine, attending Oneida Baptist Institute, an affordable boarding school. He cleaned bathrooms while his older brother worked on tobacco farms.
- Lesson: "We learned hard work, but it never occurred to us that it was hard work." Expectations are set by surroundings, and "I expect very little and it doesn't matter what the circumstances are, you make the best of it."
- His self-described greatest gift: "surrounding myself with amazing people and giving them the opportunity to do amazing work and helping them achieve more than they thought was possible."
- He credits co-founders Chris Malachowsky and Curtis Priem: without them Nvidia "wouldn't be here." He says he carried the torch longest "because I'm resilient," and that once on a road he can stay on it a very long time and believe in it.
- On the company he built: no other computing company has Nvidia's depth of talent, from chief scientist to chip and system design. A CEO can start from a blank sheet and build every transistor, line of software and system component from scratch, and "it will be utterly expected to work and it will work and it will be world class."
- He says Nvidia has no mission statement; the aim is an environment where people "could do their life's work."
