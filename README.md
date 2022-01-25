# caseTecnico4allNodejs
Case técnico solicitado pela 4all, processo seletivo do programa Girls in Tech.
Girls in Tech - Exercício

<pre>Olá participante! 
Desenvolvemos um pequeno exercício para vermos a sua capacidade de resolução de problemas. Por isso, para o 
exercício a seguir, use a linguagem em que se sente mais confortável.

Exercício
OBS: O exercício deve ser feito usando o data.json que será enviado via email, os JSON neste documento são 
apenas para exemplificação. Não altere este arquivo. Observe o JSON de exemplo a seguir:
{
  "products": [
    {
      "id": 1,
      "categoriesId": [1],
      "name": "product A",
      "price": 100
    },
    {
      "id": 2,
      "categoriesId": [1, 2],
      "name": "product B",
      "price": 599
    }
  ],
  "categories": [
    {
      "id": 1,
      "name": "category A"
    },
    {
      "id": 2,
      "name": "category B"
    }
  ],


  "establishments": [
    {
      "name": "establishment A",
      "id": 1,
      "productsId": [1]
    },
    {
      "name": "establishment B",
      "id": 1,
      "productsId": [2]
    }
  ]
}

Nele há 3 objetos principais:
-Products
-Categories
-Establishments

Eles são todos relacionados, products são uma lista de produtos, todo o produto é vendido em vários 
estabelecimentos e pode pertencer a mais de uma categoria. As categories são a lista de todas as categorias, 
estabelecimentos vendem produtos dentro dessas categorias. Já establishments são a lista de estabelecimentos, 
estes vendes diversos produtos dentro de suas categorias. Use os atributos com o final Id, para vincular dados, 
por exemplo, se um product tem o campo id: 2, e um establishment tem productId: 2, significa que aquele 
estabelecimento vende o produto de id 2. Seu trabalho é dado o JSON de entrada, gerar um JSON de saída que deve 
seguir o seguinte formato: 

{
  "establishment A": {
    "category A": {
      "product A": {
        "price": "1.00"
      }
    }
  },
  "establishment B": {
    "category A": {
      "product B": {
        "price": "5.99"
      }
    },
    "category B": {
      "product B": {
        "price": "5.99"
      }
    }
  }
}

Se notarem, o campo price teve seu valor original dividido por 100. É uma boa pratica nunca armazenar valores 
monetários quebrados, ao invés disso, o deixamos como um inteiro e no final transformamos ele para o valor final. 
Então, no JSON de saída, esse valor deve aparecer corretamente. A formula é:
price(data.json) / 100 = price(arquivo de saída)


Exercício Extra
-Calcule a média aritmética dos preços de um estabelecimento, e adicione ela ao JSON.
-Ordene de forma decrescente, baseado no valor da média aritmética calculado no passo anterior.
Exemplo de JSON de saída:
{
  "establishment B": {
    "avgPrice": "5.99",
    "category A": {
      "product B": {
        "price": "5.99"
      }
    },
    "category B": {
      "product B": {
        "price": "5.99"
      }
    }
  },
  "establishment A": {
    "avgPrice": "1.00",
    "category A": {
      "product A": {
        "price": "1.00"
      }
    }
  }
}

Onde entregar o(s) exercícios:
Faça o(s) projeto(s) ou github (ou semelhante) e nos envie o link para acessá-lo, 
ou nos envie ele(s) através de um zip.

