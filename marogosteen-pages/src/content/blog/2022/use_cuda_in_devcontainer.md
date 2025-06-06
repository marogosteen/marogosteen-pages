---
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

## Contents

## 背景

検証していたとある機械学習のリポジトリには、事前にあれこれインストールが必要だった。
でも環境を汚したくはなくって vscode の Dev Containers で用意した Ubuntu と CUDA を使った環境を構築したって話。

docker はちゃんと設定をしないと CUDA は使えないのがポイント。

Dev Containers は凄く便利なので、使ってない人は是非使ってみてほしい。

## TL;DR

以下のように `devcontainer.json` の `runArgs` を設定してやる。

```json
{
    "name": "Ubuntu",
    "image": "mcr.microsoft.com/devcontainers/base:jammy",
    "runArgs": [
        "--gpus",
        "all",
    ]
}
```

## 必要なもの

- [vscode](https://azure.microsoft.com/ja-jp/products/visual-studio-code/)
- [Docker](https://www.docker.com/)
- 拡張機能 Dev Containers (ms-vscode-remote.remote-containersで検索)
- CUDA が使える環境

## nvidia-smi で動作確認

1. Containerを作る前に、ローカルのターミナルで `nvidia-smi` が使えることを確認する。

## Containerを作る

1. 作業ディレクトリを開いて、リモートエクスプローラーからOpen Current Folder in Containerを選択。
    ![create_container](https://bucket.marogosteen.dev/2022/create_container.png)

    Ubuntu の次に Python(latest) を選択すると Container が作られる（ちょっと時間かかる)。

2. devcontainer.json に runArgs を追記する。

    デフォルトでは動作確認で使用した `nvidia-smi` が見つからず、 CUDA が使えないはず。Docker は GPU を使用する場合に `docker run` の引数で指定する必要がある。

    devcontainer.json で runArgs の設定を変更する。

    ```json
    {
        "name": "Ubuntu",
        "image": "mcr.microsoft.com/devcontainers/base:jammy",
        "runArgs": [
            "--gpus",
            "all",
        ]
    }
    ```


3. 左下からリモートウィンドウを開いて container を rebuild。
    ![rebuild_devcontainer](https://bucket.marogosteen.dev/2022/rebuild.png)

4. nvidia-smi で再度確認。
    - nvidia-smi

    ![check_build_devcontainer](https://bucket.marogosteen.dev/2022/check_build_devcontainer.png)


## 参考
- [https://docs.docker.com/engine/reference/commandline/run/](https://docs.docker.com/engine/reference/commandline/run/)
- [https://zenn.dev/opamp/articles/7880812d78226f](https://zenn.dev/opamp/articles/7880812d78226f)
- [https://containers.dev/implementors/json_reference/](https://containers.dev/implementors/json_reference/)