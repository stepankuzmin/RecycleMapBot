FROM node:10-alpine
LABEL maintainer="Stepan Kuzmin <to.stepan.kuzmin@gmail.com>"

ENV NODE_ENV production

WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install --only=prod --quiet && npm cache clean --force
COPY . .

EXPOSE 3000

CMD ["npm", "start"]