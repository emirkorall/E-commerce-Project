import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaDesktop } from 'react-icons/fa';

// New Arrivals products - unique items only shown in New Arrivals section
export const newArrivalProducts = [
  {
    id: 101,
    name: 'NVIDIA RTX 5090 Founders Edition',
    price: 2499.99,
    image: 'https://m.media-amazon.com/images/I/71tV-csYdCL._AC_SX679_.jpg',
    category: 'Graphics Cards',
    rating: 5.0,
    reviews: 24,
    isNew: true,
    features: ['32GB GDDR7', 'DLSS 4.0', '8K Gaming', 'Ray Tracing']
  },
  {
    id: 102,
    name: 'AMD Ryzen 9 9950X',
    price: 849.99,
    image: 'https://m.media-amazon.com/images/I/61dukbEGziL.__AC_SX300_SY300_QL70_ML2_.jpg',
    category: 'Processors',
    rating: 5.0,
    reviews: 18,
    isNew: true,
    features: ['24 Cores/48 Threads', '6.2GHz Boost', 'Zen 5 Architecture', 'PCIe 5.0']
  },
  {
    id: 103,
    name: 'Corsair Vengeance RGB 128GB',
    price: 599.99,
    image: 'https://m.media-amazon.com/images/I/61X1NhtDoZL._AC_SX679_.jpg',
    category: 'Memory',
    rating: 4.9,
    reviews: 31,
    isNew: true,
    features: ['8800MHz DDR5', 'Next-Gen RGB', 'CL32', 'AI Overclocking']
  },
  {
    id: 104,
    name: 'ASUS ROG MAXIMUS Z890 HERO',
    price: 999.99,
    image: 'https://m.media-amazon.com/images/I/81Y14PidtEL.__AC_SX300_SY300_QL70_ML2_.jpg',
    category: 'Motherboards',
    rating: 4.9,
    reviews: 22,
    isNew: true,
    features: ['LGA 1851', 'DDR5-9600', 'PCIe 6.0', 'Thunderbolt 5']
  },
  {
    id: 105,
    name: 'Samsung Odyssey OLED G95SC',
    price: 2199.99,
    image: 'https://m.media-amazon.com/images/I/51J1OyLKUBL._AC_SX679_.jpg',
    category: 'Monitors',
    rating: 5.0,
    reviews: 27,
    features: ['49" OLED Ultrawide', '5K Resolution', '240Hz', 'Neural Quantum Processor']
  }
];

