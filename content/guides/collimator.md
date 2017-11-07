---
title: "Working with Collimator"
description: "Reduce repetition by combining Prism with Collimator."
date: 2017-11-07
weight: 10
toc: true
menu:
  docs:
    parent: "guides"
---

In the [Getting Started](../getting-started) guide, we created a basic application that reads and writes to a single database table. To allow Prism to operate correctly against this table, it was necessary to explicitly provide configuration such as:

- A list of Primary Keys
- A JSON Schema describing the table's columns
- Relationships to other tables in the database

Although it was reasonable to provide this configuration manually in the first tutorial, 'real world' applications typically feature many tables, and this configuration is laborious, repetitive and error-prone.

Another tool in the Optics family, [Collimator](https://github.com/radify/collimator), was designed to address this. Collimator will inspect the schema of a PostgreSQL database and return it in a format that is directly consumable by Prism.

# Step 1: Set up a Project directory

In this tutorial, we will follow similar steps to the previous article, but replacing the explicit configuration with a call to Collimator. First, let's set up a new project directory:

```bash
mkdir collimator-integration
cd collimator-integration
git init
npm init
```

Then, we'll install some dependencies. As well as `@optics/prism` and its peer depencency `hapi`, we'll also install `collimator`:

```bash
npm install --save @optics/prism hapi@16.x collimator
```

Finally, let's set up our database schema. To make things a little more interesting, we'll also add a `users` table and reference it from `tasks`:

{{< codefile "collimator-integration/schema.sql" >}}

# Step 2: Using Collimator

Next, we'll create our 'main' file, `index.js`. But this time, we'll use Collimator to create a `Resource` object:

{{< codefile "collimator-integration/index.js" >}}

When you run this application, you will observe that CRUD endpoints for each table are now created automatically. Feel free to test out some of these actions.

# Step 3: In Conclusion

Combining Collimator and Prism allows us to very easily and predictably expose database entities such as Tables and Views over an HTTP interface. Because the inspection process happens at runtime, developers can simply modify their database schema, restart the application, and immediately start using the new resources.

This is a huge boon to developer productivity. It is no longer necessary to maintain multiple representations of your data structure at different tiers, or worry about performing actions to map the structure of tier to another.

Finally, the powerful Hypermedia aspects of Prism mean that it is entirely possible for this convention to reach across the boundary between your API and client applications too.
