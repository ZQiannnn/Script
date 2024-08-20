
const path1 = "getOrderListByCustomerId";
const path2 = "getBatchOrderBasicDetailInfo";
const path3 = "getOrderDetailInfoV1";
const url = $request.url;
const body = $response.body;

if (url.indexOf(path1) != -1) {
    console.log("getOrderListByCustomerId")
    let jsonData = JSON.parse(body);
    let orderIdToRemove = "113-3749629-3000236";
    jsonData.externalOrderIdList = jsonData.externalOrderIdList.filter(orderId => orderId !== orderIdToRemove);
    // 更新订单总数
    jsonData.totalOrderCount = jsonData.externalOrderIdList.length;
    $done({ body: JSON.stringify(jsonData) });
}

if (url.indexOf(path2) != -1) {
    console.log("getBatchOrderBasicDetailInfo")
    let jsonData = JSON.parse(body);
    jsonData.orderDetailModelList.forEach(order => {
        if (order.externalOrderId === "113-9992226-9801051") {
            // 修改状态
            order.status = "ORDER_STATUS_DELIVERED";
            order.orderStatus = "ORDER_STATUS_DELIVERED";
            order.totalAmount.value = 17444.17

            // 修改 itemList 中第一个元素的 shipmentCondition
            if (order.itemList && order.itemList.length > 0) {
                order.itemList[0].shipmentCondition = "DELIVERED";
                order.itemList[0].quantity = 1;
            }
        }
    });
    $done({ body: JSON.stringify(jsonData) });
}

if (url.indexOf(path3) != -1) {
    console.log("getOrderDetailInfoV1")
    let jsonData = JSON.parse(body);
    if (order.externalOrderId === "113-9992226-9801051") {
        order.status = "ORDER_STATUS_DELIVERED";
        order.orderStatus = "ORDER_STATUS_DELIVERED";
        order.totalAmount.value = 17444.17
        order.shippingFee.value = 85.68
        order.tax.value = 2269.99
        order.discount.value = -116.05

        // 修改 itemList 中第一个元素的 shipmentCondition
        if (order.itemList && order.itemList.length > 0) {
            order.itemList[0].shipmentCondition = "DELIVERED";
        }
    }
    $done({ body: JSON.stringify(jsonData) });
}

