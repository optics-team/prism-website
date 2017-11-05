---
title: "What is Prism?"
description: Prism is a NodeJS library for building database-driven HTTP APIs quickly and easily.
date: 2017-08-27
weight: 10
toc: true
menu:
  docs:
    parent: "about"
aliases: ["docs"]
---

Prism is designed to assist in the very specific task of building HTTP APIs that are bound to database backend. In addition to this, Prism uses [Hypermedia][] principles to augment emitted data with rich attributes such as [embedded data][], [links][] and [mutation controls][].

Prism ships with a data source that exposes PostgreSQL tables as Resources. However, the data access layer is flexible enough to permit alternative data sources such as MySQL and MongoDB as addons in the future.

Prism takes security very seriously, and security is turned on by default. It must be explicitly configured or de-activated (a 'fail-secure' methodology.) The built-in security strategy uses the [JSON Web Token][] standard to perform authentication against a Resource backend.

## Why use Prism?

If you find yourself writing the same old code over and over again, just to perform basic CRUD against database tables, you'll love Prism.

If you're planning to (or struggling to) wow your audience with Hypermedia features, then we're certain that Prism is the ideal fit.

Prism is part of the Optics suite of tools, meaning that you can create an API, client interfaces and much more, and only need to define the 'shape' of your data once - in the database schema itself. No more writing multiple schemas in multiple languages!

## The Prism Architecture

Prism has three key architectural components. For a detailed description of these components and how they interact with one another please consult their relevant documentation sections. In summary:

**[Resources][]** can be considered a configuration object for binding to some kind of data source, such as a table in a relational database.

For example, a Resource instance named `Users` may describe the schema and relationships of a PostgreSQL table named `users`.

**[Actions][]** are similar to *routes* in traditional Web frameworks. They are responsible for binding a particular HTTP endpoint to a Resource.

For example, an instance of the `ReadItem` action bound to the `Users` resource would allow access to individual records in the `users` table by making a `GET` request to `/users/{id}`.

**[Documents][]** are storage objects that contain response data, and allow it to be augmented or mutated before *rendering* to an HTTP response.

For example, the `ReadItem` action creates a Document that contains all of the properties in the record that was retrieved. It can also add a `self` link, and embed data from associated records in other tables.

[Hypermedia]: /hypermedia
[embedded data]: /hypermedia/embedded-data
[links]: /hypermedia/links
[mutation controls]: /hypermedia/forms
[JSON Web Token]: https://jwt.io
[Resources]: /architecture/resources
[Actions]: /architecture/actions
[Documents]: /architecture/documents
