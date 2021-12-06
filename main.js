const fs = require('fs');
const {establishments, products, categories} = require('./data.json');

let objPrincipal = {};
let listaDeObjetos = [];
let medias = [];

establishments.forEach(function(establishment, i){
    let objetoEstab = {};
    objetoEstab[establishment.name] = {}
    let categoriasDoEstabelecimento = [];
    let produtoCategoriaEPreco = [];
    let produtosEPrecos = [];
    let somaDosPrecos = 0;
    categories.forEach(function(category, i){
        products.forEach(function(product, i){
            establishment.productsId.forEach(function(prodEstab, i){ 
                
                if(prodEstab === product.id){                
                    product.categoriesId.forEach(function(prodCateg, i){

                        if(prodCateg === category.id){
                            produtoCategoriaEPreco.push({ produto: product.name, categoria: category.name, preco: product.price});
                            produtosEPrecos.push({ produto: product.name, preco: Number(product.price)})
                            categoriasDoEstabelecimento.push(category.name);                                                
                        }                       
                    })   
                }                   
           })    
        })     
    })
    categoriasDoEstabelecimento = [...new Set(categoriasDoEstabelecimento)] 
     
    produtosEPrecos = produtosEPrecos.filter(function (a) {
        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
    }, Object.create(null))
    
    produtosEPrecos.forEach(function(prodPreco, i){
        somaDosPrecos += prodPreco.preco;
    })

    let avgPrice = ((somaDosPrecos / establishment.productsId.length)/100).toFixed(2);
    objetoEstab[establishment.name]["avgPrice"] = avgPrice
    medias.push(Number(avgPrice));

    categoriasDoEstabelecimento.forEach(function(categEstab, i){
        objetoEstab[establishment.name][categEstab] = {}

        produtoCategoriaEPreco.forEach(function(prodEstab, i){
           if(prodEstab.categoria === categEstab){
             objetoEstab[establishment.name][categEstab][prodEstab.produto] = {}
             objetoEstab[establishment.name][categEstab][prodEstab.produto]["price"] = (prodEstab.preco/100).toFixed(2);
           }
        })
    })

    listaDeObjetos.push({objeto: objetoEstab, media: Number(avgPrice)});

})    

function sortfunction(a, b){
    return (a - b) 
}
medias.sort(sortfunction);
medias.reverse();

medias.forEach(function(mediaEstab, i){
    listaDeObjetos.forEach(function(estabObj, i){
        if(mediaEstab === estabObj.media){
            Object.assign(objPrincipal, estabObj.objeto);
        }
    })
})

var dadoDeSaidaJson = JSON.stringify(objPrincipal, null, 3)

fs.writeFile('caseTecnico.json', dadoDeSaidaJson, (err) => {
    if(err) throw err;
    console.log("arquivo criado")
});