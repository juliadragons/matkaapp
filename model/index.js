const {MongoClient} = require("mongodb")

const andmebaas = "juliaf"
const salasona = process.env.MONGO_PWD
const mongoUrl = `mongodb+srv://juliaf:${salasona}@cluster0.c5a2m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(mongoUrl);

async function lisaMatk(uusMatk) {
    try {
        await client.connect();
        const database = client.db(andmebaas);
        const matkad = database.collection("matkad");
        const result = await matkad.insertOne(uusMatk)
        console.log(`A document was inserted with the _id: ${result.insertedId}`)
      } finally {
        await client.close();
      }
}

async function lisaRegistreerumine(uusRegistreerumine) {
  try {
    await client.connect();
    const database = client.db(andmebaas);
    const matkad = database.collection("registreerumised");
    const result = await matkad.insertOne(uusRegistreerumine)
    console.log(`A document was inserted with the _id: ${result.insertedId}`)
  } finally {
    await client.close();
  }
}

async function loeMatkad() {
  try {
      await client.connect();
      const database = client.db(andmebaas);
      const matkad = database.collection("matkad");
      const result = await matkad.find({}).toArray()
      return result
    } finally {
      await client.close();
    }
}

async function loeMatk(id) {
  try {
      await client.connect();
      const database = client.db(andmebaas);
      const matkad = database.collection("matkad");
      console.log("Searching for matkIndeks:", id);
      const result = await matkad.findOne({ matkIndeks: Number(id)});
      return result;
    } finally {
      await client.close();
    }
}

module.exports = {
    lisaMatk,
    lisaRegistreerumine,
    loeMatkad,
    loeMatk
}