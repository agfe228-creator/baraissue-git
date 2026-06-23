import { PrismaClient } from "@prisma/client";
import { events } from "../src/lib/events";

const prisma = new PrismaClient();

async function main() {
  for (const event of events) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: {
        title: event.title,
        category: event.category,
        region: event.region,
        city: event.city,
        venue: event.venue,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        organizer: event.organizer,
        website: event.website,
        description: event.description,
        admissionFee: event.admissionFee,
        parkingInfo: event.parkingInfo,
        transportInfo: event.transportInfo,
        faq: event.faq,
        contact: event.contact,
        status: event.status
      },
      create: {
        slug: event.slug,
        title: event.title,
        category: event.category,
        region: event.region,
        city: event.city,
        venue: event.venue,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        organizer: event.organizer,
        website: event.website,
        description: event.description,
        admissionFee: event.admissionFee,
        parkingInfo: event.parkingInfo,
        transportInfo: event.transportInfo,
        faq: event.faq,
        contact: event.contact,
        status: event.status
      }
    });
  }

  console.log(`Seed complete: ${events.length} events`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