export const featuredProducts = [
  // Graphics Cards - 5 products
  {
    id: 1,
    name: 'ASUS TUF RTX5080',
    price: 1999.99,
    image: 'https://m.media-amazon.com/images/I/81z7uz0ejYL._AC_SX679_.jpg',
    category: 'Graphics Cards',
    rating: 5.0,
    reviews: 128,
    features: ['24GB GDDR6X', 'DLSS 3.0', '4K/8K Gaming', 'Ray Tracing']
  },
  {
    id: 2,
    name: 'AMD Radeon RX 7900 XTX',
    price: 999.99,
    image: 'https://m.media-amazon.com/images/I/81tvHo10s2L._AC_SX679_.jpg',
    category: 'Graphics Cards',
    rating: 4.8,
    reviews: 95,
   
    features: ['24GB GDDR6', '2.3 GHz Boost', 'Ray Tracing', 'FSR 3.0']
  },
  {
    id: 3,
    name: 'GIGABYTE GeForce RTX 4070 TI',
    price: 799.99,
    image: 'https://m.media-amazon.com/images/I/71vqnKem90L._AC_SX679_.jpg',
    category: 'Graphics Cards',
    rating: 4.7,
    reviews: 112,
    isNew: false,
    features: ['16GB GDDR6X', 'DLSS 3.0', '1440p Gaming', 'Ray Tracing']
  },
  {
    id: 4,
    name: 'AMD Radeon RX 6950 XT',
    price: 699.99,
    image: 'https://m.media-amazon.com/images/I/81U5H5c0jyL._AC_SL1500_.jpg',
    category: 'Graphics Cards',
    rating: 4.6,
    reviews: 87,
    discount: 15,
    features: ['16GB GDDR6', '2.1 GHz Boost', 'Ray Tracing', 'FSR 2.0']
  },
  {
    id: 5,
    name: 'MSI VGA GEFORCE RTX 4060',
    price: 349.99,
    image: 'https://m.media-amazon.com/images/I/61q0rsE3ezL._AC_SX679_.jpg',
    category: 'Graphics Cards',
    rating: 4.5,
    reviews: 156,
    features: ['8GB GDDR6', 'DLSS 3.0', '1080p Gaming', 'Ray Tracing']
  },
  
  // Processors - 5 products
  {
    id: 6,
    name: 'Intel Core i9-14900K',
    price: 589.99,
    image: 'https://m.media-amazon.com/images/I/718YcMNLsGL._AC_UF350,350_QL80_.jpg',
    category: 'Processors',
    rating: 4.9,
    reviews: 156,
    isNew: false,
    features: ['24 Cores/32 Threads', '6.0GHz Boost', 'DDR5-5600', 'PCIe 5.0']
  },
  {
    id: 7,
    name: 'AMD Ryzen 9 7950X3D',
    price: 699.99,
    image: 'https://m.media-amazon.com/images/I/5116zdA9uyL._AC_SX679_.jpg',
    category: 'Processors',
    rating: 4.9,
    reviews: 89,
    isNew: false,
    features: ['16 Cores/32 Threads', '3D V-Cache', '5.7GHz Boost', 'PCIe 5.0']
  },
  {
    id: 8,
    name: 'Intel Core i7-14700K',
    price: 419.99,
    image: 'https://m.media-amazon.com/images/I/51PvtXTGT0L.__AC_SX300_SY300_QL70_ML2_.jpg',
    category: 'Processors',
    rating: 4.8,
    reviews: 134,
    discount: 20,
    features: ['20 Cores/28 Threads', '5.6GHz Boost', 'DDR5 Support', 'Unlocked']
  },
  {
    id: 9,
    name: 'AMD Ryzen 7 7800X3D',
    price: 449.99,
    image: 'https://m.media-amazon.com/images/I/51HqC0rU9HL.__AC_SY300_SX300_QL70_ML2_.jpg',
    category: 'Processors',
    rating: 4.8,
    reviews: 97,
    features: ['8 Cores/16 Threads', '3D V-Cache', '5.0GHz Boost', 'AM5 Socket']
  },
  {
    id: 10,
    name: 'Intel Core i5-13600KF',
    price: 319.99,
    image: 'https://m.media-amazon.com/images/I/41yrCG-PIhL.__AC_SX300_SY300_QL70_ML2_.jpg',
    category: 'Processors',
    rating: 4.7,
    reviews: 172,
    features: ['14 Cores/20 Threads', '5.3GHz Boost', 'DDR5-5600', 'Unlocked']
  },
  
  // Memory - 5 products
  {
    id: 11,
    name: 'G.SKILL Trident Z5 RGB 64GB',
    price: 399.99,
    image: 'https://m.media-amazon.com/images/I/61bc6zvEIIL._AC_UF1000,1000_QL80_.jpg',
    category: 'Memory',
    rating: 4.8,
    reviews: 89,
    isNew: false,
    features: ['8000MHz DDR5', 'RGB Fusion', 'CL38', 'Extreme OC']
  },
  {
    id: 12,
    name: 'Corsair Dominator Platinum 32GB',
    price: 249.99,
    image: 'https://m.media-amazon.com/images/I/61S4dAUjJPL._AC_SX679_.jpg',
    category: 'Memory',
    rating: 4.7,
    reviews: 123,
    features: ['6600MHz DDR5', 'RGB Lighting', 'CL36', 'iCUE Compatible']
  },
  {
    id: 13,
    name: 'Kingston Fury Beast 32GB',
    price: 169.99,
    image: 'https://m.media-amazon.com/images/I/717cPftxQgL._AC_SX679_.jpg',
    category: 'Memory',
    rating: 4.6,
    reviews: 142,
    features: ['6000MHz DDR5', 'Heat Spreader', 'CL40', 'AMD EXPO']
  },
  {
    id: 14,
    name: 'Crucial Pro 32GB',
    price: 129.99,
    image: 'https://m.media-amazon.com/images/I/51EJt5geVEL.__AC_SX300_SY300_QL70_ML2_.jpg',
    category: 'Memory',
    rating: 4.5,
    reviews: 86,
    discount: 20,
    features: ['5600MHz DDR5', 'Micron Quality', 'CL46', 'Low Profile']
  },
  {
    id: 15,
    name: 'Lexar ARES RGB DDR5 RAM 32GB',
    price: 299.99,
    image: 'https://m.media-amazon.com/images/I/61iKr4heUaL._AC_SX679_.jpg',
    category: 'Memory',
    rating: 4.7,
    reviews: 67,
    features: ['7200MHz DDR5', 'RGB Lighting', 'CL34', 'XMP 3.0']
  },
  
  // Motherboards - 5 products
  {
    id: 16,
    name: 'Asus Prime Z790-P WiFi',
    price: 699.99,
    image: 'https://m.media-amazon.com/images/I/91N3ZIS0goL._AC_SX679_.jpg',
    category: 'Motherboards',
    rating: 4.9,
    reviews: 78,
    isNew: false,
    features: ['LGA 1700', 'DDR5-7800+', 'PCIe 5.0', '10G LAN']
  },
  {
    id: 17,
    name: 'ASUS ROG Maximus Z790 Hero',
    price: 629.99,
    image: 'https://m.media-amazon.com/images/I/81Y14PidtEL.__AC_SX300_SY300_QL70_ML2_.jpg',
    category: 'Motherboards',
    rating: 4.8,
    reviews: 92,
    features: ['LGA 1700', 'DDR5-7800', 'PCIe 5.0', 'Thunderbolt 4']
  },
  {
    id: 18,
    name: 'GIGABYTE X670E AORUS Master',
    price: 549.99,
    image: 'https://m.media-amazon.com/images/I/61jE7G3L-eL.__AC_SX300_SY300_QL70_ML2_.jpg',
    category: 'Motherboards',
    rating: 4.7,
    reviews: 65,
    features: ['AM5 Socket', 'DDR5-6666', 'PCIe 5.0', 'ESS SABRE DAC']
  },
  {
    id: 19,
    name: 'ASRock Z790 Steel Legend WiFi',
    price: 259.99,
    image: 'https://m.media-amazon.com/images/I/81Mu90g74XL._AC_SX679_.jpg',
    category: 'Motherboards',
    rating: 4.6,
    reviews: 103,
    discount: 15,
    features: ['AM5 Socket', 'DDR5-6000', 'PCIe 5.0', 'Wi-Fi 6E']
  },
  {
    id: 20,
    name: 'MSI B760 GAMING PLUS WIFI',
    price: 219.99,
    image: 'https://m.media-amazon.com/images/I/811+Jj0m5eL._AC_SX679_.jpg',
    category: 'Motherboards',
    rating: 4.5,
    reviews: 57,
    features: ['LGA 1700', 'Mini-ITX', 'DDR5-7000', 'PCIe 4.0']
  },
  
  // Monitors - 5 products
  {
    id: 21,
    name: 'ASUS ROG SWIFT PG27UCDM GAMING 4K',
    price: 2999.99,
    image: 'https://m.media-amazon.com/images/I/91kaC8irZbL._AC_SX679_.jpg',
    category: 'Monitors',
    rating: 4.9,
    reviews: 42,
    isNew: false,
    features: ['32" 4K Mini-LED', '240Hz', 'G-SYNC Ultimate', 'HDR 1400']
  },
  {
    id: 22,
    name: 'Samsung Odyssey G9',
    price: 1499.99,
    image: 'https://m.media-amazon.com/images/I/81gf+wgrcfS._AC_SL1500_.jpg',
    category: 'Monitors',
    rating: 4.8,
    reviews: 76,
    discount: 10,
    features: ['49" Super Ultrawide', '240Hz', '1ms Response', 'HDR 1000']
  },
  {
    id: 23,
    name: 'LG UltraGear 27GP950',
    price: 799.99,
    image: 'https://m.media-amazon.com/images/I/81dAe2wXIqL._AC_SL1500_.jpg',
    category: 'Monitors',
    rating: 4.7,
    reviews: 124,
    features: ['27" 4K Nano IPS', '160Hz', 'G-SYNC Compatible', 'HDR 600']
  },
  {
    id: 24,
    name: 'Dell Alienware AW3423DW',
    price: 1099.99,
    image: 'https://m.media-amazon.com/images/I/41QJ6Cy2oqL._AC_SX679_.jpg',
    category: 'Monitors',
    rating: 4.8,
    reviews: 88,
    features: ['34" QD-OLED', '175Hz', 'G-SYNC Ultimate', 'True Black 400']
  },
  {
    id: 25,
    name: 'Gigabyte MO34WQC',
    price: 649.99,
    image: 'https://m.media-amazon.com/images/I/71bo61VMsLL._AC_SX679_.jpg',
    category: 'Monitors',
    rating: 4.6,
    reviews: 97,
    features: ['32" 4K VA', '160Hz', 'FreeSync Premium', 'HDR 400']
  }
];

