FROM node:10-alpine as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build --frozen-lockfile

FROM nginx:stable-alpine
WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY default.conf /etc/nginx/conf.d/default.conf
