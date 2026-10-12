# Point of Sale Frontend: System Documentation

This folder explains how the point-of-sale frontend works. It starts with what the system does for the people who use it, then covers how it is built.

| # | Document | For | What it covers |
|---|---|---|---|
| 1 | [Overview](01-overview.md) | Everyone | What the system is, the two apps, key concepts and glossary, how data flows end to end |
| 2 | [Admin Portal user guide](02-admin-portal-guide.md) | Back-office users, QA, developers | Every admin screen: what it shows, what you can do, which business process it supports |
| 3 | [Till (Customer Portal) user guide](03-till-guide.md) | Cashiers, supervisors, QA, developers | Station setup, login, ringing up a sale, tendering, refunds |
| 4 | [Architecture](04-architecture.md) | Developers | Monorepo layout, bootstrap, routing, state (Signal Stores), HTTP and auth, UI kit, drawers and toasts |
| 5 | [API reference](05-api-reference.md) | Developers, backend team | Every backend endpoint the frontend calls, with the main data models |
| 6 | [Development guide](06-development-guide.md) | Developers | Running, testing, linting, building; recipe for adding a new feature; coding rules |
| 7 | [Known issues and gaps](07-known-issues.md) | Developers, product owner | Bugs, unfinished features and doc drift found while writing these docs |

> Written October 2026 against the `development` branch. The code is the source of truth. If you change behaviour described here, update the matching page.
