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

    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Content-Type', 'video/mp4');

    ctx.body = new Promise((resolve) => {
      https.get(fullUrl, (stream) => {
        resolve(stream);
      });
    });
  },
};

export default factories.createCoreController(
  'api::header-video.header-video',
  () => customController
);
