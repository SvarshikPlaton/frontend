FROM node:21-alpine as frontend-build

WORKDIR /app

COPY . . 

ARG API_URL="api.qqfq.eu/api/"
ENV REACT_APP_API_URL=$API_URL

RUN npm update -g npm \
    && npm ci --no-audit --maxsockets 1 \
    && npm run build

FROM nginx:latest

COPY --from=frontend-build /app/build/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
