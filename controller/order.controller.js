const pool = require('../connectDb')
const responseMessage = require('../lib/constant')

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
const orderController = {
    getAll: async (req, res, next) => {
        try {
            const [rows, fields] = await pool.query('select * from user_order')
            res.json({
                status: 'success',
                data: rows
            })

        } catch (error) {
            return next(error)
        }
    },
    getAllProducts: async (req, res, next) => {

        try {
            const user_id = req.user.userId
          
            const [productRows, productFields] = await pool.query('select * from product')
         
            const [orderRows, orderFields] = await pool.query(`select * from user_order where user_id=${user_id}`)
            const updatedProductList = updateProductList(orderRows, productRows)
          
            res.json({
                status: 'success',
                data: updatedProductList
            })

        } catch (error) {
            return next(error)
        }
    },
    
    updateOrder: async (req, res, next) => {
        try {
          const user_id = req.user.userId;
          const { product_id, product_count, status } = req.body;
      
      
          // Select product data
          const [productRows, productFields] = await pool.query(
            `SELECT * FROM product WHERE product_id = ?`,
            [product_id]
          );
      
          if (productRows.length === 0) {
            // Handle case where product doesn't exist
            throw new Error('Product not found');
          }
      
          const productData = productRows[0];
 
          const total_price = product_count * productData.amount;
        
          // Check for existing order for the product
          const [orderDataRows, orderDataFields] = await pool.query(
            `SELECT * FROM user_order WHERE user_id = ? AND product_id = ?`,
            [user_id, product_id]
          );
   
          if (orderDataRows.length === 0 && status!==0) {
            // Insert a new order
            const insertQuery = `
              INSERT INTO user_order (product_id, user_id, product_count, product_price, status, total_price)
              VALUES (?, ?, ?, ?, ?, ?)
            `;
           await pool.query(insertQuery, [
              product_id,
              user_id,
              product_count,
              productData.amount,
              status,
              total_price,
            ]);
          } else if(status===0) {
            await pool.query(`delete from user_order where user_id=${user_id} and product_id=${product_id}`)

          }else{
            // Update existing order
            const updateQuery = `
            UPDATE user_order
            SET status = ?,
                product_count = ?,
                total_price = ?
            WHERE user_id = ?  AND product_id = ?
          `;
             await pool.query(updateQuery, [
              status,
              product_count,
              total_price,
              user_id,
              product_id
            ]);
          }
    
          res.json({
            status: 'success',
            message: responseMessage.UPDATE_ORDER_MESSAGE[status],
          });
        } catch (error) {
          return next(error);
        }
      }
      

}

module.exports = orderController