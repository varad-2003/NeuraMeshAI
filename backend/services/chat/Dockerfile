FROM node

WORKDIR /app

# root wali package.json and * -> copy all files containing package and place in root folder
COPY package*.json ./
RUN npm install

# copy gatway ki package.json and paste in gateway folder
COPY ./services/chat/package*.json ./services/chat/
RUN cd services/chat && npm install

COPY services/chat ./services/chat
COPY shared ./shared

WORKDIR /app/services/chat

EXPOSE 8002

CMD [ "npm", "start" ]

