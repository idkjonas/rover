import { writable } from "svelte/store";

const isBrowser = typeof window !== "undefined";

const storedSettings = isBrowser ? localStorage.getItem("settings") : null;
const initialSettings = storedSettings
  ? JSON.parse(storedSettings)
  : {
      general: {
        collapseAutomoderator: false,
      },
      appearance: {
        showVotingButtons: true,
        showSubredditAtTop: false,
      },
    };

export const settings = writable(initialSettings);

if (isBrowser) {
  settings.subscribe((value) => {
    localStorage.setItem("settings", JSON.stringify(value));
  });
}
