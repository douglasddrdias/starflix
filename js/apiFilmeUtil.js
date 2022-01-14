// const alterarBackgroundComImagemApi = async (div) => {
//     let imagemApi = await recuperarAndSelecionarAleatoriamenteImagemBackgroud();
//     alterarBackground(div, URL_BACKGROUND + imagemApi);
// }

const CHAVE = 'api_key=71e536b40e46d8ed840cb40077454756';
const URL_BASE_API = 'https://api.themoviedb.org/3/';
const URL_FILME = 'movie/'
const LINGUAGEM_PT_BR = '&language=pt-br';
const URL_BACKGROUND = 'https://www.themoviedb.org/t/p/original';
const URL_BUSCA_IMAGENS = '/images'
const URL_POSTER ='https://www.themoviedb.org/t/p/w600_and_h900_bestv2';

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
const recuperarAndSelecionarAleatoriamenteImagemBackgroud= async () =>{
    let imagensApi = await recuperarImagensFilmeNaApi(objetoAtualApi.id);
    if (!imagensApi || !imagensApi.backdrops || imagensApi.backdrops.length <= 0){
        return objetoAtualApi.backdrop_path;
    }
    let numeroAleatorio = getNumeroAleatorio(imagensApi.backdrops.length -1);
    return URL_BACKGROUND + imagensApi.backdrops[numeroAleatorio].file_path;
}