## Why J2EE, WS-\*, and now Kubernetes keep happening

- DHH started programming during the J2EE heyday (late 90s/early 00s): expensive, hard-to-learn application servers, monitoring tools and "boxes upon boxes of other fancy solutions" that needed "an army of contractors, consultants, and sales people" to buy, configure and run.
- All of it did what a Perl CGI script or PHP page could do: pull data from a database and render it as HTML.
- His diagnosis: there were good ideas underneath, but "the ratio between Good Idea and Bullshit was completely out of whack."
- He treats this as a recurring cycle. Merchants of complexity "migrate to the next" market whenever one dries up, and "the struggle between profitless simplicity and profitable complexity is eternal in the world of software."
- When things become too easy and approachable, there is no room for the enterprisey services, sales and solutions to prosper, so the incentive is to rebuild the complexity elsewhere.

## Rails as the original answer to J2EE

- The original mission of Rails: "to liberate the good ideas from the bullshit," flush out the nonsense, and compress the remaining intrinsic complexity.
- The goal was that "mere mortals without an advanced degree in enterprisey gibberish" could use the real ingenuity that was present.
- It worked. Rails brought a deep catalogue of solid patterns from J2EE and elsewhere (he links Fowler's Patterns of Enterprise Application Architecture) to programmers who would never have had the patience for the original wrapping, and gave those already versed in the patterns a simpler environment.
- It also drained much of the enterprisey swamp. There was no room for commercial vendors selling convoluted wares to an ecosystem running commodity hardware, commodity databases, web servers and simple open-source frameworks.

## WS-\* ("WS-DeathStar") and how JSON over HTTPS beat it

- After Rails arrived, the next complexity gold rush was Web Services, WS-\*, which he called "WS-DeathStar" at the time.
- It sought to complicate the basic mechanics of making applications talk to each other over the internet. Examples he names: WS-SecurityPolicy, WS-Trust, WS-Federation, WS-SecureConversation.
- It mushroomed into "a cloud of impenetrable specifications," seemingly written by and for holders of the same advanced degrees in enterprisey gibberish.
- It imploded, like J2EE, "under the pressure of the plain alternative: Just sending JSON over standard HTTPS to servers running whatever on the backend."
- Practitioners argued for years over how pure something had to be to be called RESTful, but "it didn't really matter. The internet voted with its web requests."
- Fragments of the old world remain (SOAP references, some bank on an original J2EE stack). The wide internet belongs to Rails, JSON, REST, and commodity databases and web servers.
- He sets JavaScript aside as "an interesting hybrid case" that needs its own exploration, but aligns it more with the rebels than the empire.

## Kubernetes as the latest Death Star

- The latest frontier is containerized running of software in the cloud. He ranks the initial advancement and popularization of containers as "one of my favorite milestones of progress in our industry."
- The merchants of complexity saw that simplicity "as a bug to quickly correct" and used "their impressive tractor beam of bullshit to pull us back towards the ever-reconstructing Death Star."
- He grants that there are good ideas inside Kubernetes and the tools, services and standards following in its wake, but says the bullshit ratio is "already completely out of whack."
- The actual goal is modest: run an application on some hardware in a reasonably efficient manner, and be able to easily redeploy it when it changes.
- Contrasting what Kubernetes requires, both within your application and to operate control planes, with "the breakthrough simplicity of the original Docker advancement" is, in his words, "damn depressing."
- It is also predictable: the complexity is immensely profitable, and renewed demand for "advanced degrees in enterprisey gibberish" drives the same expansion of jargon, specifications and techniques seen with J2EE and WS-\*.

## Why complexity looks reasonable while you are inside it

- In hindsight it looks silly. He points to early-2000s WebSphere manuals and the incantations once required just to reach Hello World, and challenges readers to digest WS-\* specifications: "It's technical masochism."
- In the thick of it, the complexity seems "if not reasonable, then at least excusable": "Yes, this is all horrendously complicated, _but_ look at what we can do!"
- The pattern is to offer reasons (he jokes "17 reasons") why the simple approach is "just naive or unsophisticated."
- He frames this with the Emperor's New Clothes: if you can't see the splendor of the king's fine threads, "surely it is you, little boy, who is mistaken."

## Practical stance

- His advice: "Beware carnies dressed as storm troopers. The circus empire is always coming to town."
- Keep "a safe distance, a skeptical mind, and one hand on your wallet."
- The test he applies each cycle: does the tool still deliver the simple core job (data to HTML, apps talking over HTTP, running and redeploying an app) at a sane cost in complexity, or has the Good Idea to Bullshit ratio gone out of whack?
