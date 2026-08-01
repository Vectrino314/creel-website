/** Client-safe content — no ImageMetadata imports (keeps originals out of the JS bundle). */

export const NAV_LINKS = [
  { label: "Experiencias", href: "/#experiencias" },
  { label: "Destinos", href: "/destinos" },
  { label: "Paquetes", href: "/paquetes" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
] as const;

export const HOME_OPTIONS = [
  {
    id: "classic",
    label: "Clásica",
    href: "/",
    description: "Slideshow actual de Barrancas, Chepe y cultura.",
    tag: "Producción",
    preview: "/og/destinos/divisadero.jpg",
    previewAlt: "Vista de las Barrancas del Cobre",
  },
  {
    id: "barrancas-depth",
    label: "Barrancas Depth",
    href: "/demo/barrancas",
    description: "Texto detrás del paisaje con zoom al hacer scroll.",
    tag: "Demo",
    preview: "/og/paquetes/barrancas-express.jpg",
    previewAlt: "Tren Chepe Express en las Barrancas del Cobre",
  },
  {
    id: "sierra-rise",
    label: "Sierra Rise",
    href: "/demo/sierra-rise",
    description: "Glass nav, galerías con momentum y microinteracciones.",
    tag: "Demo",
    preview: "/og/destinos/creel.jpg",
    previewAlt: "Paisaje de Creel en la Sierra Tarahumara",
  },
  {
    id: "copper-grove",
    label: "Copper Grove",
    href: "/demo/copper-grove",
    description: "Pilules, serif cálido y microinteracciones tipo boutique travel.",
    tag: "Demo",
    preview: "/og/paquetes/barrancas-express.jpg",
    previewAlt: "Barrancas del Cobre al amanecer",
  },
] as const;

export const SERVICES = [
  {
    title: "Chepe Express",
    detail:
      "Reservaciones y compra de boletos en el tren más espectacular de México.",
  },
  {
    title: "Tours",
    detail:
      "Recorridos culturales y de naturaleza por la Sierra Tarahumara y sus alrededores.",
  },
  {
    title: "Experiencias gastronómicas",
    detail:
      "Sabores de la sierra, cocina regional y encuentros en torno a la mesa.",
  },
  {
    title: "Viajes de incentivo",
    detail:
      "Programas a la medida para empresas que buscan motivar y recompensar.",
  },
  {
    title: "Guías certificados",
    detail: "Atención especializada a turismo nacional y extranjero.",
  },
  {
    title: "Experiencias culturales",
    detail: "Encuentros con las culturas rarámuri, menonita y mestiza.",
  },
  {
    title: "Congresos y convenciones",
    detail: "Planeación integral de reuniones, incentivos y convenciones.",
  },
  {
    title: "Logística para eventos",
    detail:
      "Coordinación de punta a punta para que tu evento fluya sin fricciones.",
  },
  {
    title: "Renta de autobuses y vans",
    detail: "Flota para grupos, traslados regionales y operación de circuitos.",
  },
  {
    title: "Traslados",
    detail:
      "Aeropuerto, hotel y estación — puntualidad y comodidad en cada tramo.",
  },
] as const;

export const HOTEL = {
  title: "The Lodge at Creel Hotel & Spa",
  detail:
    "Nuestro hotel propio en el corazón de Creel: base ideal para explorar las Barrancas del Cobre.",
  href: "https://thelodgeatcreel.com/",
} as const;

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

/** Text-only package cards for the home page listing. */
export const PACKAGE_LIST = [
  {
    slug: "barrancas-express",
    name: "Barrancas Express",
    duration: "3 días · 2 noches",
    departures: "Lunes y sábados",
    summary:
      "Inmersión rápida en la Sierra Tarahumara: vistas de la Barranca, Creel y adrenalina en el Parque Aventura.",
  },
  {
    slug: "entre-dos-pueblos-magicos",
    name: "Entre dos Pueblos Mágicos",
    duration: "4 días · 3 noches",
    departures: "Domingos y viernes",
    summary:
      "Creel y El Fuerte unidos por el Chepe Express. Cañones, artesanía rarámuri y el sabor de Sinaloa.",
  },
  {
    slug: "altura-y-aventura",
    name: "Altura y Aventura",
    duration: "5 días · 4 noches",
    departures: "Domingos, jueves y martes",
    summary:
      "De 90 a 2,300 m de altitud a bordo del Chepe. Biodiversidad, clima y cultura rarámuri en un solo viaje.",
  },
  {
    slug: "cultural",
    name: "Cultural",
    duration: "5 días · 4 noches",
    departures: "Jueves, sábado o lunes",
    summary:
      "Menonitas, Sierra Tarahumara, Parque Aventura y tren hasta El Fuerte. Cultura de principio a fin.",
  },
  {
    slug: "espectacular",
    name: "Espectacular",
    duration: "6 días · 5 noches",
    departures: "Martes, jueves y sábados",
    summary:
      "La experiencia completa: tren, barrancas, exploración y espíritu de aventura en la Sierra.",
  },
  {
    slug: "maravillosa",
    name: "Maravillosa",
    duration: "7 días · 6 noches",
    departures: "Martes, jueves y sábado",
    summary:
      "Ritmo pausado: Chihuahua, Creel, dos noches en barrancas, Chepe Express y El Fuerte.",
  },
] as const;
