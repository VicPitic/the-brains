## ChatGPT as AI's iPhone moment and a new computing platform

- Jensen says GPT-3, WebGPT and InstructGPT were each impressive, but ChatGPT "woke the whole industry up". He calls it "unquestionably the most easy-to-use application that has ever been created" for tasks that consistently surprise people.
- The ease of use and the capability surprised everyone, from novices to deep computer scientists. The transformer work had been done in plain sight, but ChatGPT put the interface, fine-tuning and results together in one flashpoint.
- Within about sixty days, every cloud and software company asked what it meant for them, hundreds of startups appeared, and VCs began funding generative AI.
- Executives who had enjoyed GTC keynotes without being affected by them now call him and say "Now I understand what you were talking about." He says not one executive he knows has been left unmoved.
- His earlier pitch: large language models first learn human language, but will learn "the language of everything, everything that has structure". The physical world, proteins and chemicals all have structure. Understand the language and you can generate new proteins with new properties and functions.
- Three properties characterise a computing platform: how you program it, what applications you can build, and who can put it to work. ChatGPT created a new computing model on all three.
- Reach by platform: workstations in the hundreds of thousands of people, PCs in hundreds of millions and billions, mobile in billions. App counts grew each time: about 5 million in app stores, 350,000 to 500,000 websites that matter. He expects hundreds of millions of LLM applications "because we're going to write our own".
- He frames it as a phase shift: "We're going to look back and we're going to say 'Hey, guess what, we were there'."

## How Nvidia responded to ChatGPT demand

- First task: respond to a step-up in demand, in two forms.
  - Training: nearly every major cloud provider was already working on LLMs and now has to reach the next level faster. That means bigger models, more data, and the supporting models for fine-tuning, alignment, guard-railing and augmentation.
  - Inference: generative AI is being wired into Microsoft Office, Google Docs and web browsers, so "inference demand has gone through the roof".
- Inference is the biggest change in how he thinks about the business. The workloads differ, so they need different GPUs:
  - Generative video, such as relighting faces, eye reposing, background enhancement. He cites RunwayML as a favourite.
  - Image and 3D graphics generation.
  - LLMs from more than 175 billion parameters down to 5 to 8 billion, where response time per token matters because users watch long outputs stream.
  - Retrieval models with vector databases, where he says Grace Hopper is ideal.
- The core technology already existed. Turning it into inference products for data centers at scale took about six months.
- Inventory write-downs: he admits "Last year was unquestionably a disappointing year". Nvidia expected a bigger year and, with long cycle times, had built or committed to more supply than it sold. Older Ampere parts have a shelf life as Ada and Hopper take over, and Hopper's transformer engine suits LLMs well.
- What limits supply: a GPU is not a chip. A data center Hopper is eight chips with advanced packaging, NVLink, extreme thermal management and about 35,000 components, and weighs around 70 pounds. An AI supercomputer also needs switches, NICs, cables, PDUs and data center space, all on the critical path.

## Full stack inside, disaggregated at go-to-market, and DGX Cloud

- His principle: "the data center is the computer". It must be orchestrated as one machine, a single pane of glass, which requires software-defined infrastructure and a separate compute plane and control plane.
- Nvidia builds the whole system vertically integrated, full stack and at data center scale, across domains (quantum, computational lithography, graphics, AI, robotics) and from cloud to edge. When it goes to market, it disaggregates everything and integrates into Dell, Lenovo, Quanta, Foxconn, Azure, GCP, AWS and OCI.
- Doing this depends on telling the ecosystem what Nvidia intends to build, so partners can prepare. That is why GTC is transparent about direction, and he says DGX Cloud was built in plain sight.
- Nvidia is "an extension of Dell" and HP for OEM purchases. DGX Cloud applies the same idea to cloud providers: the same Nvidia stack running natively on any cloud, multi-cloud, hybrid, to the edge.
- He calls DGX Cloud "the largest, most significant business model extension we've ever had". Nvidia sells alongside the cloud providers, "when we win, they win". Customers can use a pre-negotiated provider or take Nvidia's suggestion.
- He did not frame it as a way to get subscription revenue and smooth the cycle. The aim is to engage customers directly, to hosting, and move faster: "Nvidia's in the browser", so a team can start from a browser without building a DGX system.
- OCI was first because of compatibility, not for any other reason. He worked with Oracle's architecture team on the best native integration, not a drop-in system. AWS is not shut out, and the deep AWS partnership continues (SageMaker, recommenders, graph neural networks, robotics). He wants to work with everyone the same way, though time to market differs.
- Nvidia already works directly with end users: about 10,000 AI startups, nearly every game developer, nearly every car company, nearly every drug discovery company, and directly with TSMC on cuLitho and with ASML. Fulfilment historically came through others.

