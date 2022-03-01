# Troupe Tecnologia - Soluções Digitais

- Aplicação criada como teste para [Troupe Brasil](http://www.troupebrasil.com.br/);

## 📋 Requisitos

### O teste consiste em criar um sistema de cadastro de clientes

✔️ Criar uma aplicação que possua uma tela de login, que redirecionará para a listagem;

✔️ Uma tela com um formulário para inserir/editar um cliente;

✔️ Uma tela de listagem dos clientes;

✔️ Deverá ter uma forma de logout, jogando o usuário pra tela de login;

✔️ O formulário e a listagem deverão ser acessadas apenas por usuários autenticados na tela de login;

## 🛠 Tecnologias

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" width="20" height="16" /> ReactJS

<img src="https://www.kindpng.com/picc/m/67-678384_transparent-javascript-icon-png-png-download.png" width="16" height="16" /> &nbsp;JavaScript

## ▶️ Inicializando o projeto

- ### **Pré-requisitos**

  - **Node.js**;
  - **Git**
  - Gerenciador de pacotes **npm** ou **yarn**

Em seguida, clone o repositório

```sh
  $ git clone https://github.com/carlosael/teste-troupe-tecnologia
```

E depois:

1. Iniciado o back-end:

````sh
  # Iniciar o json-server na raíz do projeto
  $ yarn global add json-server
  # O json-server na raíz do projeto, ele criará um arquivo db.json
  # Apague o conteúdo do arquivo e cole o seguinte
  
    {
      "usuarios": [
        {
          "email":"teste@emaill.com.br",
          "password": "123456",
          "token": "token"
        }
      ]
    },
    {
      "clientes": []
    }
    
````


2. Iniciando o front-end:

```sh
  # Abra pasta do projeto
  $ cd teste-troupe-tecnologia
  # Instale as dependencias
  $ yarn ou npm install
  # Rode a aplicação
  $ yarn start ou npm start
````

https://user-images.githubusercontent.com/86244416/156260985-2c5959ef-4c6c-42ae-90af-7ee05d2adc07.mp4
