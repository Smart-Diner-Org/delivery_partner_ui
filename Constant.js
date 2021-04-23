export const tokenName = "token_deliveryPartner";
export const userName = "userName";
export const deliveryPartnerRoleID = 6;

export const deliveryStages = [
  {
    name: "Requested Delivery",
    countKey: "requestCount",
    deliveryStages: [1],
    type: "fresh",
    color: "#fb8238",
  },
  {
    name: "Ongoing Delivery",
    countKey: "onGoingCount",
    deliveryStages: [2, 4, 6],
    type: "onGoing",
    color: "#ffc009",
  },
  {
    name: "Completed Delivery",
    countKey: "completedCount",
    deliveryStages: [5],
    type: "outForDelivery",
    color: "#08a860",
  },
  {
    name: "Cancelled Delivery",
    countKey: "cancelledCount",
    deliveryStages: [3, 7],
    type: "old",
    color: "#e22a28",
  },
];

export const okText = { 1: "Accept Delivery", 2: "Delivery Completed" };

export const toUpdateDeliveryStage = { 1: 2, 2: 5 };
