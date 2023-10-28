#COLORS
GREEN  := $(shell tput -Txterm setaf 2)
WHITE  := $(shell tput -Txterm setaf 7)
YELLOW := $(shell tput -Txterm setaf 3)
RESET  := $(shell tput -Txterm sgr0)

# Needed SHELL since I'm using zsh
SHELL := /bin/bash

# ---------------------------------------------------------------------
#                            HELP
# ---------------------------------------------------------------------
HELP_FUN = \
	%help; \
	while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^([a-zA-Z\-]+)\s*:.*\#\#(?:@([a-zA-Z\-]+))?\s(.*)$$/ }; \
	print "usage: make [target]\n\n"; \
	for (sort keys %help) { \
	print "${WHITE}$$_:${RESET}\n"; \
	for (@{$$help{$$_}}) { \
	$$sep = " " x (32 - length $$_->[0]); \
	print "  ${YELLOW}$$_->[0]${RESET}$$sep${GREEN}$$_->[1]${RESET}\n"; \
	}; \
	print "\n"; }

.PHONY: help
help: ##@other Show this help.
	@perl -e '$(HELP_FUN)' $(MAKEFILE_LIST)

# ---------------------------------------------------------------------
#                            PROJECT
# ---------------------------------------------------------------------
.PHONY: init
init: ##@project Initialize local environment.
	@npm --prefix ./projects/core ci
	@npm --prefix ./projects/cli ci
	@npm --prefix ./projects/web ci

.PHONY: upgrade
upgrade: ##@project Reinstall all Node Packages with Latest version (upgrade packages).
	@npm --prefix ./projects/core install --prefer-online
	@npm --prefix ./projects/cli install --prefer-online
	@npm --prefix ./projects/web install --prefer-online

.PHONY: build
build: ##@project Build local sources.
	@npm --prefix ./projects/core run build
	@npm --prefix ./projects/cli run build
	@npm --prefix ./projects/web run build

.PHONY: lint
lint: ##@project Lint and fix local sources.
	@npm --prefix ./projects/core run lint:fix
	@npm --prefix ./projects/cli run lint:fix
	@npm --prefix ./projects/web run format

# ---------------------------------------------------------------------
#                            Dataset
# ---------------------------------------------------------------------
.PHONY: dataset
dataset: build ##@dataset Unify all dataset CSV/JSON files.
	@node projects/cli/dist/src/main.js dataset -p ./dataset/raw/1976-2008.csv -o ./dataset/unified/1976-2008.json -dc date_de_tirage -df YYYYMMDD -ri1 boule_1 -ri2 boule_2 -ri3 boule_3 -ri4 boule_4 -ri5 boule_5 -rmi boule_complementaire
	@node projects/cli/dist/src/main.js dataset -p ./dataset/raw/2008-2017.csv -o ./dataset/unified/2008-2017.json -dc date_de_tirage -df DD/MM/YYYY -ri1 boule_1 -ri2 boule_2 -ri3 boule_3 -ri4 boule_4 -ri5 boule_5 -rmi numero_chance
	@node projects/cli/dist/src/main.js dataset -p ./dataset/raw/2017-2019.csv -o ./dataset/unified/2017-2019.json -dc date_de_tirage -df DD/MM/YYYY -ri1 boule_1 -ri2 boule_2 -ri3 boule_3 -ri4 boule_4 -ri5 boule_5 -rmi numero_chance
	@node projects/cli/dist/src/main.js dataset -p ./dataset/raw/2019-2019.csv -o ./dataset/unified/2019-2019.json -dc date_de_tirage -df DD/MM/YYYY -ri1 boule_1 -ri2 boule_2 -ri3 boule_3 -ri4 boule_4 -ri5 boule_5 -rmi numero_chance
	@node projects/cli/dist/src/main.js dataset -p ./dataset/raw/2020-2023.csv -o ./dataset/unified/2020-2023.json -dc date_de_tirage -df DD/MM/YYYY -ri1 boule_1 -ri2 boule_2 -ri3 boule_3 -ri4 boule_4 -ri5 boule_5 -rmi numero_chance

.PHONY: models
models: build ##@dataset Generate Neural Network models from dataset.
	@rm -f dataset/roll.model.json dataset/magic.model.json
	@node projects/cli/dist/src/main.js models -p ./dataset/unified -r dataset/roll.model.json -m dataset/magic.model.json

# ---------------------------------------------------------------------
#                            Run
# ---------------------------------------------------------------------
.PHONY: roll
roll: build ##@run Run prediction.
	@node projects/cli/dist/src/main.js predict-roll -m ./dataset/roll.model.json
	@node projects/cli/dist/src/main.js predict-magic -m ./dataset/magic.model.json

.PHONY: web
web: build ##@run Serve static website.
	@npx serve ./projects/web/dist
