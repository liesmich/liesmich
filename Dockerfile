# Get base container
FROM node:17.7-alpine AS apline_container

# Build server
FROM apline_container AS build_server

WORKDIR /usr/src/app
COPY ./ /usr/src/app/

RUN npm ci
RUN npx lerna bootstrap --ci
ENV NODE_ENV="production"
RUN npx lerna run build --ignore @liesmich/client
RUN npx lerna run build:ssr

# Build Final Image
FROM apline_container as liesmich

LABEL org.opencontainers.image.title="Manniwatch"
LABEL org.opencontainers.image.description="Manniwatch Docker Image"

WORKDIR /usr/src/app
COPY --chown=node:node ./packages/client/package*.json ./
COPY --chown=node:node ./packages/client/src ./src
COPY --from=build_server --chown=node:node /usr/src/app/packages/client/dist ./dist

ENV NODE_ENV="production"
#RUN npm ci --production && \
#    npx lerna bootstrap --scope=@liesmich/client && \
#    npm cache clean --force

EXPOSE 4000

USER node
ENTRYPOINT ["npm", "run", "serve:ssr"]
CMD [  ]
