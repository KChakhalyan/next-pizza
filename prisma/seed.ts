import { Prisma } from "@prisma/client";
import { categories, ingredients, products } from "./constants";
import { prisma } from "./prismaClient";
import { hashSync } from "bcryptjs";

/** Случайная цена с одним знаком после запятой между min и max */
const randomDecimalNumber = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;

type DoughType = "Thin" | "Thick";

/**
 * Формирует объект для ProductVariationUncheckedCreateInput.
 * Убрано поле pizzaType, т.к. его нет в схеме.
 */
const generateProductVariation = ({
    productId,
    size,
    doughType,
}: {
    productId: number;
    size?: 20 | 30 | 40;
    doughType: DoughType[];
}): Prisma.ProductVariationUncheckedCreateInput => ({
    productId,
    price: randomDecimalNumber(190, 600),
    size,
    doughType,
});

async function up() {
    // 1) Сидим юзеров
    await prisma.user.createMany({
        data: [
            {
                fullName: "Test User",
                email: "test.user@mail.com",
                password: hashSync("password123", 10),
                verified: new Date(),
                role: "USER",
            },
            {
                fullName: "Test Admin",
                email: "test.admin@mail.com",
                password: hashSync("pa$$word123", 10),
                verified: new Date(),
                role: "ADMIN",
            },
        ],
    });

    // 2) Сидим категории и ингредиенты
    await prisma.category.createMany({ data: categories });
    await prisma.ingredient.createMany({ data: ingredients });

    // 3) Сидим простые продукты из constants
    await prisma.product.createMany({ data: products });

    // 4) Создаём три “пиццы” вручную и ловим их ID
    const pizza1 = await prisma.product.create({
        data: {
            name: "Pepperoni Fresh",
            imageUrl:
                "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
            categoryId: 1,
            ingredient: { connect: ingredients.slice(0, 5) },
        },
    });
    const pizza2 = await prisma.product.create({
        data: {
            name: "Cheese",
            imageUrl:
                "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
            categoryId: 1,
            ingredient: { connect: ingredients.slice(5, 10) },
        },
    });
    const pizza3 = await prisma.product.create({
        data: {
            name: "Fresh chorizo",
            imageUrl:
                "https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp",
            categoryId: 1,
            ingredient: { connect: ingredients.slice(10, 40) },
        },
    });

    // 5) Готовим вариации
    const variations: Prisma.ProductVariationUncheckedCreateInput[] = [
        // Для Pepperoni Fresh
        generateProductVariation({
            productId: pizza1.id,
            size: 20,
            doughType: ["Thin"],
        }),
        generateProductVariation({
            productId: pizza1.id,
            size: 30,
            doughType: ["Thick"],
        }),
        generateProductVariation({
            productId: pizza1.id,
            size: 40,
            doughType: ["Thick"],
        }),

        // Для Cheese
        generateProductVariation({
            productId: pizza2.id,
            size: 20,
            doughType: ["Thin"],
        }),
        generateProductVariation({
            productId: pizza2.id,
            size: 30,
            doughType: ["Thin"],
        }),
        generateProductVariation({
            productId: pizza2.id,
            size: 40,
            doughType: ["Thin"],
        }),
        generateProductVariation({
            productId: pizza2.id,
            size: 20,
            doughType: ["Thick"],
        }),
        generateProductVariation({
            productId: pizza2.id,
            size: 30,
            doughType: ["Thick"],
        }),
        generateProductVariation({
            productId: pizza2.id,
            size: 40,
            doughType: ["Thick"],
        }),

        // Для Fresh chorizo
        generateProductVariation({
            productId: pizza3.id,
            size: 20,
            doughType: ["Thin"],
        }),
        generateProductVariation({
            productId: pizza3.id,
            size: 30,
            doughType: ["Thick"],
        }),
        generateProductVariation({
            productId: pizza3.id,
            size: 40,
            doughType: ["Thick"],
        }),
    ];

    // 6) Дефолтная вариация для всех остальных продуктов из constants
    for (let id = 1; id <= products.length; id++) {
        variations.push(
            generateProductVariation({ productId: id, doughType: ["Thin"] })
        );
    }

    // 7) Сейвим все вариации
    await prisma.productVariation.createMany({ data: variations });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductVariation" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`;
}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error("Error during seeding:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
