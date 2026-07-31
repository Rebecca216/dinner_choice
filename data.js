// 晚餐資料庫與隨機生成引擎

export const FOOD_DATABASE = [
  // 🍱 經典台味
  { name: '台式便當', emoji: '🍱', category: 'taiwanese', desc: '排骨便當、雞腿便當或控肉便當', calories: '650-850 kcal' },
  { name: '牛肉麵', emoji: '🍜', category: 'taiwanese', desc: '紅燒或清燉牛肉麵，配酸菜切盤', calories: '600-750 kcal' },
  { name: '滷肉飯', emoji: '🍚', category: 'taiwanese', desc: '香氣四溢地滷肉飯配滷蛋與筍絲', calories: '450-600 kcal' },
  { name: '火雞肉飯', emoji: '🍚', category: 'taiwanese', desc: '嘉義鮮嫩火雞肉飯加上紅蔥油', calories: '400-550 kcal' },
  { name: '鹽酥雞 / 炸物', emoji: '🍗', category: 'taiwanese', desc: '鹹酥雞、九層塔、甜不辣、四季豆', calories: '700-950 kcal' },
  { name: '小籠包 / 湯包', emoji: '🥟', category: 'taiwanese', desc: '皮薄汁多的鮮肉小籠湯包', calories: '500-650 kcal' },
  { name: '麵線 / 甜不辣', emoji: '🥣', category: 'taiwanese', desc: '大腸蚵仔麵線加辣，搭配醬香甜不辣', calories: '450-600 kcal' },
  { name: '水餃 / 煎餃', emoji: '🥟', category: 'taiwanese', desc: '高麗菜或韭菜鮮肉水餃配酸辣湯', calories: '500-700 kcal' },
  { name: '炒飯 / 炒麵', emoji: '🍲', category: 'taiwanese', desc: '粒粒分明的肉絲蛋炒飯或沙茶牛肉炒麵', calories: '600-800 kcal' },
  { name: '台式熱炒', emoji: '🍻', category: 'taiwanese', desc: '蔥爆牛肉、三杯雞、鳳梨蝦球', calories: '700-900 kcal' },

  // 🍜 日韓料理
  { name: '日式拉麵', emoji: '🍜', category: 'japanese', desc: '濃郁豚骨、醬油或味噌拉麵配叉燒', calories: '600-850 kcal' },
  { name: '壽司 / 刺身', emoji: '🍣', category: 'japanese', desc: '鮭魚壽司、握壽司或海鮮丼飯', calories: '450-650 kcal' },
  { name: '日式定食', emoji: '🍱', category: 'japanese', desc: '炸豬排定食、薑汁燒肉或烤鯖魚', calories: '650-800 kcal' },
  { name: '日式咖哩飯', emoji: '🍛', category: 'japanese', desc: '濃郁甘口或辛口咖哩蛋包飯', calories: '650-850 kcal' },
  { name: '章魚燒 / 廣島燒', emoji: '🐙', category: 'japanese', desc: '柴魚片跳動的道地日式煎餅', calories: '450-600 kcal' },
  { name: '韓式炸雞', emoji: '🍗', category: 'japanese', desc: '蜂蜜洋釀或半半炸雞配醃蘿蔔', calories: '750-1000 kcal' },
  { name: '韓式石鍋拌飯', emoji: '🍲', category: 'japanese', desc: '滋滋作響的石鍋飯配特製辣醬', calories: '550-700 kcal' },
  { name: '韓式豆腐鍋 / 部隊鍋', emoji: '🥘', category: 'japanese', desc: '滾燙香辣的嫩豆腐鍋與起司泡麵', calories: '500-750 kcal' },

  // 🍕 歐美西餐
  { name: '義大利麵', emoji: '🍝', category: 'western', desc: '粉紅醬海鮮、奶油培根或青醬雞肉義麵', calories: '550-750 kcal' },
  { name: '手工美式披薩', emoji: '🍕', category: 'western', desc: '臘腸起司披薩或夏威夷披薩', calories: '700-950 kcal' },
  { name: '美式手作漢堡', emoji: '🍔', category: 'western', desc: '雙層起司牛肉堡配香酥薯條', calories: '750-1000 kcal' },
  { name: '排骨 / 牛排', emoji: '🥩', category: 'western', desc: '香煎肋眼牛排、鐵板牛排配雙醬', calories: '650-900 kcal' },
  { name: '燉飯 / 濃湯', emoji: '🍲', category: 'western', desc: '黑松露野菇燉飯配南瓜濃湯', calories: '550-700 kcal' },
  { name: '墨西哥捲餅 / 塔可', emoji: '🌮', category: 'western', desc: '莎莎醬雞肉塔可或牛肉 Burrito', calories: '450-650 kcal' },

  // 🍲 暖心火鍋 & 燒肉
  { name: '麻辣火鍋', emoji: '🥘', category: 'hotpot', desc: '鴨血豆腐吃到飽、霜降牛與老油條', calories: '800-1100 kcal' },
  { name: '個人小火鍋', emoji: '🍲', category: 'hotpot', desc: '臭臭鍋、牛奶鍋、沙茶鍋或藥膳鍋', calories: '600-800 kcal' },
  { name: '日式燒肉', emoji: '🥩', category: 'hotpot', desc: '牛五花、豬梅花、鹽蔥牛舌雙人組合', calories: '750-1000 kcal' },
  { name: '串燒居酒屋', emoji: '🍢', category: 'hotpot', desc: '醬燒雞肉串、培根干貝與生啤酒', calories: '600-850 kcal' },
  { name: '酸菜魚 / 重慶烤魚', emoji: '🐟', category: 'hotpot', desc: '酸爽麻辣、香氣四溢的酸菜魚', calories: '650-850 kcal' },

  // 🥗 健康輕食
  { name: '舒肥雞肉溫沙拉', emoji: '🥗', category: 'healthy', desc: '低脂舒肥雞胸肉、彩椒、堅果與胡麻醬', calories: '350-480 kcal' },
  { name: '健康波奇碗 (Poke)', emoji: '🥑', category: 'healthy', desc: '夏威夷彩虹波奇碗配鮮蝦與鮭魚', calories: '400-550 kcal' },
  { name: '水煮低卡便當', emoji: '🍱', category: 'healthy', desc: '紫米飯、水煮餐配清蒸鱸魚或牛肉片', calories: '400-500 kcal' },
  { name: '全麥三明治 / 潛艇堡', emoji: '🥪', category: 'healthy', desc: '雙倍蔬菜燻雞全麥三明治', calories: '350-500 kcal' },

  // 🌙 夜市小吃 & 宵夜
  { name: '滷味 / 麻辣燙', emoji: '🍢', category: 'nightmarket', desc: '自選豐富蔬菜、王子麵與火鍋料', calories: '450-700 kcal' },
  { name: '蚵仔煎 / 生蚵', emoji: '🦪', category: 'nightmarket', desc: '酥皮蚵仔煎配特調甜辣醬', calories: '400-550 kcal' },
  { name: '大腸包小腸', emoji: '🌭', category: 'nightmarket', desc: '烤香腸配糯米腸與蒜片酸菜', calories: '450-600 kcal' },
  { name: '地瓜球 / 雙胞胎', emoji: '🍠', category: 'nightmarket', desc: '外酥內Q的空心地瓜球', calories: '350-500 kcal' },
  { name: '東山鴨頭 / 烤肉', emoji: '🍗', category: 'nightmarket', desc: '甜辣入味的東山鴨頭與甜不辣', calories: '550-750 kcal' },
  { name: '豆花 / 剉冰', emoji: '🍧', category: 'nightmarket', desc: '芋圓芋頭手工豆花或黑糖剉冰', calories: '300-450 kcal' }
];

