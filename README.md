# svelte-lucide-icons

[![npm version](https://badge.fury.io/js/svelte-lucide-icons.svg)](https://badge.fury.io/js/svelte-lucide-icons)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/siarie/svelte-lucide-icons/Publish%20Package)

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