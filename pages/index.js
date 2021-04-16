import Header from "../Components/Header/Header";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import OrderCard from "../Components/OrderCard/OrderCard";
import NavTab from "../Components/NavTab/NavTab";
import axios from "axios";
import { useRouter } from "next/router";
import { notification } from "antd";
import { tokenName } from "../Constant";

const Main = ({ orders }) => {
  return (
    <div className={styles.orderCard_container}>
      {orders.map((order) => (
        <OrderCard key={order.id} orderDetail={order} />
      ))}
    </div>
  );
};

export default function Home() {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const router = useRouter();

  React.useEffect(() => {
    axios
      .get(
        "https://testingapi.smartdiner.co/after_login/delivery_agent/get_all_delivery_requests",
        {
          headers: {
            "x-access-token": `${localStorage.getItem(tokenName)}`,
          },
        }
      )
      .then((resp) => {
        setOrdersLoading(false);
        setOrders(resp.data);
      })
      .catch((err) => {
        notification.error({
          message: "Error! Login Again",
          description: `${err?.response?.data?.message}`,
        });
        router.push("/login");
      });
  }, []);

  return (
    <div className={styles.home}>
      <Header sideBarOpen={() => setSideBarToggle(true)} />
      <NavTab
        sideBarClose={() => setSideBarToggle(false)}
        sideBarToggle={sideBarToggle}
      />
      {ordersLoading ? <div>Loading...</div> : <Main orders={orders} />}
    </div>
  );
}

// export async function getStaticProps() {
//   let data;
//   axios
//     .get(
//       "https://testingapi.smartdiner.co/after_login/delivery_agent/get_all_delivery_requests",
//       {
//         headers: {
//           "x-access-token": `${localStorage.getItem("token")}`,
//         },
//       }
//     )
//     .then((resp) => {
//       console.log(resp.data);
//       data = [{ id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }];
//     })
//     .catch((err) => {
//       console.error(err);
//     });

//   if (!data) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// }
