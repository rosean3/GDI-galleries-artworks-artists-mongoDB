db = db.getSiblingDB("arts"); //acessar a database -> feito assim para permitir usar o load() no mongo

db.dropDatabase(); //limpar a database para fazer os inserts

db.createCollection("artistas"); //criar a coleção de artistas
db.artistas.createIndex({ nome: "text" });
/*
Estrutura:
    {
        nome: string, -> nome do artista
        pais: string, -> país de origem do artista
        ano_nasc: number, -> ano de nascimento do artista
        ano_morte: number, -> ano de morte do artista
        id_artista: string -> id do artista
    }
*/

//inserindo os artistas
db.artistas.insertMany([
  {
    nome: "Heitor Pereira",
    pais: "Brasil",
    ano_nasc: 1763,
    ano_morte: 1836,
    id_artista: "art_00"
  },
  {
    nome: "Jeremy Strong",
    pais: "EUA",
    ano_nasc: 1865,
    ano_morte: 1898,
    id_artista: "art_01"
  },
  {
    nome: "Naomi Jones",
    pais: "Australia",
    ano_nasc: 1979,
    id_artista: "art_02"
  },
  {
    nome: "Noel Gallagher",
    pais: "Inglaterra",
    ano_nasc: 1967,
    id_artista: "art_03"
  },
  {
    nome: "Anjela Martinez",
    pais: "Colombia",
    ano_nasc: 1984,
    id_artista: "art_04"
  },
  {
    nome: "Kendall Johnson",
    pais: "Africa do Sul",
    ano_nasc: 1861,
    ano_morte: 1925,
    id_artista: "art_05"
  },
  {
    nome: "Martin O' Brian",
    pais: "Irlanda",
    ano_nasc: 1625,
    ano_morte: 1665,
    id_artista: "art_06"
  },
  {
    nome: "Gustavo Valenca",
    pais: "Brasil",
    ano_nasc: 1964,
    id_artista: "art_07"
  },
  {
    nome: "Tsang Ing Mings",
    pais: "China",
    ano_nasc: 1959,
    ano_morte: 1981,
    id_artista: "art_08"
  },
  {
    nome: "Gilberto Bauhaus",
    pais: "Brasil",
    ano_nasc: 1939,
    id_artista: "art_09"
  },
  {
    nome: "Barry Block",
    pais: "Holanda",
    ano_nasc: 1858,
    ano_morte: 1917,
    id_artista: "art_10"
  },
  {
    nome: "Gendo Ikari",
    pais: "Japao",
    ano_nasc: 1891,
    ano_morte: 1949,
    id_artista: "art_11"
  }
]);

db.createCollection("obras"); //criar a coleção de obras de arte
db.obras.createIndex({ nome: "text", descricao: "text" });
/*
Estrutura:
    {
        nome: string, -> nome da obra
        descricao: string, -> descrição da obra
        tipo: string, -> tipo da obra (pintura/escultura/instalação)
        ano: number, -> ano da obra
        preco: number, -> preço da obra
        id_obra: string ->, id da obra
        artistas_id: string[] -> lista com os _id dos artistas responsáveis pela obra
    }
*/

