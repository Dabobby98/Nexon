# EmailJS Newsletter Setup Guide

## Step 1: Create Newsletter Email Template

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Navigate to **Email Templates**
3. Click **Create New Template**
4. Use this template content:

### Template Name
```
Newsletter Subscription
```

### Subject
```
New Newsletter Subscription
```

### Email Body
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
        .content { background: #f4f4f4; padding: 20px; }
        .email-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #667eea; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🎉 New Newsletter Subscription</h2>
        </div>
        <div class="content">
            <p>You have a new newsletter subscriber!</p>
            
            <div class="email-box">
                <strong>Email Address:</strong><br>
                {{user_email}}
            </div>
            
            <p style="margin-top: 20px; color: #666; font-size: 14px;">
                This email was sent automatically from your Nexon website newsletter form.
            </p>
        </div>
    </div>
</body>
</html>
```

### Template Settings
- **From Name**: Nexon Newsletter
- **From Email**: Your EmailJS email (default)
- **To Email**: {{to_email}}
- **Reply To**: {{user_email}}

### Template Variables
Make sure these variables are available:
- `{{user_email}}` - The subscriber's email address
- `{{to_email}}` - Your email (lehuuphuc.ht2016@gmail.com)

## Step 2: Get Template ID

1. After saving the template, you'll see the **Template ID** (e.g., `template_abc123`)
2. Copy this Template ID

## Step 3: Update Code

Open `js/emailjs-handler.js` and update line 5:

```javascript
const EMAILJS_CONFIG = {
    publicKey: '8QADVxs4bOphm3ups',
    serviceId: 'service_4ad7x7n',
    templates: {
        contact: 'template_t9w28wg',
        newsletter: 'YOUR_NEWSLETTER_TEMPLATE_ID'  // ← Replace this
    }
};
```

Replace `'YOUR_NEWSLETTER_TEMPLATE_ID'` with your actual Newsletter Template ID.

## Step 4: Test Newsletter Form

1. Go to your website homepage
2. Scroll to the newsletter section
3. Enter an email address
4. Click "Subscribe"
5. Check your email inbox (lehuuphuc.ht2016@gmail.com)

## Current Configuration

✅ **EmailJS Credentials:**
- Public Key: `8QADVxs4bOphm3ups`
- Service ID: `service_4ad7x7n`
- Contact Template ID: `template_t9w28wg`
- Newsletter Template ID: **NEEDS TO BE CREATED**

✅ **Email Recipient:**
- All newsletter subscriptions → `lehuuphuc.ht2016@gmail.com`

## Notes

- Newsletter forms are available on:
  - Homepage (index.html & trang-chu.html)
  - All 6 service pages (EN & VI versions)
  - Other pages (testimonial.html, single_services.html)

- The newsletter handler automatically detects language (EN/VI) for error messages
- Email validation is built-in
- Success/error messages auto-hide after 5 seconds
