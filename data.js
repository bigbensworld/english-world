// 英语世界 - 场景与词汇数据
// 场景即游戏：点开场景自由探索，点物品学词，玩小游戏赚金币

const SCENES = [
  {
    id: "cafe",
    name: "咖啡店",
    nameEn: "Coffee Shop",
    emoji: "☕",
    iconId: "coffee",
    cover: "☕🥐🍰",
    theme: "cafe",
    accent: "#9a5f36",
    accentSoft: "#f6e4d4",
    deco: "🎶",
    deco2: "🫧",
    unlockCost: 0,
    game: {
      type: "order",
      name: "顾客点单",
      desc: "听顾客用英文点单，把正确的餐点端给他！",
    },
    items: [
      { id: "coffee",   en: "coffee",       zh: "咖啡",   phon: "/ˈkɒfi/",   emoji: "☕", sent: "I'd like a cup of coffee." },
      { id: "latte",    en: "latte",        zh: "拿铁",   phon: "/ˈlɑːteɪ/", emoji: "🥛", sent: "A latte with milk, please." },
      { id: "tea",      en: "tea",          zh: "茶",     phon: "/tiː/",     emoji: "🍵", sent: "Green tea is healthy." },
      { id: "juice",    en: "orange juice", zh: "橙汁",   phon: "/ˈɒrɪndʒ dʒuːs/", emoji: "🧃", sent: "Fresh orange juice, please." },
      { id: "cake",     en: "cake",         zh: "蛋糕",   phon: "/keɪk/",    emoji: "🍰", sent: "This cake is so sweet." },
      { id: "croissant",en: "croissant",    zh: "牛角包", phon: "/ˈkrwæsɒ̃/",emoji: "🥐", sent: "The croissant is crispy." },
      { id: "cookie",   en: "cookie",       zh: "曲奇",   phon: "/ˈkʊki/",   emoji: "🍪", sent: "I love chocolate cookies." },
      { id: "muffin",   en: "muffin",       zh: "玛芬",   phon: "/ˈmʌfɪn/",  emoji: "🧁", sent: "A blueberry muffin, please." },
      { id: "sandwich", en: "sandwich",     zh: "三明治", phon: "/ˈsænwɪdʒ/",emoji: "🥪", sent: "A cheese sandwich for lunch." },
      { id: "cup",      en: "cup",          zh: "杯子",   phon: "/kʌp/",     emoji: "🍵", sent: "My cup is empty." },
      { id: "menu",     en: "menu",         zh: "菜单",   phon: "/ˈmenjuː/", emoji: "📋", sent: "Can I see the menu?" },
      { id: "barista",  en: "barista",      zh: "咖啡师", phon: "/bəˈriːstə/",emoji: "🧑‍🍳", sent: "The barista makes great coffee." },
    ],
  },
  {
    id: "market",
    name: "超市",
    nameEn: "Supermarket",
    emoji: "🛒",
    iconId: "cart",
    cover: "🛒🍎🥦",
    theme: "market",
    accent: "#4d8b3a",
    accentSoft: "#e4f2dc",
    deco: "🍃",
    deco2: "🦋",
    unlockCost: 30,
    game: {
      type: "shopping",
      name: "购物清单",
      desc: "照英文购物清单把货找齐！",
    },
    items: [
      { id: "apple",  en: "apple",  zh: "苹果",   phon: "/ˈæpl/",  emoji: "🍎", sent: "An apple a day." },
      { id: "banana", en: "banana", zh: "香蕉",   phon: "/bəˈnɑːnə/", emoji: "🍌", sent: "Monkeys love bananas." },
      { id: "grape",  en: "grapes", zh: "葡萄",   phon: "/ɡreɪps/", emoji: "🍇", sent: "These grapes are sweet." },
      { id: "milk",   en: "milk",   zh: "牛奶",   phon: "/mɪlk/",  emoji: "🥛", sent: "I drink milk every morning." },
      { id: "bread",  en: "bread",  zh: "面包",   phon: "/bred/",  emoji: "🍞", sent: "Fresh bread smells good." },
      { id: "egg",    en: "eggs",   zh: "鸡蛋",   phon: "/eɡz/",   emoji: "🥚", sent: "I want two eggs." },
      { id: "fish",   en: "fish",   zh: "鱼",     phon: "/fɪʃ/",   emoji: "🐟", sent: "Fish is good for you." },
      { id: "cheese", en: "cheese", zh: "奶酪",   phon: "/tʃiːz/", emoji: "🧀", sent: "Cheese on bread, yummy." },
      { id: "carrot", en: "carrot", zh: "胡萝卜", phon: "/ˈkærət/", emoji: "🥕", sent: "Rabbits eat carrots." },
      { id: "broccoli",en: "broccoli", zh: "西兰花", phon: "/ˈbrɒkəli/", emoji: "🥦", sent: "Eat your broccoli!" },
      { id: "tomato", en: "tomato", zh: "番茄",   phon: "/təˈmɑːtəʊ/", emoji: "🍅", sent: "Is it a fruit or a vegetable?" },
      { id: "cart",   en: "cart",   zh: "购物车", phon: "/kɑːt/",  emoji: "🛒", sent: "Push the cart down the aisle." },
    ],
  },
];

// 点单挑战的顾客台词
const ORDER_LINES = [
  "Hi! Can I get a {item}, please?",
  "I'd like a {item}, please.",
  "One {item} for me, please!",
  "Could I have a {item}, please?",
  "Morning! A {item}, please.",
];

// 购物清单的提示语
const SHOPPING_LINES = [
  "We need {item} from the shelf.",
  "Don't forget the {item}!",
  "Please grab some {item}.",
  "The {item} is on your list.",
];
