const fs = require("fs");
const {establishments, products, categories} = require("./data.json");

var outPutData = {};
var avgs = [];
var establishmentsObjects = [];

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
                    establishmentObject[establishment.name][category.name] = {}
                }
                establishmentObject[establishment.name][category.name][product.name] = { "price" : (product.price/100).toFixed(2) };
            }     
        })                
    }) 

    let calAvgPrice = (sumOfProducts/establishment.productsId.length).toFixed(2);
    avgs.push(Number(calAvgPrice))
    establishmentObject[establishment.name]["avgPrice"] = calAvgPrice;
    establishmentsObjects.push(establishmentObject);

})

avgs.sort(function(a, b){
    return a - b;
})
avgs.reverse();

avgs.forEach( currentAvg => {
    establishmentsObjects.forEach( function( establishmentData ){
        var establishmentName = Object.keys(establishmentData);
        if(currentAvg === Number(establishmentData[establishmentName[0]].avgPrice)){
            outPutData = Object.assign(outPutData, establishmentData);
        }
    })
})

outPutData = JSON.stringify(outPutData, null, 3);

fs.writeFile("novoJson.json", outPutData, (erro)=>{
    if(erro) throw erro;
    console.log("Arquivo json gerado com sucesso!")
})