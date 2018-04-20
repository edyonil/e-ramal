FROM node:6.10.2-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/

RUN ["npm", "install"]

COPY . /app

EXPOSE 4200/tcp

CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "500"]


FROM node:alpine

WORKDIR /usr/src/app

RUN npm -g install @angular/cli \
	&& npm -g install firebase-tools

COPY package.json package.json

RUN npm install --silent

COPY . .

EXPOSE 4200/tcp

CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "500"]
