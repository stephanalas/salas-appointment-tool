import bcrypt from "bcrypt";
import prisma from "./primsa.ts";

async function main() {
  // user
  const hashPassword = await bcrypt.hash(
    process.env.TEST_PASSWORD!,
    10 /* salt rounds */
  );
  const admin = await prisma.user.upsert({
    where: {
      email: "admin@mail.com",
    },
    update: {
      password: hashPassword,
    },
    create: {
      email: "admin@mail.com",
      name: "admin",
      password: hashPassword,
    },
  });
  // 2 profiles, 1 task each, 1 subtask each task
  await prisma.profile.upsert({
    where: {
      email: "prospect@mail.com",
    },
    update: {},
    create: {
      firstName: "Prospect",
      lastName: "John",
      phoneNumber: "1234567890",
      email: "prospect@mail.com",
      industry: "tech",
      stage: "PROSPECT",
      notes: "notes regarding prospect",
      tasks: {
        create: {
          deadline: null,
          urgency: "URGENT",
          userId: admin.id,
          description: "task description",
        },
      },
    },
  });
  await prisma.profile.upsert({
    where: {
      email: "client@mail.com",
    },
    update: {},
    create: {
      firstName: "Client",
      lastName: "Jane",
      phoneNumber: "1234567890",
      email: "client@mail.com",
      industry: "startup",
      stage: "CLIENT",
      notes: "notes regarding client",
      tasks: {
        create: {
          deadline: null,
          urgency: "LOW",
          userId: admin.id,
          description: "task description",
        },
      },
    },
  });

  // seed appointments
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
