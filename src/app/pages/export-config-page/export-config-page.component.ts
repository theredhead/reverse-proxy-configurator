import { Component } from '@angular/core';
import { ApacheConfigWriter } from 'src/app/configuration-writers/apache-config-writer';
import { ConfigWriter } from 'src/app/configuration-writers/config-writer';
import { NginXCConfigWriter } from 'src/app/configuration-writers/nginx-config-writer';
import { Site } from 'src/app/models/site.model';
import { SitesService } from 'src/app/services/sites.service';

@Component({
  selector: 'app-export-config-page',
  templateUrl: './export-config-page.component.html',
  styleUrls: ['./export-config-page.component.scss'],
})
export class ExportConfigPageComponent {
  readonly output: { [key: string]: string } = {};
  readonly writers: { [key: string]: ConfigWriter } = {
    nginx: new NginXCConfigWriter(),
    apache: new ApacheConfigWriter(),
  };
  get availableConfigurations(): string[] {
    return Object.keys(this.output);
  }

  constructor(private service: SitesService) {
    this.service.sites$.subscribe((sites) => {
      // tslint:disable-next-line:forin
      for (const key in this.writers) {
        const writer = this.writers[key];
        this.output[key] = writer.writeAll(sites);
      }
    });
  }
}
