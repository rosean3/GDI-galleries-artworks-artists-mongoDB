//1.USE => acessar a database
use arts;

//2.FIND => retornar os artistas que estão vivos, ordenados pelo ano de nascimento. mostrar apenas o nome e o ano de nascimento
db.artistas.find({ano_morte:null}, {_id:0, nome:1, ano_nasc:1}).sort({ano_nasc: 1});

//3.SIZE => retornar as galerias que possuem exatamente 4 obras em seu acervo, mostrando apenas o nome da galeria e os nomes das obras.
db.galerias.aggregate([
  {
    $lookup: {
      from: "obras",
      localField: "obras_id",
      foreignField: "_id",
      as: "obras"
    }
  },
  {
    $unwind: "$obras"
  },
  {
    $group: {
      _id: "$_id",
      nome: { $first: "$nome" },
      obras: { $push: "$obras.nome" }
    }
  },
  {
    $match: {
      obras: { $size: 4 }
    }
  },
  {
    $project: {
      _id: 0,
      nome: 1,
      obras: 1
    }
  }
]);

//4.AGGREGATE => nome e idade dos artistas
db.artistas.aggregate([
  {
    $project: {
      nome: 1,
      idade: {
        $subtract: [{ $ifNull: ["$ano_morte", 2023] }, "$ano_nasc"],
      }
    }
  },
  {
    $project: {
      _id: 0
    }
  }
]);

//5.MATCH => retornar apenas as obras em que mais de um artista está envolvido
db.obras.aggregate([
  {
    $match: {
      artistas_id: {
        $type: "array"
      }
    }
  },
  {
    $project: {
      _id: 0,
      nome: 1
    }
  }
]);

//6.PROJECT => retornar as galerias que estão no Brasil, mostrando apenas o nome e localização completa delas
db.galerias.aggregate([
  {
    $match: {
      "localizacao.pais": "Brasil"
    }
  },
  {
    $project: {
      _id: 0,
      nome: 1,
      localizacao: 1
    }
  }
]);

//7.GTE => retornar o nome dos artistas que nasceram a partir de 1900 e o ano de nascimento deles, ordenados em ordem decrescente dos anos de nascimento
db.artistas.find({ano_nasc: {$gte: 1900}}, {_id: 0, nome:1, ano_nasc:1}).sort({ano_nasc: -1});

//8.GROUP => total de obras de cada tipo
db.obras.aggregate([
  {
    $group: {
      _id: "$tipo",
      quantidade: { $sum: 1 }
    }
  }
]);

//9.SUM => total do preço de obras em cada galeria
db.galerias.aggregate([
  {
    $lookup: {
      from: "obras",
      localField: "obras_id",
      foreignField: "_id",
      as: "obras"
    }
  },
  {
    $project: {
      _id: 0,
      nome: 1,
      total_obras: { $sum: "$obras.preco" }
    }
  }
]);


//10.COUNT => número de obras cujo preço é maior que 2000
db.obras.count({ preco: { $gt: 2000 } });

//11.MAX => o preço da obra mais cara da Galeria Chico Science
//estamos agrupando por id da galeria
db.galerias.aggregate([
  {
    $match: { nome: "Galeria Chico Science" },
  },
  {
    $lookup: {
      from: "obras",
      localField: "obras_id",
      foreignField: "_id",
      as: "obras"
    }
  },
  {
    $unwind: "$obras"
  },
  {
    $group: {
      _id: "$_id",
      galeria: { $first: "$nome" },
      preco_max: { $max: "$obras.preco" }
    }
  },
  {
    $project: {
      _id: 0
    }
  }
]);

//12.AVG => média das idades dos artistas
db.artistas.aggregate([
  {
    $group: {
      _id: null,
      media_idade: {
        $avg: { $subtract: [{ $ifNull: ["$ano_morte", 2023] }, "$ano_nasc"] },
      }
    }
  },
  {
    $project: {
      _id: 0,
      media_idade: 1
    }
  }
]);

//13.EXISTS => artistas que já faleceram
db.artistas.find({ ano_morte: { $exists: true}});

//14.SORT
//ordena os artistas por ano de nascimento
db.artistas.find().sort({ ano_nasc: 1});

//ordena as obras por ano de criação e selciona as que foram criadas antes do século XXI, mostrando apenas o nome, a descricao, o tipo e o ano de criação da obra
db.obras.aggregate([
  { 
    $match: {
       ano: { $lte: 2000 } 
      } 
  },
  { 
    $sort: { 
      ano: 1 
    } 
  },
  {
    $project: {
      _id: 0,
      nome: 1,
      descricao: 1,
      tipo: 1,
      ano: 1 
    }
  }
]);

//15.LIMIT => mostrar só duas obras do tipo "instalação"
db.obras.find({ tipo: "instalacao" }).limit(2);

// mostrar as duas esculturas mais novas
db.obras.aggregate([
  {
    $match: {
      tipo: "escultura"
    }
  },
  { 
    $sort: {
      ano: -1
    }
  },
  { 
    $limit: 2
  }
]);

