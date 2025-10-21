# EmailJS Setup Instructions

## Hướng dẫn cài đặt EmailJS cho Contact Form

### Bước 1: Tạo tài khoản EmailJS

1. Truy cập [EmailJS.com](https://www.emailjs.com/)
2. Đăng ký tài khoản miễn phí (Free plan: 200 emails/tháng)
3. Xác nhận email của bạn

### Bước 2: Tạo Email Service

1. Sau khi đăng nhập, vào **Email Services**
2. Click **Add New Service**
3. Chọn email provider (Gmail được khuyên dùng)
4. Kết nối tài khoản email của bạn
5. Copy **Service ID** (ví dụ: `service_abc1234`)

### Bước 3: Tạo Email Template

1. Vào **Email Templates**
2. Click **Create New Template**
3. Thiết lập template với các biến sau:

```
Subject: New Contact Form Submission from {{from_name}}

Message:
---
Name: {{from_name}}
Company: {{company_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}
---

This email was sent from your Nexon website contact form.
```

4. Copy **Template ID** (ví dụ: `template_xyz5678`)

### Bước 4: Lấy Public Key

1. Vào **Account** > **General**
2. Copy **Public Key** (ví dụ: `Abcd1234efgh5678`)

### Bước 5: Cập nhật credentials trong code

Mở file `js/emailjs-handler.js` và thay thế các giá trị sau:

```javascript
// Dòng 2: Thay YOUR_PUBLIC_KEY
emailjs.init({
    publicKey: 'YOUR_PUBLIC_KEY',  // <- Thay bằng Public Key của bạn
});

// Dòng 16-18: Thay Service ID và Template ID
return emailjs.send(
    'YOUR_SERVICE_ID',      // <- Thay bằng Service ID của bạn
    'YOUR_TEMPLATE_ID',     // <- Thay bằng Template ID của bạn
    templateParams
);
```

### Ví dụ sau khi thay thế:

```javascript
emailjs.init({
    publicKey: 'Abcd1234efgh5678',
});

return emailjs.send(
    'service_abc1234',
    'template_xyz5678',
    templateParams
);
```

### Bước 6: Test Contact Form

1. Mở trang Contact (`contact.html` hoặc `lien-he.html`)
2. Điền thông tin và gửi form
3. Kiểm tra email nhận được
4. Kiểm tra Console (F12) nếu có lỗi

### Troubleshooting

**Lỗi: "Public Key is required"**
- Kiểm tra lại Public Key đã được nhập đúng chưa

**Lỗi: "Service ID not found"**
- Kiểm tra Service ID trong EmailJS dashboard
- Đảm bảo Service đã được kích hoạt

**Lỗi: "Template ID not found"**
- Kiểm tra Template ID
- Đảm bảo template đã được lưu và publish

**Email không nhận được:**
- Kiểm tra spam folder
- Kiểm tra quota của EmailJS (Free: 200 emails/tháng)
- Kiểm tra email settings trong EmailJS dashboard

### Files đã được cập nhật:

✅ `contact.html` - Added EmailJS SDK and handler
✅ `lien-he.html` - Added EmailJS SDK and handler  
✅ `js/emailjs-handler.js` - EmailJS integration logic
✅ `js/submit-form.js` - Updated to work with EmailJS

### Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Dashboard: https://dashboard.emailjs.com/
