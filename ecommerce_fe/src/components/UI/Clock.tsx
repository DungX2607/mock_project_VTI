import React, { useEffect, useState } from "react";
import "../../styles/Clock.scss";
const Clock = () => {
  const [days, setDays] = useState<number>();
  const [hours, setHours] = useState<number>();
  const [minutes, setMinutes] = useState<number>();
  const [seconds, setSeconds] = useState<number>();
  let interval: NodeJS.Timeout;

  const countDown = () => {
    const destination = new Date("Jan 30, 2024").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const different = destination - now;
      const day = Math.floor(different / (1000 * 60 * 60 * 24));
      const hour = Math.floor(
        (different % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minute = Math.floor((different % (1000 * 60 * 60)) / (1000 * 60));
      const second = Math.floor((different % (1000 * 60)) / 1000);

      if (destination < 0 ){
        clearInterval(interval);
        setDays(0);
        setHours(0);
        setSeconds(0);
        setMinutes(0);
        
      } 
      else {
        setDays(day);
        setHours(hour);
        setMinutes(minute);
        setSeconds(second);
      }
    });
  };

  useEffect(()=>{
    countDown();
  },[]);

  return (
    <div className="clock__wrapper d-flex align-items-center gap-3">
      <div className="clock__data d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="text-white fs-3 mb-2">{days}</h1>
          <h5 className="text-white fs-6">Days</h5>
        </div>
        <span className="text-white fs-3">:</span>
      </div>

      <div className="clock__data d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="text-white fs-3 mb-2">{hours}</h1>
          <h5 className="text-white fs-6">Hours</h5>
        </div>
        <span className="text-white fs-3">:</span>
      </div>

      <div className="clock__data d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="text-white fs-3 mb-2">{minutes}</h1>
          <h5 className="text-white fs-6">Minutes</h5>
        </div>
        <span className="text-white fs-3">:</span>
      </div>

      <div className="clock__data d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="text-white fs-3 mb-2">{seconds}</h1>
          <h5 className="text-white fs-6">Seconds</h5>
        </div>
      </div>
    </div>
  );
};

export default Clock;
