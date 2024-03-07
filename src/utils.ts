export function isURLValid(url: string): boolean {
  const urlPattern: RegExp = /^(ftp|http|https):\/\/[^ "]+$/;

  return urlPattern.test(url);
}