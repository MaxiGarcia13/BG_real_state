const phone = '+34 642 861 204';
const location = {
    name: 'Santander, Cantabria',
    url: 'https://goo.gl/maps/GTiXmuDXht2Kv53e8',
};
const keywords = [
    'Venta de vinos',
    'Vinos Argentinos Premium',
    'Vinos de Argentina Ultra Premium',
    'Vinos Tumpeter Rutini',
    'Vinos Rutini',
    'VinosHumberto Canale',
    'Vinos San Felipe',
    'Vinos Pequeña vasija',
    'Vinos Tumpeter',
    'Bodega Bianchi',
    'Vinos Bodega Bianchi',
    'Bodega San Telmo',
    'Vino Bodega San Telmo',
    'Vino Mascota',
    'Yerba Mate',
    'Yerba Mate Amanda',
    'Dulce de leche',
    'Alfajores',
    'Alfajores Havana',
    'Alfajores Jorgito',
];

const config = {
    app: {
        location,
        phone,
        name: 'VinosLM',
        icon: '/favicon.png',
        mail: 'marianolasllamas@gmail.com',
        description: `Encuentra los mejores productos argentinos en ${location.name}, tel: ${phone}, ${keywords.join(
            ', '
        )}`,
        keywords: keywords.join(', '),
    },
};

export default config;
