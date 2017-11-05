---
title: "Getting Started"
description: "Create a fully-featured API powered by Prism in 10 minutes."
date: 2017-11-05
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

Now, let's create a PostgreSQL user and database, and then populate it with a single table.

For these steps, we're going to use the command-line `psql` tool, but you could easily carry out these commands in your preferred graphical administration tool.

{{< codefile "my-first-prism/schema.sql" >}}

```bash
psql schema.sql
```

The keen amongst you will notice that we have created a table called `tasks` with the following schema:

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| id     | integer |  |  | PRIMARY KEY |
| title  | string (255) | No |
| description | string (255) | Yes |
| complete | boolean | No | `false` |

We will extend this schema in further parts of the guide, but this will do as a starting point.

## Step 4: Your first Prism Application

In the root of the project directory, let's create a new JavaScript file named `index.js`:

{{< codefile "my-first-prism/index.js" >}}

Now, let's start up our Prism application:

```bash
node index.js
```

You should observe console output similar to the following:

```
Debug: prism 
    Action "CreateItem" routed to "POST:/tasks"
Debug: prism 
    Action "ReadItem" routed to "GET:/tasks/{id}"
Debug: prism 
    Action "ReadCollection" routed to "GET:/tasks"
Debug: prism 
    Action "UpdateItem" routed to "PATCH:/tasks/{id}"
Debug: prism 
    Action "DeleteItem" routed to "DELETE:/tasks/{id}"
Debug: prism 
    Action "Root" routed to "GET:/"
```

## Step 5: Let's Explore!

