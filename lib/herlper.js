function updateProductList(orderList, productList) {
    for (const order of orderList) {
        const productIndex = productList.findIndex(product => product.product_id === order.product_id);
       

        if (productIndex !== -1) {
            productList[productIndex].cart = order.status; 
            productList[productIndex].product_count = order.product_count; 

        } else {
            console.warn(`Product with ID ${order.product_id} not found in productList`);
        }
    }
    return productList;
}

module.exports={
    updateProductList
}