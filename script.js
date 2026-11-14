const UPGRADES = [
  { id:'tap2', name:'Усиленный тап', icon:'👆', description:'Получай 350 ₽ за каждое нажатие.', cost:100000, tap:350 },
  { id:'tap3', name:'Профессиональный тап', icon:'⚡', description:'Получай 450 ₽ за каждое нажатие.', cost:500000, tap:450 },
  { id:'tap4', name:'Универсальный тап', icon:'✨', description:'Получай 600 ₽ за каждое нажатие.', cost:500000, tap:600 }
];
const ASSETS = {
  cars: [
    {id:'car1',name:"Lada Granta",icon:"\ud83d\ude97",cost:1000000,income:2500,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car2',name:"Lada Vesta",icon:"\ud83d\ude97",cost:1600000,income:4000,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car3',name:"Kia Rio",icon:"\ud83d\ude97",cost:1800000,income:4500,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car4',name:"Hyundai Solaris",icon:"\ud83d\ude97",cost:1700000,income:4300,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car5',name:"Toyota Camry",icon:"\ud83d\ude97",cost:4500000,income:11000,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car6',name:"BMW 3 Series",icon:"\ud83d\ude97",cost:6000000,income:15000,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car7',name:"Mercedes-Benz E-Class",icon:"\ud83d\ude97",cost:8000000,income:20000,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car8',name:"BMW X5",icon:"\ud83d\ude97",cost:12000000,income:30000,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car9',name:"Toyota Land Cruiser",icon:"\ud83d\ude97",cost:15000000,income:38000,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car10',name:"Porsche Cayenne",icon:"\ud83d\ude97",cost:18000000,income:45000,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car11',name:"Toyota Corolla",icon:"\ud83d\ude97",cost:1160000,income:2900,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car12',name:"Toyota RAV4",icon:"\ud83d\ude97",cost:1345600,income:3364,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car13',name:"Toyota Prado",icon:"\ud83d\ude97",cost:1560896,income:3902,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car14',name:"Toyota Supra",icon:"\ud83d\ude97",cost:1810639,income:4527,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car15',name:"Toyota Fortuner",icon:"\ud83d\ude97",cost:2100342,income:5251,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car16',name:"Honda Civic",icon:"\ud83d\ude97",cost:2436396,income:6091,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car17',name:"Honda Accord",icon:"\ud83d\ude97",cost:2826220,income:7066,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car18',name:"Honda CR-V",icon:"\ud83d\ude97",cost:3278415,income:8196,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car19',name:"Honda Pilot",icon:"\ud83d\ude97",cost:3802961,income:9507,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car20',name:"Nissan Qashqai",icon:"\ud83d\ude97",cost:4411435,income:11029,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car21',name:"Nissan X-Trail",icon:"\ud83d\ude97",cost:5117265,income:12793,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car22',name:"Nissan Patrol",icon:"\ud83d\ude97",cost:5936027,income:14840,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car23',name:"Mazda 3",icon:"\ud83d\ude97",cost:6885791,income:17214,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car24',name:"Mazda 6",icon:"\ud83d\ude97",cost:7987518,income:19969,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car25',name:"Mazda CX-5",icon:"\ud83d\ude97",cost:9265521,income:23164,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car26',name:"Mazda CX-9",icon:"\ud83d\ude97",cost:10748004,income:26870,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car27',name:"Volkswagen Polo",icon:"\ud83d\ude97",cost:12467685,income:31169,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car28',name:"Volkswagen Golf",icon:"\ud83d\ude97",cost:14462514,income:36156,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car29',name:"Volkswagen Passat",icon:"\ud83d\ude97",cost:16776517,income:41941,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car30',name:"Volkswagen Tiguan",icon:"\ud83d\ude97",cost:19460759,income:48652,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car31',name:"Skoda Octavia",icon:"\ud83d\ude97",cost:22574481,income:56436,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car32',name:"Skoda Kodiaq",icon:"\ud83d\ude97",cost:26186398,income:65466,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car33',name:"Audi A3",icon:"\ud83d\ude97",cost:30376222,income:75941,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car34',name:"Audi A4",icon:"\ud83d\ude97",cost:35236417,income:88091,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car35',name:"Audi A6",icon:"\ud83d\ude97",cost:40874244,income:102186,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car36',name:"Audi Q5",icon:"\ud83d\ude97",cost:47414123,income:118535,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car37',name:"Audi Q7",icon:"\ud83d\ude97",cost:55000382,income:137501,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car38',name:"Mercedes-Benz C-Class",icon:"\ud83d\ude97",cost:63800444,income:159501,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car39',name:"Mercedes-Benz S-Class",icon:"\ud83d\ude97",cost:74008515,income:185021,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car40',name:"Mercedes-Benz G-Class",icon:"\ud83d\ude97",cost:85849877,income:214625,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car41',name:"BMW 5 Series",icon:"\ud83d\ude97",cost:99585857,income:248965,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car42',name:"BMW 7 Series",icon:"\ud83d\ude97",cost:115519594,income:288799,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car43',name:"BMW X3",icon:"\ud83d\ude97",cost:134002729,income:335007,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car44',name:"BMW X7",icon:"\ud83d\ude97",cost:155443166,income:388608,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car45',name:"Lexus ES",icon:"\ud83d\ude97",cost:180314073,income:450785,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car46',name:"Lexus RX",icon:"\ud83d\ude97",cost:209164324,income:522911,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car47',name:"Lexus LX",icon:"\ud83d\ude97",cost:242630616,income:606577,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car48',name:"Range Rover Sport",icon:"\ud83d\ude97",cost:281451515,income:703629,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car49',name:"Tesla Model 3",icon:"\ud83d\ude97",cost:326483757,income:816209,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car50',name:"Tesla Model S",icon:"\ud83d\ude97",cost:378721158,income:946803,description:"Автомобиль для личного пользования и получения игрового дохода."}
  ],
  businesses: [
    {id:'biz1',name:"Кофейня",icon:"\ud83c\udfe2",cost:3000000,income:9000,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz2',name:"Продуктовый магазин",icon:"\ud83c\udfe2",cost:5000000,income:15000,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz3',name:"Автосалон",icon:"\ud83c\udfe2",cost:25000000,income:75000,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz4',name:"Ресторан",icon:"\ud83c\udfe2",cost:3480000,income:10440,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz5',name:"Пиццерия",icon:"\ud83c\udfe2",cost:4036800,income:12110,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz6',name:"Сеть фастфуда",icon:"\ud83c\udfe2",cost:4682688,income:14048,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz7',name:"Пекарня",icon:"\ud83c\udfe2",cost:5431918,income:16296,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz8',name:"Кондитерская",icon:"\ud83c\udfe2",cost:6301025,income:18903,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz9',name:"Барбершоп",icon:"\ud83c\udfe2",cost:7309189,income:21928,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz10',name:"Салон красоты",icon:"\ud83c\udfe2",cost:8478659,income:25436,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz11',name:"Фитнес-клуб",icon:"\ud83c\udfe2",cost:9835245,income:29506,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz12',name:"Йога-студия",icon:"\ud83c\udfe2",cost:11408884,income:34227,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz13',name:"Автомойка",icon:"\ud83c\udfe2",cost:13234305,income:39703,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz14',name:"Автосервис",icon:"\ud83c\udfe2",cost:15351794,income:46055,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz15',name:"Шиномонтаж",icon:"\ud83c\udfe2",cost:17808081,income:53424,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz16',name:"АЗС",icon:"\ud83c\udfe2",cost:20657374,income:61972,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz17',name:"Гостиница",icon:"\ud83c\udfe2",cost:23962554,income:71888,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz18',name:"Хостел",icon:"\ud83c\udfe2",cost:27796563,income:83390,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz19',name:"Коворкинг",icon:"\ud83c\udfe2",cost:32244013,income:96732,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz20',name:"Офисный центр",icon:"\ud83c\udfe2",cost:37403055,income:112209,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz21',name:"Торговый центр",icon:"\ud83c\udfe2",cost:43387543,income:130163,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz22',name:"Супермаркет",icon:"\ud83c\udfe2",cost:50329550,income:150989,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz23',name:"Мини-маркет",icon:"\ud83c\udfe2",cost:58382278,income:175147,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz24',name:"Аптека",icon:"\ud83c\udfe2",cost:67723443,income:203170,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz25',name:"Стоматология",icon:"\ud83c\udfe2",cost:78559194,income:235678,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz26',name:"Медицинская клиника",icon:"\ud83c\udfe2",cost:91128665,income:273386,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz27',name:"Ветеринарная клиника",icon:"\ud83c\udfe2",cost:105709251,income:317128,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz28',name:"Зоомагазин",icon:"\ud83c\udfe2",cost:122622731,income:367868,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz29',name:"Магазин электроники",icon:"\ud83c\udfe2",cost:142242368,income:426727,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz30',name:"Магазин одежды",icon:"\ud83c\udfe2",cost:165001147,income:495003,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz31',name:"Мебельный салон",icon:"\ud83c\udfe2",cost:191401331,income:574204,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz32',name:"Строительный магазин",icon:"\ud83c\udfe2",cost:222025544,income:666077,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz33',name:"Цветочный салон",icon:"\ud83c\udfe2",cost:257549631,income:772649,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz34',name:"Книжный магазин",icon:"\ud83c\udfe2",cost:298757572,income:896273,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz35',name:"Детский центр",icon:"\ud83c\udfe2",cost:346558783,income:1039676,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz36',name:"Частный детский сад",icon:"\ud83c\udfe2",cost:402008188,income:1206025,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz37',name:"Образовательный центр",icon:"\ud83c\udfe2",cost:466329499,income:1398988,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz38',name:"Языковая школа",icon:"\ud83c\udfe2",cost:540942218,income:1622827,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz39',name:"Кинотеатр",icon:"\ud83c\udfe2",cost:627492973,income:1882479,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz40',name:"Игровой клуб",icon:"\ud83c\udfe2",cost:727891849,income:2183676,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz41',name:"Компьютерный клуб",icon:"\ud83c\udfe2",cost:844354545,income:2533064,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz42',name:"Фотостудия",icon:"\ud83c\udfe2",cost:979451272,income:2938354,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz43',name:"Прачечная",icon:"\ud83c\udfe2",cost:1136163475,income:3408490,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz44',name:"Химчистка",icon:"\ud83c\udfe2",cost:1317949632,income:3953849,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz45',name:"Курьерская служба",icon:"\ud83c\udfe2",cost:1528821573,income:4586465,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz46',name:"Логистический склад",icon:"\ud83c\udfe2",cost:1773433024,income:5320299,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz47',name:"Производственный цех",icon:"\ud83c\udfe2",cost:2057182308,income:6171547,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz48',name:"Типография",icon:"\ud83c\udfe2",cost:2386331477,income:7158994,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz49',name:"Рекламное агентство",icon:"\ud83c\udfe2",cost:2768144514,income:8304434,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz50',name:"IT-студия",icon:"\ud83c\udfe2",cost:3211047636,income:9633143,description:"Прибыльное предприятие с регулярным игровым доходом."}
  ],
  stalls: [
    {id:'stall1',name:"Торговый павильон",icon:"\ud83c\udfea",cost:2000000,income:6000,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall2',name:"Цветочный прилавок",icon:"\ud83c\udfea",cost:500000,income:1500,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall3',name:"Фуд-корт",icon:"\ud83c\udfea",cost:1500000,income:4500,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall4',name:"Кофейный киоск",icon:"\ud83c\udfea",cost:580000,income:1740,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall5',name:"Шаурма-точка",icon:"\ud83c\udfea",cost:672800,income:2018,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall6',name:"Бургерная стойка",icon:"\ud83c\udfea",cost:780448,income:2341,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall7',name:"Хот-дог киоск",icon:"\ud83c\udfea",cost:905320,income:2716,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall8',name:"Мороженое",icon:"\ud83c\udfea",cost:1050171,income:3151,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall9',name:"Лимонадная стойка",icon:"\ud83c\udfea",cost:1218198,income:3655,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall10',name:"Соковый бар",icon:"\ud83c\udfea",cost:1413110,income:4239,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall11',name:"Блинная",icon:"\ud83c\udfea",cost:1639207,income:4918,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall12',name:"Пончиковая",icon:"\ud83c\udfea",cost:1901481,income:5704,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall13',name:"Попкорн-киоск",icon:"\ud83c\udfea",cost:2205718,income:6617,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall14',name:"Сладкая вата",icon:"\ud83c\udfea",cost:2558632,income:7676,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall15',name:"Овощной ларёк",icon:"\ud83c\udfea",cost:2968014,income:8904,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall16',name:"Фруктовый ларёк",icon:"\ud83c\udfea",cost:3442896,income:10329,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall17',name:"Рыбный прилавок",icon:"\ud83c\udfea",cost:3993759,income:11981,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall18',name:"Мясная лавка",icon:"\ud83c\udfea",cost:4632760,income:13898,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall19',name:"Сырная лавка",icon:"\ud83c\udfea",cost:5374002,income:16122,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall20',name:"Хлебный киоск",icon:"\ud83c\udfea",cost:6233842,income:18702,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall21',name:"Выпечка с собой",icon:"\ud83c\udfea",cost:7231257,income:21694,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall22',name:"Чайный прилавок",icon:"\ud83c\udfea",cost:8388258,income:25165,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall23',name:"Кофе с собой",icon:"\ud83c\udfea",cost:9730380,income:29191,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall24',name:"Мини-пекарня",icon:"\ud83c\udfea",cost:11287240,income:33862,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall25',name:"Сувенирный киоск",icon:"\ud83c\udfea",cost:13093199,income:39280,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall26',name:"Газетный киоск",icon:"\ud83c\udfea",cost:15188111,income:45564,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall27',name:"Книжный стенд",icon:"\ud83c\udfea",cost:17618209,income:52855,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall28',name:"Аксессуары для телефонов",icon:"\ud83c\udfea",cost:20437122,income:61311,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall29',name:"Чехлы и гаджеты",icon:"\ud83c\udfea",cost:23707061,income:71121,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall30',name:"Цветы у метро",icon:"\ud83c\udfea",cost:27500191,income:82501,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall31',name:"Подарочная лавка",icon:"\ud83c\udfea",cost:31900222,income:95701,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall32',name:"Бижутерия",icon:"\ud83c\udfea",cost:37004257,income:111013,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall33',name:"Часы и ремешки",icon:"\ud83c\udfea",cost:42924938,income:128775,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall34',name:"Очки и аксессуары",icon:"\ud83c\udfea",cost:49792929,income:149379,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall35',name:"Косметический островок",icon:"\ud83c\udfea",cost:57759797,income:173279,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall36',name:"Парфюмерный стенд",icon:"\ud83c\udfea",cost:67001365,income:201004,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall37',name:"Игрушечный киоск",icon:"\ud83c\udfea",cost:77721583,income:233165,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall38',name:"Канцтовары",icon:"\ud83c\udfea",cost:90157036,income:270471,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall39',name:"Спортивное питание",icon:"\ud83c\udfea",cost:104582162,income:313746,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall40',name:"Товары для животных",icon:"\ud83c\udfea",cost:121315308,income:363946,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall41',name:"Мобильный ремонт",icon:"\ud83c\udfea",cost:140725757,income:422177,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall42',name:"Ремонт обуви",icon:"\ud83c\udfea",cost:163241879,income:489726,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall43',name:"Ключная мастерская",icon:"\ud83c\udfea",cost:189360579,income:568082,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall44',name:"Фото на документы",icon:"\ud83c\udfea",cost:219658272,income:658975,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall45',name:"Пункт выдачи",icon:"\ud83c\udfea",cost:254803595,income:764411,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall46',name:"Мини-маркет у дома",icon:"\ud83c\udfea",cost:295572171,income:886717,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall47',name:"Фермерский стенд",icon:"\ud83c\udfea",cost:342863718,income:1028591,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall48',name:"Медовый прилавок",icon:"\ud83c\udfea",cost:397721913,income:1193166,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall49',name:"Орехи и сухофрукты",icon:"\ud83c\udfea",cost:461357419,income:1384072,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall50',name:"Специи и приправы",icon:"\ud83c\udfea",cost:535174606,income:1605524,description:"Небольшая торговая точка с постоянным потоком покупателей."}
  ],
  apartments: [
    {id:'apt1',name:"Однокомнатная квартира",icon:"\ud83c\udfe0",cost:3000000,income:9000,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt2',name:"Двухкомнатная квартира",icon:"\ud83c\udfe0",cost:3000000,income:9000,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt3',name:"Трёхкомнатная квартира",icon:"\ud83c\udfe0",cost:3000000,income:9000,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt4',name:"Студия в центре",icon:"\ud83c\udfe0",cost:3480000,income:10440,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt5',name:"Студия у метро",icon:"\ud83c\udfe0",cost:4036800,income:12110,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt6',name:"Квартира с балконом",icon:"\ud83c\udfe0",cost:4682688,income:14048,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt7',name:"Квартира с ремонтом",icon:"\ud83c\udfe0",cost:5431918,income:16296,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt8',name:"Квартира в новостройке",icon:"\ud83c\udfe0",cost:6301025,income:18903,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt9',name:"Квартира в старом фонде",icon:"\ud83c\udfe0",cost:7309189,income:21928,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt10',name:"Апартаменты бизнес-класса",icon:"\ud83c\udfe0",cost:8478659,income:25436,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt11',name:"Лофт",icon:"\ud83c\udfe0",cost:9835245,income:29506,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt12',name:"Пентхаус",icon:"\ud83c\udfe0",cost:11408884,income:34227,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt13',name:"Двухуровневая квартира",icon:"\ud83c\udfe0",cost:13234305,income:39703,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt14',name:"Семейная квартира",icon:"\ud83c\udfe0",cost:15351794,income:46055,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt15',name:"Квартира у парка",icon:"\ud83c\udfe0",cost:17808081,income:53424,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt16',name:"Квартира у набережной",icon:"\ud83c\udfe0",cost:20657374,income:61972,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt17',name:"Квартира с террасой",icon:"\ud83c\udfe0",cost:23962554,income:71888,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt18',name:"Квартира с видом на город",icon:"\ud83c\udfe0",cost:27796563,income:83390,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt19',name:"Квартира в спальном районе",icon:"\ud83c\udfe0",cost:32244013,income:96732,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt20',name:"Квартира рядом с вузом",icon:"\ud83c\udfe0",cost:37403055,income:112209,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt21',name:"Квартира рядом с офисами",icon:"\ud83c\udfe0",cost:43387543,income:130163,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt22',name:"Евродвушка",icon:"\ud83c\udfe0",cost:50329550,income:150989,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt23',name:"Евротрёшка",icon:"\ud83c\udfe0",cost:58382278,income:175147,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt24',name:"Четырёхкомнатная квартира",icon:"\ud83c\udfe0",cost:67723443,income:203170,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt25',name:"Пятикомнатная квартира",icon:"\ud83c\udfe0",cost:78559194,income:235678,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt26',name:"Квартира в клубном доме",icon:"\ud83c\udfe0",cost:91128665,income:273386,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt27',name:"Апартаменты в башне",icon:"\ud83c\udfe0",cost:105709251,income:317128,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt28',name:"Квартира премиум-класса",icon:"\ud83c\udfe0",cost:122622731,income:367868,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt29',name:"Квартира с мебелью",icon:"\ud83c\udfe0",cost:142242368,income:426727,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt30',name:"Квартира под аренду",icon:"\ud83c\udfe0",cost:165001147,income:495003,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt31',name:"Таунхаус",icon:"\ud83c\udfe0",cost:191401331,income:574204,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt32',name:"Небольшой загородный дом",icon:"\ud83c\udfe0",cost:222025544,income:666077,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt33',name:"Дуплекс",icon:"\ud83c\udfe0",cost:257549631,income:772649,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt34',name:"Квартира у моря",icon:"\ud83c\udfe0",cost:298757572,income:896273,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt35',name:"Квартира в курортном районе",icon:"\ud83c\udfe0",cost:346558783,income:1039676,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt36',name:"Квартира в деловом квартале",icon:"\ud83c\udfe0",cost:402008188,income:1206025,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt37',name:"Квартира возле аэропорта",icon:"\ud83c\udfe0",cost:466329499,income:1398988,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt38',name:"Квартира возле вокзала",icon:"\ud83c\udfe0",cost:540942218,income:1622827,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt39',name:"Квартира в историческом центре",icon:"\ud83c\udfe0",cost:627492973,income:1882479,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt40',name:"Квартира с зимним садом",icon:"\ud83c\udfe0",cost:727891849,income:2183676,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt41',name:"Квартира с камином",icon:"\ud83c\udfe0",cost:844354545,income:2533064,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt42',name:"Квартира с панорамными окнами",icon:"\ud83c\udfe0",cost:979451272,income:2938354,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt43',name:"Квартира с двумя санузлами",icon:"\ud83c\udfe0",cost:1136163475,income:3408490,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt44',name:"Семейный пентхаус",icon:"\ud83c\udfe0",cost:1317949632,income:3953849,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt45',name:"Дизайнерские апартаменты",icon:"\ud83c\udfe0",cost:1528821573,income:4586465,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt46',name:"Резиденция в центре",icon:"\ud83c\udfe0",cost:1773433024,income:5320299,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt47',name:"Элитная квартира",icon:"\ud83c\udfe0",cost:2057182308,income:6171547,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt48',name:"Загородная резиденция",icon:"\ud83c\udfe0",cost:2386331477,income:7158994,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt49',name:"Вилла",icon:"\ud83c\udfe0",cost:2768144514,income:8304434,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt50',name:"Особняк",icon:"\ud83c\udfe0",cost:3211047636,income:9633143,description:"Недвижимость для сдачи в аренду и пассивного дохода."}
  ]
};
let token=null, game=null, demoMode=false, activeCategory='cars', garageCategory='cars', busy=false, isAdmin=false, adminRole=null, adminTelegramId=null;
const DEMO_KEY='crypto-investor-demo-v1';
function saveDemo(){if(demoMode&&game)localStorage.setItem(DEMO_KEY,JSON.stringify(game));}
function emptyGame(){return {player:{telegramId:'demo',username:null,firstName:'Игрок',balance:100000,taps:0,tapReward:300},owned:[],purchasedUpgrades:[],propertyLevels:{},passiveIncome:0};}
function normalizeGameState(value){if(!value||typeof value!=='object'||!value.player||typeof value.player!=='object')throw new Error('Игровые данные игрока не получены');return {...value,player:{...value.player,balance:Number(value.player.balance)||0,taps:Number(value.player.taps)||0,tapReward:Number(value.player.tapReward)||300},owned:Array.isArray(value.owned)?value.owned:[],purchasedUpgrades:Array.isArray(value.purchasedUpgrades)?value.purchasedUpgrades:[],propertyLevels:value.propertyLevels&&typeof value.propertyLevels==='object'?value.propertyLevels:{},passiveIncome:Number(value.passiveIncome)||0};}
function loadDemo(){try{const saved=JSON.parse(localStorage.getItem(DEMO_KEY)||'null');if(!saved||!saved.player||typeof saved.player!=='object')return emptyGame();const valid=normalizeGameState(saved);if(!valid.purchasedUpgrades.length&&Number(valid.player.tapReward)===50){valid.player.tapReward=300;localStorage.setItem(DEMO_KEY,JSON.stringify(valid));}return valid;}catch{return emptyGame();}}
function levelForTaps(taps){
  const safeTaps=Math.max(0,Math.floor(Number(taps)||0));
  const level=Math.min(999,Math.floor(safeTaps/50)+1);
  const total=(level-1)*50;
  return {level,progress:Math.max(0,safeTaps-total),needed:50,nextThreshold:level*50};
}
function demoApi(path,body={}){
  if(path==='/game/state')return game;
  const p=game.player;
  if(path==='/game/tap'){
    const count=Number(body.count??1);
    if(!Number.isSafeInteger(count)||count<1||count>1000)throw Error('Некорректное количество тапов.');
    const oldTaps=p.taps,oldLevel=levelForTaps(oldTaps).level;
    p.taps+=count;
    const newLevel=levelForTaps(p.taps).level;
    const bonuses=(Math.floor(p.taps/100)-Math.floor(oldTaps/100))*500;
    p.balance+=p.tapReward*count+bonuses+Math.max(0,newLevel-oldLevel)*25000;
  }
  else if(path==='/game/guess-number'){
    const guess=Number(body.guess);
    if(!Number.isInteger(guess)||guess<1||guess>5)throw Error('Выбери целое число от 1 до 5.');
    const number=1+Math.floor(Math.random()*5),correct=guess===number;
    if(correct)p.balance+=10000;
    saveDemo();
    return {state:game,number,correct,reward:correct?10000:0};
  }
  else if(path==='/game/buy-upgrade'){const u=UPGRADES.find(x=>x.id===body.upgradeId);if(!u)throw Error('Неизвестный апгрейд');if(game.purchasedUpgrades.includes(u.id))throw Error('Апгрейд уже куплен');if(p.balance<u.cost)throw Error('Недостаточно монет');p.balance-=u.cost;p.tapReward=u.tap;game.purchasedUpgrades.push(u.id);}
  else if(path==='/game/buy-asset'){const a=allAssets.find(x=>x.id===body.assetId);if(!a)throw Error('Объект не найден');if(game.owned.includes(a.id))throw Error('Объект уже куплен');if(p.balance<a.cost)throw Error('Недостаточно монет');p.balance-=a.cost;game.owned.push(a.id);}
  else if(path==='/game/sell-asset'){const a=allAssets.find(x=>x.id===body.assetId);if(!a||!game.owned.includes(a.id))throw Error('Объект не найден в собственности');p.balance+=Math.floor(a.cost*.7);game.owned=game.owned.filter(id=>id!==a.id);delete game.propertyLevels[a.id];}
  else if(path==='/game/upgrade-asset'){const a=allAssets.find(x=>x.id===body.assetId);if(!a||!game.owned.includes(a.id))throw Error('Сначала купи этот объект');const level=game.propertyLevels[a.id]||0,fee=Math.max(1000,Math.floor(a.cost*.2));if(level>=5)throw Error('Достигнут максимальный уровень');if(p.balance<fee)throw Error('Недостаточно монет');p.balance-=fee;game.propertyLevels[a.id]=level+1;}
  game.passiveIncome=game.owned.reduce((sum,id)=>{const a=allAssets.find(x=>x.id===id);return sum+(a?getAssetIncome(a):0)},0);saveDemo();return game;
}
const $=id=>document.getElementById(id);
const money=n=>Math.floor(n).toLocaleString('ru-RU');
const allAssets=Object.values(ASSETS).flat();
const getAssetIncome=a=>Math.floor(a.income*(1+(game?.propertyLevels?.[a.id]||0)*.25)*2.5);

async function api(path,body) {
  if(demoMode)return demoApi(path,body);
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),15000);
  let response;
  try {
    response=await fetch(`https://crypto-investor-72f3.onrender.com/api${path}`,{
      method:body?'POST':'GET',
      headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},
      ...(body?{body:JSON.stringify(body)}:{}),
      signal:controller.signal
    });
  } catch(error) {
    if(error.name==='AbortError') throw new Error('Сервер не ответил за 15 секунд. Проверь соединение и нажми «Повторить».');
    throw new Error('Не удалось связаться с игровым сервером. Проверь интернет и попробуй ещё раз.');
  } finally {
    clearTimeout(timeout);
  }
  const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(data.error||`Ошибка сервера (${response.status})`);
  return data;
}
function updateDisplay(){
  if(!game)return; const p=game.player;
  $('balance').textContent=money(p.balance);$('tapCount').textContent=money(p.taps);
  const taps=Number(p.taps||0),levelInfo=levelForTaps(taps),level=levelInfo.level,progress=levelInfo.progress;
  const levelName=$('levelName'),levelText=$('levelProgressText'),levelBar=$('levelProgress');
  if(levelName)levelName.textContent='Уровень '+level;
  if(levelText)levelText.textContent=level>=999?'Максимальный уровень':money(progress)+' / 50 этапов';
  if(levelBar)levelBar.style.width=(level>=999?100:Math.min(100,(progress/50)*100))+'%';
  $('upgradeBalance').textContent=money(p.balance)+' ₽';$('businessBalance').textContent=money(p.balance)+' ₽';$('passiveIncome').textContent=money(game.passiveIncome)+' ₽/мин';
  $('tapButton').querySelector('small').textContent=`+${money(p.tapReward)} ₽ за нажатие`;
  $('tapButton').setAttribute('aria-label',`Получить ${p.tapReward} рублей`);
}
function renderUpgrades(){
  $('upgradeGrid').innerHTML=UPGRADES.map(u=>{const bought=game.purchasedUpgrades.includes(u.id);return `<article class="shop-card"><div class="shop-icon">${u.icon}</div><h3>${u.name}</h3><p>${u.description}</p><div class="item-income">Награда за тап: ${u.tap} ₽</div><button class="shop-buy" data-upgrade="${u.id}" ${bought||game.player.balance<u.cost?'disabled':''}>${bought?'Куплено ✓':`Купить · ${money(u.cost)} ₽`}</button></article>`}).join('');
}
function renderPropertyUpgrades(){
  const owned=allAssets.filter(a=>game.owned.includes(a.id)); const grid=$('propertyUpgradeGrid');
  if(!owned.length){grid.innerHTML='<p class="muted">Сначала приобрети имущество во вкладке «Бизнес» — оно появится здесь.</p>';return;}
  grid.innerHTML=owned.map(a=>{const level=game.propertyLevels[a.id]||0,fee=Math.max(1000,Math.floor(a.cost*.2)),maxed=level>=5;return `<article class="shop-card"><div class="shop-icon">${a.icon}</div><h3>${a.name}</h3><p>Уровень улучшения: <b>${level}/5</b>. Каждый уровень увеличивает доход на 25%.</p><div class="item-income">Текущий доход: +${money(getAssetIncome(a))} ₽/мин</div><button class="shop-buy" data-property-upgrade="${a.id}" ${maxed||game.player.balance<fee?'disabled':''}>${maxed?'Максимальный уровень ✓':`Улучшить · ${money(fee)} ₽`}</button></article>`}).join('');
}
function renderBusinesses(){
  const items=ASSETS[activeCategory];$('businessGrid').innerHTML=items.map(a=>{const bought=game.owned.includes(a.id);const resale=Math.floor(a.cost*.7);return `<article class="shop-card"><div class="shop-icon">${a.icon}</div><h3>${a.name}</h3><p>${a.description}</p><div class="item-income">Цена: ${money(a.cost)} ₽ · Доход: +${money(a.income)} ₽/мин</div><div class="trade-actions"><button class="shop-buy" data-asset="${a.id}" ${bought||game.player.balance<a.cost?'disabled':''}>${bought?'Куплено ✓':`Купить · ${money(a.cost)} ₽`}</button>${bought?`<button class="shop-sell" data-sell="${a.id}">Продать · ${money(resale)} ₽</button>`:''}</div></article>`}).join('');
  renderGarage(); renderPropertyUpgrades();
}
function renderGarage(){
  const categories=['cars','apartments','businesses','stalls'];
  const labels={cars:'🚗 Автомобили',apartments:'🏠 Недвижимость',businesses:'🏢 Собственность',stalls:'🛍️ Торговые площадки'};
  categories.forEach(k=>{const count=ASSETS[k].filter(a=>game.owned.includes(a.id)).length;const el=$('garageCount'+k[0].toUpperCase()+k.slice(1));if(el)el.textContent=`${count} объектов`;});
  const owned=ASSETS[garageCategory].filter(a=>game.owned.includes(a.id));$('garageTitle').textContent=labels[garageCategory];
  $('garageGrid').innerHTML=owned.length?owned.map(a=>`<article class="shop-card"><div class="shop-icon">${a.icon}</div><h3>${a.name}</h3><p>${a.description}</p><div class="item-income">Доход: +${money(getAssetIncome(a))} ₽/мин</div><button class="shop-sell" data-garage-sell="${a.id}">Продать · ${money(Math.floor(a.cost*.7))} ₽</button></article>`).join(''):'<p class="muted empty-garage">В этом разделе пока ничего нет. Купи объект во вкладке «Бизнес» — он появится здесь автоматически.</p>';
}

function renderAll(){if(!game||!game.player)return;updateDisplay();renderUpgrades();renderBusinesses();}
function showFireworks(){
 const layer=$('fireworks');if(!layer)return;layer.innerHTML='';
 for(let i=0;i<42;i++){
  const spark=document.createElement('i');spark.className='spark';
  spark.style.left=(10+Math.random()*80)+'%';spark.style.top=(12+Math.random()*48)+'%';
  spark.style.setProperty('--dx',(Math.random()*220-110)+'px');
  spark.style.setProperty('--dy',(Math.random()*220-110)+'px');
  spark.style.setProperty('--hue',Math.floor(Math.random()*360));
  layer.appendChild(spark);
 }
 layer.classList.add('show');setTimeout(()=>layer.classList.remove('show'),1400);
}
function showLevelUpPopup(reward,level){
 const popup=$('bonusPopup');if(!popup)return;
 popup.textContent='🎉 НОВЫЙ УРОВЕНЬ '+level+'! +'+money(reward)+' ₽';
 popup.classList.remove('show');void popup.offsetWidth;popup.classList.add('show');
 showFireworks();
 setTimeout(()=>popup.classList.remove('show'),2700);
}
async function refresh(){game=normalizeGameState(await api('/game/state'));renderAll();}
async function action(fn,successText){if(busy)return;busy=true;try{game=await fn();renderAll();$('tapMessage').textContent=successText||'Готово!';$('saveStatus').textContent=demoMode?'Демо-прогресс сохранён на этом устройстве ✓':'Прогресс синхронизирован с сервером ✓';}catch(e){$('tapMessage').textContent=e.message;$('saveStatus').textContent='Не удалось выполнить действие';}finally{busy=false}}
let connectionTimer=null,connectionStartedAt=0,connectionStage='Подключаемся к игровому серверу';
function updateConnectionStatus(){
  const status=$('saveStatus');
  if(!status||!connectionStartedAt)return;
  const elapsed=Math.floor((Date.now()-connectionStartedAt)/1000);
  status.textContent=elapsed<10
    ? connectionStage+' · обычно 2–5 секунд · прошло '+elapsed+' сек.'
    : 'Подключение дольше обычного · прошло '+elapsed+' сек. Проверяем соединение…';
}
function setConnectionStage(stage){
  connectionStage=stage;
  updateConnectionStatus();
}
function stopConnectionTimer(){
  if(connectionTimer){clearInterval(connectionTimer);connectionTimer=null;}
  connectionStartedAt=0;
}
async function start(){
  const tg=window.Telegram?.WebApp;
  // Демо включается только в обычном браузере. В Telegram никогда не подменяем
  // отсутствие initData локальной игрой: ждём данные и показываем точную ошибку.
  if(!tg){
    demoMode=true;
    game=loadDemo();
    $('tapButton').disabled=false;
    renderAll();
    $('saveStatus').textContent='Демо-режим браузера. Для серверного аккаунта открой игру из Telegram.';
    return;
  }
  demoMode=false;
  stopConnectionTimer();
  connectionStartedAt=Date.now();
  setConnectionStage('Подключаемся к игровому серверу');
  connectionTimer=setInterval(updateConnectionStatus,1000);
  tg.ready();
  try{tg.expand();}catch{}
  $('tapButton').disabled=true;
  setConnectionStage('Получаем данные Telegram…');
  let initData=tg.initData||'';
  for(let i=0;!initData&&i<20;i++){
    await new Promise(resolve=>setTimeout(resolve,250));
    initData=window.Telegram?.WebApp?.initData||'';
  }
  if(!initData){
    stopConnectionTimer();
    throw new Error('Telegram не передал данные запуска. Закрой мини-приложение и открой его кнопкой «Играть» в боте.');
  }
  try{
    setConnectionStage('Проверяем аккаунт на сервере…');
    const authData=await api('/auth/telegram',{initData});
    if(!authData?.token)throw new Error('Сервер не выдал токен авторизации');
    token=authData.token;
    await refresh();
    try{
      const admin=await api('/admin/me');
      isAdmin=admin.isAdmin===true;
      adminRole=isAdmin?admin.role:null;
      adminTelegramId=isAdmin?String(admin.telegramId):null;
      $('adminNav').hidden=!isAdmin;
      if(isAdmin){
        $('adminIdentity').textContent=admin.role==='owner'?'Полный доступ владельца': 'Ограниченный доступ · начисления только на свой аккаунт';
        $('adminPermission').textContent=admin.role==='owner'?'Можно начислять игровые рубли любому зарегистрированному игроку.':'Можно смотреть свой баланс и начислять игровые рубли только себе.';
        $('adminBalance').textContent=money(admin.balance);
        if(admin.role==='self'){$('adminTargetWrap').hidden=true;}
        else {$('adminTargetWrap').hidden=false;}
      }
    }catch{isAdmin=false;adminRole=null;adminTelegramId=null;$('adminNav').hidden=true;}
    stopConnectionTimer();
    $('tapButton').disabled=false;
    $('saveStatus').textContent='Аккаунт Telegram подключён · прогресс хранится на сервере ✓';
    $('saveStatus').style.cursor='';
    $('saveStatus').onclick=null;
  }catch(e){
    stopConnectionTimer();
    token=null;isAdmin=false;adminRole=null;adminTelegramId=null;game=null;
    $('adminNav').hidden=true;
    $('tapButton').disabled=true;
    $('saveStatus').textContent='Ошибка входа: '+(e.message||'не удалось авторизоваться')+' Нажми, чтобы повторить.';
    $('saveStatus').style.cursor='pointer';
    $('saveStatus').onclick=()=>{
      $('saveStatus').onclick=null;
      $('saveStatus').textContent='Повторная попытка входа…';
      start().catch(err=>{$('saveStatus').textContent='Ошибка запуска: '+err.message;});
    };
  }
}
// Очередь тапов: быстрые клики накапливаются и отправляются пачками,
 // поэтому занятый запрос не отбрасывает следующие нажатия.
let pendingTaps=0,tapFlushPromise=null;
async function flushTapQueue(){
 if(tapFlushPromise)return tapFlushPromise;
 tapFlushPromise=(async()=>{
  while(pendingTaps>0){
   const count=Math.min(1000,pendingTaps);pendingTaps-=count;
   try{
    const next=await api('/game/tap',{count});
    const oldTaps=Number(game?.player?.taps||0);
    const oldLevel=levelForTaps(oldTaps).level;
    game=normalizeGameState(next);
    const newLevel=levelForTaps(Number(game.player.taps||0)).level;
    const levelsGained=Math.max(0,newLevel-oldLevel);
    const levelReward=Number(next.levelReward ?? (levelsGained*25000));
    renderAll();
    if(levelsGained>0)showLevelUpPopup(levelReward,newLevel);
    else if(Math.floor(game.player.taps/100)>Math.floor(oldTaps/100))showFireworks();
    $('saveStatus').textContent=demoMode?'Демо-прогресс сохранён на этом устройстве ✓':'Прогресс синхронизирован с сервером ✓';
    $('tapMessage').textContent=levelsGained>0
      ? '🎉 Вы перешли на '+(levelsGained===1?'следующий уровень!':'новый уровень!')+' +'+money(levelReward)+' ₽ зачислено на баланс.'
      : 'Засчитано тапов: '+count;
   }catch(error){
    pendingTaps+=count;
    $('tapMessage').textContent=error.message||'Не удалось сохранить тапы. Нажми кнопку ещё раз.';
    $('saveStatus').textContent='Не удалось сохранить тапы';
    break;
   }
  }
 })().finally(()=>{tapFlushPromise=null;if(pendingTaps>0)flushTapQueue();});
 return tapFlushPromise;
}
$('tapButton').addEventListener('click',()=>{
 if(!game?.player)return;
 pendingTaps++;
 const r=$('tapButton').getBoundingClientRect(),el=document.createElement('span');
 el.className='tap-float';el.textContent='+'+money(game.player.tapReward)+' ₽';
 el.style.left=(r.left+r.width/2)+'px';el.style.top=(r.top+20)+'px';
 document.body.appendChild(el);setTimeout(()=>el.remove(),650);
 flushTapQueue();
});
const adminCreditButton=$('adminCredit');
if(adminCreditButton)adminCreditButton.addEventListener('click',async()=>{
  if(!isAdmin||demoMode)return;
  const telegramId=adminRole==='self'?adminTelegramId:$('adminTelegramId').value.trim();
  const amount=Number($('adminAmount').value),status=$('adminStatus'),btn=$('adminCredit');
  if(!/^\\d{5,20}$/.test(String(telegramId||''))||!Number.isSafeInteger(amount)||amount<1||amount>1000000000){status.textContent='Проверь Telegram ID и сумму (1–1 000 000 000).';return;}
  btn.disabled=true;status.textContent='Проверяем права и начисляем…';
  try{
    const result=await api('/admin/credit',{telegramId,amount});
    status.textContent='Готово: начислено '+money(result.credited)+' игровых ₽. Новый баланс: '+money(result.balance)+' ₽.';
    $('adminBalance').textContent=money(result.balance);
    $('adminAmount').value='';
    if(game?.player) {game.player.balance=result.balance;renderAll();}
  } catch(e){status.textContent=e.message||'Не удалось начислить игровые рубли.';}
  finally{btn.disabled=false;}
});
document.querySelectorAll('.nav-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.nav-btn').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));btn.classList.add('active');$(btn.dataset.page).classList.add('active');if(btn.dataset.page==='leaders')renderLeaderboard(leaderboardType);}));
$('upgradeGrid').addEventListener('click',e=>{const b=e.target.closest('[data-upgrade]');if(b)action(()=>api('/game/buy-upgrade',{upgradeId:b.dataset.upgrade}),'Апгрейд куплен!');});
$('businessCategories').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll('.category-btn').forEach(x=>x.classList.toggle('active',x===b));renderBusinesses();});
$('businessGrid').addEventListener('click',e=>{const sell=e.target.closest('[data-sell]');if(sell){if(confirm('Продать этот объект за 70% его цены?'))action(()=>api('/game/sell-asset',{assetId:sell.dataset.sell}),'Объект продан!');return;}const b=e.target.closest('[data-asset]');if(b)action(()=>api('/game/buy-asset',{assetId:b.dataset.asset}),'Поздравляем с покупкой!');});
$('garageGrid').addEventListener('click',e=>{const b=e.target.closest('[data-garage-sell]');if(b&&confirm('Продать этот объект за 70% его цены?'))action(()=>api('/game/sell-asset',{assetId:b.dataset.garageSell}),'Объект продан!');});
document.querySelectorAll('[data-garage]').forEach(b=>b.addEventListener('click',()=>{garageCategory=b.dataset.garage;document.querySelectorAll('[data-garage]').forEach(x=>x.classList.toggle('active',x===b));renderGarage();}));
$('propertyUpgradeGrid').addEventListener('click',e=>{const b=e.target.closest('[data-property-upgrade]');if(b)action(()=>api('/game/upgrade-asset',{assetId:b.dataset.propertyUpgrade}),'Имущество улучшено!');});
window.addEventListener('focus',()=>{if(token&&!busy)refresh().catch(()=>{});});