//inserindo as obras
db.obras.insertMany([
  {
    nome: "A Lata e Meta",
    descricao: `Uma instalação de arte que aborda a relação entre a simplicidade
e a complexidade, ou entre o que é tangível e o que é intangível.`,
    tipo: "instalacao",
    id_obra: "ins_00",
    artistas_id: db.artistas.findOne({ id_artista: "art_09" })._id
  },
  {
    nome: "O Guitarrista e o Irmao",
    descricao: `As cores usadas na pintura são mais escuras, representando a tensão
e o conflito entre as personagens. A técnica de pintura usada é bastande abstrata,
com traços e pinceladas mais agressivas, transmitindo o sentimento de tensão e
desconforto na cena.`,
    tipo: "pintura",
    ano: 2009,
    preco: 2530.31,
    id_obra: "pin_00",
    artistas_id: db.artistas.findOne({ id_artista: "art_03" })._id
  },
  {
    nome: "A Latina",
    descricao: `A figura feminina se apresenta em uma postura altiva, com a cabeça
erguida e os braços cruzados, transmitindo uma sensação de força e determinação.`,
    tipo: "escultura",
    ano: 2019,
    preco: 3337.28,
    id_obra: "esc_00",
    artistas_id: db.artistas.findOne({ id_artista: "art_04" })._id
  },
  {
    nome: "O Trevo de Sangue",
    descricao: `A pintura evoca a história turbulenta da Irlanda, com suas guerras
e conflitos.`,
    tipo: "pintura",
    ano: 1662,
    preco: 1158.14,
    id_obra: "pin_01",
    artistas_id: db.artistas.findOne({ id_artista: "art_06" })._id
  },
  {
    nome: "Os Povos",
    descricao: `A pintura retrata as diferentes culturas e etnias que
compõem a África do Sul e o continente africano como um todo.`,
    tipo: "pintura",
    ano: 1921,
    preco: 999.37,
    id_obra: "pin_02",
    artistas_id: db.artistas.findOne({ id_artista: "art_05" })._id
  },
  {
    nome: "A Solidao",
    descricao: `A instalação é composta por uma variedade de elementos,
como objetos, luzes, sons e imagens, que trabalham juntos para evocar
a sensação de solidão.`,
    tipo: "instalacao",
    id_obra: "ins_01",
    artistas_id: db.artistas.findOne({ id_artista: "art_02" })._id
  },
  {
    nome: "O Poder",
    descricao: `A figura se apresenta de forma majestosa e imponente,
evocando a imagem de um líder poderoso.`,
    tipo: "escultura",
    ano: 1890,
    preco: 668.35,
    id_obra: "esc_01",
    artistas_id: db.artistas.findOne({ id_artista: "art_01" })._id
  },
  {
    nome: "O Verde Brasileiro",
    descricao: `A obra evoca a exuberante vegetação do Brasil`,
    tipo: "pintura",
    ano: 1788,
    preco: 3036.7,
    id_obra: "pin_03",
    artistas_id: db.artistas.findOne({ id_artista: "art_00" })._id
  },
  {
    nome: "O Futuro",
    descricao: `A pintura apresenta uma paisagem urbana futurista,
com arranha-céus altos e imponentes, veículos voadores, tecnologias
avançadas e uma atmosfera de progresso e inovação. `,
    tipo: "pintura",
    ano: 1901,
    preco: 3443.62,
    id_obra: "pin_04",
    artistas_id: db.artistas.findOne({ id_artista: "art_11" })._id
  },
  {
    nome: "O Ator",
    descricao: `A obra retrata um ator em pose dramática, com
gestos exagerados e uma expressão facial intensa.`,
    tipo: "escultura",
    ano: 1894,
    preco: 4728.45,
    id_obra: "esc_02",
    artistas_id: db.artistas.findOne({ id_artista: "art_10" })._id
  },
  {
    nome: "O Povo",
    descricao: `Um retrato da China pós Revolução Cultural`,
    tipo: "pintura",
    ano: 1980,
    preco: 1319.3,
    id_obra: "pin_05",
    artistas_id: db.artistas.findOne({ id_artista: "art_08" })._id
  },
  {
    nome: "O Novo Verde Brasileiro",
    descricao: `Uma reeleitura da obra O Verde Brasileiro`,
    tipo: "pintura",
    ano: 1998,
    preco: 5014.47,
    id_obra: "pin_06",
    artistas_id: db.artistas.findOne({ id_artista: "art_07" })._id
  },
  {
    nome: "Brasil-China",
    descricao: `Uma colaboração de artistas famosos de diferentes
origens`,
    tipo: "pintura",
    ano: 1980,
    preco: 2914.43,
    id_obra: "pin_07",
    artistas_id: [
      db.artistas.findOne({ id_artista: "art_08" })._id,
      db.artistas.findOne({ id_artista: "art_09" })._id
    ],
  },
  {
    nome: "Duas Mulheres, Dois Mundos",
    descricao: `A obra retrata duas mulheres de diferentes lugares
do mundo, enfatizando tanto suas similarides quanto suas disparidades.`,
    tipo: "escultura",
    ano: 2014,
    preco: 2128.45,
    id_obra: "esc_03",
    artistas_id: [
      db.artistas.findOne({ id_artista: "art_02" })._id,
      db.artistas.findOne({ id_artista: "art_04" })._id
    ]
  },
  {
    nome: "Duas Mulheres, Dois Mundos: O Ato",
    descricao: `Uma instalação baseada na escultura das artistas de
mesmo nome.`,
    tipo: "instalacao",
    id_obra: "ins_02",
    artistas_id: [
      db.artistas.findOne({ id_artista: "art_02" })._id,
      db.artistas.findOne({ id_artista: "art_04" })._id
    ]
  }
]);

