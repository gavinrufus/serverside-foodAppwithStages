let createCart = () => {
  return new Promise((resolve, reject) => {
    let userId = JSON.parse(window.sessionStorage.getItem("userId"));
    $.ajax({
      url: `http://localhost:1337/carts`,
      type: "POST",
      data: {
        "users_permissions_user": userId
      },
      success: (result) => resolve(result),
      error: (error) => {
        console.error(error)
        reject("Sorry coudn't fetch items, please try again.")
      }
    })
  });
}

let getCartDetails = () => {
  return new Promise((resolve, reject) => {
    let userId = JSON.parse(window.sessionStorage.getItem("userId"));
    $.ajax({
      url: `http://localhost:1337/carts?users_permissions_user=${userId}`,
      type: "GET",
      success: (result) => resolve(result),
      error: (error) => {
        console.error(error)
        reject("Sorry coudn't fetch cart details, please try again.")
      }
    })
  });
}

let getProductDetails = (params) => {
  return new Promise((resolve, reject) => {
    if (params === '') resolve([]);
    $.ajax({
      url: `http://localhost:1337/products?${params}`,
      type: "GET",
      success: (result) => resolve(result),
      error: (error) => {
        console.error(error)
        reject("Sorry coudn't fetch product details, please try again.")
      }
    })
  });
}

let updateTotal = () => {
  let subTotals = document.getElementsByClassName('subTotal');
  let total = 0;
  Object.values(subTotals).forEach(subTotal => total += +subTotal.innerHTML);
  let totalTable = document.getElementById('total-table'); totalTable.innerHTML = `
  <tr>
    <td>Total</td>
    <td>QAR ${total}</td>
  </tr>
  `;
}

let displayItems = (allItems, displayCategory) => {
  getCartDetails().then(cartDetails => {
    if (!cartDetails[0]) throw new Error("addItemToCart: There is no cart details found")
    if (!cartDetails[0].cart_items) throw new Error("addItemToCart: There is no cart items found")
    let cartItemsArray = cartDetails[0].cart_items.map(item => {
      if (item.product.id) return item.product.id
      return item.product
    });

    if (allItems.length > 0) {
      allItems.forEach(item => {
        let allTable = document.getElementById('all-table')
        let allItem = document.createElement('tr')
        if (cartItemsArray.includes(item.id)) {
          allItem.innerHTML =
            `
          <td id = "${item.product_id}">
              <div class="cart-info">
                  <img src="${item.product_image.url}">
                      <div>
                          <h3>${item.product_name}</h3>
                          <button onclick="removeFromCart(${item.id}, '${displayCategory}')">Remove Item</button>
                      </div>
              </div>
          </td>
          <td id="sub_${item.product_id}">${item.product_price}</td>
          `
        }
        else {
          allItem.innerHTML =
            `
          <td id = "${item.product_id}">
              <div class="cart-info">
                  <img src="${item.product_image.url}">
                      <div>
                          <h3>${item.product_name}</h3>
                          <button class="refetchTrigger" onclick="addItemToCart(${item.id}, 1 , ${item.product_price}, '${displayCategory}')">Add to cart</button>
                      </div>
              </div>
          </td>
          <td id="sub_${item.product_id}">${item.product_price}</td>
          `
        }

        allTable.appendChild(allItem)

      });
    } else {
      let allTable = document.getElementById('all-table');
      allTable.innerHTML = `
      <h5>
        Stay tuned!! We will add products here soon.
      </h5>
      `;
    }
  })
}

let displayCartItems = (cartItems, productToCartMap, quantityMap) => {
  if (cartItems.length > 0) {
    let totalTable = document.getElementById('total-table');
    let totalValue = 0;
    cartItems.forEach(item => {
      totalValue += +quantityMap[item.id] * +item.product_price;
      let cartTable = document.getElementById('cart-table')
      let cartItem = document.createElement('tr')
      cartItem.innerHTML =
        `
      <td id = "${item.product_id}">
          <div class="cart-info">
              <img src="${item.product_image.url}">
                  <div>
                      <h3>${item.product_name}</h3>
                      <small>Price: ${item.product_price}</small><br>
                      <a onClick="removeFromCart(${item.id}, 'cart')">Remove</a>
                  </div>
          </div>
      </td>
      <td><input id="qty_${item.product_id}" type="number" min = "1" value="${quantityMap[item.id]}" onchange="updateCartItemQuantity(${productToCartMap[item.id]}, this.value, ${item.product_price}); updateValue('sub_${item.product_id}', this.value, ${+item.product_price}); updateTotal();" /></td>
      <td id="sub_${item.product_id}" class="subTotal">${+quantityMap[item.id] * +item.product_price}</td>
      `
      cartTable.appendChild(cartItem)
      totalTable.innerHTML = `
      <tr>
        <td>Total</td>
        <td>QAR ${totalValue}</td>
      </tr>
      `;
    });
  } else {
    let cartPage = document.getElementById('cart-page')
    cartPage.innerHTML = `
    <h5>
      Products are going out of stock!!!
    </h5>
    <h5>
      Grab your's soon
    </h5>
    `;
  }
}

let removeItemsFromDisplay = () => {
  let allTable = document.getElementById('all-table');
  let cartTable = document.getElementById('cart-table');
  if (allTable) {
    allTable.innerHTML = `
    <tr>
      <th>Product</th>
      <th>Price</th>
    </tr>
    `;
  }
  if (cartTable) {
    cartTable.innerHTML = `
    <tr>
      <th>Product</th>
      <th>Quantity</th>
      <th>Subtotal</th>
    </tr>
    `;
  }
}

let displayAllProducts = () => {
  getAllProducts.then(products => displayItems(products, "allItems")).catch(error => console.log(error))
}

let displayQuickBites = () => {
  getQuickBites.then(products => displayItems(products, "quickBites")).catch(error => console.log(error))
}

let displayColdDrinks = () => {
  getColdDrinks.then(products => displayItems(products, "coldDrinks")).catch(error => console.log(error))
}

let displayHotDrinks = () => {
  getHotDrinks.then(products => displayItems(products, "hotDrinks")).catch(error => console.log(error))
}

let displayCart = () => {
  getCartDetails().then(cart => {
    let productTOCartItemMap = {};
    let productTOQuantityMap = {};
    let cartItemProductIds = cart[0].cart_items.map(item => {
      if (item.product.id) {
        productTOCartItemMap[item.product.id] = item.id;
        productTOQuantityMap[item.product.id] = item.quantity;
        return `id=${item.product.id}`
      }
      productTOCartItemMap[item.product] = item.id;
      productTOQuantityMap[item.product] = item.quantity;
      return `id=${item.product}`
    })
    getProductDetails(cartItemProductIds.join("&"))
      .then(products => displayCartItems(products, productTOCartItemMap, productTOQuantityMap))

  }).catch(error => console.log(error))
}

let updateValue = (domID, quantity, price) => {
  const element = document.getElementById(domID);
  element.innerHTML = `${quantity * price}`;
}