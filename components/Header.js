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

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState("");
  const [noOfGuests, setNoOfGuests] = useState(87);
  const router = useRouter();

  const resetInput = () => {
    setSearchInput("");
  };

  const [selectedDate, handleDateChange] = useState(new Date());

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        queryDate: selectedDate.toISOString(),
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
          src="/../public/trafficcam.png"
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
          placeholder={placeholder || "Start your search"}
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
        <p className="hidden md:inline cursor-pointer">Whether forecast</p>
        <GlobeAltIcon className="h-6 cursor-pointer animate-spin" />

        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
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
            onChange={(handleDateChange) => console.log(handleDateChange)}
          />

          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Total camera numbers:
            </h2>
            <UsersIcon className="h-5 align:right" />
            <input
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(e.target.value)}
              type="number"
              min={1}
              className="w-12 pl-2 text-lg outline-none text-red-400"
            />
          </div>

          <div className="flex">
            <button onClick={resetInput} className="flex-grow text-gray-500">
              Cancel
            </button>
            <button onClick={search} className="flex-grow text-blue-400">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
