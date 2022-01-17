class Filme {
    constructor(urlTrailerYoutube, idFilmeSwapi) {
        this.urlTrailerYoutube = urlTrailerYoutube;
        this.idFilmeSwapi = idFilmeSwapi;
    }
}

const btnMaisInformacoes = document.getElementById('mais-informacoes');
const btnAssistir = document.getElementById('assistir');
const divFilmePrincipal = document.getElementById('divFilmePrincipal');
const divCotainerFilme = document.getElementById('containerFilme');
let objetoAtualApi;
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
        limparItensSerieDestaque();
        objetoAtualApi = objetoApi;
        await alterarBackgroundComImagemApi(divFilmePrincipal);
        divFilmePrincipal.classList.add('filme-principal-responsivo');
        divFilmePrincipal.style.height = '500px';
        limparFilhosElemento(divCotainerFilme);
        alterarTituloFilmeDestaque();
        alterarDescricaoFilmeDestaque();
        mostrarBotooesFilme();
        // passar o focus
        sectionFilme.scrollIntoView();
    }
}

// Altera o titulo do filme destaque
function alterarTituloFilmeDestaque() {
    let lblTitulo = criarElementoAndAdicionaTexto('h3', objetoAtualApi.title);
    lblTitulo.classList.add("titulo");
    divCotainerFilme.appendChild(lblTitulo);
}

// altera a descrição do filme destaque
function alterarDescricaoFilmeDestaque() {
    let lblDescricao = criarElementoAndAdicionaTexto('p', objetoAtualApi.overview);
    lblDescricao.classList.add('descricao');
    divCotainerFilme.appendChild(lblDescricao);
}

// limpa os itens do filme destaque
function limparItensFilmeDestaque(){
    divFilmePrincipal.style.height = '0px';
    divFilmePrincipal.classList.remove('filme-principal-responsivo');
    limparFilhosElemento(divCotainerFilme);
    esconderBotoesFilme();
}

// altera visibilidade dos botões de assistir e mais informações
function mostrarBotooesFilme() {
    mostrarBotao(btnAssistir);
    mostrarBotao(btnMaisInformacoes);
}

// esconde os botões referente ao filme
function esconderBotoesFilme(){
    esconderBotao(btnAssistir)
    esconderBotao(btnMaisInformacoes)
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
    limparFilhosElemento(divContainerMaisInformacoes);
    adicionarMensagemAoLabel(lblTituloMaisInformacoes, objetoAtualApi.title);
    let divTitulo = criarLinhaTresPorNove('Titulo original:', objetoAtualApi.original_title);    
    divContainerMaisInformacoes.appendChild(divTitulo);
    let divDataLancamento = criarLinhaTresPorNove('Data lançamento:', formatarData(objetoAtualApi.release_date));
    divContainerMaisInformacoes.appendChild(divDataLancamento);
    let divNotaFilme = criarLinhaTresPorNove('Nota do filme:', objetoAtualApi.vote_average);
    divContainerMaisInformacoes.appendChild(divNotaFilme);
    let mapEquipe = await recuperarAtoresPrincipaisAndDiretor(objetoAtualApi);
    let diretor = mapEquipe.get('diretor')[0];
    let divDiretor = criarLinhaTresPorNove('Diretor:', diretor.nome);
    divContainerMaisInformacoes.appendChild(divDiretor);
    let divTituloElencoPrincipal = criarLinhaDozeColunasCentralizado('Elenco principal');
    divTituloElencoPrincipal.classList.add('margin-em-cima')
    divContainerMaisInformacoes.appendChild(divTituloElencoPrincipal);
    await alterarBackgroundComImagemApi(divCorpoMaisInformacoes);
    carregarAtoresOwl(mapEquipe);
}

// altera o background do filme com imagem da api
async function alterarBackgroundComImagemApi(div) {
    let imagemApi = await recuperarAndSelecionarAleatoriamenteImagemBackgroud(objetoAtualApi);
    alterarBackground(div, imagemApi);
}

// recupera o idVideoYoutube caso não seja encontrado nenhum é recuperado do array
async function assistirTrailerYoutube() {
    limparFilhosElemento(CORPO_MODAL_VIDEO);
    video = await recuperarVideoYoutube(objetoAtualApi);
    if (!video || !video.key) {
        idVideoYoutube = recuperarIdYoutubeArray(objetoAtualApi.id);
    } else {
        idVideoYoutube = video.key;
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

carregarEventosAndInformacoesPadrao();