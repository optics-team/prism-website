---
title: "Getting Started"
description: "Create a fully-featured API powered by Prism in 10 minutes."
date: 2017-08-28
weight: 10
toc: true
menu:
  docs:
    parent: "guides"
---

{{% note %}}
This tutorial assumes that you're using a Unix-style system such as macOS or Linux. Prism is tested and confirmed compatible with Windows, you'll just need to change the shell commands accordingly.

The commands listed also assume that you have npm, git and a PostgreSQL server installed on your system.
{{% /note %}}

## Step 1: Set up a Project directory

First, create a directory to house this work:

```bash
mkdir my-first-prism
cd my-first-prism
git init
npm init
```

Feel free to configure your npm project options however you see fit.

## Step 2: Installing Prism

Prism is just an npm install away:

```bash
npm install --save @optics/prism
```

You will observe in the npm output that Prism requires a 'peer dependency' of `hapi@16.x`. Let's install that now:

```bash
npm install --save hapi@16.x
```

{{% note %}}
Because Prism is a *plugin* for Hapi, it is registered as a *peer dependency* rather than a regular dependency.
{{% /note %}}

## Step 3: Preparing the Database

Now, let's create a PostgreSQL user and database, and then populate it with a couple of test tables.

For these steps, we're going to use the command-line `psql` tool, but you could easily carry out these commands in your preferred graphical administration tool.

```sql
CREATE DATABASE my_first_prism_db;
CREATE USER my_first_prism_user WITH PASSWORD 'my-super-secret-password';
GRANT ALL PRIVILEGES ON DATABASE my_first_prism_db TO my_first_prism_user;

\c my_first_prism_db;
```
