/**
 * Application Controller: Italian Coffee Certification Quiz
 * Managed State Machine & Interactive DOM handlers
 */

// 1. Operations Manual Questions Database (All 46 Questions)
const QUESTIONS_DATABASE = [
  {
    id: 1,
    question: "¿Cuál es la diferencia entre un espresso corto, un espresso y una carga de café?",
    options: [
      "Espresso corto 0.50 Onzas, Espresso 1.0 Onza, Carga de café 1.5 Onzas",
      "Espresso corto 0.75 Onzas, Espresso 1.5 Onzas, Carga de café 2 Onzas",
      "Espresso corto 1.00 Onza, Espresso 1.5 Onzas, Carga de café 2.0 Onzas",
      "Espresso corto 0.75 Onzas, Espresso 1.25 Onzas, Carga de café 2.25 Onzas"
    ],
    correctIndex: 1,
    explanation: "Estándar de Extracción: Espresso corto 0.75 Onzas, Espresso 1.5 Onzas, Carga de café 2 Onzas."
  },
  {
    id: 2,
    question: "¿Cuál es el total de onzas y espuma que lleva un capuccino caliente sencillo?",
    options: [
      "6 onzas en total: 1.5 onzas de café, 4.5 onzas de leche y 2.5 centímetros de espuma",
      "6 onzas en total: 4 onzas de café, 2 onzas de leche y 3 centímetros de espuma",
      "6 onzas en total: 2 onzas de café, 4 onzas de leche y 3 centímetros de espuma",
      "8 onzas en total: 2 onzas de café, 6 onzas de leche y 3 centímetros de espuma"
    ],
    correctIndex: 2,
    explanation: "Estándar de Capuccino Sencillo: 6 onzas en total, compuesto por 2 oz de café, 4 oz de leche y 3 cm de espuma."
  },
  {
    id: 3,
    question: "¿Cuál es la correcta preparación de un espresso cortado en onzas?",
    options: [
      "0.75 onzas de café y 0.75 onzas de leche y 2.5 cm de espuma",
      "1.5 onzas de café y 0.75 onzas de leche y 2.5 cm de espuma",
      "0.75 onzas de café y 1.5 onzas de leche y 2.0 cm de espuma",
      "0.75 onzas de café y 0.50 onzas de leche y 1.5 cm de espuma"
    ],
    correctIndex: 0,
    explanation: "Estándar de Espresso Cortado: 0.75 oz de café y 0.75 oz de leche con 2.5 cm de espuma."
  },
  {
    id: 4,
    question: "¿Cuál es la correcta preparación de un espresso con panna?",
    options: [
      "1.5 onzas de café y 2.5 cm de panna",
      "0.75 onzas de café y 1.5 cm de panna",
      "0.75 onzas de café y 3.5 cm de panna",
      "0.75 onzas de café y 2.5 cm de panna"
    ],
    correctIndex: 3,
    explanation: "Estándar de Espresso con Panna: 0.75 oz de café y 2.5 cm de panna."
  },
  {
    id: 5,
    question: "¿Cuántas onzas en total tiene un espresso doble?",
    options: [
      "1.5 Onzas",
      "2 Onzas",
      "3 Onzas",
      "4 Onzas"
    ],
    correctIndex: 2,
    explanation: "Estándar de Espresso Doble: Tiene 3 onzas en total."
  },
  {
    id: 6,
    question: "¿Cómo es la correcta preparación de un espresso doble cortado?",
    options: [
      "3 onzas de café, 2 onzas de leche y espuma al borde de la taza sencilla.",
      "2 onzas de café, 3 onzas de leche y espuma al borde de la taza sencilla.",
      "3 onzas de café, 3 onzas de leche y espuma al borde de la taza doble.",
      "1.5 onzas de café, 1.5 onzas de leche y espuma al borde de la taza sencilla."
    ],
    correctIndex: 0,
    explanation: "Estándar de Espresso Doble Cortado: 3 oz de café, 2 oz de leche y espuma al borde de la taza sencilla."
  },
  {
    id: 7,
    question: "¿Cómo es la correcta preparación de un espresso doble con panna?",
    options: [
      "3 onzas de café, panna a 2 cm rebasando el borde de la taza",
      "3 onzas de café, panna a 1 cm rebasando el borde de la taza",
      "1.5 onzas de café, panna a 1 cm rebasando el borde de la taza",
      "3 onzas de café, panna a ras de la taza"
    ],
    correctIndex: 1,
    explanation: "Estándar de Espresso Doble con Panna: 3 oz de café y panna a 1 cm rebasando el borde de la taza."
  },
  {
    id: 8,
    question: "¿Cómo es la correcta preparación de un capuccino con panna?",
    options: [
      "4 onzas de café, 2 onzas de leche, 3 cm de panna, espolvorear cocoa al centro abundantemente",
      "4 onzas de leche, 2 onzas de café, 3 cm de panna, espolvorear cocoa al centro abundantemente",
      "3 onzas de leche, 3 onzas de café, 3 cm de panna, espolvorear cocoa al centro abundantemente",
      "4 onzas de leche, 2 onzas de café, 1.5 cm de panna, espolvorear canela al centro abundantemente"
    ],
    correctIndex: 1,
    explanation: "Estándar de Capuccino con Panna: 4 oz de leche, 2 oz de café, 3 cm de panna, espolvorear cocoa al centro abundantemente."
  },
  {
    id: 9,
    question: "¿Cuántos disparos necesita un capuccino caliente con sabor vainilla sencillo?",
    options: [
      "1 disparo",
      "2 disparos",
      "3 disparos",
      "1.5 disparos"
    ],
    correctIndex: 0,
    explanation: "Estándar de Saborizante Sencillo: Requiere exactamente 1 disparo."
  },
  {
    id: 10,
    question: "¿Cuál es la correcta preparación de un capuccino caliente con sabor rompope sencillo?",
    options: [
      "1 onza de rompope, 3 onzas de leche, 2 onzas de café, 3 cm de espuma, espolvorear cocoa al centro abundantemente.",
      "2 onzas de rompope, 2 onzas de leche, 2 onzas de café, 2 cm de espuma, espolvorear cocoa al centro abundantemente.",
      "1 onza de rompope, 4 onzas de leche, 1 onza de café, 3 cm de espuma, espolvorear canela al centro abundantemente.",
      "1.5 onzas de rompope, 3 onzas de leche, 1.5 onzas de café, 3 cm de espuma, espolvorear cocoa en toda la superficie."
    ],
    correctIndex: 0,
    explanation: "Estándar de Capuccino Rompope Sencillo: 1 oz rompope, 3 oz leche, 2 oz café, 3 cm de espuma y cocoa abundante al centro."
  },
  {
    id: 11,
    question: "¿El capuccino caliente con NUTELLA lleva cocoa?",
    options: [
      "Sí, espolvoreada al centro abundantemente",
      "No",
      "Sí, mezclada en la leche durante el espumado",
      "Solo si el cliente lo solicita explícitamente"
    ],
    correctIndex: 1,
    explanation: "Estándar de Capuccino con NUTELLA: No lleva cocoa."
  },
  {
    id: 12,
    question: "¿Cuál es el total de onzas que lleva un capuccino caliente doble?",
    options: [
      "10 onzas en total y espuma firme sobre el nivel de la taza",
      "12 onzas en total y espuma firme sobre el nivel de la taza",
      "14 onzas en total y espuma firme sobre el nivel de la taza",
      "16 onzas en total y espuma firme sobre el nivel de la taza"
    ],
    correctIndex: 3,
    explanation: "Estándar de Capuccino Doble: 12 onzas en total y espuma firme sobre el nivel de la taza."
  },
  {
    id: 13,
    question: "¿Cuántas onzas en total debe tener un Café Americano sencillo?",
    options: [
      "4 onzas",
      "6 onzas",
      "8 onzas",
      "12 onzas"
    ],
    correctIndex: 1,
    explanation: "Estándar de Americano Sencillo: Debe tener 6 onzas en total."
  },
  {
    id: "preparacion_americano_mc",
    question: "¿Cuál es el procedimiento de la preparación de un Americano media carga?",
    options: [
      "Colocar media carga de café en filtro sencillo, usar taza de 12 onzas, prender el interruptor hasta llenar la taza a 10 onzas y presentar con galleta.",
      "Colocar una carga de café en filtro de doble salida, colocar taza de 8 onzas debajo de una de las 2 salidas, prender el interruptor hasta obtener 6 onzas y apagar interruptor. Presentar con cuchara de Americano, 1 azúcar estuchada y 1 servilleta.",
      "Colocar una carga en filtro de una salida, extraer un espresso corto de 1.5 onzas en taza de 8 onzas, rellenar con agua caliente hasta el borde.",
      "Usar filtro de doble salida con carga completa, colocar taza de 12 onzas en el centro y extraer 8 onzas de café."
    ],
    correctIndex: 1,
    explanation: "ESTÁNDAR DE PREPARACIÓN"
  },
  {
    id: 15,
    question: "¿Cómo es la correcta preparación de un Americano Cortado?",
    options: [
      "4 onzas de café, 2 onzas de leche",
      "3 onzas de café, 3 onzas de leche",
      "2 onzas de café, 4 onzas de leche",
      "4 onzas de café, 1 onza de leche"
    ],
    correctIndex: 0,
    explanation: "Estándar de Americano Cortado: 4 oz de café y 2 oz de leche, agregar una cucharada de espuma."
  },
  {
    id: 16,
    question: "¿Cuál es la correcta preparación de un café latte caliente sencillo?",
    options: [
      "se presenta en taza de cerámica, 4 onzas de leche y 2 onzas de café",
      "se presenta en copa de cristal, 2 onzas de leche y 4 onzas de café",
      "se presenta en copa de cristal, 4 onzas de leche y 2 onzas de café",
      "se presenta en vaso de acrílico, 5 onzas de leche y 1.5 onzas de café"
    ],
    correctIndex: 2,
    explanation: "Estándar de Café Latte Sencillo: Se presenta en copa de cristal, con 4 oz de leche y 2 oz de café."
  },
  {
    id: 17,
    question: "¿Cuál es la correcta preparación de un Moka caliente con panna sencillo?",
    options: [
      "3 onzas de café, 2 onzas de chocolate italiano y 3 cm de panna, la decoración debe ser en zig-zag con jarabe de chocolate obscuro",
      "2 onzas de café, 3 onzas de chocolate italiano y 1.5 cm de panna, la decoración debe ser en forma de cruz con jarabe de chocolate blanco",
      "2 onzas de café, 3 onzas de chocolate italiano y 3 cm de panna, la decoración debe ser en forma circular con jarabe de chocolate obscuro",
      "1 onza de café, 4 onzas de chocolate italiano y 3 cm de panna, la decoración debe ser en forma circular con jarabe de caramelo"
    ],
    correctIndex: 2,
    explanation: "Estándar de Moka Caliente Sencillo con Panna: 2 oz café, 3 oz chocolate italiano, 3 cm de panna y decoración circular de jarabe de chocolate oscuro."
  },
  {
    id: 18,
    question: "¿Cuál es la correcta preparación de un Moka caliente sin panna sencillo?",
    options: [
      "2 onzas de café, 4 onzas de chocolate italiano, agregar espuma a ras de taza y decorar con jarabe de chocolate obscuro en forma circular.",
      "3 onzas de café, 3 onzas de chocolate italiano, agregar espuma a 1 cm rebasando la taza y decorar con jarabe de chocolate obscuro en zig-zag.",
      "2 onzas de café, 4 onzas de chocolate italiano, agregar panna a ras de taza y decorar con jarabe de chocolate claro en forma circular.",
      "4 onzas de café, 2 onzas de chocolate italiano, agregar espuma a ras de taza y decorar con cocoa espolvoreada al centro."
    ],
    correctIndex: 0,
    explanation: "Estándar de Moka Caliente Sin Panna: 2 oz café, 4 oz chocolate italiano, espuma a ras de taza y decoración circular."
  },
  {
    id: 19,
    question: "¿Cuál es la correcta preparación de un chocolate italiano caliente?",
    options: [
      "Medir 16 onzas de leche en una jarra de acero inoxidable de 24 onzas, colocar 2 disparos de chocolate italiano líquido, introducir la punta de la lanceta para espumar y calentar.",
      "Medir 12 onzas de leche en una jarra de acero inoxidable de 32 onzas, colocar 4 disparos de chocolate italiano líquido, introducir la punta de la lanceta para espumar y calentar.",
      "Medir 16 onzas de leche en una jarra de acero inoxidable de 32 onzas, colocar 3 disparos de chocolate italiano líquido, introducir la punta de la lanceta para espumar y calentar.",
      "Medir 16 onzas de leche en una jarra medidora, colocar 3 disparos de chocolate italiano en polvo, introducir la punta de la lanceta a ras para calentar sin espumar."
    ],
    correctIndex: 2,
    explanation: "Estándar de Chocolate Italiano: Medir 16 oz de leche en jarra de 32 oz, agregar 3 disparos de chocolate italiano líquido, espumar y calentar."
  },
  {
    id: 20,
    question: "¿Cuál es la correcta preparación de un chocolate blanco caliente sencillo?",
    options: [
      "Medir 6 onzas de leche en una jarra medidora, verter la leche en una jarra de acero inoxidable de 12 onzas, agregar 1 disparo de chocolate blanco, introducir la punta de la lanceta para espumar y calentar, el nivel de espuma debe ser de 1 cm.",
      "Medir 5 onzas de leche en una jarra medidora, verter la leche en una jarra de acero inoxidable de 12 onzas, agregar 2 disparos de chocolate blanco, introducir la punta de la lanceta para espumar y calentar el chocolate blanco, el nivel de espuma debe ser de 1.5 cm.",
      "Medir 5 onzas de leche en una jarra medidora, verter la leche en una jarra de acero inoxidable de 24 onzas, agregar 3 disparos de chocolate blanco, introducir la punta de la lanceta para calentar sin espumar, el nivel de espuma debe ser de 3 cm.",
      "Medir 4 onzas de leche en una jarra medidora, verter la leche en una jarra de acero inoxidable de 12 onzas, agregar 2 disparos de chocolate blanco líquido, introducir la punta de la lanceta para espumar, el nivel de espuma debe ser de 2.5 cm."
    ],
    correctIndex: 1,
    explanation: "Estándar de Chocolate Blanco Caliente Sencillo: Medir 5 oz de leche en jarra medidora, verter en jarra de 12 oz, 2 disparos de chocolate blanco, calentar y espumar hasta 1.5 cm."
  },
  {
    id: 21,
    question: "¿Cuál es la correcta preparación de un chocolate blanco doble caliente?",
    options: [
      "Medir 12 onzas de leche en una jarra medidora, verter la leche en una jarra de acero inoxidable de 24 onzas, agregar 4 disparos de chocolate blanco, introducir la punta de la lanceta para espumar y calentar, el nivel de espuma debe ser de 2 cm.",
      "Medir 10 onzas de leche en una jarra medidora, verter la leche en una jarra de acero inoxidable de 32 onzas, agregar 3 disparos de chocolate blanco, introducir la punta de la lanceta para espumar y calentar, el nivel de espuma debe ser de 1.5 cm.",
      "Medir 10 onzas de leche en una jarra medidora, verter la leche en una jarra de acero inoxidable de 24 onzas, agregar 5 disparos de chocolate blanco, introducir la punta de la lanceta para espumar y calentar el chocolate blanco, el nivel de espuma debe ser de 2.5 cm.",
      "Medir 10 onzas de leche en una jarra medidora, verter la leche en una jarra de acero inoxidable de 24 onzas, agregar 4 disparos de chocolate blanco, introducir la punta de la lanceta para espumar y calentar el chocolate blanco, el nivel de espuma debe ser de 1.5 cm."
    ],
    correctIndex: 3,
    explanation: "Estándar de Chocolate Blanco Doble Caliente: Medir 10 oz de leche en jarra medidora, verter en jarra de 24 oz, 4 disparos de chocolate blanco, calentar y espumar hasta 1.5 cm."
  },
  {
    id: 22,
    question: "¿Cuántas onzas en total de agua debe tener un té caliente sencillo y cuántos sobres debe llevar?",
    options: [
      "1 sobre de té y 8 onzas de agua.",
      "1 sobre de té y 6 onzas de agua.",
      "2 sobres de té y 6 onzas de agua.",
      "1 sobre de té y 4 onzas de agua."
    ],
    correctIndex: 1,
    explanation: "Estándar de Té Sencillo: Requiere exactamente 1 sobre de té y 6 onzas de agua caliente."
  },
  {
    id: 23,
    question: "¿Cuál es la correcta preparación de un té chai caliente?",
    options: [
      "medir 8 onzas de leche en una jarra medidora, verter la leche en una jarra de acero inoxidable de 24 onzas, colocar la punta de la lanceta para calentar la leche, verter la leche caliente en un recipiente mezclador junto con una cucharada de té chai caliente y mezclar, colocar en una taza de Americano, el nivel debe ser de 8 onzas.",
      "medir 7 onzas de leche en una jarra medidora, verter la leche en una jarra de acero inoxidable de 12 onzas, colocar la punta de la lanceta para espumar la leche, verter en un recipiente mezclador junto con dos cucharadas de té chai y mezclar, colocar en una taza de capuccino, el nivel debe ser de 6 onzas.",
      "medir 7 onzas de leche en una jarra medidora, verter la leche en una jarra de acero inoxidable de 32 onzas, colocar la punta de la lanceta para calentar la leche, verter la leche caliente en un recipiente mezclador junto con una cucharada de té chai caliente y mezclar, colocar en una taza de Americano, el nivel debe ser de 7 onzas.",
      "medir 6 onzas de leche en una jarra medidora, verter la leche en una jarra de acero inoxidable de 32 onzas, colocar la punta de la lanceta para calentar la leche, verter en la licuadora con una cucharada de té chai y mezclar por 10 segundos, colocar en una taza de Americano, el nivel debe ser de 6 onzas."
    ],
    correctIndex: 2,
    explanation: "Estándar de Té Chai Caliente: Medir 7 oz de leche, verter en jarra de 32 oz, calentar, mezclar con 1 cucharada de té chai caliente en recipiente mezclador y servir 7 oz en taza de Americano."
  },
  {
    id: 24,
    question: "¿Cuál es la preparación correcta de una mezcla de capuccino frío?",
    options: [
      "5 litros de leche y 1 bolsa de concentrado.",
      "4 litros de leche y 1 bolsa de concentrado.",
      "5 litros de leche y 2 bolsas de concentrado.",
      "6 litros de leche y 1.5 bolsas de concentrado."
    ],
    correctIndex: 0,
    explanation: "Estándar de Mezcla de Capuccino: Se prepara utilizando exactamente 5 litros de leche por 1 bolsa de concentrado."
  },
  {
    id: 25,
    question: "¿Cuántas vueltas de panna lleva un frappe?",
    options: [
      "1 vuelta y media.",
      "3 vueltas completas.",
      "2 vueltas y media.",
      "3 vueltas y media."
    ],
    correctIndex: 2,
    explanation: "Estándar de Frappe Panna: Lleva exactamente 2 vueltas y media de panna."
  },
  {
    id: 26,
    question: "¿Cuántos disparos de sabor lleva un capuccino frío o frappé con sabor (Cajeta, Caramelli)?",
    options: [
      "1 para el chico, 2 para el grande",
      "2 para el chico, 4 para el grande",
      "3 para el chico, 4 para el grande",
      "2 para el chico, 3 para el grande"
    ],
    correctIndex: 3,
    explanation: "Estándar de Jarabe: Lleva 2 disparos para la bebida chica y 3 disparos para la bebida grande."
  },
  {
    id: 27,
    question: "¿Cuál es la correcta preparación de un capuccino frío o frappé con NUTELLA?",
    options: [
      "verter capuccino frappe o frío en vaso de licuadora midiendo 9 onzas para el chico y 13 para el grande, calentar el medidor cónico con agua caliente, colocar 3/4 de onza para bebida chica y 1 onza para bebida grande, vaciar en licuadora y mezclar durante 10 segundos, colocar en vaso chico o grande, colocar panna hasta 3 cm y decorar en forma de zig-zag.",
      "verter capuccino frappe o frío en vaso de licuadora midiendo 8 onzas para el chico y 12 para el grande, calentar el medidor cónico con agua caliente, colocar 1/2 onza para bebida chica y 1 onza para bebida grande, vaciar en licuadora y mezclar durante 10 segundos, colocar en vaso chico o grande, colocar panna hasta 2 cm y decorar en forma de zig-zag.",
      "verter capuccino frappe o frío en vaso de licuadora midiendo 9 onzas para el chico y 14 para el grande, calentar el medidor cónico con agua caliente, colocar 1 onza para bebida chica y 1.5 onzas para bebida grande, vaciar en licuadora y mezclar durante 15 segundos, colocar en vaso chico o grande, colocar panna hasta 3 cm y decorar en forma de espiral.",
      "verter capuccino frappe o frío en vaso de licuadora midiendo 10 onzas para el chico y 13 para el grande, calentar el medidor cónico con agua caliente, colocar 3/4 de onza para bebida chica y 1.25 onzas para bebida grande, vaciar en licuadora y mezclar durante 10 segundos, colocar en vaso chico o grande, colocar panna hasta 4 cm y decorar en forma circular."
    ],
    correctIndex: 0,
    explanation: "Estándar de Capuccino con NUTELLA: Medir 9 oz (chico) / 13 oz (grande) de capuccino frappe/frío en licuadora, calentar cono con agua, 3/4 oz (chico) / 1 oz (grande) de NUTELLA, licuar 10s, panna a 3cm y decorar en zig-zag."
  },
  {
    id: 28,
    question: "¿Qué es el Moka?",
    options: [
      "Café con crema de avellanas",
      "Café con leche y chocolate Italiano",
      "Café americano con chocolate en polvo",
      "Chocolate caliente con crema batida y canela"
    ],
    correctIndex: 1,
    explanation: "Estándar de Receta Moka: Mezcla de café, leche y chocolate Italiano."
  },
  {
    id: 29,
    question: "¿Qué es el capuccino?",
    options: [
      "Café con agua",
      "Café con leche y chocolate",
      "Leche caliente espumada con canela",
      "Café con leche y espuma"
    ],
    correctIndex: 3,
    explanation: "Estándar de Receta Capuccino: Café con leche y espuma."
  },
  {
    id: 30,
    question: "¿Cuántas galletas oreo lleva un capuccino frioreo frío o frappé?",
    options: [
      "1 galleta oreo para el chico y 2 galletas oreo para el grande",
      "2 galletas oreo para el chico y 4 galletas oreo para el grande",
      "2 galletas oreo para el chico y 3 galletas oreo para el grande",
      "3 galletas oreo para el chico y 4 galletas oreo para el grande"
    ],
    correctIndex: 2,
    explanation: "Estándar de Galletas Oreo: 2 galletas oreo para la bebida chica y 3 galletas oreo para la bebida grande."
  },
  {
    id: 31,
    question: "¿Cuál es la correcta preparación de un chocolate italiano frappe?",
    options: [
      "Colocar en una jarra medidora 4 onzas de leche para el sencillo y 6 onzas para el grande, colocar en la licuadora y colocar 2 disparos de chocolate italiano líquido para el sencillo y 3 para el grande, agregar 135gr de hielo para el sencillo y 180gr para el grande y mezclar, decorar el vaso con jarabe de chocolate obscuro en zig-zag y colocar la mezcla, decorar con un corazón.",
      "Colocar en una jarra medidora 3 onzas de leche para el sencillo y 5 onzas para el grande, colocar en la licuadora y colocar 3 disparos de chocolate italiano líquido para el sencillo y 4 para el grande, agregar 150gr de hielo para el sencillo y 200gr para el grande y mezclar, decorar el vaso con jarabe de chocolate obscuro en espiral y colocar la mezcla, decorar con una estrella.",
      "Colocar en una jarra medidora 3 onzas de leche para el sencillo y 5 onzas para el grande, colocar en la licuadora y colocar 2 disparos de chocolate italiano líquido para el sencillo y 3 para el grande, agregar 135gr de hielo para el sencillo y 180gr para el grande y mezclar, decorar el vaso con jarabe de chocolate obscuro en zig-zag y colocar la mezcla, decorar con un corazón.",
      "Colocar en una jarra medidora 2 onzas de leche para el sencillo y 4 onzas para el grande, colocar en la licuadora y colocar 2 disparos de chocolate italiano líquido para el sencillo y 3 para el grande, agregar 120gr de hielo para el sencillo y 160gr para el grande y mezclar, decorar el vaso con jarabe de chocolate blanco en zig-zag y colocar la mezcla, decorar con un círculo."
    ],
    correctIndex: 2,
    explanation: "Estándar de Chocolate Italiano Frappe: 3 oz leche (sencillo) / 5 oz (grande), 2 disparos chocolate (sencillo) / 3 (grande), 135gr hielo (sencillo) / 180gr (grande), decorar vaso con jarabe de chocolate oscuro en zig-zag y terminar con decoración de corazón."
  },
  {
    id: "preparacion_choc_blanco_frio",
    question: "¿Cuántas onzas de leche y cuántos disparos lleva un chocolate blanco frío?",
    options: [
      "Chico: 6 oz de leche, 2 tiros de chocolate y 60 gr de hielo; Grande: 8 oz de leche, 3 tiros de chocolate y 100 gr de hielo.",
      "Chico: 5 onzas de leche, 3 tiros de chocolate blanco y 45 gr de hielo; Grande: 7 onzas de leche, 4 tiros de chocolate blanco y 90 gr de hielo.",
      "Chico: 4 oz de leche, 3 tiros de chocolate y 90 gr de hielo; Grande: 6 oz de leche, 4 tiros de chocolate y 120 gr de hielo.",
      "Chico: 5 oz de leche, 2 tiros de chocolate y 45 gr de hielo; Grande: 8 oz de leche, 4 tiros de chocolate y 90 gr de hielo."
    ],
    correctIndex: 1,
    explanation: "ESTÁNDAR DE PREPARACIÓN"
  },
  {
    id: "preparacion_choc_blanco_frappe",
    question: "¿Cuántas onzas de leche y cuántos disparos lleva un chocolate blanco frappé?",
    options: [
      "Chico: 3 onzas de leche, 3 tiros de chocolate blanco y 135 gr de hielo; Grande: 5 onzas de leche, 4 tiros de chocolate blanco y 180 gr de hielo.",
      "Chico: 4 oz de leche, 2 tiros de chocolate y 120 gr de hielo; Grande: 6 oz de leche, 3 tiros de chocolate y 160 gr de hielo.",
      "Chico: 3 oz de leche, 2 tiros de chocolate y 150 gr de hielo; Grande: 5 oz de leche, 3 tiros de chocolate y 200 gr de hielo.",
      "Chico: 2 oz de leche, 4 tiros de chocolate y 135 gr de hielo; Grande: 4 oz de leche, 5 tiros de chocolate y 180 gr de hielo."
    ],
    correctIndex: 0,
    explanation: "ESTÁNDAR DE PREPARACIÓN"
  },
  {
    id: 33,
    question: "¿Cuántos minutos debe ser la infusión de un té, para la preparación de un té frío?",
    options: [
      "3 minutos",
      "7 minutos",
      "5 minutos",
      "10 minutos"
    ],
    correctIndex: 2,
    explanation: "Estándar de Infusión para Té Frío: El té debe reposar exactamente 5 minutos para extraer todo el sabor sin amargar."
  },
  {
    id: 34,
    question: "¿Cuántas bolsas de té y cuánta azúcar lleva un té frappe?",
    options: [
      "3 bolsas de té y 4 estuches de 2 azúcares.",
      "4 bolsas de té y 5 estuches de 2 azúcares.",
      "4 bolsas de té y 6 estuches de 2 azúcares.",
      "5 bolsas de té y 8 estuches de 2 azúcares."
    ],
    correctIndex: 2,
    explanation: "Estándar de Té Frappe: Se prepara utilizando 4 bolsas de té y 6 estuches de 2 azúcares."
  },
  {
    id: 35,
    question: "¿Cuántas onzas de leche lleva un té frappe?",
    options: [
      "4 Onzas de leche.",
      "6 Onzas de leche.",
      "8 Onzas de leche.",
      "5 Onzas de leche."
    ],
    correctIndex: 3,
    explanation: "Estándar de Leche para Té Frappe: Requiere exactamente 5 onzas de leche."
  },
  {
    id: 36,
    question: "¿Cuántas onzas de café lleva un Iced Coffee chico y grande?",
    options: [
      "4 onzas el chico y 6 onzas el grande",
      "3 onzas el chico y 5 onzas el grande",
      "4 onzas el chico y 8 onzas el grande",
      "5 onzas el chico y 7 onzas el grande"
    ],
    correctIndex: 0,
    explanation: "Estándar de  Iced Coffee: 4 oz para el tamaño chico y 6 oz para el tamaño grande."
  },
  {
    id: 37,
    question: "¿Cuántas onzas de café y leche lleva un Iced Latte chico y grande?",
    options: [
      "3 onzas de leche y 2 onzas de café para el chico y 4 onzas de leche y 3 de café para el grande",
      "2 onzas de leche y 2 onzas de café para el chico y 3 onzas de leche y 3 de café para el grande",
      "2 onzas de leche y 3 onzas de café para el chico y 3 onzas de leche y 4 de café para el grande",
      "2 onzas de leche y 2 onzas de café para el chico y 3 onzas de leche y 2 de café para el grande"
    ],
    correctIndex: 1,
    explanation: "Estándar de Iced Latte: 2 oz leche + 2 oz café para chico; 3 oz leche + 3 oz café para grande."
  },
  {
    id: "preparacion_capuccino_des_frio",
    question: "¿Cuál es la correcta preparación de un capuccino deslactosado frío?",
    options: [
      "Medir 8 oz de leche, agregar 2 disparos de concentrado, licuar por 10 segundos y agregar 60 gr de hielo.",
      "Medir 9 onzas de leche en jarra medidora, agregar 1 disparo de concentrado de café frío deslactosado, licuar durante 5 segundos, agregar 45 gr de hielo.",
      "Medir 10 oz de leche, agregar 1 disparo de concentrado regular, agitar manualmente y agregar 45 gr de hielo.",
      "Medir 9 oz de leche deslactosada, extraer 1 espresso directo de la máquina y agregar 90 gr de hielo."
    ],
    correctIndex: 1,
    explanation: "ESTÁNDAR DE PREPARACIÓN"
  },
  {
    id: "preparacion_capuccino_des_frappe",
    question: "¿Cuál es la correcta preparación de un capuccino deslactosado frappé?",
    options: [
      "Medir 3.3 onzas de leche en una jarra medidora, agregar 2 disparos, el primero de 1 onza (30 ml) el segundo de 0.3 onzas (10 ml) y agregar 180 gr de hielo.",
      "Medir 4 oz de leche, agregar 1 disparo de 1.5 onzas de concentrado y agregar 150 gr de hielo.",
      "Medir 3.5 oz de leche, agregar 2 disparos idénticos de 0.5 oz cada uno y agregar 180 gr de hielo.",
      "Medir 5 oz de leche deslactosada, agregar 1 disparo de concentrado de 1 oz y agregar 200 gr de hielo."
    ],
    correctIndex: 0,
    explanation: "ESTÁNDAR DE PREPARACIÓN"
  },
  {
    id: 39,
    question: "¿Cuántos gramos de jamón lleva un panino?",
    options: [
      "20 gramos",
      "40 gramos",
      "45 gramos",
      "30 gramos"
    ],
    correctIndex: 3,
    explanation: "Estándar de Panino: Lleva exactamente 30 gramos de jamón."
  },
  {
    id: 40,
    question: "¿Cuántos gramos de salami lleva un panino?",
    options: [
      "13.2 gramos",
      "10.5 gramos",
      "12.0 gramos",
      "15.4 gramos"
    ],
    correctIndex: 0,
    explanation: "Estándar de Salami: Debe dosificarse exactamente 13.2 gramos de salami."
  },
  {
    id: 41,
    question: "¿Cuántos gramos de aderezo de la casa lleva un panino?",
    options: [
      "10 gramos en el interior y 5 gramos en la tapa",
      "8 gramos en el interior y 8 gramos en la tapa",
      "8 gramos en el interior y 5 gramos en la tapa",
      "5 gramos en el interior y 5 gramos en la tapa"
    ],
    correctIndex: 2,
    explanation: "Estándar de Aderezo de la Casa: 8 gramos distribuidos en el interior y 5 gramos en la tapa."
  },
  {
    id: 42,
    question: "¿Cuántos gramos de aderezo italiano lleva un panino?",
    options: [
      "10 gramos",
      "12 gramos",
      "16 gramos",
      "14 gramos"
    ],
    correctIndex: 3,
    explanation: "Estándar de Aderezo Italiano: Requiere exactamente 14 gramos."
  },
  {
    id: 43,
    question: "¿Cuántos gramos de jamón serrano lleva un panino de jamón serrano?",
    options: [
      "30 gramos",
      "20 gramos",
      "25 gramos",
      "40 gramos"
    ],
    correctIndex: 0,
    explanation: "Estándar de Panino Jamón Serrano: Requiere 30 gramos de jamón serrano."
  },
  {
    id: 44,
    question: "¿Cuántos gramos de jamón serrano lleva un panino italiano?",
    options: [
      "10 gramos",
      "20 gramos",
      "15 gramos",
      "25 gramos"
    ],
    correctIndex: 2,
    explanation: "Estándar de Panino Italiano: Lleva exactamente 15 gramos de jamón serrano."
  },
  {
    id: 45,
    question: "¿Cuántos gramos de NUTELLA lleva un Croissant de NUTELLA?",
    options: [
      "30 gramos",
      "40 gramos",
      "50 gramos",
      "60 gramos"
    ],
    correctIndex: 1,
    explanation: "Estándar de Croissant de NUTELLA: Lleva exactamente 40 gramos de NUTELLA."
  },
  {
    id: 46,
    question: "¿Cuántos gramos de NUTELLA lleva un pay con NUTELLA?",
    options: [
      "20 gramos",
      "15 gramos",
      "25 gramos",
      "30 gramos"
    ],
    correctIndex: 0,
    explanation: "Estándar de Pay con NUTELLA: Lleva exactamente 20 gramos de NUTELLA."
  },
  {
    id: "servicio_01",
    question: "¿Cuál es el saludo de bienvenida oficial?",
    options: [
      "Hola, ¿qué le vamos a servir hoy?",
      "Buenas tardes bienvenido a Italian Coffe",
      "Bienvenidos a Italian Coffee Company, adelante",
      "Buenas tardes, ¿gusta una mesa?"
    ],
    correctIndex: 1,
    explanation: "ESTÁNDAR DE SERVICIO: Buenas tardes bienvenido a Italian Coffe"
  },
  {
    id: "servicio_02",
    question: "¿Cuál es el uniforme completo y correcto?",
    options: [
      "Playera con logotipo, mandil verde, pantalón de mezclilla azul y tenis negros cómodos.",
      "Gorra verde con logotipo Italian Coffe, red para el cabello, camisa con logotipo en caso de ser manager o playera con logotipo para colaborador, mandil verde con logotipo, gafete con nombre y franquicia, pantalón de mezclilla azul, cinturón negro, calzado completamente negro y calcetines obscuros.",
      "Camisa o playera institucional, mandil de la sucursal, gafete de identificación, pantalón oscuro libre, zapato cerrado de cualquier color.",
      "Gorra institucional, playera con logotipo, mandil verde, pantalón de mezclilla negro, cinturón y zapatos libres."
    ],
    correctIndex: 1,
    explanation: "ESTÁNDAR DE SERVICIO: Gorra verde con logotipo Italian Coffe, red para el cabello, camisa con logotipo en caso de ser manager o playera con logotipo para colaborador, mandil verde con logotipo, gafete con nombre y franquicia, pantalón de mezclilla azul, cinturón negro, calzado completamente negro y calcetines obscuros."
  },
  {
    id: "servicio_03",
    question: "¿Cuáles son los pilares para una buena labor de venta?",
    options: [
      "1.- Ofrecer siempre el tamaño grande, 2.- Insistir en la repostería, 3.- Apresurar el cobro.",
      "1.- Saludar sonriendo, 2.- Memorizar los precios, 3.- Dar degustaciones de café, 4.- Ofrecer bolsas para llevar.",
      "1.- Tener conocimiento de los productos, 2.- Hacer recomendación de Especialidades, 3.- Ofrecer complementos o sabores antes que bebidas grandes, 4.- Promover productos para llevar.",
      "1.- Ofrecer las promociones del mes, 2.- Recomendar cambiar el tipo de leche, 3.- Sugerir el pan del día."
    ],
    correctIndex: 2,
    explanation: "ESTÁNDAR DE SERVICIO: 1.- Tener conocimiento de los productos, 2.- Hacer recomendación de Especialidades, 3.- Ofrecer complementos o sabores antes que bebidas grandes, 4.- Promover productos para llevar."
  },
  {
    id: "pos_01",
    question: "¿Cómo se procesa el cobro con tarjeta en el punto de venta?",
    options: [
      "Presionando el botón de tarjeta en la columna vertical derecha",
      "Dando clic en el icono de la terminal en el menú superior",
      "Presionando el botón de tarjeta en la columna inferior",
      "Seleccionando el menú de funciones especiales en pantalla"
    ],
    correctIndex: 2,
    explanation: "PUNTO DE VENTA: Presionando el botón de tarjeta en la columna inferior"
  },
  {
    id: "pos_02",
    question: "¿Cuál botón funciona para separar mesas en su punto de venta?",
    options: [
      "Columna inferior primer botón de la izquierda",
      "Columna vertical derecha primer botón superior",
      "Columna inferior último botón de la derecha",
      "Icono de plano de mesas en el panel central"
    ],
    correctIndex: 0,
    explanation: "PUNTO DE VENTA: Columna inferior primer botón de la izquierda"
  },
  {
    id: "pos_03",
    question: "¿Cuál botón se utiliza para separar cuentas en su punto de venta?",
    options: [
      "Columna inferior segundo botón de la izquierda",
      "Columna vertical derecha ultimo botón",
      "Menú desplegable de herramientas de caja",
      "Botón central de división de comandas"
    ],
    correctIndex: 1,
    explanation: "PUNTO DE VENTA: Columna vertical derecha ultimo botón"
  },
  {
    id: "pos_04",
    question: "¿Cuál botón se utiliza para el cobro con efectivo en su punto de venta?",
    options: [
      "Botón de caja registradora en la barra de tareas",
      "Tecla F5 del teclado físico",
      "Icono de billete en columna inferior",
      "Primer botón superior de la columna derecha"
    ],
    correctIndex: 2,
    explanation: "PUNTO DE VENTA: Icono de billete en columna inferior"
  },
  {
    id: "servicio_04",
    question: "¿Cuántas charolas para labor de venta deben tener activas en sucursal?",
    options: [
      "2 charolas de repostería y 1 de panadería",
      "1 charola mixta de alimentos para llevar",
      "1 charola de repostería y 1 charola de Panadería",
      "Las que asigne el supervisor según el flujo de la tarde"
    ],
    correctIndex: 2,
    explanation: "ESTÁNDAR DE SERVICIO: 1 charola de repostería y 1 charola de Panadería"
  },
  {
    id: "servicio_05",
    question: "¿Cuál es la despedida oficial para el invitado?",
    options: [
      "Gracias por su compra, regrese pronto",
      "Hasta luego, vuelva pronto a Italian Coffee",
      "Que tenga una buena tarde, adiós",
      "Vuelva pronto, recuerde visitarnos"
    ],
    correctIndex: 1,
    explanation: "ESTÁNDAR DE SERVICIO: Hasta luego, vuelva pronto a Italian Coffee"
  }
];

