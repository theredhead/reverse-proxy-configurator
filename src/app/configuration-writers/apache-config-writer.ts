import { Site } from '../models/site.model';
import { ConfigWriter } from './config-writer';

export class ApacheConfigWriter extends ConfigWriter {
  write(site: Site): string {
    const url = new URL(site.exposedUrl);
    return `
      <VirtualHost *:${url.port || 80}>
        ServerName ${url.host}

        ProxyPreserveHost On

        ProxtPass / ${site.internalUrl}
        ProxtPassReverse / ${site.internalUrl}
      </VirtualHost>`;
  }
}
