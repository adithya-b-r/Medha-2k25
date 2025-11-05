import { Navbar } from "./Components/Navbar"
import { Hero } from "./sections/Hero"
import { About } from "./sections/About"
import { Events } from "./sections/Events"
import { Glimpse } from "./sections/Glimpse"
import { Rules } from "./sections/Rules"
import { Contact } from "./sections/Contact"

function App() {
  return (
    <main className="max-w-7xl mx-auto">
      <Navbar />
      <Hero />
      <About />
      <Events />
      <Glimpse />
      <Rules />
      <Contact />
    </main>
  )
}

export default App