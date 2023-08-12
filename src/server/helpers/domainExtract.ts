export function url_domain(link: string) {
  const domain = new URL(link);
  const domainAlt = domain.hostname.replace('www.', '');
  return domainAlt;
};