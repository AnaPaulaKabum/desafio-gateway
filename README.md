# desafio-gateway

Escopo de uma arquitura limpa para implementar Gateway

## Organization

Nucleo : Domain

src

-   Application
    -   Controller: Recebem as requisições.
-   UseCases
    -   Transaction: Regras da aplicação.
-   Domain
    -   Entity: Entidades com regras gerais.
-   Adapter:
    -   Gateway : Adapters para os Gateways de Rede e Cielo.
    -   Mail: Adapters para o envio de e-mail.
    -   Repository: Classes para registrar as informações
-   Shared: Podem ser vistas por todas as camadas.
    -   DTO
    -   Enum
    -   Interfaces

app.ts: Componente responsavel por instanciar e compor todo o projeto.

## Install

-   yarn install

## Execute

-   test: yarn test --runInBand
-   start : yarn start

## Configuration

-   Exemple file .env:
```
TYPE=mysql
HOST=localhost
PORT=3306
DATABASE=test
USERNAME_BD=test
PASSWORD_BD=root
DATABASE=test
API=
USERNAME_API=
PASSWORD_API=
```
