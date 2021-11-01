const fs = require('fs');
const {establishments, products, categories} = require("./data.json")

let estabelecimento = establishments;
let produtos = products;
let categoria = categories;
let construirJson = "";  
let listaDeStrings = [];
let mediasDosEstabelecimentos = [];

// Percorre a lista de estabelecimentos
estabelecimento.forEach(function(nome, indiceEstabelecimento){
    let construindoString = "";
    let totalDeProdutosDoEstabelecimento = estabelecimento[indiceEstabelecimento].productsId.length;
    let somaDosPrecos = 0;           
    let nomeDoEstabelecimento = estabelecimento[indiceEstabelecimento].name;
    let produtosDoEstabelecimento = estabelecimento[indiceEstabelecimento].productsId;
      
    // Percorre os produtos disponiveis no estabelecimento
    produtosDoEstabelecimento.forEach(function(nome, indiceDoProdutoDoEstabelecimento){
        let idDoProdutoDoEstabelecimento = produtosDoEstabelecimento[indiceDoProdutoDoEstabelecimento];

        // Percorre todos os produtos do arquivo json
        produtos.forEach(function(nome, indiceDoProduto){
            let idDoProduto = produtos[indiceDoProduto].id;
            let precoDoProduto = Number(produtos[indiceDoProduto].price)

            // Entra nesta condição o produto que estiver disponivel no estabelecimento, soma e atribui os valores na variável com o total da soma dos produtos
            if(idDoProdutoDoEstabelecimento === idDoProduto){
                somaDosPrecos += precoDoProduto;
            }
        })

    })

    // Calcular média da soma dos preços de todos os produtos
    let avgPrice = ((somaDosPrecos / totalDeProdutosDoEstabelecimento)/100).toFixed(2);
    mediasDosEstabelecimentos.push(avgPrice);
    // Atribui e concatena na variavel que contém a construção da string com todos os dados para gerar o arquivo json
    construindoString += `"${nomeDoEstabelecimento}": {"avgPrice": "${avgPrice}",`;

    // Percorre todas as categorias do arquivo json
    categoria.forEach(function(nome, indiceDacategoria){
        let idDacategoria = categoria[indiceDacategoria].id;
        let nomeDaCategoria = categoria[indiceDacategoria].name;
        let categoriaComProduto = `"${nomeDaCategoria}": {`;
        let localizouProdutoNoEstabelecimento = false;
        
        // Percorre todos os produtos do arquivo json
        produtos.forEach(function(nome, indiceDeProdutos){

            let idDoProduto = produtos[indiceDeProdutos].id; 
            let categoriaDoProduto = produtos[indiceDeProdutos].categoriesId;
            let nomeDoProduto = produtos[indiceDeProdutos].name;
            let precoDoProduto = (produtos[indiceDeProdutos].price/100).toFixed(2);

            // Percorre todos os produtos disponiveis no estabelecimento
            produtosDoEstabelecimento.forEach(function(nome, indiceDoProdutoDoEstabelecimento){
                let idDoProdutoDoEstabelecimento = produtosDoEstabelecimento[indiceDoProdutoDoEstabelecimento];
                
                if(idDoProdutoDoEstabelecimento === idDoProduto){                       
                    
                    // Percorre todas as categorias que o produto pertence
                    categoriaDoProduto.forEach(function(nome, indiceDaCategoriaDeProdutos){
                        let idDaCategoriaDoProdutoDoEstabelecimento = categoriaDoProduto[indiceDaCategoriaDeProdutos];
                        
                        // Entra nesta condição quando encontrar a categoria que o produto pertence
                        if(idDaCategoriaDoProdutoDoEstabelecimento === idDacategoria){
                            localizouProdutoNoEstabelecimento = true;                                                       
                            categoriaComProduto += `"${nomeDoProduto}": { "price": "${precoDoProduto}"},` 
                                                               
                        }
                    })
                }                      
            })      
        })

        if(localizouProdutoNoEstabelecimento === true){                                             
            categoriaComProduto = categoriaComProduto.substring(0, categoriaComProduto.length - 1);
            construindoString += `${categoriaComProduto}},`;  
        }

        if(indiceDacategoria === categoria.length - 1){
            construindoString = construindoString.substring(0, construindoString.length - 1);
            construindoString += "},"
        }
       
        
    })
    
    
    let strigEMediaDosEstabelecimentos = { estabelecimentoString: construindoString, media: avgPrice }
    listaDeStrings.push(strigEMediaDosEstabelecimentos);
})

// Ordena, de forma decrescente, o array com as médias da soma dos produtos de todos os estabelecimentos
function sortfunction(a, b){
     return (a - b) 
}
mediasDosEstabelecimentos.sort(sortfunction);
mediasDosEstabelecimentos.reverse();

//Compara as médias dos arrays com as médias dos estabelecimentos e faz a construção da string em ordem descrescente 
mediasDosEstabelecimentos.forEach(function(nome, indiceDaMedia){
    let mediaAtual = mediasDosEstabelecimentos[indiceDaMedia];

    listaDeStrings.forEach(function(nome, indiceDaLista){
        if(listaDeStrings[indiceDaLista].media === mediaAtual){
            construirJson += listaDeStrings[indiceDaLista].estabelecimentoString;
        }
    })
})

construirJson = construirJson.substring(0, construirJson.length - 1); 

// construção final dos dados para gerar o arquivo json
let jsonString = `{${construirJson}}`;
jsonString = JSON.parse(jsonString);
jsonString = JSON.stringify(jsonString, null, 3);

// Metódo do node.js que gera o arquivo json
fs.writeFile('caseTecnico.json', jsonString, (err) => {
    if(err) throw err;
    console.log("arquivo criado")
});