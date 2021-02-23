import { Site } from '../models/site.model';

export abstract class ConfigWriter {
  abstract write(site: Site): string;

  writeAll(sites: Site[]): string {
    const tryWrite = (site: Site) => {
      try {
        return this.write(site);
      } catch (error) {
        return `# Error in ${site.name}: ${error}`;
      }
    };

    return sites.map((site) => tryWrite(site)).join('\n');
  }
}
