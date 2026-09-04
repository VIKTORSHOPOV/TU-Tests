// Shared exam data - EDIT THIS FILE ONLY to add/modify exams
// This file is imported by all Netlify Functions

const examsData = [
  // Exam: Контролна работа 2 — Дизайн на софтуерни проекти
  {
    id: "exam-design-patterns-1",
    category: "3.1 курс",
    title: "Тест Захариева 2",
    description: "Тест за поведенчески, структурни и креационни шаблони в обектно-ориентирано програмиране",
    passwordHash: "",
    settings: {
      shuffleQuestions: false,
      shuffleChoices: false,
      timeLimitSeconds: 1800,
      allowImmediateRetry: true,
      passingScorePercent: 70,
      maxAttempts: 3
    },
    questions: [
      {
        id: "q1",
        type: "multiple",
        points: 1,
        prompt: "Кои от изброените шаблони за дизайн се определят като поведенчески?",
        choices: [
          { id: "a", text: "Фасада" },
          { id: "b", text: "Сек" },
          { id: "c", text: "Адаптер" },
          { id: "d", text: "Верига от отговорности" },
          { id: "e", text: "Команда" }
        ],
        correctAnswer: ["d", "e"]
      },
      {
        id: "q2",
        type: "multiple",
        points: 1,
        prompt: "Характерно за шаблона „Строител” е, че:",
        choices: [
          { id: "a", text: "подходящ е за изграждане на сложен обект" },
          { id: "b", text: "създава клас, който създава сложното множество от обекти с прост интерфейс" },
          { id: "c", text: "създава клас, който има само една инстанция" },
          { id: "d", text: "капсулира заявка за обект" }
        ],
        correctAnswer: ["a"]
      },
      {
        id: "q3",
        type: "multiple",
        points: 1,
        prompt: "Шаблон „Сек“ е подходящ в случая, че:",
        choices: [
          { id: "a", text: "се работи в единствен обект" },
          { id: "b", text: "се изгражда сложен обект" },
          { id: "c", text: "необходимо е да се абстрахираме от типа на създавания обект" },
          { id: "d", text: "се създава група взаимосвързани обекти" }
        ],
        correctAnswer: ["a"]
      },
      {
        id: "q4",
        type: "multiple",
        points: 1,
        prompt: "За да бъде извикан виртуален метод чрез динамично свързване в C# се използва:",
        choices: [
          { id: "a", text: "име на обект от произходен клас" },
          { id: "b", text: "име на обект от базов клас" },
          { id: "c", text: "име на базов клас" },
          { id: "d", text: "име на произходен клас" }
        ],
        correctAnswer: ["b"]
      },
      {
        id: "q5",
        type: "multiple",
        points: 1,
        prompt: "Кои от изброените характеристики се отнасят за шаблон „Команда”?",
        choices: [
          { id: "a", text: "поддържа обратими операции" },
          { id: "b", text: "капсулира заявка като обект" },
          { id: "c", text: "скрива от клиентския код процеса на създаване на обектите" },
          { id: "d", text: "преобразува интерфейса на един клас в интерфейс на друг" },
          { id: "e", text: "позволява даден по-голям клас да бъде разделен на множество близки класове" }
        ],
        correctAnswer: ["a", "b"]
      },
      {
        id: "q6",
        type: "single",
        points: 1,
        prompt: "При реализация на шаблон „Строител“, кой от изброените класове е в необходимото да бъде абстрактен?",
        choices: [
          { id: "a", text: "Product (продукт)" },
          { id: "b", text: "Director (директор)" },
          { id: "c", text: "Builder (строител)" },
          { id: "d", text: "ConcreteBuilder (конкретен строител)" }
        ],
        correctAnswer: "c"
      },
      {
        id: "q7",
        type: "single",
        points: 1,
        prompt: "Клас Animal е абстрактен. Негови производни класове са: Lion и Elephant. В кой от посочените редове има грешка?",
        choices: [
          { id: "a", text: "Animal animal = new Animal();" },
          { id: "b", text: "Animal animal = new Lion();" },
          { id: "c", text: "Animal animal = new Elephant();" },
          { id: "d", text: "няма верен отговор" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q8",
        type: "single",
        points: 1,
        prompt: "Кое от изброените е характерно за всички поведенчески шаблони?",
        choices: [
          { id: "a", text: "редуцират сложността на системите" },
          { id: "b", text: "скриват процеса на създаване на обекти" },
          { id: "c", text: "определят комуникацията между обектите" },
          { id: "d", text: "няма верен отговор" }
        ],
        correctAnswer: "c"
      },
      {
        id: "q9",
        type: "single",
        points: 1,
        prompt: "Шаблон Адаптер се използва когато:",
        choices: [
          { id: "a", text: "се създава сложен обект" },
          { id: "b", text: "се създава група взаимосвързани обекти" },
          { id: "c", text: "се преобразува интерфейс на един клас така че да е разбирам за друг" },
          { id: "d", text: "няма верен отговор" }
        ],
        correctAnswer: "c"
      },
      {
        id: "q10",
        type: "multiple",
        points: 1,
        prompt: "Кои от изброените шаблони за дизайн се определят като структурни?",
        choices: [
          { id: "a", text: "Абстрактна Фабрика" },
          { id: "b", text: "Адаптер" },
          { id: "c", text: "Стратегия" },
          { id: "d", text: "Команда" },
          { id: "e", text: "Фасада" }
        ],
        correctAnswer: ["b", "e"]
      },
      {
        id: "q11_code",
        type: "open",
        points: 4,
        prompt: "Създаден е шаблон Строител, който произвежда пицa (продукт-абстрактен клас Pizza с метод, който добавя елемент void Add(string part); parts - списък от List<string>) и абстрактен клас PizzaBuilder с абстрактни методи void BuildBase() и void BuildIngredient(). Да се създаде произволен клас PizzaMargaritaBuilder, който наследява PizzaBuilder и създава пица с основа доматена паста и продукти кашкавал и босилек.",
        correctAnswer: "class PizzaMargaritaBuilder : PizzaBuilder {\n    public override void BuildBase() {\n        pizza.Add(\"доматена паста\");\n    }\n    public override void BuildIngredient() {\n        pizza.Add(\"кашкавал\");\n        pizza.Add(\"босилек\");\n    }\n}",
        scoring: { type: "code", language: "csharp" }
      },
      {
        id: "q12_code",
        type: "open",
        points: 4,
        prompt: "Декларирайте абстрактен базов клас, който описва пространствена фигура. Класът да съдържа абстрактен метод, който намира обема на тялото. Декларирайте производен клас, описващ куб. Класът да съдържа полета, съответстващи на размерите на фигурата. Да се предефинира метода за намиране обем на тялото. Формулата за пресмятане на обема е V=a^3 където a е страната на куба.",
        correctAnswer: "abstract class Figure {\n    public abstract double Volume();\n}\nclass Cube : Figure {\n    private double a;\n    public Cube(double side) { a = side; }\n    public override double Volume() {\n        return a * a * a;\n    }\n}",
        scoring: { type: "code", language: "csharp" }
      },
      {
        id: "q13_code",
        type: "open",
        points: 4,
        prompt: "Деклариран е абстрактен базов клас Vehicle, който описва транспортно средство. Класът съдържа абстрактен метод int SeatsCount(), който дава информация за броя на местата. Декларирайте производен клас Buss, описващ автобус с поле за брой на местата. Предефинирайте абстрактния метод.",
        correctAnswer: "abstract class Vehicle {\n    public abstract int SeatsCount();\n}\nclass Bus : Vehicle {\n    private int seats;\n    public Bus(int s) { seats = s; }\n    public override int SeatsCount() {\n        return seats;\n    }\n}",
        scoring: { type: "code", language: "csharp" }
      },
      {
        id: "q14_code",
        type: "open",
        points: 6,
        prompt: "Да се създаде абстрактен клас Strategy, в който се дефинира едномерен масив от n целочислени елемента. Броя на елементите (n) се предава като параметър на конструктора. Класът да съдържа абстрактен метод, който намира на елементите на масива. Да се декларира производен клас ConcreteStrategyOne, който намира сумата на елементите на масива с използване на конструкция for. Съответства на една от стратегиите.",
        correctAnswer: "abstract class Strategy {\n    protected int[] array;\n    public Strategy(int n) {\n        array = new int[n];\n    }\n    public abstract int ComputeSum();\n}\nclass ConcreteStrategyOne : Strategy {\n    public ConcreteStrategyOne(int n) : base(n) {}\n    public override int ComputeSum() {\n        int sum = 0;\n        for (int i = 0; i < array.Length; i++) {\n            sum += array[i];\n        }\n        return sum;\n    }\n}",
        scoring: { type: "code", language: "csharp" }
      }
    ]
  },

  {
    id: "exam-multimedia-1",
    category: "3.1 курс",
    title: "Тест по Мултимедия",
    description: "Тест с 15 въпроса по мултимедия, с максимум 36 точки",
    passwordHash:
      "",
    settings: {
      shuffleQuestions: false,
      shuffleChoices: false,
      timeLimitSeconds: 1800,
      allowImmediateRetry: true,
      passingScorePercent: 70,
      maxAttempts: 3,
    },
    questions: [
      {
        id: "q1",
        type: "open",
        points: 2,
        prompt:
          "Избройте и опишете различните видове медия, които познавате, съставящи даден мултимедиен продукт? (над 6 бр. за 2 точки)",
        correctAnswer:
          "Видове медия: текст (писмено съдържание), изображения (статични графики), аудио (звуци и музика), видео (движещи се изображения), анимация (симулирано движение), интерактивни елементи (бутони, връзки).",
      },
      {
        id: "q2",
        type: "open",
        points: 2,
        prompt:
          "Опишете подробно през какви етапи преминава аудио информацията, ако се проследи пътя от възприемането с микрофон на механични трептения на въздушните частици и се стигне до записани цифрови данни в WAV файл?",
        correctAnswer:
          "Етапи: улавяне на трептения с микрофон → преобразуване в електрически сигнал → дискретизация (семплиране) → квантоване → кодиране в цифров формат → запис в WAV файл (без компресия, PCM).",
      },
      {
        id: "q3",
        type: "open",
        points: 2,
        prompt:
          "Опишете разликите между абсолютно и относително представяне на времето при синхронизиране на мултимедийни потоци информация?",
        correctAnswer:
          "Абсолютно: фиксирано време от начало (напр. 00:00). Относително: спрямо друг елемент (напр. след 5 сек. от аудио старт).",
      },
      {
        id: "q4",
        type: "open",
        points: 2,
        prompt:
          "Опишете какво представлява ефекта „засенчване“ при възприемането на звук от човешкото ухо? По какъв начин се използва този ефект при съхраняването на звукова информация?",
        correctAnswer:
          "Засенчване: по-силни тонове маскират слаби близки честоти. Използва се в MP3 компресия за премахване на нечути звуци, спестяване на данни.",
      },
      {
        id: "q5",
        type: "open",
        points: 2,
        prompt:
          "Избройте технически средства, които се използват за въвеждане на графична информация? (над 5 бр. за 2 точки)",
        correctAnswer:
          "Средства: скенер, дигитална камера, графичен таблет, мишка, тъчскрийн, OCR софтуер.",
      },
      {
        id: "q6",
        type: "open",
        points: 2,
        prompt:
          "Какъв е честотният диапазон на звука, който човек може да чуе?",
        correctAnswer: "20 Hz до 20 kHz.",
      },
      {
        id: "q7",
        type: "open",
        points: 2,
        prompt: "Коя е видимата за човека област в спектъра на светлината?",
        correctAnswer: "380-780 nm (виолетово до червено).",
      },
      {
        id: "q8",
        type: "open",
        points: 2,
        prompt:
          "Какви видове смесване на цветовете познавате според начина за възприемане от човек? Опишете ги. (над 4 бр. за 2 точки)",
        correctAnswer:
          "Видове: адитивно (RGB, светлина, екрани), субтрактивно (CMYK, печат), HSV (тон, наситеност, яркост), HSL (подобно на HSV).",
      },
      {
        id: "q9",
        type: "open",
        points: 2,
        prompt:
          "Какво представляват цветовите модели? Къде намират приложение цветовите модели? Посочете примери.",
        correctAnswer:
          "Цветови модели: системи за представяне на цветове (RGB, CMYK, HSV). Приложение: графики, печат, уеб. Примери: RGB за екрани, CMYK за принтери.",
      },
      {
        id: "q10",
        type: "open",
        points: 3,
        prompt:
          "При кой вид мултимедийна информация се използва преобразувание на Фурие и с каква цел се извършва? Посочете примери.",
        correctAnswer:
          "При аудио и изображения (JPEG, MP3). Цел: честотно преобразуване за компресия. Примери: DCT в JPEG, MDCT в MP3.",
      },
      {
        id: "q11",
        type: "open",
        points: 3,
        prompt:
          "През какви основни етапи преминава разработването на мултимедиен продукт? Опишете накратко дейностите, извършвани във всеки от етапите.",
        correctAnswer:
          "Етапи: планиране (концепция), дизайн (структура), производство (създаване на съдържание), тестване (проверка), разпространение (публикуване).",
      },
      {
        id: "q12",
        type: "open",
        points: 3,
        prompt:
          "Какви методи за синхронизиране на различни мултимедийни потоци познавате? Опишете ги.",
        correctAnswer:
          "Методи: времеви (timestamp), събитийни (тригери), йерархични (майстор-роб). Синхронизират аудио, видео, текст.",
      },
      {
        id: "q13",
        type: "open",
        points: 3,
        prompt:
          "Опишете какво е необходимо да се направи за пресъздаването на обемно възприемане на звук от слушател? Избройте и опишете накратко, какви технологии за обемно възпроизвеждане на звук познавате?",
        correctAnswer:
          "Необходимо: многоканален звук (стерео+). Технологии: стерео (2 канала), 5.1 surround (5+1), Dolby Atmos (3D звук), binaural (за слушалки).",
      },
      {
        id: "q14",
        type: "open",
        points: 3,
        prompt:
          "Избройте и опишете различните видове кадри във видео потока при MPEG4. В каква последователност се подреждат различните кадри в потока? Представете примери.",
        correctAnswer:
          "Кадри в MPEG4: I (интра, ключов), P (предсказан от предишни), B (бидирекционен от пред/след). Последователност: I, P, B, P... (групи от картинки, GOP). Пример: IBBPBBP.",
      },
      {
        id: "q15",
        type: "open",
        points: 3,
        prompt:
          "Опишете избран от вас алгоритъм за компресиране на данни. Представете пример.",
        correctAnswer:
          "Run-Length Encoding (RLE) – прост алгоритъм за компресия без загуби, подходящ за данни с повторящи се елементи (като изображения или текст). Стъпки: 1. Преминава през данните. 2. Брои последователни повторения на елемент. 3. Записва броя + елемента (напр. ако броят > 255, използва специален маркер). Пример: Вход: AAAABBBCCDD → Изход: 4A3B2C2D (спестява пространство от 11 на 8 символа). Разкомпресиране: Чете броя и повтаря елемента.",
        scoring: { type: "code", language: "javascript" },
      },
    ],
  },

  {
  id: "exam-dsp-20250124",
  category: "3.1 курс",
  title: "Тест по Дизайн на софтуерни проекти",
  description: "Изпитен тест по дисциплината Дизайн на софтуерни проекти, специалност СКИ – 12.01.2026",
  passwordHash: "",
  settings: {
    shuffleQuestions: false,
    shuffleChoices: true,
    timeLimitSeconds: 3600,
    allowImmediateRetry: true,
    passingScorePercent: 70,
    maxAttempts: 3
  },
  questions: [
    {
      id: "q1",
      type: "multiple",
      points: 1,
      prompt: "Кои от изброените шаблони за дизайн се определят като поведенчески? (Посочете не повече от 2 верни отговора)",
      choices: [
        { id: "a", text: "Сек" },
        { id: "b", text: "Строител" },
        { id: "c", text: "Стратегия" },
        { id: "d", text: "Команда" },
        { id: "e", text: "Верния от отговорите" }
      ],
      correctAnswer: ["c", "d"]
    },
    {
      id: "q2",
      type: "single",
      points: 1,
      prompt: "Според кой от посочените модели след всяка от фазите на жизнения цикъл на софтуерен проект се повтаря циклично като се добавя нова функционалност?",
      choices: [
        { id: "a", text: "Спирален" },
        { id: "b", text: "Итеративен" },
        { id: "c", text: "V-образен" }
      ],
      correctAnswer: "b"
    },
    {
      id: "q3",
      type: "single",
      points: 1,
      prompt: "Шаблони „Метод Фабрика“ и „Абстрактна Фабрика“",
      choices: [
        { id: "a", text: "се работи с единствен обект" },
        { id: "b", text: "се изгражда сложен обект" },
        { id: "c", text: "е необходимо да се абстрахираме от типа на създаваните обекти" },
        { id: "d", text: "е необходимо да се поддържат обратни операции" }
      ],
      correctAnswer: "c"
    },
    {
      id: "q4",
      type: "single",
      points: 1,
      prompt: "Характерно за шаблон „Фасада“ е, че",
      choices: [
        { id: "a", text: "предоставя интерфейс за създаване на семейства свързани или взаимнозависими обекти" },
        { id: "b", text: "създава клас, който снабдява сложно множество обекти с прост интерфейс" },
        { id: "c", text: "капсулира заявка като обект" }
      ],
      correctAnswer: "b"
    },
    {
      id: "q5",
      type: "multiple",
      points: 1,
      prompt: "Кои от изброените характеристики се отнасят за шаблон „Команда“?",
      choices: [
        { id: "a", text: "поддържа обратни операции" },
        { id: "b", text: "капсулира заявка като обект" },
        { id: "c", text: "заявката се обработва в конвейер" },
        { id: "d", text: "преобразува интерфейса на един клас в интерфейс на друг" }
      ],
      correctAnswer: ["a", "b"]
    },
    {
      id: "q6",
      type: "single",
      points: 1,
      prompt: "Брой на елементите в масива в език C#, пространство .NET е определен от свойство:",
      choices: [
        { id: "a", text: "Rank" },
        { id: "b", text: "Count" },
        { id: "c", text: "Length" },
        { id: "d", text: "няма верен отговор" }
      ],
      correctAnswer: "c"
    },
    {
      id: "q7",
      type: "single",
      points: 1,
      prompt: "Шаблон „Строител“ се използва в случай че е необходимо",
      choices: [
        { id: "a", text: "да се изгради сложен обект" },
        { id: "b", text: "да се изгради интерфейс към сложно множество от класове" },
        { id: "c", text: "да се преобразува интерфейс към един клас в интерфейс към друг клас" },
        { id: "d", text: "да се поддържат обратни операции" }
      ],
      correctAnswer: "a"
    },
    {
      id: "q8",
      type: "multiple",
      points: 1,
      prompt: "Кои от изброените шаблони спадат към поведенческите?",
      choices: [
        { id: "a", text: "Адаптер" },
        { id: "b", text: "Сек" },
        { id: "c", text: "Стратегия" },
        { id: "d", text: "Фасада" },
        { id: "e", text: "Команда" }
      ],
      correctAnswer: ["c", "e"]
    },
    {
      id: "q9",
      type: "single",
      points: 1,
      prompt: "Премахване на елемент от дадена позиция от колекция List (език C#) е чрез метод:",
      choices: [
        { id: "a", text: "Remove" },
        { id: "b", text: "RemoveAt" },
        { id: "c", text: "RemoveRange" },
        { id: "d", text: "няма верен отговор" }
      ],
      correctAnswer: "b"
    },
    {
      id: "q10",
      type: "single",
      points: 1,
      prompt: "За да се гарантира, че даден клас ще има само една инстанция се използва шаблон:",
      choices: [
        { id: "a", text: "Строител" },
        { id: "b", text: "Метод Фабрика" },
        { id: "c", text: "Сек" },
        { id: "d", text: "няма верен отговор" }
      ],
      correctAnswer: "c"
    },

    // ===== Отворени задачи (решения като текст) =====
    {
      id: "q11",
      type: "open",
      points: 6,
      prompt: `Създаден е шаблон Метод Фабрика, който произвежда маси (продукт – RectangularTable / RoundTable). Декларирайте интерфейса на продуктите класове RectangularTable и RoundTable и двата производни класа, които създават продуктите.`,
      correctAnswer: `
public interface ITable { }
public class RectangularTable : ITable { }
public class RoundTable : ITable { }

public abstract class TableFactory {
    public abstract ITable CreateTable();
}

public class RectangularTableFactory : TableFactory {
    public override ITable CreateTable() => new RectangularTable();
}

public class RoundTableFactory : TableFactory {
    public override ITable CreateTable() => new RoundTable();
}`
    },
    {
      id: "q12",
      type: "open",
      points: 4,
      prompt: `Декларирайте абстрактен базов клас Tree, който описва дърво. Класът да съдържа абстрактен метод Info, който извежда информация за дървото. Декларирайте производен клас Pine, описващ дърво бор като предефинирате метод Info.`,
      correctAnswer: `
public abstract class Tree {
    public abstract void Info();
}

public class Pine : Tree {
    public override void Info() {
        Console.WriteLine("Pine");
    }
}`
    },
    {
      id: "q13",
      type: "open",
      points: 4,
      prompt: `Деклариран е абстрактен базов клас Figure, който описва пространствена фигура с абстрактен метод double Volume(). Декларирани са производни класове Cube и Cone. Дефинирайте масив figures, съдържащ по два обекта от производните класове. Намерете обема на тези фигури (изведете на конзолата).`,
      correctAnswer: `
Figure[] figures = {
    new Cube(2),
    new Cube(3),
    new Cone(1,2),
    new Cone(2,3)
};

foreach (var f in figures)
    Console.WriteLine(f.Volume());`
    },
    {
      id: "q14",
      type: "open",
      points: 6,
      prompt: `Създаден е клас Pet, описващ домашен любимец с един конструктор Pet(string name). Напишете програмен фрагмент, с който създавате List<Pet> от домашни любимци. В цикъл четете команди от конзолата: при команда „Добави“ добавяте нов любимец (името се въвежда на следващия ред), при команда „Изтрий“ премахвате посочения по име любимец. Цикълът приключва при команда „Край“.`,
      correctAnswer: `
List<Pet> pets = new List<Pet>();
string cmd;

while ((cmd = Console.ReadLine()) != "Край") {
    if (cmd == "Добави") {
        pets.Add(new Pet(Console.ReadLine()));
    } else if (cmd == "Изтрий") {
        string name = Console.ReadLine();
        pets.RemoveAll(p => p.Name == name);
    }
}`
    }
  ]
},

{
    id: "exam-security-1",
    category: "3.1 курс",
    title: "Тест КОМПЮТЪРНА И МРЕЖОВА СИГУРНОСТ 1",
    description: "Тест с въпроси за криптография, протоколи за сигурност и безжични мрежи",
    passwordHash: "",
    settings: {
      shuffleQuestions: false,
      shuffleChoices: false,
      timeLimitSeconds: 1800,
      allowImmediateRetry: true,
      passingScorePercent: 70,
      maxAttempts: 3
    },
    questions: [
      {
        id: "q1",
        type: "single",
        points: 1,
        prompt: "Кое е криптография с открит ключ?",
        choices: [
          { id: "a", text: "DES" },
          { id: "b", text: "MD5" },
          { id: "c", text: "RSA" },
          { id: "d", text: "HMAC" }
        ],
        correctAnswer: "c"
      },
      {
        id: "q2",
        type: "single",
        points: 1,
        prompt: "Колко битов блок използва DES?",
        choices: [
          { id: "a", text: "64" },
          { id: "b", text: "256" },
          { id: "c", text: "128" },
          { id: "d", text: "1024" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q3",
        type: "single",
        points: 1,
        prompt: "Кое се използва за автентикация на съобщения?",
        choices: [
          { id: "a", text: "DES" },
          { id: "b", text: "AES" },
          { id: "c", text: "RSA" },
          { id: "d", text: "MAC" }
        ],
        correctAnswer: "d"
      },
      {
        id: "q4",
        type: "single",
        points: 1,
        prompt: "Коя система използва „билети“ (ticket)?",
        choices: [
          { id: "a", text: "Kerberos" },
          { id: "b", text: "X.509" },
          { id: "c", text: "RADIUS" },
          { id: "d", text: "TACACS+" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q5",
        type: "single",
        points: 1,
        prompt: "Коя система се използва за безжичен roaming?",
        choices: [
          { id: "a", text: "Kerberos" },
          { id: "b", text: "X.509" },
          { id: "c", text: "RADIUS" },
          { id: "d", text: "TACACS+" }
        ],
        correctAnswer: "c"
      },
      {
        id: "q6",
        type: "single",
        points: 1,
        prompt: "Кой протокол осигурява автентичност?",
        choices: [
          { id: "a", text: "AH" },
          { id: "b", text: "ESP" },
          { id: "c", text: "ISAKMP" },
          { id: "d", text: "IKE" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q7",
        type: "single",
        points: 1,
        prompt: "Кой режим на работа на IPSec обикновено е между две крайни системи?",
        choices: [
          { id: "a", text: "Агресивен" },
          { id: "b", text: "Главен (Main)" },
          { id: "c", text: "Тунелен" },
          { id: "d", text: "Транспортен" }
        ],
        correctAnswer: "d"
      },
      {
        id: "q8",
        type: "single",
        points: 1,
        prompt: "Кое е протокол за управление на ключове?",
        choices: [
          { id: "a", text: "AH" },
          { id: "b", text: "ESP" },
          { id: "c", text: "ISAKMP" },
          { id: "d", text: "IKE" }
        ],
        correctAnswer: "d"
      },
      {
        id: "q9",
        type: "single",
        points: 1,
        prompt: "Кои протокол използва TCP порт 49?",
        choices: [
          { id: "a", text: "Kerberos" },
          { id: "b", text: "RADIUS" },
          { id: "c", text: "IKE" },
          { id: "d", text: "ISAKMP" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q10",
        type: "single",
        points: 1,
        prompt: "Коя защитна стена проверява само IP адрес и номер на порт?",
        choices: [
          { id: "a", text: "Packet Filter" },
          { id: "b", text: "Stateful" },
          { id: "c", text: "Proxy" },
          { id: "d", text: "Circuit Level" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q11",
        type: "single",
        points: 1,
        prompt: "Кое е протокол за сигурност в безжични мрежи?",
        choices: [
          { id: "a", text: "IEEE 802.11a" },
          { id: "b", text: "IEEE 802.1p" },
          { id: "c", text: "IEEE 802.1q" },
          { id: "d", text: "IEEE 802.11i" }
        ],
        correctAnswer: "d"
      },
      {
        id: "q12",
        type: "single",
        points: 1,
        prompt: "Кой протокол прави двустъпкова автентикация при PPP (PPPoE)?",
        choices: [
          { id: "a", text: "LCP" },
          { id: "b", text: "NCP" },
          { id: "c", text: "PAP" },
          { id: "d", text: "CHAP" }
        ],
        correctAnswer: "d"
      },
      {
        id: "q13",
        type: "single",
        points: 1,
        prompt: "Кой процес се използва за оповестяване на услуги в безжична мрежа?",
        choices: [
          { id: "a", text: "Beaconing" },
          { id: "b", text: "Probing" },
          { id: "c", text: "Authentication" },
          { id: "d", text: "Association" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q14",
        type: "single",
        points: 1,
        prompt: "Кое от следните използва AES за криптиране?",
        choices: [
          { id: "a", text: "WEP" },
          { id: "b", text: "WPA" },
          { id: "c", text: "WAP" },
          { id: "d", text: "WPA2" }
        ],
        correctAnswer: "d"
      },
      {
        id: "q15",
        type: "single",
        points: 1,
        prompt: "Кой порт използва HTTPS?",
        choices: [
          { id: "a", text: "80" },
          { id: "b", text: "443" },
          { id: "c", text: "53" },
          { id: "d", text: "8080" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q16",
        type: "open",
        points: 1,
        prompt: "Какви протоколи за сигурност на транспортно ниво познавате?",
        correctAnswer: "TLS, SSL, DTLS"
      },
      {
        id: "q17",
        type: "open",
        points: 1,
        prompt: "Кой протокол за сигурност в безжични мрежи според вас е най-малко сигурен?",
        correctAnswer: "WEP- използва слаб ключ, който се разбива за минути"
      },
      {
        id: "q18",
        type: "open",
        points: 1,
        prompt: "Как се нарича механизъм за сигурност в локални мрежи, разделящ мрежата на физически разделени подмрежи?",
        correctAnswer: "Физическо сегментиране на мрежата - VLAN"
      },
      {
        id: "q19",
        type: "open",
        points: 1,
        prompt: "Кой протокол (приложение) за автентикация криптира съобщенията за по-добра сигурност?",
        correctAnswer: "TACACS+"
      },
      {
        id: "q20",
        type: "open",
        points: 1,
        prompt: "Какво се използва за защита от речникова атака на парола?",
        correctAnswer: "Salt"
      }
    ]
  },
  
  {
    id: "exam-networksecurity-2",
    category: "3.1 курс",
    title: "Тест КОМПЮТЪРНА И МРЕЖОВА СИГУРНОСТ 2",
    description: "Въпроси за криптография, IPSec, безжични мрежи и автентикация (OCR от сканиран лист).",
    passwordHash: "",
    settings: {
      shuffleQuestions: false,
      shuffleChoices: false,
      timeLimitSeconds: 1800,
      allowImmediateRetry: true,
      passingScorePercent: 70,
      maxAttempts: 3
    },
    questions: [
      {
        id: "q1",
        type: "single",
        points: 1,
        prompt: "Кое е блоков шифър?",
        choices: [
          { id: "a", text: "DES" },
          { id: "b", text: "MD5" },
          { id: "c", text: "RSA" },
          { id: "d", text: "HMAC" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q2",
        type: "single",
        points: 1,
        prompt: "Колко битов блок използва AES?",
        choices: [
          { id: "a", text: "64" },
          { id: "b", text: "128" },
          { id: "c", text: "256" },
          { id: "d", text: "1024" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q3",
        type: "single",
        points: 1,
        prompt: "Кое се използва за криптиране на съобщения?",
        choices: [
          { id: "a", text: "SHA-1" },
          { id: "b", text: "MD5" },
          { id: "c", text: "HMAC" },
          { id: "d", text: "AES" }
        ],
        correctAnswer: "d"
      },
      {
        id: "q4",
        type: "single",
        points: 1,
        prompt: "Коя система използва сертификати?",
        choices: [
          { id: "a", text: "Kerberos" },
          { id: "b", text: "X.509" },
          { id: "c", text: "RADIUS" },
          { id: "d", text: "TACACS+" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q5",
        type: "single",
        points: 1,
        prompt: "Коя система работи с различни от IP протоколи?",
        choices: [
          { id: "a", text: "Kerberos" },
          { id: "b", text: "X.509" },
          { id: "c", text: "RADIUS" },
          { id: "d", text: "TACACS+" }
        ],
        // Изборът тук е направен като най-вероятен (TACACS+), формулировката в оригинала е малко неясна.
        correctAnswer: "d"
      },
      {
        id: "q6",
        type: "single",
        points: 1,
        prompt: "Кой протокол осигурява поверителност?",
        choices: [
          { id: "a", text: "AH" },
          { id: "b", text: "ESP" },
          { id: "c", text: "ISAKMP" },
          { id: "d", text: "IKE" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q7",
        type: "single",
        points: 1,
        prompt: "Кой режим на работа на IPSec обикновено е между два маршрутизатора (router)?",
        choices: [
          { id: "a", text: "Агресивен" },
          { id: "b", text: "Главен (Main)" },
          { id: "c", text: "Тунелен" },
          { id: "d", text: "Транспортен" }
        ],
        correctAnswer: "c"
      },
      {
        id: "q8",
        type: "single",
        points: 1,
        prompt: "Кое е протокол за обмен на ключове?",
        choices: [
          { id: "a", text: "AH" },
          { id: "b", text: "ESP" },
          { id: "c", text: "ISAKMP" },
          { id: "d", text: "IKE" }
        ],
        correctAnswer: "d"
      },
      {
        id: "q9",
        type: "single",
        points: 1,
        prompt: "Кой протокол използва UDP порт 500?",
        choices: [
          { id: "a", text: "Kerberos" },
          { id: "b", text: "RADIUS" },
          { id: "c", text: "IKE" },
          { id: "d", text: "ISAKMP" }
        ],
        correctAnswer: "c"
      },
      {
        id: "q10",
        type: "single",
        points: 1,
        prompt: "Коя защитна стена проверява кодовите битове на TCP?",
        choices: [
          { id: "a", text: "Packet Filter" },
          { id: "b", text: "Stateful" },
          { id: "c", text: "Proxy" },
          { id: "d", text: "Circuit Level" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q11",
        type: "single",
        points: 1,
        prompt: "Кое е протокол за гръбнак на VLAN?",
        choices: [
          { id: "a", text: "IEEE 802.11a" },
          { id: "b", text: "IEEE 802.1p" },
          { id: "c", text: "IEEE 802.1q" },
          { id: "d", text: "IEEE 802.11i" }
        ],
        correctAnswer: "c"
      },
      {
        id: "q12",
        type: "single",
        points: 1,
        prompt: "Кой протокол прави тристъпкова автентикация при PPP (PPPoE)?",
        choices: [
          { id: "a", text: "LCP" },
          { id: "b", text: "NCP" },
          { id: "c", text: "PAP" },
          { id: "d", text: "CHAP" }
        ],
        correctAnswer: "d"
      },
      {
        id: "q13",
        type: "single",
        points: 1,
        prompt: "Кой процес проверява MAC адреса на клиента в безжична мрежа?",
        choices: [
          { id: "a", text: "Beaconing" },
          { id: "b", text: "Probing" },
          { id: "c", text: "Authentication" },
          { id: "d", text: "Association" }
        ],
        correctAnswer: "c"
      },
      {
        id: "q14",
        type: "single",
        points: 1,
        prompt: "Кое от следните не е протокол за защита в безжични мрежи?",
        choices: [
          { id: "a", text: "WEP" },
          { id: "b", text: "WPA" },
          { id: "c", text: "WAP" },
          { id: "d", text: "WPA2" }
        ],
        correctAnswer: "c"
      },
      {
        id: "q15",
        type: "single",
        points: 1,
        prompt: "Кой протокол за сигурност използва HTTPS?",
        choices: [
          { id: "a", text: "IPSec" },
          { id: "b", text: "SSH" },
          { id: "c", text: "TLS" },
          { id: "d", text: "MDS" }
        ],
        correctAnswer: "c"
      },
      {
        id: "q16",
        type: "open",
        points: 2,
        prompt: "Какви механизми за сигурност на електронна поща познавате?",
        correctAnswer: "S/MIME, PGP, STARTTLS, DKIM, SPF, DMARC"
      },
      {
        id: "q17",
        type: "open",
        points: 1,
        prompt: "Кой протокол за сигурност в безжични мрежи според вас е най-сигурен?",
        correctAnswer: "WPA3 е най-новият и по-сигурен стандарт."
      },
      {
        id: "q18",
        type: "open",
        points: 1,
        prompt: "Как се нарича механизъм за сигурност в локални мрежи, защитаващ от подмяна на MAC адрес?",
        correctAnswer: "Port security  802.1X"
      },
      {
        id: "q19",
        type: "open",
        points: 1,
        prompt: "Кой протокол (приложение) за автентикация комбинира автентикация и авторизация в потребителски профил?",
        correctAnswer: "RADIUS"
      },
      {
        id: "q20",
        type: "open",
        points: 1,
        prompt: "Какво се използва за защита от атака на парола с брутална сила?",
        correctAnswer: "Salt+Argon2, rate-limiting, 2FA"
      }
    ]
  },

   {
    id: "exam-nosql-1",
    category: "3.1 курс",
    title: "NoSQL и MongoDB - Пълен Изпит",
    description: "Цялостен изпит покриващ релационни бази, NoSQL, MongoDB, Cloudant и практически задачи. Включва теория, заявки, aggregation, моделиране и програмиране.",
    passwordHash: "",
    settings: {
      shuffleQuestions: false,
      shuffleChoices: true,
      timeLimitSeconds: 7200,
      allowImmediateRetry: true,
      passingScorePercent: 70,
      maxAttempts: 3
    },
    questions: [
      {
        id: "q1",
        type: "single",
        points: 1,
        prompt: "Какво представлява релационна база данни?",
        choices: [
          { id: "a", text: "Данни в дървовидна структура" },
          { id: "b", text: "Данни в таблици (редове/колони), връзки чрез първични и външни ключове; заявки със SQL" },
          { id: "c", text: "Данни в JSON документи" },
          { id: "d", text: "Данни в графична структура" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q2",
        type: "multiple",
        points: 1,
        prompt: "Кои са ACID свойствата — кратко описание?",
        choices: [
          { id: "a", text: "Atomicity - операциите са неделими" },
          { id: "b", text: "Consistency - данните винаги в валидно състояние" },
          { id: "c", text: "Isolation - транзакции са изолирани" },
          { id: "d", text: "Durability - промените са постоянни" },
          { id: "e", text: "Availability - системата винаги достъпна" }
        ],
        correctAnswer: ["a", "b", "c", "d"]
      },
      {
        id: "q3",
        type: "single",
        points: 1,
        prompt: "Какво е нормализация? Защо се прави?",
        choices: [
          { id: "a", text: "Добавяне на повече данни за бързодействие" },
          { id: "b", text: "Разделяне на данни в таблици за намаляване на дублиране и аномалии при обновяване" },
          { id: "c", text: "Криптиране на данни" },
          { id: "d", text: "Създаване на резервни копия" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q4",
        type: "single",
        points: 1,
        prompt: "Кога една таблица е в 1NF?",
        choices: [
          { id: "a", text: "Има първичен ключ" },
          { id: "b", text: "Всички атрибути имат атомарни стойности; няма повтарящи се групи" },
          { id: "c", text: "Няма транзитивни зависимости" },
          { id: "d", text: "Има всички външни ключове" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q5",
        type: "single",
        points: 1,
        prompt: "SQL: Какво прави SELECT DISTINCT col FROM T;?",
        choices: [
          { id: "a", text: "Връща всички стойности на col" },
          { id: "b", text: "Връща уникалните стойности на col" },
          { id: "c", text: "Сортира резултатите" },
          { id: "d", text: "Групира по col" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q6",
        type: "single",
        points: 1,
        prompt: "Какво е INNER JOIN?",
        choices: [
          { id: "a", text: "Връща всички редове от лявата таблица" },
          { id: "b", text: "Връща редове, които имат съвпадение в двете таблици по join условието" },
          { id: "c", text: "Връща редове без съвпадения" },
          { id: "d", text: "Комбинира всички редове от двете таблици" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q7",
        type: "single",
        points: 1,
        prompt: "Защо релационните бази могат да имат проблеми при голямо натоварване?",
        choices: [
          { id: "a", text: "Твърде лесни за управление" },
          { id: "b", text: "JOIN-ове са скъпи, хоризонталното мащабиране е трудно, write throughput може да е ограничен" },
          { id: "c", text: "Нямат индекси" },
          { id: "d", text: "Не поддържат транзакции" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q8",
        type: "single",
        points: 1,
        prompt: "Какво е хоризонтално мащабиране (scale out) vs вертикално (scale up)?",
        choices: [
          { id: "a", text: "Horiz: добавяне на машини; Vert: повече ресурси на една машина" },
          { id: "b", text: "Horiz: по-добър хардуер; Vert: повече софтуер" },
          { id: "c", text: "Едно и също нещо" },
          { id: "d", text: "Horiz: намаляване на цена; Vert: увеличаване на цена" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q9",
        type: "multiple",
        points: 1,
        prompt: "Назови 4 основни типа NoSQL бази:",
        choices: [
          { id: "a", text: "Документни" },
          { id: "b", text: "Ключ-стойност" },
          { id: "c", text: "Колонно-ориентирани" },
          { id: "d", text: "Графови" },
          { id: "e", text: "Релационни" }
        ],
        correctAnswer: ["a", "b", "c", "d"]
      },
      {
        id: "q10",
        type: "single",
        points: 1,
        prompt: "Какво казва CAP теоремата?",
        choices: [
          { id: "a", text: "Базата трябва да е бърза" },
          { id: "b", text: "В разпределена система можеш да гарантираш само две от трите: Consistency, Availability, Partition tolerance" },
          { id: "c", text: "Винаги трябва да имаш всички три" },
          { id: "d", text: "Теорема за релационните бази" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q11",
        type: "single",
        points: 1,
        prompt: "Какво е eventual consistency?",
        choices: [
          { id: "a", text: "Винаги консистентни данни" },
          { id: "b", text: "Репликите стават съгласувани с течение на времето, при липса на нови промени" },
          { id: "c", text: "Няма консистентност" },
          { id: "d", text: "Само при писане" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q12",
        type: "single",
        points: 1,
        prompt: "В какъв формат се съхраняват документите в MongoDB?",
        choices: [
          { id: "a", text: "XML" },
          { id: "b", text: "CSV" },
          { id: "c", text: "BSON (бинарен JSON)" },
          { id: "d", text: "YAML" }
        ],
        correctAnswer: "c"
      },
      {
        id: "q13",
        type: "single",
        points: 1,
        prompt: "Какво е ObjectId? Защо се използва?",
        choices: [
          { id: "a", text: "Име на база данни" },
          { id: "b", text: "12-байтов идентификатор, използван като _id по подразбиране" },
          { id: "c", text: "Тип данни за числа" },
          { id: "d", text: "Оператор за заявки" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q14",
        type: "single",
        points: 1,
        prompt: "Какъв е стандартният порт на MongoDB?",
        choices: [
          { id: "a", text: "3306" },
          { id: "b", text: "5432" },
          { id: "c", text: "27017" },
          { id: "d", text: "8080" }
        ],
        correctAnswer: "c"
      },
      {
        id: "q15",
        type: "single",
        points: 1,
        prompt: "Какво означава, че MongoDB има „гъвкава схема“?",
        choices: [
          { id: "a", text: "Документите в колекцията могат да имат различни полета/структури" },
          { id: "b", text: "Няма схема" },
          { id: "c", text: "Само един тип документ" },
          { id: "d", text: "Фиксирана структура" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q16_open",
        type: "open",
        points: 2,
        prompt: "Вмъкни документ student с име и възраст — пример (Mongo shell):",
        correctAnswer: "db.students.insertOne({ name: \"Иван\", age: 21 })",
        scoring: { type: "text", language: "javascript" }
      },
      {
        id: "q17_open",
        type: "open",
        points: 2,
        prompt: "Намери всички студенти с age > 20 (Mongo shell):",
        correctAnswer: "db.students.find({ age: { $gt: 20 } })",
        scoring: { type: "text", language: "javascript" }
      },
      {
        id: "q18_open",
        type: "open",
        points: 2,
        prompt: "Обнови първия студент с name=\"Иван\" да има age=22 (Mongo shell):",
        correctAnswer: "db.students.updateOne({ name: \"Иван\" }, { $set: { age: 22 } })",
        scoring: { type: "text", language: "javascript" }
      },
      {
        id: "q19_open",
        type: "open",
        points: 2,
        prompt: "Изтрий всички документи със type: \"backup\" (Mongo shell):",
        correctAnswer: "db.collection.deleteMany({ type: \"backup\" })",
        scoring: { type: "text", language: "javascript" }
      },
      {
        id: "q20",
        type: "single",
        points: 1,
        prompt: "Какво прави $elemMatch? Дай пример:",
        choices: [
          { id: "a", text: "Събира елементи в масив" },
          { id: "b", text: "Филтрира масиви като прилага няколко условия към един елемент" },
          { id: "c", text: "Сортира масив" },
          { id: "d", text: "Преброява елементи в масив" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q21",
        type: "single",
        points: 1,
        prompt: "Как работи $in? Пример:",
        choices: [
          { id: "a", text: "Проверява дали поле принадлежи на списък стойности" },
          { id: "b", text: "Проверява за интервал" },
          { id: "c", text: "Създава индекс" },
          { id: "d", text: "Групира по поле" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q22",
        type: "single",
        points: 1,
        prompt: "Какво прави $project в aggregation?",
        choices: [
          { id: "a", text: "Определя кои полета да преминат в следващата фаза; може да създава нови полета" },
          { id: "b", text: "Филтрира документи" },
          { id: "c", text: "Групира документи" },
          { id: "d", text: "Сортира документи" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q23",
        type: "single",
        points: 1,
        prompt: "Какъв е ефектът на $unwind?",
        choices: [
          { id: "a", text: "Превръща масив поле в множество документи, един за всеки елемент" },
          { id: "b", text: "Обединява документи" },
          { id: "c", text: "Криптира данни" },
          { id: "d", text: "Създава индекс" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q24_open",
        type: "open",
        points: 2,
        prompt: "Как да изчисля среден average от масив с оценки в aggregation?",
        correctAnswer: "{ $project: { average: { $avg: \"$grades.value\" } } }",
        scoring: { type: "text", language: "javascript" }
      },
      {
        id: "q25_open",
        type: "open",
        points: 3,
        prompt: "Напиши pipeline за броене на студенти по специалност (group by specialty):",
        correctAnswer: "[ { $group: { _id: \"$specialty\", count: { $sum: 1 } } } ]",
        scoring: { type: "text", language: "javascript" }
      },
      {
        id: "q26_open",
        type: "open",
        points: 3,
        prompt: "Pipeline: намери студенти с поне една оценка 6 и върни name и най-високата оценка:",
        correctAnswer: "[{ $match: { \"grades.value\": 6 } }, { $project: { name:1, maxGrade: { $max: \"$grades.value\" } } }]",
        scoring: { type: "text", language: "javascript" }
      },
      {
        id: "q27_open",
        type: "open",
        points: 3,
        prompt: "Напиши pipeline за average оценка по предмет:",
        correctAnswer: "[{ $unwind: \"$grades\" }, { $group: { _id: \"$grades.subject\", avg: { $avg: \"$grades.value\" } } }]",
        scoring: { type: "text", language: "javascript" }
      },
      {
        id: "q28",
        type: "single",
        points: 1,
        prompt: "На какъв език са map и reduce функциите в MongoDB?",
        choices: [
          { id: "a", text: "Python" },
          { id: "b", text: "Java" },
          { id: "c", text: "JavaScript" },
          { id: "d", text: "C++" }
        ],
        correctAnswer: "c"
      },
      {
        id: "q29",
        type: "single",
        points: 1,
        prompt: "Кога използваме MapReduce вместо aggregation framework?",
        choices: [
          { id: "a", text: "Винаги" },
          { id: "b", text: "Рядко — за много сложна логика, която не може лесно да се реализира в aggregation" },
          { id: "c", text: "За прости заявки" },
          { id: "d", text: "Когато искаме по-бърза работа" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q30",
        type: "single",
        points: 1,
        prompt: "Каква е разликата между Embedded и Reference модел? Кога какво се използва?",
        choices: [
          { id: "a", text: "Embedded — вграден обект в един документ; Reference — съхранява се id към друг документ" },
          { id: "b", text: "Едно и също" },
          { id: "c", text: "Embedded за големи данни, Reference за малки" },
          { id: "d", text: "Само Embedded се използва" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q31",
        type: "single",
        points: 1,
        prompt: "Какво е денормализация и защо се използва?",
        choices: [
          { id: "a", text: "Копиране/вграждане на данни за по-бързо четене" },
          { id: "b", text: "Разделяне на таблици" },
          { id: "c", text: "Премахване на данни" },
          { id: "d", text: "Криптиране на данни" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q32",
        type: "single",
        points: 1,
        prompt: "Кога използваме шаблона Subset?",
        choices: [
          { id: "a", text: "Когато документ съдържа много данни, но често се чете само малка част" },
          { id: "b", text: "Когато имаме малко данни" },
          { id: "c", text: "За резервни копия" },
          { id: "d", text: "За временни данни" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q33",
        type: "single",
        points: 1,
        prompt: "Кога използваме шаблона Approximation?",
        choices: [
          { id: "a", text: "Когато точността не е критична, важни са performance/throughput" },
          { id: "b", text: "Винаги" },
          { id: "c", text: "За финансови транзакции" },
          { id: "d", text: "За криптография" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q34",
        type: "single",
        points: 1,
        prompt: "Какво е шаблонът Bucket? Пример:",
        choices: [
          { id: "a", text: "Групиране на множество елементи в един документ като масив" },
          { id: "b", text: "Разделяне на документи" },
          { id: "c", text: "Изтриване на стари данни" },
          { id: "d", text: "Криптиране на групи" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q35",
        type: "single",
        points: 1,
        prompt: "Какво прави индексът в MongoDB?",
        choices: [
          { id: "a", text: "Ускорява търсене и сортиране по полета; но забавя записите и използва памет" },
          { id: "b", text: "Забавя всичко" },
          { id: "c", text: "Само сортира" },
          { id: "d", text: "Криптира данни" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q36",
        type: "single",
        points: 1,
        prompt: "Какво е compound index?",
        choices: [
          { id: "a", text: "Индекс върху комбинация от полета" },
          { id: "b", text: "Индекс за числа" },
          { id: "c", text: "Временен индекс" },
          { id: "d", text: "Глобален индекс" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q37",
        type: "single",
        points: 1,
        prompt: "Какъв индекс да използваш, ако търсиш по email уникално поле?",
        choices: [
          { id: "a", text: "Уникален индекс" },
          { id: "b", text: "TTL индекс" },
          { id: "c", text: "Текстов индекс" },
          { id: "d", text: "Няма нужда от индекс" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q38_open",
        type: "open",
        points: 2,
        prompt: "Как работи TTL индекс? Пример:",
        correctAnswer: "db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })",
        scoring: { type: "text", language: "javascript" }
      },
      {
        id: "q39",
        type: "single",
        points: 1,
        prompt: "Какво е репликационен сет (replica set)?",
        choices: [
          { id: "a", text: "Група от MongoDB инстанции — един primary и няколко secondary" },
          { id: "b", text: "Един сървър" },
          { id: "c", text: "Клиентска библиотека" },
          { id: "d", text: "База данни за backup" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q40",
        type: "single",
        points: 1,
        prompt: "Какво е шардинг? Защо се прави?",
        choices: [
          { id: "a", text: "Хоризонтално разделяне на данни между шарди за много големи данни" },
          { id: "b", text: "Вертикално разделяне" },
          { id: "c", text: "Криптиране" },
          { id: "d", text: "Компресиране" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q41",
        type: "single",
        points: 1,
        prompt: "Какво е write concern? Пример:",
        choices: [
          { id: "a", text: "Настройка колко реплики трябва да потвърдят запис" },
          { id: "b", text: "Брой на индекси" },
          { id: "c", text: "Размер на документ" },
          { id: "d", text: "Брой на колекции" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q42",
        type: "single",
        points: 1,
        prompt: "Какво е read preference?",
        choices: [
          { id: "a", text: "Кое копие (primary/secondary) се използва за четене" },
          { id: "b", text: "Предпочитан език" },
          { id: "c", text: "Формат на данни" },
          { id: "d", text: "Вид на заявка" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q43",
        type: "single",
        points: 1,
        prompt: "Какъв тип база е Cloudant?",
        choices: [
          { id: "a", text: "Облачна документна база, базирана на CouchDB" },
          { id: "b", text: "Релационна база" },
          { id: "c", text: "Графова база" },
          { id: "d", text: "Ключ-стойност база" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q44",
        type: "single",
        points: 1,
        prompt: "Какво са Views в CouchDB/Cloudant?",
        choices: [
          { id: "a", text: "Индексирани изгледи (map/reduce функции)" },
          { id: "b", text: "Визуализации" },
          { id: "c", text: "Таблици" },
          { id: "d", text: "Форми" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q45",
        type: "single",
        points: 1,
        prompt: "Какво е Mango query?",
        choices: [
          { id: "a", text: "JSON-базиран език за заявки в CouchDB/Cloudant" },
          { id: "b", text: "Заявка за плодове" },
          { id: "c", text: "SQL диалект" },
          { id: "d", text: "Визуален инструмент" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q46",
        type: "single",
        points: 1,
        prompt: "Защо използваме async/await?",
        choices: [
          { id: "a", text: "За по-четим синхронно изглеждащ асинхронен код" },
          { id: "b", text: "За по-бърз код" },
          { id: "c", text: "За по-малко код" },
          { id: "d", text: "За callback-и" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q47_open",
        type: "open",
        points: 2,
        prompt: "Как да импортираш MongoDB драйвъра в Node (CommonJS)?",
        correctAnswer: "const { MongoClient } = require('mongodb');",
        scoring: { type: "text", language: "javascript" }
      },
      {
        id: "q48_open",
        type: "open",
        points: 3,
        prompt: "Пример: свържи се и намери всички студенти (Node.js код):",
        correctAnswer: "const client = new MongoClient(uri);\nawait client.connect();\nconst db = client.db('mydb');\nconst students = await db.collection('students').find({}).toArray();\nawait client.close();",
        scoring: { type: "code", language: "javascript" }
      },
      {
        id: "q49",
        type: "single",
        points: 1,
        prompt: "Какво прави collection.deleteMany(eq(\"type\", \"backup\")) в Java?",
        choices: [
          { id: "a", text: "Изтрива всички документи с поле type равно на \"backup\"" },
          { id: "b", text: "Добавя документи" },
          { id: "c", text: "Обновява документи" },
          { id: "d", text: "Създава колекция" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q50",
        type: "single",
        points: 1,
        prompt: "Пример за филтър eq(\"grade.value\", 2L) — какво връща?",
        choices: [
          { id: "a", text: "Документите, които имат поне един обект в grade с value = 2" },
          { id: "b", text: "Документи с grade 2L" },
          { id: "c", text: "Всички документи" },
          { id: "d", text: "Нищо" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q51",
        type: "single",
        points: 1,
        prompt: "Как да сортираш резултати в Java драйвъра по name възходящо?",
        choices: [
          { id: "a", text: "find(filter).sort(Sorts.ascending(\"name\"))" },
          { id: "b", text: "find(filter).orderBy(\"name\")" },
          { id: "c", text: "sort(\"name\")" },
          { id: "d", text: "find(filter).asc(\"name\")" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q52_open",
        type: "open",
        points: 2,
        prompt: "Напиши Mongo заявка (shell) за: студенти с фамилия \"Иванова\", показвай само name и grades:",
        correctAnswer: "db.students.find({ \"name.lastName\": \"Иванова\" }, { \"name\":1, \"grades\":1, _id:0 })",
        scoring: { type: "text", language: "javascript" }
      },
      {
        id: "q53_open",
        type: "open",
        points: 3,
        prompt: "Обнови оценката по предмет \"НБД\" за студент с _id: ObjectId(\"...\") на 4:",
        correctAnswer: "db.students.updateOne({ _id: ObjectId(\"...\"), \"grades.subject\": \"НБД\" }, { $set: { \"grades.$.value\": 4 } })",
        scoring: { type: "text", language: "javascript" }
      },
      {
        id: "q54_open",
        type: "open",
        points: 3,
        prompt: "Обновление с arrayFilters: увеличи value с 1 за всички елементи в grades с subject=\"Math\":",
        correctAnswer: "db.students.updateMany({}, { $inc: { \"grades.$[elem].value\": 1 } }, { arrayFilters: [ { \"elem.subject\": \"Math\" } ] })",
        scoring: { type: "text", language: "javascript" }
      },
      {
        id: "q55",
        type: "single",
        points: 1,
        prompt: "Какво прави collection.deleteMany(new Document()) в Java?",
        choices: [
          { id: "a", text: "Изтрива всички документи в колекцията" },
          { id: "b", text: "Създава празен документ" },
          { id: "c", text: "Добавя документ" },
          { id: "d", text: "Нищо" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q56_open",
        type: "open",
        points: 2,
        prompt: "Поправи грешката: var students = { names: [ \"name\": {\"firstname\":\"Иван\",\"family\":\"Иванов\"} ] };",
        correctAnswer: "var students = { names: [ { firstname: \"Иван\", family: \"Иванов\" } ] };",
        scoring: { type: "text", language: "javascript" }
      },
      {
        id: "q57_open",
        type: "open",
        points: 2,
        prompt: "Поправи: await collection =>find( { }, { projection: {$and(id: 0, studentId: 1)}, } );",
        correctAnswer: "await collection.find({}, { projection: { _id: 0, studentId: 1 } }).toArray();",
        scoring: { type: "text", language: "javascript" }
      },
      {
        id: "q58",
        type: "single",
        points: 1,
        prompt: "Java update с грешен array filter — какъв е често срещаният проблем?",
        choices: [
          { id: "a", text: "Неправилен ключ в arrayFilters" },
          { id: "b", text: "Твърде много филтри" },
          { id: "c", text: "Липса на кома" },
          { id: "d", text: "Грешен оператор" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q59",
        type: "single",
        points: 1,
        prompt: "Кое твърдение за NoSQL е вярно?",
        choices: [
          { id: "a", text: "Винаги е ACID" },
          { id: "b", text: "Никога не поддържа индекси" },
          { id: "c", text: "Обикновено предлага eventual consistency" },
          { id: "d", text: "Използва само SQL" }
        ],
        correctAnswer: "c"
      },
      {
        id: "q60",
        type: "single",
        points: 1,
        prompt: "Кога графовите бази са предпочитани?",
        choices: [
          { id: "a", text: "Когато имаш много връзки между ентитети" },
          { id: "b", text: "За финансови транзакции" },
          { id: "c", text: "За документи" },
          { id: "d", text: "За ключ-стойност" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q61_open",
        type: "open",
        points: 2,
        prompt: "SQL: SELECT * FROM Students WHERE age > 20 ORDER BY name; — Mongo еквивалент:",
        correctAnswer: "db.students.find({ age: { $gt: 20 } }).sort({ name: 1 })",
        scoring: { type: "text", language: "javascript" }
      },
      {
        id: "q62_open",
        type: "open",
        points: 3,
        prompt: "SQL JOIN: SELECT SubjectName FROM SubjectSpecialty INNER JOIN Teacher ON SubjectSpecialty.teacherId = Teacher.id WHERE Teacher.name='Иванов' — Mongo aggregation:",
        correctAnswer: "db.SubjectSpecialty.aggregate([\n  { $lookup: { from: \"Teacher\", localField: \"teacherId\", foreignField: \"_id\", as: \"teacher\" } },\n  { $unwind: \"$teacher\" },\n  { $match: { \"teacher.name\": \"Иванов\" } },\n  { $project: { subjectName: 1, _id:0 } }\n])",
        scoring: { type: "code", language: "javascript" }
      },
      {
        id: "q63_open",
        type: "open",
        points: 3,
        prompt: "Дизайнирай схема за блог платформа (users, posts, comments) — предложи collections и полета:",
        correctAnswer: "users — { _id, name, email, profile }\nposts — { _id, authorId (ref), title, body, tags, createdAt, commentsCount }\ncomments — { _id, postId (ref), authorId (ref), body, createdAt }",
        scoring: { type: "text", language: "javascript" }
      },
      {
        id: "q64",
        type: "single",
        points: 1,
        prompt: "Какъв shard key би избрал за колекция с логове (много писания)?",
        choices: [
          { id: "a", text: "Поле с равномерно разпределение (hash на userId или date_hash)" },
          { id: "b", text: "Авто-инкрементиращо се поле" },
          { id: "c", text: "Постоянна стойност" },
          { id: "d", text: "Голям стринг" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q65",
        type: "single",
        points: 1,
        prompt: "Какво прави операторът $or?",
        choices: [
          { id: "a", text: "Връща документи, когато поне едно от условията е изпълнено" },
          { id: "b", text: "Изисква всички условия" },
          { id: "c", text: "Отрича условие" },
          { id: "d", text: "Групира условия" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q66",
        type: "single",
        points: 1,
        prompt: "Кога е подходящ MERN стек?",
        choices: [
          { id: "a", text: "За SPA приложения, пълно JavaScript решение" },
          { id: "b", text: "За desktop приложения" },
          { id: "c", text: "За embedded системи" },
          { id: "d", text: "За мобилни приложения на iOS" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q67",
        type: "single",
        points: 1,
        prompt: "Какво е ISODate в MongoDB?",
        choices: [
          { id: "a", text: "Тип Date, представен като ISODate(\"YYYY-MM-DDTHH:MM:SSZ\")" },
          { id: "b", text: "Име на база" },
          { id: "c", text: "Оператор" },
          { id: "d", text: "Формат на документ" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q68",
        type: "single",
        points: 1,
        prompt: "Обясни защо денормализирането може да причини проблеми при write-heavy приложения:",
        choices: [
          { id: "a", text: "Тъй като данните са дублирани, при update трябва да се променят повече документи" },
          { id: "b", text: "По-малко писания" },
          { id: "c", text: "Няма проблеми" },
          { id: "d", text: "Само при четене" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q69",
        type: "single",
        points: 1,
        prompt: "Как да направиш атомична транзакция в MongoDB при операция върху две колекции?",
        choices: [
          { id: "a", text: "Използвай multi-document transactions в replica set" },
          { id: "b", text: "Не може" },
          { id: "c", text: "Само с embedded документи" },
          { id: "d", text: "С един update" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q70",
        type: "single",
        points: 1,
        prompt: "Как работи findOneAndUpdate спрямо updateOne?",
        choices: [
          { id: "a", text: "findOneAndUpdate връща стария/новия документ; updateOne връща само резултат" },
          { id: "b", text: "Едно и също" },
          { id: "c", text: "findOneAndUpdate е по-бавен" },
          { id: "d", text: "updateOne връща документ" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q71_open",
        type: "open",
        points: 4,
        prompt: "Напиши Node.js Express endpoint GET /students/top който връща топ 10 студенти по average grade:",
        correctAnswer: "app.get('/students/top', async (req, res) => {\n  const pipeline = [\n    { $project: { name:1, avg: { $avg: \"$grades.value\" } } },\n    { $sort: { avg: -1 } },\n    { $limit: 10 }\n  ];\n  const top = await db.collection('students').aggregate(pipeline).toArray();\n  res.json(top);\n});",
        scoring: { type: "code", language: "javascript" }
      },
      {
        id: "q72_open",
        type: "open",
        points: 2,
        prompt: "Напиши Java код за изтриване на всички документи с field expired: true:",
        correctAnswer: "collection.deleteMany(eq(\"expired\", true));",
        scoring: { type: "text", language: "java" }
      },
      {
        id: "q73",
        type: "single",
        points: 1,
        prompt: "Как да добавиш документ в Cloudant чрез HTTP POST?",
        choices: [
          { id: "a", text: "POST към /{db} с JSON тяло; или PUT към /{db}/{docid}" },
          { id: "b", text: "Само GET" },
          { id: "c", text: "Само DELETE" },
          { id: "d", text: "Чести файлове" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q74",
        type: "single",
        points: 1,
        prompt: "Как работи conflict resolution в CouchDB/Cloudant?",
        choices: [
          { id: "a", text: "CouchDB е мулти-мастер, може да има конфликти при синхронизация" },
          { id: "b", text: "Няма конфликти" },
          { id: "c", text: "Автоматично се разрешават" },
          { id: "d", text: "Само един мастер" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q75",
        type: "single",
        points: 1,
        prompt: "T/F: В MongoDB агрегиранията винаги използват JavaScript.",
        choices: [
          { id: "a", text: "False (aggregation framework е BSON операции, без JS)" },
          { id: "b", text: "True" },
          { id: "c", text: "Само понякога" },
          { id: "d", text: "Само mapReduce" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q76",
        type: "single",
        points: 1,
        prompt: "T/F: $match в aggregation винаги се изпълнява като първа стъпка.",
        choices: [
          { id: "a", text: "False — може да започне с други стадии" },
          { id: "b", text: "True" },
          { id: "c", text: "Само ако искаме" },
          { id: "d", text: "Винаги последна" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q77_open",
        type: "open",
        points: 2,
        prompt: "Дай пример за query, което използва текстов индекс и $text оператор:",
        correctAnswer: "db.articles.createIndex({ content: \"text\" });\ndb.articles.find({ $text: { $search: \"MongoDB NoSQL\" } });",
        scoring: { type: "text", language: "javascript" }
      },
      {
        id: "q78",
        type: "single",
        points: 1,
        prompt: "Как да направиш bulk insert на 1000 документа в Node.js ефективно?",
        choices: [
          { id: "a", text: "collection.insertMany(arrayOfDocs, { ordered: false })" },
          { id: "b", text: "По един документ" },
          { id: "c", text: "С await във for цикъл" },
          { id: "d", text: "С setTimeout" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q79",
        type: "single",
        points: 1,
        prompt: "Какъв read concern можеш да използваш за силна консистентност?",
        choices: [
          { id: "a", text: "majority read concern" },
          { id: "b", text: "local" },
          { id: "c", text: "available" },
          { id: "d", text: "linearizable" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q80",
        type: "single",
        points: 1,
        prompt: "Разлика между updateOne с { upsert: true } и отделно insert + update?",
        choices: [
          { id: "a", text: "upsert е atomic операция: ако няма документ, вкарва нов; ако има, обновява" },
          { id: "b", text: "Няма разлика" },
          { id: "c", text: "upsert е по-бавен" },
          { id: "d", text: "Само insert работи" }
        ],
        correctAnswer: "a"
      }
    ]
  },
  
  {
    id: "exam-computer-modeling-1",
category: "3.2 курс",
    title: "Компютърно моделиране — изпитен тест",
    description: "Тест по компютърно моделиране с въпроси за моделиране, VHDL, GPSS и мрежи на Петри.",
    passwordHash: "",
    settings: {
      shuffleQuestions: false,
      shuffleChoices: false,
      timeLimitSeconds: 1800,
      allowImmediateRetry: true,
      passingScorePercent: 70,
      maxAttempts: 3
    },
    questions: [
      {
        id: "q1",
        type: "open",
        points: 3,
        prompt: "Какво е компютърно моделиране? Кога е удачно неговото приложение?",
        correctAnswer: "Създаване и изследване на модел на система; използва се при скъпи, опасни или невъзможни реални експерименти.",
        scoring: { type: "text" }
      },
      {
        id: "q2",
        type: "open",
        points: 3,
        prompt: "Кои са основните задачи при функционалното моделиране?",
        correctAnswer: "Описание на функциите, входовете, изходите и взаимодействията между компонентите.",
        scoring: { type: "text" }
      },
      {
        id: "q3",
        type: "single",
        points: 1,
        prompt: "За кой стандартен цифров компонент се отнася следният VHDL модел?",
        choices: [
          { id: "a", text: "Суматор" },
          { id: "b", text: "Мултиплексор" },
          { id: "c", text: "Регистър" },
          { id: "d", text: "Дешифратор" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q4",
        type: "open",
        points: 2,
        prompt: "С какво се характеризират вероятностните аналитични модели?",
        correctAnswer: "Работят със случайни процеси и вероятностни разпределения.",
        scoring: { type: "text" }
      },
      {
        id: "q5",
        type: "single",
        points: 1,
        prompt: "Как се казва опашката в модела?",
        choices: [
          { id: "a", text: "QDISK" },
          { id: "b", text: "BACKK" },
          { id: "c", text: "QCPU" },
          { id: "d", text: "QUEUE" },
          { id: "e", text: "DISK" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q6",
        type: "single",
        points: 1,
        prompt: "В какво време се генерират заявките?",
        choices: [
          { id: "a", text: "8 ± 2" },
          { id: "b", text: "15 ± 10" },
          { id: "c", text: "15,10" },
          { id: "d", text: "10 ± 4" }
        ],
        correctAnswer: "d"
      },
      {
        id: "q7",
        type: "single",
        points: 1,
        prompt: "Колко са възможните състояния, в които дадена СМО има вероятност да се намира в даден момент от време?",
        choices: [
          { id: "a", text: "Едно" },
          { id: "b", text: "Три" },
          { id: "c", text: "Пет" },
          { id: "d", text: "Две" }
        ],
        correctAnswer: "d"
      },
      {
        "id": "q8_1",
        "type": "open",
        "points": 1,
        "prompt": "8.1. Брой състояния в мрежата?",
        "correctAnswer": "6",
        "scoring": { "type": "text" }
      },
      {
        "id": "q8_2",
        "type": "open",
        "points": 1,
        "prompt": "8.2. Брой преходи в мрежата?",
        "correctAnswer": "4",
        "scoring": { "type": "text" }
      },
      {
        id: "q8_3",
        type: "single",
        points: 1,
        prompt: "Кои преходи могат да се изпълнят в дадения момент?",
        choices: [
          { id: "a", text: "Storage, ready, Buffer, idle" },
          { id: "b", text: "produce, send, accept" },
          { id: "c", text: "ready, accepted" },
          { id: "d", text: "produce, accept" },
          { id: "e", text: "consume" }
        ],
        correctAnswer: "d"
      },
      {
        id: "q8_4",
        type: "single",
        points: 1,
        prompt: "Какво представлява сегментът Buffer?",
        choices: [
          { id: "a", text: "Позиция" },
          { id: "b", text: "Преход" },
          { id: "c", text: "Дъга" },
          { id: "d", text: "Ядро" },
          { id: "e", text: "Маркировка" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q9",
        type: "open",
        points: 4,
        prompt: "Какво представляват мрежите на Петри? За какво се използват?",
        correctAnswer: "Модел за паралелни и асинхронни системи; използва се за анализ и управление.",
        scoring: { type: "text" }
      },
      {
        id: "q10",
        type: "open",
        points: 4,
        prompt: "Какво представляват Марковските процеси и вериги? За какво се използват?",
        correctAnswer: "Случайни процеси, при които следващото състояние зависи само от текущото; за опашки, прогнози и надеждност.",
        scoring: { type: "text" }
      },
      {
        id: "q11",
        type: "open",
        points: 4,
        prompt: "Какво представлява статистическото моделиране? Какви етапи включва?",
        correctAnswer: "Моделиране чрез случайни величини; включва модел, симулация и анализ на резултатите.",
        scoring: { type: "text" }
      },
      {
        id: "q12",
        type: "open",
        points: 4,
        prompt: "Какво представлява компютърната симулация? Посочете видове симулации.",
        correctAnswer: "Изследване на модел с компютър; видове: дискретна, непрекъсната и хибридна.",
        scoring: { type: "text" }
      }
    ]
  },
  {
  "id": "exam-virtualization-cloud-1",
  "category": "3.2 курс",
  "title": "Изпитен тест 1 – Виртуализация и облачни технологии",
  "description": "Тест по виртуализация, контейнери, облачни услуги и SDN. (Вариант 1)",
  "passwordHash": "",
  "settings": {
    "shuffleQuestions": false,
    "shuffleChoices": false,
    "timeLimitSeconds": 1800,
    "allowImmediateRetry": true,
    "passingScorePercent": 70,
    "maxAttempts": 3
  },
  "questions": [
    {
      "id": "q1",
      "type": "single",
      "points": 1,
      "prompt": "Какво ще направи следният ред от Docker файла: COPY --from=create /app/dist /usr/local/apache2/htdocs",
      "choices": [
        { "id": "a", "text": "ще копира файловете от текущия етап (stage), директория /app/dist в /usr/local/apache2/htdocs" },
        { "id": "b", "text": "ще копира файловете от етап (stage) create, /app/dist в етап create, /usr/local/apache2/htdocs" },
        { "id": "c", "text": "ще копира файловете от етап (stage) create, /app/dist в текущия етап, /usr/local/apache2/htdocs" },
        { "id": "d", "text": "ще предизвика грешка по време на създаването на потребителския имидж" }
      ],
      "correctAnswer": "c"
    },
    {
      "id": "q2",
      "type": "single",
      "points": 1,
      "prompt": "Кой тип хипервайзор може да се инсталира директно върху хардуера (bare metal)?",
      "choices": [
        { "id": "a", "text": "Хипервайзор тип 10" },
        { "id": "b", "text": "Хипервайзор тип 20" },
        { "id": "c", "text": "Хипервайзор тип 1" },
        { "id": "d", "text": "Хипервайзор тип 2" }
      ],
      "correctAnswer": "c"
    },
    {
      "id": "q3",
      "type": "single",
      "points": 1,
      "prompt": "Кой от следните хипервайзори използва основен (root) дял, на който се инсталират драйвери?",
      "choices": [
        { "id": "a", "text": "ESXi" },
        { "id": "b", "text": "VirtualBox" },
        { "id": "c", "text": "Hyper-V" },
        { "id": "d", "text": "KVM" }
      ],
      "correctAnswer": "c"
    },
    {
      "id": "q4",
      "type": "single",
      "points": 1,
      "prompt": "Какъв ще е максималния брой виртуални процесори, с които ще разполагате, ако физическият процесор е много ядрен с 8 ядра и поддържа хипернишкова архитектура (hyper-threading)?",
      "choices": [
        { "id": "a", "text": "8" },
        { "id": "b", "text": "16" },
        { "id": "c", "text": "4" },
        { "id": "d", "text": "10" }
      ],
      "correctAnswer": "b"
    },
    {
      "id": "q5",
      "type": "single",
      "points": 1,
      "prompt": "При коя архитектура на сторидж файловата система се намира в и се управлява от устройството за съхранение, което от своя страна е свързано през мрежа?",
      "choices": [
        { "id": "a", "text": "Direct Attached Storage" },
        { "id": "b", "text": "Storage Community Network" },
        { "id": "c", "text": "Network Attached Storage" },
        { "id": "d", "text": "Storage Area Network" }
      ],
      "correctAnswer": "c"
    },
    {
      "id": "q6",
      "type": "single",
      "points": 1,
      "prompt": "Кое от следните е протокол за комуникация със сториджа, използван в SAN архитектурата?",
      "choices": [
        { "id": "a", "text": "iSCSI" },
        { "id": "b", "text": "SATA" },
        { "id": "c", "text": "TCP/IP" },
        { "id": "d", "text": "PATA" }
      ],
      "correctAnswer": "a"
    },
    {
      "id": "q7",
      "type": "multiple",
      "points": 1,
      "prompt": "Кое от следните НЕ Е десктоп виртуализация (възможни са повече от един верни отговора)?",
      "choices": [
        { "id": "a", "text": "Remote attached virtual desktop (RAVD)" },
        { "id": "b", "text": "Desktop-as-a-Service (DaaS)" },
        { "id": "c", "text": "Virtual desktop infrastructure (VDI)" },
        { "id": "d", "text": "Network attached desktop (NAD)" }
      ],
      "correctAnswer": ["a", "d"]
    },
    {
      "id": "q8",
      "type": "multiple",
      "points": 1,
      "prompt": "Кой протокол позволява да се изградят виртуални локални мрежи между отдалечени виртуални машини, чрез използването на тунели (възможни са повече от един верни отговора)?",
      "choices": [
        { "id": "a", "text": "VPLAN" },
        { "id": "b", "text": "VxLAN" },
        { "id": "c", "text": "GENEVE" },
        { "id": "d", "text": "VMLAN" }
      ],
      "correctAnswer": ["b", "c"]
    },
    {
      "id": "q9",
      "type": "single",
      "points": 1,
      "prompt": "Колко пространство ще заема върху диска на хоста виртуален диск с размер 50 GB, настроен в режим Thin Disk и записани 15 GB данни върху него?",
      "choices": [
        { "id": "a", "text": "50 GB" },
        { "id": "b", "text": "15 GB" },
        { "id": "c", "text": "65 GB" },
        { "id": "d", "text": "35 GB" }
      ],
      "correctAnswer": "b"
    },
    {
      "id": "q10",
      "type": "multiple",
      "points": 1,
      "prompt": "Кое от следните НЕ СА модели на облачни услуги (възможни са повече от един верни отговора)?",
      "choices": [
        { "id": "a", "text": "Частен облак" },
        { "id": "b", "text": "Публичен облак" },
        { "id": "c", "text": "Организационен облак" },
        { "id": "d", "text": "Общ облак" }
      ],
      "correctAnswer": ["c", "d"]
    },
    {
      "id": "q11",
      "type": "single",
      "points": 1,
      "prompt": "Кой NSX компонент управлява трафика „изток - запад“?",
      "choices": [
        { "id": "a", "text": "Virtual Switch" },
        { "id": "b", "text": "Tier 0 Gateway" },
        { "id": "c", "text": "Tier 1 Gateway" },
        { "id": "d", "text": "Tier 0 Switch" }
      ],
      "correctAnswer": "a"
    },
    {
      "id": "q12_code",
      "type": "open",
      "points": 6,
      "prompt": "Напишете докер командата за създаване на имидж с име по ваш избор, като Docker файла се намира в директорията на приложението, от където се изпълнява и командата, и е с име Docker_buildapp.",
      "correctAnswer": "docker build -f Docker_buildapp -t myapp .",
      "scoring": { "type": "code", "language": "bash" }
    },
    {
      "id": "q13",
      "type": "multiple",
      "points": 1,
      "prompt": "Кои от следните са основни елементи на SDN (възможни са повече от един верни отговори)?",
      "choices": [
        { "id": "a", "text": "Controller" },
        { "id": "b", "text": "Router" },
        { "id": "c", "text": "NAT" },
        { "id": "d", "text": "Switch" }
      ],
      "correctAnswer": ["a", "d"]
    },
    {
      "id": "q14",
      "type": "single",
      "points": 1,
      "prompt": "При кой тип облачна инфраструктура имаме споделяне на ресурсите между няколко организации с обща или близка дейност?",
      "choices": [
        { "id": "a", "text": "Публичен облак" },
        { "id": "b", "text": "Частен облак" },
        { "id": "c", "text": "Общностен облак (Community Cloud)" },
        { "id": "d", "text": "Хибриден облак" }
      ],
      "correctAnswer": "c"
    },
    {
      "id": "q15",
      "type": "multiple",
      "points": 1,
      "prompt": "Кое от следните е услуга за релационна база от данни в MS Azure?",
      "choices": [
        { "id": "a", "text": "Azure Cosmos DB" },
        { "id": "b", "text": "Azure Database for MySQL" },
        { "id": "c", "text": "Azure Database for MongoDB" },
        { "id": "d", "text": "Azure Database for MSSQL" }
      ],
      "correctAnswer": ["b", "d"]
    },
    {
      "id": "q16",
      "type": "single",
      "points": 1,
      "prompt": "При коя архитектура на хипервайзор драйверите на устройствата са включени в инсталацията му?",
      "choices": [
        { "id": "a", "text": "x86 ядро" },
        { "id": "b", "text": "Микроядро" },
        { "id": "c", "text": "Монолитно ядро" },
        { "id": "d", "text": "Ядро x64" }
      ],
      "correctAnswer": "c"
    },
    {
      "id": "q17",
      "type": "single",
      "points": 1,
      "prompt": "При кой облачен модел потребителят използва софтуера без да се грижи за неговата поддръжка?",
      "choices": [
        { "id": "a", "text": "IaaS" },
        { "id": "b", "text": "SaaS" },
        { "id": "c", "text": "PaaS" },
        { "id": "d", "text": "IaC" }
      ],
      "correctAnswer": "b"
    },
    {
      "id": "q18",
      "type": "single",
      "points": 1,
      "prompt": "Кое от следните предоставя контейнери в AWS?",
      "choices": [
        { "id": "a", "text": "Amazon EC2" },
        { "id": "b", "text": "Amazon ECS" },
        { "id": "c", "text": "Amazon ECR" },
        { "id": "d", "text": "Няма такава услуга" }
      ],
      "correctAnswer": "b"
    },
    {
      "id": "q19_open",
      "type": "open",
      "points": 2,
      "prompt": "Как се нарича най-популярният в днешно време инструмент за оркестрация на контейнери?",
      "correctAnswer": "Kubernetes"
    },
    {
      "id": "q20",
      "type": "single",
      "points": 1,
      "prompt": "Какво ще се случи, ако на хост с процесор с налични 4 ядра и хипернишкова архитектура се пуснат едновременно 2 виртуални машини с по 4 виртуални процесора?",
      "choices": [
        { "id": "a", "text": "системата ще блокира и ще трябва да се рестартира принудително" },
        { "id": "b", "text": "хипервайзорът няма да позволи на машините да работят едновременно" },
        { "id": "c", "text": "виртуалните машини, както и хоста ще работят напълно нормално" },
        { "id": "d", "text": "поради липса на ресурси за операционната система на хоста, нейните процеси няма да се обслужват" }
      ],
      "correctAnswer": "c"
    },
    {
      "id": "q21",
      "type": "single",
      "points": 1,
      "prompt": "Кое от следните дава възможност за конфигуриране и стартиране на VM в Google Cloud Platform?",
      "choices": [
        { "id": "a", "text": "App Engine" },
        { "id": "b", "text": "Compute Engine" },
        { "id": "c", "text": "Cloud Run" },
        { "id": "d", "text": "Google Workspace Essentials" }
      ],
      "correctAnswer": "b"
    },
    {
      "id": "q22",
      "type": "single",
      "points": 1,
      "prompt": "Кой вид облачен модел е предназначен за IT администратори?",
      "choices": [
        { "id": "a", "text": "IaaS" },
        { "id": "b", "text": "SaaS" },
        { "id": "c", "text": "PaaS" },
        { "id": "d", "text": "IaC" }
      ],
      "correctAnswer": "a"
    },
    {
      "id": "q23",
      "type": "single",
      "points": 1,
      "prompt": "Кое от следните е споделено между контейнерите?",
      "choices": [
        { "id": "a", "text": "Библиотеки" },
        { "id": "b", "text": "Файлова система" },
        { "id": "c", "text": "Хардуер (ядро / OS kernel)" },
        { "id": "d", "text": "Приложения" }
      ],
      "correctAnswer": "c"
    },
    {
      "id": "q24",
      "type": "single",
      "points": 1,
      "prompt": "Чрез коя инструкция при създаването на потребителски имидж (custom image) ще се стартира нов етап при изграждането му?",
      "choices": [
        { "id": "a", "text": "FROM" },
        { "id": "b", "text": "COPY" },
        { "id": "c", "text": "RUN" },
        { "id": "d", "text": "ENTRYPOINT" }
      ],
      "correctAnswer": "a"
    },
    {
      "id": "q25",
      "type": "single",
      "points": 1,
      "prompt": "Коя SDN равнина се използва за наблюдение и конфигуриране на мрежата?",
      "choices": [
        { "id": "a", "text": "Data Plane" },
        { "id": "b", "text": "Management Plane" },
        { "id": "c", "text": "Control Plane" },
        { "id": "d", "text": "Routing Plane" }
      ],
      "correctAnswer": "b"
    }
  ]
},
  {
    id: "exam-virtualization-cloud-2",
	category: "3.2 курс",
    title: "Изпитен тест 2 – Виртуализация и облачни технологии",
    description: "Тест по виртуализация, контейнери, облачни услуги и SDN.",
    passwordHash: "",
    settings: {
      shuffleQuestions: false,
      shuffleChoices: false,
      timeLimitSeconds: 1800,
      allowImmediateRetry: true,
      passingScorePercent: 70,
      maxAttempts: 3
    },
    questions: [
      {
        id: "q1",
        type: "single",
        points: 1,
        prompt: "На кой номер на порт ще бъде достъпно приложението, стартирано със следната докер команда: docker run -p 8080:80 nginxdemos/hello",
        choices: [
          { id: "a", text: "На порт 8080" },
          { id: "b", text: "На порт 80" },
          { id: "c", text: "На порт 101" },
          { id: "d", text: "На порт 8080:80" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q2",
        type: "single",
        points: 1,
        prompt: "При кой от методите за оптимизиране на паметта е възможно виртуалните машини да използват повече памет от наличната на хоста?",
        choices: [
          { id: "a", text: "Page sharing" },
          { id: "b", text: "Ballooning" },
          { id: "c", text: "Hypervisor swapping" },
          { id: "d", text: "Memory overcommitment" }
        ],
        correctAnswer: "d"
      },
      {
        id: "q3",
        type: "single",
        points: 1,
        prompt: "Кое от следните е хипервайзор тип 1?",
        choices: [
          { id: "a", text: "VirtualBox" },
          { id: "b", text: "VMware ESXi" },
          { id: "c", text: "VMware Workstation" },
          { id: "d", text: "Remote Desktop" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q4",
        type: "single",
        points: 1,
        prompt: "Как се нарича хардуерно подпомогнатата виртуализация, реализирана при x86 процесорите на компанията Intel?",
        choices: [
          { id: "a", text: "VT-i" },
          { id: "b", text: "ESXi" },
          { id: "c", text: "VT-x" },
          { id: "d", text: "AMD-V" }
        ],
        correctAnswer: "c"
      },
      {
        id: "q5",
        type: "single",
        points: 1,
        prompt: "Кое НЕ Е протокол за връзка със устройства за съхранение (storage)?",
        choices: [
          { id: "a", text: "Fiber Channel" },
          { id: "b", text: "SAS" },
          { id: "c", text: "iSCSI" },
          { id: "d", text: "FCP" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q6",
        type: "single",
        points: 1,
        prompt: "Чрез кои от следните файлове може да се автоматизира процеса на създаване и свързване на контейнери?",
        choices: [
          { id: "a", text: "Dockerfile" },
          { id: "b", text: "Dockerfile.build" },
          { id: "c", text: "Docker-compose.yaml" },
          { id: "d", text: "Buildimage" }
        ],
        correctAnswer: "c"
      },
      {
        id: "q7",
        type: "multiple",
        points: 1,
        prompt: "Кое от следните НЕ Е десктоп виртуализация (възможни са повече от един верни отговора)?",
        choices: [
          { id: "a", text: "Remote attached virtual desktop (RAVD)" },
          { id: "b", text: "Desktop-as-a-Service (DaaS)" },
          { id: "c", text: "Virtual desktop infrastructure (VDI)" },
          { id: "d", text: "Network attached desktop (NAD)" }
        ],
        correctAnswer: ["a", "d"]
      },
      {
        id: "q8",
        type: "single",
        points: 1,
        prompt: "Кой протокол позволява да се изградят виртуални локални мрежи между отдалечени виртуални машини, чрез използването на тунели?",
        choices: [
          { id: "a", text: "VPLAN" },
          { id: "b", text: "VxWAN" },
          { id: "c", text: "VMLAN" },
          { id: "d", text: "GENEVE" }
        ],
        correctAnswer: "d"
      },
      {
        id: "q9",
        type: "single",
        points: 1,
        prompt: "Кое НЕ Е вид виртуален комутатор при Hyper-V?",
        choices: [
          { id: "a", text: "Public" },
          { id: "b", text: "External" },
          { id: "c", text: "Internal" },
          { id: "d", text: "Private" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q10",
        type: "multiple",
        points: 1,
        prompt: "Кое от следните НЕ са модели на облачни услуги (възможни са повече от един верни отговора)?",
        choices: [
          { id: "a", text: "Частен облак" },
          { id: "b", text: "Публичен облак" },
          { id: "c", text: "Организационен облак" },
          { id: "d", text: "Общ облак" }
        ],
        correctAnswer: ["a", "b", "c", "d"]
      },
      {
        id: "q11",
        type: "single",
        points: 1,
        prompt: "При кой вид виртуален диск е възможно той да заеме пълния си размер върху физическия диск?",
        choices: [
          { id: "a", text: "Thick disk" },
          { id: "b", text: "Thin disk" },
          { id: "c", text: "Flexible disk" },
          { id: "d", text: "Physical disk" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q12_code",
        type: "open",
        points: 6,
        prompt: "Напишете докер команда за стартиране на контейнер с MySQL сървър, който да съхранява базите от данни (/var/lib/mysql) в директория D:\\Data на хоста, с имидж mysql:8.0. Конзолата НЕ трябва да показва логовете след стартирането.",
        correctAnswer: "docker run -d --name mysql8 -v D:\\Data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=pass mysql:8.0",
        scoring: { type: "code", language: "bash" }
      },
      {
        id: "q13",
        type: "multiple",
        points: 1,
        prompt: "Кое НЕ Е тип виртуален мрежови адаптер (възможни са повече от един верни отговора)?",
        choices: [
          { id: "a", text: "Gateway" },
          { id: "b", text: "Router" },
          { id: "c", text: "NAT" },
          { id: "d", text: "Bridge" }
        ],
        correctAnswer: ["a", "b"]
      },
      {
        id: "q14",
        type: "single",
        points: 1,
        prompt: "Коя облачна услуга предоставя на клиента среда за разработка на приложения?",
        choices: [
          { id: "a", text: "IaaS" },
          { id: "b", text: "SaaS" },
          { id: "c", text: "PaaS" },
          { id: "d", text: "IaaC" }
        ],
        correctAnswer: "c"
      },
      {
        id: "q15",
        type: "multiple",
        points: 1,
        prompt: "Кое от следните е услуга за релационна база от данни в MS Azure?",
        choices: [
          { id: "a", text: "Cosmos DB" },
          { id: "b", text: "Mongo DB" },
          { id: "c", text: "PostgreSQL" },
          { id: "d", text: "MSSQL" }
        ],
        correctAnswer: ["c", "d"]
      },
      {
        id: "q16",
        type: "single",
        points: 1,
        prompt: "Кое от следните е типична архитектура на хипервайзор?",
        choices: [
          { id: "a", text: "Макро ядро" },
          { id: "b", text: "Монолитно ядро" },
          { id: "c", text: "Разпределено ядро" },
          { id: "d", text: "Разделено ядро" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q17",
        type: "single",
        points: 1,
        prompt: "Кой хипервайзор може да се инсталира като услуга, част от ОС?",
        choices: [
          { id: "a", text: "Hyper-V" },
          { id: "b", text: "VMware ESXi" },
          { id: "c", text: "KVM" },
          { id: "d", text: "Нито един от посочените" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q18",
        type: "single",
        points: 1,
        prompt: "Кое от следните предоставя контейнери в AWS?",
        choices: [
          { id: "a", text: "Amazon ECS" },
          { id: "b", text: "Amazon ECR" },
          { id: "c", text: "Amazon EC2" },
          { id: "d", text: "Няма такава услуга" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q19_open",
        type: "open",
        points: 2,
        prompt: "Как се нарича мрежата, в която се включват по подразбиране Docker контейнерите?",
        correctAnswer: "bridge"
      },
      {
        id: "q20",
        type: "multiple",
        points: 1,
        prompt: "Какво е необходимо, за да могат Docker контейнерите да комуникират по име (възможни са повече от един верни отговора)?",
        choices: [
          { id: "a", text: "да се конфигурира рутер между контейнерите" },
          { id: "b", text: "да се зададе име на контейнера, ръчно" },
          { id: "c", text: "да се създаде мрежа, в която да се включат контейнерите" },
          { id: "d", text: "да се използва името по подразбиране на контейнера" }
        ],
        correctAnswer: ["b", "c"]
      },
      {
        id: "q21",
        type: "single",
        points: 1,
        prompt: "Коя инструкция в Dockerfile стартира нов етап при създаването на потребителски имидж (custom image)?",
        choices: [
          { id: "a", text: "FROM" },
          { id: "b", text: "VOLUME" },
          { id: "c", text: "NEWSTAGE" },
          { id: "d", text: "WORKDIR" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q22",
        type: "single",
        points: 1,
        prompt: "Кой вид облачни услуги са предназначени за Мрежови архитекти и IT администратори?",
        choices: [
          { id: "a", text: "IaaS" },
          { id: "b", text: "SaaS" },
          { id: "c", text: "PaaS" },
          { id: "d", text: "IaC" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q23",
        type: "single",
        points: 1,
        prompt: "Кое от следните е споделено между контейнерите?",
        choices: [
          { id: "a", text: "Библиотеки" },
          { id: "b", text: "Операционна система" },
          { id: "c", text: "Файлова система" },
          { id: "d", text: "Приложения" }
        ],
        correctAnswer: "b"
      },
      {
        id: "q24",
        type: "single",
        points: 1,
        prompt: "Коя инструкция при създаването на потребителски имидж (custom image) ще позволи задаване на команди, след стартиране на docker контейнер, и тези команди могат да бъдат презаписани?",
        choices: [
          { id: "a", text: "CMD" },
          { id: "b", text: "COPY" },
          { id: "c", text: "RUN" },
          { id: "d", text: "ENTRYPOINT" }
        ],
        correctAnswer: "a"
      },
      {
        id: "q25",
        type: "single",
        points: 1,
        prompt: "Кое от следните съставя маршрутизиращата таблица при SDN маршрутизатора?",
        choices: [
          { id: "a", text: "Data Plane" },
          { id: "b", text: "Management Plane" },
          { id: "c", text: "Control Plane" },
          { id: "d", text: "Routing Plane" }
        ],
        correctAnswer: "c"
      }
    ]
  }
,
  {
    id: "exam-mobile-dev-2025-07-10",
category: "3.2 курс",
    title: "Тест за изпит по дисциплината „Програмиране за мобилни устройства“",
    description: "Изпитен тест по мобилни устройства, JavaScript, хибридни приложения и Framework7.",
    passwordHash: "",
    settings: {
      shuffleQuestions: false,
      shuffleChoices: false,
      timeLimitSeconds: 1800,
      allowImmediateRetry: true,
      passingScorePercent: 70,
      maxAttempts: 3
    },
    questions: [
      {
        id: "q1",
        type: "single",
        points: 1,
        prompt: "Какво е предназначението на минималния жизнеспособен продукт (MVP) при разработката на мобилни приложения?",
        choices: [
          { id: "a", text: "Най-проста версия на продукта с основни функции за тестване на пазара." },
          { id: "b", text: "Прототип на потребителския интерфейс." },
          { id: "c", text: "Финалната версия на приложението." },
          { id: "d", text: "Документация за разработчиците." }
        ],
        correctAnswer: "a"
      },
      {
        id: "q2",
        type: "single",
        points: 1,
        prompt: "Какво е предназначението на жироскопа в мобилните устройства?",
        choices: [
          { id: "a", text: "Измерва магнитното поле на Земята." },
          { id: "b", text: "Определя надморска височина." },
          { id: "c", text: "Измерва ускорението по трите оси (X, Y, Z)." },
          { id: "d", text: "Измерва ъгловата скорост на завъртане." }
        ],
        correctAnswer: "d"
      },
      {
        id: "q3_code",
        type: "open",
        points: 1.5,
        prompt: "Даден е следният JavaScript обект: let student = { name: \"Иван Петров\", grades: [5, 6, 4, 5, 6], faculty: \"EE\" }; Напишете JavaScript код, който изчислява и извежда средната оценка на студента.",
        correctAnswer: "const avg = student.grades.reduce((s, g) => s + g, 0) / student.grades.length; console.log(avg);",
        scoring: { type: "code", language: "javascript" }
      },
      {
        id: "q4",
        type: "single",
        points: 1,
        prompt: "Какво представлява JavaScript Promise?",
        choices: [
          { id: "a", text: "Обект, който представлява евентуално завършване на асинхронна операция." },
          { id: "b", text: "Функция, която се изпълнява веднага." },
          { id: "c", text: "Тип данни за съхранение на низове." },
          { id: "d", text: "Метод за обработка на събития." }
        ],
        correctAnswer: "a"
      },
      {
        id: "q5",
        type: "single",
        points: 1,
        prompt: "Какво е предназначението на вградения в някои мобилни устройства барометър?",
        choices: [
          { id: "a", text: "Връща надморската височина в метри." },
          { id: "b", text: "Връща скоростта на движение на мобилното устройство." },
          { id: "c", text: "Връща оценка за стойността на атмосферното налягане в милибари." },
          { id: "d", text: "Връща оценка за локацията на мобилното устройство." }
        ],
        correctAnswer: "c"
      },
      {
        id: "q6",
        type: "multiple",
        points: 1.5,
        prompt: "Маркирайте верните отговори:",
        choices: [
          { id: "a", text: "HTML5 въведе нови семантични елементи като <header>, <nav>, <section>." },
          { id: "b", text: "CSS Grid е по-подходящ за двумерни оформления от Flexbox." },
          { id: "c", text: "JavaScript е статично типизиран език." },
          { id: "d", text: "Monaca Cloud IDE позволява разработка на мобилни приложения в браузъра." },
          { id: "e", text: "Framework7 поддържа само iOS дизайн." }
        ],
        correctAnswer: ["a", "b", "d"]
      },
      {
        id: "q7_code",
        type: "open",
        points: 1.5,
        prompt: "Какво е действието на следния JavaScript код: document.addEventListener('deviceready', function(){ console.log('...'); }); Препишете кода като използвате функция-стрелка.",
        correctAnswer: "document.addEventListener('deviceready', () => { console.log('...'); });",
        scoring: { type: "code", language: "javascript" }
      },
      {
        id: "q8",
        type: "single",
        points: 1,
        prompt: "Какво е предназначението на таговете <script> и <link> в HTML?",
        choices: [
          { id: "a", text: "<script> се използва за включване на JavaScript код, а <link> – за свързване с външни ресурси като CSS." },
          { id: "b", text: "<script> се използва за стилизиране на страницата, а <link> – за изпълнение на JavaScript." },
          { id: "c", text: "И двата тага се използват само за метаинформация." },
          { id: "d", text: "Нито един от тях не се използва в HTML5." }
        ],
        correctAnswer: "a"
      },
      {
        id: "q9_code",
        type: "open",
        points: 1.5,
        prompt: "Напишете JavaScript клас WeatherApp, който има конструктор с параметър city и метод getCurrentTemp(), който връща текущата температура в градуси.",
        correctAnswer: "class WeatherApp { constructor(city) { this.city = city; } getCurrentTemp() { return 0; } }",
        scoring: { type: "code", language: "javascript" }
      },
      {
        id: "q10",
        type: "open",
        points: 1,
        prompt: "Какво е предназначението на DOM7 в Framework7 v6?",
        correctAnswer: "Лека DOM библиотека за работа с елементи, подобна на jQuery.",
        scoring: { type: "text" }
      },
      {
        id: "q11",
        type: "open",
        points: 1,
        prompt: "Защо при JavaScript се изпълва само една програмна нишка?",
        correctAnswer: "За да е проста и безопасна обработката; асинхронността се управлява с event loop.",
        scoring: { type: "text" }
      },
      {
        id: "q12",
        type: "open",
        points: 1,
        prompt: "Какви са основните предимства на хибридните мобилни приложения спрямо native приложенията?",
        correctAnswer: "Един код за Android и iOS, по-бърза разработка и по-ниска цена.",
        scoring: { type: "text" }
      },
      {
        id: "q13",
        type: "open",
        points: 1,
        prompt: "Какво е local storage при браузърите и за какво може да се използва при хибридните мобилни приложения?",
        correctAnswer: "Ключ-стойност хранилище за малки постоянни данни; ползва се за настройки, токени и кеш.",
        scoring: { type: "text" }
      },
      {
        id: "q14",
        type: "single",
        points: 1,
        prompt: "Кой от следните услуги може да се използва за получаване на адрес от GPS координати?",
        choices: [
          { id: "a", text: "Here API." },
          { id: "b", text: "Geoapify API." },
          { id: "c", text: "Google Geocoding API." },
          { id: "d", text: "Всички посочени." }
        ],
        correctAnswer: "d"
      },
      {
        id: "q15",
        type: "single",
        points: 1,
        prompt: "Кой от следните технологии за разработка на хибридни приложения използва C# като основен програмен език?",
        choices: [
          { id: "a", text: "React Native." },
          { id: "b", text: "Ionic." },
          { id: "c", text: "Xamarin." },
          { id: "d", text: "PhoneGap." }
        ],
        correctAnswer: "c"
      },
      {
        id: "q16",
        type: "open",
        points: 1,
        prompt: "Какво означава CRUD в контекста на работата с бази данни?",
        correctAnswer: "Create, Read, Update, Delete.",
        scoring: { type: "text" }
      }
    ]
  }
,
  {
  "id": "exam-pvs-2025-05-14",
  "category": "3.2 курс",
  "title": "Изпит по дисциплината „Програмиране на вградени системи“ (Вариант А и Б)",
  "description": "Пълен изпитен тест с въпроси, задачи и вариации от двата варианта за ATmega8515.",
  "passwordHash": "",
  "settings": {
    "shuffleQuestions": false,
    "shuffleChoices": false,
    "timeLimitSeconds": 7200,
    "allowImmediateRetry": true,
    "passingScorePercent": 70,
    "maxAttempts": 3
  },
  "questions": [
    {
      "id": "q1",
      "type": "open",
      "points": 1,
      "prompt": "Опишете какво представляват вградените системи и къде се използват.",
      "correctAnswer": "Вградената система е специализирана компютърна система (хардуер и софтуер), проектирана за изпълнение на точно определена функция/задача. Използват се в автомобилостроенето (ABS, ECU), битовата техника (перални, климатици), медицинското оборудване, промишлената автоматизация и потребителската електроника (IoT).",
      "scoring": { "type": "text" }
    },
    {
      "id": "q2",
      "type": "open",
      "points": 1,
      "prompt": "Избройте различните подходи, които познавате, за хардуерна реализация на управляващата част на една вградена система.",
      "correctAnswer": "1. Твърдологическа реализация (Hardwired Logic / FSM) – чрез крайна автомати, ASIC или CPLD/FPGA. Висока скорост, трудно модифициране.\n2. Програмно управлявана реализация (Microprocessor/Microcontroller) – чрез изпълнение на инструкции от паметта. Висока гъвкавост, ниска цена.",
      "scoring": { "type": "text" }
    },
    {
      "id": "q3_varA",
      "type": "open",
      "points": 1,
      "prompt": "[Вариант А] Какво е действието на следната инструкция за AVR микроконтролер и къде остава резултатът? LDI R22, 0x25",
      "correctAnswer": "Инструкцията LDI (Load Immediate) зарежда шестнадесетичната константа 0x25 (десетично 37) директно в регистъра с общо предназначение R22. Резултатът остава в регистър R22.",
      "scoring": { "type": "text" }
    },
    {
      "id": "q3_varB",
      "type": "open",
      "points": 1,
      "prompt": "[Вариант Б] Какво е действието на следната инструкция за AVR микроконтролер и къде остава резултатът? LDI R24, 0x25",
      "correctAnswer": "Инструкцията LDI (Load Immediate) зарежда константата 0x25 директно в регистъра R24. Резултатът остава в регистър R24.",
      "scoring": { "type": "text" }
    },
    {
      "id": "q4",
      "type": "open",
      "points": 1,
      "prompt": "Избройте различните разновидности на вътрешна архитектура на микроконтролер.",
      "correctAnswer": "1. Според паметта: Фон Нойманова (обща памет и шина) и Харвардска / Модифицирана Харвардска (разделени памети/шини за програми и данни).\n2. Според набора инструкции: RISC (съкратен набор, бързи инструкции) и CISC (сложен набор).\n3. Според разрядността: 8-битови, 16-битови, 32-битови.",
      "scoring": { "type": "text" }
    },
    {
      "id": "q5",
      "type": "open",
      "points": 1.5,
      "prompt": "Опишете накратко разликите между различните версии на Харвардската архитектура, техните предимства и недостатъци.",
      "correctAnswer": "Разлика: При класическата Харвардска архитектура шините и паметите за данни и инструкции са напълно отделени. Модифицираната (при AVR) позволява специални инструкции (напр. LPM) за четене на константи от паметта за програми.\nПредимства: Паралелно четене на инструкции и данни (конвейеризация), по-висока бързодейност.\nНедостатъци: По-сложен хардуер и повече физически шини.",
      "scoring": { "type": "text" }
    },
    {
      "id": "q6",
      "type": "open",
      "points": 1,
      "prompt": "Избройте и опишете накратко основните функционални модули в микроконтролер ATmega8515.",
      "correctAnswer": "1. CPU ядро (ALU, 32 работни регистъра R0-R31, SREG, SP, PC).\n2. Памети (8KB Flash за програми, 512B SRAM за данни, 512B EEPROM).\n3. Входно-изходни портове (Port A, B, C, D – общо 35 I/O линии).\n4. Таймери/броячи (един 8-битов Timer0, един 16-битов Timer1).\n5. Интерфейси за комуникация (USART, SPI).\n6. Допълнителни: Аналогов компаратор, Watchdog таймер, система за прекъсвания, вътрешен осцилатор.",
      "scoring": { "type": "text" }
    },
    {
      "id": "q7",
      "type": "open",
      "points": 1,
      "prompt": "За какво служи статусният (флаговият) регистър в процесорното ядро (SREG)? При какви случаи се променят стойностите на битовете му?",
      "correctAnswer": "Служи за съхранение на флагове за състоянието, отразяващи резултата от последната извършена аритметична или логическа операция в ALU (флагове C, Z, N, V, S, H, T, I).\nБитовете му се променят автоматично след изпълнение на аритметични, логически, сравнителни и преместващи инструкции (ADD, SUB, AND, OR, CPI и др.).",
      "scoring": { "type": "text" }
    },
    {
      "id": "q8",
      "type": "open",
      "points": 0.5,
      "prompt": "Какъв е броят на набора инструкции за микроконтролер ATmega8515?",
      "correctAnswer": "130 инструкции.",
      "scoring": { "type": "text" }
    },
    {
      "id": "q9",
      "type": "open",
      "points": 1.5,
      "prompt": "Какво е характерно за вградена система, реализирана чрез микроконтролер? Посочете предимства и недостатъци на този подход в сравнение с други подходи за реализация.",
      "correctAnswer": "Характеристика: Интегрира процесорно ядро, памет и периферни модули върху един-единствен чип (Monolithic IC).\nПредимства: Ниска себестойност, малки физически размери, ниска консумация на енергия, висока гъвкавост (промяна чрез софтуер).\nНедостатъци: Ограничена вычислителна мощност и обем памет спрямо микропроцесорите за общо предназначение; по-ниска скорост спрямо твърдата логика (ASIC/FPGA).",
      "scoring": { "type": "text" }
    },
    {
      "id": "q10_varA",
      "type": "open",
      "points": 1,
      "prompt": "[Вариант А] Представете шестнадесетичния запис на десетичното число 713 (да се представи писмено преобразуването).",
      "correctAnswer": "Преобразуване чрез последователно деление на 16:\n713 / 16 = 44 с остатък 9\n44 / 16 = 2 с остатък 12 (C)\n2 / 16 = 0 с остатък 2\nЧетем остатъците отдолу нагоре:\n713(10) = 0x2C9 (или 2C9_16).",
      "scoring": { "type": "text" }
    },
    {
      "id": "q10_varB",
      "type": "open",
      "points": 1,
      "prompt": "[Вариант Б] Представете шестнадесетичния запис на десетичното число 975 (да се представи писмено преобразуването).",
      "correctAnswer": "Преобразуване чрез последователно деление на 16:\n975 / 16 = 60 с остатък 15 (F)\n60 / 16 = 3 с остатък 12 (C)\n3 / 16 = 0 с остатък 3\nЧетем остатъците отдолу нагоре:\n975(10) = 0x3CF (или 3CF_16).",
      "scoring": { "type": "text" }
    },
    {
      "id": "q11_varA",
      "type": "open",
      "points": 2,
      "prompt": "[Вариант А] Какъв ще е резултатът в регистър R18 след изпълнение на следния програмен запис?\n1) LDI R18, 0x7A\n2) SWAP R18",
      "correctAnswer": "1) LDI R18, 0x7A -> R18 съдържа 0x7A (двоично 0111 1010).\n2) SWAP R18 -> Разменя старшия и младшия нибъл (4 бита).\nКраен резултат в R18 = 0xA7 (двоично 1010 0111).",
      "scoring": { "type": "text" }
    },
    {
      "id": "q11_varB",
      "type": "open",
      "points": 1.5,
      "prompt": "[Вариант Б] Какъв ще е резултатът в регистър R19 след изпълнение на следния програмен запис?\n1) LDI R19, 0xE4\n2) SWAP R19",
      "correctAnswer": "1) LDI R19, 0xE4 -> R19 съдържа 0xE4 (двоично 1110 0100).\n2) SWAP R19 -> Разменя старшия и младшия нибъл (4 бита).\nКраен резултат в R19 = 0x4E (двоично 0100 1110).",
      "scoring": { "type": "text" }
    },
    {
      "id": "q12_varA",
      "type": "open",
      "points": 5,
      "prompt": "[Вариант А] Какви крайни резултати се получават в регистри R17 и R24 след изпълнение на програмата (да се опише действието на всеки ред и получаващият се междинен резултат)?\n1) LDI R17, 0b01011011\n2) LDI R24, 0xA5\n3) ADD R24, R17\n4) OR R24, R17\n5) EOR R17, R24\n6) AND R24, R17",
      "correctAnswer": "Стъпки и междинни резултати:\n1) LDI R17, 0b01011011 -> R17 = 0x5B (0b01011011)\n2) LDI R24, 0xA5 -> R24 = 0xA5 (0b10100101)\n3) ADD R24, R17 -> 0xA5 + 0x5B = 0x100 (препълване в 8 бита) -> R24 = 0x00\n4) OR R24, R17 -> 0x00 OR 0x5B -> R24 = 0x5B\n5) EOR R17, R24 -> 0x5B XOR 0x5B -> R17 = 0x00\n6) AND R24, R17 -> 0x5B AND 0x00 -> R24 = 0x00\n\nКрайни резултати:\nR17 = 0x00 (0b00000000)\nR24 = 0x00 (0b00000000)",
      "scoring": { "type": "text" }
    },
    {
      "id": "q12_varB",
      "type": "open",
      "points": 5,
      "prompt": "[Вариант Б] Какви крайни резултати се получават в регистри R18 и R25 след изпълнение на програмата (да се опише действието на всеки ред и получаващият се междинен резултат)?\n1) LDI R18, 0b01011011\n2) LDI R25, 0xA3\n3) ADD R25, R18\n4) OR R25, R18\n5) EOR R18, R25\n6) AND R25, R18",
      "correctAnswer": "Стъпки и междинни резултати:\n1) LDI R18, 0b01011011 -> R18 = 0x5B (0b01011011)\n2) LDI R25, 0xA3 -> R25 = 0xA3 (0b10100011)\n3) ADD R25, R18 -> 0xA3 + 0x5B = 0xFE (0b11111110) -> R25 = 0xFE\n4) OR R25, R18 -> 0xFE OR 0x5B = 0xFF (0b11111111) -> R25 = 0xFF\n5) EOR R18, R25 -> 0x5B XOR 0xFF = 0xA4 (0b10100100) -> R18 = 0xA4\n6) AND R25, R18 -> 0xFF AND 0xA4 = 0xA4 (0b10100100) -> R25 = 0xA4\n\nКрайни резултати:\nR18 = 0xA4 (0b10100100 / десетично 164)\nR25 = 0xA4 (0b10100100 / десетично 164)",
      "scoring": { "type": "text" }
    }
  ]
}




];


// Helper function to get exam list (without questions and answers)
function getExamList() {
  return examsData.map(exam => ({
    id: exam.id,
    title: exam.title,
    description: exam.description,
    category: exam.category,
    passwordHash: exam.passwordHash,
    settings: exam.settings
  }));
}

// Helper function to get exam by ID
function getExamById(examId) {
  return examsData.find(e => e.id === examId);
}

// Helper function to get sanitized exam (without correct answers)
function getSanitizedExam(examId) {
  const exam = getExamById(examId);
  if (!exam) return null;

  return {
    id: exam.id,
    title: exam.title,
    description: exam.description,
    category: exam.category,
    passwordHash: exam.passwordHash,
    settings: exam.settings,
    questions: exam.questions.map(q => ({
      id: q.id,
      type: q.type,
      points: q.points,
      prompt: q.prompt,
      choices: q.choices
      // Note: correctAnswer is intentionally omitted
    }))
  };
}

// Helper function to verify password
function verifyPassword(examId, passwordHash) {
  const exam = getExamById(examId);
  if (!exam) return { found: false, verified: false };
  
  if (!exam.passwordHash) {
    return { found: true, verified: true, noPassword: true };
  }
  
  const verified = constantTimeCompare(passwordHash, exam.passwordHash);
  return { found: true, verified };
}

// Constant-time comparison to prevent timing attacks
function constantTimeCompare(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  
  return result === 0;
}

// Export for CommonJS (Netlify Functions)
module.exports = {
  examsData,
  getExamList,
  getExamById,
  getSanitizedExam,
  verifyPassword,
  constantTimeCompare
};
