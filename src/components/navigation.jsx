import React, { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Home", path: "/", sectionId: "page-top" },
  { label: "Features", path: "/features", sectionId: "features" },
  { label: "About", path: "/about", sectionId: "about" },
  { label: "Services", path: "/services", sectionId: "services" },
  { label: "Gallery", path: "/gallery", sectionId: "portfolio" },
  { label: "Testimonials", path: "/testimonials", sectionId: "testimonials" },
  { label: "Team", path: "/team", sectionId: "team" },
  { label: "Contact", path: "/contact", sectionId: "contact" },
];

export const Navigation = (props) => {
  const getActiveFromPath = () => window.location.pathname || "/";
  const [activePath, setActivePath] = useState(getActiveFromPath());

  const handleNavClick = (event, item) => {
    event.preventDefault();
    window.history.pushState({}, "", item.path);
    window.dispatchEvent(new Event("locationchange"));
    setActivePath(item.path);
  };

  useEffect(() => {
    const syncActivePath = () => setActivePath(getActiveFromPath());
    window.addEventListener("locationchange", syncActivePath);
    window.addEventListener("popstate", syncActivePath);
    syncActivePath();
    return () => {
      window.removeEventListener("locationchange", syncActivePath);
      window.removeEventListener("popstate", syncActivePath);
    };
  }, []);

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a
            className="navbar-brand page-scroll"
            href="/"
            onClick={(event) => handleNavClick(event, NAV_ITEMS[0])}
          >
            <img
              src="/img/reliance-icon.jpg"
              alt="Reliance Solution"
              className="navbar-brand-icon"
            />
            Reliance Solution
          </a>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.label}
                className={activePath === item.path ? "active" : ""}
              >
                <a
                  href={item.path}
                  className="page-scroll"
                  onClick={(event) => handleNavClick(event, item)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
