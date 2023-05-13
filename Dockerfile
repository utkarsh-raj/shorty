FROM node:16-alpine
WORKDIR /app
COPY package.json /app
RUN npm i --only=production && npm cache clean --force
COPY . /app
CMD npm run dev
EXPOSE 3025