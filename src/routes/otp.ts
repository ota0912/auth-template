import { Router, Request, Response } from "express";
import { User } from "../models/user";
import moment from "moment";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ mode: req.body.mode, contact: req.body.contact });
        if (user) {
            if(user.otp !== req.body.otp)
                res.status(400).send({ message: "Invalid OTP" });
            if(moment().isAfter(user.otpExpiration))
                res.status(400).send({ message: "OTP expired" });
            user.otp = undefined;
            user.otpExpiration = undefined;
            user.registered = true;
            user.save();
            res.status(201).send({ message: "User Registered Successfully" });
        }
        else throw "Invalid User Details";
    } catch (error) {
        // console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

export default router;
