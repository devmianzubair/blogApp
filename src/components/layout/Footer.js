import React from "react";
import { Link } from "react-router-dom";
import { colors } from "../../Colors";
const Footer = () => {
  var color = colors[Math.floor(Math.random() * colors.length)];
  return (
    <footer className="page-footer" style={{ backgroundColor: `${color}`,bottom: '0px' }}>
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Contact Us</h5>
            <p className="grey-text text-lighten-4">contact via scoial media</p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Links</h5>
            <ul>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://web.facebook.com/mian.zubair.56232938/"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://www.linkedin.com/in/mian-zubair-5ba678207/"
                >
                  LikedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2021 mianmuhammadzubair786@gmail.com
          <Link to="/" className="grey-text text-lighten-4 right">
            PMS (project management system)
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
