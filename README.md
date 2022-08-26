<p style="text-align: center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Node server app REST API

Example of Tasks API created with [NestJS](https://nestjs.com/). Utilizes:

* typescript
* express
* eslint
* prettier
* jest

Features:

* auth - jwt (passport)
* tasks CRUD
* app config (dev/prod) with schema validation (joi)
* logging
* transform interceptor - hide sensitive data

## Description

Bootstrapped with `nest new node-server-app-nestjs`.

Tasks API:

* get all tasks
* get task
* create task
* update task progress
* delete task
* search for task

Model:

```typescript
interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
}
```

## Added dependencies:

```bash
npm install class-validator class-transformer
```

## Changes to initial version

`.prettierrc` - removed singleQuote

`.eslintrc.js` - added rule for unused underscore param

```
"@typescript-eslint/no-unused-vars": [
  "error",
  {
    argsIgnorePattern: "^_",
    varsIgnorePattern: "^_",
    caughtErrorsIgnorePattern: "^_",
  },
],
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is MIT.
