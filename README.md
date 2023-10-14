# Zeller Customers App

This project is a simple React application showcasing the list of Zeller customers based on user type selection (Admin/Manager). It's built using Typescript, integrated with GraphQL APIs, and styled using Material UI and styled-components.

## Features

- Fetch and display Zeller customers from a GraphQL API.
- Filter customers based on user type: Admin or Manager.
- Responsive UI, closely adhering to the design provided.

## Technologies Used

- React (bootstrapped with Create React App for Typescript).
- Material UI & Styled-Components for styling.
- Redux Toolkit for state management.
- AWS Amplify for handling GraphQL queries.
- React Testing Library & Jest for unit tests and integration tests.
- Cypress for end to end testing

## Getting Started

### 1. Setup the Repo

```js
git clone <your-repo-link>
cd zeller-customers-app
npm install
```

### 2. Run the App

```js
npm start
```

the app should be running at http://localhost:3000.

## Running Tests

To ensure code quality and functionality, a suite of tests has been written using React Testing Library and Jest.

Run the tests with:

```js
npm test
```

Run tests coverage:

```js
npm run coverage
```

Run E2E test using Cypress:

```js
npm run cypress
```

## Performance Optimizations

- Efficient GraphQL queries to fetch only the required data. (Query by role)
- Utilized Redux Toolkit's slice methods for better state management and reducing re-renders.
