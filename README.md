# 📦 World Of Scans

World Of Scans application allows users to read their favorite manga directly Online and on Mobile, with a smooth and optimized interface for both mobile and desktop. Chapters are retrieved from external sources, and images are displayed without being stored internally. The app focuses on providing a fast, intuitive reading experience with no intrusive ads.

https://github.com/user-attachments/assets/149b3384-27cc-4fe7-937e-e2766714e4e7

## 🚀 Deployment

The whole stack (Traefik + frontend + backend + Postgres) runs from a single compose file.

```sh
cp .env.example .env   # set DOMAIN, ACME_EMAIL and the Postgres credentials
docker compose up -d --build
```

Point your `DOMAIN`'s A record at the server. Traefik requests the Let's Encrypt
certificate on first boot, serves the frontend on `/` and the backend on `/api`.
Database migrations run automatically when the backend container starts.

### Already running Traefik on this server?

Two Traefik instances cannot share ports 80/443. Use the override, which disables
the bundled one and attaches the containers to your existing proxy network:

```sh
docker compose -f docker-compose.yml -f docker-compose.external-traefik.yml up -d --build
```

Set `TRAEFIK_NETWORK` in `.env`, plus `TRAEFIK_ENTRYPOINT` and `TRAEFIK_CERTRESOLVER`
if your Traefik does not name them `websecure` and `le`.

> These names must match your Traefik exactly. Given an unknown `certResolver`,
> Traefik does not fail — it quietly serves its self-signed certificate. The symptom
> is a browser warning and a service worker that refuses to register.

## 💻 Local development

```sh
# database
docker compose up -d postgres

# backend — http://localhost:3000/api
cd backend
echo 'DATABASE_URL=postgresql://postgres:postgres@localhost:5432/wos?schema=public' > .env
yarn install
yarn prisma generate      # the client is generated into src/generated (gitignored)
yarn prisma migrate deploy
yarn start:dev

# frontend — http://localhost:5173 (/api is proxied to the backend)
cd frontend
yarn install && yarn dev
```

`yarn build` then `yarn preview` in `frontend/` to test the production bundle and
the service worker (the SW is not active in `yarn dev`).

## 🧱 Stack

- **frontend** — React 19, Vite, Chakra UI, `vite-plugin-pwa` (offline app shell + scan image cache)
- **backend** — NestJS 11, Prisma 7 (`prisma-client` generator + `@prisma/adapter-pg`), PostgreSQL
- **infra** — Docker Compose, Traefik (TLS via Let's Encrypt), nginx

## 🤝 Contributing

Contributions are welcome!
Feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License.
