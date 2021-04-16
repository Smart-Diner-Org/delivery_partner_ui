import { Modal, Row, Col, Select, notification } from "antd";
import React from "react";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import styles from "./OrderCard.module.css";
import axios from "axios";
import { tokenName } from "../../Constant";

const { Option } = Select;

function OrderCard({ orderDetail }) {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    axios
      .post(
        `https://testingapi.smartdiner.co/after_login/order/accept_delivery/${orderDetail.delivery_requests[0].id}`,
        "",
        {
          headers: {
            "x-access-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTYxODU4ODUzNiwiZXhwIjoxNjE4Njc0OTM2fQ.sJ6m1brClqmq0k0OrIxcqr2U7lh7QUixqQSV1DzqpT0`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        notification.success({
          message: "Success!",
          description: "Order Accepted",
        });
        setConfirmLoading(false);
        handleCancel();
      })
      .catch((err) => {
        notification.error({
          message: "Error!",
          description: `${err?.response?.data?.message}`,
        });
        setConfirmLoading(false);
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <div className={styles.ordercard}>
        <p>#{orderDetail.delivery_requests[0].id}</p>
        <p>{orderDetail.restuarant_branch.restaurant.name}</p>
        <p>{orderDetail.restuarant_branch.address}</p>
        <PrimaryButton name={"View"} onClick={showModal} />
      </div>
      <Modal
        visible={visible}
        onOk={handleOk}
        title="Order #191 details"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Accept"
      >
        <Row>
          <Col span={8}>PickUp Location :</Col>
          <Col span={16}>
            <p>{orderDetail.restuarant_branch.restaurant.name}</p>
            <p>{orderDetail.restuarant_branch.address}</p>
            <p>+91 {orderDetail.restuarant_branch.contact_number}</p>
          </Col>
        </Row>
        <Row>
          <Col span={8}>Delivery Location :</Col>
          <Col span={16}>
            <p>{orderDetail.customer.name}</p>
            <p>{orderDetail.delivery_address_one}</p>
            <p>{orderDetail.delivery_address_two}</p>
            <p>+91 {orderDetail.customer.mobile}</p>
          </Col>
        </Row>
        <Row>
          <Col span={8}>Delivery Person :</Col>
          <Col span={16}>
            <Select defaultValue="John">
              <Option value="John">John</Option>
              <Option value="Smith">Smith</Option>
              <Option value="Elba">Elba</Option>
            </Select>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default OrderCard;
