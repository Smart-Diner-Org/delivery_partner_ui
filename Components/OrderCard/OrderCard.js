import { Modal, Row, Col, Select, notification, Button } from "antd";
import React from "react";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import styles from "./OrderCard.module.css";
import axios from "axios";
import { okText, tokenName, toUpdateDeliveryStage } from "../../Constant";

const { Option } = Select;

function OrderCard({ orderDetail }) {
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
        console.log(resp);
        notification.success({
          message: "Success!",
          description: "Delivery stage updated...!",
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
        title={`Order #${orderDetail.delivery_requests[0].id} details`}
        confirmLoading={confirmLoading}
        okText={okText[orderDetail.delivery_requests[0].delivery_stage_id]}
        footer={
          [5, 3, 7].includes(
            Number(orderDetail.delivery_requests[0].delivery_stage_id)
          ) ? (
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>
          ) : (
            <>
              <Button
                key="back"
                onClick={() => {
                  handleOk(3);
                }}
              >
                Cancel
              </Button>
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
              </Button>
            </>
          )
        }
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