// 2. State Variables
let activeQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let hasAnswered = false;
let sessionToken = null;
const QUIZ_LENGTH = 20; // We select 20 random questions for the certification exam

// 3. DOM Elements Cache
let heroSection, widgetWrapper, resultsDashboard;
let progressFill, currentProgressText, questionNumText;
let questionText, optionsGrid, feedbackPanel, feedbackHeader, feedbackText, btnNext;
let resultsScore, resultsPercentage, resultsBadge, resultsTitle, btnRestart;

// 4. Initialize Core Handlers
document.addEventListener("DOMContentLoaded", () => {
  // Select DOM Elements
  heroSection = document.getElementById("hero-section");
  widgetWrapper = document.getElementById("widget-wrapper");
  resultsDashboard = document.getElementById("results-dashboard");

  progressFill = document.getElementById("progress-fill");
  currentProgressText = document.getElementById("current-progress-text");
  questionNumText = document.getElementById("question-num");

  questionText = document.getElementById("question-text");
  optionsGrid = document.getElementById("options-grid");

  feedbackPanel = document.getElementById("feedback-panel");
  feedbackHeader = document.getElementById("feedback-header");
  feedbackText = document.getElementById("feedback-text");

  btnNext = document.getElementById("btn-next");

  resultsScore = document.getElementById("results-score");
  resultsPercentage = document.getElementById("results-percentage");
  resultsBadge = document.getElementById("results-badge");
  resultsTitle = document.getElementById("results-title");
  btnRestart = document.getElementById("btn-restart");

  // Setup Event Listeners
  document.getElementById("btn-start-quiz").addEventListener("click", showAuthForm);
  document.getElementById("auth-form").addEventListener("submit", handleAuthSubmit);
  document.getElementById("btn-restart").addEventListener("click", restartQuiz);
  document.getElementById("btn-download-pdf").addEventListener("click", downloadPDF);
  btnNext.addEventListener("click", handleNextQuestion);

  // Toggle support help modal
  setupSupportModal();
});

