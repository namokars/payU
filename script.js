document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const upiID = urlParams.get('upiID');
    const amount = urlParams.get('amount');

    if (upiID && amount) {
        const paymentLink = `upi://pay?pa=${encodeURIComponent(upiID)}&am=${encodeURIComponent(amount)}&cu=INR`;
        document.getElementById('paymentLink').textContent = paymentLink;
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

    const qrCodeContainer = document.getElementById('qrCode');
    qrCodeContainer.innerHTML = '';
    qrCodeContainer.appendChild(qrCodeImg);
}
