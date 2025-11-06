import { useState } from "react"
import { navLinks } from "../constants"

const NavItems = ({ isMobile = false }) => {
  return (
    <div className={`flex items-center gap-4 ${isMobile ? 'flex-col w-full' : 'flex-row'}`}>
      <ul className={`flex flex-col items-center gap-4 sm:flex-row md:gap-6 relative z-20 font-medium ${isMobile ? 'w-full' : ''}`}>
        {navLinks.map(({ id, name, href }) => (
          <li key={id} className={`transition-colors font-semibold ${isMobile
            ? 'w-full rounded-md px-5 py-2 text-neutral-400 active:bg-[#3A3A49] active:text-white touch-manipulation'
            : 'py-2 text-neutral-400 hover:text-white'
            }`}>
            <a href={href}
              className={`transition-colors block text-lg ${isMobile
                ? 'active:text-white'
                : 'md:text-base hover:text-white'
                }`}
              onClick={() => { }}>
              {name}
            </a>
          </li>
        ))}
      </ul>

      {/* Register Button */}
      {!isMobile && (
        <div className="relative group ">
          <button className="absolute cursor-pointer group-hover:text-[#BB7B43] bg-linear-to-br from-[#5C6691] via-50% to-[#E8EDFF] text-gray-900 font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow-lg">
            Register
          </button>
          <button className="group-hover:ml-2 group-hover:mt-2 bg-transparent group-hover:bg-[#BB7B43] text-gray-900 font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform">
            Register
          </button>
        </div>
      )}

      {/* Mobile Register Button */}
      {isMobile && (
        <button className="w-full bg-linear-to-br from-[#5C6691] via-50% to-[#E8EDFF] text-gray-900 text-2xl font-semibold px-6 py-3 rounded-lg transition-all duration-300 mt-4">
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

  return (
    <header className="text-white fixed top-0 left-0 right-0 z-20 bg-black/50 backdrop-blur-[0.5px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center p-5 mx-auto sm:px-10">
          <a href="/" className="text-neutral-400 font-bold text-xl hover:text-white transition-colors "><img className="h-12" src="/medha3.png" alt="" /></a>

          <button onClick={toggleMenu} className="cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden flex" aria-label="Toggle menu">
            <img src={isOpen ? "assets/close.svg" : "assets/menu.svg"} alt="toggle" className="w-6 h-6" />
          </button>

          <nav className="sm:flex hidden items-center gap-6">
            <NavItems />
          </nav>
        </div>
      </div>

      <div className={`absolute left-0 right-0 bg-black/60 backdrop-blur-[10px] transition-all duration-300 ease-in-out overflow-hidden z-20 mx-auto sm:hidden block ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="p-5">
          <NavItems isMobile={true} />
        </nav>
      </div>
    </header>
  )
}