# Models and rules for clean and intelligible code

The aim of this article is to provide a **modelisation for a developper's work** on code, and to use this model to abstract some of the complexity of our work.

The following abstractions allow us to take intellectual shortcuts, to keep a clean and intelligible codebase with less effort.

## Commit size : the smallest stable iteration possible

This is the keystone that allows us to better model and understand what steps we are taking.

The size of a commit should always be **the smallest stable iteration possible**.

In a trunk based workflow, it has to be **the smallest stable deliverable iteration possible**.

- **Smallest** : Too many iterations packed in one commit is really painful to read and understand, for yourself and your co-workers.  
  _Tip : Check if the size is small enough via the commit message. Can you make its header a oneliner? Can you split any "and" word or bullet points you may have used when describing what the commit contains?_

- **Stable** : If your commit passes all tests, you're in a safe spot to move forward. If it doesn't pass all tests, you should go back to this commit and rework it until it is stable.  
  _Note : This is very important, an unstable commit may trick you or your co-worker in thinking the code does something when it doesn't._

- **Deliverable (optional)** : You should be able to ship to production any commits.  
  _Tip : Setup a feature toggle mechanism before you start working on a big iteration with many steps._

If you don't match these rules, try to rewrite your code history until it does (`git rebase -i`...).

## 6 Commit Category

When applying the above _"commit size"_ rule, we observe that each iteration we code can fit into a _category_.

These are 6 main commit categories :

- Format
- Add Test
- Modify Behaviour
- Add Behaviour
- Refactor
- Remove

The point of this modelisation is to be able to apply simple code quality checks before we actually bother reading the code.

**Note :** When writing your commit message header, try to make the _commit category_ obvious.

### Format

These commits simply format the code.

**Diff content rule : They should never contain any actual code modification.**

They should be separated from any other category of commits, and performed _before_ doing modifications.

Mixing them with modifications pollutes diffs and make them hard to read and understand.

### Add Test

**Diff content rule : They should only contain addition of test code, no code addition is allowed.**

Just like the "Format" commit, you want this kind of commit to appear _before_ other commits. Deploy your safety net before jumping.

### Modify Behaviour

Bug fixes, feature changes...

**Diff content rule : They should add modification on both the code side and test side.**

It should be obvious when reading the test diffs that the old behaviour is in the removed `-` lines, and the new behaviour appear in the added `+` lines.

If a "Modify" commit doesn't modify tests, then the previous behaviour wasn't tested.  
In this case, you want to first add an "Add Test" commit before this one, and then this one will modify the test you just added.

### Add Behaviour

**Diff content rule : They contain code addition on the code side and the test side. Unlike "Modify Behaviour", they should not modify any existing tests.**

Pretty straightforward, newly added code should be tested. If it modifies an existing test, then the addition broke something.

### Refactor

**Diff content rule : They should contain modifications on the code side but no modification to the test side.**

You are refactoring code, it should behave the same way.

This one is a bit tricky to keep clean in edge cases, you might have to rewrite tests before performing this step.

When you do large code migrations, you'll probably affect unit tested code, because the architecture of the inner code changes.  
In these situation, you'll probably want to migrate your unit tests to an upper level (like integration tests), perform the refactor, then bring them back to the appropriate level.

Let's say you do a full HTTP API rewrite, you'll want to migrate those inner functionnal unit tests to the HTTP level, do the rewrite, and then bring them back to unit test level. That way you ensure nothing broke without thinking too hard about it.

Most of the time, a "Refactor" can be split into adding a new version, plugging the old consumer to the new version, and deleting the old one. This kind of split can be of great help to keep things simple.

**Overkill mention:** Let's say you rename a function or a file, it will add diffs to the test side, but as long as they don't change the assertions it remains quite understandable...  
You could split the rename into addition and deletion but that's overkill most of the time.

### Remove

When you delete dead code, remove a feature...

**Diff content rule : You should only see removed "-" lines or inline deletions.**

This often happens _after_ "Refactor" or "Modify" commits, when a replaced API is no longer used and you're now free to cleanup everything below it once you've you migrated all of its clients.

Explaining in the commit body why this code was deleted is always welcome: when read in isolation it is not likely obvious.

## Commits in a branch shouldn't negate each other

If like in most workflow you're delivering a branch, you should rewrite any commits that negate each others.  
Commits that negate each other suggest you didn't take an optimal path, and can lead to confusion.

Example : "Rename A to B" and "Rename B to C" should be merged into "Rename A to C".

## Conclusion : Less hacking

When reasoning about how to perform a task, add a feature, fix a bug, refactor complexity... Instead of jumping into the code and hacking our way to the solution, we can better picture the macro steps we need to take to get there, and forge each commit until they draw the most straightforward and intelligible path to our solution, before exposing them.

As a code reviewer, with a quick glance at the diff we can tell if it matches any of these pattern. If they don't, something is either wrong, or you'll have a hard time telling wether the code is wrong or not.

## Next step : Build a linter ?

Most of these quality checks can probably be automated, via some kind of git linter that warns you when you did something messy, to minimise the burden on the code reviewer.  
Just like a linter would speak for the reviewer and tell you "Hey, this variable is no longer used, you should remove it!", you could have a git linter that warns you about stuff like "Hey, I see you added code but no tests were added, why??!?!??!!".
