<script>
  import NavigationView from "$lib/views/NavigationView.svelte";
  import ListView from "$lib/list/ListView.svelte";
  import ListItem from "$lib/list/ListItem.svelte";
  import { settings } from "$lib/settings.js";
  import { get } from "svelte/store";
  import { ChevronRight, Coffee } from "lucide-svelte";

  let currentSettings = get(settings);

  function camelCaseToWords(string) {
    const result = string.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  function getSettingsList(obj, prefix = "") {
    return Object.entries(obj).flatMap(([key, value]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "object" && !Array.isArray(value)) {
        return getSettingsList(value, fullKey);
      }
      return { key: fullKey, value };
    });
  }

  let settingsList = getSettingsList(currentSettings);

  settings.subscribe((newSettings) => {
    currentSettings = newSettings;
    settingsList = getSettingsList(currentSettings);
  });

  function updateSetting(key, value) {
    const keys = key.split(".");
    let updatedSettings = { ...currentSettings };
    let target = updatedSettings;

    for (let i = 0; i < keys.length - 1; i++) {
      target = target[keys[i]];
    }
    target[keys[keys.length - 1]] = value;

    settings.set(updatedSettings);
  }

  function getGroups(settingsList) {
    const groups = {};
    settingsList.forEach(({ key, value }) => {
      const [group] = key.split(".");
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push({ key, value });
    });
    return groups;
  }

  let groupedSettings = getGroups(settingsList);

  settings.subscribe((newSettings) => {
    currentSettings = newSettings;
    settingsList = getSettingsList(currentSettings);
    groupedSettings = getGroups(settingsList);
  });
</script>

<NavigationView>
  <section class="grid p-4 grid-cols gap-y-4">
    <h1 class="text-3xl font-medium">Settings</h1>

    <ListView>
      <ListItem
        class="justify-between"
        href="https://buymeacoffee.com/jnsdotgg"
      >
        <div class="flex items-center gap-2">
          <Coffee></Coffee>
          Buy Me a Coffee
        </div>
        <ChevronRight class="text-[var(--gray-2)]" />
      </ListItem>
      <ListItem
        class="justify-between"
        href="https://github.com/jnsdotgg/rover"
      >
        View on GitHub
        <ChevronRight class="text-[var(--gray-2)]" />
      </ListItem>
    </ListView>
    {#each Object.entries(groupedSettings) as [group, settings]}
      <ListView title={group.charAt(0).toUpperCase() + group.slice(1)}>
        {#each settings as { key, value }}
          <label>
            <ListItem class="justify-between" interactable>
              {camelCaseToWords(key.split(".")[1])}
              <input
                type="checkbox"
                checked={value}
                switch
                on:change={(e) => updateSetting(key, e.target.checked)}
              />
            </ListItem>
          </label>
        {/each}
      </ListView>
    {/each}
  </section>
</NavigationView>
