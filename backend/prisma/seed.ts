import { PrismaClient, SecretStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create User
  const user = await prisma.user.create({
    data: {
      email: "testuser@example.com",
      passwordHash: "",
    },
  });

  console.log("Created user:", user);

  // Create Secrets
  const secrets = [
    // ACTIVE secrets
    {
      id: "650f1a000000000000000001",
      text: "Water the office plants",
      status: SecretStatus.ACTIVE,
      receiver: null,
      expiresAt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      viewedAt: null,
      creatorId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "650f1a000000000000000002",
      text: "Pick up groceries for the weekend",
      status: SecretStatus.ACTIVE,
      receiver: "alice@example.com",
      expiresAt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      viewedAt: null,
      creatorId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // VIEWED secrets
    {
      id: "650f1a000000000000000003",
      text: "Prepare presentation slides",
      status: SecretStatus.VIEWED,
      receiver: null,
      expiresAt: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      viewedAt: new Date(), // already viewed
      creatorId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "650f1a000000000000000004",
      text: "Send report to manager",
      status: SecretStatus.VIEWED,
      receiver: "bob@example.com",
      expiresAt: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      viewedAt: new Date(),
      creatorId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // EXPIRED secrets
    {
      id: "650f1a000000000000000005",
      text: "Old meeting notes",
      status: SecretStatus.EXPIRED,
      receiver: null,
      expiresAt: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      viewedAt: null,
      creatorId: user.id,
      createdAt: new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      updatedAt: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000),
    },
    {
      id: "650f1a000000000000000006",
      text: "Expired project plan",
      status: SecretStatus.EXPIRED,
      receiver: "charlie@example.com",
      expiresAt: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      viewedAt: null,
      creatorId: user.id,
      createdAt: new Date(new Date().getTime() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
      updatedAt: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000),
    },
  ];

  await prisma.secret.deleteMany({});

  // Insert all secrets
  const result = await prisma.secret.createMany({
    data: secrets,
  });

  console.log(`Seeded ${result.count} secrets successfully!`);
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// npx prisma db seed
