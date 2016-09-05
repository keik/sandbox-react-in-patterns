TAG="\n\n\033[0;32m\#\#\# "
END=" \#\#\# \033[0m\n"

npm=$(shell npm bin)

all: build

start: build
	@echo $(TAG)$@$(END)
	BUILD_ENV='production' $(npm)/webpack --config webpack.browser.config.js

build: node_modules clean test
	@echo $(TAG)$@$(END)
	$(npm)/webpack --config webpack.browser.config.js

test: node_modules
	$(npm)/eslint lib --ext .js,.jsx

watch: node_modules
	@echo $(TAG)$@$(END)
	$(npm)/parallelshell \
		'$(npm)/webpack --config webpack.browser.config.js --watch' \
		'$(npm)/nodemon -x $(npm)/babel-node lib/server -w lib/server -w build'

clean:
	@echo $(TAG)$@$(END)
	rm -rf build

node_modules: package.json
	@echo $(TAG)$@$(END)
	npm install
