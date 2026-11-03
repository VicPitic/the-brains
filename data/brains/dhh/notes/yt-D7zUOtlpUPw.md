## Globals are a sharp knife worth using in the right place

- DHH argues that globals are considered harmful is overstated, and that they have a great place in many applications, especially web apps.
- Web apps operate inside a request cycle. Certain things are set up at the start of the request, and the code wants easy access to them throughout that request. Globals are "a wonderfully good fit" for this.
- He accepts that globals can be overused and turn into a mess. A thing that can turn into a mess is still worth using when it is the right fit.
- This ties to a Rails philosophy of providing "sharp knives". A framework or language is not sinning by giving you tools that could cut your hand off if misused, because they also give the precision to make something happen in an easy, readable way.
- He tells developers to use globals "with pride" for precision incisions, and not to be ashamed of them, while staying mindful of the drawbacks.

## Current: the Rails 5.1 feature that extracts Basecamp's request globals

- `Current` (`ActiveSupport::CurrentAttributes`) was extracted into Rails 5.1 after being used in Basecamp 3 since its inception.
- It is a very short class. It does two things: declares a handful of attributes available globally, and provides delegation plus a hook for resetting them when the request ends.
- Basecamp's `Current` holds two kinds of things:
  - `current account`: derived from the URL, since Basecamp 3 puts the account ID in the path. A piece of middleware does the lookup and sets it.
  - `current person`: set at login, whether through a form, OAuth, a cookie or other authentication methods. Plus the request details (request ID, user agent, IP address), set in a callback.
- Setting the person can also set other things. If the account has not been set (e.g. in jobs that are simply passed a person), setting the person sets the account through it. The same applies to the time zone, which is recorded on the person.

## How Basecamp populates Current through concerns

- Basecamp's `ApplicationController` has many concerns mixed in and almost no code of its own. Each cross-cutting consideration of the base controller is encapsulated in a concern.
- `SetCurrentRequestDetails` is a simple concern that adds a `before_action`. It sets request ID, user agent and IP address from the request into `Current`. Every controller inheriting from `ApplicationController` gets this.
- The request ID is used to tie things together through logging. User agent and IP address are used for various forms of tracking.
- The `Authentication` concern follows the same pattern. Its main path is cookie authentication, for a logged-in person returning with cookies intact. Other paths are OAuth and API authentication.
- The cookie flow: a signed identity cookie holds an identity ID that cannot be tampered with on the user side. The code uses it to look up the verified user, records how the person authenticated (cookie, OAuth, etc., used for logging), then sets `Current.person`.
- Basecamp has a shared identity system across its products. DHH names Basecamp, Backpack and HEY-era siblings in his list: Basecamp, Backpack and Highrise.
- The payoff is that once `Current.person` is set, it is accessible anywhere in the application, to any class, at any time within the request.

## Example: event tracking as a side effect that needs the current person

- Basecamp tracks events: changes in the system are recorded in a separate tracking class instead of being deduced from the objects themselves. He defers the full explanation to a later episode.
- Event tracking is a side effect and auxiliary complexity, something not to focus on all the time. It is implemented like the mentions feature from episode two: a concern, using callbacks, declaring an association.
- That concern is mixed into `Recording`, Basecamp's master metadata class over concrete types such as messages, to-dos and documents. He calls the idea of a concrete metadata class encapsulating shared behavior probably the most powerful pattern in Basecamp, deserving its own episode.
- Every time a recording is created, an `after_create` callback calls `track_event` with a `created` status. The creator of the event is taken straight from `Current.person`.
- The callback takes no arguments. Nothing about the creator has to be passed in, which is "incredibly convenient". Having to pass the creator in whenever a recording is created would be "a real annoyance".

## Example: tying request details to every event for support investigations

- Each event also records its request details: request ID, user agent and IP address, pulled from `Current` when the event is built or saved.
- This gives Basecamp a way to investigate after the fact: who changed something, under what circumstances, from what IP.
- An admin interface lets support look up who created something from an IP address, which helps work out what went wrong when a customer writes in for help.
- DHH stresses how deep in the call chain this sits. Passing request ID, user agent and IP from the controller action through recording creation down to event creation would be a hassle.
- His argument is that explicit passing would not make the code clearer, just more convoluted. It would put an auxiliary concern, being able to look up an event by request ID, centre stage in code like creating a message, where readers do not want to be bothered by it.

## When globals become a smell, and how to judge it

- DHH acknowledges the temptation to stuff things into a global because it is easier, and says that can be a code smell: a sign the code is not factored correctly and globals are used as a crutch.
- In Basecamp's case, he says the team examined the alternatives and deliberately chose globals, concluding that passing the data around is not an advantage.
- Guideline: the `Current` class should stay small. If it ends up with "10, 15, 20 different things", he suggests you may be "off into the weeds" and should step back and see whether the code can be factored to rely on globals less.
- Good candidates are request-scoped, auxiliary details (current user, account, request metadata, time zone) that many layers need but that are not the point of the code reading them.
