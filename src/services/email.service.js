import nodemailer from "nodemailer";
import { MAIL_USER, MAIL_PASS } from "../config/config.js"

export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
});

export const sendPaymentConfirmationEmail = async (user, order) => {
  const info = await transporter.sendMail({
    from: '"Payments" <no-reply@shop.com>',
    to: user.email,
    subject: "Pago confirmado",
    text: `
      Hola ${user.name},

      Tu pago fue confirmado correctamente.

      Orden: ${order._id}
      Total: ${order.total}

      Gracias por tu compra.
  `
  });

  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
};
