const customRouter = () => ({
    type: 'content-api',
    routes: [
      {
        method: 'GET',
        path: '/header-video/proxy',
        handler: 'api::header-video.header-video.proxy',
        config: {
          auth: false,
        },
      },
    ],
  });
  
  export default customRouter;