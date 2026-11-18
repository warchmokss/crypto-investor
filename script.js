window.__ciMainScriptLoaded = true;
// Показываем ошибки JavaScript прямо в интерфейсе Mini App, чтобы запуск не зависал молча.
(function installStartupDiagnostics(){
  function showStartupError(message){
    const status=document.getElementById('saveStatus');
    if(status){
      status.textContent='Ошибка запуска приложения: '+String(message||'неизвестная ошибка').slice(0,240);
      status.style.color='#ff7777';
      status.style.whiteSpace='normal';
    }
  }
  window.addEventListener('error',event=>{
    showStartupError(event.message||('ошибка в '+(event.filename||'скрипте')+':'+(event.lineno||'?')));
  });
  window.addEventListener('unhandledrejection',event=>{
    const reason=event.reason;
    showStartupError(reason?.message||reason||'ошибка асинхронного запуска');
  });
})();
const UPGRADES = [
  { id:'tap2', name:'Усиленный тап', icon:'👆', description:'Получай 200 ₽ за каждое нажатие.', cost:100000, tap:200 },
  { id:'tap3', name:'Профессиональный тап', icon:'⚡', description:'Получай 300 ₽ за каждое нажатие.', cost:500000, tap:300 },
  { id:'tap4', name:'Универсальный тап', icon:'✨', description:'Получай 400 ₽ за каждое нажатие.', cost:500000, tap:400 }
];
const CAR_PHOTOS = ["https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80","https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80","https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80","https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80","https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80","https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80","https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=900&q=80","https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=900&q=80"];
const ASSETS = {
  cars: [
    {id:'car1',name:"Lada Granta",icon:"\ud83d\ude97",cost:1000000,income:1446,description:"Автомобиль для личного пользования и получения игрового дохода.",visible:false},
    {id:'car2',name:"Lada Vesta",icon:"\ud83d\ude97",cost:1600000,income:2314,description:"Автомобиль для личного пользования и получения игрового дохода.",visible:false},
    {id:'car3',name:"Kia Rio",icon:"\ud83d\ude97",cost:1800000,income:2603,description:"Автомобиль для личного пользования и получения игрового дохода.",visible:false},
    {id:'car4',name:"Hyundai Solaris",icon:"\ud83d\ude97",cost:1700000,income:2488,description:"Автомобиль для личного пользования и получения игрового дохода.",visible:false},
    {id:'car5',name:"Toyota Camry",icon:"\ud83d\ude97",cost:4500000,income:6364,description:"Автомобиль для личного пользования и получения игрового дохода.",visible:false},
    {id:'car6',name:"BMW 3 Series",icon:"\ud83d\ude97",cost:6000000,income:8678,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car7',name:"Mercedes-Benz E-Class",icon:"\ud83d\ude97",cost:8000000,income:11570,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car8',name:"BMW X5",icon:"\ud83d\ude97",cost:12000000,income:17355,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car9',name:"Toyota Land Cruiser",icon:"\ud83d\ude97",cost:15000000,income:21983,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car10',name:"Porsche Cayenne",icon:"\ud83d\ude97",cost:18000000,income:26033,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car11',name:"Toyota Corolla",icon:"\ud83d\ude97",cost:1160000,income:1678,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car12',name:"Toyota RAV4",icon:"\ud83d\ude97",cost:1345600,income:1946,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car13',name:"Toyota Prado",icon:"\ud83d\ude97",cost:1560896,income:2257,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car14',name:"Toyota Supra",icon:"\ud83d\ude97",cost:1810639,income:2619,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car15',name:"Toyota Fortuner",icon:"\ud83d\ude97",cost:2100342,income:3037,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car16',name:"Honda Civic",icon:"\ud83d\ude97",cost:2436396,income:3524,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car17',name:"Honda Accord",icon:"\ud83d\ude97",cost:2826220,income:4088,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car18',name:"Honda CR-V",icon:"\ud83d\ude97",cost:3278415,income:4741,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car19',name:"Honda Pilot",icon:"\ud83d\ude97",cost:3802961,income:5500,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car20',name:"Nissan Qashqai",icon:"\ud83d\ude97",cost:4411435,income:6380,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car21',name:"Nissan X-Trail",icon:"\ud83d\ude97",cost:5117265,income:7401,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car22',name:"Nissan Patrol",icon:"\ud83d\ude97",cost:5936027,income:8585,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car23',name:"Mazda 3",icon:"\ud83d\ude97",cost:6885791,income:9958,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car24',name:"Mazda 6",icon:"\ud83d\ude97",cost:7987518,income:11552,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car25',name:"Mazda CX-5",icon:"\ud83d\ude97",cost:9265521,income:13400,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car26',name:"Mazda CX-9",icon:"\ud83d\ude97",cost:10748004,income:15544,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car27',name:"Volkswagen Polo",icon:"\ud83d\ude97",cost:12467685,income:18031,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car28',name:"Volkswagen Golf",icon:"\ud83d\ude97",cost:14462514,income:20916,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car29',name:"Volkswagen Passat",icon:"\ud83d\ude97",cost:16776517,income:24263,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car30',name:"Volkswagen Tiguan",icon:"\ud83d\ude97",cost:19460759,income:28145,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car31',name:"Skoda Octavia",icon:"\ud83d\ude97",cost:22574481,income:32648,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car32',name:"Skoda Kodiaq",icon:"\ud83d\ude97",cost:26186398,income:37872,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car33',name:"Audi A3",icon:"\ud83d\ude97",cost:30376222,income:43932,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car34',name:"Audi A4",icon:"\ud83d\ude97",cost:35236417,income:50961,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car35',name:"Audi A6",icon:"\ud83d\ude97",cost:40874244,income:59115,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car36',name:"Audi Q5",icon:"\ud83d\ude97",cost:47414123,income:68572,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car37',name:"Audi Q7",icon:"\ud83d\ude97",cost:55000382,income:79544,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car38',name:"Mercedes-Benz C-Class",icon:"\ud83d\ude97",cost:63800444,income:92271,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car39',name:"Mercedes-Benz S-Class",icon:"\ud83d\ude97",cost:74008515,income:107035,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car40',name:"Mercedes-Benz G-Class",icon:"\ud83d\ude97",cost:85849877,income:124160,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car41',name:"BMW 5 Series",icon:"\ud83d\ude97",cost:99585857,income:144026,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car42',name:"BMW 7 Series",icon:"\ud83d\ude97",cost:115519594,income:167070,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car43',name:"BMW X3",icon:"\ud83d\ude97",cost:134002729,income:193801,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car44',name:"BMW X7",icon:"\ud83d\ude97",cost:155443166,income:224810,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car45',name:"Lexus ES",icon:"\ud83d\ude97",cost:180314073,income:260779,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car46',name:"Lexus RX",icon:"\ud83d\ude97",cost:209164324,income:302504,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car47',name:"Lexus LX",icon:"\ud83d\ude97",cost:242630616,income:350905,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car48',name:"Range Rover Sport",icon:"\ud83d\ude97",cost:281451515,income:407050,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car49',name:"Tesla Model 3",icon:"\ud83d\ude97",cost:326483757,income:472177,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car50',name:"Tesla Model S",icon:"\ud83d\ude97",cost:378721158,income:547726,description:"Автомобиль для личного пользования и получения игрового дохода."},
    {id:'car52',name:"Ducati Panigale V4",icon:"🏍️",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Ducati_Panigale_V4_2026.jpg?width=900",cost:36000000,income:520650,description:"Спортивный мотоцикл Ducati Panigale V4."},
    {id:'car53',name:"Lamborghini Aventador",icon:"🏎️",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Lamborghini_Aventador.jpg?width=900",cost:250000000,income:3615625,description:"Оранжевый суперкар Lamborghini Aventador."},
    {id:'car51',name:"Bugatti Chiron",icon:"🏎️",image:"https://commons.wikimedia.org/wiki/Special:FilePath/A_Bugatti_Chiron.jpg?width=900",cost:400000000,income:5785000,description:"Гиперкар Bugatti Chiron — самый дорогой автомобиль коллекции."}
  ],
  businesses: [
    {id:'biz1',name:"Кофейня",icon:"\ud83c\udfe2",cost:3000000,income:5207,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz2',name:"Продуктовый магазин",icon:"\ud83c\udfe2",cost:5000000,income:8678,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz3',name:"Автосалон",icon:"\ud83c\udfe2",cost:25000000,income:43388,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz4',name:"Ресторан",icon:"\ud83c\udfe2",cost:3480000,income:6040,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz5',name:"Пиццерия",icon:"\ud83c\udfe2",cost:4036800,income:7006,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz6',name:"Сеть фастфуда",icon:"\ud83c\udfe2",cost:4682688,income:8127,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz7',name:"Пекарня",icon:"\ud83c\udfe2",cost:5431918,income:9427,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz8',name:"Кондитерская",icon:"\ud83c\udfe2",cost:6301025,income:10936,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz9',name:"Барбершоп",icon:"\ud83c\udfe2",cost:7309189,income:12685,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz10',name:"Салон красоты",icon:"\ud83c\udfe2",cost:8478659,income:14715,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz11',name:"Фитнес-клуб",icon:"\ud83c\udfe2",cost:9835245,income:17069,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz12',name:"Йога-студия",icon:"\ud83c\udfe2",cost:11408884,income:19800,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz13',name:"Автомойка",icon:"\ud83c\udfe2",cost:13234305,income:22968,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz14',name:"Автосервис",icon:"\ud83c\udfe2",cost:15351794,income:26643,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz15',name:"Шиномонтаж",icon:"\ud83c\udfe2",cost:17808081,income:30906,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz16',name:"АЗС",icon:"\ud83c\udfe2",cost:20657374,income:35851,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz17',name:"Гостиница",icon:"\ud83c\udfe2",cost:23962554,income:41587,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz18',name:"Хостел",icon:"\ud83c\udfe2",cost:27796563,income:48241,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz19',name:"Коворкинг",icon:"\ud83c\udfe2",cost:32244013,income:55959,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz20',name:"Офисный центр",icon:"\ud83c\udfe2",cost:37403055,income:64913,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz21',name:"Торговый центр",icon:"\ud83c\udfe2",cost:43387543,income:75299,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz22',name:"Супермаркет",icon:"\ud83c\udfe2",cost:50329550,income:87347,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz23',name:"Мини-маркет",icon:"\ud83c\udfe2",cost:58382278,income:101323,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz24',name:"Аптека",icon:"\ud83c\udfe2",cost:67723443,income:117534,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz25',name:"Стоматология",icon:"\ud83c\udfe2",cost:78559194,income:136339,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz26',name:"Медицинская клиника",icon:"\ud83c\udfe2",cost:91128665,income:158154,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz27',name:"Ветеринарная клиника",icon:"\ud83c\udfe2",cost:105709251,income:183459,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz28',name:"Зоомагазин",icon:"\ud83c\udfe2",cost:122622731,income:212812,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz29',name:"Магазин электроники",icon:"\ud83c\udfe2",cost:142242368,income:246862,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz30',name:"Магазин одежды",icon:"\ud83c\udfe2",cost:165001147,income:286359,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz31',name:"Мебельный салон",icon:"\ud83c\udfe2",cost:191401331,income:332177,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz32',name:"Строительный магазин",icon:"\ud83c\udfe2",cost:222025544,income:385326,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz33',name:"Цветочный салон",icon:"\ud83c\udfe2",cost:257549631,income:446978,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz34',name:"Книжный магазин",icon:"\ud83c\udfe2",cost:298757572,income:518494,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz35',name:"Детский центр",icon:"\ud83c\udfe2",cost:346558783,income:601453,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz36',name:"Частный детский сад",icon:"\ud83c\udfe2",cost:402008188,income:697685,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz37',name:"Образовательный центр",icon:"\ud83c\udfe2",cost:466329499,income:809314,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz38',name:"Языковая школа",icon:"\ud83c\udfe2",cost:540942218,income:938805,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz39',name:"Кинотеатр",icon:"\ud83c\udfe2",cost:627492973,income:1089014,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz40',name:"Игровой клуб",icon:"\ud83c\udfe2",cost:727891849,income:1263257,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz41',name:"Компьютерный клуб",icon:"\ud83c\udfe2",cost:844354545,income:1465378,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz42',name:"Фотостудия",icon:"\ud83c\udfe2",cost:979451272,income:1699838,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz43',name:"Прачечная",icon:"\ud83c\udfe2",cost:1136163475,income:1971811,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz44',name:"Химчистка",icon:"\ud83c\udfe2",cost:1317949632,income:2287302,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz45',name:"Курьерская служба",icon:"\ud83c\udfe2",cost:1528821573,income:2653270,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz46',name:"Логистический склад",icon:"\ud83c\udfe2",cost:1773433024,income:3077793,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz47',name:"Производственный цех",icon:"\ud83c\udfe2",cost:2057182308,income:3570240,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz48',name:"Типография",icon:"\ud83c\udfe2",cost:2386331477,income:4141478,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz49',name:"Рекламное агентство",icon:"\ud83c\udfe2",cost:2768144514,income:4804115,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz50',name:"IT-студия",icon:"\ud83c\udfe2",cost:3211047636,income:5572773,description:"Прибыльное предприятие с регулярным игровым доходом."},
    {id:'biz51',name:"Магнит",icon:"🏢",cost:52000000000,income:12148500,description:"Крупная сеть продуктовых магазинов с игровым доходом."},
    {id:'biz52',name:"Пятёрочка",icon:"🏢",cost:60000000000,income:12727000,description:"Сеть супермаркетов с игровым доходом."},
    {id:'biz53',name:"Grace Shop",icon:"🏭",cost:96000000000,income:27189500,description:"Производственное предприятие с игровым доходом."}
  ],
  stalls: [
    {id:'stall1',name:"Торговый павильон",icon:"\ud83c\udfea",cost:2000000,income:3471,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall2',name:"Цветочный прилавок",icon:"\ud83c\udfea",cost:500000,income:868,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall3',name:"Фуд-корт",icon:"\ud83c\udfea",cost:1500000,income:2603,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall4',name:"Кофейный киоск",icon:"\ud83c\udfea",cost:580000,income:1007,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall5',name:"Шаурма-точка",icon:"\ud83c\udfea",cost:672800,income:1167,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall6',name:"Бургерная стойка",icon:"\ud83c\udfea",cost:780448,income:1354,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall7',name:"Хот-дог киоск",icon:"\ud83c\udfea",cost:905320,income:1571,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall8',name:"Мороженое",icon:"\ud83c\udfea",cost:1050171,income:1823,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall9',name:"Лимонадная стойка",icon:"\ud83c\udfea",cost:1218198,income:2114,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall10',name:"Соковый бар",icon:"\ud83c\udfea",cost:1413110,income:2452,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall11',name:"Блинная",icon:"\ud83c\udfea",cost:1639207,income:2845,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall12',name:"Пончиковая",icon:"\ud83c\udfea",cost:1901481,income:3300,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall13',name:"Попкорн-киоск",icon:"\ud83c\udfea",cost:2205718,income:3828,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall14',name:"Сладкая вата",icon:"\ud83c\udfea",cost:2558632,income:4441,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall15',name:"Овощной ларёк",icon:"\ud83c\udfea",cost:2968014,income:5151,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall16',name:"Фруктовый ларёк",icon:"\ud83c\udfea",cost:3442896,income:5975,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall17',name:"Рыбный прилавок",icon:"\ud83c\udfea",cost:3993759,income:6931,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall18',name:"Мясная лавка",icon:"\ud83c\udfea",cost:4632760,income:8040,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall19',name:"Сырная лавка",icon:"\ud83c\udfea",cost:5374002,income:9327,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall20',name:"Хлебный киоск",icon:"\ud83c\udfea",cost:6233842,income:10819,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall21',name:"Выпечка с собой",icon:"\ud83c\udfea",cost:7231257,income:12550,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall22',name:"Чайный прилавок",icon:"\ud83c\udfea",cost:8388258,income:14558,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall23',name:"Кофе с собой",icon:"\ud83c\udfea",cost:9730380,income:16887,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall24',name:"Мини-пекарня",icon:"\ud83c\udfea",cost:11287240,income:19589,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall25',name:"Сувенирный киоск",icon:"\ud83c\udfea",cost:13093199,income:22723,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall26',name:"Газетный киоск",icon:"\ud83c\udfea",cost:15188111,income:26359,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall27',name:"Книжный стенд",icon:"\ud83c\udfea",cost:17618209,income:30577,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall28',name:"Аксессуары для телефонов",icon:"\ud83c\udfea",cost:20437122,income:35469,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall29',name:"Чехлы и гаджеты",icon:"\ud83c\udfea",cost:23707061,income:41144,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall30',name:"Цветы у метро",icon:"\ud83c\udfea",cost:27500191,income:47727,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall31',name:"Подарочная лавка",icon:"\ud83c\udfea",cost:31900222,income:55363,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall32',name:"Бижутерия",icon:"\ud83c\udfea",cost:37004257,income:64221,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall33',name:"Часы и ремешки",icon:"\ud83c\udfea",cost:42924938,income:74497,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall34',name:"Очки и аксессуары",icon:"\ud83c\udfea",cost:49792929,income:86416,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall35',name:"Косметический островок",icon:"\ud83c\udfea",cost:57759797,income:100242,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall36',name:"Парфюмерный стенд",icon:"\ud83c\udfea",cost:67001365,income:116281,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall37',name:"Игрушечный киоск",icon:"\ud83c\udfea",cost:77721583,income:134886,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall38',name:"Канцтовары",icon:"\ud83c\udfea",cost:90157036,income:156467,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall39',name:"Спортивное питание",icon:"\ud83c\udfea",cost:104582162,income:181502,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall40',name:"Товары для животных",icon:"\ud83c\udfea",cost:121315308,income:210543,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall41',name:"Мобильный ремонт",icon:"\ud83c\udfea",cost:140725757,income:244230,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall42',name:"Ремонт обуви",icon:"\ud83c\udfea",cost:163241879,income:283306,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall43',name:"Ключная мастерская",icon:"\ud83c\udfea",cost:189360579,income:328635,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall44',name:"Фото на документы",icon:"\ud83c\udfea",cost:219658272,income:381217,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall45',name:"Пункт выдачи",icon:"\ud83c\udfea",cost:254803595,income:442212,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall46',name:"Мини-маркет у дома",icon:"\ud83c\udfea",cost:295572171,income:512966,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall47',name:"Фермерский стенд",icon:"\ud83c\udfea",cost:342863718,income:595040,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall48',name:"Медовый прилавок",icon:"\ud83c\udfea",cost:397721913,income:690247,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall49',name:"Орехи и сухофрукты",icon:"\ud83c\udfea",cost:461357419,income:800686,description:"Небольшая торговая точка с постоянным потоком покупателей."},
    {id:'stall50',name:"Специи и приправы",icon:"\ud83c\udfea",cost:535174606,income:928795,description:"Небольшая торговая точка с постоянным потоком покупателей."}
  ],
  apartments: [
    {id:'apt1',name:"Однокомнатная квартира",icon:"\ud83c\udfe0",cost:3000000,income:5207,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt2',name:"Двухкомнатная квартира",icon:"\ud83c\udfe0",cost:3000000,income:5207,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt3',name:"Трёхкомнатная квартира",icon:"\ud83c\udfe0",cost:3000000,income:5207,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt4',name:"Студия в центре",icon:"\ud83c\udfe0",cost:3480000,income:6040,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt5',name:"Студия у метро",icon:"\ud83c\udfe0",cost:4036800,income:7006,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt6',name:"Квартира с балконом",icon:"\ud83c\udfe0",cost:4682688,income:8127,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt7',name:"Квартира с ремонтом",icon:"\ud83c\udfe0",cost:5431918,income:9427,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt8',name:"Квартира в новостройке",icon:"\ud83c\udfe0",cost:6301025,income:10936,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt9',name:"Квартира в старом фонде",icon:"\ud83c\udfe0",cost:7309189,income:12685,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt10',name:"Апартаменты бизнес-класса",icon:"\ud83c\udfe0",cost:8478659,income:14715,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt11',name:"Лофт",icon:"\ud83c\udfe0",cost:9835245,income:17069,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt12',name:"Пентхаус",icon:"\ud83c\udfe0",cost:11408884,income:19800,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt13',name:"Двухуровневая квартира",icon:"\ud83c\udfe0",cost:13234305,income:22968,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt14',name:"Семейная квартира",icon:"\ud83c\udfe0",cost:15351794,income:26643,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt15',name:"Квартира у парка",icon:"\ud83c\udfe0",cost:17808081,income:30906,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt16',name:"Квартира у набережной",icon:"\ud83c\udfe0",cost:20657374,income:35851,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt17',name:"Квартира с террасой",icon:"\ud83c\udfe0",cost:23962554,income:41587,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt18',name:"Квартира с видом на город",icon:"\ud83c\udfe0",cost:27796563,income:48241,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt19',name:"Квартира в спальном районе",icon:"\ud83c\udfe0",cost:32244013,income:55959,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt20',name:"Квартира рядом с вузом",icon:"\ud83c\udfe0",cost:37403055,income:64913,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt21',name:"Квартира рядом с офисами",icon:"\ud83c\udfe0",cost:43387543,income:75299,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt22',name:"Евродвушка",icon:"\ud83c\udfe0",cost:50329550,income:87347,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt23',name:"Евротрёшка",icon:"\ud83c\udfe0",cost:58382278,income:101323,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt24',name:"Четырёхкомнатная квартира",icon:"\ud83c\udfe0",cost:67723443,income:117534,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt25',name:"Пятикомнатная квартира",icon:"\ud83c\udfe0",cost:78559194,income:136339,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt26',name:"Квартира в клубном доме",icon:"\ud83c\udfe0",cost:91128665,income:158154,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt27',name:"Апартаменты в башне",icon:"\ud83c\udfe0",cost:105709251,income:183459,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt28',name:"Квартира премиум-класса",icon:"\ud83c\udfe0",cost:122622731,income:212812,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt29',name:"Квартира с мебелью",icon:"\ud83c\udfe0",cost:142242368,income:246862,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt30',name:"Квартира под аренду",icon:"\ud83c\udfe0",cost:165001147,income:286359,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt31',name:"Таунхаус",icon:"\ud83c\udfe0",cost:191401331,income:332177,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt32',name:"Небольшой загородный дом",icon:"\ud83c\udfe0",cost:222025544,income:385326,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt33',name:"Дуплекс",icon:"\ud83c\udfe0",cost:257549631,income:446978,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt34',name:"Квартира у моря",icon:"\ud83c\udfe0",cost:298757572,income:518494,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt35',name:"Квартира в курортном районе",icon:"\ud83c\udfe0",cost:346558783,income:601453,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt36',name:"Квартира в деловом квартале",icon:"\ud83c\udfe0",cost:402008188,income:697685,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt37',name:"Квартира возле аэропорта",icon:"\ud83c\udfe0",cost:466329499,income:809314,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt38',name:"Квартира возле вокзала",icon:"\ud83c\udfe0",cost:540942218,income:938805,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt39',name:"Квартира в историческом центре",icon:"\ud83c\udfe0",cost:627492973,income:1089014,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt40',name:"Квартира с зимним садом",icon:"\ud83c\udfe0",cost:727891849,income:1263257,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt41',name:"Квартира с камином",icon:"\ud83c\udfe0",cost:844354545,income:1465378,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt42',name:"Квартира с панорамными окнами",icon:"\ud83c\udfe0",cost:979451272,income:1699838,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt43',name:"Квартира с двумя санузлами",icon:"\ud83c\udfe0",cost:1136163475,income:1971811,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt44',name:"Семейный пентхаус",icon:"\ud83c\udfe0",cost:1317949632,income:2287302,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt45',name:"Дизайнерские апартаменты",icon:"\ud83c\udfe0",cost:1528821573,income:2653270,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt46',name:"Резиденция в центре",icon:"\ud83c\udfe0",cost:1773433024,income:3077793,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt47',name:"Элитная квартира",icon:"\ud83c\udfe0",cost:2057182308,income:3570240,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt48',name:"Загородная резиденция",icon:"\ud83c\udfe0",cost:2386331477,income:4141478,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt49',name:"Вилла",icon:"\ud83c\udfe0",cost:2768144514,income:4804115,description:"Недвижимость для сдачи в аренду и пассивного дохода."},
    {id:'apt50',name:"Особняк",icon:"\ud83c\udfe0",cost:3211047636,income:5572773,description:"Недвижимость для сдачи в аренду и пассивного дохода."}
  ]
};
const FOOTBALL_CLUBS = [
  {id:'club_zenit',name:'Зенит',icon:'⚽',costUsd:4880000000,costEur:4481632653,income:4628000,description:'Футбольный клуб · доход начисляется в валюте покупки.'},
  {id:'club_spartak',name:'Спартак Москва',icon:'🔴',costUsd:4270000000,costEur:3921428572,income:4049500,description:'Футбольный клуб · доход начисляется в валюте покупки.'},
  {id:'club_krasnodar',name:'Краснодар',icon:'🟢',costUsd:3660000000,costEur:3361224490,income:3471000,description:'Футбольный клуб · доход начисляется в валюте покупки.'},
  {id:'club_cska',name:'ЦСКА Москва',icon:'🔴',costUsd:3355000000,costEur:3081122449,income:3181750,description:'Футбольный клуб · доход начисляется в валюте покупки.'},
  {id:'club_dynamo',name:'Динамо Москва',icon:'🔵',costUsd:2745000000,costEur:2520918367,income:2603250,description:'Футбольный клуб · доход начисляется в валюте покупки.'},
  {id:'club_lokomotiv',name:'Локомотив Москва',icon:'🟢',costUsd:2440000000,costEur:2240816327,income:2314000,description:'Футбольный клуб · доход начисляется в валюте покупки.'},
  {id:'club_rubin',name:'Рубин',icon:'🔴',costUsd:1830000000,costEur:1680612245,income:1735500,description:'Футбольный клуб · доход начисляется в валюте покупки.'},
  {id:'club_rostov',name:'Ростов',icon:'🟡',costUsd:1525000000,costEur:1400510204,income:1446250,description:'Футбольный клуб · доход начисляется в валюте покупки.'},
  {id:'club_baltika',name:'Балтика',icon:'🔵',costUsd:1098000000,costEur:1008367347,income:1041300,description:'Футбольный клуб · доход начисляется в валюте покупки.'},
  {id:'club_krylia',name:'Крылья Советов',icon:'🟢',costUsd:610000000,costEur:560204082,income:578500,description:'Футбольный клуб · доход начисляется в валюте покупки.'},
  {id:'club_real',name:'Реал Мадрид',icon:'👑',costUsd:18300000000,costEur:16806122449,income:17355000,description:'Футбольный клуб · доход начисляется в валюте покупки.'},
  {id:'club_barcelona',name:'Барселона',icon:'🔵',costUsd:15250000000,costEur:14005102041,income:14462500,description:'Футбольный клуб · доход начисляется в валюте покупки.'},
  {id:'club_manchester_united',name:'Манчестер Юнайтед',icon:'🔴',costUsd:12200000000,costEur:11204081633,income:11570000,description:'Футбольный клуб · доход начисляется в валюте покупки.'},
  {id:'club_psg',name:'Пари Сен-Жермен',icon:'🔵',costUsd:10980000000,costEur:10083673469,income:10413000,description:'Футбольный клуб · доход начисляется в валюте покупки.'},
  {id:'club_manchester_city',name:'Манчестер Сити',icon:'🩵',costUsd:10370000000,costEur:9523469388,income:9834500,description:'Футбольный клуб · доход начисляется в валюте покупки.'},
  {id:'club_liverpool',name:'Ливерпуль',icon:'🔴',costUsd:9760000000,costEur:8963265306,income:9256000,description:'Футбольный клуб · доход начисляется в валюте покупки.'},
  {id:'club_juventus',name:'Ювентус',icon:'⚫',costUsd:9150000000,costEur:8403061224,income:8677500,description:'Футбольный клуб · доход начисляется в валюте покупки.'},
  {id:'club_bayern',name:'Бавария',icon:'🔴',costUsd:8540000000,costEur:7842857143,income:8099000,description:'Футбольный клуб · доход начисляется в валюте покупки.'},
  {id:'club_chelsea',name:'Челси',icon:'🔵',costUsd:7930000000,costEur:7282653061,income:7520500,description:'Футбольный клуб · доход начисляется в валюте покупки.'},
  {id:'club_arsenal',name:'Арсенал',icon:'🔴',costUsd:7320000000,costEur:6722448979,income:6942000,description:'Футбольный клуб · доход начисляется в валюте покупки.'},
  {id:'club_el_vanto',name:'Эль Ванто',icon:'🛡️',costUsd:3050000000,costEur:2801020408,income:2892500,description:'Футбольный клуб · доход начисляется в валюте покупки.'}
];
const CLUB_LOGOS = {
 club_zenit:'FC Zenit 1 star 2015 logo.png',
 club_spartak:'FC Spartak Moscow Logo 2022.jpg',
 club_krylia:'Futbolny klub «Krylia Sovetov» Samara (logo).svg',
 club_rostov:'FK Rostov Logo.png',
 club_baltika:'BaltykaFCLogo2018.png',
 club_real:'Real Madrid CF.svg',
 club_barcelona:'FC Barcelona (crest).svg',
 club_manchester_united:'Manchester United F.C. logo.svg',
 club_psg:'Paris Saint-Germain F.C..svg',
 club_manchester_city:'Manchester City FC badge.svg',
 club_liverpool:'Liverpool FC.svg',
 club_juventus:'Juventus Turin.svg',
 club_bayern:'Bayern Munich logo.png',
 club_chelsea:'Chelsea FC.svg',
 club_arsenal:'Arsenal FC.svg'
};
function clubLogoUrl(id){const file=CLUB_LOGOS[id];return file?'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(file):'';}
function clubBadge(club){if(club.id==='club_el_vanto')return '<div class="club-crest el-vanto-crest" role="img" aria-label="Авторская эмблема Эль Ванто">EV</div>';const url=clubLogoUrl(club.id);return url?'<div class="club-crest"><img src="'+url+'" alt="Эмблема '+club.name+'" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentElement.classList.add(\'club-crest-fallback\');this.remove();"></div>':'<div class="club-crest club-crest-fallback" aria-label="Эмблема '+club.name+'">'+club.icon+'</div>';}

let token=null, game=null, demoMode=false, activeCategory='cars', garageCategory='cars', busy=false, isAdmin=false, adminRole=null, adminTelegramId=null;
const DEMO_KEY='crypto-investor-demo-v1';
function saveDemo(){if(demoMode&&game)localStorage.setItem(DEMO_KEY,JSON.stringify(game));}
function emptyGame(){return {charityDonatedRub:0,bank:{usd:0,eur:0},footballClubs:[],clubPassiveIncome:{USD:0,EUR:0},player:{telegramId:'demo',username:null,firstName:'Игрок',balance:100000,taps:0,tapReward:100},owned:[],purchasedUpgrades:[],propertyLevels:{},passiveIncome:0,caseTokens:0,uniqueItems:{}};}
function normalizeGameState(value){if(!value||typeof value!=='object'||!value.player||typeof value.player!=='object')throw new Error('Игровые данные игрока не получены');return {...value,charityDonatedRub:Number(value.charityDonatedRub)||0,bank:value.bank&&typeof value.bank==='object'?{usd:Number(value.bank.usd)||0,eur:Number(value.bank.eur)||0}:{usd:0,eur:0},footballClubs:Array.isArray(value.footballClubs)?value.footballClubs:[],clubPassiveIncome:value.clubPassiveIncome||{USD:0,EUR:0},player:{...value.player,balance:Number(value.player.balance)||0,taps:Number(value.player.taps)||0,tapReward:Number(value.player.tapReward)||100},owned:Array.isArray(value.owned)?value.owned:[],purchasedUpgrades:Array.isArray(value.purchasedUpgrades)?value.purchasedUpgrades:[],propertyLevels:value.propertyLevels&&typeof value.propertyLevels==='object'?value.propertyLevels:{},passiveIncome:Number(value.passiveIncome)||0,caseTokens:Number(value.caseTokens)||0,uniqueItems:value.uniqueItems&&typeof value.uniqueItems==='object'?value.uniqueItems:{},globalTapBoost:value.globalTapBoost&&typeof value.globalTapBoost==='object'?value.globalTapBoost:{active:false,multiplier:1,expiresAt:null}};}
function loadDemo(){try{const saved=JSON.parse(localStorage.getItem(DEMO_KEY)||'null');if(!saved||!saved.player||typeof saved.player!=='object')return emptyGame();const valid=normalizeGameState(saved);const ids=valid.purchasedUpgrades;valid.player.tapReward=ids.includes('tap4')?400:ids.includes('tap3')?300:ids.includes('tap2')?200:100;localStorage.setItem(DEMO_KEY,JSON.stringify(valid));return valid;}catch{return emptyGame();}}
function levelForTaps(taps){
  const safeTaps=Math.max(0,Math.floor(Number(taps)||0));
  const level=Math.min(999,Math.floor(safeTaps/200)+1);
  const total=(level-1)*200;
  return {level,progress:Math.max(0,safeTaps-total),needed:200,nextThreshold:level*200};
}
function demoApi(path,body={}){
  if(path==='/game/state')return game;
  if(path==='/expenses/state'){
    const now=new Date(),today=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
    game.expenses=Array.isArray(game.expenses)?game.expenses:[];
    if(game.expensesDate!==today){
      const add=(kind,amount,description)=>game.expenses.push({id:'demo-'+kind+'-'+today,kind,amount,description,dueDate:today,paidAt:null});
      const ownedValue=game.owned.reduce((sum,id)=>sum+(allAssets.find(a=>a.id===id)?.cost||0),0);
      add('utilities',Math.max(5000,Math.floor((game.player.balance||0)*0.0003+ownedValue*0.00008)),'Коммунальные платежи за предприятия и недвижимость');
      if(Math.random()<.35)add('traffic',500000+Math.floor(Math.random()*4500001),'Случайный штраф за нарушение ПДД');
      if(game.owned.some(id=>id==='biz47'||id==='biz53')&&Math.random()<.25)add('ecology',5000000+Math.floor(Math.random()*195000001),'Экологический штраф для производства');
      if((game.owned.length||game.footballClubs?.length)&&Math.random()<.22)add('tax',Math.max(1000000,Math.floor((game.player.balance||0)*.001)),'Начисление по результатам налоговой проверки');
      if(game.footballClubs?.length)add('club_upkeep',Math.max(100000,Math.floor(game.footballClubs.length*250000)),'Содержание футбольных клубов, стадионов и персонала');
      game.expensesDate=today;saveDemo();
    }
    return {state:game,bills:game.expenses,balance:game.player.balance};
  }
  if(path==='/expenses/pay'){
    const bill=game.expenses?.find(x=>String(x.id)===String(body.billId));
    if(!bill||bill.paidAt)throw Error('Счёт не найден или уже оплачен.');
    if(game.player.balance<bill.amount)throw Error('Недостаточно игровых рублей для оплаты этого счёта.');
    game.player.balance-=bill.amount;bill.paidAt=new Date().toISOString();saveDemo();
    return {state:game,paid:bill.amount};
  }
  if(path==='/risk/state'){const last=Number(game.riskLastSpinAt)||0;const remainingSeconds=Math.max(0,Math.ceil((last+1800000-Date.now())/1000));return {remainingSeconds,canSpin:remainingSeconds===0,cooldownSeconds:1800};}
  if(path==='/risk/spin'){const last=Number(game.riskLastSpinAt)||0;if(Date.now()-last<1800000)throw Error('Бесплатный раунд будет доступен через 30 минут.');const outcomes=[5000000,-500000,2000000,-1000000,1000000,-2000000,0,-5000000,-100000000,-250000000,-500000000],index=Math.floor(Math.random()*outcomes.length),planned=outcomes[index],delta=planned<0?-Math.min(game.player.balance,Math.abs(planned)):planned;game.player.balance=Math.max(0,game.player.balance+delta);game.riskLastSpinAt=Date.now();saveDemo();return {state:game,delta,index,cooldownSeconds:1800};}
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

  else if(path==='/game/donate'){const amount=Number(body.amount);if(!Number.isSafeInteger(amount)||amount<1)throw Error('Укажи целую сумму в рублях.');if(p.balance<amount)throw Error('Недостаточно игровых рублей.');p.balance-=amount;game.charityDonatedRub=(game.charityDonatedRub||0)+amount;saveDemo();return {state:game,donated:amount,totalDonatedRub:game.charityDonatedRub};}
  else if(path==='/game/claim-starter-pack'){
    if(game.starterPackClaimed)throw Error('Стартовый набор уже получен.');
    game.starterPackClaimed=true;game.caseTokens=(game.caseTokens||0)+1;
  }
  else if(path==='/game/spin-fortune'){
    const prizes=[500000000,100000000,50000000,10000000,5000000,2000000,1000000,500000,100000,50000];
    if(p.balance<50000000)throw Error('Для вращения нужно 50 000 000 ₽.');
    p.balance-=50000000;
    const prize=prizes[Math.floor(Math.random()*prizes.length)];
    p.balance+=prize;saveDemo();return {state:game,prize};
  }
  else if(path==='/game/open-case'){
    const items=[{id:'neon_coin',label:'Неоновая монета'},{id:'pixel_crown',label:'Пиксельная корона'},{id:'blue_flame',label:'Синее пламя'},{id:'cyber_glasses',label:'Кибер-очки'},{id:'golden_badge',label:'Золотой значок'},{id:'holo_cube',label:'Голографический куб'},{id:'star_wings',label:'Звёздные крылья'},{id:'crystal_fox',label:'Кристальный лис'}];
    if(game.caseTokens>0)game.caseTokens--;else{if(p.balance<5000000)throw Error('Нужно 5 000 000 ₽ или билет из стартового набора.');p.balance-=5000000;}
    const item=items[Math.floor(Math.random()*items.length)];
    game.uniqueItems=game.uniqueItems||{};game.uniqueItems[item.id]=(game.uniqueItems[item.id]||0)+1;
    saveDemo();return {state:game,reward:{itemId:item.id,label:item.label}};
  }
  else if(path==='/game/sell-unique-item'){const item=CASE_ITEMS.find(x=>x.id===body.itemId);if(!item||!game.uniqueItems?.[item.id])throw Error('У тебя нет этого предмета');game.uniqueItems[item.id]--;if(!game.uniqueItems[item.id])delete game.uniqueItems[item.id];p.balance+=item.sellPrice;}
  else if(path==='/game/guess-number'){
    const guess=Number(body.guess);
    if(!Number.isInteger(guess)||guess<1||guess>5)throw Error('Выбери целое число от 1 до 5.');
    const number=1+Math.floor(Math.random()*5),correct=guess===number;
    if(correct)p.balance+=10000;
    saveDemo();
    return {state:game,number,correct,reward:correct?10000:0};
  }
  else if(path==='/game/buy-upgrade'){const u=UPGRADES.find(x=>x.id===body.upgradeId);if(!u)throw Error('Неизвестный апгрейд');if(game.purchasedUpgrades.includes(u.id))throw Error('Апгрейд уже куплен');if(p.balance<u.cost)throw Error('Недостаточно монет');p.balance-=u.cost;p.tapReward=u.tap;game.purchasedUpgrades.push(u.id);}
  else if(path==='/bank/exchange'){
    const rates={RUB:1,USD:90,EUR:98},from=body.from,to=body.to,amount=Number(body.amount);
    if(!rates[from]||!rates[to]||from===to||!Number.isFinite(amount)||amount<=0||(from==='RUB'&&!Number.isSafeInteger(amount)))throw Error('Проверь сумму и валюты.');
    const converted=to==='RUB'?Math.floor(amount*rates[from]):Math.floor(amount*rates[from]/rates[to]*100)/100;
    if(from==='RUB'){if(p.balance<amount)throw Error('Недостаточно игровых рублей.');p.balance-=amount;}else{if(game.bank[from.toLowerCase()]<amount)throw Error('Недостаточно средств в банке.');game.bank[from.toLowerCase()]-=amount;}
    if(to==='RUB')p.balance+=converted;else game.bank[to.toLowerCase()]+=converted;
  }
  else if(path==='/game/buy-club'){const club=FOOTBALL_CLUBS.find(x=>x.id===body.clubId),currency=body.currency;if(!club||!['USD','EUR'].includes(currency))throw Error('Неизвестный клуб или валюта.');if(game.footballClubs.some(x=>x.id===club.id))throw Error('Клуб уже куплен.');const cost=currency==='USD'?club.costUsd:club.costEur;if(game.bank[currency.toLowerCase()]<cost)throw Error('Недостаточно '+currency+' в банке.');game.bank[currency.toLowerCase()]-=cost;game.footballClubs.push({id:club.id,currency,level:0});}
  else if(path==='/game/sell-club'){const club=FOOTBALL_CLUBS.find(x=>x.id===body.clubId),owned=game.footballClubs.find(x=>x.id===body.clubId);if(!club||!owned)throw Error('Клуб не принадлежит тебе.');const cost=owned.currency==='USD'?club.costUsd:club.costEur;game.bank[owned.currency.toLowerCase()]+=Math.floor(cost*.7);game.footballClubs=game.footballClubs.filter(x=>x.id!==club.id);}
  else if(path==='/game/upgrade-club'){const club=FOOTBALL_CLUBS.find(x=>x.id===body.clubId),owned=game.footballClubs.find(x=>x.id===body.clubId);if(!club||!owned)throw Error('Сначала приобрети клуб.');if(owned.level>=5)throw Error('Максимальный уровень.');const base=owned.currency==='USD'?club.costUsd:club.costEur,fee=Math.max(1,Math.floor(base*.2));if(game.bank[owned.currency.toLowerCase()]<fee)throw Error('Недостаточно средств в банке.');game.bank[owned.currency.toLowerCase()]-=fee;owned.level++;}
  else if(path==='/game/buy-asset'){const a=allAssets.find(x=>x.id===body.assetId);if(!a)throw Error('Объект не найден');if(game.owned.includes(a.id))throw Error('Объект уже куплен');if(p.balance<a.cost)throw Error('Недостаточно монет');p.balance-=a.cost;game.owned.push(a.id);}
  else if(path==='/game/sell-asset'){const a=allAssets.find(x=>x.id===body.assetId);if(!a||!game.owned.includes(a.id))throw Error('Объект не найден в собственности');p.balance+=Math.floor(a.cost*.7);game.owned=game.owned.filter(id=>id!==a.id);delete game.propertyLevels[a.id];}
  else if(path==='/game/upgrade-asset'){const a=allAssets.find(x=>x.id===body.assetId);if(!a||!game.owned.includes(a.id))throw Error('Сначала купи этот объект');const level=game.propertyLevels[a.id]||0,fee=Math.max(1000,Math.floor(a.cost*.2));if(level>=5)throw Error('Достигнут максимальный уровень');if(p.balance<fee)throw Error('Недостаточно монет');p.balance-=fee;game.propertyLevels[a.id]=level+1;}
  game.clubPassiveIncome={USD:0,EUR:0};game.footballClubs.forEach(x=>{const club=FOOTBALL_CLUBS.find(c=>c.id===x.id);if(club)game.clubPassiveIncome[x.currency]+=Math.floor(club.income*(1+x.level*.25)*2.5);});
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
      cache:'no-store',
      headers:{'Content-Type':'application/json','Cache-Control':'no-cache, no-store',...(token?{Authorization:`Bearer ${token}`}:{})},
      ...(body?{body:JSON.stringify(body)}:{}),
      signal:controller.signal
    });
  } catch(error) {
    if(error.name==='AbortError') throw new Error('Сервер не ответил за 15 секунд. Проверь соединение и нажми «Повторить».');
    throw new Error('Не удалось связаться с игровым сервером. Проверь интернет и попробуй ещё раз.');
  } finally {
    clearTimeout(timeout);
  }
  if(response.status===304) throw new Error('Сервер вернул устаревший ответ. Нажми «Повторить» — приложение запросит свежие данные.');
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
  if(levelText)levelText.textContent=level>=999?'Максимальный уровень':money(progress)+' / 200 тапов';
  if(levelBar)levelBar.style.width=(level>=999?100:Math.min(100,(progress/200)*100))+'%';
  $('upgradeBalance').textContent=money(p.balance)+' ₽';$('businessBalance').textContent=money(p.balance)+' ₽';$('passiveIncome').textContent=money(game.passiveIncome)+' ₽/мин';
  const boost=game.globalTapBoost||{active:false};
  $('tapButton').querySelector('small').textContent=`+${money(p.tapReward*(boost.active?2:1))} ₽ за нажатие`;
  updateGlobalTapBoost();
  $('tapButton').setAttribute('aria-label',`Получить ${p.tapReward} рублей`);
}

function updateGlobalTapBoost(){const badge=$('globalTapBoost'),timer=$('globalTapBoostTimer');if(!badge||!timer)return;const boost=game?.globalTapBoost;if(!boost?.active||!boost.expiresAt){badge.hidden=true;return;}const left=Math.max(0,Math.ceil((new Date(boost.expiresAt).getTime()-Date.now())/1000));if(left<=0){badge.hidden=true;return;}badge.hidden=false;timer.textContent=String(Math.floor(left/60)).padStart(2,'0')+':'+String(left%60).padStart(2,'0');}
setInterval(updateGlobalTapBoost,1000);
function renderUpgrades(){
  $('upgradeGrid').innerHTML=UPGRADES.map(u=>{const bought=game.purchasedUpgrades.includes(u.id);return `<article class="shop-card"><div class="shop-icon">${u.icon}</div><h3>${u.name}</h3><p>${u.description}</p><div class="item-income">Награда за тап: ${u.tap} ₽</div><button class="shop-buy" data-upgrade="${u.id}" ${bought||game.player.balance<u.cost?'disabled':''}>${bought?'Куплено ✓':`Купить · ${money(u.cost)} ₽`}</button></article>`}).join('');
}
function renderPropertyUpgrades(){
  const owned=allAssets.filter(a=>game.owned.includes(a.id)); const grid=$('propertyUpgradeGrid');
  if(!owned.length){grid.innerHTML='<p class="muted">Сначала приобрети имущество во вкладке «Бизнес» — оно появится здесь.</p>';return;}
  grid.innerHTML=owned.map(a=>{const level=game.propertyLevels[a.id]||0,fee=Math.max(1000,Math.floor(a.cost*.2)),maxed=level>=5;return `<article class="shop-card"><div class="shop-vehicle">${a.image?`<img src="${a.image}" alt="${a.name}" loading="lazy">`:`<img src="https://images.unsplash.com/photo-1614218018881-61a0a8019771?auto=format&fit=crop&w=900&q=75" alt="${a.name}" loading="lazy">`}</div><h3>${a.name}</h3><p>Уровень улучшения: <b>${level}/5</b>. Каждый уровень увеличивает доход на 25%.</p><div class="item-income">Текущий доход: +${money(getAssetIncome(a))} ₽/мин</div><button class="shop-buy" data-property-upgrade="${a.id}" ${maxed||game.player.balance<fee?'disabled':''}>${maxed?'Максимальный уровень ✓':`Улучшить · ${money(fee)} ₽`}</button></article>`}).join('');
}
function renderBusinesses(){
  if(activeCategory==='football'){
    $('businessGrid').innerHTML=FOOTBALL_CLUBS.map(club=>{const owned=game.footballClubs.find(x=>x.id===club.id),usd=money(club.costUsd),eur=money(club.costEur),income=money(club.income/1000000*(1+(owned?.level||0)*.25)*2.5);
      return `<article class="shop-card football-club-card">${clubBadge(club)}<h3>${club.name}</h3><p>${club.description}</p><div class="item-income">Цена: $${money(club.costUsd/1000000000)} млрд / €${money(club.costEur/1000000000)} млрд<br>Доход: +${income} млн ${owned?.currency||'USD'}/мин</div>${owned?`<p>Уровень: <b>${owned.level}/5</b></p><div class="trade-actions"><button class="shop-buy" data-upgrade-club="${club.id}" ${owned.level>=5?'disabled':''}>Улучшить +25%</button><button class="shop-sell" data-sell-club="${club.id}">Продать · 70%</button></div>`:`<div class="trade-actions"><button class="shop-buy" data-buy-club="${club.id}" data-currency="USD">Купить за $${usd}</button><button class="shop-buy" data-buy-club="${club.id}" data-currency="EUR">Купить за €${eur}</button></div>`}</article>`;
    }).join('');
    renderGarage();renderPropertyUpgrades();return;
  }
  const items=ASSETS[activeCategory].filter(a=>a.visible!==false);
  $('businessGrid').innerHTML=items.map((a,index)=>{
    const bought=game.owned.includes(a.id),resale=Math.floor(a.cost*.7);
    const carIndex=ASSETS.cars.findIndex(car=>car.id===a.id);const photo=carIndex>=0?(a.image||CAR_PHOTOS[carIndex%CAR_PHOTOS.length]):null;
    const visual=photo?`<div class="shop-vehicle"><img src="${photo}" alt="${a.name}" loading="lazy"></div>`:`<div class="shop-icon">${a.icon}</div>`;
    return `<article class="shop-card">${visual}<h3>${a.name}</h3><p>${a.description}</p><div class="item-income">Цена: ${money(a.cost)} ₽ · Доход: +${money(a.income)} ₽/мин</div><div class="trade-actions"><button class="shop-buy" data-asset="${a.id}" ${bought||game.player.balance<a.cost?'disabled':''}>${bought?'Куплено ✓':`Купить · ${money(a.cost)} ₽`}</button>${bought?`<button class="shop-sell" data-sell="${a.id}">Продать · ${money(resale)} ₽</button>`:''}</div></article>`;
  }).join('');
  renderGarage(); renderPropertyUpgrades();
}
function renderGarage(){
  const categories=['cars','apartments','businesses','stalls'];
  const labels={football:'⚽ Футбольные клубы',unique:"₿ Уникальные предметы",portfolio:'📈 Мой портфель',cars:'🚗 Автомобили',apartments:'🏠 Недвижимость',businesses:'🏢 Собственность',stalls:'🛍️ Торговые площадки'};
  const footballCount=$('garageCountFootball');if(footballCount)footballCount.textContent=`${(game.footballClubs||[]).length} клубов`;categories.forEach(k=>{const count=ASSETS[k].filter(a=>game.owned.includes(a.id)).length;const el=$('garageCount'+k[0].toUpperCase()+k.slice(1));if(el)el.textContent=`${count} объектов`;});const uniqueCount=$('garageCountUnique');if(uniqueCount)uniqueCount.textContent=`${Object.values(game.uniqueItems||{}).reduce((sum,n)=>sum+Number(n||0),0)} предметов`;const portfolioCount=$('garageCountPortfolio');if(portfolioCount)portfolioCount.textContent=`${Object.values(marketPortfolio||{}).filter(v=>Number(v&&typeof v==='object'?v.quantity:v)>0).length} активов`;
  const owned=['unique','portfolio','football'].includes(garageCategory)?[]:ASSETS[garageCategory].filter(a=>game.owned.includes(a.id));$('garageTitle').textContent=labels[garageCategory];
  if(garageCategory==='portfolio'){renderMarketHoldings();return;}if(garageCategory==='football'){$('garageGrid').innerHTML=(game.footballClubs||[]).map(x=>{const club=FOOTBALL_CLUBS.find(c=>c.id===x.id);return club?`<article class="shop-card football-club-card">${clubBadge(club)}<h3>${club.name}</h3><p>Уровень: ${x.level}/5 · Валюта дохода: ${x.currency}</p><div class="item-income">+${money(club.income*(1+x.level*.25)*2.5)} ${x.currency}/мин</div><button class="shop-sell" data-sell-club="${x.id}">Продать · 70%</button></article>`:''}).join('')||'<p class="muted">Футбольных клубов пока нет.</p>';return;}
  $('garageGrid').innerHTML=garageCategory==='unique'?(Object.entries(game.uniqueItems||{}).filter(([id,count])=>Number(count)>0).length?Object.entries(game.uniqueItems||{}).filter(([id,count])=>Number(count)>0).map(([id,count])=>{const item=CASE_ITEMS.find(x=>x.id===id);return item?'<article class="case-prize unique"><span>'+item.icon+'</span><h3>'+item.name+'</h3><p>В коллекции: '+money(count)+'</p><small>'+item.rarity+' · косметический предмет</small><button class="shop-sell" data-unique-sell="'+item.id+'">Продать · '+money(item.sellPrice)+' ₽</button></article>':''}).join(''):'<p class="muted empty-garage">Пока нет уникальных предметов. Открой Стандартный кейс.</p>'):owned.length?owned.map(a=>`<article class="shop-card"><div class="shop-vehicle">${a.image?`<img src="${a.image}" alt="${a.name}" loading="lazy">`:`<img src="https://images.unsplash.com/photo-1614218018881-61a0a8019771?auto=format&fit=crop&w=900&q=75" alt="${a.name}" loading="lazy">`}</div><h3>${a.name}</h3><p>${a.description}</p><div class="item-income">Доход: +${money(getAssetIncome(a))} ₽/мин</div><button class="shop-sell" data-garage-sell="${a.id}">Продать · ${money(Math.floor(a.cost*.7))} ₽</button></article>`).join(''):'<p class="muted empty-garage">В этом разделе пока ничего нет. Купи объект во вкладке «Бизнес» — он появится здесь автоматически.</p>';
}

function renderBankPreview(){const p=$('bankPreview'),a=$('bankAmount'),f=$('bankFrom'),t=$('bankTo');if(!p||!a||!f||!t)return;const n=Number(a.value),from=f.value,to=t.value;if(!a.value||!Number.isFinite(n)||n<=0){p.textContent='Сумма к получению появится здесь после ввода суммы.';return;}if(from===to){p.textContent='Выбери разные валюты для обмена.';return;}const r={RUB:1,USD:90,EUR:98},v=to==='RUB'?Math.floor(n*r[from]):Math.floor(n*r[from]/r[to]*100)/100,s={RUB:' ₽',USD:' $',EUR:' €'};p.textContent='Ты получишь: '+v.toLocaleString('ru-RU',{maximumFractionDigits:2})+s[to];}
function renderBank(){
 const bank=game?.bank||{usd:0,eur:0};
 $('bankRUB').textContent=money(game?.player?.balance||0)+' ₽';
 $('bankUSD').textContent=Number(bank.usd||0).toLocaleString('ru-RU',{maximumFractionDigits:2})+' $';
 $('bankEUR').textContent=Number(bank.eur||0).toLocaleString('ru-RU',{maximumFractionDigits:2})+' €';
 $('bankIncome').textContent='Доход клубов: '+money(game?.clubPassiveIncome?.USD||0)+' $/мин · '+money(game?.clubPassiveIncome?.EUR||0)+' €/мин';
 renderBankPreview();
}
function renderExpenses(data){
 const bills=Array.isArray(data?.bills)?data.bills:[];
 const open=bills.filter(x=>!x.paidAt);
 const total=open.reduce((sum,x)=>sum+(Number(x.amount)||0),0);
 if($('expensesBalance'))$('expensesBalance').textContent=money(game?.player?.balance||0)+' ₽';
 if($('expensesDueTotal'))$('expensesDueTotal').textContent=money(total)+' ₽';
 if($('expensesDueCount'))$('expensesDueCount').textContent=String(open.length);
 const list=$('expensesList');if(!list)return;
 const icons={traffic:'🚗',ecology:'🌱',tax:'🏛️',club_upkeep:'⚽',utilities:'💡'};
 const names={traffic:'Штраф за ПДД',ecology:'Экологический штраф',tax:'Налоговая проверка',club_upkeep:'Содержание футбольных клубов',utilities:'Коммунальные платежи'};
 list.innerHTML=bills.length?bills.map(x=>{const paid=!!x.paidAt,confiscated=!!x.confiscatedAt;const deadline=x.kind==='tax'&&!paid&&!confiscated&&x.confiscationAt?'Срок оплаты до '+new Date(x.confiscationAt).toLocaleString('ru-RU')+'. Если не оплатить, имущество будет конфисковано.':'';const summary=x.confiscatedSummary||{};const seized=confiscated?'Конфисковано имущество: '+((summary.businesses||0)+(summary.clubs||0)+(summary.marketAssets||0)+(summary.collectibles||0))+' объектов.':'';return '<article class="expense-row '+((paid||confiscated)?'expense-paid':'')+'"><div class="expense-row-icon">'+(icons[x.kind]||'🧾')+'</div><div class="expense-row-main"><b>'+ (names[x.kind]||'Игровой счёт')+'</b><p>'+x.description+'</p><small>'+ (confiscated?'Имущество конфисковано':paid?'Оплачено':'К оплате')+' · '+(x.dueDate||'')+'</small>'+(deadline?'<p class="expense-warning">⚠️ '+deadline+'</p>':'')+(seized?'<p class="expense-warning">'+seized+'</p>':'')+'</div><div class="expense-row-side"><strong>'+money(x.amount)+' ₽</strong>'+(confiscated?'<span class="expense-paid-label">Конфискация</span>':paid?'<span class="expense-paid-label">Оплачено ✓</span>':'<button class="shop-buy" data-pay-expense="'+x.id+'" '+((game?.player?.balance||0)<x.amount?'disabled':'')+'>Оплатить</button>')+'</div></article>';}).join(''):'<p class="muted">Пока начислений нет. Новые счета появятся по игровым правилам.</p>';
}
async function loadExpenses(){
 const status=$('expensesStatus');if(status)status.textContent='Обновляем счета…';
 try{const data=await api('/expenses/state');game=normalizeGameState(data.state);renderAll();renderExpenses(data);if(status)status.textContent='Счета обновлены. Ничего не списывается без твоего нажатия.';}
 catch(e){if(status)status.textContent=e.message||'Не удалось загрузить счета.';}
}
$('expensesList')?.addEventListener('click',async e=>{
 const btn=e.target.closest('[data-pay-expense]');if(!btn||btn.disabled||busy)return;
 if(!confirm('Оплатить игровой счёт на '+money(Number(btn.dataset.amount||btn.closest('.expense-row')?.querySelector('strong')?.textContent?.replace(/[^0-9]/g,'')))+' ₽?'))return;
 busy=true;btn.disabled=true;
 try{const result=await api('/expenses/pay',{billId:btn.dataset.payExpense});game=normalizeGameState(result.state);renderAll();await loadExpenses();}
 catch(err){const status=$('expensesStatus');if(status)status.textContent=err.message||'Не удалось оплатить счёт.';btn.disabled=false;}
 finally{busy=false;}
});
document.querySelector('[data-page="expenses"]')?.addEventListener('click',loadExpenses);
function renderAll(){
 if(!game||!game.player)return;
 updateDisplay();renderBank();renderUpgrades();renderBusinesses();renderGarage();renderBusinessGiftOptions();
 if(typeof updateCaseUI==='function')updateCaseUI();
 if(typeof renderTournaments==='function')renderTournaments();
 if(typeof renderMarket==='function'&&$('exchange')?.classList.contains('active'))renderMarket();
}
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
function showReferralRewardPopup(reward){const popup=$('bonusPopup');if(!popup||!reward)return;popup.textContent='🎁 БОНУС ЗА ПРИГЛАШЕНИЕ +'+money(reward)+' ₽';popup.classList.remove('show');void popup.offsetWidth;popup.classList.add('show');showFireworks();setTimeout(()=>popup.classList.remove('show'),3500);}
async function refresh(){
 game=normalizeGameState(await api('/game/state'));
 if(!demoMode){
  const data=await api('/market/state');
  applyMarketSnapshot(data.market);
 }
 renderAll();
}
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
  // Отправляем на сервер только диагностические признаки, без initData и личных данных.
  fetch('/api/telegram/boot-check',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      sdkPresent:true,
      initDataPresent:!!tg.initData,
      initDataLength:String(tg.initData||'').length,
      platform:String(tg.platform||''),
      version:String(tg.version||'')
    }),
    cache:'no-store'
  }).catch(()=>{});
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
    if(Number(authData.referralReward)>0){showReferralRewardPopup(Number(authData.referralReward));$('tapMessage').textContent='За первый вход по пригласительной ссылке начислено '+money(authData.referralReward)+' ₽!';}
    await loadDailyState();
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
$('tapButton')?.addEventListener('click',()=>{
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
document.addEventListener('click',function(event){var btn=event.target.closest('button.nav-btn[data-page]');if(!btn)return;var id=btn.getAttribute('data-page');var target=document.getElementById(id);if(!target)return;event.preventDefault();document.querySelectorAll('button.nav-btn[data-page]').forEach(function(b){b.classList.toggle('active',b===btn);});document.querySelectorAll('.page').forEach(function(p){var selected=p===target;p.classList.toggle('active',selected);p.hidden=!selected;p.style.setProperty('display',selected?'block':'none','important');p.style.setProperty('visibility',selected?'visible':'hidden','important');});var main=target.closest('main');if(main){main.hidden=false;main.style.setProperty('display','block','important');}if(id==='leaders'&&typeof renderLeaderboard==='function')renderLeaderboard(leaderboardType);if(id==='bank'&&typeof renderBank==='function')renderBank();if(id==='transfers'&&typeof game!=='undefined'&&game&&game.player){var balance=document.getElementById('transferBalance');if(balance)balance.textContent=money(game.player.balance)+' ₽';}window.scrollTo(0,0);},true);
document.querySelectorAll('[data-store-panel]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-store-panel]').forEach(x=>x.classList.toggle('active',x===btn));document.querySelectorAll('.store-panel').forEach(panel=>panel.classList.toggle('active',panel.id===btn.dataset.storePanel));if(btn.dataset.storePanel==='fortune')loadFortuneCooldown();}));
$('upgradeGrid')?.addEventListener('click',e=>{const b=e.target.closest('[data-upgrade]');if(b)action(()=>api('/game/buy-upgrade',{upgradeId:b.dataset.upgrade}),'Апгрейд куплен!');});
$('businessCategories')?.addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll('.category-btn').forEach(x=>x.classList.toggle('active',x===b));renderBusinesses();});
$('businessGrid')?.addEventListener('click',e=>{const sell=e.target.closest('[data-sell]');if(sell){if(confirm('Продать этот объект за 70% его цены?'))action(()=>api('/game/sell-asset',{assetId:sell.dataset.sell}),'Объект продан!');return;}const b=e.target.closest('[data-asset]');if(b)action(()=>api('/game/buy-asset',{assetId:b.dataset.asset}),'Поздравляем с покупкой!');});
$('garageGrid')?.addEventListener('click',async e=>{const unique=e.target.closest('[data-unique-sell]');if(unique){const item=CASE_ITEMS.find(x=>x.id===unique.dataset.uniqueSell);if(item&&confirm('Продать '+item.name+' за '+money(item.sellPrice)+' ₽?'))action(()=>api('/game/sell-unique-item',{itemId:item.id}),'Уникальный предмет продан!');return;}const marketSell=e.target.closest('[data-market-sell]');if(marketSell){const id=marketSell.dataset.marketSell;const asset=MARKET_ASSETS.find(x=>x.id===id);const saved=marketPortfolio[id],qty=saved&&typeof saved==='object'?Number(saved.quantity)||0:Number(saved)||0;if(asset&&qty>0&&confirm('Продать все '+qty+' '+asset.ticker+' по текущей игровой котировке?')){if(demoMode){const price=marketPrices[id]||asset.price,proceeds=Math.floor(price*qty);delete marketPortfolio[id];marketHistory.unshift({asset_id:id,side:'sell',quantity:qty,price,total:proceeds,created_at:new Date().toISOString()});game.player.balance+=proceeds;saveDemo();saveMarketDemo();renderAll();$('marketStatus').textContent='Продано '+asset.ticker+'. На баланс зачислено '+money(proceeds)+' игровых ₽.';}else{try{const result=await api('/market/trade',{assetId:id,side:'sell',quantity:qty});game=normalizeGameState(result.state);applyMarketSnapshot(result.market);renderAll();$('marketStatus').textContent='Продано '+asset.ticker+'. Средства зачислены на игровой баланс.';}catch(err){$('marketStatus').textContent=err.message||'Не удалось продать актив.';}}}return;}const b=e.target.closest('[data-garage-sell]');if(b&&confirm('Продать этот объект за 70% его цены?'))action(()=>api('/game/sell-asset',{assetId:b.dataset.garageSell}),'Объект продан!');});
['bankAmount','bankFrom','bankTo'].forEach(id=>{const field=$(id);if(field){field.addEventListener('input',renderBankPreview);field.addEventListener('change',renderBankPreview);}});
 $('bankExchange')?.addEventListener('click',async()=>{const from=$('bankFrom').value,to=$('bankTo').value,amount=Number($('bankAmount').value),status=$('bankStatus');if(!Number.isFinite(amount)||amount<=0||(from==='RUB'&&!Number.isSafeInteger(amount))){status.textContent='Введи корректную сумму.';return;}try{game=normalizeGameState(await api('/bank/exchange',{from,to,amount}));renderAll();status.textContent='Обмен выполнен. Курс игровой: 1 $ = 90 ₽, 1 € = 98 ₽.';}catch(e){status.textContent=e.message||'Не удалось выполнить обмен.';}});
