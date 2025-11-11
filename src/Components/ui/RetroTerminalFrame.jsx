const RetroTerminalFrame = (props) => (
  <svg
    width={410}
    height={130}
    viewBox="0 0 410 130"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      backgroundColor: "transparent",
    }}
    {...props}
  >
    <defs>
      <filter id="a" x="-50%" y="-50%" width="200%" height="200%">
        {/* INCREASED GLOW: stdDeviation from 7 to 10, floodOpacity from 0.8 to 1.0 */}
        <feGaussianBlur in="SourceAlpha" stdDeviation={10} result="blur-outer" />
        <feFlood floodColor="#4a007a" floodOpacity={1.0} result="color-outer" />
        <feComposite
          in="color-outer"
          in2="blur-outer"
          operator="in"
          result="glow-outer"
        />
        {/* INCREASED GLOW: stdDeviation from 3 to 5, floodOpacity from 0.9 to 1.0 */}
        <feGaussianBlur in="SourceAlpha" stdDeviation={5} result="blur-inner" />
        <feFlood floodColor="#0ff" floodOpacity={1.0} result="color-inner" />
        <feComposite
          in="color-inner"
          in2="blur-inner"
          operator="in"
          result="glow-inner"
        />
        {/* INCREASED GLOW: stdDeviation from 10 to 15, floodOpacity from 0.2 to 0.4 */}
        <feGaussianBlur in="SourceAlpha" stdDeviation={15} result="blur-hazy" />
        <feFlood floodColor="#f0f" floodOpacity={0.4} result="color-hazy" />
        <feComposite
          in="color-hazy"
          in2="blur-hazy"
          operator="in"
          result="glow-hazy"
        />
        <feMerge>
          <feMergeNode in="glow-hazy" />
          <feMergeNode in="glow-outer" />
          <feMergeNode in="glow-inner" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path
      d="M10 10h390v60H120l-30 30H10Z"
      fill="none"
      stroke="#aff"
      strokeWidth={2}
      filter="url(#a)"
    />
  </svg>
);
export default RetroTerminalFrame;