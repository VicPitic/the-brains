## Onboarding flow lifted revenue 52% despite a big drop-off

Simon A/B tested forcing new users through an onboarding flow vs. giving direct access, on FeedHive (social media management, 7-day free trial). The same test ran multiple times over two years, with consistent results. It was also replicated on LinkDrip.

- **Group A (direct access):** 100% of users get into the tool. 11% upgrade after the trial, so 11 paying users per 100 signups. ARPU is $22/month, adding $242 MRR per 100 new users.
- **Group B (forced onboarding):** onboarding asks questions, requires adding social accounts, and requires entering a credit card and picking a plan before the user sees the tool. Only 22% finish it, so 78% of new users are lost. Of those who finish, 59% upgrade, so 13 paying users per 100 signups. ARPU is $36/month, adding $468 MRR per 100 new users.
- **Result:** paying user counts are roughly a tie (11 vs 13), but revenue per cohort rose 52%.
- His theory is the effort justification effect: people value a product more when they invest time and effort up front. He also sees the onboarding as a filter that removes unserious users who were never going to pay.
- Takeaway: judge onboarding tests on revenue per signup cohort, not on completion or signup counts.

## Social proof in the hero section: 9% to 16% click-through

Simon tested whether adding comments and ratings to the website hero section was too much clutter.

- **Group A:** clean hero focused on features and value.
- **Group B:** hero plus comments and ratings.
- **Metric:** share of visitors clicking any "Get Started" button near the hero.
- **Result:** 9% in A vs 16% in B.
- FeedHive's site gets almost 200,000 visits a month, so the 7-point lift matters in absolute terms.
- He also keeps a dedicated social proof section on the site and recommends one for any SaaS. He uses a tool called Senja to collect and embed testimonials from many sources.

## Default pricing toggle: monthly beat yearly

The team argued over whether the landing page pricing toggle should default to yearly (which shows the discounted price). Simon wanted yearly; the UX designer wanted monthly. They settled it with a test.

- **Group A:** monthly shown by default.
- **Group B:** yearly shown by default.
- **Metric:** clicks on any of the four sign-up buttons in the pricing section.
- **Result:** 13% of visitors clicked sign up in A vs 4% in B. Group B visitors also flipped the toggle back to monthly nine times more often.
- Monthly is now the default on the FeedHive and LinkDrip landing pages.
- Context: most "Get Started" clicks do not come from the pricing page, so overall impact is likely small. Simon notes everyone he asked was confident they knew the winner, and opinion split roughly 50/50, which is why he tests it.

## G2 badges as a scroll-stopper

Simon tested G2 award badges below the hero. Because it was hard to measure signup impact directly, they measured attention instead.

- **Group A:** no badges below the hero.
- **Group B:** five of the most recent G2 awards below the hero.
- **Measurement:** JavaScript detects how many visitors stop scrolling at that spot, plus click-through on the badges.
- **Result:** visitors in B stopped scrolling 5x more often, and the badges had roughly a 6% click-through rate.
- The team upgraded to a paid G2 plan (which he calls "a bit pricey") because the badges build trust and clearly grab attention. He admits scroll-stopping says nothing conclusive about who signs up.

## How Simon runs A/B tests and what to expect

- Definition: assign visitors or users to group A or B, show different versions, measure how many take a desired action (for example creating an account), and compare.
- His setup uses JavaScript to run the experiment and Amplitude to track results. Many no-code tools can do this too.
- His startup always has tests running on the website, in ad campaigns, and inside the app.
- Most tests, "hundreds" of them, show insignificant results. Every so often one makes a real difference, and that makes the rest worth it.
- Results are counterintuitive often enough that he advises against copying them blindly: "go ahead and verify that our results are also the case for you." Many factors can't be accounted for, so run your own test before implementing.
