// This file contains all the functions related to cart

//SUB
let createCartItem = (productId, quantity, price) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:1337/cart-items`,
        type: "POST",
        data: {
          "product": +productId,
          "quantity": +quantity,
          "price": +quantity * +price
        },
        success: (result) => resolve(result),
        error: (error) => {
          console.error(error)
          reject("Sorry coudn't fetch items, please try again.")
        }
      })
    });
  }
  
  //SUB
  let updateCartItem = (cartItemId, quantity, price) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:1337/cart-items/${cartItemId}`,
        type: "PUT",
        data: {
          "quantity": +quantity,
          "price": +quantity * +price
        },
        success: (result) => resolve(result),
        error: (error) => {
          console.error(error)
          reject("Sorry coudn't update quantity, please try again.")
        }
      })
    });
  }
  
  //SUB
  let deleteCartItem = (cartItemId) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:1337/cart-items/${cartItemId}`,
        type: "DELETE",
        success: (result) => resolve(result),
        error: (error) => {
          console.error(error)
          reject("Sorry coudn't delete cart-items, please try again.")
        }
      })
    });
  }
  
  //SUB
  let updateCart = (cartDetails) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:1337/carts/${cartDetails.id}`,
        type: "PUT",
        data: cartDetails,
        success: (result) => resolve(result),
        error: (error) => {
          console.error(error)
          reject("Sorry coudn't fetch items, please try again.")
        }
      })
    });
  }
  
  //MAIN
  let addItemToCart = (productId, quantity, price, displayCategory) => {
    createCartItem(productId, quantity, price)
      .then(cartItemDetails => {
        getCartDetails
          .then(cartDetails => {
            if (!cartDetails[0]) throw new Error("addItemToCart: There is no cart details found")
            if (!cartDetails[0].cart_items) throw new Error("addItemToCart: There is no cart items found")
            cartDetails[0].cart_items.push(cartItemDetails);
            updateCart(cartDetails[0]).then(result => {
              removeItemsFromDisplay();
              switch (displayCategory) {
                case "allItems":
                  displayAllProducts();
                  break;
                case "quickBites":
                  displayQuickBites();
                  break;
                case "coldDrinks":
                  displayColdDrinks();
                  break;
                case "hotDrinks":
                  displayHotDrinks();
                  break;
                default:
                  throw new Error("There is an error in refetch function")
              }
            })
          })
          .catch(error => console.error(`addItemToCart: ${error}`))
      })
  }
  
  //MAIN
  let removeFromCart = (productId, displayCategory) => {
    getCartDetails
      .then(cartDetails => {
        if (!cartDetails[0]) throw new Error("removeFromCart: There is no cart details found")
        if (!cartDetails[0].cart_items) throw new Error("removeFromCart: There is no cart items found")
        let cartItem = cartDetails[0].cart_items.find(item => {
          if (item.product.id) return item.product.id === productId
          return item.product === productId
        })
        if (!cartItem) throw new Error("removeFromCart: This item is not there in the cart!!")
        if (!cartItem) throw new Error("removeFromCart: There is an error in the cart item details")
        cartDetails[0].cart_items = cartDetails[0].cart_items.filter(item => {
          if (item.product.id) return item.product.id !== productId
          return item.product !== productId
        })
        updateCart(cartDetails[0]).then(cartUpdate => {
          deleteCartItem(cartItem.id).then(cartItemDelete => {
            removeItemsFromDisplay();
            switch (displayCategory) {
              case "allItems":
                displayAllProducts();
                break;
              case "quickBites":
                displayQuickBites();
                break;
              case "coldDrinks":
                displayColdDrinks();
                break;
              case "hotDrinks":
                displayHotDrinks();
                break;
              case "cart":
                displayCart();
                break;
              default:
                throw new Error("There is an error in refetch function")
            }
          })
        })
      })
      .catch(error => console.error(`removeFromCart: ${error}`))
  }
  
  //MAIN
  let updateCartItemQuantity = (cartItemId, quantity, price) => {
    updateCartItem(cartItemId, quantity, price)
    .then(updateResult => updateResult)
  }
  