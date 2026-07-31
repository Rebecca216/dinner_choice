// 晚餐資料庫與隨機生成引擎

export const FOOD_DATABASE = [
  // 🍱 經典台味
  { name: '台式便當', emoji: '🍱', category: 'taiwanese', desc: '排骨便當、雞腿便當或控肉便當', tag: '🍱 經典台味便當' },
  { name: '牛肉麵', emoji: '🍜', category: 'taiwanese', desc: '紅燒或清燉牛肉麵，配酸菜切盤', tag: '🍜 濃郁湯麵' },
  { name: '滷肉飯', emoji: '🍚', category: 'taiwanese', desc: '香氣四溢地滷肉飯配滷蛋與筍絲', tag: '🍚 在地平價小吃' },
  { name: '火雞肉飯', emoji: '🍚', category: 'taiwanese', desc: '嘉義鮮嫩火雞肉飯加上紅蔥油', tag: '🍚 嘉義特產' },
  { name: '鹽酥雞 / 炸物', emoji: '🍗', category: 'taiwanese', desc: '鹹酥雞、九層塔、甜不辣、四季豆', tag: '🍗 邪惡宵夜首選' },
  { name: '小籠包 / 湯包', emoji: '🥟', category: 'taiwanese', desc: '皮薄汁多的鮮肉小籠湯包', tag: '🥟 經典點心' },
  { name: '麵線 / 甜不辣', emoji: '🥣', category: 'taiwanese', desc: '大腸蚵仔麵線加辣，搭配醬香甜不辣', tag: '🥣 風味小吃' },
  { name: '水餃 / 煎餃', emoji: '🥟', category: 'taiwanese', desc: '高麗菜或韭菜鮮肉水餃配酸辣湯', tag: '🥟 快閃飽足美味' },
  { name: '炒飯 / 炒麵', emoji: '🍲', category: 'taiwanese', desc: '粒粒分明的肉絲蛋炒飯或沙茶牛肉炒麵', tag: '🍲 大火快炒' },
  { name: '台式熱炒', emoji: '🍻', category: 'taiwanese', desc: '蔥爆牛肉、三杯雞、鳳梨蝦球', tag: '🍻 聚餐首選' },

  // 🍜 日韓料理
  { name: '日式拉麵', emoji: '🍜', category: 'japanese', desc: '濃郁豚骨、醬油或味噌拉麵配叉燒', tag: '🍜 道地日式' },
  { name: '壽司 / 刺身', emoji: '🍣', category: 'japanese', desc: '鮭魚壽司、握壽司或海鮮丼飯', tag: '🍣 清爽海味' },
  { name: '日式定食', emoji: '🍱', category: 'japanese', desc: '炸豬排定食、薑汁燒肉或烤鯖魚', tag: '🍱 豐盛定食' },
  { name: '日式咖哩飯', emoji: '🍛', category: 'japanese', desc: '濃郁甘口或辛口咖哩蛋包飯', tag: '🍛 香濃咖哩' },
  { name: '章魚燒 / 廣島燒', emoji: '🐙', category: 'japanese', desc: '柴魚片跳動的道地日式煎餅', tag: '🐙 關西特色' },
  { name: '韓式炸雞', emoji: '🍗', category: 'japanese', desc: '蜂蜜洋釀或半半炸雞配醃蘿蔔', tag: '🍗 韓流美味' },
  { name: '韓式石鍋拌飯', emoji: '🍲', category: 'japanese', desc: '滋滋作響的石鍋飯配特製辣醬', tag: '🍲 韓式料理' },
  { name: '韓式豆腐鍋 / 部隊鍋', emoji: '🥘', category: 'japanese', desc: '滾燙香辣的嫩豆腐鍋與起司泡麵', tag: '🥘 暖心鍋物' },

  // 🍕 歐美西餐
  { name: '義大利麵', emoji: '🍝', category: 'western', desc: '粉紅醬海鮮、奶油培根或青醬雞肉義麵', tag: '🍝 異國西餐' },
  { name: '手工美式披薩', emoji: '🍕', category: 'western', desc: '臘腸起司披薩或夏威夷披薩', tag: '🍕 聚會派對' },
  { name: '美式手作漢堡', emoji: '🍔', category: 'western', desc: '雙層起司牛肉堡配香酥薯條', tag: '🍔 美式饗宴' },
  { name: '排骨 / 牛排', emoji: '🥩', category: 'western', desc: '香煎肋眼牛排、鐵板牛排配雙醬', tag: '🥩 飽足肉食' },
  { name: '燉飯 / 濃湯', emoji: '🍲', category: 'western', desc: '黑松露野菇燉飯配南瓜濃湯', tag: '🍲 歐式風味' },
  { name: '墨西哥捲餅 / 塔可', emoji: '🌮', category: 'western', desc: '莎莎醬雞肉塔可或牛肉 Burrito', tag: '🌮 異國街頭清爽美食' },

  // 🍲 暖心火鍋 & 燒肉
  { name: '麻辣火鍋', emoji: '🥘', category: 'hotpot', desc: '鴨血豆腐吃到飽、霜降牛與老油條', tag: '🥘 豪華澎湃鍋物' },
  { name: '個人小火鍋', emoji: '🍲', category: 'hotpot', desc: '臭臭鍋、牛奶鍋、沙茶鍋或藥膳鍋', tag: '🍲 獨享小火鍋' },
  { name: '日式燒肉', emoji: '🥩', category: 'hotpot', desc: '牛五花、豬梅花、鹽蔥牛舌雙人組合', tag: '🥩 炭火香烤' },
  { name: '串燒居酒屋', emoji: '🍢', category: 'hotpot', desc: '醬燒雞肉串、培根干貝與生啤酒', tag: '🍢 宵夜微醺' },
  { name: '酸菜魚 / 重慶烤魚', emoji: '🐟', category: 'hotpot', desc: '酸爽麻辣、香氣四溢的酸菜魚', tag: '🐟 酸辣開胃' },

  // 🥗 健康輕食
  { name: '舒肥雞肉溫沙拉', emoji: '🥗', category: 'healthy', desc: '低脂舒肥雞胸肉、彩椒、堅果與胡麻醬', tag: '🥗 輕食減脂' },
  { name: '健康波奇碗 (Poke)', emoji: '🥑', category: 'healthy', desc: '夏威夷彩虹波奇碗配鮮蝦與鮭魚', tag: '🥑 清爽無負擔' },
  { name: '水煮低卡便當', emoji: '🍱', category: 'healthy', desc: '紫米飯、水煮餐配清蒸鱸魚或牛肉片', tag: '🍱 均衡營養' },
  { name: '全麥三明治 / 潛艇堡', emoji: '🥪', category: 'healthy', desc: '雙倍蔬菜燻雞全麥三明治', tag: '🥪 輕食早晚餐' },

  // 🌙 夜市小吃 & 宵夜
  { name: '滷味 / 麻辣燙', emoji: '🍢', category: 'nightmarket', desc: '自選豐富蔬菜、王子麵與火鍋料', tag: '🍢 夜市經典' },
  { name: '蚵仔煎 / 生蚵', emoji: '🦪', category: 'nightmarket', desc: '酥皮蚵仔煎配特調甜辣醬', tag: '🦪 傳統小吃' },
  { name: '大腸包小腸', emoji: '🌭', category: 'nightmarket', desc: '烤香腸配糯米腸與蒜片酸菜', tag: '🌭 地道小吃' },
  { name: '地瓜球 / 雙胞胎', emoji: '🍠', category: 'nightmarket', desc: '外酥內Q的空心地瓜球', tag: '🍠 解饞點心' },
  { name: '東山鴨頭 / 烤肉', emoji: '🍗', category: 'nightmarket', desc: '甜辣入味的東山鴨頭與甜不辣', tag: '🍗 涮嘴宵夜' },
  { name: '豆花 / 剉冰', emoji: '🍧', category: 'nightmarket', desc: '芋圓芋頭手工豆花或黑糖剉冰', tag: '🍧 甜品冰品' },

  // 🧋 台灣知名手搖飲料店
  { name: '50嵐', emoji: '🧋', category: 'drinks', desc: '1號四季春珍波椰、四季春青茶或波霸奶茶', tag: '🧋 經典手搖店' },
  { name: '可不可熟成紅茶', emoji: '🥤', category: 'drinks', desc: '熟成紅茶、胭脂紅茶或熟成歐蕾', tag: '🥤 嚴選紅茶' },
  { name: '麻古茶坊', emoji: '🥭', category: 'drinks', desc: '楊枝甘露、芝芝葡萄或高山金萱茶', tag: '🥭 鮮果特調' },
  { name: '得正 OOLONG TEA', emoji: '🍵', category: 'drinks', desc: '檸檬烏龍、芝士奶蓋烏龍或焙烏龍奶茶', tag: '🍵 烏龍專賣' },
  { name: '五桐號', emoji: '🧋', category: 'drinks', desc: '杏仁凍五桐茶、綠茶凍五桐茶或黑糖粉粿', tag: '🧋 手工凍飲' },
  { name: '龜記茗品', emoji: '🍋', category: 'drinks', desc: '紅柚翡翠、蘋果紅宣或三十三紅茶', tag: '🍋 鮮果果茶' },
  { name: '迷客夏 Milksha', emoji: '🥛', category: 'drinks', desc: '大甲芋頭鮮奶、珍珠鮮奶綠或伯爵鮮奶茶', tag: '🥛 濃郁小農鮮奶' },
  { name: '清心福全', emoji: '🍵', category: 'drinks', desc: '烏龍綠茶、優多綠茶或珍珠奶茶', tag: '🍵 人氣特調' },
  { name: '大苑子', emoji: '🍊', category: 'drinks', desc: '愛文芒果冰沙、芭樂檸檬或鮮搾柳橙綠', tag: '🍊 鮮果第一品牌' },
  { name: '珍煮丹', emoji: '🧋', category: 'drinks', desc: '黑糖珍珠鮮奶、泰泰鮮奶茶或黑糖檸檬', tag: '🧋 濃郁黑糖專賣' },
  { name: '再睡5分鐘', emoji: '🧋', category: 'drinks', desc: '棉被午糯綠、日安紅歐蕾或滴妹特調', tag: '🧋 網紅療癒手搖' },
  { name: 'CoCo 都可', emoji: '🥤', category: 'drinks', desc: '百香雙響砲、奶茶三兄弟或檸檬冬瓜', tag: '🥤 經典萬能特調' }
];

