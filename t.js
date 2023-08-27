const cheerio = require('cheerio');
const fs = require('fs');
const { unabbreviateNumber } = require('js-abbreviation-number');

let $ = cheerio.load(fs.readFileSync('tiktok.html'));

console.log($('h2[data-e2e="user-subtitle"]').text() == '');