// 5. Identification Form Flow
let nombreColaborador = "";
let franquicia = "";

function showAuthForm() {
  heroSection.classList.add("fade-out");
  setTimeout(() => {
    heroSection.style.display = "none";
    heroSection.classList.remove("fade-out");

    const authSection = document.getElementById("auth-section");
    authSection.style.display = "flex";
    authSection.classList.add("fade-in");
  }, 250);
}

function handleAuthSubmit(event) {
  event.preventDefault();
  nombreColaborador = document.getElementById("user-name").value.trim();
  franquicia = document.getElementById("user-branch").value.trim();

  if (!nombreColaborador || !franquicia) return;

  const authSection = document.getElementById("auth-section");
  authSection.classList.add("fade-out");
  setTimeout(() => {
    authSection.style.display = "none";
    authSection.classList.remove("fade-out");

    // Start the evaluation exam
    startQuiz();
  }, 250);
}

// 6. Quiz Logic Flow
function startQuiz() {
  // Reset states
  score = 0;
  currentQuestionIndex = 0;
  hasAnswered = false;

  // Generate efemeral session token (Anti-Copy logic)
  sessionToken = "exam_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
  console.log(`[Exam Session Initialized] Token: ${sessionToken}`);

  // Choose 20 random unique questions from database
  activeQuestions = shuffleArray([...QUESTIONS_DATABASE]).slice(0, QUIZ_LENGTH);

  // Display the quiz directly (no transition needed here as it was done in handleAuthSubmit)
  widgetWrapper.style.display = "flex";
  widgetWrapper.classList.add("fade-in");

  // Render the first question
  renderQuestion();
}

