const API_URL = process.env.REACT_APP_API_URL;

export const createPaymentIntent = async (amount) => {
    const response = await axios.post(`${API_URL}/payment/create-payment-intent`, { amount });
    return response.data;
};