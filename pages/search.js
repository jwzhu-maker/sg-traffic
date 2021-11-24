import { useRouter } from "next/dist/client/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import { format } from "date-fns";
import Map from "../components/Map";

function Search({ searchResults, weatherData }) {
  console.log(searchResults);
  const router = useRouter();
  const { location, queryDate } = router.query;
  const formattedDate = format(
    new Date(queryDate),
    "EEE, dd MMMM yyyy, hh:mm:ss aaa"
  );

  return (
    <div>
      <Header
        placeholder={`${location} | ${formattedDate}`}
        weatherData={weatherData}
      />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">300+ Stays for {location} guests</p>

          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type</p>
            <p className="button">Price</p>
            <p className="button">Rooms</p>
            <p className="button">More Filters</p>
          </div>

          <div className="flex flex-col">
            {searchResults.map((item) => (
              <InfoCard
                key={item.img}
                img={item.img}
                location={item.location}
                title={item.title}
                description={item.description}
                star={item.star}
                price={item.price}
                total={item.total}
              />
            ))}
          </div>
        </section>

        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const date = new Date(+new Date() + 8 * 3600 * 1000);
  var dateString = date.toISOString();
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );
  const weatherData = await fetch(
    "https://api.data.gov.sg/v1/environment/air-temperature?date=" +
      dateString.substring(0, 10)
  ).then((res) => res.json());

  return {
    props: {
      searchResults,
      weatherData,
    },
  };
}
