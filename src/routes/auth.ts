import { Router, Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import Joi from "joi";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ message: "Invalid Email or Password" });
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password" });
        
        const token = user.generateAuthToken();

        res.status(200).send({ data: token, message: "logged in successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" });
    }
});

const validate = (data: any) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

export default router;
