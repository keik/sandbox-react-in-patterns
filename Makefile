TAG="\n\n\033[0;32m\#\#\# "
END=" \#\#\# \033[0m\n"

npm=$(shell npm bin)

.PHONY: all start watch build test clean

all: build

start: build
	@echo $(TAG)$@$(END)
	BUILD_ENV='production' $(npm)/webpack --config webpack.browser.config.js

watch: node_modules
	@echo $(TAG)$@$(END)
	DEBUG="sandbox-react-in-patterns:*" $(npm)/parallelshell \
		'$(npm)/webpack --config webpack.config.js --watch' \
		'$(npm)/nodemon build/server --watch build --ignore build/assets'

build: node_modules clean test
	@echo $(TAG)$@$(END)
	$(npm)/webpack --config webpack.config.js

test: node_modules
	$(npm)/eslint lib --ext .js,.jsx

clean:
	@echo $(TAG)$@$(END)
	rm -rf build

node_modules: package.json
	@echo $(TAG)$@$(END)
	npm install
