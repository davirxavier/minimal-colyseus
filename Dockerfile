FROM node:16.20.2-bullseye
RUN apt-get -y update && apt-get -y install git

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/colyseus-minimal && cp -a /tmp/node_modules /usr/colyseus-minimal

WORKDIR /usr/colyseus-minimal
COPY . /usr/colyseus-minimal
RUN npm install
RUN npm run build

EXPOSE ${NODE_SERVER_PORT}
CMD ["node", "./dist/app.js", "$NODE_SERVER_PORT"]