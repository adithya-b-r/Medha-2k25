import { Navbar } from "./Components/Navbar"
import { Hero } from "./sections/Hero"
import { About } from "./sections/About"
import { Events } from "./sections/Events"
import { Glimpse } from "./sections/Glimpse"
import { Rules } from "./sections/Rules"
import { Contact } from "./sections/Contact"

function App() {
  return (
    <div className="relative">
      <Hero />
      <main className="max-w-7xl mx-auto relative z-10">
        <Navbar />
        <About />
        <Events />
        <Glimpse />
        <Rules />
        <Contact />
      </main>
    </div>
  )
}

export default App