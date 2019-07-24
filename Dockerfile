# This is a production docker image which should be used to run services
# No test code copied/included to the image
FROM node:8-slim as build-env

RUN mkdir -p /usr/src/whats-the-tabs
RUN chown node:node /usr/src/whats-the-tabs
WORKDIR /usr/src/whats-the-tabs

USER node

COPY package*.json /usr/src/whats-the-tabs/

RUN npm ci --production

# COPY only src (the directory itself is not copied, just its contents)
COPY --chown=node:node src .

FROM gcr.io/distroless/nodejs
COPY --from=build-env /usr/src/whats-the-tabs /usr/src/whats-the-tabs
WORKDIR /usr/src/whats-the-tabs

CMD [ "./index.js" ]
