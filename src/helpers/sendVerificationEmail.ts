import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
): Promise<ApiResponse>{
    try {

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification Code',
            react: VerificationEmail({username, otp: verifyCode}),
          });

        return {
            success: true,
            message: "Verification email sent successfully",
        };
    } catch (emailError) {
        console.log("Error sending email", emailError);
        return {
            success: false,
            message: "failed to send verification email",
        };
    }
}