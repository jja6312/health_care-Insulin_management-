import React from "react";

import MobilePoint from "./mobile/MobilePoint";
import DesktopPoint from "./desktop/DesktopPoint";

const Point = () => {
  return (
    // grid로 1:2:2:2:1 배치
    <div>
      {/* 모바일 */}
      <div className="md:hidden">
        <MobilePoint />
      </div>
      {/* 데스크탑 */}
      <div className="hidden md:flex">
        <DesktopPoint />
      </div>
    </div>
  );
};

export default Point;
