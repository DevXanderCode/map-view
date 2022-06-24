import axios from "axios";
import "./app.css";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address") as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyCE9YECvTRnjVnvGlOSj8lypPR8m75DU7U";

function searchAddressHandler(event: Event) {
  event.preventDefault();

  const enteredAddress = addressInput.value;

  // send to Google API

  axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
      enteredAddress
    )}&key=${GOOGLE_API_KEY}`
  );
}

form.addEventListener("submit", searchAddressHandler);
