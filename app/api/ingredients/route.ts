import { prisma } from "@/prisma/prismaClient";

export async function GET(request: Request) {
    const ingredients = await prisma.ingredient.findMany();
    return Response.json(ingredients);
}