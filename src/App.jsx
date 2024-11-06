import { useState, useRef } from "react";

export default function App() {
  const [time, setTime] = useState(0); // time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10); // increment by 10 milliseconds
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = (time % 1000) / 10;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(milliseconds).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] gap-5">
      <h1 className="text-9xl">{formatTime(time)}</h1>
      <div className="flex gap-3">
        {isRunning ? (
          <button className="px-4 py-2 border rounded-lg" onClick={stopTimer}>
            Stop
          </button>
        ) : (
          <button className="px-4 py-2 border rounded-lg" onClick={startTimer}>
            Start
          </button>
        )}
        <button className="px-4 py-2 border rounded-lg" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
}