function renderQuestion() {
  hasAnswered = false;
  btnNext.disabled = true;
  feedbackPanel.style.display = "none";

  const currentQuestion = activeQuestions[currentQuestionIndex];

  // Update Header progress
  const progressPercent = Math.round((currentQuestionIndex / QUIZ_LENGTH) * 100);
  progressFill.style.width = `${progressPercent}%`;
  currentProgressText.innerText = `${progressPercent}%`;
  questionNumText.innerText = `PREGUNTA ${currentQuestionIndex + 1} DE ${QUIZ_LENGTH}`;

  // Set question content
  questionText.innerText = currentQuestion.question;

  // Render options
  optionsGrid.innerHTML = "";

  // Map options keeping track of the correct answer (Double Randomization Layer)
  const mappedOptions = currentQuestion.options.map((opt, idx) => ({
    text: opt,
    isCorrect: idx === currentQuestion.correctIndex
  }));

  // Shuffle options dynamically
  const shuffledOptions = shuffleArray([...mappedOptions]);
  const correctText = currentQuestion.options[currentQuestion.correctIndex];

  shuffledOptions.forEach((opt, idx) => {
    const letter = String.fromCharCode(65 + idx); // A, B, C, D
    const card = document.createElement("button");
    card.className = "option-card";
    card.innerHTML = `
      <div class="option-letter">${letter}</div>
      <div class="option-content">${opt.text}</div>
    `;
    card.addEventListener("click", () => handleOptionSelection(card, opt.isCorrect, correctText));
    optionsGrid.appendChild(card);
  });

  // Smooth entry animation for the options
  optionsGrid.classList.remove("fade-in");
  void optionsGrid.offsetWidth; // Force reflow
  optionsGrid.classList.add("fade-in");
}

