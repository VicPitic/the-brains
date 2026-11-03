## DHH names for intention, not implementation

- DHH argues that many programmers prefer short variable and method names, and rarely recognize it as trading clarity for brevity.
- He says writing terse code can still be a joy while spelling things out in abundant detail. Modern languages are expressive enough that what you save in boilerplate can be spent on clarity.
- He cringes at abbreviations like `ext` for extension and `cp` for copy. Worse are application-specific abbreviations "sure to be forgotten two months after you left the project".
- On very long names: being exceedingly clear can seem silly at first, even when the name is longer than the operation it labels. The silliness fades the first time you return to the code and know exactly what it does.
- In the comments, he answers a worry that a name is almost as long as its code: "The method name explains the intention, the code the implementation." He says he has often had names longer than the implementation, especially when explaining variables.
- His example: `someone_else_just_finished_writing?` is "completely divorced from whether we implement this using events and how long 'just' is." The name states the domain intent, so the implementation can change without renaming.

## Examples from the new Basecamp codebase

DHH offers three long method names from the new Basecamp code as models:

- `make_person_an_outside_subscriber_if_all_accesses_revoked`: a one-line body, `person.update_attribute(:outside_subscriber, true) if person.reload.accesses.blank?`.
- `shift_records_upward_starting_at(position)`: runs `positioned_records.update_all "position = position - 1", ["position >= ?", position]`.
- `someone_else_just_finished_writing?(document)`: checks the document's current version event, returning true when it was not by the current creator and `event.updated_at > 1.minute.ago`.

Each name tells the reader what the code is for, and the body tells how it is done.

## Comments as a code smell

- DHH says that if you work hard at being clear in naming, you will rarely need comments.
- His rule: "Comments are generally only needed when you failed to be clear enough in naming. Treat them as a code smell."
- The practical effect is to move explanation into names instead of prose that sits beside the code.

## Line length and the 80-character convention

- He calls the "Church of 80-character Lines" ridiculous and says it pushes programmers toward terse names.
- His point is that line-length limits cause the brevity-for-clarity trade, so he would drop the limit before shortening a name.
- Laborious boilerplate is what a good language removes; the lines it frees are meant to buy clarity.

## Books and prior art he endorses

- He calls Kent Beck's *Smalltalk Best Practice Patterns* "the bible on this", and says he has never read a book with so much good advice about programming in such a small volume. It is "golden".

## Tooling: no heavy autocomplete needed

- Asked whether long names depend on IDE autocompletion, DHH says most methods are not called often enough to warrant automation.
- He uses plain escape-key completion in TextMate and says that has been fine.
- Long names are not a typing burden in his workflow, so the clarity gain costs almost nothing.
