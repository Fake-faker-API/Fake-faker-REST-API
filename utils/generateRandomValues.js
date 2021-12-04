// docs: https://www.npmjs.com/package/unique-names-generator

const { uniqueNamesGenerator, adjectives, colors, countries, names, animals, starWars, NumberDictionary } = require('unique-names-generator');

// console.log(generateEmail());

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
    length: 1
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

module.exports = {
  generateEmail,
  generateFullName,
  generatePassword,
  generateUsername,
  generateName
}