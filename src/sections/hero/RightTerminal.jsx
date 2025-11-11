import RetroTerminalFrame from "../../Components/RetroTerminalFrame"

export const RightTerminal = () =>{
  return(
    <>
      <div className="absolute right-0 transform rotate-y-180">
        <RetroTerminalFrame />
      </div>

      <div className="absolute top-5 right-6">
        <img src="sparklelogo.png" className="h-16 w-16" alt="" />
      </div>

      <div className="absolute top-4 right-35">
  <h3 className="text-cyan-500 text-[16px] font-bold font-goldman font-stretch-extra-expanded scale-x-125 scale-y-105 leading-6 [text-shadow:0_0_1px_#00ffff]">
    Sparkle - Association of<br/> MCA Department
  </h3>
</div>
    </>
  )
}