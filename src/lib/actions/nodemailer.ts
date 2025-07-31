'use server';

import { Profile } from '@/types';
import * as nodemailer from 'nodemailer';

const mailTransport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_PORT === '467' ? true : false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASS,
  },
} as nodemailer.TransportOptions);

interface SendEmailProps {
  beforeProfile: Profile;
  afterProfile: Profile;
  subject: string;
}

const getChangedFieldsHtml = (
  beforeProfile: Profile,
  afterProfile: Profile,
) => {
  const allFields = [
    'displayName',
    'username',
    'email',
    'phonenumber',
    'description',
    'degree',
    'field',
    'institute',
    'grade',
  ];

  let changedFieldsHtml = '';
  let hasChanges = false;

  allFields.forEach((field) => {
    const beforeValue = beforeProfile[field as keyof Profile] || 'N/A';
    const afterValue = afterProfile[field as keyof Profile] || 'N/A';

    if (beforeValue !== afterValue) {
      hasChanges = true;
      const readableFieldName = field.toUpperCase();

      changedFieldsHtml += `
        <li>
          <strong>${readableFieldName}:</strong> changed from "${beforeValue}" to "${afterValue}"
        </li>
      `;
    }
  });

  if (!hasChanges) {
    return 'No details were changed in your profile.';
  }

  return `
    <p>The following changes were made to your profile:</p>
    <ul>
      ${changedFieldsHtml}
    </ul>
  `;
};

export const sendEmail = async ({
  beforeProfile,
  afterProfile,
  subject,
}: SendEmailProps) => {
  const mailOptions = {
    from: `"EmberSync"`,
    to: afterProfile.email,
    subject: subject,
    html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <p>Hello ${afterProfile.displayName},</p>
          <p>This is a confirmation that your profile has been successfully updated.</p>
          ${getChangedFieldsHtml(beforeProfile, afterProfile)}
          <p>If you did not make this change, please contact support immediately.</p>
        </div>
      `,
  };

  try {
    const info = await mailTransport.sendMail(mailOptions);
    console.log('Email sent successfully!');
    return { success: true, message: 'Email sent' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email' };
  }
};