$('businessGrid')?.addEventListener('click',e=>{const buy=e.target.closest('[data-buy-club]');if(buy){action(()=>api('/game/buy-club',{clubId:buy.dataset.buyClub,currency:buy.dataset.currency}),'Футбольный клуб куплен!');return;}const sell=e.target.closest('[data-sell-club]');if(sell){if(confirm('Продать футбольный клуб за 70% цены?'))action(()=>api('/game/sell-club',{clubId:sell.dataset.sellClub}),'Клуб продан!');return;}const upgrade=e.target.closest('[data-upgrade-club]');if(upgrade){action(()=>api('/game/upgrade-club',{clubId:upgrade.dataset.upgradeClub}),'Клуб улучшен на 25%!');}});
$('garageGrid')?.addEventListener('click',e=>{const sell=e.target.closest('[data-sell-club]');if(sell&&confirm('Продать клуб за 70% цены?'))action(()=>api('/game/sell-club',{clubId:sell.dataset.sellClub}),'Клуб продан!');});
document.querySelectorAll('[data-garage]').forEach(b=>b.addEventListener('click',()=>{garageCategory=b.dataset.garage;document.querySelectorAll('[data-garage]').forEach(x=>x.classList.toggle('active',x===b));renderGarage();}));
$('propertyUpgradeGrid')?.addEventListener('click',e=>{const b=e.target.closest('[data-property-upgrade]');if(b)action(()=>api('/game/upgrade-asset',{assetId:b.dataset.propertyUpgrade}),'Имущество улучшено!');});
window.addEventListener('focus',()=>{if(token&&!busy)refresh().then(()=>loadDailyState()).catch(()=>{});});


