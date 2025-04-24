export default ({ env }) => {
  console.log('🧪 APP_KEYS:', env('APP_KEYS'));
  console.log('RAILWAY ENV VARS:', process.env);

  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
      keys: env('APP_KEYS')?.split(',') || ['defaultKey1', 'defaultKey2'],
    },
  };
};
