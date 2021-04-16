import React, { useState } from "react";
import styles from "./NavTab.module.css";
import DoubleLeftOutlined from "@ant-design/icons/DoubleLeftOutlined";

const deliveryStages = [
  {
    name: "Requested Delivery",
    count: 12,
    orderStages: [1],
    type: "fresh",
    color: "#fb8238",
  },
  {
    name: "Ongoing Delivery",
    count: 32,
    orderStages: [2, 3, 4, 5],
    type: "onGoing",
    color: "#ffc009",
  },
  {
    name: "Completed Delivery",
    count: 1,
    orderStages: [6],
    type: "outForDelivery",
    color: "#08a860",
  },
  {
    name: "Cancelled Delivery",
    count: 24,
    orderStages: [7, 8, 9],
    type: "old",
    color: "#e22a28",
  },
];

function NavTab({sideBarToggle,sideBarClose}) {
  return (
    <>
      <div className={styles.navbar_desktop}>
        {deliveryStages.map((stage) => (
          <button style={{ backgroundColor: `${stage.color}` }}>
            <p>{stage.name}</p>
            {Number(stage.count) > 0 ? <label>{stage.count}</label> : ""}
          </button>
        ))}
      </div>
      <div className={styles.side_menu} style={sideBarToggle?{ left: "0px" }:{}}>
        {/* <div className="logo">
          <Link to="/">
            <img className="img-fluid" loading="lazy" src={Logo} alt="" />
          </Link>
        </div> */}
        <ul className="menu-left">
          {deliveryStages.map((stage) => (
            <button className={styles.orderstage_btn}>
              <p>{stage.name}</p>
              {Number(stage.count) > 0 && (
                <div
                  className={styles.count_box}
                  style={{ backgroundColor: `${stage.color}` }}
                >
                  {stage.count}
                </div>
              )}
            </button>
          ))}
        </ul>
        <button
          className={styles.hide_sideMenu_btn}
          onClick={sideBarClose}
        >
          <DoubleLeftOutlined />
          <label>Back</label>
        </button>
      </div>
    </>
  );
}

export default NavTab;
