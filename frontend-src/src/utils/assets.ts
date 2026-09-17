export function getAssetUrl(file: string): string {
  const config = (window as any).DGB_CONFIG;
  if (config && config.assetsUrl) {
    const base = config.assetsUrl.replace(/\/+$/, '');
    const path = file.replace(/^\/+/, '');
    return base + '/' + path;
  }
  return file.startsWith('/') ? file : '/' + file;
}
