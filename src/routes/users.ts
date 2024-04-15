import { Router, Request, Response } from "express";
import { User, validate } from "../models/user";
import bcrypt from "bcrypt";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ mode: req.body.mode, contact: req.body.contact });
        if (user)
            return res
                .status(409)
                .send({ message: "User with given contact info already exists!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        // console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

export default router;
