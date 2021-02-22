export interface Site {
  name: string;
  description: string;
  internalUrl: string;
  exposedUrl: string;
}

export function make_site(
  name: string,
  exposedUrl: string = 'http://',
  internalUrl: string = 'http://'
): Site {
  return {
    name,
    description: '',
    internalUrl,
    exposedUrl,
  };
}
