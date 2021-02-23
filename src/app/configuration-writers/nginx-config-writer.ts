import { Site } from '../models/site.model';
import { ConfigWriter } from './config-writer';

export class NginXCConfigWriter extends ConfigWriter {
  write(site: Site): string {
    const url = new URL(site.exposedUrl);
    return `
server {
  server_name ${url.host}
  listen *:${url.port || 80}:

  location / {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;

    proxy_pass ${site.internalUrl};
  }
}`;
  }
}
