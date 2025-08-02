import { Prisma } from "@prisma/client";
import { categories, ingredients, products } from "./constants";
import { prisma } from "./prismaClient";
import { hashSync } from "bcryptjs";

const randomDecimalNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
}


const generateProductVariation = ({
    productId,
    pizzaType,
    size,
}: {
    productId: number;
    pizzaType?: 1 | 2;
    size?: 20 | 30 | 40;
}): Prisma.ProductVariationUncheckedCreateInput => ({
    productId,
    price: randomDecimalNumber(190, 600),
    doughType: ["Thin", "Thick"],
    size,
});
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
    await prisma.category.createMany({
        data: categories
    })
    await prisma.ingredient.createMany({
        data: ingredients
    })
    await prisma.product.createMany({
        data: products
    })
    const pizza1 = await prisma.product.create({
        data: {
            name: 'Pepperoni Fresh',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
            categoryId: 1,
            ingredient: {
                connect: ingredients.slice(0, 5),
            },
        },
    });
    const pizza2 = await prisma.product.create({
        data: {
            name: 'Cheese',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
            categoryId: 1,
            ingredient: {
                connect: ingredients.slice(5, 10),
            },
        },
    });

    const pizza3 = await prisma.product.create({
        data: {
            name: 'Fresh chorizo',
            imageUrl:
                'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
            categoryId: 1,
            ingredient: {
                connect: ingredients.slice(10, 40),
            },
        },
    });
    await prisma.productVariation.createMany({
        data: [
            generateProductVariation({ productId: pizza1.id, pizzaType: 1, size: 20 }),
            generateProductVariation({ productId: pizza1.id, pizzaType: 1, size: 30 }),
            generateProductVariation({ productId: pizza1.id, pizzaType: 2, size: 40 }),
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