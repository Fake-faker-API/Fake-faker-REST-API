// docs: https://www.npmjs.com/package/unique-names-generator
const { nouns, verbs, adverbs } = require('./custom_dictionaries/words');
const { bookGenres, movieGenres } = require('./custom_dictionaries/genres')
const { streets, USCities } = require('./custom_dictionaries/addressData')
const { uniqueNamesGenerator, adjectives, colors, animals, names, countries, starWars, NumberDictionary } = require('unique-names-generator');
const { LoremIpsum } = require("lorem-ipsum");
const zipcodes = require('zipcodes');
const abc = ['A','a','B','b','C','c','D','d','E','e','F','f','G','g','H','h','I','i','J','j','K','k','L','l','M','m','N','n','O','o','P','p','Q','q','R','r','S','s','T','t','U','u','V','v','W','w','X','x','Y','y','Z','z'];

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 4,
    min: 1
  },
  wordsPerSentence: {
    max: 10,
    min: 4
  }
});

// General
function generateNumber(minNum, maxNum) {
  const numberDictionary = NumberDictionary.generate({ min: minNum, max: maxNum });
  const user = uniqueNamesGenerator({
    dictionaries: [numberDictionary],
    length: 1,
  });
  return user;
}

function generateName() {
  const personsName = uniqueNamesGenerator({
    dictionaries: [names],
  });
  return personsName;
}

function generateFullName() {
  return generateName() + ' ' + generateName();
}

function generateDescription(numSentences) {
  return lorem.generateSentences(numSentences);
};

function generateDate({startYear, startMonth, startDate}, {endYear, endMonth, endDate}) {
  const DateGenerator = require('random-date-generator');
  DateGenerator.getRandomDate(); // random date

  const startFullDate = new Date(startYear, startMonth, startDate);
  const endFullDate = new Date(endYear, endMonth, endDate);
  let newDate = DateGenerator.getRandomDateInRange(startFullDate, endFullDate);
  if (newDate) {
    return newDate.toISOString().split('T')[0];
  } else {
    return null;
  }
}

// Users

function generateUsername(){
  return generateName().toLowerCase() + generateNumber(0, 200);
}

function generatePassword() {
  const specialCharacters = ['*', '#', '&', '#', '-', '%'];

  const pass = uniqueNamesGenerator({
    dictionaries: [abc, abc.concat(specialCharacters), generateNumber(1, 99), specialCharacters, abc, abc, specialCharacters.concat(abc), abc, specialCharacters, abc],
    length: 9,
  });
  return pass.replace(/_/g, '');
}

function generateEmail() {
  const emailDomains = ['jmail.com', 'pahoo.com', 'lotmail.com', 'baol.com', 'hive.com', 'somemail.com', 'dsm.com'];

  const domain = uniqueNamesGenerator({
    dictionaries : [emailDomains]
  })

  return generateName().toLowerCase() + generateNumber(5, 99) + '@' + domain;
}

// Books
function generateBookTitle() {
  const randNumber = generateNumber(2, 4);
  const title = uniqueNamesGenerator({
    dictionaries: [colors,nouns, adverbs, verbs, adjectives, colors,nouns],
    length: randNumber,
    style: 'capital', 
    separator: ' '
  });

  return title;
}
  
function generateBookAuthor() {
  return generateFullName();
}

function generateBookGenre() {
  return bookGenres[generateNumber(0, bookGenres.length - 1)];
}

// 13 digits
function generateISBN() {
  const part1 = String(generateNumber(111, 999));
  const part2 = String(generateNumber(111, 999));
  const part3 = String(generateNumber(111, 999));
  const part4 = String(generateNumber(111, 999));
  const part5 = String(generateNumber(1, 9));
  return part1 + part2 + part3 + part4 + part5;
}

function generatePublisherName() {
  const businessEntity = ['Books', 'Publishing', 'Publishing Corp'];

  const companyName = uniqueNamesGenerator({
    dictionaries: [colors, adjectives],
    limit: 1,
    separator: ' ',
    style: 'capital'
  });
  return companyName + ' ' + businessEntity[generateNumber(0, 3)];
}

// Products
function generatePrice(maxPrice) {
  const decimal = ['99', '05', '60', '55', '45', '80', '60', '70', '10']
  return parseFloat(String(generateNumber(1, maxPrice)))+ '.' + (decimal[generateNumber(0,8)]).padEnd(2,'0');
}

function generateProductCategory() {
  const adj = uniqueNamesGenerator({
    dictionaries: [adjectives],
    length: 1,
    style: 'capital'
  });

  return adj;
}

