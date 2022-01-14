
class Filme {
    constructor(urlTrailerYoutube, idFilmeSwapi){
        this.urlTrailerYoutube = urlTrailerYoutube;
        this.idFilmeSwapi = idFilmeSwapi;
    }
}
const assistirTrailerYoutube = () => {

}
// mais informações
const lblTituloMaisInformacoes = document.getElementById('mais-informacoes-titulo');
const lblTituloOriginal = document.getElementById('tituloOriginal');
const btnMaisInformacoes = document.getElementById('mais-informacoes');
const lblDataLancamento = document.getElementById('dataLancamento');
const lblNotaFilme = document.getElementById('notaFilme');
const divCorpoMaisInformacoes = document.getElementById('corpoModalMaisInformacoes');
// mais informações
const lblDescricao = document.getElementById('descricao');
const btnAssistir = document.getElementById('assistir');
const imagens = document.querySelectorAll('img.box-filme');
const divFilmePrincipal = document.querySelector('div.filme-principal');
const lblTitulo = document.getElementById('titulo');
const frameVideo = document.getElementById('video');
const CHAVE = 'api_key=71e536b40e46d8ed840cb40077454756';
const URL_BASE_API = 'https://api.themoviedb.org/3/';
const URL_FILME = 'movie/'
const LINGUAGEM_PT_BR = '&language=pt-br';
const URL_BACKGROUND = 'https://www.themoviedb.org/t/p/original';
const URL_BUSCA_IMAGENS = '/images'
const URL_POSTER ='https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
let objetoAtual;
let arrayNomeImg;
let nomeImg;
let objetoAtualApi;
const divListaFilmes = document.getElementById('listaFilmes');
const mapFilmes = new Map([
    ["star-wars-nova-esperanca.jpg",new Filme('https://www.youtube.com/embed/jVrf_bKTjo4','11')],
    ["star-wars-a-ameaca-fantasma.jpg", new Filme('https://www.youtube.com/embed/bD7bpG-zDJQ', '1893')],
    ["star-wars-ultimos-jedi.jpg", new Filme('https://www.youtube.com/embed/-di3XYRxyHY', '181808')],
    ["star-wars-despertar-da-forca.jpg", new Filme('https://www.youtube.com/embed/yMglylP5xhA', '140607')],
    ["star-wars-a-ascensao-skywalker.jpg", new Filme('https://www.youtube.com/embed/jiRTfUYOHCs', '181812')],
    ["star-wars-ataque-dos-clones.jpg", new Filme('https://www.youtube.com/embed/n7DQ9SdjUmg', '1894')],
    ["star-wars-a-vinganca-dos-sith.jpg", new Filme('https://www.youtube.com/embed/znpliCR0_Kw', '1895')],
    ["star-wars-imperio-contra-ataca.jpg", new Filme('https://www.youtube.com/embed/4KnAyxgZ3Vo', '1891')],
    ["star-wars-retorno-jedi.jpg", new Filme('https://www.youtube.com/embed/BT-fVW24-q4', '1892')],
    ["star-wars-han-solo.jpg", new Filme('https://www.youtube.com/embed/EQpr5HXTvmg', '348350')],
    ["star-wars-rogue-one.jpg", new Filme('https://www.youtube.com/embed/9oISQcXuki0', '330459')]    
])
const arrayFilmes = [new Filme('https://www.youtube.com/embed/jVrf_bKTjo4','11'), 
                     new Filme('https://www.youtube.com/embed/bD7bpG-zDJQ', '1893'),
                     new Filme('https://www.youtube.com/embed/-di3XYRxyHY', '181808'),
                     new Filme('https://www.youtube.com/embed/yMglylP5xhA', '140607'),
                     new Filme('https://www.youtube.com/embed/jiRTfUYOHCs', '181812'),
                     new Filme('https://www.youtube.com/embed/n7DQ9SdjUmg', '1894'),
                     new Filme('https://www.youtube.com/embed/znpliCR0_Kw', '1895'), 
                     new Filme('https://www.youtube.com/embed/4KnAyxgZ3Vo', '1891'),
                     new Filme('https://www.youtube.com/embed/BT-fVW24-q4', '1892'),
                     new Filme('https://www.youtube.com/embed/EQpr5HXTvmg', '348350'),
                     new Filme('https://www.youtube.com/embed/9oISQcXuki0', '330459')  
                    ];
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
async function  alterarFilmeDestaque(objetoApi) {
    if (!arrastouItem) {
        objetoAtualApi = objetoApi;
        await alterarBackgroundComImagemApi(divFilmePrincipal);
        divFilmePrincipal.classList.add('filme-principal-responsivo');
        divFilmePrincipal.style.height= '500px'
        alterarTituloFilmeDestaque();
        alterarDescricaoFilmeDestaque();
        alterarVisibilidadeBotoes();
    }
}
function recuperarObjetoAtual(id) {
    objetoAtual = mapFilmes.get(nomeImg);
}

// altera o backgrou com o filme selecionado
function alterarBackground(div, img) {
    div.style.background = `linear-gradient(rgba(0,0,0,.50), rgba(0,0,0,.50)100%), url('${img}')`;
    div.style.backgroundSize = 'cover';
    div.style.backgroundRepeat = 'no-repeat';
}

