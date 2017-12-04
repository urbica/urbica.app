# urbica.io

[![Greenkeeper badge](https://badges.greenkeeper.io/urbica/urbica.io.svg)](https://greenkeeper.io/)

[![CircleCI](https://circleci.com/gh/urbica/urbica.io.svg?style=svg)](https://circleci.com/gh/urbica/urbica.io)

## Development

Installing dependencies

```shell
git clone https://github.com/urbica/urbica.io.git
cd urbica.io
yarn
```

Starting up database using Docker

```shell
docker run -d --rm \
  --name postgres \
  -v $(pwd)/db:/var/lib/postgresql/data \
  -p 5432:5432 \
  -e POSTGRES_DB=test \
  -e POSTGRES_USER=postgres \
  postgres:alpine
```

You can connect to the database using

```shell
docker exec -it postgres psql -d test -U postgres
```

Create `.env` file

```shell
cp example.env .env
```

[Writing migrations](https://db-migrate.readthedocs.io/en/latest/API/SQL/).

Running migrations

```shell
yarn db:migrate
```

Rollback migrations

```shell
yarn db:rollback
```

Starting dev server

```shell
yarn start
```

Running tests

```shell
yarn test
```