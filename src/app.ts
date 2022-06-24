import axios from "axios";
import "./app.css";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address") as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyCE9YECvTRnjVnvGlOSj8lypPR8m75DU7U";

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS" | "REQUEST_DENIED";
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
      if (res?.data?.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      const coordinates = res?.data?.results[0].geometry?.location;
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: coordinates,
          zoom: 16,
        }
      );
      new google.maps.Marker({
        position: coordinates,
        map: map,
      });
    })
    .catch((err) => {
      alert(err?.message);
      console.log("Logging error", err);
    });
}

form.addEventListener("submit", searchAddressHandler);
