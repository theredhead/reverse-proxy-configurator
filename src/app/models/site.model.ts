export interface Site {
  name: string;
  description: string;
  internalUrl: string;
  exposedUrl: string;

  redirectEnabled: boolean;
  redirectTarget: string;
}

export function make_site(
  name: string,
  exposedUrl: string = 'http://',
  internalUrl: string = 'http://',
  redirectEnabled: boolean = false,
  redirectTarget: string = '/index.html'
): Site {
  return {
    name,
    description: '',
    internalUrl,
    exposedUrl,
    redirectEnabled,
    redirectTarget,
  };
}
