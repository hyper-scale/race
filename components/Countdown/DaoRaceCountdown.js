import React, { useEffect, useState, useMemo } from "react";

function CountdownElem({ value, label }) {
  return (
    <div className="flex flex-col w-28 h-20 justify-center items-center shadow-md rounded-md">
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

function Countdown({ until }) {
  // Update the countdown every 1 second
  const [timeLeft, setTimeLeft] = useState(until - new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(until - new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [until]);

  // Get component parts
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="flex-1 flex flex-row justify-end space-x-2">
      <CountdownElem value={days} label={days === 1 ? "Day" : "Days"} />
      <CountdownElem value={hours} label={hours === 1 ? "Hour" : "Hours"} />
      <CountdownElem value={minutes} label={minutes === 1 ? "Minute" : "Minutes"} />
      <CountdownElem value={seconds} label={seconds === 1 ? "Second" : "Seconds"} />
    </div>
  );
}

function getNextDate(epoch, intervalDays, currentDate) {
  // XXX: This loop is silly - should be refactored to use some kind of modulus of the epoch
  const nextRace = new Date(epoch);
  nextRace.setDate(nextRace.getDate() + intervalDays);
  while (nextRace < currentDate) {
    nextRace.setDate(nextRace.getDate() + intervalDays);
  }
  return nextRace;
}

function DaoRaceCountdown() {
  const epoch = useMemo(() => new Date(process.env.NEXT_PUBLIC_DAO_RACE_EPOCH), []);
  const intervalDays = useMemo(() => parseInt(process.env.NEXT_PUBLIC_DAO_RACE_INTERVAL_DAYS, 10), []);

  // Make sure rollovers work
  const [nextRaceAt, setNextRaceAt] = useState(getNextDate(epoch, intervalDays, new Date()));
  useEffect(() => {
    // XXX: This is firing way more often than we need it to be - should just be on date rollovers
    const interval = setInterval(() => {
      // Don't unnecessarily update
      const candidate = getNextDate(epoch, intervalDays, new Date());
      if (+candidate !== +nextRaceAt) {
        setNextRaceAt(candidate);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [epoch, intervalDays, nextRaceAt]);

  return <Countdown until={nextRaceAt} />;
}

export default DaoRaceCountdown;