// Игра «Угадай число»: награда начисляется сервером только за верный ответ.
function updateGuessBalance(){if($('betBalance'))$('betBalance').textContent=money(game?.player?.balance||0)+' ₽';}
$('guessButtons')?.addEventListener('click',async e=>{
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
document.querySelector('[data-page="bets"]')?.addEventListener('click',updateGuessBalance);
const tapButton=$('tapButton');
tapButton?.addEventListener('click',e=>{e.preventDefault();const r=tapButton.getBoundingClientRect(),el=document.createElement('span');el.className='tap-float';el.textContent='+'+money(game?.player?.tapReward||100)+' ₽';el.style.left=(r.left+r.width/2)+'px';el.style.top=(r.top+20)+'px';document.body.appendChild(el);setTimeout(()=>el.remove(),650);},{passive:false});



$('charityDonate')?.addEventListener('click',async()=>{const amount=Math.floor(Number($('charityAmount').value)),status=$('charityStatus'),btn=$('charityDonate');if(!Number.isSafeInteger(amount)||amount<1){status.textContent='Укажи целую сумму в рублях больше нуля.';return;}if(!game||amount>game.player.balance){status.textContent='Недостаточно игровых рублей.';return;}if(demoMode){game.player.balance-=amount;game.charityDonatedRub=(game.charityDonatedRub||0)+amount;saveDemo();renderAll();$('charityBalance').textContent=money(game.player.balance)+' ₽';$('charityPersonalTotal').textContent=money(game.charityDonatedRub)+' ₽';$('charityAmount').value='';status.textContent='Пожертвовано '+money(amount)+' игровых ₽. Демо-режим: только на этом устройстве.';return;}btn.disabled=true;status.textContent='Оформляем пожертвование…';try{const result=await api('/game/donate',{amount});game=normalizeGameState(result.state);renderAll();$('charityBalance').textContent=money(game.player.balance)+' ₽';$('charityPersonalTotal').textContent=money(game.charityDonatedRub)+' ₽';$('charityAmount').value='';status.textContent='Пожертвование '+money(amount)+' ₽ успешно внесено в игровой фонд!';await renderCharityStats();}catch(e){status.textContent=e.message||'Не удалось оформить пожертвование.';}finally{btn.disabled=false;}});
async function renderCharityStats(){const total=$('charityGlobalTotal');if(!total)return;if(demoMode){total.textContent='Демо: '+money(game?.charityDonatedRub||0)+' ₽';return;}try{const data=await api('/charity/stats');total.textContent=money(data.totalDonatedRub||0)+' ₽';}catch{total.textContent='Не удалось загрузить';}}
document.querySelector('[data-page="charity"]')?.addEventListener('click',async()=>{if(!game)return;$('charityBalance').textContent=money(game.player.balance)+' ₽';$('charityPersonalTotal').textContent=money(game.charityDonatedRub||0)+' ₽';await renderCharityStats();});
function renderBusinessGiftOptions(){
 const select=$('giftBusinessSelect'),button=$('giftBusinessSend');
 if(!select||!button||!game)return;
 const previous=select.value;
 const owned=ASSETS.businesses.filter(a=>game.owned.includes(a.id));
 select.innerHTML=owned.length?'<option value="">Выбери бизнес</option>'+owned.map(a=>'<option value="'+a.id+'">'+a.name+'</option>').join(''):'<option value="">У тебя пока нет бизнесов</option>';
 if(owned.some(a=>a.id===previous))select.value=previous;
 select.disabled=owned.length===0;
 button.disabled=owned.length===0||!select.value;
}
$('giftBusinessSelect')?.addEventListener('change',()=>{const b=$('giftBusinessSend');if(b)b.disabled=!$('giftBusinessSelect').value;});
$('giftBusinessSend')?.addEventListener('click',async()=>{
 const username=$('giftBusinessUsername').value.trim().replace(/^@/,'');
 const assetId=$('giftBusinessSelect').value;
 const status=$('giftBusinessStatus'),btn=$('giftBusinessSend');
 if(!assetId){status.textContent='Выбери бизнес, который хочешь подарить.';return;}
 if(!/^[A-Za-z0-9_]{5,32}$/.test(username)){status.textContent='Введи корректный Telegram username (5–32 символа).';return;}
 if(demoMode){status.textContent='Дарение между игроками доступно в опубликованной игре через Telegram с подключённым сервером.';return;}
 btn.disabled=true;status.textContent='Передаём бизнес…';
 try{
  const result=await api('/game/gift-business',{username,assetId});
  game=normalizeGameState(result.state);renderAll();
  status.textContent='Бизнес «'+result.businessName+'» успешно подарен игроку @'+result.recipient+'.';
  $('giftBusinessUsername').value='';
 }catch(e){status.textContent=e.message||'Не удалось подарить бизнес.';}
 finally{btn.disabled=false;renderBusinessGiftOptions();}
});
$('transferSend')?.addEventListener('click',async()=>{const username=$('transferUsername').value.trim().replace(/^@/,'');const amount=Math.floor(Number($('transferAmount').value));const status=$('transferStatus');if(!/^[A-Za-z0-9_]{5,32}$/.test(username)){status.textContent='Введи корректный Telegram username (5–32 символа).';return;}if(!Number.isSafeInteger(amount)||amount<1){status.textContent='Укажи целую сумму больше нуля.';return;}if(!game||amount>game.player.balance){status.textContent='Недостаточно игровых рублей.';return;}if(demoMode){status.textContent='Переводы между пользователями доступны только в опубликованной Telegram Mini App с подключённым сервером. В локальном предпросмотре получателя проверить нельзя.';return;}const btn=$('transferSend');btn.disabled=true;status.textContent='Выполняется перевод…';try{const result=await api('/game/transfer',{username,amount});game=result.state;renderAll();$('transferBalance').textContent=money(game.player.balance)+' ₽';status.textContent=`Перевод ${money(amount)} ₽ пользователю @${result.recipient} выполнен. Комиссия 7%: ${money(result.commission)} ₽. Получатель получил ${money(result.received)} ₽.`;$('transferAmount').value='';}catch(e){status.textContent=e.message||'Не удалось выполнить перевод.';}finally{btn.disabled=false;}});
 $('referralCopy')?.addEventListener('click',async()=>{
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
    $('referralRewardTotal').textContent='Получено за приглашения: '+money(data.totalReward||0)+' ₽';
   status.textContent=copied?'Ссылка скопирована! Другу нужно открыть бота по ссылке и нажать «Играть». После первого входа вам обоим начислится по 100 000 ₽.':'Твоя ссылка: '+data.link;
  }catch(e){status.textContent=e.message||'Не удалось создать ссылку.';}
  finally{button.disabled=false;}
 });

$('referralShare')?.addEventListener('click',async()=>{
  const button=$('referralShare'),status=$('referralStatus');
  if(demoMode){status.textContent='Ссылка доступна после входа через Telegram.';return;}
  button.disabled=true;status.textContent='Готовим ссылку для отправки…';
  try{
    const data=await api('/referral/link');
    const shareUrl='https://t.me/share/url?url='+encodeURIComponent(data.link)+'&text='+encodeURIComponent('Присоединяйся к CRYPTO INVESTOR! За первый вход по моей ссылке нам обоим начислят по 100 000 ₽.');
    const tg=window.Telegram?.WebApp;
    if(tg?.openTelegramLink) tg.openTelegramLink(shareUrl);
    else if(navigator.share) await navigator.share({title:'CRYPTO INVESTOR',text:'Присоединяйся к игре!',url:data.link});
    else {status.textContent='Отправь другу эту ссылку: '+data.link;return;}
    status.textContent='Открылось окно Telegram для отправки ссылки. Другу нужно нажать «Играть» в боте и запустить игру.';
  }catch(e){status.textContent=e.message||'Не удалось подготовить ссылку.';}
  finally{button.disabled=false;}
});

document.querySelector('[data-page="transfers"]')?.addEventListener('click',async()=>{
 if(!demoMode&&token){try{await refresh();const info=await api('/referral/link');$('referralCount').textContent='Приглашённых друзей: '+Number(info.invitedCount||0);$('referralRewardTotal').textContent='Получено за приглашения: '+money(info.totalReward||0)+' ₽';if(Number(info.totalReward)>0)$('referralStatus').textContent='Бонусы за приглашённых друзей уже начислены на твой баланс.';}catch{}}
 $('transferBalance').textContent=money(game?.player?.balance||0)+' ₽';
});

let leaderboardType='balance';
async function renderLeaderboard(type=leaderboardType){
 leaderboardType=type;
 const list=$('leaderboardList');
 const caption=$('leaderCaption');
 const isAssets=leaderboardType==='assets';
 const isCharity=leaderboardType==='charity';
 caption.textContent=isCharity?'Топ-100 игроков по сумме благотворительных пожертвований':isAssets?'Топ-100 игроков по стоимости машин, бизнеса и другого имущества':'Forbes: топ-100 богатейших игроков по общему состоянию';
 document.querySelectorAll('[data-leader-type]').forEach(btn=>btn.classList.toggle('active',btn.dataset.leaderType===leaderboardType));
 if(demoMode){list.innerHTML='<p class="muted leader-empty">Рейтинг доступен после входа через Telegram — в демо-режиме данные других игроков не загружаются.</p>';return;}
 list.innerHTML='<p class="muted leader-empty">Загружаем топ-100 игроков…</p>';
 try{
  const data=await api('/leaderboard?type='+leaderboardType);
  if(!Array.isArray(data.players)||!data.players.length){list.innerHTML='<p class="muted leader-empty">Пока нет зарегистрированных игроков.</p>';return;}
  const field=isCharity?'charityValue':isAssets?'assetsValue':'wealth';
  list.innerHTML=data.players.map(p=>`<article class="leader-row"><span class="leader-rank">${p.rank}</span><span class="leader-name">${escapeHtml(p.name)}</span><b class="leader-value">${money(p[field])} ₽</b></article>`).join('');
 }catch(e){list.innerHTML='<p class="muted leader-empty">'+escapeHtml(e.message||'Не удалось загрузить рейтинг')+'</p>';}
}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}

