import React, { useState } from "react";
import styles from "./NavTab.module.css";
import DoubleLeftOutlined from "@ant-design/icons/DoubleLeftOutlined";
import { deliveryStages } from "../../Constant";

function NavTab({
  sideBarToggle,
  sideBarClose,
  setSelectedDeliveryStage,
  selectedDeliveryStage,
  count,
}) {
  return (
    <>
      <div className={styles.navbar_desktop}>
        {deliveryStages.map((stage) => (
          <button
            key={stage.color}
            style={
              JSON.stringify(selectedDeliveryStage) ===
              JSON.stringify(stage.deliveryStages)
                ? {
                    backgroundColor: `${stage.color}`,
                    outline: "2px solid #000466",
                    outlineOffset: "6px",
                  }
                : { backgroundColor: `${stage.color}` }
            }
            onClick={() => setSelectedDeliveryStage(stage.deliveryStages)}
          >
            <p>{stage.name}</p>
            {Number(count[stage.countKey]) > 0 && (
              <label>{count[stage.countKey]}</label>
            )}
          </button>
        ))}
      </div>
      <div
        className={styles.side_menu}
        style={sideBarToggle ? { left: "0px" } : {}}
      >
        {/* <div className="logo">
          <Link to="/">
            <img className="img-fluid" loading="lazy" src={Logo} alt="" />
          </Link>
        </div> */}
        <ul className="menu-left">
          {deliveryStages.map((stage) => (
            <button
              key={stage.color}
              className={styles.orderstage_btn}
              onClick={() => setSelectedDeliveryStage(stage.deliveryStages)}
              style={
                JSON.stringify(selectedDeliveryStage) ===
                JSON.stringify(stage.deliveryStages)
                  ? {
                      backgroundColor: "white",
                      color: "#000466",
                    }
                  : {}
              }
            >
              <p>{stage.name}</p>
              {Number(count[stage.countKey]) > 0 && (
                <div
                  className={styles.count_box}
                  style={{ backgroundColor: `${stage.color}` }}
                >
                  {count[stage.countKey]}
                </div>
              )}
            </button>
          ))}
        </ul>
        <button className={styles.hide_sideMenu_btn} onClick={sideBarClose}>
          <DoubleLeftOutlined />
          <label>Back</label>
        </button>
      </div>
    </>
  );
}

export default NavTab;
