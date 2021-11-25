import { useRouter } from "next/dist/client/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import { format } from "date-fns";
import Map from "../components/Map";
import { useState } from "react";
import { getDistance } from "geolib";

async function getTrafficData(date) {
  return await fetch(
    "https://api.data.gov.sg/v1/transport/traffic-images?date_time=" +
      date.substring(0, 19)
  ).then((res) => res.json());
}

function Search({ weatherData, temperatureData }) {
  // console.log(trafficData);
  // console.log(weatherData);
  // console.log(addressData);

  const router = useRouter();
  const {
    searchInput,
    location,
    queryDate,
    cameraId,
    imageUrl,
    searchLng,
    searchLat,
  } = router.query;

  console.log(cameraId);
  console.log(imageUrl);
  const formattedDate = format(
    new Date(queryDate),
    "EEE, dd MMMM yyyy, hh:mm:ss aaa"
  );

  console.log(queryDate);

  const cameraCoordinates = {
    longitude: searchLng,
    latitude: searchLat,
  };

  console.log(weatherData);
  const distance = getDistance(
    cameraCoordinates,
    weatherData.area_metadata[30].label_location
  );
  console.log(distance);

  const distanceArray = weatherData.area_metadata.map((item) => {
    return getDistance(cameraCoordinates, item.label_location);
  });

  console.log(distanceArray);

  const minDistance = Math.min(...distanceArray);
  console.log(minDistance);

  const minIndex = distanceArray.indexOf(minDistance);
  console.log(minIndex);

  const weatherNameLocation = weatherData.area_metadata[minIndex].name;
  console.log(weatherNameLocation);

  const weatherDescription = weatherData.items[0].forecasts[minIndex].forecast;
  console.log(weatherDescription);

  const temperature = temperatureData.items[0].readings[0].value;
  console.log(temperature);

  return (
    <div>
      {/* <Header
        placeholder={`${searchInput} | ${formattedDate}`}
        trafficData={trafficData}
        weatherData={weatherData}
        addressData={addressData}
      /> */}
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Search for {searchInput}
          </h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">{formattedDate}</p>
            <p className="button">{searchInput}</p>
          </div>

          <div className="flex flex-col">
            <InfoCard
              key={imageUrl}
              img={imageUrl}
              location={"Singapore"}
              searchInput={searchInput}
              formattedDate={formattedDate}
              star={""}
              longitude={searchLng}
              latitude={searchLat}
              weatherNameLocation={
                weatherNameLocation + " " + minDistance + "m away"
              }
              weatherDescription={weatherDescription}
              temperature={temperature}
            />
          </div>
        </section>

        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map
            searchResults={[
              {
                longitude: parseFloat(searchLng),
                latitude: parseFloat(searchLat),
                address: searchInput,
              },
            ]}
          />
        </section>
      </main>

      <section className="pt-2">
        <Footer />
      </section>
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const date = new Date(+new Date() + 8 * 3600 * 1000);
  var dateString = date.toISOString();

  const weatherData = await fetch(
    "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=" +
      dateString.substring(0, 19)
  ).then((res) => res.json());

  // https://api.data.gov.sg/v1/environment/air-temperature?date_time=2021-11-25T06:02:32Z
  const temperatureData = await fetch(
    "https://api.data.gov.sg/v1/environment/air-temperature?date_time=" +
      dateString.substring(0, 19)
  ).then((res) => res.json());

  console.log(dateString.substring(0, 19));
  console.log(weatherData);

  return {
    props: {
      // searchResults,
      weatherData,
      temperatureData,
    },
  };
}
