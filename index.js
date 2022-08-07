import {Dica} from "./Dica.js"

const titulo = document.getElementById("titulo");
const linguagemSkill = document.getElementById("linguagemSkill")
const categoria = document.getElementById("categoria");
const descricao = document.getElementById("descricao");
const urlYouTube = document.getElementById("urlYouTube");
const tituloInvalido = document.getElementById("tituloInvalido");
const linguagemInvalida = document.getElementById("linguagemInvalida");
const categoriaInvalida = document.getElementById("categoriaInvalida");
const descricaoInvalida = document.getElementById("descricaoInvalida");
const urlInvalida = document.getElementById("urlInvalida");
const botaoLimpaForm = document.getElementById("limpaForm");
const formDica = document.getElementById("formDica");
const listaDeCards = document.getElementById("listaDeCards");
const indiceEdicao = document.getElementById("indiceEdicao"); 
const totalDeDicas = document.getElementById("totalDicas");
const totalDicasFront = document.getElementById("totalDicasFront");
const totalDicasBack = document.getElementById("totalDicasBack");
const totalDicasFull = document.getElementById("totalDicasFull");
const totalDicasSoft = document.getElementById("totalDicasSoft");
const botaoPesquisaDica = document.getElementById("botaoPesquisaDica");
const campoPesquisa = document.getElementById("campoPesquisa");
const botaoLimpaPesquisa = document.getElementById("botaoLimpaPesquisa");

const limpaForm = () => {
    indiceEdicao.value="";
    titulo.value="";
    linguagemSkill.value="";
    categoria.value="0";
    descricao.value="";
    urlYouTube.value="";
    tituloInvalido.innerHTML="";
    linguagemInvalida.innerHTML="";
    categoriaInvalida.innerHTML="";
    descricaoInvalida.innerHTML="";
    urlInvalida.innerHTML="";
}

const criaCard = (card) =>{
    let liCardDica = document.createElement("li"); 
    let divTitulo = document.createElement("div"); 
    let divDadosCard = document.createElement("div");                                   
    let divParagrafoCard = document.createElement("div"); 
    let pCard = document.createElement("p");  
    let divCardButtons = document.createElement("div"); 
    let botaoDeletar = document.createElement("button");
    let botaoEditar = document.createElement("button");
    let botaoYoutube = document.createElement("button");                      

    liCardDica.classList.add("cardDica");
    divTitulo.classList.add("tituloCard");
    divDadosCard.classList.add("dadosCard");
    divParagrafoCard.classList.add("paragrafoCard");
    divCardButtons.classList.add("cardButtons");

    botaoDeletar.classList.add("cardButton");
    botaoDeletar.innerHTML = ("<img src='./images/deletar.svg'></img>");
    botaoDeletar.onclick = () => deleta(card.id);

    botaoEditar.classList.add("cardButton");
    botaoEditar.innerHTML = ("<img src='./images/editar.svg'></img>");
    botaoEditar.onclick = () => edita(card.id);

    botaoYoutube.classList.add("cardButton");
    botaoYoutube.innerHTML = ("<img src='./images/video.svg'></img>");
    botaoYoutube.onclick = () => abreVideo(card.video);

    divTitulo.innerHTML = (`<h2>${card.titulo}</h2>`);
    divDadosCard.innerHTML = (`<span><strong>Linguagem/Skill:</strong>${card.linguagem}</span>
    <span><strong>Categoria:</strong>${card.categoria}</span>`);
    pCard.innerHTML = card.descricao;
    divParagrafoCard.appendChild(pCard);
    divCardButtons.appendChild(botaoDeletar);
    divCardButtons.appendChild(botaoEditar);

    if(card.video) divCardButtons.appendChild(botaoYoutube);

    liCardDica.appendChild(divTitulo);
    liCardDica.appendChild(divDadosCard);
    liCardDica.appendChild(divParagrafoCard);
    liCardDica.appendChild(divParagrafoCard)
    liCardDica.appendChild(divCardButtons);

    listaDeCards.appendChild(liCardDica);
    limpaForm(); 
}

const atualizaTotais = () =>{
    totalDeDicas.innerHTML = lStorage.length;
    totalDicasFront.innerHTML = lStorage.filter((item)=> item.categoria === "FrontEnd").length;
    totalDicasBack.innerHTML = lStorage.filter((item)=> item.categoria === "BackEnd").length;
    totalDicasFull.innerHTML = lStorage.filter((item)=> item.categoria === "FullStack").length;
    totalDicasSoft.innerHTML = lStorage.filter((item)=> item.categoria === "Comportamental/Soft").length;
}

let lStorage = JSON.parse(localStorage.getItem("listaDeDicas"))
if (!lStorage)
    lStorage = [];
    lStorage.forEach(card => {
        criaCard (card);
    });
