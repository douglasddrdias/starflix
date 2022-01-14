const CHAVE = 'api_key=71e536b40e46d8ed840cb40077454756';
const URL_BASE_API = 'https://api.themoviedb.org/3/';
const URL_FILME = 'movie/'
const LINGUAGEM_PT_BR = '&language=pt-br';
const URL_BASE_IMAGEM = 'https://www.themoviedb.org/t/p/';
const URL_BACKGROUND = URL_BASE_IMAGEM + 'original';
const URL_BUSCA_IMAGENS = '/images'
const URL_POSTER = URL_BASE_IMAGEM + 'w600_and_h900_bestv2';
const URL_BUSCA_VIDEOS = '/videos';

// recupera as imagens relacionadas ao filme selecionado
async function recuperarImagensFilmeNaApi (id) {
    let resposta = await realizarAcessoApi(URL_BASE_API+URL_FILME+id+URL_BUSCA_IMAGENS+'?'+CHAVE);
    return resposta;
}

// realiza o acesso ao api e recupera a url da imagem
async function recuperarMaisInformacoesFilmeNaApi(id) {
    let resposta = await realizarAcessoApi(URL_BASE_API+URL_FILME+id+'?'+CHAVE+LINGUAGEM_PT_BR);
    return resposta;
}

// realiza o acesso a api da url passada por parâmetro e retorna o JSON
async function realizarAcessoApi (url){
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

// recupera uma imagem para background 
async function recuperarAndSelecionarAleatoriamenteImagemBackgroud(objetoApi){
    let imagensApi = await recuperarImagensFilmeNaApi(objetoApi.id);
    if (!imagensApi || !imagensApi.backdrops || imagensApi.backdrops.length <= 0){
        return objetoApi.backdrop_path;
    }
    let numeroAleatorio = getNumeroAleatorio(imagensApi.backdrops.length -1);
    return URL_BACKGROUND + imagensApi.backdrops[numeroAleatorio].file_path;
}

// recupera os videos associados ao filme caso não ache um em pt-br refaz a busca sem liguagem associada
async function recuperarVideoYoutube(objetoApi){
    let videos = await recuperarVideosNaApi(objetoApi.id, LINGUAGEM_PT_BR);
    let videoYoutube = recuperarPrimeiroVideoYoutube(videos);
    if (!videoYoutube){
        videos = await recuperarVideosNaApi(objetoApi.id);
        videoYoutube = recuperarPrimeiroVideoYoutube(videos);
    }
    return videoYoutube;
}

// recupera o primeiro video com site igual a youtube 
async function recuperarPrimeiroVideoYoutube(videos){
    if (!videos || !videos.result || videos.result.length <= 0){
        return false;
    }
    for (v of videos.result){
        if (v.site === "YouTube"){
            return v;
        }
    }
    return false;
}

// recupera os videos associados ao filme
async function recuperarVideosNaApi(id, linguagem = ''){
    let resposta = await realizarAcessoApi(URL_BASE_API+URL_FILME+id+URL_BUSCA_VIDEOS+'?'+CHAVE + linguagem);
    return resposta;    
}