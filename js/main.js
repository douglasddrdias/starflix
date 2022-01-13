$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    video:true,
    autoHeight:true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
})
class Filme {
    constructor(imgBack, descricao, titulo, urlTrailerYoutube, idFilmeSwapi){
        this.imgBack = imgBack;
        this.descricao = descricao;
        this.titulo = titulo;
        this.urlTrailerYoutube = urlTrailerYoutube;
        this.idFilmeSwapi = idFilmeSwapi;
    }
}
const assistirTrailerYoutube = () => {

}
const paragrafoDescricao = document.getElementById('descricao');
const btnAssistir = document.getElementById('assistir');
const btnMaisInformacoes = document.getElementById('mais-informacoes');
const imagens = document.querySelectorAll('img.box-filme');
const divFilmePrincipal = document.querySelector('div.filme-principal');
const titulo = document.getElementById('titulo');
const frameVideo = document.getElementById('video');
let objetoAtual;
let arrayNomeImg;
let nomeImg ;
const mapFilmes = new Map([
    ["star-wars-nova-esperanca.jpg",new Filme('star-wars-nova-esperanca-capa.jpg','A princesa Leia é mantida refém pelas forças imperiais comandadas por Darth Vader. Luke Skywalker e Han Solo precisam libertá-la e restaurar a liberdade e a justiça na galáxia.', 'STAR WARS - Episódio IV - Uma nova esperança','https://www.youtube.com/embed/jVrf_bKTjo4','1')        
    ],
    ["star-wars-a-ameaca-fantasma.jpg", new Filme('star-wars-a-ameaca-fantasma-capa.jpg', 'Enquanto resgatam a Rainha Amidala, governante de um planeta pacífico invadido por forças ameaçadoras, os Cavaleiros Jedi Obi-Wan Kenobi e Qui-Gon Jinn descobrem Anakin Skywalker, uma criança prodígio de 9 anos excepcionalmente poderosa na Força.', 'STAR WARS - Episódio I - A Ameaça Fantasma', 'https://www.youtube.com/embed/bD7bpG-zDJQ', '4')
    ],
    ["star-wars-ultimos-jedi.jpg", new Filme('star-wars-ultimos-jedi-capa.jpg', 'A tranquila e solitária vida de Luke Skywalker sofre uma reviravolta quando ele conhece Rey, uma jovem que mostra fortes sinais da Força. O desejo dela de aprender o estilo dos Jedi força Luke a tomar uma decisão que mudará sua vida para sempre. Enquanto isso, Kylo Ren e o General Hux lideram a Primeira Ordem para um ataque total contra Leia e a Resistência pela supremacia da galáxia.', 'STAR WARS - Episódio VIII - Os Últimos Jedi', 'https://www.youtube.com/embed/-di3XYRxyHY', '')
    ],
    ["star-wars-despertar-da-forca.jpg", new Filme('star-wars-despertar-da-forca-capa.jpg', 'A queda de Darth Vader e do Império levou ao surgimento de uma nova força sombria: a Primeira Ordem. Eles procuram o jedi Luke Skywalker, desaparecido. A resistência tenta desesperadamente encontrá-lo antes para salvar a galáxia.', 'STAR WARS - Episódio VII - O Despertar da Força', 'https://www.youtube.com/embed/yMglylP5xhA', '')
    ],
    ["star-wars-a-ascensao-skywalker.jpg", new Filme('star-wars-a-ascensao-skywalker-capa.jpg', 'Com o retorno do Imperador Palpatine, todos voltam a temer seu poder e, com isso, a Resistência toma a frente da batalha que ditará os rumos da galáxia. Treinando para ser uma completa Jedi, Rey (Daisy Ridley) ainda se encontra em conflito com seu passado e futuro, mas teme pelas respostas que pode conseguir a partir de sua complexa ligação com Kylo Ren (Adam Driver), que também se encontra em conflito pela Força.', 'STAR WARS - Episódio IX - Ascensão Skywalker', 'https://www.youtube.com/embed/jiRTfUYOHCs', '')
    ],
    ["star-wars-ataque-dos-clones.jpg", new Filme('star-wars-ataque-dos-clones-capa.jpg', 'Com a missão de proteger a Senadora Amidala, Anakin Skywalker descobre o seu amor por ela, do mesmo modo que vai conhecendo seu lado sombrio. Obi-Wan Kenobi descobre um exército de clones à medida que a Galáxia caminha para uma grande guerra.', 'STAR WARS - Episódio II - Ataque dos Clones', 'https://www.youtube.com/embed/n7DQ9SdjUmg', '5')
    ]
    ,
    ["star-wars-a-vinganca-dos-sith.jpg", new Filme('star-wars-a-vinganca-dos-sith-capa.jpg', 'As Guerras Clônicas estão em pleno andamento e Anakin Skywalker mantém um elo de lealdade com Palpatine, ao mesmo tempo em que luta para que seu casamento com Padmé Amidala não seja afetado por esta situação. Seduzido por promessas de poder, Anakin se aproxima cada vez mais de Darth Sidious até se tornar o temível Darth Vader. Juntos eles tramam um plano para aniquilar de uma vez por todas com os cavaleiros jedi.', 'STAR WARS - Episódio III - A Vingança dos Sith', 'https://www.youtube.com/embed/znpliCR0_Kw', '6')
    ]       
    ,
    ["star-wars-imperio-contra-ataca.jpg", new Filme('star-wars-imperio-contra-ataca-capa.jpg', 'As forças imperais comandadas por Darth Vader (David Prowse) lançam um ataque contra os membros da resistência, que são obrigados a fugir. Enquanto isso Luke Skywalker (Mark Hamill) tenta encontrar o Mestre Yoda, que poderá ensiná-lo a dominar a "Força" e torná-lo um cavaleiro jedi. No entanto, Darth Vader planeja levá-lo para o lado negro da "Força".', 'STAR WARS - Episódio V - O Império Contra-Ataca', 'https://www.youtube.com/embed/4KnAyxgZ3Vo', '2')
    ]    
    ,
    ["star-wars-retorno-jedi.jpg", new Filme('star-wars-retorno-jedi-capa.jpg', 'O imperador está supervisionando a construção de uma nova Estrela da Morte. Enquanto isso Luke Skywalker liberta Han Solo e a Princesa Leia das mãos de Jaba. Luke só se tornará um cavaleiro jedi quando destruir Darth Vader, que ainda pretende atraí-lo para o lado sombrio da Força.', 'STAR WARS - Episódio VI - O Retorno de Jedi', 'https://www.youtube.com/embed/BT-fVW24-q4', '3')
    ]    
    ,
    ["star-wars-han-solo.jpg", new Filme('star-wars-han-solo-capa.jpg', 'Embarque na Millennium Falcon e viaje para uma galáxia distante em uma nova aventura com o mais amado canalha da galáxia. Através de uma série de ousadas aventuras no obscuro e perigoso submundo do crime, Han Solo encontra seu poderoso futuro copiloto Chewbacca e encontra o famoso jogador Lando Calrissian, em uma jornada que definirá o curso de um dos heróis mais improváveis da saga Star Wars.', 'Han Solo: Uma História Star Wars', 'https://www.youtube.com/embed/EQpr5HXTvmg', '')
    ]    
    ,
    ["star-wars-rogue-one.jpg", new Filme('star-wars-rogue-one-capa.jpg', 'Em busca de uma nova esperança para a galáxia, a Aliança Rebelde enfrenta uma arriscada missão: roubar os planos que revelam uma falha na construção da Estrela da Morte. Para isso, eles contam com a ajuda de Jyn Erso, filha do criador da arma mais poderosa do império.', 'Rogue One: Uma História Star Wars', 'https://www.youtube.com/embed/9oISQcXuki0', '')
    ]    
])
// marreta para diferenciar clicar e arrastar
let arrastouItem = false;
document.addEventListener('mousedown', () => arrastouItem = false);
document.addEventListener('mousemove', () => arrastouItem = true);


