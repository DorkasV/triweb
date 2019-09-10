FROM node:10-alpine as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn run build --quiet

FROM nginx:1.16-alpine
WORKDIR /app
COPY --from=build /app/dist /app/dist/
COPY default.conf /etc/nginx/conf.d/default.conf
