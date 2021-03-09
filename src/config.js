const phone = '+34 642 861 204';
const location = {
    name: 'Santander, Cantabria',
    url: 'https://goo.gl/maps/GTiXmuDXht2Kv53e8',
};
const keywords = [
    'bienes raices ',
    'venden casas',
    'propiedades rapido',
    'apartamentos en renta',
    'casas en venta',
    'condominios en venta',
    'terrenos en venta',
    'agentes inmobiliarios',
];

const config = {
    app: {
        location,
        phone,
        name: 'BG real estate',
        icon: '/favicon.png',
        mail: 'marianolasllamas@gmail.com',
        description: `BG real estate es una plataforma de bienes raices donde se venden casas y propiedades rapido y al mejor precio. Nuestros listados son apartamentos en renta, casas en venta, condominios en venta, terrenos en venta. Ademas contamos con los mejores agentes inmobiliarios quien le ayudarà en todo el proceso.`,
        keywords: keywords.join(', '),
    },
};

export default config;
