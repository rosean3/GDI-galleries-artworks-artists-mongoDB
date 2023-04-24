use arts; //acessar a database

db.dropDatabase(); //limpar a database para fazer os inserts

db.createCollection("obras"); //criar a colecao de obras de arte

/*
Estrutura:
    {
        nome:"",
        descricao:"",
        tipo:"",
        ano:"",
        preco:"",
        id_obra:""
    }
*/

//inserindo as obras
db.obras.insertMany([
    {
        nome:"",
        descricao:"",
        tipo:"",
        ano:"",
        preco:"",
        id_obra:""
    },
]);

db.createCollection("artistas"); //criar a colecao de artistas

/*
Estrutura:
    {
        nome:"",
        idade:"",
        pais:"",
        obras:[],
        id_artista:""
    }
*/

//inserindo as obras
db.artistas.insertMany([
    {
        nome:"",
        idade:"",
        pais:"",
        obras:[],
        id_artista:""
    },
]);

db.createCollection("galerias"); //criar a colecao de galerias

/*
Estrutura:
    {
        nome:"",
        localizacao:{
            pais:"",
            
        },
        artistas:[],
        id_galeria:""
    }
*/

//inserindo as galerias
db.galerias.insertMany([
    {
        nome:"",
        localizacao:{
            pais:"",
            
        },
        artistas:[],
        id_galeria:""
    },
]);