// Altera o titulo do filme destaque
function alterarTituloFilmeDestaque(){
    // adicionarMensagemAoLabel(lblTitulo, objetoAtual.titulo);
    adicionarMensagemAoLabel(lblTitulo, objetoAtualApi.title);
    lblTitulo.classList.add("titulo")
}

// altera a descrição do filme destaque
function alterarDescricaoFilmeDestaque(){
    adicionarMensagemAoLabel(lblDescricao, objetoAtualApi.overview);
}
// altera visibilidade dos botões de assistir e mais informações
function alterarVisibilidadeBotoes(){
    btnAssistir.classList.remove('botao-invisivel')
    btnMaisInformacoes.classList.remove('botao-invisivel')
}

// carrega os eventos da página
async function carregarEventosAndInformacoesPadrao() { 
    btnAssistir.addEventListener("click", assistirTrailerYoutube);
    btnMaisInformacoes.addEventListener('click', recuperarMaisInformacoesFilme); 
    for (filme of arrayFilmes){
        let objetoApi = await recuperarMaisInformacoesFilmeNaApi(filme.idFilmeSwapi);
        carregarItemFilmesOwl(objetoApi);
    }
    carregarOwlCarousel();
}


// carrega o owl carousel na tela
function carregarOwlCarousel(){
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
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
}

const carregarItemFilmesOwl = (objetoApi) => {
    let divItem = criarDivItemOwl();
    let imagem = criarImgItemOwl(URL_POSTER + objetoApi.poster_path);
    imagem.addEventListener('click', function (){
        alterarFilmeDestaque(objetoApi);
    })
    divItem.appendChild(imagem);
    divListaFilmes.appendChild(divItem);   
}

function criarImgItemOwl(poster) {
    let testImagem = document.createElement('img');
    testImagem.classList.add('box-filme');
    testImagem.src = poster;
    return testImagem;
}

function criarDivItemOwl() {
    let divItem = document.createElement('div');
    divItem.classList.add('item');
    return divItem;
}

// Altera as informações do modal de mais informações
const recuperarMaisInformacoesFilme = async () => {
    await recuperarObjetoAtualApi();
    adicionarMensagemAoLabel(lblTituloMaisInformacoes, objetoAtualApi.title);
    adicionarMensagemAoLabel(lblTituloOriginal, objetoAtualApi.original_title);
    adicionarMensagemAoLabel(lblDataLancamento, formatarData(objetoAtualApi.release_date));
    adicionarMensagemAoLabel(lblNotaFilme, objetoAtualApi.vote_average);
    await alterarBackgroundComImagemApi(divCorpoMaisInformacoes);
}

const alterarBackgroundComImagemApi = async (div) => {
    let imagemApi = await recuperarAndSelecionarAleatoriamenteImagemBackgroud();
    alterarBackground(div, URL_BACKGROUND + imagemApi);
}
// recupera uma imagem para background 
const recuperarAndSelecionarAleatoriamenteImagemBackgroud= async () =>{
    let imagensApi = await recuperarImagensFilmeNaApi(objetoAtualApi.id);
    if (!imagensApi || !imagensApi.backdrops || imagensApi.backdrops.length <= 0){
        return objetoAtualApi.backdrop_path;
    }
    let numeroAleatorio = getNumeroAleatorio(imagensApi.backdrops.length -1);
    return imagensApi.backdrops[numeroAleatorio].file_path;
}

// recupera as informações do filme na api
async function recuperarObjetoAtualApi() {
    objetoAtualApi = await recuperarMaisInformacoesFilmeNaApi(objetoAtualApi.id);
}

// gera um número inteiro aleatorio até o valor máximo
function getNumeroAleatorio(max) {
    return Math.floor(Math.random() * max + 1)
}

// recupera as imagens relacionadas ao filme selecionado
const recuperarImagensFilmeNaApi = async (id) =>{
    let resposta = await realizarAcessoApi(URL_BASE_API+URL_FILME+id+URL_BUSCA_IMAGENS+'?'+CHAVE);
    return resposta;
}

// Formata a data para o formato pt-br
const formatarData = (dataParaFormatar) => {
    if (!dataParaFormatar){
        return 'Data não informada'
    }
    let data = new Date(dataParaFormatar);
    return data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});    
}

// realiza o acesso ao api e recupera a url da imagem
const recuperarMaisInformacoesFilmeNaApi = async (id) => {
    let resposta = await realizarAcessoApi(URL_BASE_API+URL_FILME+id+'?'+CHAVE+LINGUAGEM_PT_BR);
    return resposta;
}

// realiza o acesso a api da url passada por parâmetro e retorna o JSON
const realizarAcessoApi = async (url) => {
    try {
        const resposta = await fetch(url);
        const json = await resposta.json();
        return json;
    } catch (e) {
        console.log(e);
    }
    if (!resposta){
        console.log("Erro ao recuperar os dados da API!");
    }    
    return resposta;
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

/*Poster
https://www.themoviedb.org/t/p/w600_and_h900_bestv2/dLGT8b4Ut10z44uYLaip4QiwKta.jpg

back
https://www.themoviedb.org/t/p/original/aJCtkxLLzkk1pECehVjKHA2lBgw.jpg*/