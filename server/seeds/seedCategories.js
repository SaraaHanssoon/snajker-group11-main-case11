const { Category } = require('../models'); 

const seedCategories = async () => {
  try {
    await Category.bulkCreate([
      { name: 'Adidas' },
      { name: 'Nike' },
      { name: 'Puma' },
      { name: 'Converse' },
      { name: 'Vans' }
    ]);
    
    console.log('Kategorier har lagts till i databasen!');
    process.exit(); 
  } catch (error) {
    console.error('Fel vid seedning av kategorier:', error);
  }
};

seedCategories();
