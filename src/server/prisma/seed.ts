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
  // profiles
  // const prospect = await prisma.profile.upsert({
  //   where: {
  //     email: "prospect@mail.com",
  //   },
  //   update: {},
  //   create: {
  //     phone: "1234567890",
  //     email: "prospect@mail.com",
  //     industry: "tech",
  //     location: "nyc",
  //   },
  // });
}
