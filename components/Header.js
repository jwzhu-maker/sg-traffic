import Image from "next/image";

import {
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  SearchIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { useState } from "react";

import { DateTimePicker } from "@material-ui/pickers";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";

function Header({
  placeholder,
  trafficData,
  weatherData,
  addressData,
  trafficAddressData,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [noOfCameras, setnoOfCameras] = useState(trafficAddressData.length);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");

  let newAddressData = addressData;
  const router = useRouter();

  const resetInput = () => {
    setSearchInput("");
  };

  const lastWeather = weatherData.items[weatherData.items.length - 3];
  const temperature = lastWeather.readings[4].value;
  const timeStamp = lastWeather.timestamp;
  const formattedDate = format(new Date(timeStamp), "dd/MM/yy h:mm:ss");

  const [selectedDate, handleDateChange] = useState(new Date());

  function GetCameraAddresses(props) {
    const trafficAddressData = props.addresses;
    if (searchInput === " " || searchInput === ".") {
      return trafficAddressData.map((item, i) => (
        <option key={i} value={item.address}>
          {trafficAddressData[i].address}
        </option>
      ));
    } else {
      console.log(searchInput);
      newAddressData = trafficAddressData.filter((item, i) =>
        item.address.toLowerCase().includes(searchInput.toLowerCase())
      );

      return newAddressData.map((item, i) => (
        <option key={i} value={item.address}>
          {newAddressData[i].address}
        </option>
      ));
    }
  }

  const search = () => {
    const selectedCamera = trafficAddressData.find(
      (item) => item.address === searchInput
    );

    console.log(selectedCamera);
    console.log(selectedDate.toISOString());

    router.push({
      pathname: "/search",
      query: {
        searchInput: searchInput,
        queryDate: selectedDate.toISOString(),
        cameraId: selectedCamera.cameraId,
        imageUrl: selectedCamera.imageUrl,
        searchLng: selectedCamera.location.longitude,
        searchLat: selectedCamera.location.latitude,
      },
    });
    resetInput;
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      {/* left */}
      <div
        onClick={() => router.push("/")}
        className="relative  items-center h-10 cursor-pointer my-auto"
      >
        <Image
          src="/trafficcam.png"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
        <p className="pl-14 text-xl font-bold  text-blue-600 hidden md:inline-flex cursor-pointer">
          Singapore Traffic Cams
        </p>
      </div>

      {/* middle - Search */}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          placeholder={
            placeholder || "Start your search. | Type '.' for all cameras."
          }
          className="flex-grow pl-5 bg-transparent outline-none text-gray-600 text-sm placeholder-gray-400"
        />
        <SearchIcon
          onClick={search}
          className="hidden md:inline-flex h-8 bg-blue-400 
          text-white rounded-full p-2 cursor-pointer md:mx-2"
        />
      </div>

      {/* right */}
      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <div className="cursor-pointer text-bold text-xl lg:text-3xl ">
          🌦 {temperature}&#176;C
        </div>
        <div className="hidden md:inline cursor-pointer text-lg">Singapore</div>

        {/* <GlobeAltIcon className="h-6 cursor-pointer animate-spin" /> */}
        <div
          className="h-6 cursor-pointer animate-spin text-lg"
          onClick={() => window.location.reload(false)}
        >
          <p title="refresh">🌎</p>
        </div>

        <div className="hidden md:inline justify-end text-sm text-gray-400">
          {formattedDate}
        </div>
        {/* <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div> */}
      </div>

      {searchInput && (
        <div
          className="flex-grow flex-col col-span-3 mx-auto 
        customDatePickerWidth"
        >
          <DateTimePicker
            className="cursor-pointer w-[400px]"
            dateRangeIcon={<UsersIcon className="h-6" />}
            value={selectedDate}
            onChange={(Date) => handleDateChange(Date)}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Total camera numbers:
            </h2>
            {/* <UsersIcon className="h-5 align:right" /> */}
            📷
            <input
              value={noOfCameras}
              onChange={(e) => setnoOfCameras(e.target.value)}
              type="number"
              min={1}
              className="w-12 pl-2 text-lg outline-none text-red-400"
            />
          </div>
          <div className="flex">
            <button
              onClick={resetInput}
              className="flex-grow button text-gray-500"
            >
              Cancel
            </button>
            <button onClick={search} className="flex-grow button text-blue-400">
              Search
            </button>
          </div>
          <select
            name="Cameras"
            size="5"
            multiple="multiple"
            className="w-[400px] h-[200px] py-4 bg-transparent outline-none text-gray-600"
            onChange={(e) => {
              setSelectedAddress(e.target.value);
              setSearchInput(e.target.value);
            }}
          >
            <GetCameraAddresses addresses={trafficAddressData} />
          </select>
        </div>
      )}
    </header>
  );
}

export default Header;
