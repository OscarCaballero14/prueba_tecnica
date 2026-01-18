import nodemailer from "nodemailer";

async function createTestAccount() {
  const account = await nodemailer.createTestAccount();

  console.log("MAIL_USER:", account.user);
  console.log("MAIL_PASS:", account.pass);
}

createTestAccount();
