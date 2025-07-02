const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Chatty OTP Verification</title>
	<style>
		body {
			background-color: #ffffff;
			font-family: Arial, sans-serif;
			font-size: 16px;
			line-height: 1.4;
			color: #333333;
			margin: 0;
			padding: 0;
		}
		.container {
			max-width: 600px;
			margin: 0 auto;
			padding: 20px;
			text-align: center;
		}
		.logo {
			max-width: 180px;
			margin-bottom: 20px;
		}
		.message {
			font-size: 20px;
			font-weight: bold;
			margin-bottom: 20px;
			color: #4A4A4A;
		}
		.body {
			font-size: 16px;
			margin-bottom: 20px;
		}
		.highlight {
			font-size: 28px;
			font-weight: bold;
			color: #4CAF50;
			margin: 20px 0;
		}
		.support {
			font-size: 14px;
			color: #999999;
			margin-top: 30px;
		}
		a {
			color: #4CAF50;
			text-decoration: none;
		}
	</style>
</head>

<body>
	<div class="container">
		<a href="https://chatty-app.vercel.app">
			<img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Chatty Logo">
		</a>
		<div class="message">Your Chatty OTP Code</div>
		<div class="body">
			<p>Hey there,</p>
			<p>Thanks for joining <strong>Chatty</strong> — your go-to place for seamless and fun conversations!</p>
			<p>To verify your account, please use the OTP below:</p>
			<div class="highlight">${otp}</div>
			<p>This code will expire in <strong>5 minutes</strong>. If you didn’t request this, feel free to ignore this email.</p>
		</div>
		<div class="support">
			Need help? Contact us at <a href="mailto:support@chattyapp.com">support@chattyapp.com</a>.
		</div>
	</div>
</body>
</html>`;
};

module.exports = otpTemplate;
