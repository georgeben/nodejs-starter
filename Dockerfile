# Production Docker image

FROM node:12-stretch

# For security reasons don't run operations as the root user
USER node

RUN mkdir /home/node/miles_api

WORKDIR /home/node/miles_api

COPY --chown=node:node package.json package-lock.json ./

RUN npm ci


FROM node:12-alpine

# Install OS updates 

RUN apk -U upgrade \
 && echo 'Finished installing dependencies'

USER node

RUN mkdir /home/node/miles_api

WORKDIR /home/node/miles_api

COPY --from=0 /home/node/miles_api/node_modules /home/node/miles_api/node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

CMD ["npm", "start"]