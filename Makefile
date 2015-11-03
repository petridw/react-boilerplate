PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

.PHONY: all

build_js_source  := src/js/app.js
build_js_dest    := client/build/bundle.js
build_css_source := css/*.css
build_css_dest   := client/build/bundle.css

all: $(build_js_dest) $(build_css_dest)

$(build_js_dest): src/js/**/*.js
	browserify $(build_js_source) -t [ babelify --presets [ react es2015 ] ] | uglifyjs -mc > $@
	

$(build_css_dest): $(build_css_source)
	cat $^ | cleancss  > $@
