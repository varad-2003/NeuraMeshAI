FROM node

WORKDIR /app

# root wali package.json and * -> copy all files containing package and place in root folder
COPY package*.json ./
RUN npm install

# copy gatway ki package.json and paste in gateway folder
COPY ./services/agent/package*.json ./services/agent/
RUN cd services/agent && npm install

COPY services/agent ./services/agent
COPY shared ./shared

WORKDIR /app/services/agent

EXPOSE 8003

CMD [ "npm", "start" ]

