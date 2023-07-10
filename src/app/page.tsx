import Image from "next/image";
import SearchBar from "./SearchBar";

import Script from "next/script";
import Map from "./Map";


const apikey = process.env.API_KEY || "";
const zoomLevel = 17;

export default function Home() {
  return (
    <>
      <main className="flex w-full min-h-screen flex-col items-center justify-between">
        <Map apikey={apikey} zoomLevel={zoomLevel} />
      </main>
    </>
  );
}
