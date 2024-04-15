import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.DATABASE_URI!);
    } catch (err) {
        console.log(err);
    }
};

export default connectDB;
