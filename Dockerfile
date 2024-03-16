FROM ubuntu

RUN apt-get update && apt-get install -y curl

RUN curl --silent --location https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y \
  nodejs
RUN echo "Node: " && node -v
RUN echo "NPM: " && npm -v

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "preview"]