export const PRESET_THEMES = [
  { id: 'random', name: '🎲 驚喜全隨機', icon: '🎲' },
  { id: 'taiwanese', name: '🍱 經典台味', icon: '🍱' },
  { id: 'japanese', name: '🍜 日韓精選', icon: '🍜' },
  { id: 'western', name: '🍕 歐美西餐', icon: '🍕' },
  { id: 'hotpot', name: '🍲 火鍋燒肉', icon: '🍲' },
  { id: 'healthy', name: '🥗 輕食健康', icon: '🥗' },
  { id: 'nightmarket', name: '🌙 夜市宵夜', icon: '🌙' },
  { id: 'drinks', name: '🧋 手搖飲料店', icon: '🧋' }
];

// Vibrant neon color palettes for wheel sectors
export const WHEEL_COLORS = [
  '#FF3B30', '#FF9500', '#FFCC00', '#34C759', 
  '#00C7BE', '#30B0C7', '#32ADE6', '#007AFF', 
  '#5856D6', '#AF52DE', '#FF2D55', '#E040FB'
];

/**
 * 隨機生成指定數量且不重複的選項
 */
export function generateRandomOptions(category = 'random', count = 8) {
  let selected = [];

  if (category === 'random') {
    // 「驚喜全隨機」模式：自動混搭 1~2 款飲料 + 其他美饌
    const drinksPool = FOOD_DATABASE.filter(item => item.category === 'drinks');
    const foodPool = FOOD_DATABASE.filter(item => item.category !== 'drinks');

    const drinksCount = Math.min(drinksPool.length, 2);
    const shuffledDrinks = [...drinksPool].sort(() => Math.random() - 0.5).slice(0, drinksCount);

    const restCount = count - drinksCount;
    const shuffledFood = [...foodPool].sort(() => Math.random() - 0.5).slice(0, restCount);

    selected = [...shuffledDrinks, ...shuffledFood].sort(() => Math.random() - 0.5);
  } else {
    let pool = FOOD_DATABASE.filter(item => item.category === category);
    if (pool.length < count) {
      const rest = FOOD_DATABASE.filter(item => item.category !== category);
      pool = [...pool, ...rest];
    }
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    selected = shuffled.slice(0, count);
  }

  return selected.map((item, index) => ({
    id: `opt_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 4)}`,
    name: item.name,
    emoji: item.emoji,
    desc: item.desc,
    tag: item.tag || '🍽️ 美食推薦',
    weight: 1,
    enabled: true,
    color: WHEEL_COLORS[index % WHEEL_COLORS.length]
  }));
}
