const { nouns, adjectives, emailHost } = require("./data");

// Recive an array and return it suffled
const shuffle = (array) => {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

// Recive a noun(String), a returnAmount(Number) and return an array of emails
const randomizeEmail = (noun, returnAmount) => {
  const shuffledAdjective = shuffle(adjectives);
  let emailList = [];
	
  for(let i = 0; i < returnAmount; i++) {
    const adjective = shuffledAdjective[i];
    const host = emailHost[Math.floor(Math.random() * emailHost.length)];
    const randomEmail = `${adjective}${noun}@${host}`;
    emailList.push(randomEmail);
  }

  return emailList;
};

// Recive an amount(Number) and return an array of random emails equal the amount
const generateEmail = (amount) => {
  const nounsRepetition = amount % 200 
    ? Math.floor(amount / nouns.length) + 1 
    : amount / nouns.length;
  const shuffledNouns = shuffle(nouns);
  const emailList = [];

  for(let i = 0; emailList.length < amount; i++) {
    const randomEmail = randomizeEmail(shuffledNouns[i], nounsRepetition);
    randomEmail.forEach((email) => {
      if(emailList.length < amount) emailList.push(email);
    });
  }
  
  return emailList;
};

module.exports = { generateEmail };
