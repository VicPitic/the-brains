## Claude Code as the GTM engineering stack: replacing N8N and "middle work"

- Cody says all his work now starts in Claude Code. He opens five terminals and runs growth activities in parallel.
- Setup is simple: one environment file holding the API keys for his entire software stack. For whatever he is working on, he has Claude build software to automate it.
- If something can't be automated, he has Claude do the "middle work" instead. He borrows the term from the Linear founder: (1) you have an idea, (2) you do all the work of materializing it, (3) you polish the final output. Claude now does step 2.
- To get started: make a directory, open a terminal and cd into it, run Claude Code, and describe what you want to automate. In his words, "It is seriously this easy."
- He replaced all the AI automations he ran in N8N with code. He deployed a server to Railway and did not build it himself; Claude built it using the Railway API. Now he goes straight to code with "no N8N middleware."

## Building 100 landing pages in 30 minutes for Google Ads

- His Google Ads strategy: find the converting keywords, then build a dedicated landing page for each one. This raises the campaign's conversion rate.
- The manual process was to extract converting keywords and build each page by hand, with the target keyword as the H1 and repeated in the first paragraph of the hero section.
- Now he gives Claude the list of target keywords and tells it to make a landing page for each. The pages are built "literally seconds later."
- Under the hood, the pages are hosted in the Strapi CMS, and Claude Code generates them by hitting the Strapi API.

## "All design is just code": generating 40 Facebook ads in minutes

- Cody had an epiphany at 4am that all design is just code. Figma's foundation is code, so Facebook ads can be made with code too.
- He gave Claude a design example and had it build a Facebook ad template out of React components. The template is exported as an image using HTML to canvas.
- He then had Claude Code iterate over the template to produce 40 variations.
- His testing strategy: make many variations that each focus on a different positioning or messaging concept, then move the winners into their own campaigns.
- At the time of writing he was building a connection to the Facebook Marketing API with Claude Code, so the 40 ads could be bulk uploaded to an ad set.

## LinkedIn engager extraction to cold email pipeline

- The idea: viral LinkedIn posts are often engaged with by his exact target customer, so he mines those engagers.
- He had Claude wire up a Slack function where he drops in a LinkedIn post URL. The flow:
  1. The URL goes to Phantom Buster, which pulls the profile URLs of everyone who engaged.
  2. Apollo.io enriches those profiles with emails and first names.
  3. Million Verifier validates the emails.
  4. Valid contacts are added to an Instantly AI campaign that cold emails them.
- He says this whole pipeline was built in about 15 minutes.

## Business idea: portfolio of "Best Exercises for X" digital downloads

- Cody sees a big opportunity in building a portfolio of "best exercises for X outcome" products, each one a digital download.
- The real value comes from scale: build tens of thousands of them, then bundle the aggregate and sell the IP, which he thinks would be a very good business.
- Distribution would be only Amazon and Amazon ads.
