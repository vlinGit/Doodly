FROM node:18.14.0

ENV HOME /root

WORKDIR /root/server

COPY . .

EXPOSE 5000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

RUN npm install

CMD /wait && node server.js