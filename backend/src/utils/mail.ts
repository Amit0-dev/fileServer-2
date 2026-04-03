import { Resend } from "resend";
import { env } from "../env";

type Option = {
    userName: string;
    userEmail: string;
    url: string;
};

const resend = new Resend(env.RESEND_API_KEY);

export const sendMail = async (options: Option) => {
    const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: options.userEmail,
        subject: "Verify your email",
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
    
                <h2>Hello ${options.userName} 👋</h2>
                
                <p>
                Thanks for signing up! Please verify your email address by clicking the button below.
                </p>
                
                <a 
                href=${options.url}
                style="
                    display: inline-block;
                    margin-top: 10px;
                    padding: 12px 20px;
                    background-color: #000;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                "
                >
                Verify Email
                </a>
                
                <p style="margin-top: 20px;">
                If you didn’t create an account, you can safely ignore this email.
                </p>

            </div>`,
    });

    if (error) {
        return console.error({ error });
    }

    console.log({ data });
};
