import RetroTerminalFrame from "../../components/ui/RetroTerminalFrame"

export const LeftTerminal = () => {
  return (
    <>
      <div className="absolute">
        <RetroTerminalFrame />
      </div>

      <div className="absolute top-5 left-6">
        <img src="sditlogo.png" className="h-16 w-16" alt="" />
      </div>

      <div className="absolute top-4 left-35">
        <h3 className="text-cyan-500 text-lg font-bold font-goldman font-stretch-extra-expanded scale-x-125 scale-y-105 leading-6 [text-shadow:0_0_1px_#00ffff]">
          Shree Devi Institute<br /> of Technology
        </h3>
      </div>
    </>
  )
}