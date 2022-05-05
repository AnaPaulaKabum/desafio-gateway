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

### Documentation