## Who should use DGX Cloud, and picking fights worth having

- Large teams at AWS, Google and Microsoft still need Nvidia's large team. He says "nobody knows accelerated computing better than we do" and nobody has a richer set of libraries to integrate. SageMaker and Vertex AI work with Nvidia teams to accelerate them.
- Accelerated computing is not like spinning up a CPU. It takes many acceleration libraries and a lot of computer science. His line on Moore's Law: "How do you overcome physics except for cleverness?" and the cleverness is computer science.
- Newcomers to ML should just use a public cloud. SageMaker and Azure ML are "terrific", and Nvidia GPUs are integrated into most AI frameworks. He estimates about 80% of the world should go straight to a cloud partner.
- Best fit for working directly with Nvidia: bespoke domain frameworks (drug discovery, industrial AI), high-end generative video, or a proprietary LLM that must scale, be refined and deployed performantly. "We should not be the world's fifth cloud service provider."
- On commoditisation (PyTorch abstraction, AMD, Intel): "You build a great company by doing things that other people can't do. You don't build a great company by fighting other people... to do things that everybody can do."
  - "We're just not a share company." Nvidia works on problems it should solve, that only it can solve or is singularly best placed to solve.
  - He is happy when partners such as AWS and OpenAI succeed, whether or not they use CUDA. "CUDA has great value to us, whether it has great value to somebody else or not, so what?" If someone else is the best answer, "so be it. We move on."

## Export controls, resilience and supply chain

- A800 and H800 are the China versions of A100 and H100. They are physically fused to lower floating point performance, interconnect, or both, and cannot be unfused. They are form-fit-function identical, plug into the same sockets and run the same software, slower, yet "still the world's best". "The most important thing is it complies with regulation."
- Slower interconnect still scales but less effectively. For example, scaling to 1,000 processors becomes less linear and plateaus earlier. Faster processors need faster fabrics.
- On TSMC Arizona: "that resilience comes from diversity and redundancy". Fabs in the US and elsewhere are incrementally more expensive, and there is a price for that, which Nvidia accepts.
- He compares this to how Nvidia runs itself: power, storage and security redundancy, and even organisations. Sales and marketing overlap so there is diversity, and engineering does the same. Packaging, assembly and testing already carry built-in redundancy, which costs money.

## Where inference runs, and why full-stack beats Moore's Law

- "Inference will be the way software is operated in the future", meaning software written by a computer instead of a human. He expects every computer to run it eventually.
- Generative AI is the most energy-conserving way to compute: "Why look up an answer if you already know the answer?" He compares it to a human brain at roughly 25 watts.
- Local inference follows the OpenGL path: from a Reality Engine in a data center, to a $100,000 to $150,000 workstation, to a phone. The largest LLMs today need an A100 HGX costing a couple of hundred thousand dollars. He expects performant smaller versions on phones in "no more than ten years".
- The mix will be inference on phone, PC and cloud, with the cloud as the more capable backup. He expects today's distributed computing model to remain.
- Moore's Law delivered 10x every five years at ISO power and ISO cost. He says that will not happen in the next five years. Meanwhile, AI has advanced "a million times" in ten years, from AlexNet detecting cats to today.
- That came from reinventing every layer: chip, system, interconnect and algorithms. He expects LLMs to improve by another factor of a million over the next ten years, and says "It just has to be full stack."
