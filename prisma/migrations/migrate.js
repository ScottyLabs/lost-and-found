// scripts/migrate.js
const { PrismaClient } = require('@prisma/client');
const { MongoClient, ObjectId } = require('mongodb');

const prisma = new PrismaClient();
const MONGO_URI =
  'mongodb+srv://admin:xr1ujqmabhSZjWj4@lost-and-found-prod.pfehy.mongodb.net/?retryWrites=true&w=majority&appName=lost-and-found-prod';

async function main() {
  const mongo = new MongoClient(MONGO_URI);
  await mongo.connect();
  const db = mongo.db('lost_and_found_prod');

  const collections = await db.listCollections().toArray();

  // const usersCol = db.collection('users');
  const itemsCol = db.collection('items');

  // get the date 90 days ago
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setMonth(ninetyDaysAgo.getMonth() - 3);
  console.log(ninetyDaysAgo);
  const items = await itemsCol
    .find({ dateFound: { $gte: ninetyDaysAgo } })
    .toArray();

  console.log(`Found ${items.length} items from the last 90 days`);

  // const userIdMap = new Map();
  const itemIdMap = new Map();

  // console.log(`Migrating ${users.length} users...`);
  // for (const u of users) {
  //   const newUser = await prisma.user.create({
  //     data: {
  //       externalId: u.externalId ?? null,
  //       notifications: u.notif ?? false,
  //       permission: u.permission ?? 'user'
  //     }
  //   });
  //   userIdMap.set(u._id.toString(), newUser.id);
  // }

  console.log(`Migrating ${items.length} items...`);
  for (const i of items) {
    const newItem = await prisma.item.create({
      data: {
        name: i.name || 'Unnamed Item',
        foundDate: i.dateFound ? new Date(i.dateFound) : null,
        foundLocation: i.location ?? 'CUC',
        foundDescription: i.foundDescription ?? '',
        shortDescription: i.description ?? '',
        categories: Array.isArray(i.categories)
          ? i.categories
          : i.categories
          ? [i.categories]
          : [],
        color: i.color ?? 'OTHER',
        value: i.value === 'general' ? 'GENERAL' : 'HIGH',
        identifiable: Boolean(i.identifiable),
        retrieveLocation: i.building ?? 'CUC',
        itemLocation: i.itemLocation ?? '',
        longDescription: i.notes?.toString() ?? i.longDescription.toString(),
        status: i.publicDisplay
          ? i.approved
            ? 'APPROVED'
            : 'ARCHIVED'
          : 'PENDING',
        createdAt: i.createdAt ? new Date(i.createdAt) : new Date(),
        identification: i.identification ?? null,
        otherColorDescription: i.otherColorDescription ?? '',
        ownerNotified: null
      }
    });
    itemIdMap.set(i._id.toString(), newItem.id);
  }
  await mongo.close();
  await prisma.$disconnect();
}

main().catch((e) => {
  console.log(e);
  process.exit(1);
});
