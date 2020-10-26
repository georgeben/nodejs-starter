# Development docker image

FROM node:12-stretch

RUN npm i -g nodemon

RUN apt-get update \
 && apt-get dist-upgrade -y \
 && apt-get clean \
 && echo 'Finished installing dependencies'

# For security reasons don't run operations as the root user
USER node

RUN mkdir /home/node/app_name

WORKDIR /home/node/app_name

COPY --chown=node:node package.json package-lock.json ./

RUN npm ci

COPY --chown=node:node . .

ENV NODE_ENV=development

RUN npm run build

CMD ["npm", "run", "dev"]