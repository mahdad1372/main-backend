const nodemailer = require("nodemailer");
const AppError = require("../appError/appError");

let transporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com",
  port: 465,
  secure: true,
  auth: {
    user: "asalar77@yahoo.com",
    pass: "hfzfttacbtjoiquh",
  },
});

async function sendVerifyCode(email, code) {
  try {
    await transporter.sendMail({
      from: "asalar77@yahoo.com",
      to: email,
      subject: "Hello ✔",
      html: `<p>Your Code is ${code}</p>`,
    });
  } catch (e) {
    throw new AppError("Email has not been sent", 500);
  }
}

async function sendResetPassword(email, url) {
  try {
    await transporter.sendMail({
      from: "asalar77@yahoo.com",
      to: email,
      subject: "Hello ✔",
      html: `<p>${url}</p>`,
    });
  } catch (e) {
    throw new AppError("Email has not been sent", 500);
  }
}

module.exports = {
  sendVerifyCode,
  sendResetPassword,
};
