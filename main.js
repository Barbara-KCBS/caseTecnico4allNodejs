const fs = require('fs');
const {establishments, products, categories} = require("./data.json")

let estabelecimento = establishments;
let produtos = products;
let categoria = categories;
let construirJson = "";  
let lista = [];
let mediasDosEstabelecimentos = [];

// Percorre a lista de estabelecimentos
estabelecimento.forEach(function(nome, indiceEstabelecimento){
    let construindoString = "";
    let totalDeProdutosDoEstabelecimento = estabelecimento[indiceEstabelecimento].productsId.length;
    let somaDosPrecosDosProdutosDoEstabelecimento = 0;           
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
                somaDosPrecosDosProdutosDoEstabelecimento += precoDoProduto;
            }
        })

    })

    // Calcular média da soma dos preços de todos os produtos
    let avgPrice = ((somaDosPrecosDosProdutosDoEstabelecimento / totalDeProdutosDoEstabelecimento)/100).toFixed(2);
    mediasDosEstabelecimentos.push(avgPrice);
    // Atribui e concatena na variavel que contém a construção da string com todos os dados para gerar o arquivo json
    construindoString += `\n    "${nomeDoEstabelecimento}": {\n       "avgPrice": ${avgPrice},`;

    // Percorre todas as categorias do arquivo json
    categoria.forEach(function(nome, indiceDacategoria){
        let idDacategoria = categoria[indiceDacategoria].id;
        let nomeDaCategoria = categoria[indiceDacategoria].name;
        let categoriaComProduto = `\n       "${nomeDaCategoria}": {`;
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
                            categoriaComProduto += `\n          "${nomeDoProduto}": { \n             "price": "${precoDoProduto}"\n          },` 
                                                               
                        }
                    })
                }                      
            })      
        })

        if(localizouProdutoNoEstabelecimento === true){                                             
            categoriaComProduto = categoriaComProduto.substring(0, categoriaComProduto.length - 1);
            construindoString += `${categoriaComProduto}\n       },`;  
        }

        if(indiceDacategoria === categoria.length - 1){
            construindoString = construindoString.substring(0, construindoString.length - 1);
            construindoString += "\n    },"
        }
       
        
    })
    
   
    let objeto = { estabelecimentoString: construindoString, media: avgPrice }
    lista.push(objeto);
})

function sortfunction(a, b){
     return (a - b) 
}
mediasDosEstabelecimentos.sort(sortfunction);
mediasDosEstabelecimentos.reverse();

mediasDosEstabelecimentos.forEach(function(nome, indiceDaMedia){
    let mediaAtual = mediasDosEstabelecimentos[indiceDaMedia];

    lista.forEach(function(nome, indiceDaLista){
        if(lista[indiceDaLista].media === mediaAtual){
            construirJson += lista[indiceDaLista].estabelecimentoString;
        }
    })
})

construirJson = construirJson.substring(0, construirJson.length - 1); 

let jsonString = `{${construirJson}\n}`;

fs.writeFile('caseTecnico.json', jsonString, (err) => {
    if(err) throw err;
    console.log("arquivo criado")
});