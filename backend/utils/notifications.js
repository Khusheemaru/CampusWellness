const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Configure your email service
});

const sendNotification = async (user, type, data) => {
  const templates = {
    riskAlert: {
      subject: 'Student Wellness Alert',
      text: `Alert: ${data.studentName} has shown signs of elevated stress levels.`
    },
    achievementEarned: {
      subject: 'New Achievement Unlocked!',
      text: `Congratulations! You've earned the "${data.achievementName}" badge.`
    },
    weeklyReport: {
      subject: 'Your Weekly Wellness Report',
      text: `Here's your wellness summary for the week of ${data.weekStart}.`
    }
  };

  const template = templates[type];

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: template.subject,
      text: template.text,
      html: template.html
    });
  } catch (error) {
    console.error('Notification error:', error);
  }
};

module.exports = { sendNotification };