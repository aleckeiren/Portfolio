/**
 * "StAuth10222: I Alec Pasion, 000811377 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. 
 * I have not made my work available to anyone else."
 */
import fetch from "node-fetch";

const CLIENT_ID = "AfAXGp21H1a4kzv_VqXRUZ239w18cJmGfzgI6qK5P6wXUsVEXC-nhKTEdFX7rg6mahu3h-XCqErdrlBI";
const APP_SECRET = "EEXNGnG9AtnMxk5LB_joRgXaFe-2sZD3pv5PXfZ7Jug4VLiuvAbuoNJtXRFHoeNvIRdp0J--yfayJmZN";

const base = "https://api-m.sandbox.paypal.com";

export async function createOrder(purchase_units) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: purchase_units
    }),
  });
  const data = await response.json();
  return data;
}

export async function capturePayment(orderId) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;
}

async function generateAccessToken() {
  const response = await fetch(base + "/v1/oauth2/token", {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization:
        "Basic " + Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64"),
    },
  });
  const data = await response.json();
  return data.access_token;
}
