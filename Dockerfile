FROM node:buster
RUN apt-get update -y
RUN apt-get install netcat -y
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
RUN chmod +x entrypoint.sh
