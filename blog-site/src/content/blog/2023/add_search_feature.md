---
layout: "@layouts/PostDetail.astro"
title: "Astro+Svelteで検索機能追加した。"
publicDate: 2023-06-26
updateDate: 2023-06-26
postSlug: "20230621-add_search_feature"
tags:
    - "Astro"
    - "Svelte"
description: "このブログのpost検索機能としてAstro+Svelteで実装したみた。"
draft: false
---

前回のやり残しに書いたPostの検索機能をSvelteで実装した。

前回でも触れたように、 Astro は Astro アイランドっていうアイランドアーキテクチャを採用してる。
基本は普通の HTML と CSS を提供して JS は渡さないので早いのが売りの Astro 。

それぞれのアイランドコンポーネントは別の話なので、検索コンポーネント内にSvelteを使用して、動的な post 検索機能 を実装してみた。

とりあえず svelte を入れる。[ここ](https://docs.astro.build/ja/guides/integrations-guide/svelte/)参考にした。

```
npx astro add svelte
```

色々聞かれるけど、 all yes で。


