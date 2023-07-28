import React, { useEffect, useState } from "react";
import "../css/PasswordStrength.css";

const PasswordStrengthMeter = ({ password }) => {
  const [extra_class, set_extra_class] = useState("");

  useEffect(() => {
    let score = 0;

    if (password.length >= 6 && password.length <= 40) {
      score += 1;
    }

    if (/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)) {
      score += 1;
    }

    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_])/.test(password)
    ) {
      score += 1;
    }

    if (score === 0) {
      set_extra_class("");
    } else if (score === 1) {
      set_extra_class("low");
    } else if (score === 2) {
      set_extra_class("medium");
    } else if (score === 3) {
      set_extra_class("strong");
    }
  }, [password]);

  return (
    <>
      <div className="password-strength-meter">
        <div className={"bar " + extra_class}>
          <div className={"red"}></div>
          <div className={"yellow"}></div>
          <div className={"green"}></div>
        </div>
        <button className="button-icon">
          <span className="pi pi-info-circle"></span>
        </button>
      </div>
    </>
  );
};

export default PasswordStrengthMeter;
