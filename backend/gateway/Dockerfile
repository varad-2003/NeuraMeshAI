FROM node

WORKDIR /app

# root wali package.json and * -> copy all files containing package and place in root folder
COPY package*.json ./
RUN npm install

# copy gatway ki package.json and paste in gateway folder
COPY ./gateway/package*.json ./gateway/
RUN cd gateway && npm install

COPY gateway ./gateway
COPY shared ./shared

WORKDIR /app/gateway

EXPOSE 8000

CMD [ "npm", "start" ]

