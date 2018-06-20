const puppeteer = require('puppeteer');
const agents = require('browser-agents');
// const EventEmitter = require('events')
// const emitter = new EventEmitter()
// emitter.setMaxListeners(100)
// or 0 to turn off the limit
// emitter.setMaxListeners(0)

// process.on('uncaughtException', function (err) {
//   console.error(err);
//   console.log("Node NOT Exiting...");
// });

const bronx = 'li#my_db_entry_191140347>div.item_vote>a';
const votesList = '.votes';
const dest = 'https://a.pgtb.me/RbrpXd/n1kPk?w=67644150&e=191140347';

const vote = async (voteNumber = 0) => {
  console.log('voting', voteNumber);
  const options = { executablePath: '/usr/bin/google-chrome-unstable' };
  const browser = await puppeteer.launch(options);
  // const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  const userAgent = agents.random();

  try {
    await page.setUserAgent(userAgent);
  } catch(err) {
    console.log('userAgent not handled', err)
  }

  try {
    await page.goto(dest, {waitUntil: 'networkidle2'});
  } catch(err) {
    console.log('goto ops not handled', err)
  }
  // await page.focus(selector);
  try {
    await page.waitFor(2000);
  } catch(err) {
    console.log('wait ops not handled', err)
  }

  try {
    const votes = await page.$$(votesList);
    // const bronxVote = await page.$$('li#my_db_entry_191140347>div.item_vote');
    const voteTally = votes.length;
    let voteList = [];
    let data;
    for (let i = 0; i < voteTally; i++) {
      data = await (await votes[i].getProperty('innerHTML')).jsonValue();
      voteList.push(data);
    }

    console.log('check tally', voteList.sort((a,b) => b - a))
  } catch(err) {
    console.log('selection not handled', err)
  }

  // click element
  // try {
  //   await page.click(bronx);
  // } catch(err) {
  //   console.log('selection not handled', err)
  // }

  // await page.screenshot({
  //   path: 'proof.png',
  //   fullPage: true
  // })
  browser.close();
};

vote();
// for (let i = 0; i < 10; i++) {
//   setTimeout(() => vote(i), 1);
// }
