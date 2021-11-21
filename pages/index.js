import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import SmallCard from "../components/SmallCard";
import MediumCard from "../components/MediumCard";
import LargeCard from "../components/LargeCard";
import Footer from "../components/Footer";

export default function Home({ exploreData, cardsData }) {
  return (
    <div className="">
      <Head>
        <title>Singapore Traffic Cams</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">
            Singapore Traffic Cams
          </h2>
          {/* Pull some data from server - API */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {exploreData.items[0].cameras?.map((item, i) => (
              <SmallCard
                key={i}
                img={item.image}
                timestamp={item.timestamp}
                location={item.location}
              />
            ))}
          </div>
        </section>


      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch(
    "https://api.data.gov.sg/v1/transport/traffic-images?date_time=2021-11-19T12%3A11%3A00"
  ).then((res) => res.json());

  const cardsData = await fetch("https://links.papareact.com/zp1").then((res) =>
    res.json()
  );

  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
