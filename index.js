// index.js
const express = require('express');
const session = require('express-session');
const { CaptchaGenerator } = require('captcha-generator');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Route to generate CAPTCHA
app.get('/captcha', (req, res) => {
    const captcha = new CaptchaGenerator();
    captcha.setOptions({
        // Set options for CAPTCHA
        size: 6,
        fontSize: 50,
        noise: 2,
        color: true,
        background: '#ffffff',
        // ... more options if needed
    });

    const { captchaImage, text } = captcha.generate();
    req.session.captchaText = text; // Store CAPTCHA text in session
    res.type('png'); // Set response type to png
    res.send(captchaImage); // Send the generated CAPTCHA image
});

// Route to display the form
app.get('/', (req, res) => {
    res.send(`
        <form method="POST" action="/verify">
            <label for="captcha">Enter CAPTCHA:</label>
            <img src="/captcha" alt="CAPTCHA" />
            <input type="text" name="captcha" required />
            <button type="submit">Submit</button>
        </form>
    `);
});

// Route to verify CAPTCHA
app.post('/verify', (req, res) => {
    const userInput = req.body.captcha;
    const storedCaptcha = req.session.captchaText;

    if (userInput === storedCaptcha) {
        res.send('CAPTCHA verification successful!');
    } else {
        res.send('CAPTCHA verification failed. Please try again.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
