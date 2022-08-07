import {Dica} from "./Dica.js"

const titulo = document.getElementById("titulo");
const linguagemSkill = document.getElementById("linguagemSkill")
const categoria = document.getElementById("categoria");
const descricao = document.getElementById("descricao");
const urlYouTube = document.getElementById("urlYouTube");
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
    botaoYoutube.onclick = () => abreVideo(card.id);

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
    totalDicasFront.innerHTML = lStorage.filter((item)=> item.categoria === "1").length;
    totalDicasBack.innerHTML = lStorage.filter((item)=> item.categoria === "2").length;
    totalDicasFull.innerHTML = lStorage.filter((item)=> item.categoria === "3").length;
    totalDicasSoft.innerHTML = lStorage.filter((item)=> item.categoria === "4").length;
}

let lStorage =[];
lStorage = JSON.parse(localStorage.getItem("listaDeDicas"))
lStorage.forEach(card => {
    criaCard (card);
    
});
atualizaTotais();



formDica.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log('oi');
    if (indiceEdicao.value){
        console.log(indiceEdicao.value)
        console.log(lStorage);
        const card = new Dica(titulo.value, linguagemSkill.value, categoria.value, descricao.value, urlYouTube.value);
        lStorage.splice(indiceEdicao.value,1,card)
        localStorage.setItem("listaDeDicas",JSON.stringify(lStorage));
        listaDeCards.innerHTML="";
        lStorage.forEach(card => {
            criaCard (card);
        });
        atualizaTotais();
        return;
    };
        
    console.log('oiiiii');
    const card = new Dica(titulo.value, linguagemSkill.value, categoria.value, descricao.value, urlYouTube.value);
    lStorage.push(card);
    criaCard(card);
    console.log(card);
    localStorage.setItem("listaDeDicas",JSON.stringify(lStorage));
    atualizaTotais();
    


});

botaoLimpaForm.addEventListener("click", (event) => {
    event.preventDefault()
    limpaForm();
});

function deleta(id){
    lStorage = JSON.parse(localStorage.getItem("listaDeDicas"));
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
    lStorage = JSON.parse(localStorage.getItem("listaDeDicas"));
    let indice = lStorage.findIndex(dica => dica.id === id);
    console.log(indice);
    indiceEdicao.value = indice;
    console.log(indiceEdicao.value);
    titulo.value = lStorage[indice].titulo;
    linguagemSkill.value = lStorage[indice].linguagem;
    categoria.value = lStorage[indice].categoria;
    descricao.value = lStorage[indice].descricao;
    urlYouTube.value = lStorage[indice].video;
}

function abreVideo(id){
    console.log("abrindo video",id);
}

botaoPesquisaDica.addEventListener("click", (event) => {
    event.preventDefault()
    pesquisaDica(campoPesquisa.value);
})
    
function pesquisaDica(campoPesquisa){
    let pesquisa = lStorage.filter((item)=> item.titulo === campoPesquisa)
    if (pesquisa){
    listaDeCards.innerHTML="";
    pesquisa.forEach(card => {
        criaCard (card);   
    });
    console.log(pesquisa);
}
}

botaoLimpaPesquisa.addEventListener("click", (event) =>{
    campoPesquisa.value = "";
    listaDeCards.innerHTML="";
    lStorage.forEach(card => {
        criaCard (card);
        
    });
})




//lStorage = JSON.parse(localStorage.getItem("listaDeDicas"));