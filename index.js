const puppeteer = require('puppeteer');
const agents = require('browser-agents');
// const EventEmitter = require('events')
// const emitter = new EventEmitter()
// emitter.setMaxListeners(100)
// or 0 to turn off the limit
// emitter.setMaxListeners(0)

const selector = 'li#my_db_entry_191140347>div.item_vote>a';
const dest = 'https://a.pgtb.me/RbrpXd/n1kPk?w=67644150&e=191140347';

const vote = async () => {
  console.log('voting');
  const options = { executablePath: '/usr/bin/google-chrome-unstable' };
  const browser = await puppeteer.launch(options);
  // const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  const userAgent = agents.random();
  await page.setUserAgent(userAgent);
  await page.goto(dest, {waitUntil: 'networkidle2'});
  // await page.focus(selector);
  await page.waitFor(2000);
  await page.click(selector);
  // await page.screenshot({
  //   path: 'proof.png',
  //   fullPage: true
  // })
  browser.close();
};

for (let i = 0; i < 10; i++) {
  setTimeout(vote, 1000);
}
