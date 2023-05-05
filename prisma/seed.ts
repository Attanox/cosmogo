import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.dragon.deleteMany();
    await prisma.launch.deleteMany();
    await prisma.rocket.deleteMany();
    await prisma.launchSite.deleteMany();
    await prisma.launchLinks.deleteMany();

    // Seed Rockets
    const falcon9 = await prisma.rocket.create({
      data: {
        id: "falcon9",
        rocket_type: "FT",
      },
    });

    const falconHeavy = await prisma.rocket.create({
      data: {
        id: "falconheavy",
        rocket_type: "FT",
      },
    });

    // Seed Launch Sites
    const ccafsSlc40 = await prisma.launchSite.create({
      data: {
        id: "ccafs_slc_40",
        site_name_long:
          "Cape Canaveral Air Force Station Space Launch Complex 40",
      },
    });

    const kscLc39a = await prisma.launchSite.create({
      data: {
        id: "ksc_lc_39a",
        site_name_long: "Kennedy Space Center Historic Launch Complex 39A",
      },
    });

    // Seed Launch Links
    const falcon9Demo = await prisma.launchLinks.create({
      data: {
        id: "falcon9_demo",
        article_link:
          "https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html",
      },
    });

    const crs16 = await prisma.launchLinks.create({
      data: {
        id: "crs16",
        article_link:
          "https://spaceflightnow.com/2018/12/05/spacex-cargo-launching-to-space-station-scrubbed-thursday/",
      },
    });

    // Seed Dragons
    const crewDragon = await prisma.dragon.create({
      data: {
        id: "crew_dragon",
        crew_capacity: 7,
        description:
          "Dragon 2 is the second version of the Dragon spacecraft, which will be used for human spaceflight.",
        name: "Dragon 2",
      },
    });

    const cargoDragon = await prisma.dragon.create({
      data: {
        id: "cargo_dragon",
        crew_capacity: 3,
        description:
          "Dragon is a spacecraft developed by SpaceX for transporting cargo and eventually astronauts to the International Space Station (ISS).",
        name: "Dragon",
      },
    });

    for (let i = 0; i < 100; i++) {
      const missionName = faker.lorem.words(2);
      const launchDate = faker.date.between("2020-01-01", "2023-05-04");
      const site = i % 2 === 0 ? ccafsSlc40.id : kscLc39a.id;
      const rocket = i % 2 === 0 ? falcon9.id : falconHeavy.id;
      const links = i % 2 === 0 ? falcon9Demo.id : crs16.id;

      await prisma.launch.create({
        data: {
          id: faker.random.alphaNumeric(12),
          mission_name: missionName,
          launch_date_utc: launchDate.toISOString(),
          rocket: {
            connect: {
              id: rocket,
            },
          },
          launch_site: {
            connect: {
              id: site,
            },
          },
          links: {
            connect: {
              id: links,
            },
          },
        },
      });
    }

    console.log("Successfully seeded launches");
  } catch (error) {
    console.error("Error seeding launches", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