document.querySelector('[data-page="leaders"]')?.addEventListener('click',()=>renderLeaderboard());
document.querySelectorAll('[data-leader-type]').forEach(btn=>btn.addEventListener('click',()=>renderLeaderboard(btn.dataset.leaderType)));
// Пока вкладка лидеров открыта, обновляем выбранный рейтинг каждые 5 минут.
setInterval(()=>{if(document.getElementById('leaders')?.classList.contains('active'))renderLeaderboard();},5*60*1000);


/* Игровая биржа: в Telegram покупки и портфель сохраняются на сервере. */
const MARKET_ASSETS=[
 {id:'btc',name:'Bitcoin',ticker:'BTC',icon:'₿',price:5600000,group:'Криптовалюта'},
 {id:'eth',name:'Ethereum',ticker:'ETH',icon:'Ξ',price:185000,group:'Криптовалюта'},
 {id:'ton',name:'Toncoin',ticker:'TON',icon:'💎',price:265,group:'Криптовалюта'},
 {id:'usd',name:'Доллар США',ticker:'USD',icon:'💵',price:92,group:'Валюта'},
 {id:'eur',name:'Евро',ticker:'EUR',icon:'💶',price:100,group:'Валюта'},
 {id:'aapl',name:'Apple',ticker:'AAPL',icon:'🍎',price:21500,group:'Акции'},
 {id:'tsla',name:'Tesla',ticker:'TSLA',icon:'🚗',price:24500,group:'Акции'},
 {id:'nvda',name:'NVIDIA',ticker:'NVDA',icon:'🟩',price:13800,group:'Акции'},
 {id:'msft',name:'Microsoft',ticker:'MSFT',icon:'🪟',price:41500,group:'Акции'}
];
const MARKET_KEY='crypto-investor-market-demo-v1';
let marketPrices={},marketChanges={},marketChangeValues={},marketPortfolio={},marketHistory=[],marketJoined={},marketUpdatedAt=null;
function applyMarketSnapshot(market){
 const assets=Array.isArray(market?.assets)?market.assets:[];
 marketPrices=Object.fromEntries(assets.map(a=>[a.id,Number(a.price)]));
 marketChanges=Object.fromEntries(assets.map(a=>[a.id,Number(a.changePercent)||0]));
 marketChangeValues=Object.fromEntries(assets.map(a=>[a.id,Number(a.changeValue)||0]));
 marketPortfolio=market?.portfolio||{};
 marketHistory=Array.isArray(market?.history)?market.history:marketHistory;
 marketUpdatedAt=market?.updatedAt||null;
}
function loadMarketDemo(){
 try{const v=JSON.parse(localStorage.getItem(MARKET_KEY)||'{}');marketPortfolio=v.portfolio||{};marketHistory=Array.isArray(v.history)?v.history:[];marketJoined=v.joined||{};}catch{marketPortfolio={};marketJoined={};}
 MARKET_ASSETS.forEach(a=>{marketPrices[a.id]=a.price;marketChanges[a.id]=0;marketChangeValues[a.id]=0;});
}
function saveMarketDemo(){try{localStorage.setItem(MARKET_KEY,JSON.stringify({portfolio:marketPortfolio,history:marketHistory,joined:marketJoined}));}catch{}}
async function refreshMarketPrices(){
 const button=$('exchangeRefresh');if(button)button.disabled=true;
 try{
  if(demoMode){
   MARKET_ASSETS.forEach(a=>{const previous=marketPrices[a.id]||a.price;const change=(Math.random()*0.05)-0.025;marketPrices[a.id]=Math.max(.01,previous*(1+change));marketChanges[a.id]=change*100;marketChangeValues[a.id]=marketPrices[a.id]-previous;});
   $('exchangeUpdated').textContent='Локальный просмотр котировок. Для общего портфеля открой игру через Telegram.';
  }else{
   const data=await api('/market/state');
   applyMarketSnapshot(data.market);
   game=normalizeGameState(data.state);
   $('exchangeUpdated').textContent='Котировки обновлены: '+new Date(marketUpdatedAt||Date.now()).toLocaleTimeString('ru-RU');
   renderAll();
  }
  renderMarket();
 }catch(e){$('exchangeUpdated').textContent=e.message||'Не удалось обновить котировки.';}
 finally{if(button)button.disabled=false;}
}
function renderMarket(){
 if(!$('marketGrid'))return;
 $('exchangeBalance').textContent=money(game?.player?.balance||0)+' ₽';
 $('marketGrid').innerHTML=MARKET_ASSETS.map(a=>{const price=marketPrices[a.id]||a.price,change=marketChanges[a.id]||0,changeValue=marketChangeValues[a.id]||0;const sign=changeValue>0?'+':changeValue<0?'−':'';const arrow=changeValue>0?'▲':changeValue<0?'▼':'•';return '<article class="market-card"><div class="market-card-top"><span class="market-icon">'+a.icon+'</span><span class="market-group">'+a.group+'</span></div><h3>'+a.name+'</h3><b class="market-ticker">'+a.ticker+'</b><div class="market-price">'+money(price)+' ₽</div><small class="'+(change>=0?'market-up':'market-down')+'">'+arrow+' '+sign+money(Math.abs(changeValue))+' ₽ · '+(change>=0?'+':'')+change.toFixed(2)+'% за минуту</small></article>';}).join('');
 const select=$('marketAsset'),previous=select.value;
 select.innerHTML=MARKET_ASSETS.map(a=>'<option value="'+a.id+'">'+a.name+' ('+a.ticker+')</option>').join('');
 if(MARKET_ASSETS.some(a=>a.id===previous))select.value=previous;
 renderMarketEstimate();renderMarketHoldings();
}
function renderMarketEstimate(){
 const id=$('marketAsset')?.value,a=MARKET_ASSETS.find(x=>x.id===id),qty=Number($('marketQuantity')?.value);
 if(!$('marketEstimate'))return;
 $('marketEstimate').textContent=a&&Number.isFinite(qty)&&qty>0?'Ориентировочная стоимость: '+money((marketPrices[id]||a.price)*qty)+' ₽':'Укажи корректное количество.';
}
function renderMarketHoldings(){
 const root=$('marketHoldings')||$('garageGrid');if(!root)return;
 const entries=Object.entries(marketPortfolio).map(([id,value])=>{const item=value&&typeof value==='object'?value:{quantity:Number(value)||0,averageBuyPrice:0};return [id,item];}).filter(([,item])=>Number(item.quantity)>0);
 const holdingsHtml=entries.length?entries.map(([id,item])=>{const a=MARKET_ASSETS.find(x=>x.id===id);if(!a)return '';const qty=Number(item.quantity),avg=Number(item.averageBuyPrice)||0,current=Number(marketPrices[id]||a.price),saleValue=current*qty,costValue=avg*qty,profit=saleValue-costValue,changeClass=profit>=0?'market-up':'market-down';return '<article class="holding-row"><div class="holding-asset"><span class="holding-coin holding-'+id+'">'+a.icon+'</span><span><b>'+a.name+'</b><small>'+a.ticker+'</small></span></div><div class="holding-quantity"><small>Куплено</small><b>'+qty.toFixed(4)+'</b></div><div class="holding-buy"><small>Средняя цена покупки</small><b>'+(avg>0?money(avg)+' ₽':'нет данных')+'</b></div><div class="holding-sale"><small>Получишь при продаже</small><b>'+money(saleValue)+' ₽</b><small class="'+changeClass+'">'+(avg>0?(profit>=0?'+':'−')+money(Math.abs(profit))+' ₽ · '+(costValue>0?(profit/costValue*100).toFixed(2):'0.00')+'%':'Цена покупки не записана для старой позиции')+'</small></div><button class="shop-sell" type="button" data-market-sell="'+id+'">Продать всё</button></article>';}).join(''):'<p class="muted empty-garage">Портфель пока пуст. Купи активы на вкладке «Биржа» — они появятся здесь.</p>';
 const historyHtml='<section class="portfolio-history"><h3>📜 История покупок и продаж</h3>'+(marketHistory.length?'<div class="portfolio-history-list">'+marketHistory.slice(0,50).map(t=>{const a=MARKET_ASSETS.find(x=>x.id===t.asset_id)||MARKET_ASSETS.find(x=>x.id===t.assetId);const side=t.side==='buy'?'Покупка':'Продажа',cls=t.side==='buy'?'market-up':'market-down',date=t.created_at?new Date(t.created_at).toLocaleString('ru-RU'):'Только что';return '<article class="portfolio-history-row"><span class="holding-coin">'+(a?.icon||'📊')+'</span><div><b>'+(a?.name||t.asset_id)+'</b><small>'+side+' · '+Number(t.quantity).toFixed(4)+' '+(a?.ticker||'')+'</small><small>'+date+'</small></div><strong class="'+cls+'">'+(t.side==='buy'?'−':'+')+money(Number(t.total))+' ₽</strong></article>';}).join('')+'</div>':'<p class="muted">Здесь будут отображаться все покупки и продажи.</p>')+'</section>';
 root.innerHTML=holdingsHtml+historyHtml;
}
async function marketTrade(side){
 const status=$('marketStatus'),a=MARKET_ASSETS.find(x=>x.id===$('marketAsset').value),qty=Number($('marketQuantity').value);
 if(!a||!Number.isFinite(qty)||qty<=0||qty>100000000){status.textContent='Укажи корректное количество.';return;}
 if(demoMode){
  const price=marketPrices[a.id]||a.price,total=side==='buy'?Math.ceil(price*qty):Math.floor(price*qty),savedHolding=marketPortfolio[a.id],owned=savedHolding&&typeof savedHolding==='object'?Number(savedHolding.quantity)||0:Number(savedHolding)||0;
  if(side==='buy'){
   if(total>game.player.balance){status.textContent='Недостаточно игровых рублей для покупки.';return;}
   game.player.balance-=total;marketHistory.unshift({asset_id:a.id,side:'buy',quantity:qty,price,total,created_at:new Date().toISOString()});const prior=marketPortfolio[a.id]&&typeof marketPortfolio[a.id]==='object'?marketPortfolio[a.id]:{quantity:owned,averageBuyPrice:0};marketPortfolio[a.id]={quantity:owned+qty,averageBuyPrice:((owned*(prior.averageBuyPrice||0))+(qty*price))/(owned+qty)};status.textContent='Куплено: '+qty+' '+a.ticker+' за '+money(total)+' игровых ₽.';
  }else{
   if(qty>owned+1e-9){status.textContent='В портфеле недостаточно этого актива.';return;}
   const remaining=Math.max(0,owned-qty);if(remaining<1e-9)delete marketPortfolio[a.id];else{const prior=marketPortfolio[a.id]&&typeof marketPortfolio[a.id]==='object'?marketPortfolio[a.id]:{averageBuyPrice:0};marketPortfolio[a.id]={quantity:remaining,averageBuyPrice:Number(prior.averageBuyPrice)||0};}
   game.player.balance+=total;marketHistory.unshift({asset_id:a.id,side:'sell',quantity:qty,price,total,created_at:new Date().toISOString()});status.textContent='Продано: '+qty+' '+a.ticker+'. На баланс зачислено '+money(total)+' игровых ₽.';
  }
  saveDemo();saveMarketDemo();renderAll();renderMarket();return;
 }
 const buttons=[$('marketBuy'),$('marketSell')];buttons.forEach(b=>b.disabled=true);status.textContent='Проводим операцию на сервере…';
 try{
  const result=await api('/market/trade',{assetId:a.id,side,quantity:qty});
  game=normalizeGameState(result.state);applyMarketSnapshot(result.market);
  const trade=result.trade;
  status.textContent=(side==='buy'?'Куплено ':'Продано ')+trade.quantity+' '+a.ticker+' по '+money(trade.price)+' ₽. Сумма: '+money(trade.total)+' ₽.';
  renderAll();renderMarket();
 }catch(e){status.textContent=e.message||'Не удалось выполнить операцию.';}
 finally{buttons.forEach(b=>b.disabled=false);}
}
$('exchangeRefresh')?.addEventListener('click',refreshMarketPrices);
$('marketAsset')?.addEventListener('change',renderMarketEstimate);
$('marketQuantity')?.addEventListener('input',renderMarketEstimate);
$('marketBuy')?.addEventListener('click',()=>marketTrade('buy'));
$('marketSell')?.addEventListener('click',()=>marketTrade('sell'));
document.querySelector('[data-page="exchange"]')?.addEventListener('click',()=>{renderMarket();});
loadMarketDemo();renderMarket();


