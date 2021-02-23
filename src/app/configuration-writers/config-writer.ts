import { Site } from '../models/site.model';

export abstract class ConfigWriter {
  abstract write(site: Site): string;

  wrapOne(config: string): string {
    return config;
  }
  wrapAll(config: string): string {
    return config;
  }

  writeAll(sites: Site[]): string {
    const tryWrite = (site: Site) => {
      try {
        return this.wrapOne(this.write(site));
      } catch (error) {
        return `# Error in ${site.name}: ${error}`;
      }
    };

    return this.wrapAll(sites.map((site) => tryWrite(site)).join('\n'));
  }
}
