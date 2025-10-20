import { Router } from 'express';

const userRouter = Router();

userRouter.get("/", (req, res) => {
    console.log("User Route");
});

export default userRouter;
