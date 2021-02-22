import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { make_site, Site } from 'src/app/models/site.model';
import { SitesService } from 'src/app/services/sites.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  site: Site | null = null;
  sites$: Observable<Site[]>;
  siteCount = 0;

  constructor(private service: SitesService) {
    this.sites$ = this.service.sites$;
  }

  ngOnInit(): void {
    this.sites$.subscribe((sites) => {
      this.siteCount = sites.length;
    });
  }

  addSite(): void {
    const site = make_site(`Unnamed site #${1 + this.siteCount}`);
    this.service.addSite(site);
    this.editSite(site);
  }
  deleteSite(site: Site): void {
    if (confirm('Are you sure?')) {
      this.service.deleteSite(site);
    }
  }
  editSite(site: Site): void {
    this.site = site;
  }
  doneEditingSite(): void {
    this.site = null;
  }
  confirmEditAndUpdateSite(site: Site): void {
    this.service.updateSite(site);
    this.doneEditingSite();
  }
  cancelEditAndDeleteSite(site: Site): void {
    this.site = null;
    this.service.deleteSite(site);
  }
}
