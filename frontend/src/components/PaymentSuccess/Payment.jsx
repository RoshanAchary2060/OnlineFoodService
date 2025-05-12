import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

const Payment = () => {
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;

  const [formData, setFormData] = useState({
    amount: totalAmount,
    tax_amount: '0',
    total_amount: totalAmount,
    transaction_uuid: uuidv4(),
    product_service_charge: '0',
    product_delivery_charge: '0',
    product_code: 'EPAYTEST',
    success_url: 'http://localhost:5173/payment/success',
    failure_url: 'http://localhost:5173/payment/failure',
    signed_field_names: 'total_amount,transaction_uuid,product_code',
    signature: '',
    secret: '8gBm/:&EnhH.1/q',
  });

  const generateSignature = (total_amount, transaction_uuid, product_code, secret) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    return CryptoJS.enc.Base64.stringify(hash);
  };

  useEffect(() => {
    const { total_amount, transaction_uuid, product_code, secret } = formData;
    const hashedSignature = generateSignature(total_amount, transaction_uuid, product_code, secret);
    setFormData((prev) => ({ ...prev, signature: hashedSignature }));
  }, [formData.amount]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
        className="bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center text-green-400">Checkout</h1>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-300 font-medium mb-2">
            Amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            readOnly
            required
            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
          />
        </div>

        {/* Hidden fields */}
        <input type="hidden" name="tax_amount" value={formData.tax_amount} />
        <input type="hidden" name="total_amount" value={formData.total_amount} />
        <input type="hidden" name="transaction_uuid" value={formData.transaction_uuid} />
        <input type="hidden" name="product_code" value={formData.product_code} />
        <input type="hidden" name="product_service_charge" value={formData.product_service_charge} />
        <input type="hidden" name="product_delivery_charge" value={formData.product_delivery_charge} />
        <input type="hidden" name="success_url" value={formData.success_url} />
        <input type="hidden" name="failure_url" value={formData.failure_url} />
        <input type="hidden" name="signed_field_names" value={formData.signed_field_names} />
        <input type="hidden" name="signature" value={formData.signature} />

        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-300 font-medium mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="lastName" className="block text-gray-300 font-medium mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          Pay via eSewa
        </button>
      </form>
    </div>
  );
};

export default Payment;
