# EdTech Platform 

The backend for an EdTech platform built using Node.js, Express.js, React.js.

## Table of Contents

- [Description](#description)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Description

This backend server serves as the core component of this EdTech platform. It handles user authentication, course management, payments, and user profiles. The server is built using Node.js and Express.js and uses various middleware for functionality such as file uploads and authentication.

## Getting Started

### Prerequisites

- Node.js installed
- npm (Node Package Manager) installed
- MongoDB or another database system set up
- Cloudinary account for image storage (if applicable)

### Installation

1. **Clone the repository:**
git clone https://github.com/Anas1005/study_notion.git
2. **Navigate to the project directory:**
3. **Install dependencies:**
4. **Set up environment variables:**
Create a `.env` file in the project root and add the necessary variables. Example:

1. PORT=4000
2. DATABASE_URL="mongodb://127.0.0.1:27017/StudyNotion"
3. JWT_SECRET="YourSecretKeyHere"
4. MAIL_HOST=smtp.gmail.com
5. MAIL_USER=your-email@gmail.com
6. MAIL_PASS=your-email-password
7. CLOUD_NAME=your-cloudinary-cloud-name
8. API_KEY=your-cloudinary-api-key
9. API_SECRET=your-cloudinary-api-secret
10. FOLDER_NAME="StudyNotion"
11. RAZORPAY_KEY=your-razorpay-key
12. RAZORPAY_SECRET=your-razorpay-secret



5. **Start the server:**


## Usage

To start the server, use the following command:

npm run dev


By default, the server will run on port 4000. You can change the port by modifying the `.env` file.

## API Routes

- Authentication: `/api/v1/auth`
- Courses: `/api/v1/course`
- Payments: `/api/v1/payment`
- User Profiles: `/api/v1/profile`

For detailed information about available API routes and endpoints, refer to the individual router files (`userRouter.js`, `courseRouter.js`, `paymentRouter.js`, `profileRouter.js`) in the `routers` directory.

## Contributing

Contributions to this project are welcome. To contribute:

1. **Fork the repository.**

2. **Create a new branch** for your feature or bug fix.

3. **Make your changes and commit them.**

4. **Push your changes to your fork.**

5. **Create a pull request** to the main repository.

Please follow the project's code of conduct and contribution guidelines.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For inquiries or support, please contact [Anas Saif] at [anassaif.507@gmail.com].




