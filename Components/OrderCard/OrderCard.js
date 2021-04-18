import { Modal, Row, Col, Select, notification, Button } from "antd";
import React from "react";
import styles from "./OrderCard.module.css";
import axios from "axios";
import { okText, tokenName, toUpdateDeliveryStage } from "../../Constant";

const { Option } = Select;

function OrderCard({ orderDetail, fetchData }) {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (stage) => {
    setConfirmLoading(true);
    const data = {
      deliveryRequestStageId: stage,
    };
    axios
      .post(
        `https://testingapi.smartdiner.co/after_login/order/update_delivery_request_stage/${orderDetail.delivery_requests[0].id}`,
        data,
        {
          headers: {
            "x-access-token": `${localStorage.getItem(tokenName)}`,
          },
        }
      )
      .then((resp) => {
        let message =
          stage === 3
            ? "You cancelled delivery request"
            : "Delivery stage updated...!";
        notification.success({
          message: "Success!",
          description: message,
        });
        setConfirmLoading(false);
        handleCancel();
        fetchData();
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
      <div className={styles.ordercard} onClick={showModal}>
        <p>#{orderDetail.id}</p>
        <p>{orderDetail.restuarant_branch.restaurant.name}</p>
        <p>{orderDetail.restuarant_branch.address}</p>
      </div>
      <Modal
        visible={visible}
        title={`Order #${orderDetail.delivery_requests[0].id} details`}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button
            key="back"
            onClick={() =>
              [5, 3, 7].includes(
                Number(orderDetail.delivery_requests[0].delivery_stage_id)
              )
                ? handleCancel()
                : handleOk(3)
            }
          >
            {[5, 3, 7].includes(
              Number(orderDetail.delivery_requests[0].delivery_stage_id)
            )
              ? "Return"
              : "Cancel Delivery"}
          </Button>,
          <Button
            type="primary"
            onClick={() =>
              handleOk(
                toUpdateDeliveryStage[
                  orderDetail.delivery_requests[0].delivery_stage_id
                ]
              )
            }
          >
            {okText[orderDetail.delivery_requests[0].delivery_stage_id]}
          </Button>,
        ]}
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
