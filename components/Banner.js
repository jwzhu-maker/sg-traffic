import Image from "next/image";
import Map from "../components/Map";

function Banner({ trafficAddressData }) {
  const searchResults = trafficAddressData.map((item, i) => ({
    id: i,
    longitude: item.location.longitude,
    latitude: item.location.latitude,
    address: item.address,
  }));

  console.log(searchResults);

  return (
    <div className="lg:h-[500px]">
      {/* <Image priority src="/Singapore_Map.png" layout="fill" objectFit="cover" />
      <div className="absolute top-1/2 w-full text-center">
        <p className="text-sm sm:text-lg">Not sure where to go? Perfect.</p>
        <button
          className="text-purple-500 bg-white px-10 py-4 
        shadow-md rounded-full font-bold my-3 hover:shadow-xl
        transition duration-150"
        >
          Check Traffic
        </button>
      </div> */}

      <Map searchResults={searchResults} />
    </div>
  );
}

export default Banner;
