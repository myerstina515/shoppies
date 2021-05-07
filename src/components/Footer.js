import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faLinkedin,
  faReact
} from "@fortawesome/free-brands-svg-icons";
import { AppBar } from '@material-ui/core';


const Footer = () => {
  return (
    <>
      <AppBar position="fixed" color="primary" id="footer">
        <p id="footer">Created by Tina Myers
          <a id="links" href="mailto:myers.tina515@gmail.com">Contact Me!</a>
        </p>
        <div id="social-container">
          <a id="icon" href="https://github.com/myerstina515"
            className="github social">
            <FontAwesomeIcon icon={faGithub} color="black" size="2x" />
          </a>
          <a id="icon" href="https://www.linkedin.com/in/tinalmyers/"
            className="Linkedin social">
            <FontAwesomeIcon icon={faLinkedin} color="black" size="2x" />
          </a>
          <a id="icon" href="https://tina-myers-portfolio.netlify.app/"
            className="portfolio social">
            <FontAwesomeIcon icon={faReact} size="2x" color="black"/>
          </a>
        </div>
        <p></p>
      </AppBar>
    </>
  )
}
export default Footer;