// Мягко падающие золотые звёзды по краям фонового биткоина.
(function makeGoldStars(){const layer=$('goldStars');if(!layer)return;for(let i=0;i<24;i++){const star=document.createElement('i');star.className='gold-star';star.textContent='✦';star.style.left=(2+Math.random()*96)+'%';star.style.animationDuration=(9+Math.random()*15)+'s';star.style.animationDelay=(-Math.random()*20)+'s';star.style.fontSize=(8+Math.random()*15)+'px';star.style.opacity=(.12+Math.random()*.3).toFixed(2);layer.appendChild(star);}})();


/* Ежедневные награды и серверные онлайн-турниры. */
async function loadDailyState(){const progress=$('dailyProgress'),button=$('dailyClaim'),status=$('dailyStatus');if(demoMode||!token){progress.textContent='Войди через Telegram, чтобы получать ежедневную награду.';button.disabled=true;return;}try{const s=await api('/daily/state');progress.textContent='Серия: '+s.streak+'/10 дней · следующий день: '+s.nextDay+'/10';button.disabled=!!s.claimedToday;button.textContent=s.claimedToday?'Сегодня уже получено ✓':'Забрать 50 000 ₽';status.textContent=s.claimedToday?'Возвращайся завтра за следующей наградой.':'Награда начисляется один раз в день.';}catch(e){progress.textContent=e.message||'Не удалось загрузить награду.';button.disabled=true;}}
$('dailyClaim')?.addEventListener('click',async()=>{const b=$('dailyClaim'),status=$('dailyStatus');b.disabled=true;status.textContent='Начисляем награду…';try{const r=await api('/daily/claim',{});game=normalizeGameState(r.state);renderAll();status.textContent='Получено 50 000 ₽! День '+r.streak+'/10.';await loadDailyState();}catch(e){status.textContent=e.message||'Не удалось получить награду.';await loadDailyState();}});
const tournamentNames={taps:'Марафон тапов',assets:'Бизнес-магнат',balance:'Капиталист'};
async function renderTournaments(){const taps=Number(game?.player?.taps||0),assets=(game?.owned||[]).length,balance=Number(game?.player?.balance||0);$('tapTournamentScore').textContent='Твой результат: '+money(taps)+' тапов';$('assetTournamentScore').textContent='Твой результат: '+assets+' объектов';$('balanceTournamentScore').textContent='Твой результат: '+money(balance)+' ₽';const board=$('tournamentLeaderboard');if(demoMode||!token){board.innerHTML='<p class="muted">Открой игру через Telegram для участия в онлайн-турнирах.</p>';return;}board.innerHTML='<p class="muted">Загружаем общий рейтинг…</p>';try{const data=await api('/tournaments/state');Object.keys(tournamentNames).forEach(id=>{const joined=data.joined.includes(id),el=$(id==='taps'?'tapTournamentStatus':id==='assets'?'assetTournamentStatus':'balanceTournamentStatus');el.textContent=joined?'Ты участвуешь в онлайн-турнире.':'Нажми «Участвовать», чтобы попасть в общий рейтинг.';const btn=document.querySelector('[data-tournament="'+id+'"]');btn.textContent=joined?'Участвуешь ✓':'Участвовать';btn.disabled=joined;});board.innerHTML=Object.keys(tournamentNames).map(id=>'<h3>'+tournamentNames[id]+'</h3>'+((data.boards[id]||[]).length?data.boards[id].map(p=>'<article class="leader-row"><span class="leader-rank">'+p.rank+'</span><span class="leader-name">'+escapeHtml(p.name)+'</span><b class="leader-value">'+money(p.score)+(id==='taps'?' тапов':' ₽')+'</b></article>').join(''):'<p class="muted">Пока нет участников.</p>')).join('');}catch(e){board.innerHTML='<p class="muted">'+escapeHtml(e.message||'Не удалось загрузить онлайн-рейтинг')+'</p>';}}
document.querySelectorAll('[data-tournament]').forEach(btn=>btn.addEventListener('click',async()=>{if(demoMode||!token){$(btn.dataset.tournament==='taps'?'tapTournamentStatus':btn.dataset.tournament==='assets'?'assetTournamentStatus':'balanceTournamentStatus').textContent='Войди через Telegram для участия.';return;}btn.disabled=true;try{await api('/tournaments/join',{tournamentId:btn.dataset.tournament});await renderTournaments();}catch(e){btn.disabled=false;$(btn.dataset.tournament==='taps'?'tapTournamentStatus':btn.dataset.tournament==='assets'?'assetTournamentStatus':'balanceTournamentStatus').textContent=e.message||'Не удалось вступить.';}}));
document.querySelector('[data-page="tournaments"]')?.addEventListener('click',renderTournaments);
// 
const CASE_ITEMS=[
 {id:'neon_coin',name:'Неоновая монета',icon:'🪙',rarity:'Обычный',sellPrice:250000},
 {id:'pixel_crown',name:'Пиксельная корона',icon:'👑',rarity:'Редкий',sellPrice:1800000},
 {id:'blue_flame',name:'Синее пламя',icon:'🔥',rarity:'Редкий',sellPrice:950000},
 {id:'cyber_glasses',name:'Кибер-очки',icon:'🥽',rarity:'Эпический',sellPrice:2400000},
 {id:'golden_badge',name:'Золотой значок',icon:'🏅',rarity:'Эпический',sellPrice:1250000},
 {id:'holo_cube',name:'Голографический куб',icon:'🧊',rarity:'Легендарный',sellPrice:4600000},
 {id:'star_wings',name:'Звёздные крылья',icon:'🪽',rarity:'Легендарный',sellPrice:7800000},
 {id:'crystal_fox',name:'Кристальный лис',icon:'🦊',rarity:'Мифический',sellPrice:9500000}
];
let caseSpinning=false;
function updateCaseUI(){
 const count=$('caseTokenCount');if(count)count.textContent=String(game?.caseTokens||0);
 const button=$('openCaseButton');if(button){button.disabled=caseSpinning||busy||(!game?.caseTokens&&Number(game?.player?.balance||0)<5000000);button.textContent=caseSpinning?'Открываем…':(game?.caseTokens?'Открыть кейс · бесплатный билет':'Открыть кейс · 5 000 000 ₽');}
}
function renderCaseReel(){
 const track=$('caseReelTrack');if(!track)return;
 const reel=Array.from({length:31},()=>CASE_ITEMS[Math.floor(Math.random()*CASE_ITEMS.length)]);
 track.innerHTML=reel.map(item=>'<div class="case-reel-item"><span>'+item.icon+'</span><b>'+item.name+'</b><small>'+item.rarity+'</small></div>').join('');
 track.style.transition='none';track.style.transform='translateX(0)';
}
const openCaseButton=$('openCaseButton');
if(openCaseButton)openCaseButton.addEventListener('click',async()=>{
 if(caseSpinning||busy||!game?.player)return;
 caseSpinning=true;busy=true;openCaseButton.disabled=true;
 const status=$('casePreviewStatus');status.textContent='Кейс открывается…';
 const track=$('caseReelTrack');renderCaseReel();track.classList.add('spinning');
 try{
  const result=await api('/game/open-case',{});
  const reward=result.reward;
  const chosen=CASE_ITEMS.find(x=>x.id===reward?.itemId);
  if(!chosen)throw new Error('Сервер вернул неизвестный предмет кейса. Награда не будет подменена.');
  // Убираем старую CSS-анимацию предпросмотра: она имела приоритет над
  // inline transform и уводила ленту на фиксированные 520px к другому предмету.
  track.classList.remove('spinning');
  track.style.animation='none';
  const winningIndex=24;
  const cells=Array.from({length:31},(_,i)=>i===winningIndex?chosen:CASE_ITEMS[Math.floor(Math.random()*CASE_ITEMS.length)]);
  track.innerHTML=cells.map(item=>'<div class="case-reel-item"><span>'+item.icon+'</span><b>'+item.name+'</b><small>'+item.rarity+'</small></div>').join('');
  track.style.transition='none';
  track.style.transform='translateX(0)';
  void track.offsetWidth;
  const winningCell=track.children[winningIndex];
  const windowRect=track.parentElement.getBoundingClientRect();
  const cellRect=winningCell.getBoundingClientRect();
  const target=cellRect.left+cellRect.width/2-(windowRect.left+windowRect.width/2);
  track.style.transition='transform 4.2s cubic-bezier(.08,.72,.12,1)';
  track.style.transform='translateX('+(-target)+'px)';
  await new Promise(resolve=>setTimeout(resolve,4350));
  game=normalizeGameState(result.state);renderAll();showFireworks();
  status.textContent='Получен предмет: '+chosen.name+' · добавлен в гараж!'; 
  renderCaseReel();
 }catch(error){status.textContent=error.message||'Не удалось открыть кейс.';}
 finally{track?.classList.remove('spinning');if(track)track.style.animation='';caseSpinning=false;busy=false;updateCaseUI();}
});
document.querySelectorAll('[data-donate="premium"]').forEach(button=>button.addEventListener('click',()=>{
 const status=$('donatePremiumStatus');if(status)status.textContent='Платёжная функция пока не подключена.';
}));
const starterButton=$('claimStarterPack');
if(starterButton)starterButton.addEventListener('click',async()=>{
 const status=$('donateStarterStatus');starterButton.disabled=true;status.textContent='Получаем набор…';
 try{game=normalizeGameState(await api('/game/claim-starter-pack',{}));renderAll();updateCaseUI();status.textContent='Стартовый набор получен: 1 бесплатный билет!';starterButton.textContent='Набор получен ✓';}
 catch(error){status.textContent=error.message||'Не удалось получить набор.';starterButton.disabled=false;}
});
updateCaseUI();

