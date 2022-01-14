
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
let objetoAtual;
let arrayNomeImg;
let nomeImg;
let objetoAtualApi;
const divListaFilmes = document.getElementById('listaFilmes');
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

// Altera o titulo do filme destaque
function alterarTituloFilmeDestaque(){
    adicionarMensagemAoLabel(lblTitulo, objetoAtualApi.title);
    lblTitulo.classList.add("titulo")
}

// altera a descrição do filme destaque
function alterarDescricaoFilmeDestaque(){
    adicionarMensagemAoLabel(lblDescricao, objetoAtualApi.overview);
}
// altera visibilidade dos botões de assistir e mais informações
function alterarVisibilidadeBotoes(){
    alterarVisibilidadeBotao(btnAssistir);
    alterarVisibilidadeBotao(btnMaisInformacoes);
}

// carrega os eventos da página
async function carregarEventosAndInformacoesPadrao() { 
    btnAssistir.addEventListener("click", assistirTrailerYoutube);
    btnMaisInformacoes.addEventListener('click', recuperarMaisInformacoesFilme); 
    for (filme of arrayFilmes){
        let objetoApi = await recuperarMaisInformacoesFilmeNaApi(filme.idFilmeSwapi);
        carregarItemFilmesOwl(objetoApi);
    }
    carregarOwlCarousel('#listaFilmes');
}

function carregarItemFilmesOwl (objetoApi) {
    let divItem = criarDivItemOwl();
    let imagem = criarImgItemOwl(URL_POSTER + objetoApi.poster_path);
    imagem.addEventListener('click', function (){
        alterarFilmeDestaque(objetoApi);
    })
    divItem.appendChild(imagem);
    divListaFilmes.appendChild(divItem);   
}

// Altera as informações do modal de mais informações
async function recuperarMaisInformacoesFilme () {
    adicionarMensagemAoLabel(lblTituloMaisInformacoes, objetoAtualApi.title);
    adicionarMensagemAoLabel(lblTituloOriginal, objetoAtualApi.original_title);
    adicionarMensagemAoLabel(lblDataLancamento, formatarData(objetoAtualApi.release_date));
    adicionarMensagemAoLabel(lblNotaFilme, objetoAtualApi.vote_average);
    await alterarBackgroundComImagemApi(divCorpoMaisInformacoes);
}

async function alterarBackgroundComImagemApi (div) {
    let imagemApi = await recuperarAndSelecionarAleatoriamenteImagemBackgroud();
    alterarBackground(div, imagemApi);
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