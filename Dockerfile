FROM node:buster
RUN apt-get update -y
RUN apt-get install netcat -y
WORKDIR /app
ADD package.json /tmp
RUN cd /tmp && npm install
RUN mv /tmp/node_modules /app
COPY . /app
RUN npm run build
RUN chmod +x entrypoint.sh
