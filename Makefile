SHELL := /bin/sh
.DEFAULT_GOAL := help

HUGO_PORT ?= 1313
PREVIEW_PORT ?= 8787

.PHONY: help install dev build check preview deploy clean

help:
	@printf '%s\n' \
		'BSides Pyongyang site commands:' \
		'  make install                Install pinned Node dependencies' \
		'  make dev [HUGO_PORT=1313]  Run the Hugo development server' \
		'  make build                  Build the production site' \
		'  make check                  Run strict Hugo and Wrangler checks' \
		'  make preview [PREVIEW_PORT=8787]' \
		'                              Preview through the Workers runtime' \
		'  make deploy                 Check and deploy the current build' \
		'  make clean                  Remove generated site files'

install:
	npm ci

dev:
	npm run dev -- --port $(HUGO_PORT)

build:
	npm run build

check:
	hugo --panicOnWarning --gc --minify
	npx --no-install wrangler deploy --dry-run

preview: build
	npx --no-install wrangler dev --port $(PREVIEW_PORT)

deploy: check
	npm run deploy:worker

clean:
	rm -rf public resources/_gen .hugo_build.lock
