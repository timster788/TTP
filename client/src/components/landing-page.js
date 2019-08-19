import React from 'react';
import { Link } from 'react-router-dom';

import Button from './button';


import styles from './styles/landing-page.module.css';

export default function LandingPage(props) {
  return (
    <div>
      <section className="landing">
        <p className="landingLogo">
          
        </p>
        <h2>Welcome to the Stock Port App</h2>
        <p>
          This app will help you to communicate quickly and effortlessly, even
          across language barriers!
        </p>

        <p>
          Emojis are not only fun, they are fantastic time savers, increase
          social power, and are a valuable communication method!
        </p>
        <br />
        <p>Demo UserName: demouser</p>
        <p>Demo Password: demouser</p>

        <Link to="/login" className={styles.buttonLink}>
          <Button label="Start Learning" className="startButton" />
        </Link>
      </section>
    </div>
  );
}