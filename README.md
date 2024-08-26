# AirBnB room scrapper

Node express Backend API to retrieve property information

- [Feature](#feature)
- [Development Environment Setup](#setup)

## Feature

A node and express.js backend API (no front-end).

Application exposes 1 endpoint:

1. Room Details `/rooms/:id`
   1. A `GET` endpoint that takes a room ID and returns the property details as JSON.
      1. id - room id
      1. name - name of the property
      1. type - type of the property
      1. bedrooms - number of bedrooms
      1. bathrooms - number of bathrooms
      1. amenities - array of amenities
    1. Validation - checks passed id is a integer
1. TODO: testing - add coverage to all possible scenarios 

## Setup

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/): Ensure that Node.js, preferably version 16 or higher, is installed on your system, as this project utilizes the latest versions of TypeScript and Nodemon.
- [npm](https://www.npmjs.com/): npm is the package manager for Node.js and comes with the Node.js installation.

### Installation

Clone the repository to your local machine:

Navigate to the directory:

```
cd airbnb-room-scrapper
```

Install the dependencies:

```
npm i
```

### Usage

In development the following command will start the server and use `nodemon` to auto-reload the server based on file changes

```
npm run dev
```

The server will start at `http://localhost:3000` by default. You can change the port in `config/index.ts`

There are limited tests in the project at the moment, but a command is available to run:

```
npm run test
```

There are also commands to build and start a server without nodemon:

```
npm run build
npm start
```