// Игра «Угадай число»: награда начисляется сервером только за верный ответ.
function updateGuessBalance(){if($('betBalance'))$('betBalance').textContent=money(game?.player?.balance||0)+' ₽';}
$('guessButtons').addEventListener('click',async e=>{
 const button=e.target.closest('[data-guess]');
 if(!button||button.disabled||busy)return;
 const guess=Number(button.dataset.guess);
 if(!Number.isInteger(guess)||guess<1||guess>5)return;
 const buttons=[...document.querySelectorAll('[data-guess]')];
 buttons.forEach(x=>x.disabled=true);
 $('guessResult').textContent='Проверяем ответ…';
 busy=true;
 try{
  const result=await api('/game/guess-number',{guess});
  game=normalizeGameState(result.state);
  renderAll();
  updateGuessBalance();
  $('guessResult').textContent=result.correct
   ? '🎉 Верно! Загаданное число — '+result.number+'. Начислено 10 000 ₽!'
   : 'Не угадал. Было загадано число '+result.number+'. Баланс не изменился.';
 }catch(error){
  $('guessResult').textContent=error.message||'Не удалось проверить ответ.';
  buttons.forEach(x=>x.disabled=false);
 }finally{busy=false;buttons.forEach(x=>x.disabled=false);}
});
document.querySelector('[data-page="bets"]').addEventListener('click',updateGuessBalance);
const tapButton=$('tapButton');
tapButton.addEventListener('click',e=>{e.preventDefault();const r=tapButton.getBoundingClientRect(),el=document.createElement('span');el.className='tap-float';el.textContent='+'+money(game?.player?.tapReward||50)+' ₽';el.style.left=(r.left+r.width/2)+'px';el.style.top=(r.top+20)+'px';document.body.appendChild(el);setTimeout(()=>el.remove(),650);},{passive:false});



