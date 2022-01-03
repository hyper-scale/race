import React, { useEffect } from "react";

function CountdownElem({ value, label }: any) {
  return (
    <div className="flex flex-col w-28 h-20 justify-center items-center shadow-md rounded-md">
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

function Countdown({ until, paused }: any) {
  // Update the countdown every 1 second
  const [timeLeft, setTimeLeft] = React.useState<number>(until - Number(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(until - Number(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, [until]);

  if (paused) {
    return (
      <div className="flex-1 flex pb-12 h-10 flex-row justify-end space-x-10 md:flex-row p-5">
        <h2 className="text-4xl font-extrabold text-gray-900">DAO Race Paused</h2>
      </div>
    );
  }

  // Get component parts
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="flex flex-col">
      <div className="flex-1 flex flex-row justify-end space-x-2">
        <CountdownElem value={days} label={days === 1 ? "Day" : "Days"} />
        <CountdownElem value={hours} label={hours === 1 ? "Hour" : "Hours"} />
        <CountdownElem value={minutes} label={minutes === 1 ? "Minute" : "Minutes"} />
        <CountdownElem value={seconds} label={seconds === 1 ? "Second" : "Seconds"} />
      </div>
      <p className="text-right text-gray-500 text-sm mt-2 p-2">Until next funding round</p>
    </div>
  );
}

function getNextDate(epoch: Date, intervalDays: number, currentDate: Date) {
  // XXX: This loop is silly - should be refactored to use some kind of modulus of the epoch
  const nextRace: Date = new Date(epoch);
  nextRace.setDate(nextRace.getDate() + intervalDays);
  while (nextRace < currentDate) {
    nextRace.setDate(nextRace.getDate() + intervalDays);
  }
  return nextRace;
}

function DaoRaceCountdown() {
  const epoch: Date = React.useMemo(() => new Date(process.env.NEXT_PUBLIC_DAO_RACE_EPOCH!), []);
  const intervalDays: number = React.useMemo(() => parseInt(process.env.NEXT_PUBLIC_DAO_RACE_INTERVAL_DAYS!), []);
  // Make sure rollovers work
  const [nextRaceAt, setNextRaceAt] = React.useState<Date>(getNextDate(epoch, intervalDays, new Date()));
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

  return <Countdown until={nextRaceAt} paused={nextRaceAt != null} />;
}

export default DaoRaceCountdown;
