const mailSender = require("../utils/mailSender");

exports.sendFeedback = async (req, res) => {
    try {
        const { email, issueDescription } = req.body;

        if(!email||!issueDescription){
            console.log("Missing Hia Kuchh..")
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields carefully..."
            });
        }
        
        // Email content for sending feedback to the admin
const adminEmailContent = `
<!DOCTYPE html>
<html>

<head>
  <!-- No external stylesheets, just inline styles -->
</head>

<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <div style="background-color: #007BFF; color: #ffffff; text-align: center; padding: 10px; border-radius: 10px 10px 0 0;">
      <h1>New Query from Contact Us Page</h1>
    </div>
    <div style="background-color: #ffffff; padding: 20px;">
      <p>Student Email: ${email}</p>
      <p>Issue Description:</p>
      <p>${issueDescription}</p>
    </div>
  </div>
</body>

</html>
`;

// Email content for sending confirmation to the student
const studentEmailContent = `
<!DOCTYPE html>
<html>

<head>
  <!-- No external stylesheets, just inline styles -->
</head>

<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <div style="background-color: #007BFF; color: #ffffff; text-align: center; padding: 10px; border-radius: 10px 10px 0 0;">
      <h1>Confirmation: We Received Your Query</h1>
    </div>
    <div style="background-color: #ffffff; padding: 20px;">
      <p>Thank you for contacting us. We have received your query and will get back to you as soon as possible.</p>
    </div>
  </div>
</body>

</html>
`;



        // Send email to admin
        const adminEmail = 'anassaif.507@gmail.com'; // Replace with your admin's email address
        const adminSubject = 'New Query from Contact Us Page';
    
        await mailSender(adminEmail, adminSubject, adminEmailContent);

        // Send confirmation email to the student
        const studentSubject = 'Confirmation: We Received Your Query';
    
        await mailSender(email, studentSubject, studentEmailContent);

        res.status(200).json({
            success: true,
            message: 'Emails sent successfully.',
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: 'Error while submitting your query.',
        });
    }
};
