const CHAVE = 'api_key=71e536b40e46d8ed840cb40077454756';
const URL_BASE_API = 'https://api.themoviedb.org/3/';
const URL_FILME = 'movie/'
const LINGUAGEM_PT_BR = '&language=pt-br';
const URL_BASE_IMAGEM = 'https://www.themoviedb.org/t/p/';
const URL_BACKGROUND = URL_BASE_IMAGEM + 'original';
const URL_BUSCA_IMAGENS = '/images'
const URL_POSTER = URL_BASE_IMAGEM + 'w600_and_h900_bestv2';
const URL_BUSCA_VIDEOS = '/videos';
const URL_BUSCA_PARTICIPANTES_FILME = '/credits';
const URL_FOTO = URL_BASE_IMAGEM + 'w185';

class Equipe {
    constructor(id, nome, nomeOriginal, caminhoImagem, personagem){
        this.id =id;
        this.nome = nome;
        this.nomeOriginal = nomeOriginal;
        this.caminhoImagem = caminhoImagem;
        this.personagem = personagem;
    }

}

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
function recuperarPrimeiroVideoYoutube(videos){
    if (!videos || !videos.results || videos.results.length <= 0){
        return false;
    }    
    for (v of videos.results){
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

// recupera a equipe participante do filme
async function recuperarEquipeFilmeApi(id){
    let resposta = await realizarAcessoApi(URL_BASE_API+URL_FILME+id+URL_BUSCA_PARTICIPANTES_FILME+"?"+CHAVE);
    return resposta;
}


// recupera os 10 primeiros atores e os diretores do filme
async function recuperarAtoresPrincipaisAndDiretor(objetoApi){
    let mapEquipe = new Map();
    let equipe = await recuperarEquipeFilmeApi(objetoApi.id);
    if (!equipe || !equipe.cast ||equipe.cast.length <=0){
        console.log('Erro ao recuperar equipe do filme ', objetoApi);
    }
    let funcao = 'ator';
    let objetoAtor;
    let atores = []
    for (let i = 0; i <= equipe.cast.length && i < 10; i++){
        objetoAtor = equipe.cast[i];
        atores.push(new Equipe(objetoAtor.id, objetoAtor.name, objetoAtor.original_name, objetoAtor.profile_path, objetoAtor.character));
    }
    mapEquipe.set(funcao, atores);
    if (!equipe.crew || equipe.crew.length <= 0){
        return mapEquipe;
    }
    for (membro of equipe.crew){
        if (membro.job == 'Director'){
            let diretor = new Equipe(membro.id, membro.name, membro.original_name, membro.profile_path, '');
            mapEquipe.set('diretor', [diretor])
        }
    }
    return mapEquipe;
}