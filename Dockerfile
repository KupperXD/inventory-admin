FROM node:16-alpine as build
WORKDIR /app
COPY . .
RUN npm ci \
    && npm run build

FROM node:16-alpine as production
WORKDIR /app
COPY --from=build ./app/.output ./.output
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000
ENTRYPOINT ["node", ".output/server/index.mjs"]
