---
title: "Astro + Svelteで検索機能追加した。"
publicDate: 2023-06-27
updateDate: 2023-06-27
postSlug: "20230621-add_search_feature"
tags:
    - "Astro"
    - "Svelte"
description: "このブログのpost検索機能としてAstro+Svelteで実装したみた。"
draft: false
---

[前回](https://marogosteen-pages.web.app/posts/20230621-remake_my_blog/)のやり残しに書いた Post の検索機能を Svelte で実装した。

先に Astro blog 戦記について書けやって声が聞こえますが、自分的にとってリアルタイムな話なので、先にこっちを。。。

## Astro はフロントエンドUI component を扱える

前回でも触れたように、 Astro は Astro アイランドっていうアイランドアーキテクチャを採用してる。
基本は普通の HTML と CSS を提供して JS は渡さないので早いのが売りの Astro 。ドキュメント（2023/06/27時点）の本文から抜粋すると
"*Astroは、デフォルトでクライアントサイドのJavaScriptを一切使用せずにすべてのウェブサイトを生成します。*"って示されてる。

それぞれのアイランドコンポーネントは別の話で、検索 component 内にSvelteを使用して、動的な post 検索機能 を実装してみた。

## なぜ検索機能にSvelteを使ったの？

検索したらページ遷移せず（リンクが変わらない）、検索結果を表示してみたかった。
 React や Vue もありだけど、4月頃に勉強してたので Svelte をチョイス。

## やってみよー

blog の記事（post）を検索して、記事のタイトル一覧を表示してみる。

- ### install svelte

    とりあえず svelte を入れる。[ここ](https://docs.astro.build/ja/guides/integrations-guide/svelte/)参考にした。

    ```shell
    npx astro add svelte
    ```

    色々聞かれるけど、 all yes で。すると、`astro.config.mjs`が以下のように良い感じにしてくれる。

    ```js
    import { defineConfig } from 'astro/config';
    import svelte from '@astrojs/svelte';    //<- NEW!

    export default defineConfig({
        // ...
        integrations: [svelte()],    //<- NEW!
    });
    ```

    それだけ！

- ### 検索 component (Svelte)

    先に検索用の component を作って、以下の内容を書く。 Typescript 使う人は`<script lang="ts">`を忘れないように。

    ```svelte
    <script lang="ts">
        import type { CollectionEntry } from "astro:content";

        let query = "";
        // 親コンポーネントからプロパティを受けとる。 exportが必要。
        export let allPosts: CollectionEntry<"blog">[];
        let searchResult: CollectionEntry<"blog">[] = [];

        // text boxがchangeしたら検索する
        const searchHandler = () => {
            let lq = query.toLowerCase();
            searchResult = allPosts.filter((post) => {
                return (
                    post.data.title.toLowerCase().includes(lq) ||
                    post.data.description.toLowerCase().includes(lq) ||
                    post.body.toLowerCase().includes(lq)
                );
            });
        };
    </script>

    <div>
        <label for="search-box">Search: </label>

        <input
            id="search-box"
            type="text"
            on:change={searchHandler}
            bind:value={query}
        />

        <ui>
            // 検索結果の記事タイトル一覧表示
            {#each searchResult as post }
                <p>{post.data.title}</p>
            {/each}
        </ui>
    </div>
    ```

    今思うと全記事を親 component から受ける必要はないと思うけど、 `export` で全記事をプロパティとして受け取る。
    で、検索した結果である `searchResult` を each block で一覧を表示してるだけ。
    それぞれの `post` の型は `CollectionEntry<"blog">`。

- ### 親 component (Astro)

    Astro は Pages ディレクトリがそのままルーティングされるので、任意の場所に`search.astro`を作る。

    で、さっきの検索 component を用意。以上。

    ```astro
    ---
    import Layout from "@layouts/Base.astro";
    import SearchPost from "@components/SearchPost.svelte";
    import { getCollection } from "astro:content";

    const posts = await getCollection("blog", ({ data }) => !data.draft);
    ---

    <Layout>
        <SearchPost allPosts={posts} client:load/>
    </Layout>
    ```

layoutは適当に作って、 `@components` とかは `tsconfig.json` にこんな感じで書いとく。

- ### layout

    ```json
    {
        "extends": "astro/tsconfigs/strict",
        "compilerOptions": {
            "baseUrl": "src",
            "jsx": "react-jsx",
            "paths": {
            "@components/*": [
                "components/*"
            ],
            "@layouts/*": [
                "layouts/*"
            ],
            }
        }
    }
    ```

おわりだよ。
