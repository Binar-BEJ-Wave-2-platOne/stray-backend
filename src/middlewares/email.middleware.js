const nodemailer = require('nodemailer')
const user = process.env.EMAIL_USER
const password = process.env.EMAIL_PASSWORD

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kaizensystemhk@gmail.com',
        pass: 'otzrxypmzhiylgfm',
    },
})

const sendConfirmEmail = (name, email, confirmationCode) => {
    transport
        .sendMail({
            from: 'info.straycommerce@stary.com',
            to: email,
            subject: 'Please confirm your account',
            html: `<h1>Account Activation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for registration in ecommerce stray . Please confirm your email by clicking on the following link</p>
            <a href=http://localhost:3000/api/v1/auth/confirm/${confirmationCode}> Click here</a>
            </div>`,
        })
        .catch((err) => console.log(err))
}

module.exports = sendConfirmEmail
