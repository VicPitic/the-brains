## Why DHH is leaving the cloud: the core conclusion

- Basecamp has had one foot in the cloud for well over a decade. HEY has run there exclusively since launch two years earlier.
- 37signals has run extensively on Amazon's cloud and Google's cloud, on bare virtual machines, and on Kubernetes.
- His conclusion: "Renting computers is (mostly) a bad deal for medium-sized companies like ours with stable growth."
- The savings promised in reduced complexity never materialized, so 37signals is making plans to leave.
- He describes the cloud as mostly "renting computers", even though it is sold as futuristic "computing on demand".

## When the cloud actually makes sense (and why it doesn't for 37signals)

The cloud excels at two ends of the spectrum. Only one end was ever relevant to 37signals.

- **Simple, low-traffic apps:** fully managed services save real complexity when you have no customers. This is the path Heroku forged, now paved by Render and others. It carries you far even with some customers. Bills that balloon with usage later are a "Good Problem" and a reasonable trade-off.
- **Highly irregular load:** wild swings, towering peaks, a baseline that is a sliver of peak needs, or no idea whether you need ten servers or a hundred. 
  - Example: HEY's launch. 300,000 users signed up in three weeks against a forecast of 30,000 in six months. The cloud was ideal for that.
- Neither condition applies to 37signals today, and neither ever did for Basecamp.
- By staying in the cloud, they pay "an at times almost absurd premium" for the possibility that these conditions might apply.
- His analogy: paying a quarter of your house's value for earthquake insurance when you don't live near a fault line.

## The cost argument: HEY's database and search bill

- HEY pays over half a million dollars per year to Amazon for database (RDS) and search (ES) services.
- He grants that processing email for many tens of thousands of customers means a lot of data to analyze and store, but still finds the bill absurd.
- His framing question: how many "insanely beefy servers" could you buy on a budget of half a million dollars per year?

## Rebutting "but you have to manage the machines"

- The standard argument: the cloud is simpler, and savings show up in labor costs.
- DHH's answer: "Anyone who thinks running a major service like HEY or Basecamp in the cloud is 'simple' has clearly never tried."
- Some things get simpler, others more complex. On the whole, he has yet to hear of organizations at their scale materially shrinking their operations team just because they moved to the cloud.
- He calls the "you don't run your own powerplant either" and "are infrastructure services really your core competency?" analogies a marketing coup, coated in "NEW-NEW-NEW paint" so that only luddites would consider running their own servers.

## Cloud provider margins

- Amazon is "printing profits" renting servers at "obscene margins".
- AWS profit margin is almost 30%: $18.5B in profits on $62.2B in revenue, despite heavy investment in future capacity and new services.
- He expects the margin to rise further because Amazon said it plans to extend the useful life of its servers from four years to five, and networking equipment from five years to six.
- He is fine with renting being expensive. His objection is that it is never presented as renting.

## Decentralization and the duty to swim against the stream

- Beyond cost, he calls it "downright tragic" that this "decentralized wonder of the world" now largely runs on computers owned by a handful of mega corporations.
- If a primary AWS region goes down, "seemingly half the internet is offline along with it. This is not what DARPA designed!"
- He considers it a duty for 37signals to "do our part to swim against the stream."

## Why owning hardware fits 37signals, and the call to others

- 37signals has a business model "incredibly compatible with owning hardware and writing it off over many years".
- Its growth trajectories are mostly predictable.
- It has expert staff who might as well operate their own machines as Amazon's or Google's.
- He thinks plenty of other companies are in similar boats.
- Running your own servers is not too complicated: "Up until very recently, everyone ran their own servers, and much of the progress in tooling that enabled the cloud is available for your own machines as well."
- "Everyone and their dog did it to get the internet off the ground, and it's only gotten easier since."
- He urges people not to be dazzled by entrenched cloud interests into believing self-hosting is too complicated: "It's time to part the clouds and let the internet shine through."
