/** Returns true when a CMS/data string is an explicit {{TODO: ...}} placeholder. */
export function isContentPlaceholder(value: string | null | undefined): boolean {
  return typeof value === "string" && value.includes("{{TODO:");
}

/** Social / external URLs that are safe to render as links. */
export function isValidExternalUrl(value: string): boolean {
  if (isContentPlaceholder(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function hasPublishedBlogPosts(
  posts: ReadonlyArray<{ draft?: boolean; title: string }>,
): boolean {
  return posts.some((post) => !post.draft && !isContentPlaceholder(post.title));
}

export function hasRealTestimonials(
  items: ReadonlyArray<{ quote: string; name: string }>,
): boolean {
  return items.some(
    (item) => !isContentPlaceholder(item.quote) && !isContentPlaceholder(item.name),
  );
}
