import Mailgen from 'mailgen'

class EmailService {
    constructor(env, sender) {
        this.sender = sender
        switch (env) {
            case 'development':
                this.link = 'http://localhost:4000/'
                break
            case 'test':
                this.link = 'http://localhost:4000/'
                break
            case 'production':
                this.link = 'http://localhost:4000/'
                break
            default:
                this.link = 'http://localhost:4000/'
        }
    }

    createEmailTemplate(username, verifyToken) { 
        const mailGenerator = new Mailgen({
            theme: 'default',
            product: {
            // Appears in header & footer of e-mails
                name: 'Phonebook',
                link: this.link,
            // Optional product logo
            // logo: 'https://mailgen.js/img/logo.png'
            }
        });

        const email = {
        body: {
            name: username,
            intro: 'Welcome to Phonebook! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with Phonebook, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: `${this.link}/api/users/verify/${verifyToken}`
                }
        },
        outro: 'Need help, or have questions? Just reply to this email.'
        }
        };

        return mailGenerator.generate(email);
    }
    
    async sendVerifyEmail(email, userName, verifyToken) {
        const emailBody = this.createEmailTemplate(userName, verifyToken);
        const msg = {
            to: email,
            subject: 'Verify email',
            html: emailBody
        }
        try {
            const result = await this.sender.send(msg);
            console.log(result);
            return true
        } catch (error) {
            console.error(error.message)
            return false
        }
    }
}

export default EmailService