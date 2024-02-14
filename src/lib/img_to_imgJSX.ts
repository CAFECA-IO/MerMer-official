export function changeImgTagsToSelfClosing(input: string): string {
  return input.replace(/<img([^>]*)>/g, "<img$1/>");
}

export function changeSelfClosingImgTagsToNormal(input: string): string {
  return input.replace(/<img([^>]*)\/>/g, "<img$1>");
}
