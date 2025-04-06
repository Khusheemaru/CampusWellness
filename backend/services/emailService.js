const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendNotification = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    });
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

const sendRiskAlert = async (counselor, student, riskLevel) => {
  const subject = `Risk Alert: ${student.name}`;
  const text = `
    A student under your supervision has been flagged for attention.
    
    Student: ${student.name}
    Risk Level: ${riskLevel}
    Last Check-in: ${new Date(student.lastCheckIn).toLocaleDateString()}
    
    Please review their wellness data and consider reaching out.
  `;

  return sendNotification(counselor.email, subject, text);
};

module.exports = {
  sendNotification,
  sendRiskAlert
};