import { useEffect, useState } from "react";
import Prayer from "./components/Prayer";

function App() {
  const [PrayerTimes, SetPrayerTimes] = useState({});
  const [dateTime, SetDateTime] = useState("");
  const [city, SetCity] = useState("Cairo");

  const cities = [
    { name: "القاهرة", value: "Cairo" },
    { name: "الإسكندرية", value: "Alexandria" },
    { name: "بني سويف", value: "Beni Suef" },
    { name: "الجيزة", value: "Giza" },
    { name: "المنصورة", value: "Masoura" },
    { name: "طنطا", value: "Tanta" },
    { name: "الأقصر", value: "Luxor" },
  ];

  useEffect(() => {
    const fetchPrayer = async () => {
      try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/08-02-2025?city=${city}&country=EG`);
        const date_prayer = await response.json();
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        SetPrayerTimes(date_prayer.data.timings);
        SetDateTime(date_prayer.data.date.gregorian.date);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrayer();

    const interval = setInterval(fetchPrayer, 60000); // تحديث كل دقيقة
    return () => clearInterval(interval); // تنظيف عند الخروج
  }, [city]);

  const FormatTime = (time) => {
    if (!time) {
      return "00:00";
    }
    let [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
  };

  return (
    <section>
      <div className="container">
        <div className="top_section">
          <div className="city">
            <h3>المدينة</h3>
            <select onChange={(e) => SetCity(e.target.value)}>
              {cities.map((city) => (
                <option key={city.value} value={city.value}>{city.name}</option>
              ))}
            </select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <h4>{dateTime}</h4>
          </div>
        </div>
        <Prayer name="الفجر" time={FormatTime(PrayerTimes.Fajr)} />
        <Prayer name="الظهر" time={FormatTime(PrayerTimes.Dhuhr)} />
        <Prayer name="العصر" time={FormatTime(PrayerTimes.Asr)} />
        <Prayer name="المغرب" time={FormatTime(PrayerTimes.Maghrib)} />
        <Prayer name="العشاء" time={FormatTime(PrayerTimes.Isha)} />
      </div>
    </section>
  );
}

export default App;