// Бесплатное колесо с фиксированной последовательностью и серверным кулдауном 8 минут.
const fortuneRewardSequence=[1000000,2000000,3000000,4000000,5000000,6000000,7000000,8000000,9000000,10000000,500000,250000,100000];
let fortuneWheelBusy=false,fortuneRemainingSeconds=0,fortuneRotation=0;
const fortuneSpinControl=$('fortuneSpinButton'),fortuneStatusText=$('fortuneResult'),fortuneWheelElement=$('fortuneWheel'),fortuneCenterElement=$('fortuneWheelCenter');
function updateFortuneCooldownUI(){if(!fortuneSpinControl)return;if(fortuneWheelBusy){fortuneSpinControl.disabled=true;fortuneSpinControl.textContent='Колесо вращается…';return;}if(demoMode||!token){fortuneSpinControl.disabled=false;fortuneSpinControl.textContent='Крутить колесо';return;}fortuneSpinControl.disabled=fortuneRemainingSeconds>0;if(fortuneRemainingSeconds>0){const m=Math.floor(fortuneRemainingSeconds/60),s=fortuneRemainingSeconds%60;fortuneSpinControl.textContent='Следующее вращение через '+m+':'+String(s).padStart(2,'0');}else fortuneSpinControl.textContent='Крутить колесо · бесплатно';}
async function loadFortuneCooldown(){if(!fortuneSpinControl||demoMode||!token){updateFortuneCooldownUI();return;}try{const state=await api('/fortune/state');fortuneRemainingSeconds=Math.max(0,Number(state.remainingSeconds)||0);updateFortuneCooldownUI();if(fortuneRemainingSeconds>0&&fortuneStatusText)fortuneStatusText.textContent='Бесплатное вращение будет доступно через '+Math.ceil(fortuneRemainingSeconds/60)+' мин.';}catch(error){if(fortuneStatusText)fortuneStatusText.textContent=error.message||'Не удалось проверить время следующего вращения.';}}
if(fortuneSpinControl)fortuneSpinControl.addEventListener('click',async()=>{if(fortuneWheelBusy||fortuneRemainingSeconds>0)return;if(demoMode||!token){if(fortuneStatusText)fortuneStatusText.textContent='Открой игру через Telegram, чтобы сохранить игровую награду.';return;}fortuneWheelBusy=true;updateFortuneCooldownUI();try{const result=await api('/fortune/spin',{});const index=Number(result.index),reward=Number(result.reward);if(!Number.isInteger(index)||index<0||index>=fortuneRewardSequence.length||fortuneRewardSequence[index]!==reward)throw new Error('Сервер вернул некорректную награду.');fortuneRotation+=360*5+(360/fortuneRewardSequence.length)*(index+0.5);fortuneWheelElement.style.transform='rotate('+fortuneRotation+'deg)';await new Promise(resolve=>setTimeout(resolve,4100));game=normalizeGameState(result.state);renderAll();fortuneCenterElement.textContent=money(reward)+' ₽';fortuneRemainingSeconds=480;if(fortuneStatusText)fortuneStatusText.textContent='Начислено '+money(reward)+' игровых ₽. Следующее вращение — через 8 минут.';}catch(error){const seconds=Number(error.remainingSeconds)||0;if(seconds>0)fortuneRemainingSeconds=seconds;if(fortuneStatusText)fortuneStatusText.textContent=error.message||'Не удалось выполнить вращение.';}finally{fortuneWheelBusy=false;updateFortuneCooldownUI();}});
if(fortuneSpinControl){loadFortuneCooldown();setInterval(()=>{if(fortuneRemainingSeconds>0){fortuneRemainingSeconds--;updateFortuneCooldownUI();}},1000);document.querySelector('[data-store-panel="fortune"]')?.addEventListener('click',loadFortuneCooldown);}

