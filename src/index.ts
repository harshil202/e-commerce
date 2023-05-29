import express from 'express';
import sequelizeConnection from './db/db';
import { dbInit } from './db/db_init';
import Authroute from './routes/auth.route';

const app = express();
try {
    sequelizeConnection.authenticate();
    console.log("DB connected")
    dbInit(false)
} catch (error) {
    console.log(error)
}

app.use(express.json());
app.use(Authroute);
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})