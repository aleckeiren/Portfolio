// Will send messages containing food data on channels:
//  - vegetables
//  - fruits
//  - bread
//
// Intended to simulate multiple microservices communicating live 
// item availability data.
//
// Change the redis url and password below to the one for your own 
// account.
//
var redis = require("redis");

client = 
  redis.createClient(
     {url: "redis://redis-12617.c8.us-east-1-4.ec2.cloud.redislabs.com:12617"
     ,password: "3gtR14vX9PBDgmV0zkUp0A19tqIv0Kl0"
     }
  );


function wait(milliseconds) {
   return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const vegetables = [
  "acorn squash",
  "alfalfa sprout",
  "amaranth",
  "anise",
  "artichoke",
  "arugula",
  "asparagus",
  "aubergine",
  "azuki bean",
  "banana squash",
  "basil",
  "bean sprout",
  "beet",
  "black bean",
  "black-eyed pea",
  "bok choy",
  "borlotti bean",
  "broad beans",
  "broccoflower",
  "broccoli",
  "brussels sprout",
  "butternut squash",
  "cabbage",
  "calabrese",
  "caraway",
  "carrot",
  "cauliflower",
  "cayenne pepper",
  "celeriac",
  "celery",
  "chamomile",
  "chard",
  "chayote",
  "chickpea",
  "chives",
  "cilantro",
  "collard green",
  "corn",
  "corn salad",
  "courgette",
  "cucumber",
  "daikon",
  "delicata",
  "dill",
  "eggplant",
  "endive",
  "fennel",
  "fiddlehead",
  "frisee",
  "garlic",
  "gem squash",
  "ginger",
  "green bean",
  "green pepper",
  "habanero",
  "herbs and spice",
  "horseradish",
  "hubbard squash",
  "jalapeno",
  "jerusalem artichoke",
  "jicama",
  "kale",
  "kidney bean",
  "kohlrabi",
  "lavender",
  "leek ",
  "legume",
  "lemon grass",
  "lentils",
  "lettuce",
  "lima bean",
  "mamey",
  "mangetout",
  "marjoram",
  "mung bean",
  "mushroom",
  "mustard green",
  "navy bean",
  "new zealand spinach",
  "nopale",
  "okra",
  "onion",
  "oregano",
  "paprika",
  "parsley",
  "parsnip",
  "patty pan",
  "pea",
  "pinto bean",
  "potato",
  "pumpkin",
  "radicchio",
  "radish",
  "rhubarb",
  "rosemary",
  "runner bean",
  "rutabaga",
  "sage",
  "scallion",
  "shallot",
  "skirret",
  "snap pea",
  "soy bean",
  "spaghetti squash",
  "spinach",
  "squash",
  "sweet potato",
  "tabasco pepper",
  "taro",
  "tat soi",
  "thyme",
  "topinambur",
  "tubers",
  "turnip",
  "wasabi",
  "water chestnut",
  "watercress",
  "white radish",
  "yam",
  "zucchini"
];

const fruits = [
  "apple",
  "apricot",
  "avocado",
  "banana",
  "bell pepper",
  "bilberry",
  "blackberry",
  "blackcurrant",
  "blood orange",
  "blueberry",
  "boysenberry",
  "breadfruit",
  "canary melon",
  "cantaloupe",
  "cherimoya",
  "cherry",
  "chili pepper",
  "clementine",
  "cloudberry",
  "coconut",
  "cranberry",
  "cucumber",
  "currant",
  "damson",
  "date",
  "dragonfruit",
  "durian",
  "eggplant",
  "elderberry",
  "feijoa",
  "fig",
  "goji berry",
  "gooseberry",
  "grape",
  "grapefruit",
  "guava",
  "honeydew",
  "huckleberry",
  "jackfruit",
  "jambul",
  "jujube",
  "kiwi fruit",
  "kumquat",
  "lemon",
  "lime",
  "loquat",
  "lychee",
  "mandarine",
  "mango",
  "mulberry",
  "nectarine",
  "nut",
  "olive",
  "orange",
  "papaya",
  "passionfruit",
  "peach",
  "pear",
  "persimmon",
  "physalis",
  "pineapple",
  "plum",
  "pomegranate",
  "pomelo",
  "purple mangosteen",
  "quince",
  "raisin",
  "rambutan",
  "raspberry",
  "redcurrant",
  "rock melon",
  "salal berry",
  "satsuma",
  "star fruit",
  "strawberry",
  "tamarillo",
  "tangerine",
  "tomato",
  "ugli fruit",
  "watermelon"
];

const breads = [
  "bagel",
  "baguette",
  "boule",
  "brioche",
  "casalinga",
  "chapati",
  "ciabatta",
  "cornbread",
  "crumpet",
  "epi",
  "ficelle",
  "flatbread",
  "focaccia",
  "fruit bread",
  "hamburger bun",
  "hardtack",
  "lavash",
  "matzoh",
  "muffin",
  "naan",
  "pain au levain",
  "pain de mie",
  "pane d'olive",
  "paratha",
  "pita",
  "potato bread",
  "pretzel",
  "pumpernickel",
  "roti",
  "rugbrød",
  "rye",
  "scone",
  "soda bread",
  "sourdough",
  "tortilla"
];

async function generateData()
{

  const typeFood = Math.floor(Math.random() * 3);
  const grams = Math.floor(Math.random() * 10000) + 100;
  const calories = Math.floor(Math.random() * 5000) + 100;
  const price = Math.floor(Math.random() * 200) + 1;

  if (typeFood == 0)
  {
    const type_num = Math.floor(Math.random() * vegetables.length); 
    const data = {
      type: vegetables[type_num],
      grams: grams,
      calories: calories,
      price: price,
    };
    client.publish("vegetables", JSON.stringify(data));
  }
  else if (typeFood == 1)
  {
    const type_num = Math.floor(Math.random() * fruits.length); 
    const data = {
      type: fruits[type_num],
      grams: grams,
      calories: calories,
      price: price,
    };
    client.publish("fruits", JSON.stringify(data));
  }
  else 
  {
    const type_num = Math.floor(Math.random() * breads.length); 
    const data = {
      type: breads[type_num],
      grams: grams,
      calories: calories,
      price: price,
    };
    client.publish("breads", JSON.stringify(data));
  }

  await wait(1000);
  generateData();
}

generateData();