// Словесные кроссворды: наборы подсказок перемешиваются для каждого раунда.
const crosswordBank={
 easy:[
  [{w:'КОШКА',h:'Домашнее животное, которое мурлычет.'},{w:'ЯБЛОКО',h:'Круглый фрукт, растёт на дереве.'},{w:'ЗИМА',h:'Самое холодное время года.'},{w:'МОРЕ',h:'Большой солёный водоём.'}],
  [{w:'СОЛНЦЕ',h:'Звезда, которая освещает Землю.'},{w:'КНИГА',h:'Её читают, перелистывая страницы.'},{w:'РЫБА',h:'Живёт в воде и дышит жабрами.'},{w:'ЛИМОН',h:'Жёлтый кислый цитрус.'}],
  [{w:'ШКОЛА',h:'Место, куда дети ходят учиться.'},{w:'СНЕГ',h:'Белые холодные хлопья зимой.'},{w:'ГРИБ',h:'Растёт в лесу, у него есть шляпка.'},{w:'ОКНО',h:'Через него смотрят на улицу.'}]
 ],
 medium:[
  [{w:'КОМПАС',h:'Прибор, который помогает определить стороны света.'},{w:'ПЛАНЕТА',h:'Небесное тело, вращающееся вокруг звезды.'},{w:'РАДУГА',h:'Цветная дуга после дождя.'},{w:'ПИРАМИДА',h:'Геометрическое тело с многоугольным основанием.'},{w:'ЛАБИРИНТ',h:'Запутанная система ходов, из которой ищут выход.'}],
  [{w:'ТЕЛЕСКОП',h:'Оптический прибор для наблюдения за далёкими объектами.'},{w:'БИБЛИОТЕКА',h:'Учреждение, где хранят и выдают книги.'},{w:'ВУЛКАН',h:'Гора, из которой может извергаться лава.'},{w:'МОЛЕКУЛА',h:'Наименьшая частица вещества, сохраняющая его свойства.'},{w:'ОРБИТА',h:'Траектория движения небесного тела.'}],
  [{w:'АРХИПЕЛАГ',h:'Группа островов, расположенных рядом.'},{w:'ГРАВИТАЦИЯ',h:'Сила притяжения между телами.'},{w:'ЭКВАТОР',h:'Воображаемая линия вокруг середины Земли.'},{w:'МЕТЕОРИТ',h:'Космическое тело, достигшее поверхности Земли.'},{w:'КРИСТАЛЛ',h:'Твёрдое тело с упорядоченной внутренней структурой.'}]
 ]
};
let crosswordLevel='easy', crosswordPuzzle=[], crosswordSolved=false;
const CROSSWORD_COOLDOWN=10*60*1000, crosswordKey='ci-crossword-next-reward';
function newCrossword(){const packs=crosswordBank[crosswordLevel],pack=packs[Math.floor(Math.random()*packs.length)];crosswordPuzzle=pack.map(x=>({...x}));crosswordSolved=false;$('crosswordTitle').textContent=crosswordLevel==='easy'?'🟢 Лёгкий уровень':'🟡 Средний уровень';$('crosswordClues').innerHTML=crosswordPuzzle.map((x,i)=>`<label class="crossword-clue"><span><b>${i+1}.</b> ${x.h}<small>${x.w.length} букв</small></span><input data-cross-answer="${i}" maxlength="${x.w.length}" autocomplete="off" spellcheck="false" placeholder="Ответ"></label>`).join('');$('crosswordResult').textContent='Впиши ответы и нажми «Проверить ответы».';const wait=Math.max(0,Number(localStorage.getItem(crosswordKey)||0)-Date.now());$('crosswordCheck').disabled=wait>0;$('crosswordHelp').textContent=wait>0?`Следующая награда будет доступна через ${Math.ceil(wait/60000)} мин.`:'За полностью решённый кроссворд — 5 000 ₽.';}
function setCrosswordLevel(level){crosswordLevel=level;document.querySelectorAll('[data-cross-level]').forEach(b=>b.classList.toggle('active',b.dataset.crossLevel===level));newCrossword();}
document.querySelectorAll('[data-cross-level]').forEach(b=>b.addEventListener('click',()=>setCrosswordLevel(b.dataset.crossLevel)));
$('crosswordCheck').addEventListener('click',async()=>{if(crosswordSolved)return;const wait=Math.max(0,Number(localStorage.getItem(crosswordKey)||0)-Date.now());if(wait>0){$('crosswordResult').textContent=`Награда уже получена. Подожди ещё ${Math.ceil(wait/60000)} мин.`;return;}let correct=0;crosswordPuzzle.forEach((x,i)=>{const input=$(`[data-cross-answer="${i}"]`);const answer=input.value.toLocaleUpperCase('ru-RU').replace(/Ё/g,'Е').replace(/[^А-Я]/g,'');if(answer===x.w.replace(/Ё/g,'Е')){correct++;input.classList.add('correct-answer');input.disabled=true;}else{input.classList.add('wrong-answer');}});if(correct===crosswordPuzzle.length){try{if(demoMode){game.player.balance+=5000;saveDemo();localStorage.setItem(crosswordKey,String(Date.now()+CROSSWORD_COOLDOWN));}else{game=await api('/game/crossword-reward',{level:crosswordLevel,answers:crosswordPuzzle.map(x=>x.w)});}crosswordSolved=true;renderAll();$('crosswordBalance').textContent=money(game.player.balance)+' ₽';$('crosswordResult').textContent='🎉 Отлично! Все ответы верны. Начислено 5 000 ₽.';$('crosswordCheck').disabled=true;}catch(err){$('crosswordResult').textContent=err.message||'Не удалось начислить награду.';$('crosswordCheck').disabled=true;}}else $('crosswordResult').textContent=`Правильно: ${correct} из ${crosswordPuzzle.length}. Исправь выделенные ответы и попробуй ещё раз.`;});
$('crosswordNew').addEventListener('click',()=>newCrossword());
$('transferSend').addEventListener('click',async()=>{const username=$('transferUsername').value.trim().replace(/^@/,'');const amount=Math.floor(Number($('transferAmount').value));const status=$('transferStatus');if(!/^[A-Za-z0-9_]{5,32}$/.test(username)){status.textContent='Введи корректный Telegram username (5–32 символа).';return;}if(!Number.isSafeInteger(amount)||amount<1){status.textContent='Укажи целую сумму больше нуля.';return;}if(!game||amount>game.player.balance){status.textContent='Недостаточно игровых рублей.';return;}if(demoMode){status.textContent='Переводы между пользователями доступны только в опубликованной Telegram Mini App с подключённым сервером. В локальном предпросмотре получателя проверить нельзя.';return;}const btn=$('transferSend');btn.disabled=true;status.textContent='Выполняется перевод…';try{const result=await api('/game/transfer',{username,amount});game=result.state;renderAll();$('transferBalance').textContent=money(game.player.balance)+' ₽';status.textContent=`Перевод ${money(amount)} ₽ пользователю @${result.recipient} выполнен.`;$('transferAmount').value='';}catch(e){status.textContent=e.message||'Не удалось выполнить перевод.';}finally{btn.disabled=false;}});
 $('referralCopy').addEventListener('click',async()=>{
  const button=$('referralCopy'),status=$('referralStatus');
  if(demoMode){status.textContent='Пригласительная ссылка доступна после входа через Telegram.';return;}
  button.disabled=true;status.textContent='Создаём твою ссылку…';
  try{
   const data=await api('/referral/link');
   const field=document.createElement('textarea');field.value=data.link;field.setAttribute('readonly','');field.style.position='fixed';field.style.opacity='0';document.body.appendChild(field);field.select();
   let copied=false;try{await navigator.clipboard.writeText(data.link);copied=true;}catch{}
   if(!copied){try{copied=document.execCommand('copy');}catch{}}
   field.remove();
   $('referralCount').textContent='Приглашённых друзей: '+Number(data.invitedCount||0);
   status.textContent=copied?'Ссылка скопирована! Отправь её другу в Telegram.':'Твоя ссылка: '+data.link;
  }catch(e){status.textContent=e.message||'Не удалось создать ссылку.';}
  finally{button.disabled=false;}
 });
