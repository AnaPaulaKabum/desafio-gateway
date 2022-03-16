# desafio-gateway

## Organization 

Nucleo : Domain

src
  - Application
      - Controller: Recebem as requisições.
      - Mappear: Converte Request em DTO.
      - Request: Objetos recebidos de requisições
  - Domain
    - Core: Classe de abstração e interface.
    - Services: Regras de negocios
    - Util : Classes uteis
    - Validações: Classes de validações 
  - Adapter:
    - GatewayRede : Classes para conectar o com a Rede
    - Log: Classe para registrar os Logs
    - Mail: Classes para o envio do E-mail
    - Persistencia: Classes para salvar informações no banco.
