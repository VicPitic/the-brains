## Why Nvidia started with parallel computing and video games

- Early 1990s observation: in a software program, roughly 10% of the code does 99% of the processing, and that 99% can run in parallel. The other 90% of the code must run sequentially.
- Jensen concluded the "perfect computer" does both sequential and parallel processing, not one or the other. Nvidia was founded to solve problems normal computers can't.
- Why games first:
  - 3D graphics needs parallel processing.
  - He loved the application, a simulation of virtual worlds.
  - He judged games could become the largest entertainment market ever, and that proved true.
- A large market funds a large R&D budget. That budget creates new technology, which grows the market. He calls this technology-and-market flywheel what made Nvidia one of the most important technology companies.
- He calls a GPU a "time machine" because it lets you see the future sooner. A quantum chemistry scientist told him: "Jensen because of Nvidia's work I can do my life's work in my lifetime." Weather prediction and simulating self-driving cars in virtual cities are the same kind of time travel.

## How CUDA came about and why he bet the company on it

- CUDA came from a mix of sources, which he describes as "some of it is aspiration and inspiration, some of it is just desperation":
  - Researchers at Mass General were using Nvidia graphics chips for CT reconstruction.
  - Other researchers were "horsing around" using GPUs for general-purpose acceleration.
  - Nvidia's own games needed fluid dynamics and particle physics, which a graphics-only pipeline handles poorly.
- Before CUDA, researchers had to trick GPUs into treating their problem as a graphics problem. CUDA let programmers use languages they already knew, such as C.
- Why he was certain, and put the whole company behind it: the video game market was so large that the GPU would be the highest-volume parallel processor in the world, so the architecture had a good chance of reaching many people.
- His framing of the risk: the cynic says "if you build it they might not come." The optimist says "if you don't build it they can't come." Nvidia's approach was "a strategy based on Hope," but "reasoned hope."

## AlexNet in 2012 and reinventing the computing stack

- In 2012, Ilya Sutskever, Alex Krizhevsky and Geoff Hinton at the University of Toronto got a GeForce GTX 580 because they had learned of CUDA, and used it to train AlexNet.
- Nvidia was already struggling to get CUDA to work well for computer vision internally. AlexNet's giant leap on computer vision therefore got its attention.
- He asked: "if it can do this with computer vision how far can it go?" His reasoning:
  - If deep learning scales, most machine learning problems can be represented with deep neural networks.
  - That has the potential to reshape the entire computer industry and its architecture.
- This led Nvidia to re-engineer the entire computing stack "layer by layer by layer", which is where DGX came from. He frames it as reinventing computing 65 years after IBM System 360 introduced modern general-purpose computing.
- Result he points to: computer vision, speech recognition and language understanding were each solved in turn.

## Core beliefs, first principles and staying committed for a decade

- Why it took about 10 years: he says the middle of the decade "probably felt like today." There is always some problem, some reason to be impatient, and some reason to be happy and carry on.
- His method:
  - Have core beliefs and reason from first principles (physics, deep understanding of the industry or the science).
  - "At some point you have to believe something."
  - If the principles and assumptions don't change, there's no reason to change the beliefs.
  - Evidence of success arrives along the way. Sometimes you go a long time without it and may need to course correct a little.
- He says staying committed was not hard to explain: "there was no reason to not be committed because we believed it."
- Costs of conviction: nobody else believed in it, it cost a lot of money, and investors might prefer you keep the profit or lift the share price. His answer: "you have to believe in your future, you have to invest in yourself." Nvidia invested tens of billions of dollars before it really happened.
- His three core beliefs:
  1. Accelerated (parallel) computing, adding accelerators to general-purpose processors.
  2. Deep neural networks learn patterns and relationships from many types of data. They scale: bigger models and more data learn more nuanced features, empirically true, and no physical, architectural or mathematical limit has been found.
  3. Data is "digital versions of human experience", and AI can learn almost any modality and translate between modalities.
- Examples of modality translation: text to text (summarise, translate), text to image, image to text (captioning), amino acid sequence to protein structure, words to video, and words to action tokens for a robot. "From the computer's perspective how is it any different."
- He says the last 10 years were the science of AI and the next 10 will be the application science of AI: digital biology, climate, agriculture, fishery, robotics, transportation, logistics, teaching and more.

## Betting on general-purpose architecture instead of burning in Transformers

