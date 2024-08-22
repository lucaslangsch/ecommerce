export function getCookie(name: string): string | null {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)` // eslint-disable-line
  ));
  return matches ? decodeURIComponent(matches[1]) : null;
}

export default getCookie;
