const { Product, Category } = require('../models'); 

const seedProducts = async () => {
  try {
    const categories = await Category.findAll();
    const categoryMap = categories.reduce((acc, category) => {
      acc[category.name] = category.category_id;
      return acc;
    }, {});

    await Product.bulkCreate([
      { name: 'Adidas - Klassiska sneakers', description: 'Adidas erbjuder ett par tidlösa sneakers som är perfekta för både sport och vardagsstil.', price: 1200, stock: 10, fk_categoryid: categoryMap['Adidas'], imageUrl: '/image/product1.jpeg' },
      { name: 'Adidas - Ikoniska vita sneakers', description: 'Adidas ikoniska vita sneakers har en enkel och stilren design som passar perfekt till casual outfits.', price: 1100, stock: 15, fk_categoryid: categoryMap['Adidas'], imageUrl: '/image/product2.jpeg' },
      { name: 'Adidas - Löparskor med Boost-dämpning', description: 'Adidas löparskor med Boost-dämpning ger maximal komfort och energiåtergivning vid varje steg.', price: 1600, stock: 8, fk_categoryid: categoryMap['Adidas'], imageUrl: '/image/product3.jpeg' },

      { name: 'Nike - Populära sneakers', description: 'Nike erbjuder en av sina mest populära och stiliga sneakerdesigns, en favorit inom streetwear.', price: 1300, stock: 12, fk_categoryid: categoryMap['Nike'], imageUrl: '/image/product4.jpeg' },
      { name: 'Nike - Sneakers med synlig dämpning', description: 'Nike sneakers erbjuder en kombination av komfort och synlig luftdämpning, perfekt för både sport och vardag.', price: 1400, stock: 10, fk_categoryid: categoryMap['Nike'], imageUrl: '/image/product5.jpeg' },
      { name: 'Nike - Klassiska basketskor', description: 'Nike klassiska basketskor har en slitstark konstruktion som gör dem till ett bra val både för sport och avslappnade vardagsbruk.', price: 1200, stock: 5, fk_categoryid: categoryMap['Nike'], imageUrl: '/image/product6.jpeg' },

      { name: 'Puma - Retro sneakers', description: 'Puma erbjuder retro sneakers med en tidlös design som passar perfekt för streetwear och casual stil.', price: 900, stock: 20, fk_categoryid: categoryMap['Puma'], imageUrl: '/image/product7.jpeg' },
      { name: 'Puma - Futuristiska sneakers', description: 'Puma sneakers med futuristisk design och modern passform som gör dem till ett utmärkt val för trendmedvetna.', price: 1200, stock: 10, fk_categoryid: categoryMap['Puma'], imageUrl: '/image/product8.jpeg' },
      { name: 'Puma - Lifestyle sneakers', description: 'Puma lifestyle sneakers i en avslappnad och elegant stil, perfekta för daglig användning.', price: 1000, stock: 15, fk_categoryid: categoryMap['Puma'], imageUrl: '/image/product9.jpeg' },

      { name: 'Converse - Klassiska skor', description: 'Converse erbjuder ett par klassiska skor som har varit en stilren favorit i många år.', price: 800, stock: 30, fk_categoryid: categoryMap['Converse'], imageUrl: '/image/product10.jpeg' },
      { name: 'Converse - Skateinspirerade sneakers', description: 'Converse sneakers med skateinspirerad design, slitstarka och perfekta för både sport och vardag.', price: 850, stock: 18, fk_categoryid: categoryMap['Converse'], imageUrl: '/image/product11.jpeg' },
      { name: 'Converse - Chunky sneakers', description: 'Converse chunky sneakers med modern design och högre sula, för den som söker komfort och stil.', price: 1200, stock: 7, fk_categoryid: categoryMap['Converse'], imageUrl: '/image/product12.jpeg' },

      { name: 'Vans - Ikoniska sneakers', description: 'Vans sneakers är kända för sin hållbarhet och enkla design, en favorit inom skate- och streetwearkulturen.', price: 950, stock: 25, fk_categoryid: categoryMap['Vans'], imageUrl: '/image/product13.jpeg' },
      { name: 'Vans - Höga sneakers', description: 'Vans höga sneakers ger både stil och komfort för en aktiv livsstil, ett perfekt val för både skate och vardag.', price: 1000, stock: 20, fk_categoryid: categoryMap['Vans'], imageUrl: '/image/product14.jpeg' },
      { name: 'Vans - Originalmodellen', description: 'Vans originalmodellen är kända för sin lägre siluett och slitstyrka, ett stilfullt val för varje dag.', price: 900, stock: 22, fk_categoryid: categoryMap['Vans'], imageUrl: '/image/product15.jpeg' },
    ]);

    console.log('Produkter har lagts till i databasen!');
    process.exit(); 
  } catch (error) {
    console.error('Fel vid seedning av produkter:', error);
  }
};

seedProducts();
