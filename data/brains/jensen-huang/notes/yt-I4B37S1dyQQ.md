## NVIDIA started with the wrong technology and survived by learning

- Jensen says the technology NVIDIA was founded on in 1993 was "absolutely wrong". The idea was to turn every PC into a game console by fitting a new 3D graphics algorithm, normally needing large supercomputers, into the PC.
- In 1995 he realised the algorithm did not work. By then some 35-40 other companies were building 3D graphics for PCs, so it was almost too late.
- He told the team the company would not exist unless it confronted the fact that this didn't work. Nobody on the team knew the right way to do it either.
- He spent a couple hundred dollars at Fry's on three OpenGL textbooks and gave them to the engineers. NVIDIA went on to become the world leader in modern computer graphics, "we learned it from a textbook".
- His lesson: technology changes all the time, so as long as you can confront reality and learn, the specific technology doesn't matter.

## The Sega contract that kept NVIDIA alive

- Sega had contracted NVIDIA to build the console after Saturn, which became Dreamcast. The contract was worth $12 million.
- Jensen flew to Japan and told Sega's CEO the technology was flawed and NVIDIA could not deliver. He advised Sega to choose someone else, then asked to keep the money anyway because NVIDIA still needed it.
- He says he was polite and humble, and the CEO recognised his honesty. Jensen's reading: "You don't invest in companies, you invest in people."
- That $5 million kept NVIDIA alive and bought time to find the right approach.
- Sega sold its NVIDIA stake when NVIDIA went public in 1999 at a $300 million valuation.

## What makes a great company: a unique perspective, and algorithms over chips

- Jensen believes great companies come from "a unique perspective about the world that you deeply believe in", more than from technology or market alone. Right technology, right market and right time help, but the vision comes first.
- The best combination is a high-level vision of an important future, unique and deeply held, and ideally hard to pursue.
- NVIDIA's perspective: CPUs are useful, but accelerators can solve problems otherwise too hard to solve. Examples he names include 3D graphics, molecular dynamics, image processing, inverse physics, particle physics, fluid dynamics and deep learning.
- "It's not about building a great chip, it's about accelerating an algorithm domain." His lens is always to look for an algorithm (e.g. OpenGL, SQL, deep learning) and a problem NVIDIA can help solve.

## Seeing deep learning early, and first-principles reasoning

- When AlexNet appeared, Jensen asked what the algorithm was, why it worked so well, what else it could do and what it could solve at scale.
- His insight was that AlexNet was not just AlexNet. Deep learning is a universal function approximator that can learn almost any function, and most interesting problems are imprecise anyway.
- About 15 years ago he started asking what this does to the whole computing stack: processor, middleware, algorithms and applications (the "five layer cake"). NVIDIA began work on computer vision, robotics and self-driving cars almost immediately.
- His method is first principles: "if this then what? If this can get better then so what?"
- Planning horizon: a system takes about three years to build, a couple more to ramp, and customers want to use it for 10 years. So NVIDIA has to "live in the future 5 to 10 years".
- Example: seeing early chain-of-thought work from Stanford led him to reason that self-driving might need less data. This led to Alpamayo, which he calls the world's first thinking self-driving car, good with only a million or a couple million miles of data because it uses prior knowledge like a human driver.

## Leading as a founder: curiosity, staying in the weeds, fitting the company to you

- His starting point is curiosity. He seeks answers to his own questions, then learns the domain well enough to be of service to the company and share it. He calls this "a personality technique", not a management technique.
- Staying close to the technology matters because it changes fast. He compares it to surfing: you have to read the waves, the wind and timing, and you can't without actually doing it.
- Founders don't need to change their personality when they become CEO.
- His F1 metaphor: you are building a race car you can drive. "You should adapt the car to you." Asked what happens when he leaves, he says the next CEO can reshape the company to suit them.
- He is constantly tweaking the company and reshaping business processes so he can be more effective.
- On tools, NVIDIA lets "a thousand flowers bloom": people use Claude Code, Codex, Cursor or Cognition, and the company learns from all of it. Claude Code runs autonomously in sandboxes across NVIDIA.

## Agents, systems thinking and open source

- Systems thinking is the skill he expects to matter most. Low-level work (chip synthesis, most software) gets automated by agents, so designers become systems designers. Questions: what is the problem, what are the constraints, where are input and output, what is the data rate, is the bottleneck processor, memory or networking.
- Agents already show a form of recursive self-improvement by updating markdown files and long-term memory. The biggest breakthrough needed is controllability: fine-grained control, e.g. changing one word in a plan file and getting a specific delta (one pixel, one CAD component, one via). Agents need not be 100% accurate; 80% or 99% with human help is usable.
- On OpenClaw he said "we just designed the modern computer", a "Linux moment". He told its creator Peter that all of NVIDIA's engineers were his engineers. NVIDIA also released a sandboxing toolkit around agent harnesses, and supports Hermes.
- He encourages everyone to use ChatGPT and Claude, and companies to build their own domain-specific AI with Hermes, OpenClaw, LangChain or Deep Agents. This is relatively easy because "the software is smart".
- He argues open source made modern AI possible (Linux, Kubernetes, PyTorch, TensorFlow, Caffe, Theano). He made his first X post in 2026 in support of open models.

## Jobs, physical AI and what to learn

- AI automates tasks, not whole jobs. A job has a purpose made of many tasks. He argues "AI destroying jobs is exactly backwards".
- Examples he cites: software engineer jobs up 10% year over year despite automated coding; radiology jobs up some 20% in several years despite AI reading scans, because patient backlogs are huge; paralegal jobs growing, because lawsuit backlogs are high. Productivity drives growth, and growth drives employment.
- Physical AI: generating video of a hand picking up a glass made him see robot articulation as near. He says the "ChatGPT moment" of robots happened a couple of years ago.
- Robotics needs three things: real-to-sim environments, simulators (Isaac Sim, Cosmos) that mix physics-grounded and generative simulation, and sim-to-real via reinforcement learning grounded in physics.
- Self-driving was chosen first for its large market, standardised technology and real economic value. He open-sourced Alpamo because agriculture, mail delivery and warehouse robots each are too small alone to justify a stack. NVIDIA's physical AI business is about $10 billion and he calls it the "next hundred billion dollar business", taking more than 2-3 years but less than 10.
- Advice to students: simple work, including coding, gets automated. Hard problems stay: physics, chemistry, biology, computer science and engineering, systems thinking, the intersection of technology and social issues, and market gaps. Chip design went from about a thousand transistors to trillion-transistor chips because ambition scaled. "Stay in school."

## Advice to founders: "how hard can it be?" and resilience

- Starting out, Jensen felt there was far too much to know and was scared to raise money because he couldn't answer investors' questions. He bought a 500-page book on starting a company and did not read it. He says "none of that stuff matters", and he still barely knows the answers today.
- He calls now the greatest time in 60 years to start a company, because the computer has been completely reset.
- His mindset: "This is important. I've got to go learn it... how hard can it be?" It will be "way harder than you think", so don't imagine all the difficulty at once and let it turn into anxiety. "Let the suffering come to you a little bit at a time."
- "Learning is the single greatest superpower." Believe that if anybody can do it, you can.
- On resilience: "You don't have to overcome life in one day. You just have to overcome that morning." He calls resilience probably the single most important thing and urges founders not to let fear, anxiety or lack of confidence stop them.