export const PRESET_THEMES = [
  { id: 'random', name: '🎲 驚喜全隨機', icon: '🎲' },
  { id: 'taiwanese', name: '🍱 經典台味', icon: '🍱' },
  { id: 'japanese', name: '🍜 日韓精選', icon: '🍜' },
  { id: 'western', name: '🍕 歐美西餐', icon: '🍕' },
  { id: 'hotpot', name: '🍲 火鍋燒肉', icon: '🍲' },
  { id: 'healthy', name: '🥗 輕食健康', icon: '🥗' },
  { id: 'nightmarket', name: '🌙 夜市宵夜', icon: '🌙' }
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
  let pool = FOOD_DATABASE;
  if (category !== 'random') {
    pool = FOOD_DATABASE.filter(item => item.category === category);
    // 如果該分類不足，用全庫補充
    if (pool.length < count) {
      const rest = FOOD_DATABASE.filter(item => item.category !== category);
      pool = [...pool, ...rest];
    }
  }

  // Shuffle pool using Fisher-Yates
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const selected = shuffled.slice(0, count);

  return selected.map((item, index) => ({
    id: `opt_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 4)}`,
    name: item.name,
    emoji: item.emoji,
    desc: item.desc,
    calories: item.calories,
    weight: 1,
    enabled: true,
    color: WHEEL_COLORS[index % WHEEL_COLORS.length]
  }));
}
