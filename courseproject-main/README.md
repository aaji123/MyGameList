# courseproject



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

* [Create](https://docs.gitlab.com/user/project/repository/web_editor/#create-a-file) or [upload](https://docs.gitlab.com/user/project/repository/web_editor/#upload-a-file) files
* [Add files using the command line](https://docs.gitlab.com/topics/git/add_files/#add-files-to-a-git-repository) or push an existing Git repository with the following command:

# MyGameList

MyGameList is a web app for keeping track of video games. Add games with a genre, rating, and review, then update their play status or remove them from your list.

The project has a React frontend and an Express API backed by MongoDB.

## Requirements

- Node.js
- MongoDB connection string

## Run locally

Install and start the backend:

```bash
cd MyGameListBackend
npm install
```

Create a `MyGameListBackend/.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3001
```

Then start the API:

```bash
npm run dev
```

In a second terminal, install and start the frontend:

```bash
cd MyGameList
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.
## Description
