import React from 'react';
import { useLocation } from 'react-router-dom';
import KhaltiCheckout from 'khalti-checkout-web';

const KhaltiPayment = () => {
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;

  const config = {
    publicKey: 'test_public_key_dc74e0fd57cb46cd93832aee0a507256',
    productIdentity: Math.random().toString(),
    productName: 'Order Payment',
    productUrl: window.location.origin,
    paymentPreference: [
      'MOBILE_BANKING',
      'KHALTI',
      'EBANKING',
      'CONNECT_IPS',
      'SCT',
    ],
    eventHandler: {
      onSuccess(payload) {
        console.log('Khalti Success Payload:', payload);
        alert(`Payment success! Token: ${payload.token}`);
        // Optionally: navigate to a success page or use payload for verification
      },
      onError(error) {
        console.error('Khalti Error:', error);
        alert('Payment failed or cancelled.');
      },
      onClose() {
        console.log('Khalti widget closed');
      },
    },
  };

  const checkout = new KhaltiCheckout(config);

  const handlePay = () => {
    if (totalAmount <= 0) return alert('Invalid amount');
    checkout.show({ amount: totalAmount });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">
          Pay with Khalti
        </h2>
        <div className="mb-6">
          <p className="text-gray-300 mb-2">Amount to Pay:</p>
          <p className="text-xl font-bold text-white">₹{(totalAmount/100).toFixed(2)}</p>
        </div>
        <button
          onClick={handlePay}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg transition"
        >
          Proceed to Khalti
        </button>
      </div>
    </div>
  );
};

export default KhaltiPayment;
