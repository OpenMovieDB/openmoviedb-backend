import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger as NestLogger } from '@nestjs/common';

export const statusAppMessage = async (app: NestFastifyApplication) => {
  const { NODE_ENV } = process.env;

  const logger = new NestLogger('Main');

  const appUrl = await app.getUrl();

  logger.log(`

░▒█▀▀▀█░▒█▀▀█░▒█▀▀▀░▒█▄░▒█░░░▒█▀▄▀█░▒█▀▀▀█░▒█░░▒█░▀█▀░▒█▀▀▀░░░▒█▀▀▄░▒█▀▀▄
░▒█░░▒█░▒█▄▄█░▒█▀▀▀░▒█▒█▒█░░░▒█▒█▒█░▒█░░▒█░░▒█▒█░░▒█░░▒█▀▀▀░░░▒█░▒█░▒█▀▀▄
░▒█▄▄▄█░▒█░░░░▒█▄▄▄░▒█░░▀█░░░▒█░░▒█░▒█▄▄▄█░░░▀▄▀░░▄█▄░▒█▄▄▄░░░▒█▄▄█░▒█▄▄█



🚀 API app is running on: ${appUrl}
🌚 ENV: ${NODE_ENV}
`);
};
