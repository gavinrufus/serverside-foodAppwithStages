export default {
    displayItems = (allItems) => {
        allItems.forEach(item => {
            let allTable = document.getElementById('all-table')
        console.log(allTable)
        let allItem = document.createElement('tr')
        if (sampleCart.includes(item.productId)){
                 allItem.innerHTML = 
        `
        <td id = "${item.productId}">
            <div class="cart-info">
                <img src="${item.imageUrl}">
                    <div>
                        <h3>${item.productName}</h3>
                        <button onclick="removeItem(${item.productId})">Remove Item</button>
                    </div>
            </div>
        </td>
        <td id="sub_${item.productId}">QAR ${item.price}</td>
        `
        }
        else {
                 allItem.innerHTML = 
        `
        <td id = "${item.productId}">
            <div class="cart-info">
                <img src="${item.imageUrl}">
                    <div>
                        <h3>${item.productName}</h3>
                        <button onclick="addItemToCart(${item.productId})">Add to cart</button>
                    </div>
            </div>
        </td>
        <td id="sub_${item.productId}">QAR ${item.price}</td>
        `
        }
    
        allTable.appendChild(allItem)
            
        });
    }
}
