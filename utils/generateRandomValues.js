// docs: https://www.npmjs.com/package/unique-names-generator

const nouns = ['Painting', 'Grass', 'Pencil', 'Guitar', 'Piano', 'Ambulance',	'Pillow', 'Helicopter', 'Helmet',	'Plastic', 'Balloon',	'Horse',	'Queen', 'Battery', 'Raincoat', 'Refrigerator', 'Iron', 'Rocket',
               'Camera', 'Jewellery', 'Candle', 'Car', 'Caravan',	'Scooter', 'Carpet', 'Shampoo', 'Shoe', 'Kite', 'Knife', 'Spoon', 'Crayon',	'Lamp', 'Leather', 'Lighter',	'Telephone', 'Television', 'Tent', 
               'Lock', 'Toothbrush', 'Machine', 'Dress',	'Magazine', 'Truck', 'Umbrella', 'Match',	'Van', 'Microphone', 'Vase', 'Motorcycle', 'Wall', 'Nail', 'Whale', 'Napkin', 'Wire', 'Yacht', 'Flag', 'Furniture',	'Glass'];

const bookGenres = ['Action/adventure','Art/architecture', 'Alternate history', 'Autobiography', 'Anthology', 'Biography', 'Chick lit', 'Business/economics',"Children's",'Crafts/hobbies','Classic','Cookbook','Comic book','Diary','Coming-of-age','Dictionary','Crime','Encyclopedia','Drama','Guide','Fairytale','Health/fitness','Fantasy','History','Graphic novel','Home and garden','Historical fiction','Humor','Horror','Journal','Mystery','Math','Paranormal romance','Memoir','Picture book','Philosophy','Poetry','Prayer','Political thriller',"Religion, spirituality, and new age",'Romance','Textbook','Satire', 'True crime','Science fiction','Review','Short story','Science','Suspense','Self help','Thriller','Sports and leisure','Western','Travel','Young adult', 'True crime'];
const movieGenres = ['Action/adventure', 'Alternate history', 'Biography', "Children's", 'Classic','Cookbook','Comics', 'Coming-of-age', 'Crime','Encyclopedia','Drama','Fairytale', 'Fantasy','History','Historical fiction','Humor','Horror','Mystery','Math','Paranormal','Memoir','Political thriller','Romance','Textbook','Satire', 'True crime','Science fiction', 'Short story','Science','Suspense','Thriller', 'Western','Travel','Young adult', 'True crime'];

const { uniqueNamesGenerator, adjectives, colors, countries, names, animals, starWars, NumberDictionary } = require('unique-names-generator');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

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

console.log(generateBookAuthor());

function generateEmail() {
  const emailDomains = ['jmail.com', 'pahoo.com', 'lotmail.com', 'baol.com', 'hive.com', 'somemail.com', 'dsm.com'];

  const domain = uniqueNamesGenerator({
    dictionaries : [emailDomains]
  })

  return generateName().toLowerCase() + generateNumber(5, 99) + '@' + domain;
}

function generatePassword() {
  const specialCharacters = [
    '*', '#', '&', '#', '-', '%'
  ];
  const abc = ['A','a','B','b','C','c','D','d','E','e','F','f','G','g','H','h','I','i','J','j','K','k','L','l','M','m','N','n','O','o','P','p','Q','q','R','r','S','s','T','t','U','u','V','v','W','w','X','x','Y','y','Z','z'];

  const pass = uniqueNamesGenerator({
    dictionaries: [abc, abc.concat(specialCharacters), abc, specialCharacters, abc, abc, specialCharacters.concat(abc), abc],
    length: 8,
  });
  return pass.replace(/_/g, '');
}

function generateNumber(minNum, maxNum) {
  const numberDictionary = NumberDictionary.generate({ min: minNum, max: maxNum });
  const user = uniqueNamesGenerator({
    dictionaries: [numberDictionary],
    length: 1,
  });
  return user;
}

function generateUsername(){
  return generateName().toLowerCase() + generateNumber(0, 200);
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

function generateTitle() {
  // adjectives, colors, countries, names, animals

  const color = uniqueNamesGenerator({
    dictionaries: [colors],
    length: 1,
    style: 'capital'
  });

  const noun = uniqueNamesGenerator({
    dictionaries: [nouns],
    length: 1
  })

  return `${color} ${noun}`;
}

function generateDescription(numSentences) {
  return lorem.generateSentences(numSentences);
};

function generatePrice(maxPrice) {
  const decimal = ['99', '05', '60', '55', '45', '80', '60', '70', '10']
  return parseFloat(String(generateNumber(1, maxPrice)))+ '.' + (decimal[generateNumber(0,8)]).padEnd(2,'0');
}

function generateCategory() {
  const adj = uniqueNamesGenerator({
    dictionaries: [adjectives],
    length: 1,
    style: 'capital'
  });

  return adj;
}

function generateStockQuantity(maxQuantity) {
  return generateNumber(1, maxQuantity);
}

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

function generateCountry() { // might just keep US
  const country = uniqueNamesGenerator({
    dictionaries: [countries],
    limit: 1
  });

  return country;
}

function generateUSState() {
  const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA',' WV','WI','WY'];
  return states[generateNumber(0, 49)];
}

function generateBookTitle() {
//Plum IG-88 Refrigerator
  const title = uniqueNamesGenerator({
    dictionaries: [colors, starWars, nouns, nouns, nouns, nouns, adjectives],
    length: 3,
    style: 'capital', 
    separator: ' '
  });

  return title;
}

function generateBookAuthor() {
  return generateFullName();
}

function generateMovieDirector() {
  return generateFullName();
}

function generateBookGenre() {
  return bookGenres[generateNumber(0, bookGenres.length - 1)];
}

function generateMovieGenre() {
  return movieGenres[generateNumber(0, movieGenres.length - 1)];
}

function generteMovieLength() {
  return generateNumber(45, 210);
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

console.log(generateWebsiteUrl());



module.exports = {
  generateEmail,
  generateFullName,
  generatePassword,
  generateUsername,
  generateName, 
  generateTitle,
  generateDescription,
  generatePrice,
  generateCategory,
  generateStockQuantity,
  generateBookTitle
}