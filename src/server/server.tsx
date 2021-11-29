import { IInGameData, SummonerDataType, ISummonerDTO, IWinRateData, IInitData } from '../types';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { StaticRouter } from 'react-router-dom/server';
import App from '../client/App';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { resolveAsyncsInParallel } from '../common/utils/api';
import { replacer } from '../common/utils/index';
import SUMMONER_API from '../common/api/summoner';

const app = express();

const html = fs.readFileSync(path.resolve(__dirname, '../../public/index.html'), 'utf8');

const DEFAULT_SUMMONER = 'hide on bush';

const DEFAULT_LANG = 'ko';

app.use('/dist', express.static('dist'));
app.use('/public', express.static('public'));

app.get('*', async (req, res) => {
  const sheet = new ServerStyleSheet();
  const routers = req.url.split('/');

  if (routers.filter((route) => route !== '').length !== 1) {
    res.redirect(`/${DEFAULT_SUMMONER}`);
    return;
  }

  const summonerName = routers.pop() as string;

  const [summonerData, winRateData, inGameData] = (await resolveAsyncsInParallel(
    async () => await SUMMONER_API.getSummaryInfo(summonerName, DEFAULT_LANG),
    async () => await SUMMONER_API.getWinRateData(summonerName, DEFAULT_LANG),
    async () => await SUMMONER_API.getInGameData(summonerName, DEFAULT_LANG)
  )) as [ISummonerDTO, IWinRateData, Map<string, IInGameData>];

  const summonerDataForString = {
    summonerData,
    winRateData,
    inGameData: JSON.stringify(inGameData, replacer),
  };

  const summonerDataRevised = {
    summonerData,
    winRateData,
    inGameData,
  };

  const renderString = renderToString(
    sheet.collectStyles(
      <StaticRouter location={`/${summonerName}`}>
        <App initData={summonerDataRevised as IInitData} />
      </StaticRouter>
    )
  );
  const styles = sheet.getStyleTags();

  const result = html
    .replace('<div id="root"></div>', `<div id="root">${renderString}</div>`)
    .replace('__DATA_FROM_SERVER__', JSON.stringify(summonerDataForString))
    .replace('<div id="serverStyle"></div>', styles);

  res.send(result);
});
app.listen(3000, () => console.log('서버 오픈!'));
