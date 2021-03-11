import React, { useEffect, useState } from "react";
import Play from "../assets/Play.svg";
import Pause from "../assets/Pause.svg";

function Pomodoro() {
  const [time, setTime] = useState(sessionDurations.workDuration);
  const [isStarted, setIsStarted] = useState(false);
  const [sessionType, setSessionType] = useState("work");

  const computeTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  };

  useEffect(() => {
    if (isStarted) {
      let interval = setInterval(() => setTime(time - 1), 1000);
      if (time === 0) {
        setIsStarted(false);
        setTimeout(() => {
          if (sessionType === "work") {
            setSessionType("break");
            setTime(sessionDurations.breakDuration);
          } else {
            setSessionType("work");
            setTime(sessionDurations.workDuration);
          }
        }, 1000);
      }
      return () => clearInterval(interval);
    }
  }, [isStarted, sessionType, time]);

  return (
    <>
      <div className="Pomodoro">
        <h2 className="pomodoro-header">Pomodoro</h2>
        {/* <h3>{sessionType}</h3> */}
        <p className="time-left">{computeTime(time)}</p>
        <div
          className="controls center-flex"
          // onClick={() => setIsStarted(!isStarted)}
        >
          {isStarted ? (
            <img
              src={Pause}
              alt="pause button"
              className="pointer no-select control"
              key="pause"
              onClick={() => setIsStarted(false)}
            />
          ) : (
            <img
              src={Play}
              alt="play button"
              className="pointer no-select control"
              key="play"
              onClick={() => setIsStarted(true)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Pomodoro;

const sessionDurations = {
  workDuration: 1500,
  breakDuration: 300,
};
