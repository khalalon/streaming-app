import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import the CSS file

const stripePromise = loadStripe('pk_test_51QmcPF042ZMAkxckRzHBNEN6tDcOXLKEip8qiFQmK316WyJOxZFS8f6gbJVTduorwBF3Iq0hJTKjfTHA7mxnbYsA00uSCpCyvk');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate(); // For redirection
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            const { id } = paymentMethod;
            try {
                const response = await axios.post('http://localhost:8000/api/v1/payment/create-payment-intent', { amount: 1000 });
                const clientSecret = response.data.clientSecret;

                const confirm = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: id,
                });

                if (confirm.error) {
                    setError(confirm.error.message);
                } else {
                    setError(null);
                    setSuccess(true);
                    setTimeout(() => {
                        navigate('/confirmation'); // Redirect after success
                    }, 2000); // Wait for 2 seconds before redirect
                }
            } catch (error) {
                setError('An error occurred while processing the payment.');
            }
            setLoading(false);
        }
    };

    return (
        <div className="payment-container">
            <h2 className="payment-title">Payment</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <CardElement options={{ style: { base: { fontSize: '18px' } } }} />
                </div>
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="payment-button"
                >
                    {loading ? 'Processing...' : 'Pay'}
                </button>
                {error && <div className="payment-error">{error}</div>}
                {success && <div className="payment-success">Payment Successful!</div>}
            </form>
        </div>
    );
};

const Payment = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default Payment;
