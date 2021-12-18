import { Site } from '../models/site.model';
import { ConfigWriter } from './config-writer';

export class NginXCConfigWriter extends ConfigWriter {
  // FROM nginx
  // COPY _my_configuration_file_.conf /etc/nginx/conf.d/default.conf

  fileHeader = '';
  fileFooter = '';

  wrapAll(config: string): string {
    return [this.fileHeader, config, this.fileFooter].join('\n');
  }

  write(site: Site): string {
    const url = new URL(site.exposedUrl);

    const redirect = !site.redirectEnabled
      ? ''
      : `
      rewrite (.*) ${site.redirectTarget} last;`;

    return `
  server {
    server_name ${url.host};
    listen *:${url.port || 80};

    location / {
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;

      proxy_pass ${site.internalUrl}; ${redirect}
    }
  }`;
  }
}
