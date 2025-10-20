import express from 'express';

import connectToMongoDB from './db/connectToMongoDB.js';

const app = express();
const PORT = 3000;

await connectToMongoDB();

app.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`);
});