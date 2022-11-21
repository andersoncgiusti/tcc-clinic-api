# Check out https://hub.docker.com/_/node to select a new base image
FROM node:14.15.0-slim

# Reinstall packages for security purposes
RUN apt-get update && apt-get upgrade -y
RUN apt-get install curl -y
RUN apt-get update && apt-get upgrade -y
RUN apt-get install git -y
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./

RUN npm install
RUN npm audit fix

# Bundle app source code
COPY --chown=node . .

#RUN npm run build
#RUN rm -rf ./src

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3000
EXPOSE ${PORT}

CMD [ "node", "." ]
