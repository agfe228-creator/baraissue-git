import { PrismaClient } from "@prisma/client";
import { exhibitionProvider } from "../src/providers/exhibitionProvider";
import { fairProvider } from "../src/providers/fairProvider";
import { festivalProvider } from "../src/providers/festivalProvider";
import { performanceProvider } from "../src/providers/performanceProvider";

async function main() {
  const prisma = new PrismaClient();
  const providers = [festivalProvider, fairProvider, exhibitionProvider, performanceProvider];
  const merged = new Map<string, Awaited<ReturnType<(typeof providers)[number]["fetchEvents"]>>[number]>();

  for (const provider of providers) {
    const items = await provider.fetchEvents();
    for (const item of items) {
      merged.set(item.slug, item);
    }
    console.log(`${provider.name}: ${items.length} loaded`);
  }

  for (const event of merged.values()) {
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

  await prisma.$disconnect();
  console.log(`Sync complete. Unique events saved: ${merged.size}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
