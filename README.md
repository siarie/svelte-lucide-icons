# svelte-lucide-icons

Svelte Package for [Lucide Icons][lucide-icons]

[lucide-icons]: https://github.com/lucide-icons/lucide

# Installation

``` bash
$ npm install svelte-lucide-icons # or using yarn
```

# Usage

```html
<script>
  import { Activity, Camera } from 'svelte-lucide-icons'
  // or
  import Bookmark from 'svelte-lucide-icons/icons/Bookmark.svelte'
</script>

<Activity fill="#ff00ff" />
<Camera size={48}/>
<Bookmark stroke="#ff0000"/>
```