// Бесплатное колесо риска: один раунд каждые 30 минут, без ставок и оплаты участия.
const riskButton=$('riskSpinButton'),riskStatus=$('riskResult'),riskCooldown=$('riskCooldown'),riskWheel=$('riskWheel');
let riskBusy=false,riskRemainingSeconds=0,riskRotation=0;
const riskOutcomes=[5000000,-500000,2000000,-1000000,1000000,-2000000,0,-5000000,-100000000,-250000000,-500000000];
function updateRiskUI(){if(!riskButton)return;riskButton.disabled=riskBusy||riskRemainingSeconds>0;riskButton.textContent=riskBusy?'Колесо вращается…':riskRemainingSeconds>0?'Раунд через '+Math.floor(riskRemainingSeconds/60)+' мин.':'Бесплатный раунд';if(riskCooldown)riskCooldown.textContent=riskRemainingSeconds>0?'Следующая попытка будет доступна через '+Math.ceil(riskRemainingSeconds/60)+' мин.':'Раунд доступен. Оплата и ставки не нужны.';}
async function loadRiskState(){if(!riskButton)return;try{const state=await api('/risk/state');riskRemainingSeconds=Math.max(0,Number(state.remainingSeconds)||0);updateRiskUI();}catch(error){if(riskCooldown)riskCooldown.textContent=error.message||'Не удалось проверить доступность раунда.';}}
if(riskButton)riskButton.addEventListener('click',async()=>{if(riskBusy||riskRemainingSeconds>0)return;riskBusy=true;updateRiskUI();try{const result=await api('/risk/spin',{}),index=Number(result.index),delta=Number(result.delta);if(!Number.isInteger(index)||index<0||index>=riskOutcomes.length||!Number.isFinite(delta))throw new Error('Сервер вернул некорректный результат.');riskRotation+=360*5+(360/riskOutcomes.length)*(index+.5);riskWheel.style.transform='rotate('+riskRotation+'deg)';riskWheel.classList.add('spinning');await new Promise(resolve=>setTimeout(resolve,4100));riskWheel.classList.remove('spinning');game=normalizeGameState(result.state);renderAll();riskRemainingSeconds=1800;if(riskStatus)riskStatus.textContent=delta>0?'Выигрыш: +'+money(delta)+' игровых ₽!':delta<0?'Убыток: −'+money(Math.abs(delta))+' игровых ₽.': 'Ничья: баланс не изменился.';if(riskCooldown)riskCooldown.textContent='Следующий бесплатный раунд — через 24 часа.';}catch(error){riskWheel?.classList.remove('spinning');riskRemainingSeconds=Math.max(riskRemainingSeconds,Number(error.remainingSeconds)||0);if(riskStatus)riskStatus.textContent=error.message||'Не удалось запустить раунд.';}finally{riskBusy=false;updateRiskUI();}});
if(riskButton){loadRiskState();setInterval(()=>{if(riskRemainingSeconds>0){riskRemainingSeconds--;updateRiskUI();}},1000);document.querySelector('[data-store-panel="risk"]')?.addEventListener('click',loadRiskState);}
// Запускаем игру только после объявления всех игровых данных и обработчиков.
start().catch(error => {
  stopConnectionTimer();
  const status = document.getElementById('saveStatus');
  if (status) {
    status.textContent = 'Ошибка запуска игры: ' + (error?.message || 'неизвестная ошибка');
    status.style.color = '#ff7777';
  }
});