document.querySelector('[data-page="crosswords"]').addEventListener('click',()=>{$('crosswordBalance').textContent=money(game?.player?.balance||0)+' ₽';if(!crosswordPuzzle.length)newCrossword();});
document.querySelector('[data-page="transfers"]').addEventListener('click',async()=>{
 if(!demoMode&&token){try{await refresh();const info=await api('/referral/link');$('referralCount').textContent='Приглашённых друзей: '+Number(info.invitedCount||0);}catch{}}
 $('transferBalance').textContent=money(game?.player?.balance||0)+' ₽';
});

let leaderboardType='balance';
async function renderLeaderboard(type=leaderboardType){
 leaderboardType=type;
 const list=$('leaderboardList');
 const caption=$('leaderCaption');
 const isAssets=leaderboardType==='assets';
 caption.textContent=isAssets?'Топ-100 игроков по стоимости машин, бизнеса и другого имущества':'Топ-100 игроков по размеру игрового баланса';
 document.querySelectorAll('[data-leader-type]').forEach(btn=>btn.classList.toggle('active',btn.dataset.leaderType===leaderboardType));
 if(demoMode){list.innerHTML='<p class="muted leader-empty">Рейтинг доступен после входа через Telegram — в демо-режиме данные других игроков не загружаются.</p>';return;}
 list.innerHTML='<p class="muted leader-empty">Загружаем топ-100 игроков…</p>';
 try{
  const data=await api('/leaderboard?type='+leaderboardType);
  if(!Array.isArray(data.players)||!data.players.length){list.innerHTML='<p class="muted leader-empty">Пока нет зарегистрированных игроков.</p>';return;}
  const field=isAssets?'assetsValue':'balance';
  list.innerHTML=data.players.map(p=>`<article class="leader-row"><span class="leader-rank">${p.rank}</span><span class="leader-name">${escapeHtml(p.name)}</span><b class="leader-value">${money(p[field])} ₽</b></article>`).join('');
 }catch(e){list.innerHTML='<p class="muted leader-empty">'+escapeHtml(e.message||'Не удалось загрузить рейтинг')+'</p>';}
}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}

