export class Dica {
    constructor(titulo, linguagem, categoria, descricao, video){
        this.id = Math.floor(Date.now() * Math.random()).toString(36);
        this.titulo = titulo;
        this.linguagem = linguagem;
        this.categoria = categoria;
        this.descricao = descricao;
        this.video = video;
    }
}