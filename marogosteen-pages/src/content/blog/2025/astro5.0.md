---
title: "Astro 5 対応したら layout フィールドがサポートされなくなってた"
publicDate: 2025-05-04
updateDate: 2025-05-04
postSlug: "202505-astro5"
tags:
    - "Astro"
description: "Astro 5 対応したら layout フィールドがサポートされなくなってた"
draft: false
---

Marogosteen Pages は Astro を利用してて、この Astro は 2024 年 12 月に v5.0 がリリースされた。

[Astro 5.0 (Blog)](https://astro.build/blog/astro-5/)

このリリースでは大規模な変更がされていて調べたらいくつかの記事が出てくるんだけど、苦戦したって内容のものが見られた。

ここでも Astro 5.0 に対応したので、ついでに他の記事ではあまり書かれてなくて、個人的に影響があった内容を紹介する。
Astro による v5.0 への Upgrade guides はこちら。

[Upgrade to Astro v5](https://docs.astro.build/ja/guides/upgrade-to/v5/)

## Contents

## Markdown コレクションエントリにて、layout フィールドがサポートされなくなった

以下は、Astro 5.0 の Upgrade guides の [Legacy: v2.0 Content Collections API](https://docs.astro.build/en/guides/upgrade-to/v5/#legacy-v20-content-collections-api) から抜粋したもの。

> The special layout field is not supported in Markdown collection entries. This property is intended only for standalone page files located in src/pages/ and not likely to be in your collection entries. However, if you were using this property, you must now create dynamic routes that include your page styling.

以前は、以下の例のように content 配下に配置される markdown ファイルで、front matter に layout フィールドがあった。これは、定義済みの layout を指定し内容に応じた css スタイルをファイルごとに指定することができた。

```markdown
---
layout: ../../layouts/BlogPostLayout.astro
title: Astroの概要
author: Himanshu
description: Astroの凄さを知って！
---

```

抜粋内容から、この layout フィールドがサポートされなくなったみたい。また、まだ対応する準備ができていない場合は、legacy.collections フラグで以前と同じように layout フィールドを機能し続けさせることができるっぽい。

## どう対応したのか

幸いにもファイル毎に layout を変えていなかったので、レイアウトに定義していた style 内容をポスト用のコンポーネントに移すくらいで済んで、あまり困らなかった。

さっき触れたように、まだ対応する準備ができていない人は以下のように `astro.config.mjs` で legacy.collections フラグを有効にすることで一旦回避できるので、
[Legacy flags](https://docs.astro.build/en/reference/legacy-flags/) ここを参照してみてほしい。

```
import { defineConfig } from 'astro/config';
export default defineConfig({
  legacy: {
    collections: true
  }
});
```

## おまけ
2024 年は一切ポストしなかったな。。。