// Adiciona um texto na tela
function adicionarMensagemAoLabel(lblResultado, text) {
    let descricaoMensagem = document.createTextNode(text);
    limparLabel(lblResultado);
    lblResultado.appendChild(descricaoMensagem);
}

// Limpa as mensagem do label
function limparLabel(lblResultado) {
    while (lblResultado.firstChild) {
        lblResultado.removeChild(lblResultado.lastChild);
    }
}

// altera o filme selecionado
function alterarFilmeDestaque(img) {
    if (!arrastouItem) {
        recuperarObjetoAtual(img);
        alterarBackground();
        alterarTituloFilmeDestaque();
        alterarDescricaoFilmeDestaque();
        alterarVisibilidadeBotoes();
    }
}
function recuperarObjetoAtual(img) {
    arrayNomeImg = img.src.split(`/`);
    nomeImg = arrayNomeImg[arrayNomeImg.length - 1];
    objetoAtual = mapFilmes.get(nomeImg);
}

// altera o backgrou com o filme selecionado
function alterarBackground() {
    divFilmePrincipal.style.background = `linear-gradient(rgba(0,0,0,.50), rgba(0,0,0,.50)100%), url('img/${objetoAtual.imgBack}')`;
    divFilmePrincipal.style.backgroundSize = 'cover';
    divFilmePrincipal.style.backgroundRepeat = 'no-repeat';
    divFilmePrincipal.style.height= '500px';
    divFilmePrincipal.classList.add('filme-principal-responsivo');
}

// Altera o titulo do filme destaque
function alterarTituloFilmeDestaque(){
    adicionarMensagemAoLabel(titulo, objetoAtual.titulo);
    titulo.classList.add("titulo")
}

// altera a descrição do filme destaque
function alterarDescricaoFilmeDestaque(){
    adicionarMensagemAoLabel(paragrafoDescricao, objetoAtual.descricao);
}
// altera visibilidade dos botões de assistir e mais informações
function alterarVisibilidadeBotoes(){
    btnAssistir.classList.remove('botao-invisivel')
    btnMaisInformacoes.classList.remove('botao-invisivel')
}

// carrega os eventos da página
function carregarEventosAndInformacoesPadrao() { 
    btnAssistir.addEventListener("click", assistirTrailerYoutube);
    if (imagens != null && imagens.length > 0) {
        for (let img of imagens) {
            img.addEventListener('mouseup', function () {
                alterarFilmeDestaque(img);
            })
        }
    }
}

  
$(document).ready(function() {
    // when the modal is opened autoplay it  
    $('#myModal').on('shown.bs.modal', function (e) {        
    // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
    $("#video").attr('src', objetoAtual.urlTrailerYoutube + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0" ); 
    })
    // stop playing the youtube video when I close the modal
    $('#myModal').on('hide.bs.modal', function (e) {
        // a poor man's stop video
        $("#video").attr('src',''); 
    }) 
// document ready  
});

carregarEventosAndInformacoesPadrao();