import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import SmallCard from "../components/SmallCard";
import MediumCard from "../components/MediumCard";
import LargeCard from "../components/LargeCard";
import Footer from "../components/Footer";
// import { GOOGLE_MAPS_APIKEY } from "@env";
import { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Home({
  trafficData,
  weatherData,
  addressData,
  trafficAddressData,
}) {
  // console.log(reverseGeoAddress);
  // console.log(trafficData);
  // console.log(addressData);

  return (
    <div className="">
      <Head>
        <title>Singapore Traffic Cams</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        trafficData={trafficData}
        weatherData={weatherData}
        addressData={addressData}
        trafficAddressData={trafficAddressData}
      />
      <Banner trafficAddressData={trafficAddressData}/>
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">
            Singapore Traffic Cams
          </h2>
          {/* Pull some data from server - API */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {trafficData.items[0].cameras?.map((item, i) => (
              <SmallCard
                key={i}
                img={item.image}
                timestamp={item.timestamp}
                location={item.location}
                address={addressData[i].formatted_address}
                // weather={weatherForecast[i]}
              />
            ))}
          </div>
        </section>

        {/* <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>

          <div
            className="flex space-x-3 overflow-scroll
          scrollbar-hide p-3 -ml-3"
          >
            {cardsData?.map(({ img, title }, i) => (
              <MediumCard key={i} img={img} title={title} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by WZ."
          buttonText="Get Inspired"
        /> */}
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const date = new Date(+new Date() + 8 * 3600 * 1000);
  var dateString = date.toISOString();

  const trafficData = await fetch(
    "https://api.data.gov.sg/v1/transport/traffic-images?date_time=" +
      dateString.substring(0, 19)
  ).then((res) => res.json());

  const weatherData = await fetch(
    "https://api.data.gov.sg/v1/environment/air-temperature?date=" +
      dateString.substring(0, 10)
  ).then((res) => res.json());

  // weather Emoji Icons
  // ☀️ 🌤 ⛅️ 🌥 ☁️ 🌦 🌧 ⛈ 🌩 🌨 ❄️ ☃️ ⛄️ 🌬 💨 💧 💦 ☔️ ☂️

  // const weatherForecastData = await fetch(
  //   "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=" +
  //     dateString
  // ).then((res) => res.json());

  let addressData = new Array();
  let address1 = {};
  const getReverseGeoAddress = async (location, address) => {
    const response = await fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        location.latitude +
        "," +
        location.longitude +
        "&key=" +
        process.env.GOOGLE_MAPS_APIKEY
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results[0]) {
          address = data.results[0];
          // console.log(address);
          addressData.push(address);
        } else {
          address = { formatted_address: "Unknown" };
          // console.log(address);
          addressData.push(address);
        }
      });

    // console.log(reverseGeoAddress);
    // console.log(reverseGeoAddress.results[0].formatted_address);
  };

  // Reverse Geocoding temporily disabled, as it causes too many requests to Google Maps API
  for (let i = 0; i < trafficData.items[0].cameras.length; i++) {
    // console.log(trafficData.items[0].cameras[i].location);
    await getReverseGeoAddress(
      trafficData.items[0].cameras[i].location,
      address1
    );
  }

  // Prepare data for the traffic and address data mapping
  const trafficAddressData = trafficData.items[0].cameras?.map((item, i) => ({
    cameraId: item.camera_id,
    imageUrl: item.image,
    location: item.location,
    address: addressData[i].formatted_address + " (" + item.camera_id + ")",
  }));

  console.log(trafficAddressData);

  // const reverseGeoAddress = await fetch(
  //   "https://maps.googleapis.com/maps/api/geocode/json?latlng=35.6512,139.68&key=" +
  //     process.env.GOOGLE_MAPS_APIKEY
  // ).then((res) => res.json());

  return {
    props: {
      trafficData,
      weatherData,
      // weatherForecastData,
      addressData,
      trafficAddressData,
    },
  };
}
