// This file contains all the functions related to cart

//SUB
let createOrderItem = (productId, quantity, price) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:1337/order-items`,
      type: "POST",
      data: {
        "product": +productId,
        "quantity": +quantity,
        "price": +quantity * +price
      },
      success: (result) => resolve(result),
      error: (error) => {
        console.error(error)
        reject("Sorry coudn't create order items, please try again.")
      }
    })
  });
}

let createOrder = (orderItems) => {
  return new Promise((resolve, reject) => {
    let userId = JSON.parse(window.sessionStorage.getItem("userId"));
    console.log(userId)
    $.ajax({
      url: `http://localhost:1337/orders`,
      type: "POST",
      data: {
        "users_permissions_user": userId,
        "order_items": orderItems
      },
      success: (result) => resolve(result),
      error: (error) => {
        console.error(error)
        reject("Sorry coudn't fetch items, please try again.")
      }
    })
  });
}

let placeOrder = () => {
  if(confirm("Are you sure want to proceed?")) {
    getCartDetails().then(cartDetails => {
      if (!cartDetails[0]) throw new Error("placeOrder: There is no cart details found")
      if (!cartDetails[0].cart_items) throw new Error("placeOrder: There is no cart items found")
      let orderItems = cartDetails[0].cart_items.map(item => {
        if (item.product.id) return createOrderItem(item.product.id, item.quantity, item.price).then(result => {
          deleteCartItem(item.id);
          return ({ id: result.id })
        })
        return createOrderItem(item.product, item.quantity, item.price).then(result => {
          deleteCartItem(item.id);
          return ({ id: result.id })
        })
      });
      Promise.all(orderItems).then(orderItemsArray => createOrder(orderItemsArray).then(order => {
        alert("Order placed");
        window.location.href = 'http://localhost:3000/home'
      }));
    })
  }
}
