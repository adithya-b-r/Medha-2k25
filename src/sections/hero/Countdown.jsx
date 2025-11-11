import { useState, useEffect } from 'react';

export const Countdown = ({ targetDate = "2025-12-31T23:59:59" }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center mx-1.5 md:mx-3">
      <div className="relative">
        <div className="absolute inset-0 bg-cyan-500/20 blur-lg rounded-lg"></div>
        <div className="text-center relative bg-linear-to-br from-purple-900/40 to-black/60 border-2 border-cyan-400 rounded-lg px-2 py-1.5 md:px-3 md:py-2 min-w-[50px] md:min-w-[70px]">
          <span className="text-2xl md:text-3xl font-bold font-mono text-cyan-400 [text-shadow:0_0_10px_#00ffff,0_0_20px_#00ffff]">
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="text-cyan-300 text-[10px] md:text-xs font-goldman mt-1 uppercase tracking-wider [text-shadow:0_0_5px_#00ffff]">
        {label}
      </span>
    </div>
  );

  return (
    <div className="w-full flex justify-center items-center py-4 md:py-6">
      <div className="relative">
        {/* Outer glow effect */}
        <div className="absolute inset-0 bg-purple-600/10 blur-2xl rounded-full"></div>
        
        {/* Countdown container */}
        <div className="relative flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-xl px-3 py-3 md:px-5 md:py-4 border border-cyan-500/30">
          <TimeUnit value={timeLeft.days} label="Days" />
          <span className="text-2xl md:text-3xl text-cyan-400 font-bold mx-0.5 [text-shadow:0_0_10px_#00ffff]">:</span>
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <span className="text-2xl md:text-3xl text-cyan-400 font-bold mx-0.5 [text-shadow:0_0_10px_#00ffff]">:</span>
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <span className="text-2xl md:text-3xl text-cyan-400 font-bold mx-0.5 [text-shadow:0_0_10px_#00ffff]">:</span>
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </div>
  );
};