function generateProductStockQuantity(maxQuantity) {
  return generateNumber(1, maxQuantity);
}

function generateProductTitle() {
  const title = uniqueNamesGenerator({
    dictionaries: [colors, nouns, nouns],
    length: 2,
    style: 'capital', 
    separator: ' '
  });
  return title;
}

// Companies
function generateCompanyName() {
  const businessEntity = ['Inc', 'LLC', 'Ltd', 'Corp'];

  const companyName = uniqueNamesGenerator({
    dictionaries: [colors, adjectives],
    limit: 2,
    separator: ' ',
    style: 'capital'
  });
  return companyName + ' ' + businessEntity[generateNumber(0, 3)];
}

function generateWebsiteUrl() {
  const topLevelDomanin = ['com', 'io', 'net', 'biz'];
  const adj = uniqueNamesGenerator({
    dictionaries: [adjectives, adjectives, colors],
    length: 2,
    style: 'capital',
  });

  return 'www.' + adj.replace('_', '').toLowerCase() + '.' + topLevelDomanin[generateNumber(0, 3)];
}

// keep US for now
function generateCountry() { 
  const country = uniqueNamesGenerator({
    dictionaries: [countries],
    limit: 1
  });

  return 'US';
}

function generateCity() {
  const { USCities } = require('./custom_dictionaries/addressData');
  const index = generateNumber(0, USCities.length-1);

  return USCities[index];
}

function generateUSPhoneNumber() {
  const { areaCodes } = require('./custom_dictionaries/areaCodes');

  const randomAreaCode = areaCodes[generateNumber(0, areaCodes.length - 1)];
  const remainingDigitsPart1 = String(generateNumber(111, 999));
  const remainingDigitsPart2 = String(generateNumber(1000, 9999));

  return randomAreaCode + '-' +remainingDigitsPart1 + '-' + remainingDigitsPart2;
}

function generateUSZipCode() {
  const zipObj = zipcodes.random();

  return zipObj.zip;
}

function generateUSState() {
  const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA',' WV','WI','WY'];
  return states[generateNumber(0, 49)];
}

function generateStreetAddress() {
  const streetNumber = generateStreetNumber();
  const streetName = generateStreetName();
  
  return `${streetNumber} ${streetName}`
}

// Addresses
function generateStreetName() {
  const streetIndex = generateNumber(0, streets.length - 1);

  return `${streets[streetIndex]}`;
}

function generateStreetNumber() {
  return generateNumber(1, 9999);
}

// Movies
function generateMovieDirector() {
  return generateFullName();
}

function generateMovieGenre() {
  return movieGenres[generateNumber(0, movieGenres.length - 1)];
}

function generateMovieLength() {
  return generateNumber(45, 210);
}

function generateMovieTopCast() {
  const numCast = generateNumber(1, 3);
  let topCast = [];
  for (let index = 0; index < numCast; index++) {
    topCast.push(generateFullName());
  }
  return topCast.join(', ');
}

function generateMovieTitle() {
  const randNumber = generateNumber(1, 4);
  const title = uniqueNamesGenerator({
    dictionaries: [adjectives, nouns, verbs],
    length: randNumber,
    style: 'capital', 
    separator: ' '
  });
  if (title.split(' ').length === 1) {
    return `The ${title}`;
  }
  return title;
}

//W005-51-120
function generateSKU() {
  const letterIndex = generateNumber(0, abc.length - 1);
  const letter = abc[letterIndex].toUpperCase();

  const randNumPart1 = generateNumber(100, 999);
  const randNumPart2 = generateNumber(10, 99);
  const randNumPart3 = generateNumber(100, 999);

  return `${letter}${randNumPart1}-${randNumPart2}-${randNumPart3}`;
}

module.exports = {
  generateBookAuthor,
  generateBookGenre,
  generateBookTitle,
  generateCity,
  generateCompanyName,
  generateCountry,
  generateDate,
  generateDescription,
  generateEmail,
  generateFullName,
  generateISBN,
  generateMovieDirector,
  generateMovieGenre,
  generateMovieLength,
  generateMovieTitle,
  generateMovieTopCast,
  generateName, 
  generatePassword,
  generatePrice,
  generateProductCategory,
  generateProductStockQuantity,
  generateProductTitle,
  generatePublisherName,
  generateStreetAddress,
  generateStreetName,
  generateStreetNumber,
  generateSKU,
  generateUsername,
  generateWebsiteUrl,
  generateUSPhoneNumber,
  generateUSState,
  generateUSZipCode,
}