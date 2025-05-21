import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";

export default function PaymentMethod() {
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  function handleInputFocus(e) {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Payment successful!");
    setState({
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      focus: "",
    });
  }

  return (
    <div style={styles.bg}>
      <HeaderLogoBack />
      <div style={{ height: 20 }} />
      <div style={styles.responsiveWrapper}>
        <h2 style={styles.title}>Enter your payment details</h2>
        <div style={styles.cardPreview}>
          <Cards
            number={state.number}
            name={state.name}
            expiry={state.expiry}
            cvc={state.cvc}
            focused={state.focus}
          />
        </div>
        <form style={styles.form} onSubmit={handleSubmit} autoComplete="off">
          <input
            type="tel"
            name="number"
            placeholder="Card Number"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            style={styles.input}
            maxLength={19}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name on Card"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            style={styles.input}
            required
          />
          <div style={styles.flexRow}>
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              style={styles.inputHalf}
              maxLength={5}
              required
            />
            <input
              type="tel"
              name="cvc"
              placeholder="CVC"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              style={styles.inputHalf}
              maxLength={4}
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  bg: {
    background: "#ECF1FF",
    minHeight: "100vh",
    fontFamily: "Montserrat, sans-serif",
  },
  responsiveWrapper: {
    width: "100%",
    maxWidth: 380,
    margin: "0 auto",
    padding: "32px 18px 32px 18px",
    background: "#fff",
    borderRadius: 20,
    boxShadow: "0 4px 32px 0 #0E4CA120",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
  },
  cardPreview: {
    margin: "0 auto 40px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    marginTop: 4,
  },
  input: {
    width: "100%",
    padding: "15px 16px",
    borderRadius: 9,
    border: "1.5px solid #C5D1F8",
    fontSize: 18,
    background: "#fff",
    outline: "none",
    fontFamily: "Montserrat, sans-serif",
    boxSizing: "border-box",
    boxShadow: "0 1px 4px 0 #0E4CA108",
    marginBottom: 0,
    transition: "border 0.2s",
  },
  flexRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
  inputHalf: {
    flex: 1,
    padding: "15px 16px",
    borderRadius: 9,
    border: "1.5px solid #C5D1F8",
    fontSize: 17,
    background: "#fff",
    outline: "none",
    fontFamily: "Montserrat, sans-serif",
    boxSizing: "border-box",
    boxShadow: "0 1px 4px 0 #0E4CA108",
    marginBottom: 0,
    transition: "border 0.2s",
  },
  button: {
    background: "#007AFF",
    color: "#fff",
    border: "none",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 19,
    padding: "16px 0",
    cursor: "pointer",
    marginTop: 10,
    letterSpacing: "0.5px",
    boxShadow: "0 2px 8px 0 #007AFF20",
    transition: "background 0.2s",
    fontFamily: "Montserrat, sans-serif",
  },
  title: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: 24,
    color: "#0067C2",
    marginBottom: 28,
    fontFamily: "Montserrat, sans-serif",
    letterSpacing: "-0.5px",
  },
};
