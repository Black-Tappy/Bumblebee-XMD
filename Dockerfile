FROM node:lts-buster
RUN git clone https://github.com/Black-Tappy/Bumblebee-XMD/root/ikBlacktappy
WORKDIR /root/ikBlacktappy
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1
COPY . .
EXPOSE 9090
CMD ["npm", "start"]
