import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";


const client = new MongoClient(process.env.MONGO_URL);

let isConnected = false;

async function getDb() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client.db("Jobseekingplatform");
}

const db = await getDb();

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
  user: {
    additionalFields: {
      role: {
        defaultValue: "Job seeker",
      },
      Plans : {
         defaultValue  :  'seeker_free'
      }
    },
  },
});