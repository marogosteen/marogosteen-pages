---
layout: "@layouts/PostDetail.astro"
title: "VSCode Dev Containers で CUDA を使った話"
publicDate: 2022-10-08
updateDate: 2022-10-08
postSlug: "20221008-use-cuda-in-devcontainer"
tags: 
    - "機械学習"
    - "Dev Containers"
description: "vscodeのdevcontainerでcudaを使った話。~ローカル環境は汚したくない~"
draft: false
---

## 背景

検証してた機械学習のリポジトリは、事前にあれこれインストールが必要だった。
でも環境を汚したくはなくって vscode の Dev Containers で用意した Ubuntu と CUDA を使った環境を構築した話。

docker はちゃんと設定をしないと CUDA は使えないのがポイント。

Dev Containers は凄く便利なので、使ってない人は是非。

## 必要なもの

- [vscode](https://azure.microsoft.com/ja-jp/products/visual-studio-code/)
- [Docker](https://www.docker.com/)
- 拡張機能 Dev Containers (ms-vscode-remote.remote-containersで検索)
- CUDA が使える環境

## nvidia-smi で動作確認

1. Containerを作る前に、ローカルの環境で `nvidia-smi` が使えることを確認する。
    ![nvidia_smi](https://storage.cloud.google.com/marogosteen-pages-storage/2022/win_nvidiasmi.png?authuser=1)
    こんな感じのが出たらOK。

## Containerを作る

1. 作業ディレクトリを開いて、リモートエクスプローラーからOpen Current Folder in Containerを選択。
    ![create_container](https://storage.cloud.google.com/marogosteen-pages-storage/2022/create_container.png?authuser=1)

    Ubuntu の次に Python(latest) を選択すると Container が作られる（ちょっと時間かかる)。

2. devcontainer.json に runArgs を追記する。

    デフォルトでは動作確認で使用した `nvidia-smi` が見つからず、 CUDA が使えないはず。Docker は GPU を使用する場合に `docker run` の引数で指定する必要がある。

    devcontainer.json で runArgs の設定を変更する。
    ![set_run_args](https://storage.cloud.google.com/marogosteen-pages-storage/2022/runargs.png?authuser=1)


3. 左下からリモートウィンドウを開いて container を rebuild。
    ![rebuild_devcontainer](https://storage.cloud.google.com/marogosteen-pages-storage/2022/rebuild.png?authuser=1)

4. nvidia-smi で再度確認。
    - nvidia-smi

    ![check_build_devcontainer](https://storage.cloud.google.com/marogosteen-pages-storage/2022/check_build_devcontainer.png?authuser=1)


## 参考
- [https://docs.docker.com/engine/reference/commandline/run/](https://docs.docker.com/engine/reference/commandline/run/)
- [https://zenn.dev/opamp/articles/7880812d78226f](https://zenn.dev/opamp/articles/7880812d78226f)
- [https://containers.dev/implementors/json_reference/](https://containers.dev/implementors/json_reference/)