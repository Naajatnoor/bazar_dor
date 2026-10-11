"use client";

import { useEffect, useState } from "react";

const BengaliDate = () => {
  const [bengaliDate, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
      const formattedDate = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    }).format(today);

    setDate(formattedDate);
  }, []);
  return (
    <p className="text-sm">
      {bengaliDate}
    </p>
  );
};

export default BengaliDate;

