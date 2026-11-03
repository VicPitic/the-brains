## Why LLMs hallucinate: guessing is rewarded over admitting uncertainty

- Matt says LLMs lie all the time, and the lying is common enough to have a name, "hallucination". Having worked with LLMs for roughly 6 months, he says every developer he talks to shares his paranoia about everything an LLM says.
- He is still pro-LLM and says they have massively improved his job and what he can produce. The risk is that LLMs are presented so beautifully that people don't realize how often they are wrong.
- His mental model of training: an LLM is a compression of a huge training set into something small enough to fit on a GPU. Compression loses detail, like a heavily compressed photo where you can still see the microphone cap is blue but can't tell who the person is or their age.
- Why LLMs guess anyway: he cites OpenAI's paper "Why Language Models Hallucinate". Its argument is that training and evaluation procedures "reward guessing over acknowledging uncertainty".
- Benchmarks (he shows LiveBench) rank models on reasoning, coding, agentic coding, maths, data analysis and language. Topping a leaderboard is very valuable because switching models is easy. A model tuned to say "I don't know" on maths may score lower than one that guesses, so "you miss all of the shots that you don't take".
- He compares it to people: very smart people tend to be overconfident, humble people tend to be underconfident, and model builders have to pick a point on that line. He doesn't think it is an easy problem to solve.
- His summary: LLMs hallucinate because guessing is more highly rewarded than refusal.

## Intrinsic vs extrinsic hallucinations

- He draws on a paper with a comprehensive taxonomy of hallucinations in large language models, which lists about 10 types. He covers only a few and says the point is that LLMs are unreliable, especially on extrinsic knowledge.
- Intrinsic information is what you sent the LLM in the current conversation. Extrinsic information is what it must recall from its training data.
- Example of the distinction: tell Claude "My cat is called Bandit", then ask "What is my cat's name?" Getting that wrong would be an intrinsic hallucination. In a fresh conversation, a good model says it has no information about your cat, and guessing a name would be an extrinsic hallucination.
- His experience: LLMs are much more reliable when you send them the information first. If you rely on knowledge from their training sets, "you're going to be disappointed".

## Three types of hallucination, with real examples

- **Factual errors.** When Google announced Bard (LaMDA-powered), the ad answered "What new discoveries from the James Webb Space Telescope can I tell my 9-year-old about?" with the claim that JWST took the very first pictures of a planet outside our solar system. That was wrong, and it was in the advert. Alphabet's share price dropped about 8%. Matt notes the model apparently wasn't given any document on JWST and answered from training data, which makes it an extrinsic case.
- **Fabricated entities.** The model invents things that don't exist, such as packages, government departments and laws. This matters for developers because asking "Does a package exist for this purpose?" often gets a confident "yep". It has happened to him dozens of times, most recently the other day. It also opens developers to supply chain malware attacks, since attackers can register the fake package names LLMs recommend and spread malicious code.
- **Contextual inconsistency.** The model ignores or contradicts context you explicitly provided, which is an intrinsic hallucination. Example: Jake Moffatt asked the Air Canada chatbot about bereavement fares. It told him to submit within 90 days of ticket issue for a reduced rate, which contradicted the actual policy, and Air Canada was found liable (article from 2024). Matt calls it baffling, comparing it to the LLM forgetting your cat's name right after you gave it.

## Working around hallucinations: give the model the information

- Matt's main reason he stays pro-AI is that when you pass LLMs intrinsic information, they are far more accurate than when they rely on training data.
- Coding example: he passes his code base or big files to the LLM and asks it to answer questions or explore the code, and gets very good insights.
- Rule: "always make sure that you're providing it the information it needs to succeed."
- The objection he raises himself: when you are searching for something you don't know, you can't supply the information up front.

## The four-word fix: "Use your search tool"

- His answer to that objection is a four-word prompt: "Use your search tool."
- Most chatbots and agent harnesses have a web search tool the model can call. In Claude he keeps web search turned on under files and connectors.
- Example: asking which Arsenal players are injured right now makes Claude search the web and return an answer with citations to its sources. He says Sonnet did a good job here.
- Why you need to say it: many tools won't search by default. A model that is confident it knows the answer won't call search, because using the tool requires being humble enough to say "I don't know, I need to fetch this". A model tuned to be very smart may just repeat what it believes.
- Prompting it to search pulls articles into the context window, so the answer is based on intrinsic information and hallucinations become less likely.

## Verify critical answers yourself

- Even provided context can be ignored, as the contextual inconsistency category and the Air Canada case show.
- For life-or-death topics, health, and especially legal matters, he says to ask the model to use its search tool and then read the documents yourself.
- The same happens in his coding: the LLM reads some code, misses the full context, and confidently says something wrong, and he has to reply "No, that's actually not quite right."
- His closing stance: he hopes people stop trusting LLMs implicitly and instead use them for what they are good at, such as writing code. He made the video so people can share it with someone who doesn't yet have this intuition, and says even very smart people in his life lack it.
- He plugs a Claude Code for real engineers course running over the next 2 weeks, built on the idea that real engineering principles still apply in the AI age, and are "better than ever".
