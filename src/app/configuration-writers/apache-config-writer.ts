import { Site } from '../models/site.model';
import { ConfigWriter } from './config-writer';

export class ApacheConfigWriter extends ConfigWriter {
  write(site: Site): string {
    const url = new URL(site.exposedUrl);
    const redirect = !site.redirectEnabled
      ? ''
      : `
  RewriteEngine on
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.+)$ ${site.redirectTarget} [L,QSA]
`;
    return `
<VirtualHost *:${url.port || 80}>
  ServerName ${url.host}
${redirect}
  ProxyPreserveHost On
  ProxyPass / ${site.internalUrl}
  ProxyPassReverse / ${site.internalUrl}
</VirtualHost>`;
  }
}
