use arts; //acessar a database

db.dropDatabase(); //limpar a database para fazer os inserts

db.createCollection("obras"); //criar a coleção de obras de arte

/*
Estrutura:
    {
        nome:"", -> nome da obra
        descricao:"", -> descrição da obra
        tipo:"", -> tipo da obra (pintura/escultura/instalação)
        ano:"", -> ano da obra
        preco:"", -> preço da obra
        id_obra:"" -> id da obra
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

db.createCollection("artistas"); //criar a coleção de artistas

/*
Estrutura:
    {
        nome:"", -> nome do artista
        idade:"", -> idade do artista
        pais:"", -> país de origem do artista
        obras_id:[], -> lista com os _id das obras
        id_artista: "" -> id do artista
    }
*/

//inserindo as obras
db.artistas.insertMany([
    {
        nome:"",
        idade:"",
        pais:"",
        obras_id:[],
        id_artista: ""
    },
]);

db.createCollection("galerias"); //criar a coleção de galerias

/*
Estrutura:
    {
        nome:"", -> nome da galeria
        localizacao:{ -> localização da obra
            cidade:"",
            pais:"",
        },
        artistas_id:[] -> lista com os _id dos artistas cujas obras estão presentes na galeria
    }
*/

//inserindo as galerias
db.galerias.insertMany([
    {
        nome:"",
        localizacao:{
            cidade:"",
            pais:""
        },
        artistas:[]
    },
]);