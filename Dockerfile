FROM node:12.16-alpine AS builder

WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build --prod

FROM nginx:stable-alpine
LABEL version="1.0"

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/app/dist/nectar/ .