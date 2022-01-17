const btnMaisInformacoesSerie = document.getElementById('mais-informacoesSerie');
const btnAssistirSerie = document.getElementById('assistirSerie');
const divSeriePrincipal = document.getElementById('divSeriePrincipal');
const divCotainerSerie = document.getElementById('containerSerie');
let objetoAtualSerie;
const divListaSeries = document.getElementById('listaSerie');
const sectionSerie = document.getElementById('seriePrincipal');

// carrega as séries e monta o owl carousel para as mesmas
async function carregarEventosAndInformacoesPadraoSerie() {
    btnMaisInformacoesSerie.addEventListener('click', recuperarMaisInformacoesSerie);
    btnAssistirSerie.addEventListener('click', assistirTrailerYoutubeSerie)
    let resultadoSerie = await buscarSeries('star wars');
    if (!resultadoSerie || !resultadoSerie.results || resultadoSerie.results.length <= 0) {
        console.log('Erro ao recuperar as séries', resultadoSerie);
        return;
    }
    for (serie of resultadoSerie.results) {
        carregarItemSerieOwl(serie, divListaSeries);
    }
    carregarOwlCarousel('#listaSerie');
}

carregarEventosAndInformacoesPadraoSerie();

// Carrega os itens carousel de filme na tela
function carregarItemSerieOwl(serie, div) {
    if (!serie.overview) {
        return;
    }
    let divItem = criarDivItemOwl();
    let imagem = criarImgItemOwl(URL_POSTER + serie.poster_path);
    imagem.addEventListener('click', function () {
        alterarSerieDestaque(serie);
    })
    divItem.appendChild(imagem);
    div.appendChild(divItem);
}

// altera o filme selecionado
async function alterarSerieDestaque(serie) {
    if (!arrastouItem) {
        limparItensFilmeDestaque();
        objetoAtualSerie = serie;
        await alterarBackgroundComImagemApiSerie(divSeriePrincipal);
        divSeriePrincipal.classList.add('filme-principal-responsivo');
        limparFilhosElemento(divCotainerSerie);
        alterarTituloSerieDestaque();
        alterarDescricaoSerieDestaque();
        mostrarBotooesSerie();
        // passar o focus
        sectionSerie.scrollIntoView();
    }
}

// altera o background da serie com imagem da api
async function alterarBackgroundComImagemApiSerie(div) {
    let imagemApi = await recuperarAndSelecionarAleatoriamenteImagemBackgroudSerie(objetoAtualSerie);
    alterarBackground(div, imagemApi);
}

// Altera o titulo do filme destaque
function alterarTituloSerieDestaque() {
    let lblTitulo = criarElementoAndAdicionaTexto('h3', objetoAtualSerie.name);
    lblTitulo.classList.add("titulo");
    divCotainerSerie.appendChild(lblTitulo);
}

// altera a descrição do filme destaque
function alterarDescricaoSerieDestaque() {
    let lblDescricao = criarElementoAndAdicionaTexto('p', objetoAtualSerie.overview);
    lblDescricao.classList.add('descricao');
    divCotainerSerie.appendChild(lblDescricao);
}

// altera visibilidade dos botões de assistir e mais informações
function mostrarBotooesSerie() {
    mostrarBotao(btnAssistirSerie);
    mostrarBotao(btnMaisInformacoesSerie);
}

// esconde os botões referente ao filme
function esconderBotoesSerie() {
    esconderBotao(btnAssistirSerie)
    esconderBotao(btnMaisInformacoesSerie)
}

// limpa os itens do filme destaque
function limparItensSerieDestaque() {
    divSeriePrincipal.style.height = '0px';
    divSeriePrincipal.classList.remove('filme-principal-responsivo');
    limparFilhosElemento(divCotainerSerie);
    esconderBotoesSerie();
}

// Altera as informações do modal de mais informações
async function recuperarMaisInformacoesSerie() {
    limparFilhosElemento(divContainerMaisInformacoes);
    adicionarMensagemAoLabel(lblTituloMaisInformacoes, objetoAtualSerie.name);
    let divTitulo = criarLinhaTresPorNove('Titulo original:', objetoAtualSerie.original_name);
    divContainerMaisInformacoes.appendChild(divTitulo);
    let divDataLancamento = criarLinhaTresPorNove('Data lançamento:', formatarData(objetoAtualSerie.first_air_date));
    divContainerMaisInformacoes.appendChild(divDataLancamento);
    let divNotaFilme = criarLinhaTresPorNove('Nota do filme:', objetoAtualSerie.vote_average);
    divContainerMaisInformacoes.appendChild(divNotaFilme);
    let mapEquipe = await recuperarAtoresPrincipaisAndDiretorSerie(objetoAtualSerie);
    if (mapEquipe.has('diretor')) {
        let diretor = mapEquipe.get('diretor')[0];
        let divDiretor = criarLinhaTresPorNove('Diretor:', diretor.nome);
        divContainerMaisInformacoes.appendChild(divDiretor);
    }
    let divTituloElencoPrincipal = criarLinhaDozeColunasCentralizado('Elenco principal');
    divTituloElencoPrincipal.classList.add('margin-em-cima')
    divContainerMaisInformacoes.appendChild(divTituloElencoPrincipal);
    await alterarBackgroundComImagemApiSerie(divCorpoMaisInformacoes);
    carregarAtoresOwl(mapEquipe);
}

// recupera o idVideoYoutube 
async function assistirTrailerYoutubeSerie() {
    limparFilhosElemento(divCorpoModalVideo);
    video = await recuperarVideoYoutubeSerie(objetoAtualSerie);
    if (!video){
        let lblErro = criarElementoAndAdicionaTexto('h5', 'Não foi encontrado nenhum vídeo para esta série');
        lblErro.classList.add('meu-container');
        divCorpoModalVideo.appendChild(lblErro);
    }
    idVideoYoutube = video.key;

}
