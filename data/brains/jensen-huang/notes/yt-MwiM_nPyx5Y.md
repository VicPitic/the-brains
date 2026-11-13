## Founding NVIDIA on accelerated computing in 1993

- Jensen, Chris Malachowsky and Curtis Priem founded NVIDIA at a Denny's in San Jose in 1993, when the PC revolution and the microprocessor were capturing the industry's imagination. Windows 95 had not shipped, and there were no laptops, smartphones, email or CD-ROMs.
- The thesis: general-purpose computing can't sensibly solve every problem. Add a specialist next to the generalist CPU. "If you can do everything and anything then obviously you can't do anything very well."
- He notes no computing platform company had been created since IBM System/360 in 1964.
- The bet stacked a technology challenge, a market challenge and an ecosystem challenge. The killer app was a 3D video game, and neither the app nor the market existed yet. He says the odds were "approximately 0%" and he wouldn't fund that business plan himself today, because the probabilities of each dependency multiply together.
- Funding came when two respected people from his earlier work called Don Valentine, and Wolf Corrigan, a founder of the semiconductor industry, told Don to give the kid money.
- He told Valentine "every human will be a gamer someday". He calls it the wrong answer for raising money, but it proved true. Video games became the largest entertainment industry, and gaming was the first killer app. It "bought us the time" to apply accelerated computing to other problems, which led to AI.

## Finding the "slippery middle": the flywheel strategy

- Accelerated computing is not a chip, which is why it isn't called an accelerator. It starts with understanding which application domains matter, then the algorithms, systems and architecture needed to accelerate them.
- The tension:
  - Accelerate one application, like a DVD or H.264 decoder, and the market is too small to fund R&D.
  - Accelerate every domain and you're back to a general-purpose processor.
- NVIDIA had to find a middle: broad enough for large markets, narrow enough to be 100x, 500x or sometimes 1,000x faster than a CPU. He calls it the "Razor's Edge" and says no other company in computing history got it right.
- The flywheel: more domains, then more customers, markets and sales, then bigger R&D, then staying well ahead of the CPU.
- Domains he lists: seismic processing, molecular dynamics, image processing, computer graphics, weather simulation, fluid dynamics, particle physics, quantum chemistry, then deep learning and Transformers. He expects reinforcement learning and multi-step reasoning systems next.
- Platform rule: an application developed for NVIDIA should run on every NVIDIA chip and computer. NVIDIA stayed committed to CUDA across every GPU even with no CUDA customers for a long time. He says it "cost the company decades and billions of dollars". Gamers funded the "day job" while the company worked at night on digital biology, quantum chemistry, AI and robotics.
- He says CUDA is the only computing model as popular as x86.

## Platform business model and the data center as the computer

- NVIDIA made two observations: accelerated computing is a software and algorithm problem, and AI is a data center problem. Training needs trillions of bytes processed billions of times, so no laptop or phone will do.
- Distributing one workload across thousands of GPUs (16,000 for GPT-4) and potentially millions of processors was a "giant breakthrough" that enabled large language models. Excel, by contrast, runs on one processor.
- Business model choice: NVIDIA could have been a vertically integrated data center company. He argues no computer company will be the only one in the world, and "it's better to be a platform computing company that serves every computing company in the world."
- NVIDIA disaggregated the room-sized data center (wires, switches, networking, software) and integrated it into everyone else's different data centers: AWS, GCP, Azure, Meta and others. The approach needs standardization where necessary and flexibility elsewhere.
- Result: NVIDIA architecture is "grafted" into every computer company, giving a larger install base, more developers, better applications, happier customers, more chip sales and a bigger R&D budget.
- Hardware scale example: a current AI computing board has 35,000 parts, weighs 70 pounds, is built by robots, needs a supercomputer to test and costs $200,000. He says it replaces several hundred general-purpose processors costing several million dollars, so every $200,000 spent saves about $2.5 million.

## Economics of AI and the case against Moore's law reliance

