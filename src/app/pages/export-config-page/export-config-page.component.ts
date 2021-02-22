import { Component, OnInit } from '@angular/core';
import { Site } from 'src/app/models/site.model';
import { SitesService } from 'src/app/services/sites.service';

@Component({
  selector: 'app-export-config-page',
  templateUrl: './export-config-page.component.html',
  styleUrls: ['./export-config-page.component.scss'],
})
export class ExportConfigPageComponent implements OnInit {
  output = 'Please wait...';

  constructor(private service: SitesService) {
    this.service.sites$.subscribe((sites) => {
      this.output = this.generateOutput(sites);
    });
  }
  generateHostConfig(site: Site): string {
    try {
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
    } catch (error) {
      return `# Error in ${site.name}: ${error}`;
    }
  }
  generateOutput(sites: Site[]): string {
    const servers = sites
      .map((site) => this.generateHostConfig(site))
      .join('\n');
    return servers;
  }
  ngOnInit(): void {}
}
