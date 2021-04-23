import Header from "../Components/Header/Header";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import OrderCard from "../Components/OrderCard/OrderCard";
import NavTab from "../Components/NavTab/NavTab";
import axios from "axios";
import { useRouter } from "next/router";
import { notification, Spin } from "antd";
import { tokenName } from "../Constant";

const Main = ({ orders, selectedDeliveryStage, fetchData }) => {
  return (
    <div className={styles.orderCard_container}>
      {orders.map((order) => {
        if (
          selectedDeliveryStage.includes(
            Number(order?.delivery_requests[0].delivery_stage_id)
          )
        ) {
          return (
            <OrderCard
              key={order.id}
              orderDetail={order}
              fetchData={fetchData}
            />
          );
        }
      })}
    </div>
  );
};

export default function Home() {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [selectedDeliveryStage, setSelectedDeliveryStage] = useState([1]);
  const [count, setCount] = useState({
    requestCount: 1,
    onGoingCount: 0,
    completedCount: 0,
    cancelledCount: 0,
  });
  const router = useRouter();

  React.useEffect(() => {
    const getCookie = document.cookie;
    const accessToken = getCookie?.split("=");
    if (accessToken && accessToken[0] === "domainRedirectPass") {
      localStorage.setItem(tokenName, accessToken[1]);
    }
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_DB_BASE_URL}/after_login/delivery_agent/get_all_delivery_requests`,
        {
          headers: {
            "x-access-token": `${localStorage.getItem(tokenName)}`,
          },
        }
      )
      .then((resp) => {
        setOrdersLoading(false);
        setOrders(resp.data);
        calculateCount(resp.data);
      })
      .catch((err) => {
        notification.error({
          message: "Error! Login Again",
          description: `${err?.response?.data?.message}`,
        });
        router.push("/login");
      });
  };

  const calculateCount = (orders) => {
    let requestCount = 0;
    let onGoingCount = 0;
    let completedCount = 0;
    let cancelledCount = 0;
    orders.map((order) => {
      if ([1].includes(Number(order.delivery_requests[0].delivery_stage_id))) {
        requestCount = requestCount + 1;
      } else if (
        [2, 4, 6].includes(Number(order.delivery_requests[0].delivery_stage_id))
      ) {
        onGoingCount = onGoingCount + 1;
      } else if (
        [5].includes(Number(order.delivery_requests[0].delivery_stage_id))
      ) {
        completedCount = completedCount + 1;
      } else if (
        [3, 7].includes(Number(order.delivery_requests[0].delivery_stage_id))
      ) {
        cancelledCount = cancelledCount + 1;
      }
    });

    setCount({
      requestCount: requestCount,
      onGoingCount: onGoingCount,
      completedCount: completedCount,
      cancelledCount: cancelledCount,
    });
  };

  return (
    <div className={styles.home}>
      <Header sideBarOpen={() => setSideBarToggle(true)} />
      <NavTab
        sideBarClose={() => setSideBarToggle(false)}
        sideBarToggle={sideBarToggle}
        selectedDeliveryStage={selectedDeliveryStage}
        setSelectedDeliveryStage={setSelectedDeliveryStage}
        count={count}
      />
      {ordersLoading ? (
        <Spin size="large" style={{ marginTop: "30%", marginLeft: "50%" }} />
      ) : (
        <Main
          orders={orders}
          fetchData={fetchData}
          selectedDeliveryStage={selectedDeliveryStage}
        />
      )}
    </div>
  );
}
