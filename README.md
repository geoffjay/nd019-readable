# Readable

Readable is a _Reddit_-style posting app that allows you to add/modify/delete posts and associated comments. Posts are
categorized and can be filtered and ordered based on information retrieved from a backend API server.
React and Redux are used to build the application, with book data being retrieved from a Node.js API server using
`express` to handle the REST calls.

## Get Started

To get started clone this repository and follow the server and frontend installation and usage sections.

## API Server

Additional information about the API server and how to use it can be found in its [README](server/README.md) file.

### Installation and Usage

With a terminal opened to the location this repository was cloned in execute these commands to install the project
dependencies, and start the server listening.

```sh
cd readable/server
yarn install
yarn start
```

The server will start listening for REST calls at the address `http://localhost:3001`. A simple test to ensure this is
working uses `cURL`.

```sh
curl -X GET -H 'authorization:anonymous' http://localhost:3001/posts
```

## React/Redux Frontend

Additional information about the frontend and how to use it can be found in its [README](frontend/README.md) file.

### Installation and Usage

In another terminal opened to the location this repository was cloned in execute these commands to install the frontend
project dependencies, and start the server hosting the React pages using `react-scripts`.

```sh
cd readable/frontend
yarn install
yarn start
```
