import { Leva } from "leva";
import { Navbar } from "./components/Navbar";
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
      <div className="relative">
        <ZoomProgress />
        {isTabletOrMobile && <Navbar />}
        <main className="max-w-7xl mx-auto relative z-10">
          <Hero />
          <About />
          <Events />
          <Glimpse />
          <Rules />
          <Contact />
        </main>
      </div>
    </>
  )
}

export default App