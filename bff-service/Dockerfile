FROM node:12.16.3-alpine

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

COPY . /usr/src/app

RUN npm install --no-install-recommends

USER node

EXPOSE 3001

ENTRYPOINT [ "node", "index.js" ]

CMD ["npm", "run", "start"]