# Sorteio Websocket - Código Fonte TV

Fork do [projeto desenvolvido pelo Código Fonte TV](https://github.com/gabrielfroes/sorteio-websocket), porém utilizando o [Bun](https://bun.sh/) ao invés do Node.js

Uma aplicação simples de sorteio em tempo real utilizando WebSockets, desenvolvida para a o canal Código Fonte TV no YouTube.

## Descrição

Esta aplicação consiste em duas partes principais:

1. **Admin**: Uma interface para realizar o sorteio e visualizar a quantidade de participantes conectados.
2. **Cliente**: Uma interface para os usuários se conectarem e participarem do sorteio. Quando o sorteio é realizado, a interface do cliente muda de cor e mostra um código se o usuário ganhar.

## Tecnologias Utilizadas

- **Bun** para o backend.
- **WebSocket** para comunicação em tempo real entre o servidor e os clientes.

## Configuração e Instalação

### Pré-requisitos

- Bun instalado. [Veja como instalar aqui](https://bun.sh/).

### Passos para configuração

1.**Clonar o Repositório**

```bash
git clone https://github.com/fxcrespo/sorteio-websocket-bun
cd sorteio-websocket
```

2.**Instalar dependências**

```bash
bun install
```

3.**Iniciar o Servidor**

```bash
bun start
```

4.**Configuração do WebSocket**

Para habilitar a comunicação em tempo real, usamos WebSockets. O servidor `server.js` cuida de aceitar conexões de clientes e admin. A lógica de sorteio e comunicação de resultados é tratada aqui.

- `client.js`: Cada cliente conecta-se ao servidor usando WebSockets. Eles recebem atualizações em tempo real quando um sorteio é realizado.
- `admin.js`: A interface do administrador se conecta ao servidor como um cliente especial. A partir daqui, o admin pode iniciar um sorteio.

5.**Estilização e Feedback Visual**

O arquivo `styles.css` fornece a estilização necessária para as páginas do cliente e do admin. Durante e depois de um sorteio, a interface do cliente muda de cor para indicar se ganharam ou perderam. O código de confirmação (para vencedores) é exibido em um estilo que se assemelha a um ticket, com um fundo branco, fonte preta e grossa, e bordas arredondadas.

6.**Feedback Tátil**

Se o dispositivo suportar, ele vibrará após o resultado do sorteio ser anunciado, dando um feedback tátil ao usuário.

7.**Como Executar o Sorteio**

- Abra a página de administração em `http://localhost:3000/admin`.
- Verifique quantos clientes estão conectados através do contador de participantes.
- Clique no botão "Realizar Sorteio" para iniciar o sorteio. Um código de confirmação será gerado.
- Todos os clientes receberão o resultado em tempo real. O vencedor verá o código de confirmação em sua tela.


## Docker e Docker Compose

Para facilitar a configuração e execução do projeto, utilizamos o Docker e o Docker Compose. Abaixo estão os passos para configurar e executar o projeto usando essas tecnologias.

### Pré-requisitos

- Docker e Docker Compose instalados em sua máquina.

### Passos para configuração com Docker

1. **Construir a imagem Docker**:

   No diretório raiz do projeto, execute o seguinte comando para construir a imagem Docker:

   ```bash
   docker-compose build
   ```

2. **Executar a aplicação**:

   Ainda no diretório raiz do projeto, execute o seguinte comando para iniciar a aplicação:

   ```bash
   docker-compose up
   ```

   Agora, a aplicação estará rodando no `http://localhost:3000`. Você pode acessar a interface do admin em `http://localhost:3000/admin` e a interface do cliente em `http://localhost:3000`.

3. **Parar a aplicação**:

   Para parar a aplicação e remover os contêineres criados, execute o seguinte comando no diretório raiz do projeto:

   ```bash
   docker-compose down
   ```

### Notas Adicionais

- O arquivo `docker-compose.yml` contém a configuração do Docker Compose para este projeto. Ele define como a imagem Docker deve ser construída e como a aplicação deve ser executada.
- O arquivo `Dockerfile` contém as instruções para construir a imagem Docker. Este arquivo está configurado para copiar os arquivos do projeto para um contêiner Docker, instalar as dependências e iniciar o servidor Bun.
- Os comandos do Docker Compose devem ser executados no mesmo diretório que contém os arquivos `docker-compose.yml` e `Dockerfile`.

Esses passos permitem que você configure, execute e interaja com a aplicação em um ambiente Dockerizado, garantindo que a configuração do ambiente seja consistente, independentemente de onde a aplicação está sendo executada.