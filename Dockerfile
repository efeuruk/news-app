FROM node:20.11.1-alpine3.14

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "run" "preview"]