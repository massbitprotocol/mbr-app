FROM node:16

ENV BRANCH_NAME=dev
# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
# RUN apk update && apk upgrade
# RUN apk add git

RUN apt update && apt install nginx -y

# copy the app, note .dockerignore
COPY configs/${BRANCH_NAME}/.env /usr/src/nuxt-app/.env
COPY . /usr/src/nuxt-app/
RUN cp dockerize/nginx/web /etc/nginx/sites-enabled/
RUN cp dockerize/start-docker.sh ./
RUN chmod +x start-docker.sh

RUN yarn install
RUN yarn build
RUN yarn generate
EXPOSE 3000

# CMD [ "yarn", "start" ]
CMD ["./start-docker.sh"]
