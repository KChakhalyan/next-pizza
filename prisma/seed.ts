import { prisma } from "./prismaClient";
import { hashSync } from "bcryptjs";

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: "Test User",
                email: "test.user@mail.com",
                password: hashSync("password123", 10),
                verified: new Date(),
                role: "USER",

            }, {
                fullName: "Test Admin",
                email: "test.admin@mail.com",
                password: hashSync("pa$$word123", 10),
                verified: new Date(),
                role: "ADMIN",

            }
        ]
    })
}
async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
}
async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error("Error during seeding:", e);
    }
}
main().then(async () => {
    await prisma.$disconnect();
})