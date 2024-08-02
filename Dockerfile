FROM node:20 AS base
ENV MONGODB_URI=mongodb:27017
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install


FROM base AS development
COPY . .
CMD ["npm", "run", "dev"]

FROM base AS production
COPY . .
RUN npm prune --production
CMD ["npm", "run", "start"]


