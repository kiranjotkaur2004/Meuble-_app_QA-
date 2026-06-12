import React from "react";
import style from "./Footer.module.css";
import { Popover } from "antd";

import { Link } from "react-router-dom";

export default function Footer() {
  const conten = (
    <div>
      <p>About Meuble</p>
    </div>
  );
  const content = (
    <div>
      <p>Contact to Meuble</p>
    </div>
  );
  const contents = (
    <div>
      <p>Secured Privacy Policy</p>
    </div>
  );
  return (
    <div className={style.footerback} style={{ minHeight: "20vh" }}>
      <div className="fw-bold d-flex align-items-center justify-content-center pt-5">
        All Rights Reserved &copy; MEUBLE
      </div>
      <div className="fw-bold p-4 d-flex align-items-center justify-content-center pt-2">
        <>
          <Popover content={conten}>
            <Link className={` ${style.footerbacka}`} to="/about">
              About_us |
            </Link>
          </Popover>
          <Popover content={content}>
            <Link className={` ${style.footerbacka}`} to="/contact">
              Contact_us |
            </Link>
          </Popover>
          <Popover content={contents}>
            <Link className={` ${style.footerbacka}`} to="/privacypolicy">
              Privacy_Policy
            </Link>
          </Popover>
        </>
      </div>
    </div>
  );
}
