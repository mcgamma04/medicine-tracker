import nodemailer, { SendMailOptions } from "nodemailer";

import handlebars from "handlebars";
import path from "path";
import fs from "fs";


// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "engineermikeadebayo@gmail.com",
    pass: "wyhilqhmfejuipts", 
  },
});

// Function to send an email
export const sendEmail = async (
  to: string,
  subject: string,
  html: {},
  template: string
): Promise<void> => {
  const source = fs.readFileSync(path.join(__dirname, template), "utf8");
  const compiledTemplate = handlebars.compile(source);

  try {
    const mailOptions: SendMailOptions = {
      from: "Medical Verification <engineermikeadebayo@gmail.com>",
      to,
      subject,
      html: compiledTemplate(html),
    };

    // Set Content-Type header for HTML content
    (mailOptions as any).contentType = "text/html; charset=utf-8";

    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
