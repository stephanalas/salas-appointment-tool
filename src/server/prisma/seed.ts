import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // user
  const admin = await prisma.user.upsert({
    where: {
      email: "admin@mail.com",
    },
    update: {},
    create: {
      email: "admin@mail.com",
      name: "admin",
      password: "1234",
    },
  });
  // 2 profiles, 1 task each, 1 subtask each task
  const prospect = await prisma.profile.upsert({
    where: {
      email: "prospect@mail.com",
    },
    update: {},
    create: {
      phone: "1234567890",
      email: "prospect@mail.com",
      industry: "tech",
      location: "nyc",
      stage: "PROSPECT",
      notes: "notes regarding prospect",
      active: true,
      tasks: {
        create: {
          subtasksComplete: false,
          deadline: new Date("2023-06-19"),
          urgency: "URGENT",
          userId: admin.id,
          subtasks: {
            create: {
              description: "sub task to do",
              completed: false,
            },
          },
        },
      },
    },
  });
  const client = await prisma.profile.upsert({
    where: {
      email: "client@mail.com",
    },
    update: {},
    create: {
      phone: "1234567890",
      email: "client@mail.com",
      industry: "startup",
      location: "philly",
      stage: "CLIENT",
      notes: "notes regarding client",
      active: true,
      tasks: {
        create: {
          deadline: new Date("2023-06-19"),
          urgency: "LOW",
          userId: admin.id,
          subtasksComplete: false,
          subtasks: {
            create: {
              description: "sub task to do",
              completed: false,
            },
          },
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