document.querySelector('[data-page="leaders"]').addEventListener('click',()=>renderLeaderboard());
document.querySelectorAll('[data-leader-type]').forEach(btn=>btn.addEventListener('click',()=>renderLeaderboard(btn.dataset.leaderType)));
// Пока вкладка лидеров открыта, обновляем выбранный рейтинг каждые 5 минут.
setInterval(()=>{if(document.getElementById('leaders')?.classList.contains('active'))renderLeaderboard();},5*60*1000);

// Мягко падающие золотые звёзды по краям фонового биткоина.
(function makeGoldStars(){const layer=$('goldStars');if(!layer)return;for(let i=0;i<24;i++){const star=document.createElement('i');star.className='gold-star';star.textContent='✦';star.style.left=(2+Math.random()*96)+'%';star.style.animationDuration=(9+Math.random()*15)+'s';star.style.animationDelay=(-Math.random()*20)+'s';star.style.fontSize=(8+Math.random()*15)+'px';star.style.opacity=(.12+Math.random()*.3).toFixed(2);layer.appendChild(star);}})();

// Запускаем подключение сразу после инициализации интерфейса.
start().catch(error => {
  const status = document.getElementById('saveStatus');
  if (status) status.textContent = 'Ошибка запуска игры: ' + (error?.message || 'неизвестная ошибка');
});
