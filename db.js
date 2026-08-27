const { MongoClient, ObjectId } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tagtech';
let db = null;
let client = null;

async function connectDB() {
  if (db) return db;
  client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db();
  console.log('MongoDB connected successfully');
  return db;
}

async function getSiteData(database) {
  const services = (await database.collection('services').find({}).toArray())
    .map(s => ({ ...s, _id: s._id.toString() }));
  const projects = (await database.collection('projects').find({}).toArray())
    .map(p => ({ ...p, _id: p._id.toString() }));
  const stats = (await database.collection('stats').find({}).toArray())
    .map(s => ({ ...s, _id: s._id.toString() }));
  const process = (await database.collection('process').find({}).toArray())
    .map(p => ({ ...p, _id: p._id.toString() }));
  
  const settingsDocs = await database.collection('settings').find({}).toArray();
  
  const settings = {};
  settingsDocs.forEach(doc => {
    const { _id, ...rest } = doc;
    settings[_id] = rest;
  });

  return {
    brand: settings.brand || {},
    navigation: settings.navigation || { items: [], solutionGroups: [] },
    hero: settings.hero || {},
    cta: settings.cta || {},
    contact: settings.contact || {},
    seo: settings.seo || {},
    stats,
    services,
    projects,
    process,
    updatedAt: settings.meta?.updatedAt || new Date().toISOString()
  };
}

async function updateSiteData(database, data) {
  // Update collections
  await database.collection('services').deleteMany({});
  if (data.services && data.services.length) {
    await database.collection('services').insertMany(data.services.map(({ _id, ...rest }) => rest));
  }

  await database.collection('projects').deleteMany({});
  if (data.projects && data.projects.length) {
    await database.collection('projects').insertMany(data.projects.map(({ _id, ...rest }) => rest));
  }

  await database.collection('stats').deleteMany({});
  if (data.stats && data.stats.length) {
    await database.collection('stats').insertMany(data.stats.map(({ _id, ...rest }) => rest));
  }

  await database.collection('process').deleteMany({});
  if (data.process && data.process.length) {
    await database.collection('process').insertMany(data.process.map(({ _id, ...rest }) => rest));
  }

  // Update settings
  const keys = ['brand', 'navigation', 'hero', 'cta', 'contact', 'seo'];
  for (const key of keys) {
    if (data[key]) {
      const { _id, ...rest } = data[key];
      await database.collection('settings').replaceOne({ _id: key }, rest, { upsert: true });
    }
  }

  const updatedAt = new Date().toISOString();
  await database.collection('settings').replaceOne({ _id: 'meta' }, { updatedAt }, { upsert: true });
  
  return updatedAt;
}

async function createItem(database, collectionName, item) {
  const { _id, ...rest } = item;
  const result = await database.collection(collectionName).insertOne(rest);
  return { ...rest, _id: result.insertedId.toString() };
}

async function updateItem(database, collectionName, id, item) {
  const { _id, ...rest } = item;
  await database.collection(collectionName).updateOne(
    { _id: new ObjectId(id) },
    { $set: rest }
  );
  return { _id: id, ...rest };
}

async function deleteItem(database, collectionName, id) {
  await database.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
  return { ok: true };
}

async function updateSetting(database, key, value) {
  const { _id, ...rest } = value;
  await database.collection('settings').replaceOne({ _id: key }, rest, { upsert: true });
  
  // Update updatedAt meta
  const updatedAt = new Date().toISOString();
  await database.collection('settings').replaceOne({ _id: 'meta' }, { updatedAt }, { upsert: true });
  return updatedAt;
}

module.exports = {
  connectDB,
  getSiteData,
  updateSiteData,
  createItem,
  updateItem,
  deleteItem,
  updateSetting
};
