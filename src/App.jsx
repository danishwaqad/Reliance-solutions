import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import "./App.css";

const LEGACY_HASH_TO_PATH = {
  "#features": "/features",
  "#about": "/about",
  "#services": "/services",
  "#portfolio": "/gallery",
  "#testimonials": "/testimonials",
  "#team": "/team",
  "#contact": "/contact",
};

const PATH_TO_SECTION_ID = {
  "/": "page-top",
  "/features": "features",
  "/about": "about",
  "/services": "services",
  "/gallery": "portfolio",
  "/testimonials": "testimonials",
  "/team": "team",
  "/contact": "contact",
};

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const nextPath = LEGACY_HASH_TO_PATH[hash];
    if (nextPath) window.history.replaceState({}, "", nextPath);
  }, []);

  useEffect(() => {
    let scrollJobId = 0;
    const pendingTimers = new Set();

    const clearPendingTimers = () => {
      pendingTimers.forEach((timerId) => clearTimeout(timerId));
      pendingTimers.clear();
    };

    const scrollByPath = () => {
      scrollJobId += 1;
      const currentJobId = scrollJobId;
      clearPendingTimers();
      const sectionId = PATH_TO_SECTION_ID[window.location.pathname] || "page-top";
      const performScroll = () => {
        if (currentJobId !== scrollJobId) return false;
        if (sectionId === "page-top") {
          window.scrollTo({ top: 0, behavior: "auto" });
          if (document.documentElement) document.documentElement.scrollTop = 0;
          if (document.body) document.body.scrollTop = 0;
          if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
          return true;
        }

        const section = document.getElementById(sectionId);
        if (!section) return false;
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      };

      if (performScroll()) return;
      const retryTimerOne = setTimeout(() => {
        pendingTimers.delete(retryTimerOne);
        performScroll();
      }, 100);
      pendingTimers.add(retryTimerOne);
      const retryTimerTwo = setTimeout(() => {
        pendingTimers.delete(retryTimerTwo);
        performScroll();
      }, 250);
      pendingTimers.add(retryTimerTwo);
    };

    const onLocationChange = () => {
      requestAnimationFrame(() => scrollByPath());
    };

    window.addEventListener("locationchange", onLocationChange);
    window.addEventListener("popstate", onLocationChange);
    onLocationChange();

    return () => {
      clearPendingTimers();
      window.removeEventListener("locationchange", onLocationChange);
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  return (
    <div id="page-top">
      <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Gallery data={landingPageData.Gallery} />
      <Testimonials data={landingPageData.Testimonials} />
      <Team data={landingPageData.Team} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default App;
