import logoIncentitours from "./assets/Logo-nueva-de-incentitours.png";
import heroBarrancas from "./assets/Hasselblad26091819-11-Copiar.jpg";
import heroChepe from "./assets/Chepe-Express-Copiar.jpg";
import heroCultura from "./assets/303PAISAJE-PIEDRA-VOLADA-TARAHUMARA-ARNULFO-KIMARE-FOTO-ALEX-AGUIRRE-TERRAZAS-4-OCT-2014-Copiar-Copiar.jpg";
import experienceBarrancas from "./assets/Mesa-de-trabajo-5-2.png";
import experienceChepe from "./assets/DSC03794-Copiar-Copiar.jpg";
import destCreel from "./assets/CREEL.png";
import destChihuahua from "./assets/Mesa-de-trabajo-6-1.png";
import destCuauhtemoc from "./assets/Mesa-de-trabajo-5cuau.png";
import destElFuerte from "./assets/Mesa-de-trabajo-5cuau-1.png";
import aboutImage from "./assets/DSC03794-Copiar-Copiar.jpg";

export const LOGO = logoIncentitours;

export const ABOUT_IMAGE = aboutImage;

export const NAV_LINKS = [
  { label: "Experiencias", href: "/#experiencias" },
  { label: "Destinos", href: "/destinos" },
  { label: "Paquetes", href: "/#paquetes" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
] as const;

export const HERO_SLIDES = [
  {
    title: "Barrancas del Cobre",
    subtitle: "Expertos en la Sierra Tarahumara",
    image: heroBarrancas,
  },
  {
    title: "Tren Chepe Express",
    subtitle: "El viaje más espectacular de México",
    image: heroChepe,
  },
  {
    title: "Experiencias culturales",
    subtitle: "Dos países, tres culturas",
    image: heroCultura,
  },
] as const;

export const EXPERIENCES = [
  {
    eyebrow: "Naturaleza",
    title: "Barrancas del Cobre",
    description:
      "Uno de los sistemas de barrancas más imponentes del mundo. Miradores, teleférico y adrenalina en el Parque de Aventuras.",
    image: experienceBarrancas,
  },
  {
    eyebrow: "Aventura",
    title: "Tren Chepe Express",
    description:
      "Más de 350 km entre cañones, 87 túneles y 37 puentes. Del clima tropical a los bosques de pino en un solo viaje.",
    image: experienceChepe,
  },
  {
    eyebrow: "Cultura",
    title: "Tres culturas",
    description:
      "Rarámuri, menonita y mestiza en un mismo recorrido. Tradición, gastronomía y encuentros auténticos en la Sierra.",
    image: heroCultura,
  },
] as const;

export type Destination = {
  slug: string;
  name: string;
  tag: string;
  location: string;
  blurb: string;
  images: string[];
  body: string[];
  highlights: string[];
  featured?: boolean;
  featuredTitle?: string;
};

export const DESTINATIONS: Destination[] = [
  {
    slug: "divisadero",
    name: "Divisadero",
    featuredTitle: "Parque de Aventura Barrancas del Cobre",
    tag: "Aventura",
    location: "Barrancas del Cobre, Chihuahua",
    blurb:
      "Urique, Tararecua y del Cobre a la vista. Teleférico, tirolesas y vía ferrata en el Parque de Aventuras.",
    images: [heroBarrancas, experienceBarrancas, heroChepe, heroCultura],
    body: [
      "Esta estación es considerada escala obligada al hacer el recorrido en el Chepe Express. Se trata de uno de los monumentos naturales más espectaculares de México y del mundo. En este punto se aprecian tres cañones: Urique, Tararecua y del Cobre.",
      "El Parque de Aventura Barrancas del Cobre cuenta con un teleférico, el tercero más largo del mundo, con 3 km de cable sin torres intermedias; la tirolesa estilo ZipRider más larga del mundo; un circuito de siete tirolesas con dos puentes colgantes, para sumar casi 5 km de recorrido; y una vía ferrata con rappel, escalada en roca y un pequeño puente colgante al que se accede por medio de un “salto de Tarzán”, además de otras actividades para toda la familia.",
    ],
    highlights: [
      "Teleférico: tercero más largo del mundo (3 km)",
      "ZipRider: la tirolesa más larga del mundo",
      "Circuito de siete tirolesas y dos puentes colgantes",
      "Vía ferrata con rappel y escalada",
      "Vistas a los cañones Urique, Tararecua y del Cobre",
    ],
    featured: true,
  },
  {
    slug: "creel",
    name: "Creel",
    tag: "Pueblo Mágico",
    location: "Sierra Tarahumara, Chihuahua",
    blurb:
      "Puerta de entrada a las Barrancas del Cobre. Bosques, valles y la cultura rarámuri en la Sierra Tarahumara.",
    images: [destCreel, heroCultura, experienceChepe, heroBarrancas],
    body: [
      "Creel es un destino lleno de historia y tradición. Sus alrededores abundantes en pinos y encinos despiertan el espíritu aventurero para visitar este lugar que se conoce como la puerta de entrada a las Barrancas del Cobre, uno de los sistemas de barrancas más largos del mundo.",
      "Este Pueblo Mágico, también llamado “Estación Creel”, cautiva a los visitantes con sus grandiosos e impactantes escenarios y con la presencia constante de los rarámuri, una de las etnias mejor conservadas de América.",
      "Se ubica a 247 kilómetros al sureste de la ciudad de Chihuahua, sobre las partes altas de la Sierra Madre Occidental, conocida como Sierra Tarahumara.",
    ],
    highlights: [
      "Pueblo Mágico y puerta a las Barrancas del Cobre",
      "Bosques de pino y encino en la Sierra Tarahumara",
      "Cultura rarámuri viva",
      "Punto de partida ideal para explorar la región",
    ],
  },
  {
    slug: "chihuahua",
    name: "Chihuahua Capital",
    tag: "Ciudad",
    location: "Chihuahua, Chihuahua",
    blurb:
      "Catedral barroca, murales históricos y el extremo este del Chepe. Punto de partida ideal para tu aventura.",
    images: [destChihuahua, heroChepe, experienceChepe, destCreel],
    body: [
      "La ciudad de Chihuahua es la capital del estado de Chihuahua en el noroeste de México. Es conocida por la Catedral de Chihuahua de estilo barroco español y el Palacio de Gobierno del siglo XVIII, con enormes murales que ilustran eventos históricos importantes de México.",
      "La ciudad también alberga el extremo este del ferrocarril Chepe, que recorre los desfiladeros teñidos de verde del área del Cañón del Cobre.",
      "Es la segunda ciudad más grande y poblada del estado. Su principal actividad económica es la industria ligera en forma de maquiladoras y las actividades comerciales.",
    ],
    highlights: [
      "Catedral barroca y Palacio de Gobierno",
      "Extremo este del Chepe Express",
      "Punto de partida para la Sierra Tarahumara",
      "Murales históricos y patrimonio colonial",
    ],
  },
  {
    slug: "cuauhtemoc",
    name: "Cuauhtémoc",
    tag: "Tres culturas",
    location: "Centro de Chihuahua",
    blurb:
      "Tierra menonita, puerta a la Sierra y región manzanera. Español, inglés y Plautdietsch en un mismo lugar.",
    images: [destCuauhtemoc, heroCultura, destCreel, experienceChepe],
    body: [
      "Está ubicada en la zona central del estado, a 105 kilómetros al suroeste de Chihuahua, la capital. Está considerada como la puerta de entrada a la región de la Sierra Tarahumara.",
      "Es reconocida por ser la región manzanera más productiva de Latinoamérica, la puerta de entrada a la Sierra Tarahumara y Tierra de las Tres Culturas: la rarámuri, la menonita y la mestiza. En esta ciudad se reconocen como oficiales tres idiomas: español, inglés y Plautdietsch.",
      "Cuauhtémoc es una ciudad joven. Antes de que los menonitas llegaran a México en la década de 1920, lo que luego se convertiría en Cuauhtémoc era poco más que una estación de aprovisionamiento de ferrocarril llamada “San Antonio de los Arenales”.",
    ],
    highlights: [
      "Tierra de las Tres Culturas",
      "Región manzanera más productiva de Latinoamérica",
      "Puerta de entrada a la Sierra Tarahumara",
      "Español, inglés y Plautdietsch oficiales",
    ],
  },
  {
    slug: "el-fuerte",
    name: "El Fuerte",
    tag: "Pueblo Mágico",
    location: "Sinaloa",
    blurb:
      "Historia virreinal, río y mariscos sinaloenses. El cierre perfecto tras el recorrido del Chepe Express.",
    images: [destElFuerte, heroChepe, experienceBarrancas, destChihuahua],
    body: [
      "Es un pueblo soleado en donde se escucha el río, posee una cocina fresca e inesperada, y sus habitantes bailan tan eufóricos como sabios en su naturalidad. El Fuerte encierra estos y otros tesoros del norte sinaloense para revelarse a los viajeros más arriesgados.",
      "Fue fundada hace casi 500 años, posee una zona arqueológica —la más rica en petroglifos que hay en Sinaloa— y vestigios mayos (Yoremes) que habitaron la región antes de la llegada de los españoles. El lugar tiene la declaratoria de Área Natural Protegida.",
      "En El Fuerte se come muy bien, igual que en todo el estado de Sinaloa: prueba el hacha de lobina y el cauque de agua dulce. Se incorporó al programa Pueblos Mágicos en el año 2010.",
    ],
    highlights: [
      "Pueblo Mágico desde 2010",
      "Zona arqueológica con petroglifos",
      "Área Natural Protegida",
      "Gastronomía sinaloense y cierre ideal del Chepe",
    ],
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

export function getFeaturedDestination(): Destination {
  return DESTINATIONS.find((d) => d.featured) ?? DESTINATIONS[0]!;
}

export function getGridDestinations(): Destination[] {
  return DESTINATIONS.filter((d) => !d.featured);
}

export const PACKAGES = [
  {
    name: "Barrancas Express",
    duration: "3 días · 2 noches",
    departures: "Lunes y sábados",
    summary:
      "Inmersión rápida en la Sierra Tarahumara: vistas de la Barranca, Creel y adrenalina en el Parque Aventura.",
  },
  {
    name: "Entre dos Pueblos Mágicos",
    duration: "4 días · 3 noches",
    departures: "Domingos y viernes",
    summary:
      "Creel y El Fuerte unidos por el Chepe Express. Cañones, artesanía rarámuri y el sabor de Sinaloa.",
  },
  {
    name: "Altura y Aventura",
    duration: "5 días · 4 noches",
    departures: "Domingos, jueves y martes",
    summary:
      "De 90 a 2,300 m de altitud a bordo del Chepe. Biodiversidad, clima y cultura rarámuri en un solo viaje.",
  },
  {
    name: "Cultural",
    duration: "5 días · 4 noches",
    departures: "Jueves, sábado o lunes",
    summary:
      "Menonitas, Sierra Tarahumara, Parque Aventura y tren hasta El Fuerte. Cultura de principio a fin.",
  },
  {
    name: "Espectacular",
    duration: "6 días · 5 noches",
    departures: "Martes, jueves y sábados",
    summary:
      "La experiencia completa: tren, barrancas, exploración y espíritu de aventura en la Sierra.",
  },
  {
    name: "Maravillosa",
    duration: "7 días · 6 noches",
    departures: "Martes, jueves y sábado",
    summary:
      "Ritmo pausado: Chihuahua, Creel, dos noches en barrancas, Chepe Express y El Fuerte.",
  },
] as const;

export const SERVICES = [
  { title: "Chepe Express", detail: "Reservaciones y boletos" },
  { title: "Tours", detail: "Culturales y de naturaleza" },
  { title: "Guías certificados", detail: "Atención al turismo extranjero" },
  { title: "Viajes de incentivo", detail: "Diseño a la medida" },
  { title: "Traslados", detail: "Aeropuerto, hotel y estación" },
  { title: "Renta de vans y autobuses", detail: "Logística de grupo" },
  { title: "Congresos y eventos", detail: "Planeación completa" },
  { title: "Hotel propio", detail: "The Lodge at Creel Hotel & Spa" },
] as const;

export const TESTIMONIALS = [
  {
    name: "Antonio Montes",
    quote:
      "Muchísimas gracias por ayudarnos con este viaje inolvidable. Todo espectacularmente magnífico. Seguiremos en contacto para más viajes.",
  },
  {
    name: "Sara González",
    quote:
      "¡Muchas gracias por todo! Estamos muy felices. Excelente servicio en todos los lugares, planeación perfecta.",
  },
  {
    name: "Nayely Zamarrón",
    quote:
      "Muy buen servicio en general, los conductores muy amables. Quedamos muy satisfechos con todo.",
  },
  {
    name: "Gaby y Gerardo",
    quote:
      "Gracias por todo, estuvo hermoso y definitivamente los vamos a recomendar con más personas.",
  },
] as const;

export const CONTACT = {
  chihuahua: {
    title: "Incentitours Chihuahua",
    address: "C. Alaska #2400, Col. Quintas del Sol, Chihuahua, Chih. México",
    phones: ["614 413 9020", "614 394 6100"],
    emails: ["info@incentitours.mx", "ventas@incentitours.mx"],
  },
  elPaso: {
    title: "Incentitours El Paso, TX",
    address: "252 Northwind Dr.",
    phones: ["(877) 844 0409"],
    emails: ["info@incentitours.mx", "ventas@incentitours.mx"],
  },
  whatsapp: "5216143946100",
  whatsappDisplay: "+52 1 614 394 6100",
} as const;
