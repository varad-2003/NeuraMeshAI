FROM node

WORKDIR /app

# root wali package.json and * -> copy all files containing package and place in root folder
COPY package*.json ./
RUN npm install

# copy gatway ki package.json and paste in gateway folder
COPY ./services/auth/package*.json ./services/auth/
RUN cd services/auth && npm install

COPY services/auth ./services/auth
COPY shared ./shared

WORKDIR /app/services/auth

EXPOSE 8001

CMD [ "npm", "start" ]

