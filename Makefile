TAG="\n\n\033[0;32m\#\#\# "
END=" \#\#\# \033[0m\n"

npm=$(shell npm bin)

.PHONY: all start watch build test clean

all: build

start: build
	@echo $(TAG)$@$(END)
	node build/server

watch: node_modules
	@echo $(TAG)$@$(END)
	$(npm)/babel lib --ignore lib/client --out-dir build
	DEBUG="sandbox-react-in-patterns:*" $(npm)/parallelshell \
		'$(npm)/babel lib --ignore lib/client --out-dir build --watch --skip-initial-build' \
		'$(npm)/webpack --config webpack.config.js --devtool sourcemap' \
		'$(npm)/nodemon build/server --watch build --ignore build/assets'

build: node_modules clean test
	@echo $(TAG)$@$(END)
	$(npm)/babel lib --ignore lib/client --out-dir build
	BUILD_ENV='production' $(npm)/webpack --config webpack.config.js

test: node_modules
	@echo $(TAG)$@$(END)
	$(npm)/eslint lib --ext .js,.jsx
	$(npm)/nyc $(npm)/tape -r babel-register tests/*.js

clean:
	@echo $(TAG)$@$(END)
	rm -rf build

node_modules: package.json
	@echo $(TAG)$@$(END)
	npm install
