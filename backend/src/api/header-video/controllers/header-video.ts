import { factories } from '@strapi/strapi';
import type { Context } from 'koa';
import https from 'https';

const customController = {
  async proxy(ctx: Context) {
    const entries = await strapi.entityService.findMany('api::header-video.header-video', {
      populate: { video: true },
      sort: ['createdAt:desc'],
      limit: 1,
    }) as Array<{ video?: { url: string }[] }>;

    const videoPath = entries[0]?.video?.[0]?.url;

    if (!videoPath) {
      ctx.throw(404, 'Video not found');
      return;
    }

    const fullUrl = `${process.env.BACKEND_PUBLIC_URL || 'https://backend-production-d84f.up.railway.app'}${videoPath}`;

    ctx.req.headers['host'] = new URL(fullUrl).host;

    await new Promise<void>((resolve, reject) => {
      https.get(fullUrl, {
        headers: ctx.req.headers, // прокидаємо всі хедери
      }, (proxyRes) => {
        ctx.status = proxyRes.statusCode || 200;
        Object.entries(proxyRes.headers).forEach(([key, value]) => {
          if (value) ctx.set(key, value as string);
        });

        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.body = proxyRes;
        resolve();
      }).on('error', reject);
    });
  },
};

export default factories.createCoreController(
  'api::header-video.header-video',
  () => customController
);
