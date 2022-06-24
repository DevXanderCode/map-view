import axios from "axios";
import "./app.css";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address") as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyCE9YECvTRnjVnvGlOSj8lypPR8m75DU7U";

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
};

function searchAddressHandler(event: Event) {
  event.preventDefault();

  const enteredAddress = addressInput.value;

  // send to Google API

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((res) => {
      console.log("Logging response", res);
      const coordinates = res?.data?.results[0].geometry?.location;
    })
    .catch((err) => {
      console.log("Logging error", err);
    });
}

form.addEventListener("submit", searchAddressHandler);
