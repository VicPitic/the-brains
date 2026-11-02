## Flights: a continuous, ceremoniless agile framework

Simon created Flights while working on FeedHive. He describes it as a "new, lightweight, ceremoniless agile framework to deliver features in a lean and continuous way."

- **Lightweight:** very few predefined ground rules, implementable in many ways. Teams don't need to follow the rules fully; they can adopt the core principles on top of existing practices and still benefit.
- **Ceremoniless:** no daily stand-ups, no retrospectives, no sprint planning. He acknowledges teams still need to align, plan and reflect, but says that should be done however best suits the team, outside the framework.
- **Continuous vs. iterative:** Flights favors continuous delivery over the iterations used by Scrum and Kanban. Iterations can help bigger software organizations with large teams. For startups, SaaS development and teams working under "extreme uncertainty," he argues a continuous approach is far more beneficial.

## What a flight is: sprint meets epic

- A flight is a merge of a sprint and an epic: a group of related tasks with its own task board.
- When you book a flight, you add tasks to it. Tasks can be anything that needs doing and aren't restricted to Scrum-style "User Stories."
- Rule of thumb: book a flight with tasks that belong together, depend on each other, or are expected to land at the same time. Unrelated tasks can be added if there's "room for it."
- The board has at least: To Do, In Progress, Done, Canceled.

## ETA instead of fixed length

- A flight has no fixed length (like 2 weeks). It has an ETA, set when the flight is created.
- The aim is to land on time.
- "Tailwind" means the flight arrives early; "turbulence" means it is delayed.

## Roles: pilot, co-pilot, staff

- **Pilot:** any team member. Responsible for landing the flight smoothly in production, on time. Keeps the overview and delegates tasks to staff.
- **Co-pilot:** supports the pilot.
- **Staff:** anyone on the team working on the flight's tasks.

## Ground rules and concurrency

- A flight must have a pilot.
- A developer can be pilot on only one flight at a time, but can be co-pilot or staff on another meanwhile.
- Developers can be staff on multiple flights at once.
- Concurrent flights are naturally capped by the number of developers who can act as pilots. Optionally, a team can set a limit on flights "in the air" at once.
- Multiple flights can fly in parallel and overlap, so teams aren't forced to "finish" one sprint before starting the next.
- Tip: always have a flight booked and prepared for takeoff, so when one lands early and frees up a pilot and staff, work can start immediately.

## Emergency landing

- If a flight becomes extremely delayed or won't reach its destination, keeping it in the air "blocks" a pilot, which he wants to avoid.
- For transparency, close the flight even with unfinished tasks so the pilot and staff become available for other work.
- An "Emergency Landing" is formally closing the flight, moving its tasks back to the backlog, and flagging it "Emergency Landed" somewhere visible to the team.
