import mongoose, { Schema, Document } from "mongoose";
import jwt from "jsonwebtoken";
import Joi, { boolean } from "joi";
import passwordComplexity from "joi-password-complexity";

interface UserDocument extends Document {
    firstName: string;
    lastName: string;
    password: string;
    mode: string;
    contact: string;
    otp?: string;
    otpExpiration?: Date;
    registered: boolean;
    generateAuthToken: () => string;
}

const userSchema: Schema<UserDocument> = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    mode: { type: String, required: true },
    contact: { type: String, required: true },
    otp: { type: String, required: false },
    otpExpiration: { type: Date, required: false },
    registered: { type: Boolean, required: true },
});

userSchema.methods.generateAuthToken = function (this: UserDocument): string {
    const token = jwt.sign(
        { _id: this._id }, 
        process.env.JWTPRIVATEKEY || "", 
        {expiresIn: "7d"}
    );
    return token;
};

const User = mongoose.model<UserDocument>("User", userSchema);

const validate = (data: any) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        password: passwordComplexity().required().label("Password"),
        mode: Joi.string().required().label("Contact Mode"),
        contact: Joi.string().required().label("Contact Info"),
    });
    return schema.validate(data);
};

export { User, UserDocument, validate };
