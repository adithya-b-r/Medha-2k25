import { Leva } from "leva";
import Navbar from "./components/Navbar";
import { Hero } from "./sections/hero/Hero"
import { About } from "./sections/About"
import { Events } from "./sections/Events"
import { Glimpse } from "./sections/Glimpse"
import { Rules } from "./sections/Rules"
import { Contact } from "./sections/Contact"
import ZoomProgress from "./components/ZoomProgress"
import { useMediaQuery } from "react-responsive";

function App() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  return (
    <>
      <Leva hidden collapsed={false} />
      <div className="relative w-full overflow-x-hidden">
        <div className="fixed inset-0 -z-10">
          <iframe
            src="https://galaxy-bg.vercel.app/"
            className="w-screen h-full border-0"
            title="Galaxy Background"
          />
        </div>
        
        <ZoomProgress />
        {isTabletOrMobile && <Navbar />}
        
        <main className="relative z-10">
          <div className="max-w-7xl mx-auto px-2">
            <Hero />
            <About />
            <Events />
            <Glimpse />
            <Rules />
            <Contact />
          </div>
        </main>
      </div>
    </>
  )
}

export default App