import React from "react";

import {Link} from "react-router-dom";

import styles from "./404.module.scss";

export const ErrorPage = () => {
  return (
    <section className={styles["error-body"]}>
      <video
        preload="auto"
        className={styles.background}
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/396624/err.mp4"
        autoPlay
        muted
        loop
      ></video>
      <div className={styles.message}>
        <h1 data-t="404">404</h1>
        <div className={styles.bottom}>
          <p>You have lost your way</p>
          <Link to={"/home"} >
            return home
          </Link>
        </div>
      </div>
    </section>
  );
};

