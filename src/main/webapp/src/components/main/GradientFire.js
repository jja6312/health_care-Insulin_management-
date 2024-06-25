import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

const GradientFire = () => {
  return (
    <div className="relative inline-block text-4xl">
      <FontAwesomeIcon className="text-4xl text-red-400 " icon={faFire} />
    </div>
  );
};

export default GradientFire;
