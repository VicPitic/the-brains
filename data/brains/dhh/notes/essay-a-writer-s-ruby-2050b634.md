## Linting as personal style, not mandate

- DHH is skeptical of programmers' hostility to style. He rejects the idea that aesthetics conflicts with substance and says this shows up most in the debate over linting.
- Linting means applying a consistent style to source code, "like following Strunk & White's grammatical guidelines for prose, but automatically enforced by a linting program."
- Adoption has grown with cloud-based continuous integration, which runs tests, and now linting, on every pull request.
- He dislikes the Go approach, a built-in linter (gofmt) applying one universal style set by the language designers. He calls it "the most totalitarian approach," a decree "barely two feet removed from a compile error," and says he doesn't like it "one bit."
- His position: linters are excellent for authors and teams to enforce their own style on their own codebases, as long as nobody forces their stylistic preferences on him.

## Code as prose: the Newspeak and single-shade argument

- He compares a minimalist, single-style language to Newspeak from Orwell's 1984, not for political reasons but because of its pursuit of no redundant terms, ambiguities or flair.
- Analogy: "Imagine every novel written in the same style, Hemingway indistinguishable from Dickens, Tolkien from Rowling." It would be "awfully gray" to enjoy English with only one shade of prose.
- He answers the objection "code isn't prose, its compile target is the computer" by disagreeing: "The best code to me is indeed its own form of poetry, and style is an integral part of such expression."
- He says this is truest in Ruby, and that he strives to write code "as an author" more often than as an engineer.

## Ruby vs Python: many ways to do it

- Python's motto: "there should be one – and preferably only one – obvious way to do it." He says Ruby is "the exact opposite": there are many ways to do almost everything.
- He cites this as why reading and writing Ruby is a delight for people who write code as authors.
- Closing line: "Ruby is for writers." Ruby's rich, expressive syntax would be "a damn shame" if narrowed to "a single, pre-approved trail."

## Example: `unless` over "if not"

- He finds the "if not" expression clumsy, though it is a mainstay of most programming languages. His example of the conventional form:

```ruby
def ensure_privileged_access
  if !person.admin?
    redirect_to root_url,
  end
end
```

- The Ruby alternative he prefers:

```ruby
def ensure_privileged_access
  redirect_to root_url unless person.admin?
end
```

- He doesn't claim it is poetry, but finds it "far more pleasant to read."
- Scaling metaphor: a single line is a sentence, several make a paragraph (method), then an essay (class), then a whole book (system). "It matters how that's written."
- People who prefer the literal style can encode that preference in a lint rule, and he would have no problem with it.

## RuboCop in Rails and the omakase defaults

- The next version of Rails ships with a default linter, RuboCop (he jokes it is "cleverly called" that).
- The purpose is not to let him or anyone mandate a style, but so teams "can find and enforce your own."
- For those without a personal or team style yet, Rails includes the preferences he has developed over two decades, writing hundreds of thousands of lines of Ruby with the team at 37signals, published as rubocop-rails-omakase.
- He calls this the "omakase menu": a starting point for developing one's own sensibilities, "not a permanent edict on what those should be."

## Style is idiosyncratic

- His core claim: "the essence of style, it's invariably idiosyncratic. We wouldn't even be talking about style if it was all the same for everyone all the time."
- Practical stance: tools should help authors and teams express and consistently enforce their own style, with sensible defaults offered but never imposed.
