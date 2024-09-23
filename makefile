MY_UID = $(shell id -u)
MY_GID = $(shell id -g)
SHELL := /bin/bash
.DEFAULT_GOAL := init

USER=@MY_UID="$(MY_UID)" MY_GID="$(MY_GID)"

DEV_ENV=-e ./env/base.env -e ./env/.env -e ./env/dev.env
TEST_ENV=-e ./env/base.env -e ./env/.env -e ./env/test.env

DEV_DOCKER=-f ./env/docker-compose.yml -f ./env/docker-compose.dev.yml
TEST_DOCKER=-f ./env/docker-compose.yml -f ./env/docker-compose.test.yml


# ---------------------------------------------
# SETUP
# ---------------------------------------------


setup:
	@npm i -g dotenv-cli
	@npm i -g husky && husky
	@npm exec --prefix ./apps/webapp playwright@next install-deps
	@npm exec --prefix ./apps/webapp playwright@next install

install:
		${USER} npm i
		${USER} npm --prefix ./apps/api install
		${USER} npm --prefix ./apps/webapp install

init:
	@make install
	@make setup

clean:
		${USER} sudo rm -rf ./node_modules
		${USER} sudo rm -rf ./apps/api/node_modules
		${USER} sudo rm -rf ./apps/webapp/node_modules
		
install-fresh:
		make clean
		make install

# ---------------------------------------------
# START DOCKER COMPOSE
# ---------------------------------------------

start-dev:
		${USER} dotenv ${DEV_ENV} -c -- docker compose ${DEV_DOCKER} up

start-dev-fresh:
		${USER} dotenv ${DEV_ENV} -c -- docker compose ${DEV_DOCKER} up --build

start-test:
		${USER} dotenv ${TEST_ENV} -c -- docker compose ${TEST_DOCKER} up

start-test-fresh:
		${USER} dotenv ${TEST_ENV} -c -- docker compose ${TEST_DOCKER} up --build

start-test-ci:
		${USER} dotenv ${TEST_ENV} -c -- docker compose ${TEST_DOCKER} up -d

# ---------------------------------------------
# STOP DOCKER COMPOSE
# ---------------------------------------------

stop-dev:
		${USER} dotenv ${DEV_ENV} -c -- docker compose down

stop-dev-volume:
		${USER} dotenv ${DEV_ENV} -c -- docker compose down -v

stop-test:
		${USER} dotenv ${DEV_TEST} -c -- docker compose down

stop-test-volume:
		${USER} dotenv ${DEV_TEST} -c -- docker compose down -v

# ---------------------------------------------
# DATABASE
# ---------------------------------------------

generate-types:
	${USER} dotenv ${DEV_ENV} -c -- npm --prefix apps/api run generate-types

migrate:
	${USER} dotenv ${DEV_ENV} -c -- npm --prefix apps/api run deploy-migration

migrate-test:
	${USER} dotenv ${TEST_ENV} -c -- npm --prefix apps/api run deploy-migration

migrate-create:
	${USER} dotenv ${DEV_ENV} -c -- npm --prefix apps/api run create-migration

migrate-reset:
	${USER} dotenv ${DEV_ENV} -c -- npm --prefix apps/api run reset-migration

migrate-reset-test:
	${USER} dotenv ${TEST_ENV} -c -- npm --prefix apps/api run reset-migration

# ---------------------------------------------
# TESTS
# ---------------------------------------------

test-api:
	${USER} dotenv ${TEST_ENV} -c -- npm --prefix apps/api run test

test-api-run:
	${USER} dotenv ${TEST_ENV} -c -- npm --prefix apps/api run test:run

test-e2e:
	${USER} dotenv ${TEST_ENV} -c -- npm --prefix apps/webapp run test:e2e

test-e2e-ui:
	${USER} dotenv ${TEST_ENV} -c -- npm --prefix apps/webapp run test:e2e:ui

# ---------------------------------------------
# CHECKS
# ---------------------------------------------

check-api-lint:
	npm --prefix apps/api run lint:check
	
check-api-types:
	npm --prefix apps/api run types:check

check-api-format:
	npm --prefix apps/api run format:check

check-webapp-lint:
	npm --prefix apps/webapp run lint:check
	
check-webapp-types:
	npm --prefix apps/webapp run types:check

check-webapp-format:
	npm --prefix apps/webapp run format:check

check:
	make check-api-lint
	make check-api-types
	make check-api-format
	make check-webapp-lint
	make check-webapp-types
	make check-webapp-format

check-commit:
	npx commitlint --last --verbose