## Callbacks keep auxiliary complexity off the main path

- DHH loves callbacks because they move incidental complexity "off to the side". Most code can pretend it lives on a simple default path, and you dig into the specifics only when you want to.
- He defends side effects against the functional-programming bad rep: "I think side-effects are wonderful for a whole host of uses." They adorn or progressively enhance a main flow that stays free of that complexity.
- Example: Basecamp 3 mentions. The messages controller `create` action records a new message (subject and content) and says nothing about mentions or eavesdropping. That keeps the controller readable.
- He calls mentions an auxiliary concern. It "does not deserve center stage" but must be there and be easy to dig into.
- He invents domain words freely (mention, mentioner, mentionee, eavesdropper). He says inventing concepts is a joy of programming, as long as they are packaged up consistently and coherently.

## Tracing one feature through the callback chain

- The flow for a mention in Basecamp 3:
  1. The messages controller records a new message through the recording bucket setup.
  2. A `Mentions` concern mixed into `Recording` runs after save and decides whether to eavesdrop.
  3. If so, it enqueues an `EavesdroppingJob`.
  4. The job is a thin shell around an `Eavesdropper` class, which scans content and creates `Mention` records.
  5. `Mention` has a callback that delivers after commit.
  6. Delivery is a notification (browser or native push via an ActionNotifier framework he plans to extract) plus a mailer email.
- Recording is the broad abstraction over all content types: messages, chat lines, to-do items. A concern on it applies mentions to all of them.
- He admits there is "a fair amount of indirection". But reading the controller stays clear, because you are mostly not concerned with the auxiliary mentions work.
- The `Mention` model skips delivery when the mentioner and the mentionee are the same person.
- Eavesdropper splits the work into small methods: create mentions, find the mentionees, extract mentionees from a recording. Plain text is scanned with a regex. Rich text has the mention already encapsulated as HTML produced by JavaScript.
- He finds the eavesdropping metaphor "perfectly delicious": a system sitting on the side, listening for new recordings and acting on mentions in them.

## Capturing dirty-state before the transaction closes

- Dirty-tracking methods such as `changed_from_drafted?` (generated from the status enum) only work inside the original transaction. Once it closes, the change set is cleared.
- Eavesdropping must act on a saved object, so it runs in `after_commit`, when the change set is gone.
- His trick: an `after_save` callback checks the change set and stores the result in an instance variable (`@eavesdropping`, set via a method like `remember_to_eavesdrop`). The after-commit hook then reads that variable.
- He says he has tried several times to extract this into Rails without finding a good way.
- The conditions for eavesdropping: the recordable changed and is active or archived, or a draft became active.
- Drafts stay secret, so mentions in a draft must not notify anyone until it is published.
- Scanning only when content changed was an optimization found after launch. The launch version scanned every time. A comment touching the parent message recording triggers a save, and re-scanning then is wasted work done "all the time".

## Move non-blocking work into jobs

- Scanning content and creating mentions does not need to happen in the request that saves the message. He pushes it onto a queue in a job, so the user is not held up.
- Recording the message is only a few database writes. Scanning every time would block the response.
- Mentions suits this well: a notification delivered a second and a half later makes no difference to the user.
- The concern itself does little. It checks whether to do the work, sets up the `mentions` association, and enqueues the job. The job delegates to the dedicated `Eavesdropper` class.
- Because the job runs outside the original request, the current person has to be passed along explicitly.

## Always give callbacks an opt-out: suppression

- Callbacks belong on the default path, the thing that should happen most of the time. But there are cases where they must not run.
- He suspects people got bitten by callbacks in the past because they never considered how to opt out.
- Basecamp's concept is `suppressible`: a mixin that holds a flag for whether something is suppressed. Code can wrap a block in a suppression, and anything inside it that would trigger the callback is skipped.
- Example: `ProjectCopier` copies content from an earlier version of Basecamp into the current one, creating many recordings that may contain mentions. Copying should not notify anyone or create mentions, so the copier wraps its work in a block that suppresses the eavesdropper.

## Why not a service object or transaction script

- He considers putting the scanning, eavesdropping and delivery logic in the controller, a service object or a transaction script. He does not think any of those makes it clearer.
- Because mentions is auxiliary, it belongs on the side, and a concern lets you treat it as one cohesive unit.
- Recording gets some new private methods, but that does not matter when reading the flow. He says this is a much easier way to read through things, and that the recording class is not burdened with the logic and setup.

## Globals and current, flagged for a later episode

- A current person or current account is something you need over and over. Passing it all over the place "isn't actually that helpful".
- Globals "should not just litter all over your application", but he thinks they are misunderstood and overly feared in web programming, like callbacks.
- He plans separate episodes on `Current` and on the recording bucket pattern, which he calls the predominant and most powerful pattern in Basecamp 3.
