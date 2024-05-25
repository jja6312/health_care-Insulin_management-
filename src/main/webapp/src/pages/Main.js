import React, { useEffect, useState } from "react";
import { getUserInfo } from "../api/getUserInfo";

const Main = () => {
  const [userInfoDTO, setUserInfoDTO] = useState(null);
  useEffect(() => {
    const userInfo = getUserInfo();
    console.log("userInfo", userInfo);
    setUserInfoDTO(userInfo);
  }, []);

  return <div className="dark:bg-dark min-h-screen"></div>;
};

export default Main;
