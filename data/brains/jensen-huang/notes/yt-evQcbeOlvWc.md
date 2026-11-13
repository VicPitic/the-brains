## How generative AI works and why Jensen sees it as a general-purpose tool

- Jensen says the core of generative AI is software that can learn the representation and meaning of data. This works for English, pixels, 3D objects, proteins and chemicals: "almost any data with structure."
- Once meaning is learned for one modality, it can be linked to another. Example: the pixels of a cat linked to the word "cat."
- That link lets you translate between modalities: English to Chinese, English to pixels (generative AI), pixels to language (captioning), text to text (summarization).
- He says the industry is now mixing these translation and generative methods into many applications. The core excitement is learning representations and moving between modalities.
- Generative AI predicts the next word, pixel or video frame, and these predictions can hallucinate.

## Retrieval augmentation: talking to a company's dormant data

- One effective way to reduce hallucination is to give the model lots of context and prompts before asking it anything.
- Retrieval augmentation: vectorize (embed) a structured or unstructured database by learning the relationships among its data. The database's meaning can then be searched semantically.
- The retrieved embedding augments the prompt, so the model gets richer background information.
- A large language model connected to a vectorized database lets you "talk to your data." Jensen notes that every company holds a lot of data that is now dormant and hard to use.
- Example: a customer service department's logged interactions. Vectorize them, then ask what people are most upset about, what trends are emerging, and the top two or three things to improve service. "You can talk to your database like you're talking to a person."
- Inside NVIDIA, AI is used to:
  - optimize chip design and transistor placement
  - find which line of code likely caused a bug after a failure

## Staying alert to weak signals and reasoning from first principles

- Jensen says NVIDIA is full of best-in-field experts (compilers, chip design, processor design, interconnects). Meanwhile the company should be as alert as possible.
- Information should move freely, "without being trapped in silos," especially as the company grows and the industry moves fast.
- He wants people watching for "very weak signals," such as a research paper in digital biology or robotics that generalizes to another field.
- Example: reinforcement learning was developed for animating stick figures, fingers and playing games, yet reinforcement learning from human feedback proved useful for fine-tuning large language models.
- His method:
  1. Start with strong foundational expertise in the company.
  2. Stay alert to weak signals, including from adjacent or unrelated fields.
  3. Distill each observation back to first principles: why is it important, and what are the governing dynamics behind it?
  4. Generalize and extrapolate to useful applications in other domains.

## Flat organisation: why NVIDIA removed layers of management

- Jensen says the organisation's architecture exists so the company can operate as efficiently as possible.
- Speed of change drives it. He says Moore's Law in the older days gave 10x every five years and 100x every ten. Accelerated computing is moving "somewhere between 1,000 to 100,000 times every 10 years." At that speed, information must flow quickly and the company must stay aligned.
- Complexity drives it too. He says an AI GPU weighs 70 lbs, has 35,000 parts (eight of them from TSMC) and consumes 10,000 amps. It is so heavy that robots manufacture it, and it takes a supercomputer to test another supercomputer.
- NVIDIA designs chips, systems, software, networking and silicon photonics, and helps customers stand up and operate data centers. Information therefore must move "with no barriers and no boundaries."
- He rejects hierarchical information flow. In most organisations a few people sit at the top, and there can be seven to ten layers of management before reaching someone who deals with ground truth.
- His fix: make the top of the company as flat as possible. He says this removed roughly three or four layers of management.

## Perpetual peril: why NVIDIA's culture feels existential

- Asked whether he deliberately instills paranoia, Jensen says you don't have to: "If you don't think you're in peril, it's probably because you have your head in the sand."
- He says no company is assured of survival. NVIDIA nearly went out of business a handful of times, so the feeling is real and not staged.
- He says "the company's always in peril and we feel it." The company doesn't need assurance of success to do its best work.
- He wants the company between aspiration and desperation, which he considers better than always optimistic or always pessimistic.
- His stance: a guarded optimism plus a realistic sense that the company could be in peril at any time, so it must stay focused, alert and "constantly earn the right to be in business."

## Human in the loop, diversity and redundancy

- Jensen says human in the loop is important. Levels of autonomy should rise only with many "nines" of safety.
- Self-driving example: for a car to carry a sleeping family autonomously, the sensors, computing and vehicle control need diversity and redundancy. That means cameras plus radar plus lidar, and redundant steering and braking.
- Air traffic control is his analogy: two pilots, redundant autopilots, air traffic control, and pilots watching each other. The human can sit outside the system and still monitor it.
- He applies the same idea to companies. Diversity and redundancy make a company resilient: sales augmented by marketing, and the same problem analyzed from different perspectives.
- For generative AI he says:
  - We must invent safety technologies and apply safety engineering and validation methods.
  - For a long time there will "surely" be humans in the loop. Before a model trained on a new batch of data is released, humans should validate, test and red-team it, instead of letting it learn and update continuously on its own.

## Operating under export restrictions and quantum computing

- On China export limits, Jensen says the restriction is on capability (GPU performance level), not an absolute ban, and similar limits on CPUs and computers go back a long way.
- His sequence:
  1. Understand exactly what the regulation limits and comply, noting the rules are inspired by national security.
  2. Offer products that customers may still find attractive.
  3. See whether customers buy. He says "there's no guarantee," since local competitors in China are numerous and moving quickly.
- On quantum computing, he says building the next fastest computer requires the fastest computer to design, simulate and create algorithms for it, and that is NVIDIA's accelerated computing systems.
- NVIDIA doesn't build quantum computers but works with nearly everyone in the quantum ecosystem, from basic designers to algorithm developers and architects.
- He expects industrial-scale quantum computing in probably "another decade and maybe two." When it arrives, he expects it to be an accelerator attached to accelerated computing systems, with classical computers doing pre- and post-processing.
