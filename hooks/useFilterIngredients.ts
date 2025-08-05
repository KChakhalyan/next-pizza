import { Api } from "@/services/api-client"
import { Ingredient } from "@prisma/client"
import { useEffect, useState } from "react"
import { useSet } from "react-use"


interface ReturnedProps {
    ingredients: Ingredient[]
    loading: Boolean
    selectedIds: Set<string>
    onAddId: (id: string) => void
}

export const useFilterIngredients = (): ReturnedProps => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedIds, { toggle }] = useSet(new Set<string>([]));


    useEffect(() => {
        async function fetchIngredients() {
            try {
                setLoading(true)
                const ingredients = await Api.ingredients.getAllIngredients()
                setIngredients(ingredients)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchIngredients();
    }, [])

    return { ingredients, loading, onAddId: toggle, selectedIds }
}