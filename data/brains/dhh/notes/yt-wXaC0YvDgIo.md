## Code comments as a smell, and how to remove one properly

- DHH treats code comments as "a bit of a smell". If you need prose to explain something, it usually isn't apparent from the code itself. In Ruby you should be able to encapsulate the explanation in the code.
- He admits a "mixed relationship": a comment is sometimes great for explaining something non-obvious, but more often it signals unclear code.
- Context: he was reading through the whole Basecamp 3 codebase on a branch called "thh refactoring 2018", revisiting earlier decisions he now thinks he can make better.
- The first model he opened was `Access`, the join between a person and a "bucket" (Basecamp's abstraction covering teams, projects and circles). It is the object checked to decide whether someone can view content.
- The only method in that class with comments was the one that removes inaccessible records. The comment explained a 30 second grace period before the irreversible, slow cleanup job runs, giving an accidental removal a chance to be undone.
- His diagnosis: the comment wasn't explaining the conditional, it was explaining a "somewhat magical integer", the `30.seconds`.

## Replacing the comment: explaining variable, then constant, then placement

DHH walks through a sequence of small steps, each an improvement:

1. **Explaining variable.** Extract the number into a named local, e.g. a grace period for removing inaccessible records, and use it where the literal was. The comment can then be deleted.
2. **Constant.** He sees inline variable declarations as "another sort of smell" when the value never changes. A value that is constant on every run should be a constant.
3. **Visibility.** He asks whether the constant is general (public) or a private detail. Here it was private, so it moved under the `private` section.
4. **Proximity.** A constant should sit as close as possible to the method that uses it. He swapped the order of the two methods so the constant sits right beside the one that references it.

## Conflicting aesthetic rules, and why style checkers can't decide

- His normal habit: order private methods like a "table of contents", in the order they are called. Here the callbacks were `after_destroy` (reconnect the user) and `after_destroy_commit` (remove the records).
- Moving the method next to its constant broke that ordering, and a constant floating "in midair" mid-class looked worse to him than a broken ordering.
- His point: two good principles conflicted (methods in call order vs. constants declared first and close to their usage). You have to pick which matters more in this case.
- Here he chose proximity of constant and usage over the table-of-contents ordering, since there were only two methods.
- He says an automatic style checker cannot encapsulate this kind of judgment. The goal is simply to make the code easier and more pleasing to read and to come back to.

## Reading the codebase to find things worth extracting into Rails

- His stated mission at that time: read the entire Basecamp 3 codebase looking for pieces that suit extraction into Ruby and Rails.
- He treats Basecamp as the source of framework features, in line with extracting rather than designing frameworks up front.
- The example was `grant` on `administratorships`, the join model between an account and a person that records who may administer the account (grant access, add or remove people, and so on).
- He prefers modeling this as a domain object rather than an admin boolean: "I really like encapsulating these domain objects and being able to reason about them and giving them a place to live and giving them a whole concept rather than just giving them boolean."
- It is exposed through a small DSL via methods added to the association, e.g. `account.administratorships.grant(person)` and a matching revoke.

## Using exceptions for control flow vs. a better Rails primitive

- A person only needs one administratorship. There is a unique index on the account/person pair in the migration, and the code also has to handle the case where someone tries to grant one that already exists.
- The existing `grant` rescued the uniqueness exception and returned the existing record. It was long and needed a code comment, which he flags as the same smell as before: "the fact that we need to explain what's going on means that it's not quite obvious what's going on."
- Rails' built-in `find_or_create_by` is the usual approach, but he argues it invites stale reads on a busy app. It starts a transaction, does a `where` lookup, then creates, and these are separate steps.
- On an app with Basecamp's usage, a stale read "certainly can happen".
- The better approach: try the insert first and rely on the database's unique index to raise if the row exists, then return the existing record.
- Rails lacked this, so he wants `create_or_find_by(person: person)`: the same idea as `find_or_create_by`, flipped, with the insert-and-rescue pattern encapsulated.
- With it, `grant` shrinks to an alias of `create_or_find_by`, which also makes the DSL nicer.

## Pushing the pattern upstream into Rails

- He frames this as a small extension to put into Rails so the pattern is available to everyone going forward.
- He floats a bigger idea: perhaps this pattern "should be the default", and Rails should consider deprecating the `find_or_create_by` signature in favor of it.
- A small extra cleanup he made at the same time: the method should accept records directly rather than IDs, since it didn't need to deal with just IDs.
