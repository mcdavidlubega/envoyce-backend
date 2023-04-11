# Envoyce Backend

This is the backend for the Envoyce Project. The project is an api built with Nodejs, Express and Prisma. This is meant to work with the front end Project found [here](https://github.com/mcdavidlubega/jotr-frontend)

## Features

**The project is still in early development. However the following features are planned.**

- User Registration & Profiles
- Users can create Ivoices
- Users can comment on Invoices


## Quick Setup

**Download or clone the repo and run npm install to install dependencies**

```bash
  npm i

```

**Create a create development environment variable file for your development setup in the config folder**

```bash
  cd config
  touch dev.env

```

**Create a separate one for your tests.**

```bash
  touch test.env

```

Add the following environment variabls to your environment files.

`PORT` should be a number e.g 30000

`TOKEN_SECRET` should be a string (used by JWT)

`MONGO_DB` connection to your mongodb

### Note:

When you set up the test environment file, set up a diffrent MONGO_DB variable for a test database.
When you run tests, all data is deleted from the database after the tests complete.

Set the PORT variable in the test environment file to a different port.

## Available Scripts

**Start the server and run the built version of the app.**
(build/index.js)

```bash
  npm start
```

**Start the server with nodemon.**
(src/index.js)

```bash
  npm run dev
```

**Lint the code with ESLint.**
This project used AirBnB Standards with a few tweaks. Check .eslintrc.json to see implemented tweaks or to add your own.

```bash
  npm run lint
```

**Run tests in verbose mode and generate a coverage report**

```bash
  npm test
```

**Run tests in verbose mode without coverage report.**
This for use during development.

```bash
  npm run dev:test
```

**Check whether code meets prettier standards.**
Check .prettierrc to see implemented tweaks or to make your own.

```bash
  npm run prettier:check
```

**Prettify code with prettier.**

```bash
  npm run prettier:write
```

**Build the project using babel.**
The build code is stored in /build.

```bash
  npm build
```

### Note:


## API Reference


## Auth Endpoints
#### Signup 

```http
  POST /api/v1/auth/signup
```

| Parameter   | Type     | Description                                  |
| :---------- | :------- | :------------------------------------------- |
| `email`     | `string` | **Required**. Your email. Should be unique   |
| `username`  | `string` | **Required**. Should be unique               |
| `password`  | `string` | **Required**. Required. 8 characters minimum |

#### Login 

```http
  POST /api/v1/auth/login
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. Your email.   |
| `password` | `string` | **Required**. Your password |


## Users Endpoints 
#### Get All Users 

```http
  GET /api/v1/users
```
#### Get A User 

```http
  GET api/v1/user/{user-id}
```
#### Create A User 

```http
  POST /api/v1/user/
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. Your email.   |
| `username` | `string` | **Required**. Your username |
| `password` | `string` | **Required**. Your password |

#### Update A User 

```http
  PUT /api/v1/user/{user-id}
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Optional**. Your email.   |
| `password` | `string` | **Optional**. Your password.|

#### Delete A User 

```http
  DELETE /api/v1/user/{user-id}
```

## Clients Endpoints

### Get All Clients
```http
  GET /api/v1/cliets
```
### Get A Client
```http
  GET /api/v1/cliet/{user-id}
```
### Create A Client
```http
  POST /api/v1/cliet/
```
| Parameter  | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `email`    | `string` | **Required**. Client email.   |
| `name`     | `string` | **Required**. Client password.|
| `address`  | `string` | **Required**. Client address. |
| `tel`      | `string` | **Optional**. Client tel.     |

### Update A Client
```http
  PUT /api/v1/cliet/{user-id}
```
| Parameter  | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `email`    | `string` | **Optional**. Client email.   |
| `name`     | `string` | **Optional**. Client password.|
| `address`  | `string` | **Optional**. Client address. |
| `tel`      | `string` | **Optional**. Client tel.     |

### Delete A Client
```http
  DELETE /api/v1/cliet/{user-id}
```

## Invoiec Endpoints
### Create An Invoice
```http
  POST /api/v1/invoice
```
| Parameter         | Type     | Description                      |
| :---------------- | :------- | :------------------------------- |
| `clientId`        | `string` | **Required**. Client ID.         |
| `items`           | `array`  | **Required**. Array of items.    |
| `terms`           | `string` | **Optional**. Payment terms.     |
| `paymentDetails`  | `string` | **Optional**. Payment Details.   |
| `dueDate`         | `string` | **Optional**. Invoice due date.  |
| `currency`        | `string` | **Optional**. Invoice currency.  |
| `addons`          | `array`  | **Optional**. Discount / Tax .   |

### Get All Invoices
```http
  GET /api/v1/invoices
```
### Get An Invoice
```http
  GET /api/v1/invoice
```
### Get All Client Invoices 
```http
  GET /api/v1/invoices/{client-item}
```
### Update An Invoice
```http
  PUT /api/v1/invoice
```
| Parameter         | Type     | Description                      |
| :---------------- | :------- | :------------------------------- |
| `clientId`        | `string` | **Optional**. Client ID.         |
| `items`           | `array`  | **Optional**. Array of items.    |
| `terms`           | `string` | **Optional**. Payment terms.     |
| `paymentDetails`  | `string` | **Optional**. Payment Details.   |
| `dueDate`         | `string` | **Optional**. Invoice due date.  |
| `currency`        | `string` | **Optional**. Invoice currency.  |
| `addons`          | `array`  | **Optional**. Discount / Tax .   |

### Todo
#### Users Features
- [x] Users Auth
- [x] Users CRUD
- [x] Remove user password from returns
- [ ] Add user logs to track who made changes
#### Clients Features
- [x] Create Clients CRUD
- [x] Get all invoices for a particular client
- [x] Search clients
#### Invoices Features
- [x] Create Invoices CRUD
- [ ] Users can comment on / anotate invoices
- [ ] Update past due invoices when they go beyond date due
- [X] Add feature to change invoices to quotes
- [ ] Search Invoices
- [x] Remove Invoice Items
- [x] Edit Invoice Items
- [x] Remove Addons
- [x] Edit Addons
#### Other Features
- [ ] Implement soft delete for audit purposes


## Author

McDavid Lubega
[@mcdavidlubega](https://www.github.com/mcdavidlubega)
