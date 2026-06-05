const nodemailer = require('nodemailer');
const dns = require('dns');

// Pre-validate SMTP details and print startup guidance
const hasSmtpConfig = () => {
    return !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);
};

if (!hasSmtpConfig()) {
    console.warn('\n⚠️  [UrbanEstates Email Service] WARNING: SMTP credentials (EMAIL_USER & EMAIL_PASS) are not defined in backend/.env.');
    console.warn('👉 Developer fallback is active: OTP verification codes will be logged directly to the server terminal console.\n');
}

let transporterInstance = null;

const getTransporter = async () => {
    if (transporterInstance) return transporterInstance;

    return new Promise((resolve, reject) => {
        // Explicitly resolve IPv4 address to completely bypass Render's broken IPv6 routing
        dns.resolve4('smtp.gmail.com', (err, addresses) => {
            if (err || !addresses || addresses.length === 0) {
                console.error('DNS IPv4 lookup failed for smtp.gmail.com, falling back to default lookup', err);
                transporterInstance = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    }
                });
                return resolve(transporterInstance);
            }

            const ipv4Address = addresses[0];
            console.log(`[Email Service] Resolved smtp.gmail.com strictly to IPv4: ${ipv4Address}`);

            transporterInstance = nodemailer.createTransport({
                host: ipv4Address,
                port: 587,
                secure: false, // upgrade later with STARTTLS
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
                tls: {
                    servername: 'smtp.gmail.com' 
                }
            });

            resolve(transporterInstance);
        });
    });
};

if (hasSmtpConfig()) {
    getTransporter().then(t => {
        t.verify((err, success) => {
            if (err) {
                console.error('SMTP VERIFY ERROR:', err);
            } else {
                console.log('SMTP READY');
            }
        });
    });
}

/**
 * Sends a 6-digit OTP email to a user.
 * Falls back to console logging if SMTP settings are missing.
 * 
 * @param {string} email - Destination email
 * @param {string} otp - The raw 6-digit verification code
 * @param {string} name - The user's name
 * @returns {Promise<{success: boolean, message: string}>}
 */
const sendOTPEmail = async (email, otp, name) => {
    if (!hasSmtpConfig()) {
        console.log('\n=============================================================');
        console.log(`🔑 [DEVELOPMENT FALLBACK] OTP Code for ${email} (${name}):`);
        console.log(`👉 VERIFICATION OTP: ${otp} 👈`);
        console.log('=============================================================\n');
        return { success: true, message: 'Developer console fallback used.' };
    }

    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM || `"UrbanEstates" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verify Your Email - UrbanEstates',
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fbfd; border: 1px solid #e1e8ed; border-radius: 12px; color: #1e293b;">
                    <div style="text-align: center; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0;">
                        <h2 style="color: #6366f1; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">Urban<span style="color: #4f46e5;">Estates</span></h2>
                        <p style="margin: 4px 0 0 0; font-size: 14px; color: #64748b;">Secure Real Estate Solutions</p>
                    </div>
                    <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);">
                        <h3 style="margin-top: 0; font-size: 20px; color: #0f172a;">Welcome, ${name}!</h3>
                        <p style="font-size: 15px; line-height: 1.6; color: #475569;">
                            Thank you for registering with UrbanEstates. To complete your registration and activate your account, please verify your email using the 6-digit verification code below.
                        </p>
                        <div style="text-align: center; margin: 32px 0;">
                            <div style="display: inline-block; padding: 16px 36px; background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); border-radius: 12px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);">
                                <span style="font-size: 32px; font-weight: 800; color: #ffffff; letter-spacing: 6px; font-family: monospace;">${otp}</span>
                            </div>
                            <p style="margin: 12px 0 0 0; font-size: 12px; color: #94a3b8;">This code is valid for 10 minutes</p>
                        </div>
                        <p style="font-size: 14px; line-height: 1.5; color: #64748b;">
                            If you did not initiate this request, please ignore this email or contact support if you have concerns.
                        </p>
                    </div>
                    <div style="text-align: center; margin-top: 24px; font-size: 12px; color: #94a3b8;">
                        <p style="margin: 0;">© 2026 UrbanEstates. Hyderabad, India.</p>
                    </div>
                </div>
            `
        };

        const mailTransporter = await getTransporter();
        await mailTransporter.sendMail(mailOptions);
        return { success: true, message: 'Email sent successfully.' };
    } catch (error) {
        console.error('Error sending email via Nodemailer:', error);
        return { success: false, message: error.message };
    }
};

module.exports = { sendOTPEmail };
