const ALL_RECIPES = Object.freeze([
    { id: 1, name: 'ผัดไทยกุ้งสด', category: 'main', complexity: 'ปานกลาง', img: 'https://via.placeholder.com/400x200?text=Pad+Thai', description: 'อาหารจานหลักยอดนิยม รสชาติกลมกล่อม' },
    { id: 2, name: 'ช็อกโกแลตลาวา', category: 'dessert', complexity: 'ง่าย', img: 'https://via.placeholder.com/400x200?text=Chocolate+Lava', description: 'ของหวานเยิ้ม ๆ ที่ลงตัว' },
    { id: 3, name: 'กาแฟเย็น', category: 'drink', complexity: 'ง่าย', img: 'https://via.placeholder.com/400x200?text=Iced+Coffee', description: 'เครื่องดื่มดับกระหาย' },
    { id: 4, name: 'แกงเขียวหวานไก่', category: 'main', complexity: 'ยาก', img: 'https://via.placeholder.com/400x200?text=Green+Curry', description: 'แกงกะทิหอมเครื่องแกง' },
    { id: 5, name: 'บราวนี่', category: 'dessert', complexity: 'ปานกลาง', img: 'https://via.placeholder.com/400x200?text=Brownie', description: 'เข้มข้น หวานมัน' },
]);

const filterByCategory = (category, recipes) => 
    (category === 'all')
        ? recipes
        : recipes.filter(recipe => recipe.category === category);

const searchByName = (searchTerm, recipes) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return recipes;
    return recipes.filter(recipe => recipe.name.toLowerCase().includes(term));
};

const createRecipeCard = (recipe) => {
    return `
        <div class="col">
            <div class="card h-100 recipe-card shadow-sm">
                <img src="${recipe.img}" class="card-img-top" alt="${recipe.name}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.name}</h5>
                    <span class="badge bg-secondary">${recipe.category.toUpperCase()}</span>
                    <span class="badge bg-info text-dark">${recipe.complexity}</span>
                    <p class="card-text mt-2">${recipe.description}</p>
                </div>
            </div>
        </div>
    `;
};

const renderRecipes = (recipes) => {
    const recipeListElement = document.getElementById('recipe-list');
    
    const htmlCards = recipes.map(createRecipeCard).join(''); 
    
    recipeListElement.innerHTML = htmlCards || '<p class="text-center w-100">ไม่พบเมนูอาหารที่คุณต้องการ 😔</p>';
};

const updateRecipeDisplay = () => {
    const searchTerm = document.getElementById('search-input').value;
    const category = document.getElementById('category-filter').value;

    const filteredByCategory = filterByCategory(category, ALL_RECIPES);
    const finalRecipes = searchByName(searchTerm, filteredByCategory);

    renderRecipes(finalRecipes);
};

document.addEventListener('DOMContentLoaded', () => {
    renderRecipes(ALL_RECIPES);

    document.getElementById('search-input').addEventListener('input', updateRecipeDisplay);
    document.getElementById('category-filter').addEventListener('change', updateRecipeDisplay);
});