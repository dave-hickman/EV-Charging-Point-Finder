import Image from 'next/image'
import SearchBar from './SearchBar'

import Script from 'next/script'

export default function Home() {
  return (
    <>
    <Script src="https://js.api.here.com/v3/3.1/mapsjs-core.js"/>
    <Script src="https://js.api.here.com/v3/3.1/mapsjs-service.js"/>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1>Hello</h1>
        <SearchBar/>
        <p>This is my project</p>
      </div>
    </main>
    </>
  )
}
