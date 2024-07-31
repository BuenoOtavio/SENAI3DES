# Projeto OS - Ordens de Serviço

## Tecnologias

||Tecnologia|Tarefa|
|-|-|-|
|[<img src="https://w7.pngwing.com/pngs/717/111/png-transparent-mysql-round-logo-tech-companies-thumbnail.png" style="width:50px;">](https://www.apachefriends.org/pt_br/index.html)|XAMPP|BD MySQL MariaDB
|[<img src="https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png" style="width:50px;">](https://nodejs.org/en)|NodeJS|API Back-End|
||Prisma|ORM BD MySQL|
|[<img src="https://static-00.iconduck.com/assets.00/apps-insomnia-icon-512x512-dse2p0fm.png" width="50px">](https://insomnia.rest/download)|Insomnia|Testes Unitários e de integração|
||JWT|Autenticação|
|[<img src="https://logowik.com/content/uploads/images/visual-studio-code7642.jpg" style="width:50px;">](https://code.visualstudio.com/)|VsCode|IDE Back, Front|
|[<img src="https://cdn-icons-png.flaticon.com/512/919/919827.png" style="width:50px">](https://developer.mozilla.org/pt-BR/docs/Web/HTML)[<img src="https://cdn-icons-png.flaticon.com/512/919/919826.png" style="width:50px">](https://developer.mozilla.org/pt-BR/docs/Web/CSS)[<img src="https://cdn5.vectorstock.com/i/1000x1000/27/74/vanilla-javascript-language-vector-31602774.jpg" style="width:50px">](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)|HTML, CSS, JS Vanilla|Front-End|
|[<img src="https://axios-http.com/assets/logo.svg" style="width:100px">](https://axios-http.com/ptbr/docs/intro)|Axios|Front End consumir API|

## Passos para a Execução
- 1 Clonar este repositório
- 2 Abrir com o VS code
- 3 Na pasta ./api criar um arquivo **.env** contendo: 
```js
DATABASE_URL="mysql://root@localhost:3306/oss?schema=public&timezone=UTC"
```
- 4 Abrir XAMPP  e clicar em Start nos serviços **Mysql** e **Apache**.
- 5 Instalar as dependências e o banco de dados
```bash
cd api 
npm i
npx prisma migrate dev --name init
```
- 6 Voltar ao VsCode e Exercutar a API
```bash
npx nodemon
```
- Acessar a pasta ./front
- Exercutar o arquivos **index.html** com **live server**