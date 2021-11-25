import Image from "next/image";
import Map from "../components/Map";

function Banner({ trafficAddressData }) {
  const searchResults = trafficAddressData.map((item, i) => ({
    id: i,
    longitude: item.location.longitude,
    latitude: item.location.latitude,
    title: item.address,
  }));

  console.log(searchResults);

  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
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

      <Map searchResults={searchResults} key={searchResults.id} />
    </div>
  );
}

export default Banner;
