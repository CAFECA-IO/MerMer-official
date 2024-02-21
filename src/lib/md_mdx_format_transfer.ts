export function changeMdToMdx(input: string): string {
  input = input.replace(/<img([^>]*)>/g, "<img$1/>");
  // input = input.replace(/(^|\s)-\s/gm, '$1{-} ');
  return input
}

export function changeMdxToMd(input: string): string {
  input = input.replace(/<img([^>]*)\/>/g, "<img$1>");
  // input = input.replace(/(^|\s)\{-\}\s/gm, '$1- ');
  return input
}
