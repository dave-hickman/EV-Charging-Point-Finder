import Image from "next/image";
import SearchBar from "./SearchBar";

import Script from "next/script";
import Map from "./Map";

const apikey = process.env.API_KEY || "";
const location = {
  address: "Piazza Istria 21, 54100 Massa MS",
  lat: 44.038834,
  lng: 10.111922,
};
const zoomLevel = 16;

export default function Home() {
  return (
    <>
      <main className="flex w-full min-h-screen flex-col items-center justify-between">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <h1>Hello</h1>
          <SearchBar />
          <p>This is my project</p>
        </div>
        <Map apikey={apikey} location={location} zoomLevel={zoomLevel} />
      </main>
    </>
  );
}