//16.$WHERE => artistas que morreram com menos de 50 anos
db.artistas.find({
    $where: function () {
      return this.ano_morte - this.ano_nasc < 50;
    },
  }).pretty();

//17.MAPREDUCE
//tipo da obra - Preço total das obras desse tipo cadastradas
db.obras.mapReduce(
  function () {
    emit(this.tipo, this.preco);
  },
  function (key, values) {
    return Array.sum(values);
  },
  {
    out: "tipo_preco",
  }
);

//18.FUNCTION
//retornar artistas brasileiros
db.artistas.find().toArray().filter(function(doc) {
  return doc.pais === "Brasil";
});


//19.PRETTY => mostrar a obra mais cara
db.obras.find().sort({preco: -1}).limit(1).pretty();

//20.ALL => retornar as galerias que possuem os tres tipos de obras, mostrando o nome da galeria e aa lista com os nomes e os tipos das obras de cada galeria

db.galerias.aggregate([
  {
    $lookup: {
      from: "obras",
      localField: "obras_id",
      foreignField: "_id",
      as: "obras"
    }
  },
  {
    $match: {
      obras: {
        $all: [
          { $elemMatch: { tipo: "instalacao" } },
          { $elemMatch: { tipo: "escultura" } },
          { $elemMatch: { tipo: "pintura" } }
        ]
      }
    }
  },
  {
    $project: {
      _id: 0,
      nome: 1,
      "obras.nome": 1,
      "obras.tipo": 1
    }
  }
])


//21.SET => atualizar o preço da obra "A Latina" para 3500
db.obras.updateOne({nome: "A Latina"},{$set: {preco: 3500}})

//22.TEXT => obras que tenham a palavra mulheres no titulo ou em sua descrição
db.obras.find({$text: {$search: "mulheres"}})


//23.SEARCH => procurar artistas que tem o nome Heitor
db.artistas.find({ $text: { $search: "Heitor" } });

//24.FILTER => filtrar apenas as obras do tipo pintura de uma galeria, retornando o nome da galeria e uma lista com os nomes e os tipos das obras de cada uma. Além disso, excluir as galerias sem pinturas.
db.galerias.aggregate([
  {
    $lookup: {
      from: "obras",
      localField: "obras_id",
      foreignField: "_id",
      as: "obras"
    }
  },
  {
    $project: {
      _id: 0,
      nome: 1,
      pinturas: {
        $filter: {
          input: "$obras",
          as: "obra",
          cond: { $eq: ["$$obra.tipo", "pintura"] }
        }
      }
    }
  },
  {
    $project: {
      nome: 1,
      "pinturas.nome": 1,
      "pinturas.tipo": 1
    }
  },
  {
    $match: {
      "pinturas": { $not: {$size: 0} }
    }
  }
]);

//25.UPDATE => atualizar o preço da obra "O Trevo de Sangue"
db.obras.updateOne({ nome: "O Trevo de Sangue" }, { $set: { preco: 1200 } });

//27.RENAMECOLLECTION => renomear a coleção "galerias" para "galerias_de_arte"
db.galerias.renameCollection("galerias_de_arte");

//28.COND => calcular a média de preços das obras, separadas por serem caras ou baratas (definindo caras como preço maior que 2000)
db.obras.aggregate(
  {
    $group: {
      _id: { $cond: [{ $gt: ["$preco", 2000] }, "Caras", "Baratas"] },
      media_preco: { $avg: "$preco" }
    }
  },
);

//29.LOOKUP => listar todas as obras e seus respectivos artistas
db.obras.aggregate(
  {
    $lookup: {
      from: "artistas",
      localField: "artistas_id",
      foreignField: "_id",
      as: "artistas"
    }
  }
);

//30.FINDONE => encontrar a primeira obra do tipo "escultura"
db.obras.findOne({ tipo: "escultura" });

//31.ADDTOSET => encontrar todos os países dos artistas sem duplicatas
db.artistas.aggregate([
  {
    $group: {
      _id: null,
      paises: { $addToSet: "$pais" }
    },
  },
  {
    $project: {
      _id: 0
    }
  }
]);

/*
--CHECKLIST--

[X] 1.USE 
[X] 2.FIND 
[X] 3.SIZE 
[X] 4.AGGREGATE 
[X] 5.MATCH 
[X] 6.PROJECT 
[X] 7.GTE 
[X] 8.GROUP 
[X] 9.SUM 
[X] 10.COUNT
[X] 11.MAX 
[X] 12.AVG 
[X] 13.EXISTS 
[X] 14.SORT 
[X] 15.LIMIT 
[X] 16.$WHERE
[X] 17.MAPREDUCE 
[X] 18.FUNCTION 
[X] 19.PRETTY 
[X] 20.ALL 
[X] 21.SET 
[X] 22.TEXT 
[X] 23.SEARCH 
[X] 24.FILTER 
[X] 25.UPDATE 
[!] 26.SAVE
[X] 27.RENAMECOLLECTION 
[X] 28.COND 
[X] 29.LOOKUP 
[X] 30.FINDONE 
[X] 31.ADDTOSET 
*/