- Chip design costs NVIDIA roughly $5 to 6 billion of engineering, plus roughly half a billion dollars for fabrication via TSMC. A $1 billion data center "is not that much money", and he would build one "in a heartbeat" if money came out the other side.
- GPT-4 took about 16,000 GPUs, roughly a billion dollars. His message to founders: "Don't be afraid, don't let anybody talk you out of building a company."
- The world spends about $250 billion a year on computing infrastructure that generates no money directly (file storage, email). General-purpose computing is declining because it is too brute-force in energy and too slow, so that spend is shifting to accelerated data centers.
- Deep learning as compression: trillions of bytes of data compress into a neural network of about 100 GB, roughly two DVDs, that you can interact with semantically.
- Moore's law: about 2x every 18 months, or 10x every 5 years and 100x every 10 years. For CPUs it has slowed to "if you're lucky" 2 to 4x per 10 years, while demand and ambition exceed that. Accelerated computing augments the CPU rather than replacing it.
- His "AI factory" framing: data goes in, energy is applied, and valuable tokens (intelligence) come out, like water and fire producing electricity. He expects AI factories to be a major industry, powered by NVIDIA gear.
- Crypto: GPUs were the fastest high-volume supercomputer, so Bitcoin and Ethereum mining ran on them. His mother finally understood his job: "you plug it in and money squirts out."

## How NVIDIA chooses what to build: hard, destined, loved

- His goal is to create an environment where the world's best people will come do their life's work.
- Not how to choose: nobody great wakes up wanting to take a neighbor's share or pummel them on price. Great people want to do something never done before that is incredibly hard and has great impact.
- Three criteria:
  - Choose something insanely hard, so you have lots of time to learn it. Hardness discourages others, because "the person who's willing to suffer the longest wins".
  - Choose something you're somehow destined to do, given your personality, expertise, people, scale or perspective.
  - Love it enough to endure the pain and suffering.
- Consequence: NVIDIA naturally selects itself out of commodity markets such as cell phone chips or CPUs. Amazing markets attract amazing people, who, given patience, do amazing things. "It's simple to say, it takes an incredible character to do."
- No fabs: TSMC does it so well, and "let's go squander my time on something that nobody has done."
- Pain and suffering are "a positive attribute". People who can suffer are the most successful, and "great success and greatness is all about character."

## Staying alive, growth and people

- "In technology you're always dying", because someone is always trying to leapfrog you. Without that belief, you go out of business.
- Building companies means pain, suffering and hard work. NVIDIA was built "out of very unlikely odds" and took 30 years to be recognized as having reinvented computing for the first time in 60 years.
- Fast growth is about people. With the right systems, great people and craft, it matters little whether you ship $100 billion or $200 billion. The supply chain is very hard, but "it's all about people", and he credits a great management team.
- Mission framing: "make sure that your mission is not build trains but enable transportation." NVIDIA's mission is not building GPUs but accelerating applications and solving problems normal computers can't. "If your mission is articulated right... it'll last forever." He says accelerated computing is "in service of the problem", not a knife or pliers to push on everyone.

## AI, jobs and what comes next

- "AI is not going to take your jobs, the person who uses AI is going to take your job." Use AI as fast as you can.
- NVIDIA already uses AI to design its chips and cannot write its optimizing compilers without it.
- When productivity rises, companies with more ideas than money hire more people. Layoffs are the logical move only for companies with no new ideas. His advice: join companies with more ideas than they can afford to fund.
- Core breakthrough: computers learned to represent information as numbers (vectors), as in word2vec, where related words sit close together. The same works for anything with structure: images, video, 3D, proteins, chemicals, genes.
- Converting between representations drives the new capabilities: text to image (Midjourney, Stable Diffusion), image to text (captioning), amino acids to proteins (AlphaFold), and text summarization such as arXiv papers.
- Design example: give a generative model a brand style and sketches, and it returns 10 to 200 fully 3D CAD options to iterate on. "The future of design is going to be very different."
- Protein engineering: describe proteins in language and synthesize them, creating enzymes that eat plastic or capture carbon. He says "we were the computer chip engineering generation, you'll be the protein engineering generation."
- He expects AI to come for CEOs and deans quickly.

## Geopolitics, education and what a CEO must do

- Geopolitics: he backs national security but also economic security and human rights. Overly unilateral decisions cause backlash and unintended consequences. Export controls may limit China, but national sovereignty pushes every country to build its own AI infrastructure, which opens other markets.
- He hopes tension with China doesn't become tension with Chinese people, and warns against anti-foreign-student policy. Foreign students are among the US's greatest advantages, and he hopes they stay.
- On education: stay in school as long as you can. Professors curate knowledge for you, whereas he had to "scour the planet" and sift junk. People live to about 100, so learn as much as you can. He got a "virtual MBA" on the job and learned a lot from the people around him.
- What a CEO must lead with:
  - Character: how you choose and how you handle success and failure.
  - Strategic thinking: look around corners, connect dots, and mobilize the company. "Remember what a strategy is: action. It doesn't matter what the rhetoric says, it matters what you do."
  - Craft: the CEO should know the company's craft, where it came from, where it is and where it's going, and embody passion for it. It can be learned on the job.
