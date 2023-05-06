FROM node:19-alpine as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn build

# Stage 2
FROM nginx:1.23.4
WORKDIR /usr/share/nginx/html
#TODO Dont think I need this
# COPY ./nginx.conf ./conf.d/default.conf
COPY --from=builder /app/dist .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]