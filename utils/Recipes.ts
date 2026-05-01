interface Recipe {
  id: number;
  name: string;
  image: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  description: string;
}

const RECIPES: Recipe[] = [
  {
    id: 1,
    name: "Creamy Garlic Pasta",
    image: "https://images.unsplash.com/photo-1693820206774-d4a769355142?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    cookTime: "20 min",
    servings: 4,
    difficulty: "Easy",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 2,
    name: "Spicy Tomato Penne",
    image: "https://images.unsplash.com/photo-1693820206848-6ad84857832a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    cookTime: "25 min",
    servings: 3,
    difficulty: "Easy",
    description: "Bold and zesty penne pasta tossed in a spicy tomato sauce with crushed red pepper and fresh basil.",
  },
  {
    id: 3,
    name: "Chocolate Layer Cake",
    image: "https://images.unsplash.com/photo-1585601356536-270d51fe07a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    cookTime: "90 min",
    servings: 12,
    difficulty: "Medium",
    description: "Decadent chocolate cake with layers of rich frosting and chocolate shavings. A showstopper for any celebration.",
  },
  {
    id: 4,
    name: "Crispy Nachos Supreme",
    image: "https://images.unsplash.com/photo-1776178393300-48bc87f3b65b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    cookTime: "15 min",
    servings: 6,
    difficulty: "Easy",
    description: "Loaded nachos with melted cheese, jalapeños, corn, and your favorite toppings. Perfect for game day!",
  },
  {
    id: 5,
    name: "Mini Berry Tarts",
    image: "https://images.unsplash.com/photo-1764813823855-3ef4ad5f863d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    cookTime: "45 min",
    servings: 8,
    difficulty: "Medium",
    description: "Delicate tart shells filled with vanilla cream and topped with fresh berries and a berry glaze.",
  },
  {
    id: 6,
    name: "Grilled Chicken Bowl",
    image: "https://images.unsplash.com/photo-1748012199673-d990c72aaa57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    cookTime: "30 min",
    servings: 2,
    difficulty: "Easy",
    description: "Healthy grilled chicken served with roasted vegetables, quinoa, and a tangy lemon herb dressing.",
  },
  {
    id: 7,
    name: "Pesto Pasta Primavera",
    image: "https://images.unsplash.com/photo-1748012199657-3f34292cdf70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    cookTime: "25 min",
    servings: 4,
    difficulty: "Easy",
    description: "Fresh pasta tossed with homemade pesto, seasonal vegetables, and parmesan cheese.",
  },
  {
    id: 8,
    name: "Creamy Tuscan Chicken",
    image: "https://images.unsplash.com/photo-1748012199672-2a94ab9cbb19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    cookTime: "35 min",
    servings: 4,
    difficulty: "Medium",
    description: "Tender chicken in a creamy sun-dried tomato sauce with spinach and garlic. Served with crusty bread.",
  },
];

export default RECIPES