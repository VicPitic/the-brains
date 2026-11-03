## Replace type checks in generic classes with message passing

- DHH frames a hard part of writing software well as keeping a design clean and intact as it changes. Little software stays as written. It is changed a lot, over a long time, by people who may not have seen the original implementation or have forgotten how it was done.
- His goal: learn to extend and rewrite code, "make things a little better along the way and at the very least not make them worse," without ripping up the whole codebase each time.
- His worked example is a Basecamp pull request. Recurring questions ("what did you work on today?") sent a reminder even if the person had already answered, which made the system look dumb. The fix was to skip the reminder when the question was already answered.
- The first version added a check to the generic `ReminderDelivery` class. It overrode the superclass's should we deliver predicate and added a type check: is the recording a question, and if so, has it been answered? It also added a lookup method on the entry.
- DHH flagged the tension: `ReminderDelivery` is a generic concept, used for questions and also for approvals, and it now knew about one specific data type.
- He says a type check like this is a smell and can be replaced with message passing and polymorphism, "one of those standard refactorings in object-oriented systems that you see over and over again."

## Move the specifics down as far as they will go

- DHH's rule for the refactor: take the generic notion ("is this reminder still pertinent?") and push it down the hierarchy "as far down as we can get to the most concrete level possible."
- In the pull request, the deliverability checks stay on the reminder: is the schedule eligible, is the recording trashed, has the recipient been deleted from the system (no emails or notifications to deleted people).
- The new "is this reminder pertinent" question is not answered by the reminder. The reminder passes itself to the recordable (here the question), and the question decides whether an answer already exists.
- The delivery class's type check becomes plain indirection. The specific lookup now lives in the question and its answer/entry classes, not in the generic delivery code.
- The same pattern covers future cases. If another data type needs reminders and needs to say a reminder is no longer pertinent, that logic lives in that class.

## Why a generic class should stay on its own change schedule

- DHH admits the original version is arguably clearer when you read the diff: everything is in one place at the point of delivery, while the refactor spreads the responsibility across several objects.
- He still prefers the refactor because `ReminderDelivery` should be on its own change schedule. It should not change whenever the strategy for deciding "has this question been answered?" changes.
- His examples of how that strategy might change: answered today, answered yesterday, or some other scope for the lookup. "Why should [the generic class] be changing on that schedule?"
- The aim is to keep generic parts of the system stable as it evolves.
- Long-term payoff: avoid mega classes that are large not because they do a lot, but because they accumulate type tags and special cases for different objects. "Push all the stuff down to the objects and let it live there and you'll have a cleaner system."

## Name methods in domain vocabulary

- DHH first named the predicate `pertinent?`. His colleague Tom proposed `needed?`, which DHH took as simpler and closer to casual speech.
- "Does this thing need a reminder" is something people would say in conversation, so the method name should be as close as possible to the domain vocabulary, not just an adequate word.
- This is one of the benefits he describes of reviewing someone else's code. An editor or reviewer sees things from a little distance, and some things look obvious from there. He worked on the pull request with Tom, and says he could just as well have written the original himself.

## Prefer `blank?` over a leading `!` when the negation gets far from the condition

- DHH's last review note was about the `needed?` implementation. A reminder is needed if there is not already an answer, written as a `!` negation in front of a long expression.
- The line is mostly a chain through the module hierarchy (question to answer to entry), then the lookup method, then the answer recording. The actual subject is far from the `!` at the start, so the reader has to remember we're negating this whole thing.
- His suggestion: use Ruby's `blank?` instead. It is longer and for sure slower but reads in natural order.
- This is a small example of the care he wants when changing a system: think about the impact left behind, and about what is generic versus what is specific.
