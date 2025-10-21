const EMAILJS_CONFIG = {
    publicKey: '8QADVxs4bOphm3ups',
    serviceId: 'service_4ad7x7n',
    templates: {
        contact: 'template_t9w28wg',
        newsletter: 'template_usb99d8'
    }
};

function initEmailJS() {
    emailjs.init({
        publicKey: EMAILJS_CONFIG.publicKey,
    });
}

function sendContactEmail(formData, language = 'en') {
    const templateParams = {
        from_name: formData.name,
        company_name: formData.companyName,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_email: 'lehuuphuc.ht2016@gmail.com'
    };

    return emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templates.contact,
        templateParams
    );
}

function handleContactFormSubmit(event, language = 'en') {
    event.preventDefault();

    const form = event.target;
    const $successMessage = $('#success-message');
    const $errorMessage = $('#error-message');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.querySelector('.btn-title span').textContent;

    const formData = {
        name: form.querySelector('#name').value,
        companyName: form.querySelector('#company-name').value,
        email: form.querySelector('#email').value,
        phone: form.querySelector('#phone').value,
        message: form.querySelector('#message').value
    };

    function validateEmail(email) {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
    }

    if (!validateEmail(formData.email)) {
        $errorMessage.removeClass('hidden');
        $successMessage.addClass('hidden');
        setTimeout(() => {
            $errorMessage.addClass('hidden');
        }, 3000);
        return;
    }

    submitButton.disabled = true;
    submitButton.querySelector('.btn-title span').textContent = language === 'vi' ? 'Đang gửi...' : 'Sending...';

    sendContactEmail(formData, language)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            $successMessage.removeClass('hidden');
            $errorMessage.addClass('hidden');
            form.reset();

            setTimeout(() => {
                $successMessage.addClass('hidden');
            }, 5000);
        })
        .catch((error) => {
            console.error('FAILED...', error);
            $errorMessage.removeClass('hidden');
            $successMessage.addClass('hidden');

            setTimeout(() => {
                $errorMessage.addClass('hidden');
            }, 5000);
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.querySelector('.btn-title span').textContent = originalButtonText;
        });
}

function initContactFormEmailJS(language = 'en') {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => handleContactFormSubmit(e, language));
    }
}

function sendNewsletterEmail(email) {
    const templateParams = {
        user_email: email,
        to_email: 'lehuuphuc.ht2016@gmail.com'
    };

    return emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templates.newsletter,
        templateParams
    );
}

function handleNewsletterSubmit(event, language = 'en') {
    event.preventDefault();

    const form = event.target;
    const $email = $('#newsletter-email');
    const $successMessage = $('#newsletter-success');
    const $errorMessage = $('#newsletter-error');
    const $errorText = $email.next('.error-text');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.querySelector('.btn-title span').textContent;

    const email = $email.val().trim();

    function validateEmail(email) {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
    }

    $email.removeClass('error-border');
    $errorText.addClass('hidden');

    if (!email) {
        $email.addClass('error-border');
        $errorText.removeClass('hidden').text(language === 'vi' ? 'Vui lòng nhập email' : 'This field is required');
        return;
    }

    if (!validateEmail(email)) {
        $email.addClass('error-border');
        $errorText.removeClass('hidden').text(language === 'vi' ? 'Email không hợp lệ' : 'Invalid email format');
        return;
    }

    submitButton.disabled = true;
    submitButton.querySelector('.btn-title span').textContent = language === 'vi' ? 'Đang gửi...' : 'Subscribing...';

    sendNewsletterEmail(email)
        .then((response) => {
            console.log('Newsletter SUCCESS!', response.status, response.text);
            $successMessage.removeClass('hidden');
            $errorMessage.addClass('hidden');
            form.reset();

            setTimeout(() => {
                $successMessage.addClass('hidden');
            }, 5000);
        })
        .catch((error) => {
            console.error('Newsletter FAILED...', error);
            $errorMessage.removeClass('hidden');
            $successMessage.addClass('hidden');

            setTimeout(() => {
                $errorMessage.addClass('hidden');
            }, 5000);
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.querySelector('.btn-title span').textContent = originalButtonText;
        });
}

function initNewsletterFormEmailJS(language = 'en') {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => handleNewsletterSubmit(e, language));
    }
}

