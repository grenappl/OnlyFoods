export interface RecipeType {
  id: number;
  name: string;
  image: string;
  cookTime: string;
  servings: number;
  description: string;
  ingredients: string[];
  instructions: string[];
}

const RECIPES: RecipeType[] = [
  {
    id: 1,
    name: "Creamy Garlic Pasta",
    image: "https://images.unsplash.com/photo-1693820206774-d4a769355142?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    cookTime: "20 min",
    servings: 4,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ingredients: [
      "200g pasta",
      "4 cloves garlic (minced)",
      "1 cup heavy cream",
      "1/2 cup parmesan cheese",
      "2 tbsp butter",
      "Salt and pepper",
    ],
    instructions: [
      "Cook pasta according to package instructions.",
      "Melt butter and sauté garlic until fragrant.",
      "Add cream and simmer for 5 minutes.",
      "Stir in parmesan cheese.",
      "Combine with pasta and season to taste.",
    ],
  },
  {
    id: 2,
    name: "Spicy Tomato Penne",
    image: "https://images.unsplash.com/photo-1693820206848-6ad84857832a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    cookTime: "25 min",
    servings: 3,
    description: "Bold and zesty penne pasta tossed in a spicy tomato sauce with crushed red pepper and fresh basil.",
    ingredients: [
      "250g penne pasta",
      "2 cups tomato sauce",
      "1 tsp chili flakes",
      "2 cloves garlic",
      "Fresh basil",
      "Olive oil",
    ],
    instructions: [
      "Cook penne pasta until al dente.",
      "Heat oil and sauté garlic.",
      "Add tomato sauce and chili flakes.",
      "Simmer for 10 minutes.",
      "Mix pasta with sauce and garnish with basil.",
    ],
  },
  {
    id: 3,
    name: "Chocolate Layer Cake",
    image: "https://images.unsplash.com/photo-1585601356536-270d51fe07a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    cookTime: "90 min",
    servings: 12,
    description: "Decadent chocolate cake with layers of rich frosting and chocolate shavings. A showstopper for any celebration.",
    ingredients: [
      "2 cups flour",
      "1 3/4 cups sugar",
      "3/4 cup cocoa powder",
      "2 eggs",
      "1 cup milk",
      "1/2 cup butter",
    ],
    instructions: [
      "Preheat oven to 180°C.",
      "Mix dry ingredients together.",
      "Add wet ingredients and combine.",
      "Pour into pans and bake for 30-35 minutes.",
      "Cool and frost between layers.",
    ],
  },
  {
    id: 4,
    name: "Crispy Nachos Supreme",
    image: "https://images.unsplash.com/photo-1776178393300-48bc87f3b65b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    cookTime: "15 min",
    servings: 6,
    description: "Loaded nachos with melted cheese, jalapeños, corn, and your favorite toppings. Perfect for game day!",
    ingredients: [
      "Tortilla chips",
      "1 cup shredded cheese",
      "Jalapeños",
      "Corn kernels",
      "Sour cream",
      "Salsa",
    ],
    instructions: [
      "Preheat oven to 180°C.",
      "Spread chips on a tray.",
      "Top with cheese, jalapeños, and corn.",
      "Bake until cheese melts.",
      "Serve with sour cream and salsa.",
    ],
  },
  {
    id: 5,
    name: "Mini Berry Tarts",
    image: "https://images.unsplash.com/photo-1764813823855-3ef4ad5f863d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    cookTime: "45 min",
    servings: 8,
    description: "Delicate tart shells filled with vanilla cream and topped with fresh berries and a berry glaze.",
    ingredients: [
      "Tart shells",
      "1 cup whipped cream",
      "Vanilla extract",
      "Mixed berries",
      "Sugar glaze",
    ],
    instructions: [
      "Prepare tart shells and let cool.",
      "Whip cream with vanilla.",
      "Fill shells with cream.",
      "Top with fresh berries.",
      "Brush with glaze before serving.",
    ],
  },
  {
    id: 6,
    name: "Grilled Chicken Bowl",
    image: "https://images.unsplash.com/photo-1748012199673-d990c72aaa57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    cookTime: "30 min",
    servings: 2,
    description: "Healthy grilled chicken served with roasted vegetables, quinoa, and a tangy lemon herb dressing.",
    ingredients: [
      "2 chicken breasts",
      "1 cup quinoa",
      "Mixed vegetables",
      "Lemon juice",
      "Olive oil",
      "Salt and pepper",
    ],
    instructions: [
      "Season and grill chicken until cooked.",
      "Cook quinoa according to instructions.",
      "Roast vegetables with olive oil.",
      "Slice chicken and assemble bowl.",
      "Drizzle with lemon dressing.",
    ],
  },
  {
    id: 7,
    name: "Pesto Pasta Primavera",
    image: "https://images.unsplash.com/photo-1748012199657-3f34292cdf70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    cookTime: "25 min",
    servings: 4,
    description: "Fresh pasta tossed with homemade pesto, seasonal vegetables, and parmesan cheese.",
    ingredients: [
      "200g pasta",
      "1/2 cup pesto",
      "Zucchini",
      "Cherry tomatoes",
      "Parmesan cheese",
    ],
    instructions: [
      "Cook pasta until al dente.",
      "Sauté vegetables lightly.",
      "Mix pasta with pesto.",
      "Add vegetables and toss.",
      "Top with parmesan cheese.",
    ],
  },
  {
    id: 8,
    name: "Creamy Tuscan Chicken",
    image: "https://images.unsplash.com/photo-1748012199672-2a94ab9cbb19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    cookTime: "35 min",
    servings: 4,
    description: "Tender chicken in a creamy sun-dried tomato sauce with spinach and garlic. Served with crusty bread.",
    ingredients: [
      "2 chicken breasts",
      "1 cup heavy cream",
      "Sun-dried tomatoes",
      "Spinach",
      "Garlic",
      "Parmesan cheese",
    ],
    instructions: [
      "Cook chicken until golden and set aside.",
      "Sauté garlic and sun-dried tomatoes.",
      "Add cream and simmer.",
      "Stir in spinach and parmesan.",
      "Return chicken and cook until done.",
    ],
  },
];


export default RECIPES