const ProductCard = ({ product, viewMode }) => {
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'graphics cards':
        return <FaDesktop className="w-4 h-4" />;
      case 'processors':
        return <FaDesktop className="w-4 h-4" />;
      case 'memory':
        return <FaDesktop className="w-4 h-4" />;
      case 'motherboards':
        return <FaDesktop className="w-4 h-4" />;
      case 'monitors':
        return <FaDesktop className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1 ${viewMode === 'list' ? 'flex' : ''}`}>
      <Link to={`/product/${product.id}`} className={viewMode === 'list' ? 'flex-1 flex' : 'block'}>
        <div className={`relative ${viewMode === 'list' ? 'w-64' : 'w-full'}`}>
          <img
            src={product.image}
            alt={product.name}
            className={`${viewMode === 'list' ? 'h-full object-cover' : 'w-full h-64 object-cover'}`}
          />
          {product.isNew && (
            <div className="absolute top-2 left-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </div>
          )}
          {product.discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{product.discount}%
            </div>
          )}
        </div>
        <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              {getCategoryIcon(product.category)}
              <span className="text-sm text-gray-500">{product.category}</span>
            </div>
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="text-sm text-gray-600">{product.rating}</span>
              <span className="text-sm text-gray-400 ml-1">({product.reviews})</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2 hover:text-purple-600 transition duration-300">{product.name}</h3>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-purple-600">${product.price}</p>
            {product.discount && (
              <p className="text-sm text-gray-400 line-through">${(product.price * (1 + product.discount/100)).toFixed(2)}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 