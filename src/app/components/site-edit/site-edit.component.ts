import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { make_site, Site } from 'src/app/models/site.model';

@Component({
  selector: 'app-site-edit',
  templateUrl: './site-edit.component.html',
  styleUrls: ['./site-edit.component.scss'],
})
export class SiteEditComponent {
  original!: Site;
  editing!: Site;

  @Input() set site(site: Site) {
    this.original = site;
    this.editing = JSON.parse(JSON.stringify(site));
  }

  @Output() save = new EventEmitter<SiteSaveEventArg>();
  @Output() delete = new EventEmitter<Site>();
  @Output() cancel = new EventEmitter<void>();

  siteCount = 0;

  constructor() {
    this.site = make_site('Unnamed site');
  }

  saveClick(): void {
    this.save.emit({
      original: this.original,
      changed: this.editing,
    });
  }
  cancelClick(): void {
    this.cancel.emit();
  }

  deleteClick(): void {
    this.delete.emit(this.original);
  }
}

export interface SiteSaveEventArg {
  original: Site;
  changed: Site;
}
