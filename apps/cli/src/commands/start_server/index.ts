/* eslint-disable no-console */
import http from 'http';
import Koa from 'koa';
import log from 'koa-logger';
import cors from '@koa/cors';
import mount from 'koa-mount';
import { PathPrefix } from '#/constants';
import { updateConfig, getConfig, Config, Mode } from '@/config';
import initialize from './initialize';
import startSchedule from './schedule';
import { getAssetApp } from './asset_app';
import { getApiApp } from './api_app';
import { getFormApp } from './form_app';
import { getPwaApp } from './pwa_app';
import { getBaseApp } from './base_app';
import i18n from './middlewares/i18n';

function printConfig() {
  const config = getConfig();
  const printConfigKeys: (keyof Config)[] = ['mode', 'port', 'data'];
  console.log('---');
  for (const key of printConfigKeys) {
    console.log(`${key}: ${config[key]}`);
  }
  console.log('---');
}

export default async ({
  mode,
  port,
  data,
}: {
  mode: Mode;
  port: number;
  data: string;
}) => {
  updateConfig({ mode, port, data });
  printConfig();

  await initialize();

  startSchedule();

  const server = new Koa();
  server.use(log());
  server.use(i18n);
  server.use(
    cors({
      maxAge: 86400,

      /**
       * 当 navigator.sendBeacon 格式是 json 时必须
       * @author mebtte<hi@mebtte.com>
       */
      credentials: true,
    }),
  );

  server.use(mount(`/${PathPrefix.ASSET}`, getAssetApp()));
  server.use(mount(`/${PathPrefix.FORM}`, getFormApp()));
  server.use(mount(`/${PathPrefix.API}`, getApiApp()));
  server.use(mount(`/${PathPrefix.BASE}`, getBaseApp()));
  server.use(mount('/', getPwaApp()));

  http.createServer(server.callback()).listen(getConfig().port);
};
