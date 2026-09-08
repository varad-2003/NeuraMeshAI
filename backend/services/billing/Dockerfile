FROM node

WORKDIR /app

# root wali package.json and * -> copy all files containing package and place in root folder
COPY package*.json ./
RUN npm install

# copy gatway ki package.json and paste in gateway folder
COPY ./services/billing/package*.json ./services/billing/
RUN cd services/billing && npm install

COPY services/billing ./services/billing
COPY shared ./shared

WORKDIR /app/services/billing

EXPOSE 8004

CMD [ "npm", "start" ]