atualizaTotais();

formDica.addEventListener("submit", (event) => {
    event.preventDefault();
    if (indiceEdicao.value){
        let validacao = validaForm(event)
        console.log(validacao);
        if (validacao===true){
            const card = new Dica(titulo.value, linguagemSkill.value, categoria.value, descricao.value, urlYouTube.value);
            lStorage.splice(indiceEdicao.value,1,card)
            localStorage.setItem("listaDeDicas",JSON.stringify(lStorage));
            listaDeCards.innerHTML="";
            lStorage.forEach(card => {
                criaCard (card);
            });
            atualizaTotais();
            alert("Dica alterada com sucesso!");
            return;
        };
    };
    if (validaForm(event)===true){
        const card = new Dica(titulo.value, linguagemSkill.value, categoria.value, descricao.value, urlYouTube.value);
        lStorage.push(card);
        criaCard(card);
        localStorage.setItem("listaDeDicas",JSON.stringify(lStorage));
        atualizaTotais();
        alert("Dica cadastrada com sucesso!");
        return;
    }
});

function validaForm(event){
    if (event.target.titulo.value.length < 8 || event.target.titulo.value.length >64){
            return (tituloInvalido.innerHTML = 'Título deve ter entre 8 e 64 caracteres');
    }
    if (event.target.linguagemSkill.value.length < 4 || event.target.linguagemSkill.value.length > 16){
        return (linguagemInvalida.innerHTML = 'Skill deve ter entre 4 e 16 caracteres',tituloInvalido.innerHTML = '');
    }
    if (event.target.categoria.value == "0"){
        return (categoriaInvalida.innerHTML = 'Selecione uma categoria!',linguagemInvalida.innerHTML = '',tituloInvalido.innerHTML = '');
        
    }
    if (event.target.descricao.value.length < 32 || event.target.descricao.value.length > 512){
        return (descricaoInvalida.innerHTML = 'Descrição deve ter entre 32 e 512 caracteres',categoriaInvalida.innerHTML = '',linguagemInvalida.innerHTML = '',tituloInvalido.innerHTML = '');
        
    }
    if (urlYouTube.value.length > 0){
        if (!isYoutubeVideo(urlYouTube.value)){
            return (urlInvalida.innerHTML = 'Endereço de vídeo inválido!',descricaoInvalida.innerHTML = '',categoriaInvalida.innerHTML = '',linguagemInvalida.innerHTML = '',tituloInvalido.innerHTML = '');
        }
    }
    return true;
}

botaoPesquisaDica.addEventListener("click", (event) => {
    event.preventDefault()
    pesquisaDica(campoPesquisa.value);
})

botaoLimpaForm.addEventListener("click", (event) => {
    event.preventDefault()
    limpaForm();
});

function isYoutubeVideo(url) {
    var v = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(v)) ? RegExp : false;
}

function deleta(id){
    if (!window.confirm("Deseja realmente deletar a dica?"))
    return
    let indice = lStorage.findIndex(dica => dica.id === id);
    lStorage.splice(indice,1);    
    localStorage.setItem("listaDeDicas",JSON.stringify(lStorage));
    listaDeCards.innerHTML="";
    lStorage.forEach(element => {
        criaCard (element);
    });
    atualizaTotais();
}

function edita(id){
    let indice = lStorage.findIndex(dica => dica.id === id);
    indiceEdicao.value = indice;
    titulo.value = lStorage[indice].titulo;
    linguagemSkill.value = lStorage[indice].linguagem;
    categoria.value = lStorage[indice].categoria;
    descricao.value = lStorage[indice].descricao;
    urlYouTube.value = lStorage[indice].video;
    alert("Os dados para edição foram carregados no formulário lateral, realize as alterações e clique em salvar para concluir!")
}

function abreVideo(urlVideo){
    window.open(urlVideo, '_blank');
    console.log("abrindo video", urlVideo);
}
    
function pesquisaDica(string){
    let pesquisa = [];
    if(!string){
        alert('digite para pesquisar')
        return;
    }
    let termo = string.toLowerCase();
    lStorage.forEach((card) =>{
        let titulo = card.titulo.toLowerCase();
        if (titulo.includes(termo)){
            pesquisa.push(card);
        }
    })
    if (pesquisa.length === 0){
        alert("Título não localizado");
        campoPesquisa.value="";
        return;
    }
    listaDeCards.innerHTML="";
    pesquisa.forEach(card => {
        criaCard (card);   
    });
}

botaoLimpaPesquisa.addEventListener("click", (event) =>{
    campoPesquisa.value = "";
    listaDeCards.innerHTML="";
    lStorage.forEach(card => {
        criaCard (card);       
    });
})