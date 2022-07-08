FROM node:16-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN mv .env.test .env
RUN yarn install
RUN yarn build
RUN yarn generate
EXPOSE 3000

CMD [ "yarn", "start" ]
