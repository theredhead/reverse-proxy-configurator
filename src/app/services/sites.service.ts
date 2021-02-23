import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Site } from '../models/site.model';
import {
  SiteRepository,
  SiteCreate,
  SiteDelete,
  SiteUpdate,
} from '../repositories/site.repository';

@Injectable({
  providedIn: 'root',
})
export class SitesService {
  readonly sites$: Observable<Site[]>;
  private repository = new SiteRepository();

  addSite(site: Site): void {
    this.repository.performAction(new SiteCreate(site));
  }
  deleteSite(site: Site): void {
    this.repository.performAction(new SiteDelete(site));
  }
  updateSite(payload: { old: Site; new: Site }): void {
    this.repository.performAction(new SiteUpdate(payload));
  }

  constructor() {
    this.sites$ = this.repository.entities$.asObservable();
  }
}