- The question: build chips tuned to one AI architecture (Transformers) or stay general. He says it comes down to core belief: is the Transformer the last AI architecture ever discovered, or a stepping stone to evolutions "barely recognizable as a Transformer"? Nvidia believes the latter.
- His reasoning: no idea in software, engineering or algorithms has stayed on top that long. A computer's beauty is that it can do something today that no one imagined 10 years ago. If you "turned that computer 10 years ago into a microwave" the applications would stop coming.
- Example: the attention mechanism compares every word with every other word, which becomes impossible at million-token context windows. This led to many variants since, such as Flash Attention and hierarchical attention.
- Strategy: build an architecture that lets inventors, programmers and AI researchers "swim in the soup" and come up with new ideas. Flexibility for research and innovation is "fundamentally the most important thing."

## Working with partners and pushing physical limits

- Nvidia has its chips made by TSMC but still assumes it needs deep expertise of its own:
  - It employs people very good at semiconductor physics, to have an intuition for the limits of what current semiconductor physics can do.
  - It then works closely with TSMC to discover those limits together.
- The same applies to systems: it has plumbing expertise for liquid cooling and aerodynamics engineers designing fans to move the most air with the least noise. Nvidia doesn't make these parts but designs them, and needs deep knowledge of how to have them made.
- Limit he names: "everything in the end is about how much work you can get done within the limitations of the energy that you have." Energy efficiency is Nvidia's number one priority.
- Data point: the first DGX (DGX-1) was delivered to OpenAI in 2016 at $250,000. The new mini version uses 10,000 times less power than the 2016 one, according to him, and has six times more performance. He frames this as 10,000 times better energy efficiency in eight years, and compares it to a 100-watt light bulb producing the same light on 10,000 times less power.
- He plans $3,000 mini AI supercomputers so students and schools can own one, since AI has gone from researchers to every engineer and student.

## Physical AI: Omniverse plus Cosmos, and AI safety

- His analogy from language models:
  - ChatGPT's first stage was generative AI that could hallucinate.
  - The next stage grounded it with context (an uploaded PDF, search), which becomes the ground truth.
- The physical-world equivalent:
  - Cosmos is a world foundation model that encodes physical common sense: gravity, friction, inertia, geometric and spatial awareness, object permanence, cause and effect.
  - Omniverse is a physics simulator built on principled solvers (Newtonian physics) that grounds Cosmos.
  - Together they can generate effectively unlimited physically plausible futures for robots to train on, in different lighting, times of day and conditions, instead of costly and slow real-world training.
- Prediction: "everything that moves will be robotic someday and it will be soon." Pushing a lawn mower will be "kind of silly", every car will be robotic, and humanoid robots are "just around the corner." He expects a personal R2-D2-like companion that lives across glasses, phone, PC, car and home.
- AI safety concerns he lists: bias, toxicity, hallucination, fake information, impersonation, and AI that tries to do right but performs wrong (for example a failed sensor in a self-driving car).
- His engineering answer is redundancy and community architecture. Like aviation (triple-redundant flight computers, two pilots, air traffic control, other pilots watching), AI safety systems must be built so that failures don't put people in harm's way. Break the problem into parts and "build them as engineers."
- Other bets he names: digital biology (a digital twin of the human body), and climate science with high-resolution regional weather prediction.

## Advice for individuals: AI makes people superhuman

- Mental exercise: suppose the effort of drudgery in your work goes toward zero. He compares this to the interstate highway system, which created suburbs, gas stations, fast food and motels. Ask what new capabilities and economies appear.
- He is already surrounded by thousands of people better than him at what they do, and says it never made him feel unnecessary: it "empowers me and gives me the confidence to go tackle more and more ambitious things." He expects the same from AI: "we're going to become super humans because we have super AIs."
- Concrete advice:
  - Get an AI tutor right away to teach, program, write, analyze and reason with you.
  - Learn to prompt well. It resembles being good at asking questions and takes some artistry.
  - A student should keep asking "how can I use AI to do my job better?" (lawyer, doctor, chemist, biologist, in any field). His generation was first to ask this about computers (he entered the industry in 1984); the next generation must ask it about AI.
  - If you don't know how to use ChatGPT, just ask it to teach you.
- Example of AI freeing attention: the GeForce RTX 50 Series computes about 500,000 pixels of an ~8 million pixel 4K frame (ray traced) and AI predicts the rest. Humans, like the card, should spend scarce attention on the few things that matter most and let AI fill in the rest.

## What he wants Nvidia remembered for

- In his words: "they made an extraordinary impact."
- He credits core beliefs held a long time ago and stuck with. He says Nvidia takes the responsibility seriously because of its consequential work.
- He wants the capability available as pervasively as possible: to large companies and individual researchers across every field, "no matter profitable or not, big or small, famous or otherwise."
- His hoped-for legacy: digital biology and life sciences transformed, materials science revolutionized, robots handling dangerous and mundane work, and people learning that the company at the epicenter is "the company that you grew up playing games with."
