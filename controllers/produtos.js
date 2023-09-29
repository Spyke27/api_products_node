const products = require('../bancodedados/produtos')
const { getCityFromZipcode, getStateFromZipcode, getPackageDescriptionNpm } = require('utils-playground')

//GET ALL PRODUCTS
const getProducts = (req, res) => {
    res.status(200).json(products)
}
//GET PRODUCT BY ID
const getProduct = (req, res) => {
    const { id } = req.params

    const product = products.find(product => product.id === Number(id))

    if(product){
        return res.status(200).json(product)
    } else {
        return res.status(404).json("Product not found")
    }
}
//CALCULATE FREIGHT
const getfreight = async (req, res) => {
    const { id, cep } = req.params
    const product = products.find(product => product.id === Number(id))
    let priceFreight = 0

    if(!product){
        return res.status(404).json("Product not found")
    }

    try {
        const UF = await getStateFromZipcode(cep)
        if(UF == "BA" || UF == "SE" || UF == "AL" || UF == "PB" || UF == "PE"){
            priceFreight = product.valor*0.1
        } 
        else if(UF == "RJ" || UF == "SP"){
            priceFreight = product.valor*0.15
        } 
        else {
            priceFreight = product.valor*0.12
        }
        //if to found product, return infos
        if(product){
        return res.status(200).json({
            product,
            "Estado": UF,
            "Frete": priceFreight
            })
        }
    } catch(err){
        return res.status(400).json(`Error: ${err.message}`)
    }
    
}

module.exports = {
    getProducts,
    getProduct,
    getfreight
}