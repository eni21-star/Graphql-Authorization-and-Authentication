
export const typeDefs = `#graphql

type User{
   email: String!,
   username: String!,
   password: String!
}
type Authpayload{
    token: String!
    user: User!
}
type Message{
    message: String!
}
type Query{
    login(email: String!,  password: String!): Authpayload
    protected: Message
}

type Mutation{
    register(email: String!, username: String!, password: String!): User
}

`