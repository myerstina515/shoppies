import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faLinkedin,
  faReact
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <>
      <footer>
        <hr />
        <p id="footer">Tina Myers &copy; 2021
          <a href="mailto:myers.tina515@gmail.com">Contact Me!</a>
        </p>
        <div id="social-container">
          <a id="icon" href="https://github.com/myerstina515"
            className="github social">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a id="icon" href="https://www.linkedin.com/in/tinalmyers/"
            className="Linkedin social">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a id="icon" href="https://tina-myers-portfolio.netlify.app/"
            className="portfolio social">
            <FontAwesomeIcon icon={faReact} size="2x" />
          </a>
        </div>
      </footer>
    </>
  )
}
export default Footer;