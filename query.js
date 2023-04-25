// AGGREGATE + PROJECT => nome e idade dos artistas
db.artistas.aggregate([
  {
    $project: {
      nome: 1,
      idade: {
        $subtract: [{ $ifNull: ["$ano_morte", 2023] }, "$ano_nasc"],
      },
    },
  },
]);

// 8- GROUP => total de obras de cada tipo
db.obras.aggregate([
  {
    $group: {
      _id: "$tipo",
      quantidade: { $sum: 1 },
    },
  },
]);

// 9- SUM => total do preço de obras em cada galeria
// estamos agrupando por id da galeria
db.galerias.aggregate([
  {
    $unwind: "$obras_id",
  },
  {
    $group: {
      _id: "$_id",
      galeria: { $first: "$nome" }, // $first pega o primeiro valor do array - necessário por causa do group
      total_preco: { $sum: "$obras_id.preco" },
    },
  },
]);

// 10- COUNT => número de obras cujo preço é maior que 2000
db.obras.count({ preco: { $gt: 2000 } });

// 11- MAX => o preço da óbra mais cara da Galeria Chico Science
db.galerias.aggregate([
  {
    $match: { nome: "Galeria Chico Science" },
  },
  {
    $unwind: "$obras_id",
  },
  {
    $group: {
      _id: "$_id",
      galeria: { $first: "$nome" },
      preco_max: { $max: "$obras_id.preco" },
    },
  },
]);

// 12- AVG => média das idades dos artistas
db.artistas.aggregate([
  {
    $group: {
      _id: null,
      media_idade: {
        $avg: { $subtract: [{ $ifNull: ["$ano_morte", 2023] }, "$ano_nasc"] },
      },
    },
  },
  {
    $project: {
      _id: 0,
      media_idade: 1,
    },
  },
]);

// 13- EXISTS => artistas que já faleceram
db.artistas.find({ ano_morte: { $exists: true } });

// 14- SORT
// ordena os artistas por ano de nascimento
db.artistas.find().sort({ ano_nasc: 1 });

// ordena as obras por ano de criação e selciona as que foram criadas antes do século XXI
db.obras.aggregate([
  { $match: { year: { $lte: 2000 } } },
  { $sort: { year: 1 } },
]);

// 15- LIMIT
// mostrar só duas obras do tipo "instalação"
db.obras.find({ tipo: "instalacao" }).limit(2);

// mostrar as duas esculturas mais novas
db.obras.aggregate([
  { $match: { tipo: "escultura" } },
  { $sort: { ano: -1 } },
  { $limit: 2 },
]);

// 16 - $WHERE
// Artistas que morreram com menos de 50 anos
db.artistas.find({
    $where: function () {
      return this.ano_morte - this.ano_nasc < 50;
    },
  }).pretty();

// 17 - MAPREDUCE
// Tipo da obra - Preço total das obras desse tipo cadastradas
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

// 18 - FUNCTION
// artistas brasileiros
db.artistas.find(function () {
  return this.pais == "Brasil";
});

// 19 - PRETTY
// Obra mais cara
db.obras.find().sort({preco: -1}).limit(1).pretty();

// 20 - ALL
//galerias que possuem os tres tipos de obras
db.galerias.find(
  {
    obras_id: {
      $all: [
       {"$elemMatch": { tipo: "instalacao"}},
        {"$elemMatch": { tipo: "escultura"}},
        {"$elemMatch": { tipo: "pintura"}}
      ]
    }
  }
).pretty();

// 21 - SET
// Atualizar o preço da obra "A Latina" para 3500
db.obras.updateOne(
  {nome: "A Latina"},
  {
    $set: {
       preco: 3500 
    }
  }
)

// 22 - TEXT
// Obras que tenham a palavra mulheres no titulo ou em sua descrição
db.obras.find({$text: {$search: "mulheres"}})


// 23 - SEARCH
// Artistas que tem o nome Heitor
db.artistas.find({ $text: { $search: "Heitor" } });

// 24 - FILTER
// Filtrar as obras dos artistas com preço maior que 1000
db.artistas.aggregate([
  {
    $project: {
      nome: 1,
      obras_filtradas: {
        $filter: {
          input: "$obras",
          as: "obra",
          cond: { $gt: ["$$obra.preco", 1000] },
        },
      },
    },
  },
]);

// 25 - UPDATE
// atualizar o preço da obra "O Trevo de Sangue"
db.obras.updateOne({ nome: "O Trevo de Sangue" }, { $set: { preco: 1200 } });

// 27 - RENAMECOLLECTION
// renomear a coleção "galerias" para "galerias_de_arte"
db.galerias.renameCollection("galerias_de_arte");

// 28 - COND
// calcular a média de preços das obras, separadas por serem caras ou baratas (definindo caras como preço maior que 2000)
db.obras.aggregate([
  {
    $group: {
      _id: { $cond: [{ $gt: ["$preco", 2000] }, "Caras", "Baratas"] },
      media_preco: { $avg: "$preco" },
    },
  },
]);

// 29 - LOOKUP
// listar todas as obras e seus respectivos artistas
db.obras.aggregate([
  {
    $lookup: {
      from: "artistas",
      localField: "artistas_id",
      foreignField: "_id",
      as: "artistas",
    },
  },
]);

// 30 - FINDONE
// encontrar a primeira obra do tipo "escultura"
db.obras.findOne({ tipo: "escultura" });

// 31 - ADDTOSET
// encontrar todos os países dos artistas sem duplicatas
db.artistas.aggregate([
  {
    $group: {
      _id: null,
      paises: { $addToSet: "$pais" },
    },
  },
]);


// ? Use "better comments" extension for a proper visualization of the checlist ;)

/*
--CHECKLIST--

! 1. USE 
! 2. FIND 
! 3. SIZE 
! 4. AGGREGATE 
! 5. MATCH 
! 6. PROJECT 
! 7. GTE 
* 8. GROUP 
* 9. SUM 
* 10. COUNT
* 11. MAX 
* 12. AVG 
* 13. EXISTS 
* 14. SORT 
* 15. LIMIT 
* 16. $WHERE
* 17. MAPREDUCE 
* 18. FUNCTION 
* 19. PRETTY 
* 20. ALL 
* 21. SET 
* 22. TEXT 
* 23. SEARCH 
* 24. FILTER 
* 25. UPDATE 
* 26. SAVE 
* 27. RENAMECOLLECTION 
* 28. COND 
* 29. LOOKUP 
* 30. FINDONE 
* 31. ADDTOSET 
*/
