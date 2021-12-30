const fs = require("fs");
const {establishments, products, categories} = require("./data.json");

let outPutData = {};
let avgs = [];
let establishmentsObjects = [];

establishments.forEach( establishment => {
    let establishmentObject = {};
    establishmentObject[establishment.name] = {};
    establishmentObject[establishment.name]["avgPrice"] = "";
    let sumOfProducts = 0;

    products.forEach( product => {
        if(establishment.productsId.includes(product.id)){
            sumOfProducts += Number(product.price/100);
        }
        categories.forEach( category => {
            if(establishment.productsId.includes(product.id) && product.categoriesId.includes(category.id)){
                if(!Object.keys(establishmentObject[establishment.name]).includes(category.name)){
                    establishmentObject[establishment.name][category.name] = {};
                }
                establishmentObject[establishment.name][category.name][product.name] = { "price" : (product.price/100).toFixed(2) };
            }     
        })                
    }) 

    let calAvgPrice = (sumOfProducts/establishment.productsId.length).toFixed(2);
    avgs.push(Number(calAvgPrice));
    establishmentObject[establishment.name]["avgPrice"] = calAvgPrice;
    establishmentsObjects.push(establishmentObject);

})

establishmentsObjects.sort(function(a, b){
    let chaveA = Object.keys(a)
    let chaveB = Object.keys(b)
   
    if(a[chaveA].avgPrice < b[chaveB].avgPrice) return -1;
    if(a[chaveA].avgPrice  > b[chaveB].avgPrice) return 1;
    return 0;
})

establishmentsObjects.reverse();

establishmentsObjects.forEach( function( establishmentData ){

    outPutData = Object.assign(outPutData, establishmentData);
  
})

outPutData = JSON.stringify(outPutData, null, 3);

fs.writeFile("novoJson.json", outPutData, (erro)=>{
    if(erro) throw erro;
    console.log("Arquivo json gerado com sucesso!");
})