const divContainerMaisInformacoes = document.getElementById('containerMaisInformacoes');
const lblTituloMaisInformacoes = document.getElementById('mais-informacoes-titulo');
const divCorpoMaisInformacoes = document.getElementById('corpoModalMaisInformacoes');
const URL_VIDEO_YOUTUBE = 'https://www.youtube.com/embed/';
const divCorpoModalVideo = document.getElementById('corpoModalVideo');
let idVideoYoutube;

// Adiciona um texto na tela
function adicionarMensagemAoLabel(lblResultado, text) {
    let descricaoMensagem = document.createTextNode(text);
    limparFilhosElemento(lblResultado);
    lblResultado.appendChild(descricaoMensagem);
}

// marreta para diferenciar clicar e arrastar
let arrastouItem = false;
document.addEventListener('mousedown', () => arrastouItem = false);
document.addEventListener('mousemove', () => arrastouItem = true);

// Limpa as mensagem do label
function limparFilhosElemento(lblResultado) {
    while (lblResultado.firstChild) {
        lblResultado.removeChild(lblResultado.lastChild);
    }
}

// altera visibilidade dos botões de assistir e mais informações
function mostrarBotao(btn) {
    btn.classList.remove('botao-invisivel')
}

function esconderBotao(btn){
    btn.classList.add('botao-invisivel')
}

// altera o backgrou com o filme selecionado
function alterarBackground(div, img) {
    div.style.background = `linear-gradient(rgba(0,0,0,.50), rgba(0,0,0,.50)100%), url('${img}')`;
    div.style.backgroundSize = 'cover';
    div.style.backgroundRepeat = 'no-repeat';
}

// carrega o owl carousel na tela
function carregarOwlCarousel(id) {
    $(id).owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        nav: false,
        caption: true,
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

// cria uma imagem para ser carregada no owl carousel
function criarImgItemOwl(poster) {
    let testImagem = document.createElement('img');
    testImagem.classList.add('box-filme');
    testImagem.src = poster;
    return testImagem;
}

// cria uma div para ser carregada no owl
function criarDivItemOwl() {
    let divItem = document.createElement('div');
    divItem.classList.add('item');
    return divItem;
}

// cria uma div para legenda do owl carousel
function criarDivItemOwlLegenda(){
    let divItem = document.createElement('div');
    divItem.classList.add('image-caption');
    divItem.classList.add('d-none');
    divItem.classList.add('d-md-block');
    return divItem
}

// Formata a data para o formato pt-br
function formatarData(dataParaFormatar) {
    if (!dataParaFormatar) {
        return 'Data não informada'
    }
    let data = new Date(dataParaFormatar);
    return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

// gera um número inteiro aleatorio até o valor máximo
function getNumeroAleatorio(max) {
    return Math.floor(Math.random() * max + 1)
}

// cria um elemento com o tipo passado por parâmetro e adiciona a mensagem ao mesmo
function criarElementoAndAdicionaTexto(tipoElemento, texto){
    let elemento = document.createElement(tipoElemento);
    adicionarMensagemAoLabel(elemento, texto);
    return elemento;
}

// cria uma linha de 3 colunas para titulo da informação e de 9 colunas para informação
function criarLinhaTresPorNove(titulo, informacao){
    let linha = criarLinhaBootStrap();
    let lblTitulo = criarElementoAndAdicionaTexto('label', titulo);
    lblTitulo.classList.add('col-lg-3');
    let lblInformacao = criarElementoAndAdicionaTexto('label', informacao);
    lblInformacao.classList.add('col-lg-9');
    linha.appendChild(lblTitulo);
    linha.appendChild(lblInformacao);
    return linha;
}

// cria uma div com a class row usado no bootstrap
function criarLinhaBootStrap() {
    let linha = document.createElement('div');
    linha.classList.add('row');
    return linha;
}

// cria uma linha de 12 colunas para informação 
function criarLinhaDozeColunasCentralizado(informacao){
    let linha = criarLinhaBootStrap();
    let lblInformacao = criarElementoAndAdicionaTexto('label', informacao);
    lblInformacao.classList.add('col-lg-12');
    lblInformacao.classList.add('text-center');
    linha.appendChild(lblInformacao);
    return linha;
}

// Carrega as informações de atores no owl
function carregarAtoresOwl(mapEquipe) {
    let linha = criarLinhaBootStrap();
    let divOwl = document.createElement('div');
    divOwl.classList.add('carrosel-filmes');
    let divListaAtores = document.createElement('div');
    divListaAtores.classList.add('owl-carousel')
    divListaAtores.classList.add('owl-theme');    
    let arrayAtores = mapEquipe.get('ator');
    // limparFilhosElemento(divListaAtores);
    divListaAtores.setAttribute('id', 'listaAtores');
    for (ator of arrayAtores) {
        carregarItemFilmesOwlAtor(ator, divListaAtores);
    }
    divOwl.appendChild(divListaAtores);
    linha.appendChild(divOwl);
    divContainerMaisInformacoes.appendChild(linha);
    // Marretinha para recarregar o owl
    // recarrega o owl carousel
    // var owl = $("#listaAtores");
    // owl.removeData("owl.carousel");
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

$(document).ready(function () {
    // when the modal is opened autoplay it  
    $('#myModal').on('shown.bs.modal', function (e) {
        // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
        $("#video").attr('src', URL_VIDEO_YOUTUBE + idVideoYoutube + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    // stop playing the youtube video when I close the modal
    $('#myModal').on('hide.bs.modal', function (e) {
        // a poor man's stop video
        $("#video").attr('src', '');
    })
    // document ready  
});