import { useState } from "react"
import { navLinks } from "../constants"

const NavItems = ({ isMobile = false }) => {
  return (
    <div className={`flex items-center gap-4 ${isMobile ? 'flex-col w-full' : 'flex-row'}`}>
      <ul className={`flex items-center gap-4 sm:gap-6 relative z-20 font-medium ${isMobile ? 'flex-col w-full' : 'flex-row'}`}>
        {navLinks.map(({ id, name, href }) => (
          <li key={id} className={`transition-colors font-semibold ${isMobile
            ? 'w-full rounded-md px-5 py-2 text-neutral-400 active:bg-[#3A3A49] active:text-white touch-manipulation'
            : 'py-2 text-neutral-400 hover:text-white'
            }`}>
            <a
              href={href}
              className={`transition-colors block ${isMobile
                ? 'text-lg active:text-white'
                : 'text-base hover:text-white'
                }`}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop Register Button */}
      {!isMobile && (
        <div className="relative group">
          <button
            className="relative z-10 cursor-pointer bg-linear-to-br from-[#5C6691] via-50% to-[#E8EDFF] text-gray-900 font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={() => window.open('https://konfhub.com/medha-2k25', '_blank')}
          >
            Register
          </button>
        </div>
      )}

      {/* Mobile Register Button */}
      {isMobile && (
        <button
          className="w-full bg-linear-to-br from-[#5C6691] via-50% to-[#E8EDFF] text-gray-900 text-lg font-semibold px-6 py-3 rounded-lg transition-all duration-300 mt-4 hover:shadow-lg"
          onClick={() => window.open('https://konfhub.com/medha-2k25', '_blank')}
        >
          Register
        </button>
      )}
    </div>
  )
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  const closeMenu = () => {
    setIsOpen(false);
  }

  return (
    <header className="text-white h-16 fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex">
        <div className="flex justify-between items-center w-full py-2 px-3 sm:px-10">
          <a
            href="#hero"
            className="text-neutral-400 flex gap-2 font-bold text-xl hover:text-white transition-colors"
            onClick={closeMenu}
          >
            <img className="h-12" src="/sditlogo.png" alt="Site Logo" />
            <h4 className="absolute scale-x-105 text-lg left-18 top-0.5">Shree Devi Institute <br />of Technology</h4>
          </a>

          <button
            onClick={toggleMenu}
            className="cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              alt={isOpen ? "Close menu" : "Open menu"}
              className="w-6 h-6"
            />
          </button>

          <nav className="sm:flex hidden items-center gap-6">
            <NavItems />
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed left-0 right-0 top-16 bg-black/60 backdrop-blur-lg transition-all duration-300 ease-in-out overflow-hidden z-40 sm:hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <nav className="p-5">
          <NavItems isMobile={true} />
        </nav>
      </div>
    </header>
  )
}