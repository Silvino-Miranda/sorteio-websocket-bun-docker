# Usando a imagem base do Bun
FROM oven/bun

# Definindo o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiando o arquivo package.json e bun.lockb para o contêiner
COPY package.json package.json
COPY bun.lockb bun.lockb

# Instalando as dependências
RUN bun install

# Copiando o diretório src para o contêiner
COPY src /app/src

# Expondo a porta 3000
EXPOSE 3000

# Definindo o ponto de entrada para o servidor
ENTRYPOINT ["bun", "src/server.js"]
