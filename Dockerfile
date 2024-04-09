FROM node:21-alpine as frontend-build

WORKDIR /app

COPY . . 

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm update -g npm \
    && npm ci --no-audit --maxsockets 1 \
    && npm run build

FROM nginx:latest

COPY --from=frontend-build /app/build/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