function handleOptionSelection(selectedCard, isCorrect, correctText) {
  if (hasAnswered) return;
  hasAnswered = true;

  const currentQuestion = activeQuestions[currentQuestionIndex];
  const allCards = optionsGrid.querySelectorAll(".option-card");

  // Store user's choice and correct answers for PDF report
  currentQuestion.userAnswer = selectedCard.querySelector(".option-content").innerText;
  currentQuestion.isUserCorrect = isCorrect;
  currentQuestion.correctAnswerText = correctText;

  // Disable all option cards
  allCards.forEach(card => card.classList.add("disabled"));

  if (isCorrect) {
    // Correct selection
    selectedCard.classList.remove("disabled");
    selectedCard.classList.add("correct");
    score++;

    // Show success feedback
    feedbackHeader.className = "feedback-header success";
    feedbackHeader.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      ¡Correcto! Cumple con la Norma Operativa
    `;
  } else {
    // Incorrect selection
    selectedCard.classList.remove("disabled");
    selectedCard.classList.add("incorrect");

    // Highlight the correct answer card for learning reinforcement
    allCards.forEach(card => {
      const cardContentText = card.querySelector(".option-content").innerText;
      if (cardContentText === correctText) {
        card.classList.remove("disabled");
        card.classList.add("correct");
      }
    });

    // Show error feedback
    feedbackHeader.className = "feedback-header fail";
    feedbackHeader.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
      Ajuste Requerido en Operaciones
    `;
  }

  // Show manual explanation details
  feedbackText.innerText = currentQuestion.explanation;
  feedbackPanel.style.display = "block";

  // Enable next action button
  btnNext.disabled = false;
}

function handleNextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < QUIZ_LENGTH) {
    // Go to next question
    renderQuestion();
  } else {
    // Quiz completed, show results
    showResults();
  }
}

function showResults() {
  // Update progress bar to full 100%
  progressFill.style.width = "100%";
  currentProgressText.innerText = "100%";

  widgetWrapper.classList.add("fade-out");
  setTimeout(() => {
    widgetWrapper.style.display = "none";
    widgetWrapper.classList.remove("fade-out");

    resultsDashboard.style.display = "flex";
    resultsDashboard.classList.add("fade-in");

    // Set final scores and computed efficiency
    resultsScore.innerText = `${score} / ${QUIZ_LENGTH} Aciertos`;
    const percentage = Math.round((score / QUIZ_LENGTH) * 100);
    resultsPercentage.innerText = `${percentage}% de Eficiencia`;

    // Static text layout
    resultsBadge.innerText = "📋";
    if (resultsTitle) resultsTitle.innerText = "Evaluación Completada";
    if (btnRestart) btnRestart.innerText = "Volver a Intentar";
  }, 250);
}

function restartQuiz() {
  // Clear token and collaborator details on restart
  sessionToken = null;
  nombreColaborador = "";
  franquicia = "";

  // Reset auth form input fields
  const form = document.getElementById("auth-form");
  if (form) form.reset();

  resultsDashboard.classList.add("fade-out");
  setTimeout(() => {
    resultsDashboard.style.display = "none";
    resultsDashboard.classList.remove("fade-out");

    // Open main Intro Hero again
    heroSection.style.display = "flex";
    heroSection.classList.add("fade-in");
  }, 250);
}

