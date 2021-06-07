export default{
    getAllProducts = () => {
        $.ajax({
            url:"http://localhost:1337/products",
            type:"GET",
            success: (result) => result ,
            error: (error) => {
                console.error(error)
                return "Sorry coudn't fetch items, please try again."
            } 
        })
    },  

    getQuickBites = () => {
        $.ajax({
            url:"http://localhost:1337/products?product_category=quickbites",
            type:"GET",
            success: (result) => result ,
            error: (error) => {
                console.error(error)
                return "Sorry coudn't fetch items, please try again."
            } 
        })
    }
}

