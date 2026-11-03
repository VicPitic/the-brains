## Cost and scope: why DHH left the cloud

- DHH's company 37signals announced a cloud exit in 2022 and finished in June 2023. The 2022 cloud budget was $3.2 million.
- He says the bill had already been "highly optimized, monthly scrutinized, heavily haggled." It used to be twice as large, and optimizing further was "a ton of recurring work."
- 37signals bought about $600,000 of Dell servers. It conservatively estimated $7 million in savings over five years.
- By September 2023 the exit had already secured $1 million per year in savings. The bill kept dropping as reserved instances (prepaid for a year) expired.
- The hardware in two data centers totals 4,000 vCPUs, 7,680GB of RAM and 384TB of NVMe storage.
- DHH says it is easy for a mid-sized or larger company to spend 2-3-4x what 37signals did for the same customer count, so most companies have even more to save.
- Customers "scarcely noticed anything" during the move.

## Why the savings are not eaten by payroll

- 37signals did not change team composition after the exit. The same people who ran HEY and Basecamp in the cloud now run them on owned hardware.
- DHH calls the idea that the cloud means you hardly need operations staff "the central deceit of the cloud marketing." He has never seen reduced operations headcount at 37signals or at other large internet applications.
- About 90% of the expertise needed to run your own hardware is the same as in the cloud, at scale (millions of users, hundreds of thousands of dollars in monthly bills).
- The skills are not lost knowledge: the internet started in 1995 and the cloud only became the default around 2015, so companies ran their own hardware for twenty-plus years. He says it is not "some archaic knowledge that's been lost to the ages."
- A team does not need "a world-class team of super engineers." He says it would be hubris to claim 37signals has special insight.

## What owning hardware actually involves

- Almost nobody builds their own data center. Outside hyperscalers and mega companies (Google, Microsoft, Meta), companies rent cabinets, a room or a floor from a provider like Equinix. Power, fire suppression and physical security are the provider's job.
- 37signals uses a white-glove service, Deft, for racking and stacking. Deft unpacks the boxes from Dell, installs the servers and the IP address comes online. It is "just like the cloud, even if it isn't instant."
- The operations team "basically never" sets foot in the data centers and works remotely from around the world.
- Procurement takes longer than the cloud. DHH grants that nothing beats the cloud for "10 servers online in Japan" in 30 seconds. His view is that for a business like 37signals, that premium is not worth it, and waiting a couple of weeks is tolerable.
- Planning a European HEY outpost with Deft, which would be an experiment.

## Reliability, performance and security are the same problems

- **Reliability:** it is "largely a function of redundancy." In the cloud 37signals used two geographically dispersed regions with redundancy in each. It now has two dispersed data centers, each able to carry the full load, with replicas of every critical piece. His rule: you should be able to lose any computer or component at any time without a problem.
- **International performance:** the old setup was two US regions plus a CDN with edge nodes worldwide. The new one is two US data centers plus an international CDN. He says the hard part of a global footprint is application design (multiple write primaries, replication lag), not hardware.
- **Security:** most security problems come from the application and its direct dependencies, and the work is "not any materially different" whether you own or rent the computers. He says the cloud can give "a false sense of security."
- **Patching:** containerized delivery means little manual machine patching. Updates are packaged in Dockerfiles, and deploying a version on a newer Ubuntu is the same on rented or owned machines.
- **Kamal:** in February 2023 DHH bootstrapped Kamal in a few weeks to deploy without giving up cloud-era container innovation.

## Cloud-native, serverless and managed services

- He rejects the Cloud Native, not lift'n'shift argument as "cloud marketing nonsense." It rests on the belief that serverless functions and on-demand tooling make things cheaper.
- His analogy: if you need a pound of sugar, you will not save money buying single-wrapped cubes.
- He points to two earlier posts: "Don't be fooled by serverless" and "Even Amazon can't make sense of serverless or microservices."
- 37signals replaced managed services with open source equivalents: RDS became MySQL 8 and OpenSearch became open source Elasticsearch.
- Service contracts and licensing fees: nothing. Everything needed to run internet applications is available as open source.
- Support is optional. 37signals has used Percona's MySQL specialists on and off, which does not change the equation.
- His advice on vendors: avoid the most enterprisey outfits. If banks or governments are on their client list, look elsewhere, "unless you just like setting money on fire."

## Hardware lifespan, spikes and when the cloud still makes sense

- **Replacement cost:** the math assumes servers last five years. That is conservative: 37signals has had servers run 7-8 years. The $600,000 purchase was already paid off by the savings, so a new round of hardware would still leave the company ahead.
- **Moore's Law:** hardware from Dell and others has become much cheaper and more powerful in the last 4-5 years, while managed-service prices barely move. This is why he says much of the cloud is a worse deal each year.
- **Spikes:** because owned hardware is cheap, you can "dramatically over provision" for headroom with little effect on the long-run budget.
- **When cloud fits:** if you regularly face 5-10x or higher spikes over baseline, you may be a good candidate for cloud. That was Amazon's original reason (Black Friday, Cyber Monday). The saying is "buy the baseline, rent the spike."
- **Capacity planning for most companies:** buy powerful machines a fair step ahead of your growth curve, watch usage, and an unplanned expansion can usually be online in about a week.

## GDPR, privacy and why 37signals went to the cloud

- **Privacy:** the cloud gives no real regulatory advantage, and for European companies it is a negative. The big hyperscalers are American, so the US government can legally compel Amazon, Microsoft or Google to hand over data wherever the servers are. For strict GDPR compliance, DHH suggests owning hardware in a European data center provider.
- **Why they joined:** 37signals "bought the marketing pitch" of cheaper, easier and faster. Only faster came true, and provisioning a fleet quickly is something it rarely does.
- Economies of scale and ease of use never materialized: managed services still needed management, and Moore's Law gains were not passed on as savings.
- He is glad they gave the cloud "a proper go" because they learned and improved processes, but wishes they had done the math "a couple of years sooner."
