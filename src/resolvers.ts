import { author_resolver } from "./services/author_books/resolvers"
import { user_resolvers } from "./services/user/resolvers"

export const resolvers = [user_resolvers,author_resolver] as const