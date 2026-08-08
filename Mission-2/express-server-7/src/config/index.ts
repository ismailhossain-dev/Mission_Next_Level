//v-10 etar mardome amra env sathe server e connect kortechi
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env') // path.json er bodole path.join ebong '.env' string kora holo
});

const config = {
    connnection_string: process.env.CONNECTIIONSTRING as string,
    port: process.env.PORT
}

export default config