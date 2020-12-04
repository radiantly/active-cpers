import MainContainer from "../components/MainContainer.js";
import {
  calendar,
  invisible,
  calendarloading,
} from "../styles/Home.module.css";
import { useState } from "react";

export default function Calendar() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  return (
    <MainContainer title="Calendar">
      <p>
        Here's a schedule of the upcoming contests that we plan to participate
        in:
      </p>
      <div className={`${calendarloading} ${iframeLoaded ? invisible : ""}`}>
        Calendar is loading...
      </div>
      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FKolkata&amp;src=Y2Jmdm1oZmNzcXJyaDNtbjljcTI5MjBlM2dAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23616161&amp;showPrint=0&amp;showTitle=0&amp;showTabs=0&amp;showCalendars=0"
        scrolling="no"
        className={calendar}
        onLoad={(e) => setIframeLoaded(true)}
      ></iframe>
    </MainContainer>
  );
}
