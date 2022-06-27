import React, { useEffect, useRef, useState } from "react";
import "./ReservationStatusPage.scss";
import Timer from "../../../../components/timer/Timer.js";
import MyReservationList from "../../../../components/reservation/MyReservationList.js";

function ReservationStatusPage() {
  return (
    <>
      <div className="layout">
        <div className="left">
          <Timer />
          <div className="calendar">달력</div>
        </div>
        <div className="middle">
          <div className="date">시간 선택</div>
          <div className="card">게시물 카드</div>
        </div>

        <div className="right">
          <MyReservationList />
        </div>
      </div>
    </>
  );
}
export default ReservationStatusPage;
