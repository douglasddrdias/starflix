const URL_BUSCA_SERIES = URL_BASE_API + 'search/tv?' + CHAVE;
const URL_SERIE = 'tv/'

// realiza a busca pelas séries pela query passada por parâmetro
async function buscarSeries(query){
    let result = await realizarAcessoApi(URL_BUSCA_SERIES+'&query='+query+LINGUAGEM_PT_BR);
    return result;
}

// recupera uma imagem para background 
async function recuperarAndSelecionarAleatoriamenteImagemBackgroudSerie(serie){
    let imagensApi = await recuperarImagensSerieNaApi(serie.id);
    if (!imagensApi || !imagensApi.backdrops || imagensApi.backdrops.length <= 0){
        return serie.backdrop_path;
    }
    let numeroAleatorio = getNumeroAleatorio(imagensApi.backdrops.length -1);
    return URL_BACKGROUND + imagensApi.backdrops[numeroAleatorio].file_path;
}

// recupera as imagens relacionadas ao filme selecionado
async function recuperarImagensSerieNaApi (id) {
    let resposta = await realizarAcessoApi(URL_BASE_API+URL_SERIE+id+URL_BUSCA_IMAGENS+'?'+CHAVE);
    return resposta;
}

// recupera os 10 primeiros atores e os diretores do filme
async function recuperarAtoresPrincipaisAndDiretorSerie(serie){
    let mapEquipe = new Map();
    let equipe = await recuperarEquipeSerieApi(serie.id);
    if (!equipe || !equipe.cast ||equipe.cast.length <=0){
        console.log('Erro ao recuperar equipe da serie ', serie);
    }
    let funcao = 'ator';
    let objetoAtor;
    let atores = []
    for (let i = 0; i < equipe.cast.length && i < 10; i++){
        objetoAtor = equipe.cast[i];
        atores.push(new Equipe(objetoAtor.id, objetoAtor.name, objetoAtor.original_name, objetoAtor.profile_path, objetoAtor.character));
    }

    mapEquipe.set(funcao, atores);
    if (!equipe.crew || equipe.crew.length <= 0){
        return mapEquipe;
    }
    for (membro of equipe.crew){
        if (membro.known_for_department == 'Directing'){
            let diretor = new Equipe(membro.id, membro.name, membro.original_name, membro.profile_path, '');
            mapEquipe.set('diretor', [diretor])
        }
    }
    return mapEquipe;
}

// recupera a equipe participante do filme
async function recuperarEquipeSerieApi(id){
    let resposta = await realizarAcessoApi(URL_BASE_API+URL_SERIE+id+URL_BUSCA_PARTICIPANTES_FILME+"?"+CHAVE);
    return resposta;
}

// recupera os videos associados a serie caso não ache um em pt-br refaz a busca sem liguagem associada
async function recuperarVideoYoutubeSerie(objetoApi){
    let videos = await recuperarVideosSerieNaApi(objetoApi.id, LINGUAGEM_PT_BR);
    let videoYoutube = recuperarPrimeiroVideoYoutube(videos);
    if (!videoYoutube){
        videos = await recuperarVideosSerieNaApi(objetoApi.id);
        videoYoutube = recuperarPrimeiroVideoYoutube(videos);
    }
    return videoYoutube;
}

// recupera os videos associados ao filme
async function recuperarVideosSerieNaApi(id, linguagem = ''){
    let resposta = await realizarAcessoApi(URL_BASE_API+URL_SERIE+id+URL_BUSCA_VIDEOS+'?'+CHAVE + linguagem);
    return resposta;    
}