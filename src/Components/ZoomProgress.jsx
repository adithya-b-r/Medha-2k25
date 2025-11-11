import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const ZoomProgress = () => {
  const [activeSection, setActiveSection] = useState(0)
  const indicatorRef = useRef(null)

  const scenes = [
    { icon: '/planets/earth.png', section: 'hero' },
    { icon: '/planets/mars.png', section: 'about' },
    { icon: '/planets/jupiter.png', section: 'events' },
    { icon: '/planets/saturn.png', section: 'glimpse' },
    { icon: '/planets/uranus.png', section: 'rules' },
    { icon: '/planets/neptune.png', section: 'contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + (window.innerHeight / 3)

      let currentSection = 0
      let minDistance = Infinity

      scenes.forEach((scene, index) => {
        const element = document.getElementById(scene.section)
        if (element) {
          const sectionTop = element.offsetTop
          const sectionBottom = sectionTop + element.offsetHeight
          const sectionCenter = sectionTop + (element.offsetHeight / 2)

          const distance = Math.abs(scrollPosition - sectionCenter)

          if (distance < minDistance) {
            minDistance = distance
            currentSection = index
          }
        }
      })

      console.log('Current section:', currentSection, 'Scroll position:', scrollPosition)

      if (currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    const timeoutId = setTimeout(handleScroll, 1000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [activeSection])

  useEffect(() => {
    if (indicatorRef.current) {
      const percentage = (activeSection / (scenes.length - 1)) * 100
      gsap.to(indicatorRef.current, {
        left: `${percentage}%`,
        duration: 0.5,
        ease: "power2.out"
      })
    }
  }, [activeSection])

  const getMarkerLeft = (index) => {
    return `${(index / (scenes.length - 1)) * 100}%`
  }

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-4/5 h-16 z-50 rounded-lg">
      {/* Progress Line */}
      <div className="absolute top-1/2 w-full h-0.5 bg-white/60 transform -translate-y-1/2" />

      {/* Markers */}
      {scenes.map((scene, index) => (
        <div
          key={index}
          className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 transition-all duration-300 ${index === activeSection ? 'scale-110' : 'scale-100'
            }`}
          style={{ left: getMarkerLeft(index) }}
        >
          <div
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${index === activeSection
                ? 'border-white bg-white/20'
                : 'border-white/30 bg-transparent'
              }`}
          >
            <img
              src={scene.icon}
              alt={`Section ${index + 1}`}
              className="w-7 h-7"
            />
          </div>
        </div>
      ))}

      {/* Astronaut Indicator */}
      <div
        ref={indicatorRef}
        className="absolute w-10 h-10 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        style={{ left: '0%' }}
      >
        <img
          src="/astronaut.png"
          alt="Current progress"
          className="w-10 h-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        />
      </div>
    </div>
  )
}

export default ZoomProgress;