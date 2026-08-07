###
# Build
###
FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

###
# Production
###
FROM node:24-alpine AS app

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production && yarn cache clean

# Le client Prisma v7 est du TS pur : il est compilé dans dist/, rien à générer ici.
# Seul `migrate deploy` a besoin du schéma et de la config.
COPY prisma ./prisma
COPY prisma.config.ts ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# ponytail: migration au démarrage du conteneur, un seul réplica. Si un jour il y en a
# plusieurs, sortir `migrate deploy` dans un job à part.
CMD ["yarn", "start:prod"]
