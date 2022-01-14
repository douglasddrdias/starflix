// Adiciona um texto na tela
function adicionarMensagemAoLabel(lblResultado, text) {
    let descricaoMensagem = document.createTextNode(text);
    limparLabel(lblResultado);
    lblResultado.appendChild(descricaoMensagem);
}

// marreta para diferenciar clicar e arrastar
let arrastouItem = false;
document.addEventListener('mousedown', () => arrastouItem = false);
document.addEventListener('mousemove', () => arrastouItem = true);

// Limpa as mensagem do label
function limparLabel(lblResultado) {
    while (lblResultado.firstChild) {
        lblResultado.removeChild(lblResultado.lastChild);
    }
}

// altera visibilidade dos botões de assistir e mais informações
function alterarVisibilidadeBotao(btn){
    btn.classList.remove('botao-invisivel')
}

// altera o backgrou com o filme selecionado
function alterarBackground(div, img) {
    div.style.background = `linear-gradient(rgba(0,0,0,.50), rgba(0,0,0,.50)100%), url('${img}')`;
    div.style.backgroundSize = 'cover';
    div.style.backgroundRepeat = 'no-repeat';
}

// carrega o owl carousel na tela
function carregarOwlCarousel(id){
    $(id).owlCarousel({
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

// Formata a data para o formato pt-br
function formatarData (dataParaFormatar){
    if (!dataParaFormatar){
        return 'Data não informada'
    }
    let data = new Date(dataParaFormatar);
    return data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});    
}

// gera um número inteiro aleatorio até o valor máximo
function getNumeroAleatorio(max) {
    return Math.floor(Math.random() * max + 1)
}