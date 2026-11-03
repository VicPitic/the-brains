## Conceptual compression: abstractions that hide fundamentals

- DHH calls this "conceptual compression": advances in (leaky) abstractions have compressed the conceptual overhead of the database so far that beginners no longer need to learn SQL before building database-backed applications.
- It used to be taken as self-evident that you had to speak the database's native language, and care about your particular database engine, before you were qualified to use it. He says that is no longer so, and he calls that "amazing".
- In Rails the abstraction is Active Record, an object-relational mapper (ORM).
- ORMs were long derided as an unreliable, even harmful, aid of "the lazy or the weak", something "Real Programmers" shouldn't lean on because it would break down soon and you'd better know all your relational theory. He says that is "the past".
- The same compression already happened with memory management and garbage collection: pointers, destructors and mallocs were once foundational, and now application programmers rarely think about them.
- He concedes SQL abstraction isn't yet at the level of memory management, and some frameworks and environments are further along than others, but it's getting closer.

## Evidence from Basecamp: no SQL in the application logic

- Basecamp 3 has about 42,000 lines of code and "not a single fully formed SQL statement as part of application logic". It serves millions of people.
- It leans on the ORM abstraction and "hardly even thinks about it the vast majority of the time".
- The first version of Basecamp had a bunch of `find_by_sql` calls; the latest versions have none. He calls that progress.
- DHH used to write SQL statements every day. Now he writes them maybe once a month, or less, against a major application at a scale most beginner apps never reach.

## Unpack concepts when you need them, then compress again

- Knowing SQL is still nice to have, just as a strong mental model of memory management is helpful. The point is that you no longer need it to start making applications.
- SQL is a concept you can "unpack when you need to", further down your career. Once learned, you can compress it back down and spend most of your mental capacity on other things.
- You can't learn everything or hold every concept fully expanded in your head, "and moreover, you shouldn't".
- Compressing formerly fundamental concepts makes room for new, grander abstractions. He describes those as the leaps of progress that make programmers more efficient and effective.

## The database as an appliance and a commodity

- His analogy: the relational database is "a glorious invention", but for most programmers it doesn't need to be more than an appliance. Take the time to learn how a drying tumbler works because it may save a service call one day, but it's not a requirement for getting your clothes dry.
- Appliance status is "not a dig, but an honor": the technology and abstraction are so good that most programmers don't think about it daily.
- It also makes the database a commodity. Basecamp uses MySQL "basically only for historical and operational reasons". He says they could switch to PostgreSQL tomorrow and he "wouldn't really give a damn", because nothing in the application relies on a particular database brand.
- Software is always built on layers of abstraction: CPUs, 1s and 0s, assembler, C compilers, database drivers, memory management and more. As the industry progresses, fewer people need to know all of them, and he says "thank heavens for that".

## Why low barriers and generalists matter

- Improving conceptual compression is hard but "incredibly rewarding" work. The more effectively yesterday's concepts are compressed, the lower the barriers to entry, and "we need low barriers if we are to get more people started making applications."
- He names SQL as perhaps the brightest example of conceptual compression over the past decade or so, but says application work is full of others.
- Compression is needed more than ever "to starve off specialization, and to preserve the power of individual generalists to make complete applications."

## Next target: front-end build pipelines

- He sees an explosion of conceptual expansion and experimentation on the client side of web applications in 2018. It is exciting, with many new ideas churning rapidly, but also "needlessly intimidating in many ways".
- Not everyone should have to spend hours or days learning to configure build pipelines. He expects leaky abstractions to get good enough that this tooling is relegated to appliance status too, and says "That will be a good day."

## Against the fogey instinct

- Some programmers instinctively scoff, saying it's irresponsible to write code before knowing the historical fundamentals. DHH calls this a key pitfall of experience: falling in love with the trials you suffered, rather than rejoicing that the next generation doesn't have to endure them.
- He compares it to an old person complaining about the price of gas or milk because their frame of reference is anchored in the past. Broad-based progress sometimes needs generational churn, which he says is about years of experience rather than physical age.
- His closing instruction: "Don't be a fogey. Don't fight the conceptual compression. Help make it happen."
