# The Best Project Setup

> Preferably used within `Linux` or `WSL 2` systems, not tested on `windows` or `mac`.

## Technologies

- Frontend :

  - React
  - React DOM
  - React Router DOM
  - Vite
  - Shadcn ui
  - Unocss
  - Tailwindcss

- Backend :

  - Hono js
  - Vitest
  - Prisma
  - Zod

- Databases

  - Postgresql
  - MinIO

- Devops

  - Docker
  - Docker Compose

- DX

  - Eslint
  - Prettier
  - Commilt Linter
  - Husky
  - Makefile

- CI
  - Github Actions

😜 No AI, no Blockchain 😜

## Prerequisite

- Node
- Docker and Docker Compose
- Makefile

## Get started

- clone this project.
- rename your project `/env/base.env`.
- init your repository locally using :

```bash
make
```

## Development

to start development env :

```bash
make start-dev

```

## Testing

to start testing env :

```bash
# terminal 1
make start-test

# terminal 2 : run api tests (vitest)
make test-api

# terminal 3 : run e2e tests (playwright)
make test-e2e
```

for more helpful commands, read the `makefile` file.
