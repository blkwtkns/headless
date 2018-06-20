default: run

run: build

build:
	docker build -t puppeteer-chrome-linux .

puppet:
	 docker run -i --rm --cap-add=SYS_ADMIN \
   --name puppeteer-chrome puppeteer-chrome-linux \
   node -e "`cat index.js`"
