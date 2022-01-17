
class Filme {
    constructor(urlTrailerYoutube, idFilmeSwapi) {
        this.urlTrailerYoutube = urlTrailerYoutube;
        this.idFilmeSwapi = idFilmeSwapi;
    }
}
// mais informações
const lblTituloMaisInformacoes = document.getElementById('mais-informacoes-titulo');
const lblTituloOriginal = document.getElementById('tituloOriginal');
const btnMaisInformacoes = document.getElementById('mais-informacoes');
const lblDataLancamento = document.getElementById('dataLancamento');
const lblNotaFilme = document.getElementById('notaFilme');
const divCorpoMaisInformacoes = document.getElementById('corpoModalMaisInformacoes');
const divListaAtores = document.getElementById('listaAtores');
const lblDiretor = document.getElementById('diretorFilme');
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
const URL_VIDEO_YOUTUBE = 'https://www.youtube.com/embed/';
let idVideoYoutube;
const divListaFilmes = document.getElementById('listaFilmes');
const sectionFilme = document.getElementById('filmePrincipal');
const arrayFilmes = [new Filme('jVrf_bKTjo4', '11'),
new Filme('bD7bpG-zDJQ', '1893'),
new Filme('-di3XYRxyHY', '181808'),
new Filme('yMglylP5xhA', '140607'),
new Filme('jiRTfUYOHCs', '181812'),
new Filme('n7DQ9SdjUmg', '1894'),
new Filme('znpliCR0_Kw', '1895'),
new Filme('4KnAyxgZ3Vo', '1891'),
new Filme('BT-fVW24-q4', '1892'),
new Filme('EQpr5HXTvmg', '348350'),
new Filme('9oISQcXuki0', '330459')
];


// altera o filme selecionado
async function alterarFilmeDestaque(objetoApi) {
    if (!arrastouItem) {
        objetoAtualApi = objetoApi;
        await alterarBackgroundComImagemApi(divFilmePrincipal);
        divFilmePrincipal.classList.add('filme-principal-responsivo');
        divFilmePrincipal.style.height = '500px'
        alterarTituloFilmeDestaque();
        alterarDescricaoFilmeDestaque();
        alterarVisibilidadeBotoes();
        // passar o focus
        sectionFilme.scrollIntoView();
    }
}

// Altera o titulo do filme destaque
function alterarTituloFilmeDestaque() {
    adicionarMensagemAoLabel(lblTitulo, objetoAtualApi.title);
    lblTitulo.classList.add("titulo")
}

// altera a descrição do filme destaque
function alterarDescricaoFilmeDestaque() {
    adicionarMensagemAoLabel(lblDescricao, objetoAtualApi.overview);
}
// altera visibilidade dos botões de assistir e mais informações
function alterarVisibilidadeBotoes() {
    alterarVisibilidadeBotao(btnAssistir);
    alterarVisibilidadeBotao(btnMaisInformacoes);
}

// carrega os eventos da página
async function carregarEventosAndInformacoesPadrao() {
    btnAssistir.addEventListener("click", assistirTrailerYoutube);
    btnMaisInformacoes.addEventListener('click', recuperarMaisInformacoesFilme);
    for (filme of arrayFilmes) {
        let objetoApi = await recuperarMaisInformacoesFilmeNaApi(filme.idFilmeSwapi);
        carregarItemFilmesOwlFilme(objetoApi, divListaFilmes);
    }
    carregarOwlCarousel('#listaFilmes');
    carregarOwlCarousel('#listaAtores');
}

// Carrega os itens carousel de filme na tela
function carregarItemFilmesOwlFilme(objetoApi, div) {
    let divItem = criarDivItemOwl();
    let imagem = criarImgItemOwl(URL_POSTER + objetoApi.poster_path);
    imagem.addEventListener('click', function () {
        alterarFilmeDestaque(objetoApi);
    })
    divItem.appendChild(imagem);
    div.appendChild(divItem);
}

// Altera as informações do modal de mais informações
async function recuperarMaisInformacoesFilme() {
    adicionarMensagemAoLabel(lblTituloMaisInformacoes, objetoAtualApi.title);
    adicionarMensagemAoLabel(lblTituloOriginal, objetoAtualApi.original_title);
    adicionarMensagemAoLabel(lblDataLancamento, formatarData(objetoAtualApi.release_date));
    adicionarMensagemAoLabel(lblNotaFilme, objetoAtualApi.vote_average);
    await alterarBackgroundComImagemApi(divCorpoMaisInformacoes);
    let mapEquipe = await recuperarAtoresPrincipaisAndDiretor(objetoAtualApi);
    carregarAtoresOwl(mapEquipe);
    let diretor = mapEquipe.get('diretor')[0];
    adicionarMensagemAoLabel(lblDiretor, diretor.nome);
}

// Carrega as informações de atores no owl
function carregarAtoresOwl(mapEquipe) {
    let arrayAtores = mapEquipe.get('ator');
    limparFilhosElemento(divListaAtores);
    for (ator of arrayAtores) {
        carregarItemFilmesOwlAtor(ator, divListaAtores);
    }

    // recarrega o owl carousel
    var owl = $("#listaAtores");
    owl.removeData("owl.carousel");
    carregarOwlCarousel('#listaAtores');    
}

// Carrega os itens carousel de filme na tela
function carregarItemFilmesOwlAtor(ator, div) {
    if (!ator.caminhoImagem) {
        return false;
    } else {
        let divItem = criarDivItemOwl();
        let imagem = criarImgItemOwl(URL_FOTO + ator.caminhoImagem);
        divItem.appendChild(imagem);
        let divDetalhesAtor = criarDivItemOwlLegenda();
        let h5 = criarElementoAndAdicionaTexto('h5', ator.nome);
        let p = criarElementoAndAdicionaTexto('p', ator.personagem);
        divDetalhesAtor.appendChild(h5);
        divDetalhesAtor.appendChild(p);
        divItem.appendChild(divDetalhesAtor);
        div.appendChild(divItem);
    }
}

// altera o background do filme com imagem da api
async function alterarBackgroundComImagemApi(div) {
    let imagemApi = await recuperarAndSelecionarAleatoriamenteImagemBackgroud(objetoAtualApi);
    alterarBackground(div, imagemApi);
}

// recupera o idVideoYoutube caso não seja encontrado nenhum é recuperado do array
async function assistirTrailerYoutube() {
    video = await recuperarVideoYoutube(objetoAtualApi);
    if (!video || !video.key) {
        idVideoYoutube = recuperarIdYoutubeArray(objetoAtualApi.id);
    } else {
        idVideoYoutube = video.key;
        console.log('id no assistir trailer ', idVideoYoutube);
    }

}

// recupera o idVideoYoutube para o id passado 
function recuperarIdYoutubeArray(id) {
    for (f of arrayFilmes) {
        if (f.idFilmeSwapi == id) {
            return f.urlTrailerYoutube;
        }
    }
}

$(document).ready(function () {
    // when the modal is opened autoplay it  
    $('#myModal').on('shown.bs.modal', function (e) {
        // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
        console.log(URL_VIDEO_YOUTUBE + idVideoYoutube + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        $("#video").attr('src', URL_VIDEO_YOUTUBE + idVideoYoutube + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    // stop playing the youtube video when I close the modal
    $('#myModal').on('hide.bs.modal', function (e) {
        // a poor man's stop video
        $("#video").attr('src', '');
    })
    // document ready  
});

carregarEventosAndInformacoesPadrao();