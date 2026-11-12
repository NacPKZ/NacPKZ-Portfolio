export function resolveSiteURL(env: Record<string,string | undefined>): string | null {
  const value=env.PUBLIC_SITE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://'+env.VERCEL_PROJECT_PRODUCTION_URL : env.VERCEL_URL ? 'https://'+env.VERCEL_URL : '');
  if(!value)return null;
  const url=new URL(value);
  if(url.protocol!=='https:'&&url.hostname!=='localhost'&&url.hostname!=='127.0.0.1')throw new Error('PUBLIC_SITE_URL must use HTTPS.');
  if(url.username||url.password||url.search||url.hash)throw new Error('PUBLIC_SITE_URL must be an origin and optional base path, without credentials, query or fragment.');
  return url.href.replace(/\/?$/,'/');
}
