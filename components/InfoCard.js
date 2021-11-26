import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { useState } from "react";

function InfoCard({
  img,
  location,
  searchInput,
  formattedDate,
  star,
  longitude,
  latitude,
  weatherNameLocation,
  weatherDescription,
  temperature,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // weather Emoji Icons
  // ☀️ 🌤 ⛅️ 🌥 ☁️ 🌦 🌧 ⛈ 🌩 🌨 ❄️ ☃️ ⛄️ 🌬 💨 💧 💦 ☔️ ☂️
  const WeatherIcon = (props) => {
    // console.log(props);
    switch (props.weatherDescription.toLowerCase()) {
      case "clear sky":
        return "🌤";
      case "cloudy":
        return "⛅️";
      case "partly cloudy (day)":
        return "🌥";
      case "partly cloudy (night)":
        return "💨";
      case "raining":
        return "🌧";
      case "thunderstorm":
        return "⛈";
      case "snow":
        return "❄️";
      case "mist":
        return "🌨";
      case "haze":
        return "🌩";
      case "snow":
        return "⛄️";
      default:
        return "🌦";
    }
  };

  return (
    <div
      className="flex py-7 px-2 border-b cursor-pointer hover:opacity-90
    hover:shadow-lg hover:border-4 hover:border-blue-300 transition
    duration-200 ease-out first:border-t"
      onClick={() => setIsOpen(true)}
    >
      <div className="relative h-96 w-60 md:h-96 md:w-80 flex-shrink-0">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>

      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p> {location} </p>
          <div className="h-7 cursor-pointer text-2xl">🇸🇬</div>
        </div>
        <h4 className="text-xl">
          <span className="font-bold">{searchInput}</span>
        </h4>

        <div className="border-b w-10 pt-2" />

        <p className="pt-2 text-gray-500 text-sm flex-grow">{formattedDate}</p>

        <div className="text-lg font-semibold pb-2 lg:text-2xl">
          <WeatherIcon weatherDescription={weatherDescription} />
          {` ${weatherDescription}`}
        </div>

        <p className="text-lg font-semibold pb-2 lg:text-2xl">
          {temperature} °C
        </p>

        <p className="justify-between text-gray-500">{weatherNameLocation}</p>

        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" />
            {star}
          </p>

          <div>
            <p className="text-sm text-gray-500">Long: {longitude}</p>
            <p className="text-sm text-gray-500">Lati: {latitude}</p>
          </div>
        </div>
      </div>

      {isOpen && (
        <Lightbox mainSrc={img} onCloseRequest={() => setIsOpen(false)} />
      )}
    </div>
  );
}

export default InfoCard;
