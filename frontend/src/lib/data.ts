import { Product } from "@/store/posStore";

export const mockProducts: Product[] = [
  // Chinese Veg Starters
  { id: "cvs1", name: "Lemon Paneer", category: "Chinese Veg Starters", price: 279, image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cvs2", name: "Chilly Paneer", category: "Chinese Veg Starters", price: 289, image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cvs3", name: "French Fries", category: "Chinese Veg Starters", price: 179, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cvs4", name: "Veg Manchurian (Dry)", category: "Chinese Veg Starters", price: 249, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cvs5", name: "Veg Manchurian (Gravy)", category: "Chinese Veg Starters", price: 269, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cvs6", name: "Honey Chilli Potato", category: "Chinese Veg Starters", price: 269, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cvs7", name: "Chilly Potato", category: "Chinese Veg Starters", price: 249, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cvs8", name: "Peri Peri Fries", category: "Chinese Veg Starters", price: 199, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cvs9", name: "Cheesy Fries", category: "Chinese Veg Starters", price: 269, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cvs10", name: "Crispy Corn", category: "Chinese Veg Starters", price: 299, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },

  // Chinese Non-Veg Starters
  { id: "cnv1", name: "Lemon Chicken", category: "Chinese Non-Veg Starters", price: 369, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cnv2", name: "Chicken Lollipop", category: "Chinese Non-Veg Starters", price: 369, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cnv3", name: "Chicken Wings", category: "Chinese Non-Veg Starters", price: 389, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cnv4", name: "Drums of Heaven", category: "Chinese Non-Veg Starters", price: 399, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cnv5", name: "Chilly Chicken (Dry)", category: "Chinese Non-Veg Starters", price: 369, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cnv6", name: "Chilly Chicken (Gravy)", category: "Chinese Non-Veg Starters", price: 399, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cnv7", name: "Egg Bhurji", category: "Chinese Non-Veg Starters", price: 149, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cnv8", name: "Boiled Egg", category: "Chinese Non-Veg Starters", price: 99, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cnv9", name: "Chicken Fry", category: "Chinese Non-Veg Starters", price: 369, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },

  // Chinese Main Course
  { id: "cmc1", name: "Manchurian Rice", category: "Chinese Main Course", price: 369, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cmc2", name: "Paneer Chilli Rice", category: "Chinese Main Course", price: 399, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cmc3", name: "Mushroom Chilly Rice (Veg)", category: "Chinese Main Course", price: 369, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cmc4", name: "Schezwan Rice", category: "Chinese Main Course", price: 299, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cmc5", name: "Chilly Garlic Rice", category: "Chinese Main Course", price: 299, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cmc6", name: "Chicken Manchurian Rice", category: "Chinese Main Course", price: 399, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cmc7", name: "Chilly Chicken Rice", category: "Chinese Main Course", price: 399, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cmc8", name: "Mushroom Chilly Rice (Non-Veg)", category: "Chinese Main Course", price: 369, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cmc9", name: "Egg Fried Rice", category: "Chinese Main Course", price: 249, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "cmc10", name: "Chicken Chilli Garlic Rice", category: "Chinese Main Course", price: 379, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },

  // Indian Main Course (Veg)
  { id: "imc1", name: "Paneer Do Pyaza", category: "Indian Main Course (Veg)", price: 329, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "imc2", name: "Kadhai Paneer", category: "Indian Main Course (Veg)", price: 349, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "imc3", name: "Paneer Lababdar", category: "Indian Main Course (Veg)", price: 329, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "imc4", name: "Handi Paneer", category: "Indian Main Course (Veg)", price: 349, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "imc5", name: "Aloo Jeera", category: "Indian Main Course (Veg)", price: 199, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "imc6", name: "Mix Veg", category: "Indian Main Course (Veg)", price: 249, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "imc7", name: "Dal Tadka", category: "Indian Main Course (Veg)", price: 199, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "imc8", name: "Dal Fry", category: "Indian Main Course (Veg)", price: 229, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "imc9", name: "Mushroom Kadhai", category: "Indian Main Course (Veg)", price: 329, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "imc10", name: "Dal Makhani", category: "Indian Main Course (Veg)", price: 289, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },

  // Indian Main Course (Non-Veg)
  { id: "imcnv1", name: "Chicken Do Pyaza", category: "Indian Main Course (Non-Veg)", price: 389, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "imcnv2", name: "Kadhai Chicken", category: "Indian Main Course (Non-Veg)", price: 399, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "imcnv3", name: "Chicken Masala", category: "Indian Main Course (Non-Veg)", price: 349, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "imcnv4", name: "Chicken Handi", category: "Indian Main Course (Non-Veg)", price: 369, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "imcnv5", name: "Chicken Changezi", category: "Indian Main Course (Non-Veg)", price: 349, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },

  // Rice
  { id: "r1", name: "Steam Rice", category: "Rice", price: 169, image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "r2", name: "Zeera Rice", category: "Rice", price: 189, image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "r3", name: "Veg Biryani", category: "Rice", price: 269, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "r4", name: "Veg Pulao", category: "Rice", price: 229, image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "r5", name: "Chicken Biryani", category: "Rice", price: 379, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "r6", name: "Chicken Tikka Biryani", category: "Rice", price: 399, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "r7", name: "Chicken Pulao", category: "Rice", price: 329, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },

  // Breads
  { id: "b1", name: "Tawa Roti", category: "Breads", price: 29, image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "b2", name: "Butter Tawa Roti", category: "Breads", price: 39, image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "b3", name: "Lachcha Paratha", category: "Breads", price: 79, image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },

  // Italian
  { id: "it1", name: "White Sauce Pasta", category: "Italian", price: 349, image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "it2", name: "Red Sauce Pasta", category: "Italian", price: 369, image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "it3", name: "Pink Sauce Pasta", category: "Italian", price: 379, image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "it4", name: "Maggie", category: "Italian", price: 149, image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "it5", name: "Owl Pahadi Maggi", category: "Italian", price: 169, image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "it6", name: "Garlic Bread", category: "Italian", price: 199, image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "it7", name: "Cheese Garlic Bread", category: "Italian", price: 249, image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },

  // Pizza
  { id: "pz1", name: "Margherita Pizza", category: "Pizza", price: 299, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "pz2", name: "Farmhouse Pizza", category: "Pizza", price: 349, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "pz3", name: "Paneer Tikka Pizza", category: "Pizza", price: 349, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "pz4", name: "Chicken Tikka Pizza", category: "Pizza", price: 379, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "pz5", name: "Sweet Corn Pizza", category: "Pizza", price: 349, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "pz6", name: "Country Special Pizza", category: "Pizza", price: 329, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "pz7", name: "Chicken Margherita Pizza", category: "Pizza", price: 399, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "pz8", name: "Chicken Chilli Pizza", category: "Pizza", price: 399, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },

  // Salad
  { id: "sl1", name: "Green Salad", category: "Salad", price: 99, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "sl2", name: "Dahi Kachumber", category: "Salad", price: 169, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },

  // Desserts
  { id: "ds1", name: "Vanilla Ice Cream", category: "Desserts", price: 149, image: "https://images.unsplash.com/photo-1557925923-33b251d59828?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "ds2", name: "Chocolate Ice Cream", category: "Desserts", price: 169, image: "https://images.unsplash.com/photo-1557925923-33b251d59828?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },

  // Mojitos
  { id: "mj1", name: "Mint Mojito", category: "Mojitos", price: 199, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "mj2", name: "Blue Lagoon", category: "Mojitos", price: 199, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "mj3", name: "Watermelon Mojito", category: "Mojitos", price: 199, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "mj4", name: "Black Currant Mojito", category: "Mojitos", price: 199, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "mj5", name: "Virgin Mojito", category: "Mojitos", price: 199, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "mj6", name: "Bloody Marry", category: "Mojitos", price: 225, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "mj7", name: "Fresh Lime Soda", category: "Mojitos", price: 179, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },

  // Shakes
  { id: "sh1", name: "American Newzealand", category: "Shakes", price: 279, image: "https://images.unsplash.com/photo-1572490122747-3968b75bb876?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "sh2", name: "Blueberry Shake", category: "Shakes", price: 289, image: "https://images.unsplash.com/photo-1572490122747-3968b75bb876?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "sh3", name: "Strawberry Shake", category: "Shakes", price: 289, image: "https://images.unsplash.com/photo-1572490122747-3968b75bb876?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "sh4", name: "Oreo Shake", category: "Shakes", price: 299, image: "https://images.unsplash.com/photo-1572490122747-3968b75bb876?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "sh5", name: "KitKat Shake", category: "Shakes", price: 299, image: "https://images.unsplash.com/photo-1572490122747-3968b75bb876?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "sh6", name: "Chocolate Shake", category: "Shakes", price: 279, image: "https://images.unsplash.com/photo-1572490122747-3968b75bb876?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "sh7", name: "Mango Shake", category: "Shakes", price: 279, image: "https://images.unsplash.com/photo-1572490122747-3968b75bb876?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "sh8", name: "Cold Coffee", category: "Shakes", price: 299, image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },

  // Hot Beverages
  { id: "hb1", name: "Tea", category: "Hot Beverages", price: 69, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "hb2", name: "Coffee", category: "Hot Beverages", price: 179, image: "https://images.unsplash.com/photo-1510049079361-94be328109d7?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "hb3", name: "Black Coffee", category: "Hot Beverages", price: 99, image: "https://images.unsplash.com/photo-1510049079361-94be328109d7?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "hb4", name: "Hot Chocolate", category: "Hot Beverages", price: 249, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },

  // Energy Drinks
  { id: "ed1", name: "Red Bull", category: "Energy Drinks", price: 249, image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?q=80&w=200&auto=format&fit=crop", gst: 12, stock: 100 },
  { id: "ed2", name: "Hell", category: "Energy Drinks", price: 110, image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?q=80&w=200&auto=format&fit=crop", gst: 12, stock: 100 },

  // Herbal Blend
  { id: "hbld1", name: "Brain blend", category: "Herbal Blend", price: 500, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "hbld2", name: "Marbella blend", category: "Herbal Blend", price: 500, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "hbld3", name: "Love 66 blend", category: "Herbal Blend", price: 500, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "hbld4", name: "American blend", category: "Herbal Blend", price: 500, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "hbld5", name: "Zaffran blend", category: "Herbal Blend", price: 500, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "hbld6", name: "Maghai Paan blend", category: "Herbal Blend", price: 500, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "hbld7", name: "Commissioner blend", category: "Herbal Blend", price: 500, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
  { id: "hbld8", name: "Double Apple blend", category: "Herbal Blend", price: 500, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=200&auto=format&fit=crop", gst: 5, stock: 100 },
];

export const mockCategories = [
  "All", 
  "Chinese Veg Starters", 
  "Chinese Non-Veg Starters", 
  "Chinese Main Course", 
  "Indian Main Course (Veg)", 
  "Indian Main Course (Non-Veg)", 
  "Rice", 
  "Breads", 
  "Italian", 
  "Pizza", 
  "Salad", 
  "Desserts", 
  "Mojitos", 
  "Shakes", 
  "Hot Beverages", 
  "Energy Drinks",
  "Herbal Blend"
];
