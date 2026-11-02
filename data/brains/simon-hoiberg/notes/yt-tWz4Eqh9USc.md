## Why Simon moved most of his SaaS stack off AWS

- Until early 2025 all of Simon's SaaS products ran on AWS. He then began migrating to dedicated bare metal servers at Hetzner.
- About 80% now runs on dedicated servers with open source software; about 20% remains on AWS.
- He says the move cut costs, sped up his products, sped up feature deploys, and "opened new business opportunities."
- Context: he runs a portfolio of five SaaS tools with 50,000+ users, heading toward $2 million ARR in 2025, generating over $100,000 per month.
- He frames the real downside honestly: he now manages the infrastructure himself.

## Old stack vs. new stack

**Before (managed, serverless, pay-per-use):**
- ECS, Fargate and Lambda for code
- AWS Amplify for hosting apps
- DynamoDB for data
- SQS for message queues
- CloudWatch for monitoring and logs
- AWS bills exact usage: milliseconds of execution, database reads/writes, log storage time.

**After:**
- Three dedicated Hetzner servers
- Docker containers managed by Kubernetes
- Postgres for data, Redis for caching, BullMQ for queues
- Grafana (free community edition) plus Prometheus for monitoring and logs
- Everything except the servers is open source or free, so the only bill is a low, fixed monthly server cost.
- He notes "leaving the cloud" is used loosely: he still rents servers in a data center. The shift is from managed serverless infrastructure to managing his own dedicated servers.

## Reason 1: Cost, and why the time investment still pays off

- Early 2025 AWS bill: about $7,800/month on average, and climbing as usage grew (pay-per-use means cost rises with users).
- After moving 80%+ of infrastructure: below $2,000/month, likely heading below $1,000/month once the last migrations finish.
- Hetzner itself costs about $200/month; the rest of the bill is the remaining AWS share.
- Counterpoint he raises himself: with $100k+/month revenue, is $7,800 a big deal, and what about the time spent learning Kubernetes, Docker and basic sysadmin?
- His answer: infrastructure time spiked at the start of 2025, but as he learned and as AI got better at helping, it returned to normal levels, "if not even less than it was before." Managing AWS is not zero effort either; it gets complex and has its own learning curve.
- Key argument: the time cost is a one-off, fixed upfront cost, while the savings are uncapped and grow every month. He thinks people fear the effort stays "in the red" forever, and in his experience it doesn't.

## Reason 2: Avoiding vendor lock-in

- DynamoDB, Lambda, Fargate and similar are robust and fairly priced, but they run only on AWS.
- If AWS raises prices or drops you as a customer, "you're cooked." Migrating needs careful planning, and a forced rushed migration could sink the business because users won't wait.
- He sees this as the biggest reason to consider leaving: it's not in the interest of AWS, Azure or GCP to make leaving easy.
- His new setup runs on any host offering a VPS or dedicated server.
- He proved it by running one smaller product for two days on three Raspberry Pis in his office. Internet speed and memory were issues, but he doesn't think users noticed. He doesn't recommend it, only the principle: remove as many hard vendor dependencies as possible.
- Remaining dependencies: Stripe and OpenAI. He is exploring Coinbase as an alternative payment method and dedicated GPU instances from independent vendors for AI, and says neither is simple.

## Reason 3: Making lifetime deals credible

- Besides subscriptions, he sells lifetime access to all five tools for a one-time payment.
- A one-time price with ongoing, rising costs is risky. Fixed infrastructure costs make financial planning for lifetime deals much easier and less risky.
- Users ask what happens to lifetime deals if his business fails, and he admits he has no satisfying answer beyond "my business is doing well."
- His fix: make all products fully self-hostable, so lifetime buyers can install the software on their own servers if he can't host it. This is "the best way I can guarantee that lifetime access really does mean lifetime access."

## What still runs on AWS (and what he tried)

- **Storage (S3):** Hetzner storage buckets and Cloudflare R2 are S3-compatible and cheaper, but still lock him in. S3 cost isn't the issue; lock-in is. He tried self-hosted MinIO on a 15 TB Hetzner drive attached to the main server. It worked "kind of," but backups were complex, MinIO is designed for distributed setups with multiple drives per node, and it wasn't stable. He went back to S3, calling it "probably a skill issue."
- **Authentication (Cognito):** similar to Auth0. Security-critical, so he's cautious. The only open source alternative he found, Keycloak, had poor user and developer experience in his view. He stayed on Cognito rather than risk a critical component.
- **Edge (CloudFront):** the public entry point proxying all requests to the Hetzner servers, so all inbound traffic is protected by default. He values its firewalls and DDoS prevention that he wouldn't know how to set up himself.
- **AI:** still relies on OpenAI, Replicate and Vesta AI. He hopes standalone servers will soon have the GPU power for reliable self-hosted inference.

## Who should leave the cloud

- **Small hobby project, not expected to grow:** stay on the cloud with Vercel, Netlify, Lovable or other one-click deploy tools.
- **Very large business needing serious scaling, or mission-critical to users:** use a managed hyperscaler like AWS.
- **Anywhere in the middle:** consider dedicated servers. Managing infrastructure yourself is "absolutely doable" and the savings are serious.
- Bonus: running on your own infrastructure lets you use open source tools internally too. He says he saved another $10,000 per year by replacing expensive tools with self-hostable alternatives.
