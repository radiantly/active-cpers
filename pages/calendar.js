import MainContainer from "../components/MainContainer.js";
import {
  calendarWrap,
  calendarLoading,
  calendarIframe,
  calendarPlaceholder,
} from "../styles/Calendar.module.css";
import { useState } from "react";

export default function Calendar() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  return (
    <MainContainer title="Calendar">
      <p>Here's a schedule of the upcoming CodeChef and CodeForces contests:</p>
      <div
        className={[calendarWrap, iframeLoaded ? "" : calendarLoading].join(
          " "
        )}
      >
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FKolkata&amp;src=Y2Jmdm1oZmNzcXJyaDNtbjljcTI5MjBlM2dAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=Y29kZWNoZWYuY29tXzNpbGtzZm12NDVhcXIzYXQ5Y2ttOTV0ZDVnQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=azIzajIzM2d0Y3ZhdTdhOHVsazJwMzYwbTRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23616161&amp;color=%23F09300&amp;color=%23D50000&amp;showPrint=0&amp;showTitle=0&amp;title=Active%20CPers"
          scrolling="no"
          className={calendarIframe}
          onLoad={(e) => setIframeLoaded(true)}
        ></iframe>
        <div className={calendarPlaceholder}></div>
      </div>
    </MainContainer>
  );
}
