function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendOTP(otp: string, mode: string, contact: string) {
    // Send OTP to user's email or phone number
    // Example: sendSMS(user.phoneNumber, `Your OTP is: ${user.otp}`);
    // Example: sendEmail(user.email, `Your OTP is: ${user.otp}`);
}

export { generateOTP, sendOTP };