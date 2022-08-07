**Projeto cadastro de dicas**

**REQUISITOS DA APLICAÇÃO**
A aplicação que deverá ser realizada individualmente deve contemplar os seguintes
requisitos:

1. Um título na aba do navegador, para que o usuário encontre a sua aplicação no meio
   das várias abas que constantemente mantém abertas;
2. Um cabeçalho dentro da página, para que o usuário saiba facilmente em que página se
   encontra e do que se trata o conteúdo;
3. Um formulário para que o usuário cadastre a dica, contendo:
   a. Título:
   i. Preenchimento: Obrigatório
   ii. Tipo de campo: Input
   iii. Mínimo de caracteres: 8
   iv. Máximo de caracteres: 64
   1
   b. Linguagem/Skill:
   i. Preenchimento: Obrigatório
   ii. Tipo de campo: Input
   iii. Mínimo de caracteres: 4
   iv. Máximo de caracteres: 16
   c. Categoria:
   i. Preenchimento: Obrigatório
   ii. Tipo de campo: Input Dropdown
   iii. Pré-Cadastrado: FrontEnd, BackEnd, FullStack e Comportamental/Soft
   d. Descrição:
   i. Preenchimento: Obrigatório
   ii. Tipo de campo: Input Text Area
   iii. Mínimo de caracteres: 32
   iv. Máximo de caracteres: 512
   e. Vídeo do YouTube:
   i. Preenchimento: Opcional
   ii. Tipo de campo: Input
   iii. Caracteres: Validar URL
   f. Botões de ação:
   i. Botão Salvar para cadastrar caso as regras sejam atendidas
   ii. Botão Limpar para limpar os campos do formulário
4. Cards indicativos que mostram ao usuário as estatísticas do sistema. Devem
   apresentar a quantidade total de dicas cadastradas e a quantidade de dicas para cada
   categoria.
5. Uma barra de busca para que o usuário consiga pesquisar por uma dica através de seu
   título. Botões para pesquisar e limpar podem ser utilizados.
6. Uma lista de dicas contendo todas as informações cadastradas.
   a. Usar cards para agrupar as informações
   b. Adicionar botão para deletar a dica
   c. Adicionar botão para editar a dica
   i. Ideia: Quando clicado pode carregar o formulário de cadastro para
   edição, facilitando a codificação do sistema.
   d. Adicionar botão para abrir o vídeo com a dica
   i. Ideia: Quando não houver vídeo cadastrado, o botão pode desaparecer
   do card.
7. Utilização do alert para informar as ações realizadas. Por exemplo: Dica Cadastrada,
   Dica Deletada e etc
8. Mensagens de confirmação, via prompt para as ações realizadas. Por exemplo: "Você
   realmente deseja deletar essa dica?"
   2
9. Lógica de programação para manipulação dos dados inseridos em um array json com
   salvamento em localStorage (ou json-server se achar necessário)
