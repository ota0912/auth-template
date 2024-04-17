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
        const user = await User.findOne({ mode: req.body.mode, contact: req.body.contact, registered: true });
        if (!user)
            return res.status(401).send({ message: "Invalid Contact" });
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(401).send({ message: "Invalid Password" });
        
        const token = user.generateAuthToken();

        res.status(200).send({ data: token, message: "logged in successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" });
    }
});

const validate = (data: any) => {
    const schema = Joi.object({
        mode: Joi.string().required().label("Contact Mode"),
        contact: Joi.string().required().label("Contact Info"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

export default router;
