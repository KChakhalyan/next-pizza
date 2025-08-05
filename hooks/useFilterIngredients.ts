import { Api } from "@/services/api-client"
import { Ingredient } from "@prisma/client"
import { useEffect, useState } from "react"


interface ReturnedProps {
    ingredients: Ingredient[]
}

export const useFilterIngredients = (): ReturnedProps => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    useEffect(() => {
        async function fetchIngredients() {
            try {
                const ingredients = await Api.ingredients.getAllIngredients()
                setIngredients(ingredients)
            } catch (error) {
                console.log(error)
            }
        }
        fetchIngredients();
    }, [])

    return { ingredients }
}