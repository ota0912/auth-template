import { Router, Request, Response } from "express";
import { User, validate } from "../models/user";
import { generateOTP, sendOTP } from "../utils/otpUtils";
import bcrypt from "bcrypt";
import moment from "moment";

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

        const otp = generateOTP();
        const otpExpiration = moment().add(5, 'minutes').toDate();
        
        sendOTP(otp, req.body.mode, req.body.contact);

        const userObj = {
            ...req.body, 
            password: hashPassword, 
            otp: otp, 
            otpExpiration: otpExpiration,
            registered: false
        }

        await new User(userObj).save();
        res.status(201).send({ message: "OTP sent successfully" });
    } catch (error) {
        // console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

export default router;
