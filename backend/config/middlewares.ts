export default [
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  {
    name: 'strapi::cors',
    // config: {
    //   origin: ['*'],
    //   headers: '*',
    // },
    config: {
      origin: ['http://localhost:5173'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      headers: ['Content-Type', 'Authorization'],
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
