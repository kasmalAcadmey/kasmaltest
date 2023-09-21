import { app } from "./app";
import contectedDB from "./utils/db";
require('dotenv').config()

app.listen(process.env.PORT, ()=> {
    console.log('server started')
    contectedDB()
})
