import React from 'react';

const VerificationEmail = ({ firstName, verificationLink }) => {
  return (
    <html>
      <head>
        <style>
          {`
            /* General styles */
            body {
              font-family: 'Inter', sans-serif;
              background-color: #121212;
              color: #ffffff;
              margin: 0;
              padding: 0;
            }

            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }

            /* Header styles */
            .header {
              text-align: center;
              background-color: #333;
              padding: 20px;
            }

            .header h1 {
              color: #ffffff;
              font-size: 24px;
            }

            /* Form styles */
            .form {
              padding: 20px;
              background-color: #1f1f1f;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            }

            .form label {
              display: block;
              margin-bottom: 10px;
              font-weight: bold;
            }

            .form button {
              background-color: #f9a825;
              color: #121212;
              border: none;
              padding: 12px 20px;
              border-radius: 4px;
              cursor: pointer;
              font-weight: bold;
            }

            .form button:hover {
              background-color: #ffca28;
            }

            /* Footer styles */
            .footer {
              text-align: center;
              background-color: #333;
              padding: 10px 0;
              margin-top: 20px;
              border-top: 1px solid #444;
            }

            .footer p {
              color: #ffffff;
              font-size: 14px;
            }

            /* Link styles */
            a {
              color: #f9a825;
              text-decoration: none;
            }

            a:hover {
              text-decoration: underline;
            }
          `}
        </style>
      </head>
      <body>
        <div className="container">
          <div className="header">
            <h1>Email Verification</h1>
          </div>
          <div className="form">
            <p>Hello {firstName},</p>
            <p>Click on the following link to verify your email:</p>
            <a href={verificationLink}>Verify Email</a>
          </div>
          <div className="footer">
            <p>&copy; 2023 Study Notion</p>
          </div>
        </div>
      </body>
    </html>
  );
};

export default VerificationEmail;
