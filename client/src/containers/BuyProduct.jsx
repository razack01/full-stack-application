import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51ReHVjInPaKuMZRxLvaboTZchtlWXW7r0d4OHh2wnTMwZHd8vjn3K50d0RfhVBp0Jd5k4XpRfsBZAYIZDyZYWORZ00RH8TmFta");

const CheckoutForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setStatus( error.message);
    } else {
      setStatus("✅ Payment successful! (mock)");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <CardElement />
      <button
        type="submit"
        disabled={!stripe}
        style={{
          marginTop: "20px",
          background: "#5469d4",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Pay ${product.price}
      </button>
      {status && <div style={{ marginTop: "10px" }}>{status}</div>}
    </form>
  );
};

const BuyProduct = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  if (!product) {
   
    navigate("/");
    return null;
  }
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    maxWidth: "480px",
    width: "100%",
    textAlign: "center",
    transition: "all 0.3s ease",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "12px",
    marginBottom: "20px",
    objectFit: "cover",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#333",
  },
  description: {
    fontSize: "0.95rem",
    color: "#666",
    marginBottom: "15px",
  },
  price: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#2a9d8f",
    marginBottom: "25px",
  },
};

  return (
    <div style={styles.container}>
  <div style={styles.card}>
    <img
      src={product.image}
      alt={product.title}
      style={styles.image}
    />
    <h2 style={styles.title}>{product.title}</h2>
    <p style={styles.description}>{product.description}</p>
    <h3 style={styles.price}>Price: ${product.price }</h3>
    <Elements stripe={stripePromise}>
      <CheckoutForm product={product} />
    </Elements>
  </div>
</div>

  );

  
};

export default BuyProduct;
