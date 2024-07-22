document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('paymentForm');
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get user input from index.html
        const upiID = document.getElementById('upiID').value.trim();
        const amount = document.getElementById('amount').value.trim();

        if (upiID && amount) {
            // Redirect to payment.html with query parameters
            window.location.href = `payment.html?upiID=${encodeURIComponent(upiID)}&amount=${encodeURIComponent(amount)}`;
        } else {
            alert('Please enter UPI ID and amount.');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Check if there are URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const upiID = urlParams.get('upiID');
    const amount = urlParams.get('amount');

    if (upiID && amount) {
        const paymentLink = `upi://pay?pa=${encodeURIComponent(upiID)}&am=${encodeURIComponent(amount)}&cu=INR`;
        document.getElementById('paymentLink').textContent = paymentLink;

        // Generate QR code using qrserver.com API
        generateQR(paymentLink);
    } else {
        document.getElementById('paymentLink').textContent = 'Payment details not found.';
    }
});

function generateQR(paymentLink) {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=225x225&data=${encodeURIComponent(paymentLink)}`;
    
    const qrCodeImg = document.createElement('img');
    qrCodeImg.src = qrCodeUrl;
    qrCodeImg.alt = 'QR Code';

    // Clear previous QR code, if any
    const qrCodeContainer = document.getElementById('qrCode');
    qrCodeContainer.innerHTML = '';
    
    // Append QR code image to container
    qrCodeContainer.appendChild(qrCodeImg);
}
