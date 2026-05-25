import { RecipeType } from "./Recipes"

const formatRecipe = (r) => {
	return {
		id: r.id,
		name: r.title,
		description: r.description,
		ingredients: r.ingredients,
		instructions: r.steps,
		cuisineType: r.cuisine_type,
		cookTime: r.cook_time_minutes,
		servings: r.servings,
		// "isPublic": r.is_published,
		favorites: r.favorites_count,
		// authorId: r.author_id,
		// createdAt: r.created_at"
		image: r.recipe_media[0]?.url
	}
}

export default formatRecipe;