Let's explore the API that we've created. Feel free to use `curl`, [Postman](https://www.getpostman.com/) or any other tool that allows you to craft HTTP responses and view the output.

```json
GET /

{
  "_forms": {
    "tasks": [
      {
        "schema": {
          "properties": {
            "complete": {
              "type": "boolean"
            },
            "description": {
              "type": "string"
            },
            "title": {
              "type": "string"
            },
            "id": {
              "readOnly": true,
              "type": "number"
            }
          },
          "required": [
            "title"
          ],
          "type": "object",
          "title": "tasks",
          "$schema": "http://json-schema.org/draft-04/schema#"
        },
        "method": "POST",
        "name": "create",
        "href": "/tasks"
      },
      {
        "schema": {
          "properties": {
            "complete": {
              "type": "boolean"
            },
            "description": {
              "type": "string"
            },
            "title": {
              "type": "string"
            },
            "id": {
              "readOnly": true,
              "type": "number"
            }
          },
          "required": [],
          "type": "object",
          "title": "tasks",
          "$schema": "http://json-schema.org/draft-04/schema#"
        },
        "method": "PATCH",
        "templated": true,
        "name": "update",
        "href": "/tasks/{id}"
      },
      {
        "method": "DELETE",
        "templated": true,
        "name": "delete",
        "href": "/tasks/{id}"
      }
    ]
  },
  "_links": {
    "self": {
      "href": "/"
    },
    "tasks": [
      {
        "templated": true,
        "name": "item",
        "href": "/tasks/{id}"
      },
      {
        "templated": true,
        "name": "collection",
        "href": "/tasks{?where,page,order}"
      }
    ]
  }
}
```

The 'document' emitted in the body of this response immediately reveals other URIs that may be of interest to us:

- `_links.self`: A *link* to the current document. This is typically useful for
  'refreshing' the current document or comparison against another resource.
- `_links.tasks`: Contains links to the different representations of the 'tasks'
  resource - both a single item and a collection of multiple items.
- `_forms.tasks`: Contains *forms* that permit mutative actions on the 'tasks'
  resource such as creating, modifying or deleting.

By accessing this 'root' document, we are able to **discover** deeper resources without needing to know their URIs, methods or semantics ahead-of-time.

This is known as **discoverability**, and is a very desirable facet of a Hypermedia application. For more information about how Prism implements discoverability and other tenets of this paradigm, please refer to the [Hypermedia](/hypermedia) section of this documentation.

## Step 6: Basic Links

Let's examine the `_links.tasks` elements in more detail:

```json
"tasks": [
  {
    "templated": true,
    "name": "item",
    "href": "/tasks/{id}"
  },
  {
    "templated": true,
    "name": "collection",
    "href": "/tasks{?where,page,order}"
  }
]
```

Observe that both elements contain `templated: true` - this is indicates that the `href` property is a [URI Template](https://tools.ietf.org/html/rfc6570). URI Templates express a URI that may support variable expansion. In the case of the `item` element, if we knew a valid value for `id`, it would be expanded to `/tasks/1234`, for example.

Since we do not yet know a valid ID (and in this example we *know* there is no such valid ID, since the table is empty), let's move on to the to `href` property of the `collection` element.

The `{?where,page,order}` variables indicate that these values form optional **query string parameters**. We could omit `where`, `page` and `order` variables, and the URI Template would expand to `/tasks`. Let's GET that URI now:

```json
GET /tasks

{
  "_forms": {
    "tasks": {
      "schema": {
        "properties": {
          "complete": {
            "type": "boolean"
          },
          "description": {
            "type": "string"
          },
          "title": {
            "type": "string"
          },
          "id": {
            "readOnly": true,
            "type": "number"
          }
        },
        "required": [
          "title"
        ],
        "type": "object",
        "title": "tasks",
        "$schema": "http://json-schema.org/draft-04/schema#"
      },
      "method": "POST",
      "name": "create",
      "href": "/tasks"
    }
  },
  "_links": {
    "self": {
      "href": "/tasks"
    }
  },
  "count": 0
}
```

As would be expected, this document does not contain anything of interest because `tasks` table is currently empty. Feel free to revisit this collection once you've reached the end of this tutorial.

## Step 7: Working with Forms

As well as exploring resources in a read-only manner using links, Prism also supports mutative actions using **forms**. First, let's examine a **create** form:

```json
"tasks": {
  "schema": {
    "properties": {
      "complete": {
        "type": "boolean"
      },
      "description": {
        "type": "string"
      },
      "title": {
        "type": "string"
      },
      "id": {
        "readOnly": true,
        "type": "number"
      }
    },
    "required": [
      "title"
    ],
    "type": "object",
    "title": "tasks",
    "$schema": "http://json-schema.org/draft-04/schema#"
  },
  "method": "POST",
  "name": "create",
  "href": "/tasks"
}
```

Forms are specifically designed to be entirely *self-describing*:

- `method` and `href` - Tell us where to submit data to, and what HTTP method to use
- `schema` - A [JSON Schema](http://json-schema.org/) describing required properties and types to use for the request payload

Let's use that information to create a Task now:

```json
POST /tasks
{
  "title": "Complete the Tutorial"
}
```

Observe that the *body* of the response is empty. However, we still know that a new Task resource has been created:

- The **Status Code** is `201 Created`
- The **Location** header is `Location: /tasks/1` (or similar)

In order to 'see' the Task we've just created, 'follow' the Location header:

```json
GET /tasks/1

{
  "_forms": {
    "self": [
      {
        "schema": {
          "default": {
            "complete": false,
            "description": null,
            "title": "Complete the tutorial",
            "id": 1
          },
          "properties": {
            "complete": {
              "type": "boolean"
            },
            "description": {
              "type": "string"
            },
            "title": {
              "type": "string"
            },
            "id": {
              "readOnly": true,
              "type": "number"
            }
          },
          "required": [],
          "type": "object",
          "title": "tasks",
          "$schema": "http://json-schema.org/draft-04/schema#"
        },
        "method": "PATCH",
        "name": "update",
        "href": "/tasks/1"
      },
      {
        "method": "DELETE",
        "name": "delete",
        "href": "/tasks/1"
      }
    ]
  },
  "_links": {
    "self": {
      "href": "/tasks/1"
    }
  },
  "complete": false,
  "description": null,
  "title": "Complete the tutorial",
  "id": 1
}
```

## Step 8: In Conclusion

Let's recap the steps we've taken in this tutorial:

- Initialized a new project containing Prism and dependencies
- Created a simple Database schema
- Created an HTTP server that uses Prism
- Explored some basic Hypermedia principles

Using the knowledge gained here, try the following for yourself:

- Mark the Task that we created as 'complete'
- Examine the `/tasks` collection
- Observe the difference between an 'item' document and a 'collection' document
- Delete a Task permanently

I hope that you've found this tutorial enjoyable and interesting, and that you'll continue to learn more in the subsequent sections of this tutorial.
