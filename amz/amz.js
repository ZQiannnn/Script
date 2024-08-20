
const path1 = "getOrderListByCustomerId";
const path2 = "getBatchOrderBasicDetailInfo";
const path3 = "getOrderDetailInfoV1";
const url = $request.url;
const body = $response.body;

if (url.indexOf(path1) != -1) {
    console.log("getOrderListByCustomerId")
    let jsonData = JSON.parse(body);
    let orderIdToRemove = "113-3749629-3000236";
    let orderIdToRemove2 = "113-4875200-3405031";
    jsonData.externalOrderIdList = jsonData.externalOrderIdList.filter(orderId => orderId !== orderIdToRemove
    && orderId !== orderIdToRemove2);
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
    if (jsonData.externalOrderId === "113-9992226-9801051") {
        jsonData.status = "ORDER_STATUS_DELIVERED";
        jsonData.orderStatus = "ORDER_STATUS_DELIVERED";
        jsonData.totalAmount.value = 17444.17
        jsonData.shippingFee.value = 85.68
        jsonData.tax.value = 2269.99
        jsonData.discount.value = -116.05


        jsonData.addressInfo.phoneNumber = "17*****8169"
        jsonData.addressInfo.state = "湖南"
        jsonData.addressInfo.city = "长沙市"
        jsonData.addressInfo.district = "天心区"
        jsonData.addressInfo.addressLine1 = "大托路鑫远·鼎泰坤苑7栋1304"
        jsonData.addressInfo.postalCode = "410011"
        jsonData.addressInfo.addressId = "PKG37W2WZJVFH5JNOLFAG12IWNHLX087MA34M780XLHNWI2PXTQ2EIA2OX4JX3OJ"


        // 修改 itemList 中第一个元素的 shipmentCondition
        if (jsonData.itemList && order.itemList.length > 0) {
            jsonData.itemList[0].shipmentCondition = "DELIVERED";
            jsonData.itemList[0].quantity = 1;
        }
    }
    $done({ body: JSON.stringify(jsonData) });
}

