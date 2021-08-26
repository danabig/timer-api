import { MongoClient } from 'mongodb'
import { config } from '../../helpers/config'

const mongoUri = config.get('mongoUri')
export const mongoClient = new MongoClient(mongoUri)
// async function run() {
//   try {
//     await client.connect();
//     const database = client.db('timers_test');
//     const timers = database.collection('timers');
//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query);
//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// run().catch(console.dir);