// 6. Utility Functions
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Support & Help button modal simulation
function setupSupportModal() {
  const btnSupport = document.querySelector(".btn-support");
  if (btnSupport) {
    btnSupport.addEventListener("click", () => {
      alert("💬 Centro de Ayuda SaaS Operaciones\n\n¿Tienes dudas sobre los estándares del manual o necesitas reportar una falla técnica?\nEscríbenos a: soporte@italiancoffee-ops.com");
    });
  }
}

// Generate and download executive PDF audit report via window.print()
function downloadPDF() {
  console.log("Iniciando impresión nativa del reporte...");

  // 1. Crear hoja de estilos CSS temporal para la impresión (@media print)
  const style = document.createElement('style');
  style.id = 'print-style-temp';
  style.innerHTML = `
    @media print {
      body > *:not(#print-report) {
        display: none !important;
      }
      body {
        background-color: white;
        margin: 0;
        padding: 0;
      }
      #print-report {
        display: block !important;
        width: 100%;
        margin: 0;
        padding: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // 2. Inyectar dinámicamente los datos individuales en el reporte
  const printContainer = document.createElement('div');
  printContainer.id = 'print-report';
  // Oculto en pantalla, visible solo en print
  printContainer.style.display = 'none';
  printContainer.style.fontFamily = "'Inter', 'Arial', sans-serif";
  printContainer.style.color = "#2B1B17";
  printContainer.style.padding = "20px";

  const dateStr = new Date().toLocaleDateString("es-ES", {
    year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit"
  });

  const efficiency = Math.round((score / QUIZ_LENGTH) * 100);

  let questionsHTML = '';
  activeQuestions.forEach((q, idx) => {
    const statusColor = q.isUserCorrect ? '#2E7D32' : '#C62828';
    const statusText = q.isUserCorrect ? 'Correcto (Norma Operativa)' : 'Incorrecto (Requiere Ajuste)';
    let html = `
      <div style="margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #E3DFD9; page-break-inside: avoid;">
        <p style="font-weight: 700; font-size: 14px; margin: 0 0 6px 0; color: #2B1B17;">${idx + 1}. ${q.question}</p>
        <p style="margin: 0 0 6px 0; font-size: 13px; color: #5A4E4A;">Respuesta del colaborador: ${q.userAnswer || "No respondida"}</p>
        <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 600; color: ${statusColor};">Estado: ${statusText}</p>
    `;
    if (!q.isUserCorrect) {
      html += `<p style="margin: 0; font-size: 13px; color: #5A4E4A;">Respuesta correcta del manual: <span style="font-weight:600;">${q.correctAnswerText}</span></p>`;
    }
    html += `</div>`;
    questionsHTML += html;
  });

  printContainer.innerHTML = `
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="font-family: 'Playfair Display', serif; font-size: 26px; color: #2B1B17; margin: 0; text-transform: uppercase;">The Italian Coffee Company</h1>
      <h2 style="font-size: 18px; color: #5A4E4A; margin: 8px 0 0 0; font-weight: 600;">Reporte de Evaluación Operativa</h2>
    </div>
    
    <div style="margin-bottom: 24px; font-size: 14px;">
      <p style="margin: 6px 0;"><strong>Colaborador:</strong> ${nombreColaborador || "No registrado"}</p>
      <p style="margin: 6px 0;"><strong>Franquicia / Sucursal:</strong> ${franquicia || "No registrada"}</p>
      <p style="margin: 6px 0; color: #8E827E; font-size: 12px;">Fecha de Auditoría: ${dateStr}</p>
    </div>
    
    <hr style="border: none; border-top: 2px solid #D4AF37; margin-bottom: 24px;">
    
    <div style="margin-bottom: 32px;">
      <h3 style="font-size: 16px; color: #2B1B17; margin: 0 0 12px 0;">RESUMEN DE DESEMPEÑO</h3>
      <p style="margin: 6px 0; font-size: 14px;">Marcador Final: <strong style="color: #D4AF37; font-size: 16px;">${score} / ${QUIZ_LENGTH} Aciertos</strong></p>
      <p style="margin: 6px 0; font-size: 14px;">Porcentaje de Eficiencia: <strong>${efficiency}%</strong></p>
    </div>
    
    <hr style="border: none; border-top: 2px solid #D4AF37; margin-bottom: 24px;">
    
    <div>
      <h3 style="font-size: 16px; color: #2B1B17; margin: 0 0 16px 0;">DESGLOSE DETALLADO DE EXAMEN</h3>
      ${questionsHTML}
    </div>
  `;

  document.body.appendChild(printContainer);

  // Cambiar temporalmente el título del documento para que al imprimir el PDF tenga un nombre adecuado
  const originalTitle = document.title;
  const safeName = (nombreColaborador || 'Colaborador').replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '_');
  document.title = `Reporte_${safeName}`;

  // 3. Ejecutar el comando de guardado nativo
  window.print();

  // Restaurar título y limpiar el DOM tras ejecutar el comando
  document.title = originalTitle;
  setTimeout(() => {
    if (document.body.contains(printContainer)) {
      document.body.removeChild(printContainer);
    }
    if (document.head.contains(style)) {
      document.head.removeChild(style);
    }
  }, 2000);
}
