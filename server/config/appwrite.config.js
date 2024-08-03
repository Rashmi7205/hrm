import sdk from 'node-appwrite';
import {config} from 'dotenv';
config();
const client = new sdk.Client()
.setEndpoint(process.env.APPWRITE_URI)
.setProject(process.env.APPWRITE_PROJECT_ID); 

const storage = new sdk.Storage(client);

export default storage;

