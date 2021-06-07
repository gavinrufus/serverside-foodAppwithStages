getAllProducts = new Promise((resolve,reject) => {
  $.ajax({
    url: "http://localhost:1337/products",
    type: "GET",
    success: (result) => resolve(result),
    error: (error) => {
      console.error(error)
      reject ("Sorry coudn't fetch all products, please try again.")
    }
  })
})

getQuickBites = new Promise((resolve,reject) => {
  $.ajax({
    url: "http://localhost:1337/products?product_category=quickbites",
    type: "GET",
    success: (result) => resolve(result),
    error: (error) => {
      console.error(error)
      reject ("Sorry coudn't fetch quick bites, please try again.")
    }
  })
})

getColdDrinks = new Promise((resolve,reject) => {
  $.ajax({
      url:"http://localhost:1337/products?product_category=colddrinks",
      type:"GET",
      success: (result) => resolve(result),
      error: (error) => {
          console.error(error)
          reject ("Sorry coudn't cold drinks, please try again.")
      }
  })
})

let getHotDrinks = new Promise((resolve,reject) => {

  $.ajax({
      url:"http://localhost:1337/products?product_category=hotdrinks",
      type:"GET",
      success: (result) => resolve(result),
      error: (error) => {
          console.error(error)
          reject ("Sorry coudn't fetch items, please try again.")
      }
  })
})
