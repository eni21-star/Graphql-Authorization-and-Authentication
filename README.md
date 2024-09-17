# GraphQL Apollo Server
This project is a GraphQL API built with Apollo Server. It uses MongoDB for data storage and JWT for authentication. The API includes user registration, login, and a protected query that requires authentication.

## Features
- **GraphQL API** with `Apollo Server`.
- **JWT Authentication** for secure access.
- **User management** with MongoDB.
- **Protected routes**: Access to certain queries and mutations is restricted to authenticated users.
- **Author Studio**: Where Authors Have the ability to create and delete books.

## Tech Stack
- **Typeorms**: To model mongo schema and Mutations.
- **Apollo Server**: For building the GraphQL API.
- **GraphQL**: To handle API queries and mutations.
- **JWT**: For authentication and token management.
- **MongoDB**: As the database for storing user data.
- **Mongoose**: For MongoDB schema and model management.
- **Node.js**: Backend runtime environment.

## How It Works

1. **Authentication Flow**:
    - Users register with their `email`, `username`, and `password`.
    - On successful login, users receive a JWT token, which they can use to access protected routes.
    - JWT is verified in the `context` function to ensure only authenticated users can access certain queries or mutations.

2. **GraphQL Schema**:
    - `User`: Contains `email`, `username`, and `password`.
    - `AuthPayload`: Contains a JWT `token` and the authenticated `user`.
    - `Message`: For protected query responses.
    - `Query`:
      - `login(email, password)`: Authenticates a user and returns a token.
      - `protected`: A protected query that returns a message if the user is authenticated.
    - `Mutation`:
      - `register(email, username, password)`: Registers a new user.

## Example Queries and Mutations

- **Register a User**:
    ```graphql
    mutation {
      register(email: "user@example.com", username: "user1", password: "password123") {
        email
        username
      }
    }
    ```

- **Login**:
    ```graphql
    query {
      login(email: "user@example.com", password: "password123") {
        token
        user {
          email
          username
        }
      }
    }
    ```

## Setting Up

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo-url.git
    cd your-repo
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file with the following variables:
    ```bash
    ACCESS_SECRET_KEY=your_jwt_secret_key
    MONGODB_URI=mongodb://localhost:27017/games
    ```

4. Start the server:
    ```bash
    npm start
    ```

5. The server will be running at `http://localhost:4000/graphql`.

## Dependencies

- **Apollo Server**
- **Typeorm**
- **GraphQL**
- **JWT**
- **Mongoose**
- **MongoDB**
- **dotenv**

## License
This project is licensed under the MIT License.
