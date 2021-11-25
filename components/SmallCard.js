import Image from "next/image";

function SmallCard({ img, timestamp, location, address }) {
  return (
    <div
      className="flex items-center m-2 mt-5 space-x-4 rounded-xl
     cursor-pointer  hover:opacity-80
     hover:shadow-lg hover:border-4 hover:border-blue-300 transition
     transform duration-200 ease-out"
    >
      {/* left */}
      <div className="relative h-96 w-96">
        <Image
          className="rounded-xl hover:shadow-xl
        active:scale-90 transition duration-150"
          src={img}
          layout="fill"
        />
      </div>

      {/* right */}
      <div className="relative h-96 w-48">
        <h2>{timestamp.substr(0, 10)}</h2>
        <h2>{timestamp.substr(11, 8)}</h2>
        <h3 className="text-gray-800">
          <b>Addr:</b> {address}
        </h3>
        <h3 className="text-gray-500">Lat: {location.latitude}</h3>
        <h3 className="text-gray-500">Lon: {location.longitude}</h3>
      </div>
    </div>
  );
}

export default SmallCard;
