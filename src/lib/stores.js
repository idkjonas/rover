import { writable } from "svelte/store";

// export const openedPost = writable(undefined);
export const hasScrolledToBottom = writable(false);
export const cachedNavigation = writable([]);
