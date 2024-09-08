// This function runs when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if there are URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const upiID = urlParams.get('upiID');
    const amount = urlParams.get('amount');

    if (upiID && amount) {
        // Construct the UPI payment link
        const paymentLink = `upi://pay?pa=${encodeURIComponent(upiID)}&am=${encodeURIComponent(amount)}&cu=INR`;

        // Display the payment link in text format (optional, you can hide it if needed)
        document.getElementById('paymentLink').textContent = paymentLink;

        // Generate and display the QR code using the payment link
        generateQR(paymentLink);
    } else {
        // If UPI ID or amount is missing, display an error message
        document.getElementById('paymentLink').textContent = 'Payment details not found.';
    }
});

// Function to generate a QR code using the qrserver.com API
function generateQR(paymentLink) {
    // Construct the QR code API URL
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=225x225&data=${encodeURIComponent(paymentLink)}`;

    // Create an image element for the QR code
    const qrCodeImg = document.createElement('img');
    qrCodeImg.src = qrCodeUrl;
    qrCodeImg.alt = 'QR Code';

    // Clear any existing QR code (if any)
    const qrCodeContainer = document.getElementById('qrCode');
    qrCodeContainer.innerHTML = ''; // Clear the container

    // Append the new QR code image to the container
    qrCodeContainer.appendChild(qrCodeImg);
}
