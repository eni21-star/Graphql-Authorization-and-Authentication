import { DataSource } from "typeorm";
import users from "../models/user";
import { author } from "../models/author";
import books from "../models/books";

export const db_config = new DataSource({
  type: "mongodb",
  host: "localhost",
  port: 27017,
  database: "BubbleplaceBookstore",
  entities: [users, books, author],
  synchronize: true,
  useUnifiedTopology: true,
});


















// const initializeDb = async ( limit: number):Promise<boolean> =>{
//   let attempt: number = 0
//   while ( attempt< limit)
//   {
//     try {
//        await db_config.initialize()
//        console.info('connected to Database')
//        return true

//     } catch (error) {
//         attempt++
//         if(attempt < limit)
//         {
//            console.info('retrying connection to database')
//            await new Promise(res => setTimeout(res, 5000));
//         }
//         else{
//             console.error(`error rconnecting to deatabse after ${limit} successfull attempts`)
//             return false
//         }
        
//     }
//   }
//            return false

// }

