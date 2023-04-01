import {PrismaClient} from "@prisma/client"
import * as dotenv from 'dotenv'
dotenv.config()

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
  });

async function getSub() {
    const subscription = await prisma.subscription.findMany();
    console.log(subscription);
}

async function subAutoRemove() {
    const weekTime = 604800000;
    const subscriptions = await prisma.subscription.findMany();
    let diff = (new Date()).getTime() - Date.parse('2023-03-13T19:17:29.930Z');
    subscriptions.filter((subscription) => {
        const difference = new Date().getTime() - subscription.createdAt.getTime();
        return difference > weekTime;
    });
    await prisma.subscription.deleteMany({ where: {
        id: {
            in: subscriptions.map((subscription) => subscription.id)
        }
    } });
    const subscriptionsValid = await prisma.subscription.findMany();


    console.log("delete");
    console.log(diff);
}

getSub();
subAutoRemove();