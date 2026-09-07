import { useEffect, useState } from "react";

function Timer({ durationMinutes, onTimeUp }) {
  const durationInSeconds = durationMinutes * 60;

  const [endTime] = useState(() => Date.now() + durationInSeconds * 1000);

  const [remainingSeconds, setRemainingSeconds] = useState(
    durationInSeconds
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.ceil((endTime - Date.now()) / 1000)
      );

      setRemainingSeconds(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        onTimeUp();
      }
    }, 250);

    return () => clearInterval(timer);
  }, [endTime, onTimeUp]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  const isCritical = remainingSeconds <= 60;

  return (
    <div className={`timer ${isCritical ? "timer-critical" : ""}`}>
      <span className="timer-label">Time Left</span>

      <span className="timer-value">
        {formattedMinutes}:{formattedSeconds}
      </span>
    </div>
  );
}

export default Timer;