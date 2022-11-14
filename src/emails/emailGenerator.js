const fs = require("fs").promises;

const adjectives = ["Fast", "Big", "Cool", "Yellow", "Great"];
const nouns = ["Ball", "Car", "Dart", "Cat", "Card"];
const emailHost = ["coolmail.com", "fake.io", "glass.com"];

const shuffle = (array) => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

const randomizeEmail = (noun, returnAmount) => {
  // Set a random position to start getting adjectives from the array
  const adjectivesIndex = Math.floor(Math.random() * adjectives.length);
  let emailList = [];
	
  for(let i = 0; i < returnAmount; i++) {
    // adjetive and host make the array loop if the index is invalid
    const adjective = adjectives[adjectivesIndex % adjectives.length + i];
    const host = emailHost[0 + i] || emailHost[0];
    const randomEmail = `${adjective}${noun}@${host},\n`;
    emailList.push(randomEmail);
  }

  return emailList;
};

const generateEmail = (amount) => {
  // Set the maximum repetition of nouns
  const nounsRepetition = Math.floor(amount / 10) + 1;
  const shuffledNouns = shuffle(nouns);
  const emailList = [];

  for(let i = 0; i < amount; i++) {
    // Get an array of random emails
    const randomEmail = randomizeEmail(shuffledNouns[i], nounsRepetition);
    emailList.push(...randomEmail);
  }
  
  return emailList;
};

const writeFile = async (amount) => {
  const emailList = generateEmail(amount);
  try {
    await fs.writeFile("./src/emails/random-mails.txt", emailList);
  } catch(err) {
    console.log(err);
  }
  console.log("Done!");
};

writeFile(4);
