FROM node:17.0.1

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]