db.createCollection("galerias"); //criar a coleção de galerias

/*
Estrutura:
    {
        nome: string, -> nome da galeria
        localizacao:{ -> localização da obra
            cidade: string,
            pais: string,
        },
        obras_id: string[] -> lista com os _id dos obras presentes na galeria
    }
*/

//inserindo as galerias
db.galerias.insertMany([
  {
    nome: "Galeria 22",
    localizacao: {
      cidade: "Sao Paulo",
      pais: "Brasil",
    },
    obras_id: [
      db.obras.findOne({ id_obra: "ins_02" })._id,
      db.obras.findOne({ id_obra: "esc_00" })._id,
      db.obras.findOne({ id_obra: "esc_03" })._id,
      db.obras.findOne({ id_obra: "ins_00" })._id,
      db.obras.findOne({ id_obra: "pin_07" })._id,
      db.obras.findOne({ id_obra: "pin_03" })._id,
      db.obras.findOne({ id_obra: "pin_06" })._id
    ]
  },
  {
    nome: "Galeria Chico Science",
    localizacao: {
      cidade: "Recife",
      pais: "Brasil",
    },
    obras_id: [
      db.obras.findOne({ id_obra: "ins_00" })._id,
      db.obras.findOne({ id_obra: "pin_07" })._id,
      db.obras.findOne({ id_obra: "pin_03" })._id,
      db.obras.findOne({ id_obra: "pin_06" })._id
    ]
  },
  {
    nome: "Galeria Mark Twain",
    localizacao: {
      cidade: "Nova Orleans",
      pais: "EUA",
    },
    obras_id: [
      db.obras.findOne({ id_obra: "esc_01" })._id,
      db.obras.findOne({ id_obra: "esc_02" })._id,
      db.obras.findOne({ id_obra: "esc_03" })._id,
      db.obras.findOne({ id_obra: "ins_02" })._id
    ]
  },
  {
    nome: "Galeria Vermelha",
    localizacao: {
      cidade: "Pequim",
      pais: "China",
    },
    obras_id: [
      db.obras.findOne({ id_obra: "pin_05" })._id,
      db.obras.findOne({ id_obra: "pin_04" })._id,
      db.obras.findOne({ id_obra: "pin_07" })._id,
      db.obras.findOne({ id_obra: "esc_01" })._id,
    ]
  },
  {
    nome: "Galeria Keane",
    localizacao: {
      cidade: "Sligo",
      pais: "Irlanda",
    },
    obras_id: [
      db.obras.findOne({ id_obra: "pin_00" })._id,
      db.obras.findOne({ id_obra: "pin_01" })._id,
      db.obras.findOne({ id_obra: "pin_02" })._id,
      db.obras.findOne({ id_obra: "ins_01" })._id,
      db.obras.findOne({ id_obra: "pin_04" })._id,
    ]
  },
  {
    nome: "Galeria Real",
    localizacao: {
      cidade: "Oxford",
      pais: "Inglaterra",
    },
    obras_id: [
      db.obras.findOne({ id_obra: "pin_00" })._id,
      db.obras.findOne({ id_obra: "esc_00" })._id,
      db.obras.findOne({ id_obra: "pin_02" })._id,
      db.obras.findOne({ id_obra: "ins_01" })._id,
      db.obras.findOne({ id_obra: "esc_01" })._id
    ]
  }
]);
