let sampleCart = [10, 16]
let getAllItems = new Promise((resolve,reject) => {
    
    $.ajax({
        url:"http://localhost:1337/products",
        type:"GET",
        success: (result) => resolve(result),
        error: (error) => {
            console.error(error)
            reject ("Sorry coudn't fetch items, please try again.")
        } 
    })
})
let displayItems = (allItems) => {
    allItems.forEach(item => {
        let allTable = document.getElementById('all-table')
    console.log(allTable)
    let allItem = document.createElement('tr')
    if (sampleCart.includes(item.product_id)){
             allItem.innerHTML = 
    `
    <td id = "${item.product_id}">
        <div class="cart-info">
            <img src="..${item.product_image.url}">
                <div>
                    <h3>${item.product_name}</h3>
                    <button onclick="removeItem(${item.product_id})">Remove Item</button>
                </div>
        </div>
    </td>
    <td id="sub_${item.product_id}">QAR ${item.product_price}</td>
    `
    }
    else {
             allItem.innerHTML = 
    `
    <td id = "${item.product_id}">
        <div class="cart-info">
            <img src="..${item.product_image.url}">
                <div>
                    <h3>${item.product_name}</h3>
                    <button onclick="addItemToCart(${item.product_id})">Add to cart</button>
                </div>
        </div>
    </td>
    <td id="sub_${item.product_id}">QAR ${item.product_price}</td>
    `
    }

    allTable.appendChild(allItem)
        
    });
}

getAllItems.then(allproducts => displayItems(allproducts)).catch(error => console.log(error))