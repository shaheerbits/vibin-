// Globals
import express from 'express';

// Util Imports
import connectToMongoDB from './db/connectToMongoDB.js';

// Route Imports
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

// Connecting to MongoDB
await connectToMongoDB();

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`);
});