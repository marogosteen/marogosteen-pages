---
layout: "@layouts/PostDetail.astro"
title: "こっそりblogを作り直した。"
publicDate: 2023-06-25
updateDate: 2023-06-25
postSlug: "20230621-remake_my_blog"
tags:
    - "Astro"
description: "こっそりblogをHugoからAstroへ乗り換えてみた。"
draft: false
---

## remake 後の構成

この blog の構成は以下の通り。<br>[source](https://github.com/marogosteen/marogosteen-pages)
|||
|-|-|
|SSG|Astro|
|Hosting|Firebase|
|Data Lake|Google Cloud Storage|

## Hugo から Astro へ

2022の[初めての投稿](https://marogosteen-pages.web.app/posts/20221007-hello-world/)をした頃は Hugo を使って SSG していた。
Hugo は Thema を使えて Markdown で記事を書くだけでよく、手頃で良かった。ちなみに、 Thema は [PaperMod](https://adityatelange.github.io/hugo-PaperMod/) を使ってた。ちなみにちなみに Hugo だけでなく Next.js とか Astro でもできる。

PaperMod は結構人気で、バッタリ PaperMod を使った blog に出くわす。それが嫌で、 Thema を使わない SSG してみようと思い Astro を選択した。なぜ Astro なのかって？ feeling さ。

feeling は半分冗談で、もう半分はシンプルに最近の Twitter とかでちょくちょく見てて「人気なのかな？」と気になってた。

## わざわざ自分で書いたわけ

blog が欲しいなら Hatena でいいと思う。マジで。自分で書く必要はない。

ちなみに3月くらいからしてた SvelteKit の勉強も含めると最初のホストまでに２ヶ月くらいかかってる。平日は仕事してるし単純な２ヶ月ではないけども、わざわざ書く必要はない。

なのになぜ自分で書いたのか？

シンプルに何か書きたかったのが１つ。

もう１つは、バイト時代に React を使った案件の機能追加をさせていただいた際に、
全然わからなかった経験をしたから。
フロントのフレームワークは、ほとんど触ったことがなくて
「これ勉強したいな。。。」って当時感じたのを覚えてる。

僕は手を動かなさないと経験値にならないので、どうせならば勉強ついでに blog を書こうと思ったのだった。

普段しないデザインのアイデア拾いに行ったり、 Tailwindcss 使ってみたり、普段書かないTS触ったり、四苦八苦したのが楽しかった。いい経験にもなったと思う。

次は何作ろう。

## 残っていること

- pagenation

    post 数がいっぱいになる前に post 一覧に pagenation 機能を追加したい。

- search 機能

    検索機能は勉強になりそう。欲しい。

## 最後に

修正依頼や質問なら[Github Issue](https://github.com/marogosteen/marogosteen-pages/issues)か[Twitter DM](https://twitter.com/marogosteen)にご連絡ください。
