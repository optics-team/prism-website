---
title: "Prism Features"
description: Prism contains all of the features out-of-the-box to build awesome APIs.
date: 2017-08-27
weight: 20
toc: true
menu:
  docs:
    parent: "about"
---

## General

- Built for perfomance. Our Integration Test suite includes [benchmarks][] to ensure minimal latency and server load.
- Tweak or completely replace Prism's behaviour with Aspect-Oriented Programming (AOP) by using the [Filter system][]
- We love [TypeScript][] and hope that you do too, but even if you don't, that's [still cool][plain-js]

## Hypermedia

- Include related resources within responses by using [embedded data][]
- Denote links to related resources using [links][]
- Inform clients about how they may mutate data and required schemas by using [forms][]

## Database

- Prism ships with everything you need to work with [PostgreSQL][]
- ORM Free - Prism eschews traditional ideas about ORMs and instead uses a simple [Query builder][]
- Read or write mutiple records in a [single query][].

## Actions

- **[ReadCollection][]** to access a collection of records, eg `GET /users`
- **[ReadItem][]** to access a specific record, eg `GET /users/1234`
- **[CreateItem][]** to create a new record, eg `POST /users`
- **[UpdateItem][]** to update an existing record, eg `PATCH /users/1234`
- **[DeleteItem][]** to delete a record, eg `DELETE /users/1234`

## Security

- Built-in [JSON Web Token][] authorization mechanism
- Automatically [hashes][] and [redacts][] user passwords
- Extension points to build your own [Access Control][] rules.

## Community

- The core of Prism is intentionally narrow, with additional functionality available in [addons][]
- Designed to integrate with other tools in the Optics family, such as [Collimator][] and [Lens][]

Prism is an ongoing, community-driven project. Please refer to our [roadmap][] for upcoming improvements.

[benchmarks]: /contributing/benchmarks
[Filter system]: /filters
[TypeScript]: https://www.typescriptlang.org/
[plain-js]: /quickstart/javascript

[embedded data]: /hypermedia/embedded-data
[links]: /hypermedia/links
[forms]: /hypermedia/forms

[PostgreSQL]: /database
[Query builder]: /database/query-builder
[single query]: /database/query-builder#embedded-data

[ReadCollection]: /actions/read-collection
[ReadItem]: /actions/read-item
[CreateItem]: /actions/create-item
[UpdateItem]: /actions/update-item
[DeleteItem]: /actions/delete-item

[hashes]: /security/resource-backend#hash
[redacts]: /security/resource-backend#redact
[Access Control]: /security/access-control

[Collimator]: /optics/collimator
[Lens]: /optics/lens

[roadmap]: https://github.com/optics-team/prism/milestones
