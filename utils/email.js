const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // O el servicio que uses
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function enviarNotificacionEmail(destinatario, asunto, mensaje) {
  await transporter.sendMail({
    from: `"Planificador" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: asunto,
    text: mensaje,
  });
}

module.exports = enviarNotificacionEmail;