import { make_site, Site } from '../models/site.model';
import { LocalStorageRepository, RepositoryAction } from './repository';

export class SiteRepository extends LocalStorageRepository<Site> {
  localStorageKey = 'sites';
}

export class SiteCreate extends RepositoryAction<Site> {
  type = '[Create Site]';

  run(data: Site[]): Site[] {
    return [...data, this.payload];
  }
}

export class SiteDelete extends RepositoryAction<Site> {
  type = '[Delete Site]';

  run(data: Site[]): Site[] {
    data.splice(data.indexOf(this.payload), 1);
    return data;
  }
}

export class SiteUpdate extends RepositoryAction<Site> {
  type = '[Update Site]';
  payload!: { old: Site; new: Site };

  run(data: Site[]): Site[] {
    data[data.indexOf(this.payload.old)] = this.payload.new;
    return [...data];
  }
}
// const SiteAction = SiteCreate | SiteDelete
