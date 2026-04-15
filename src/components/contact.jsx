import React from "react";

/* Get In Touch form commented out - no backend. Uncomment when you have EmailJS or another backend. */
// import { useState } from "react";
// import emailjs from "emailjs-com";

// const initialState = { name: "", email: "", message: "" };

export const Contact = (props) => {
  // const [{ name, email, message }, setState] = useState(initialState);
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setState((prevState) => ({ ...prevState, [name]: value }));
  // };
  // const clearState = () => setState({ ...initialState });
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", e.target, "YOUR_PUBLIC_KEY")
  //     .then((result) => { console.log(result.text); clearState(); }, (error) => { console.log(error.text); });
  // };

  const data = props.data || {};
  const quickLinks = [
    { label: "Features", path: "/features", sectionId: "features" },
    { label: "About", path: "/about", sectionId: "about" },
    { label: "Services", path: "/services", sectionId: "services" },
    { label: "Gallery", path: "/gallery", sectionId: "portfolio" },
    { label: "Contact", path: "/contact", sectionId: "contact" },
  ];

  const handleQuickLinkClick = (event, item) => {
    event.preventDefault();
    window.history.pushState({}, "", item.path);
    window.dispatchEvent(new Event("locationchange"));
  };

  return (
    <div>
      {/* Contact info only - no form (backend not connected) */}
      <div id="contact">
        <div className="container">
          <div className="section-title">
            <h2>Contact</h2>
            <p>Reach out to us for inquiries and support.</p>
          </div>
          <div className="row contact-info-row">
            <div className="col-md-4 contact-item">
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              <h3>Address</h3>
              <p>{data.address || "—"}</p>
            </div>
            <div className="col-md-4 contact-item">
              <i className="fa fa-phone" aria-hidden="true"></i>
              <h3>Phone</h3>
              <p>{data.phone || "—"}</p>
            </div>
            <div className="col-md-4 contact-item">
              <i className="fa fa-envelope-o" aria-hidden="true"></i>
              <h3>Email</h3>
              <p>{data.email || "—"}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="social">
                <ul>
                  <li>
                    <a href={data.facebook || "https://facebook.com"} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={data.twitter || "https://twitter.com"} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href={data.youtube || "https://youtube.com"} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Get In Touch form - commented out (no backend). Uncomment when ready. */}
      {/* <div className="col-md-8">
        <div className="section-title">
          <h2>Get In Touch</h2>
          <p>Please fill out the form below to send us an email.</p>
        </div>
        <form name="sentMessage" validate onSubmit={handleSubmit}>
          ...
        </form>
      </div> */}

      {/* Footer - professional portfolio style */}
      <footer id="footer">
        <div className="footer-bg">
          <div className="container">
            <div className="row footer-content">
              <div className="col-md-4 footer-brand">
                <h3>Reliance Solution</h3>
                <p>Professional solutions tailored to your business needs.</p>
              </div>
              <div className="col-md-2 footer-links">
                <h4>Quick Links</h4>
                <ul>
                  {quickLinks.map((item) => (
                    <li key={item.path}>
                      <a
                        href={item.path}
                        onClick={(event) => handleQuickLinkClick(event, item)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-md-3 footer-contact">
                <h4>Contact</h4>
                <p className="footer-address"><i className="fa fa-map-marker"></i> {(data.address || "—").replace(/\s+(\d{5}(-\d{4})?)\s*$/, "\u00a0$1")}</p>
                <p><i className="fa fa-phone"></i> {data.phone || "—"}</p>
                <p><i className="fa fa-envelope-o"></i> {data.email || "—"}</p>
              </div>
              <div className="col-md-3 footer-social">
                <h4>Follow Us</h4>
                <ul>
                  <li><a href={data.facebook || "https://facebook.com"} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fa fa-facebook"></i></a></li>
                  <li><a href={data.twitter || "https://twitter.com"} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fa fa-twitter"></i></a></li>
                  <li><a href={data.youtube || "https://youtube.com"} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fa fa-youtube"></i></a></li>
                </ul>
              </div>
            </div>
            <div className="row footer-bottom">
              <div className="col-md-12 text-center">
                <p className="copyright">&copy; {new Date().getFullYear()} Reliance Solutions. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
