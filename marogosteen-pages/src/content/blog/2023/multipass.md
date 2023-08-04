---
layout: "@layouts/PostDetail.astro"
title: 'Docker Desktop の代替案としてMultipass デビューする、そんなあなたへ捧げる手順書。'
publicDate: 2023-07-27
updateDate: 2023-07-27
postSlug: '20230727-multipass'
tags: 
    - 'Docker'
    - 'Multipass'
description: '2022年1月31日より Docker Desktop は有料化した。そんなこんなで、これは Docker に関わらず、 Multipass デビューするあなたへ捧げる手順書としてここに残す。'
draft: false
---

## 背景

2022年1月31日より Docker Desktop は有料化した。有料化には条件があり個人では大丈夫のはずだけど、責任持ちません。
そんなこんなで、これは Docker に関わらず、 Multipass デビューするあなたへ捧げる手順書としてここに残す。

## 先に本題 （ Multipass 導入。細かい話はこの章以降。 ）

- brew でインストール

``` sh
# install multipass
brew install --cask multipass
```

- インストール後

launch でインスタンス作成し、 shell でシェルプロンプトを開き、 exit で抜けて、 stop で止めるって感じ。

``` sh
# 利用可能イメージの出力
multipass find
# docker image テンプレインスタンスを作成・起動
multipass launch --name <インスタンス名> docker
# 停止したインスタンスの起動（ launch直後はstartされている。 ）
multipass start <インスタンス名>
# attach
multipass shell foo
# インスタンスの停止
multipass stop <インスタンス名>
```

docker image は Ubuntu 22.04 LTS だった。おそらく最新の Ubuntu LTS になるんだと思う。
launch で docker image を指定しない、つまり普通の multipass の Ubuntu インスタンスには初期状態の場合は、 docker が用意してくれないので注意。

ちなみに git は docker image の指定に関わらず、デフォで使える。

``` sh
ubuntu@foo:~$ cat /etc/os-release

PRETTY_NAME="Ubuntu 22.04.2 LTS"
NAME="Ubuntu"
VERSION_ID="22.04"
VERSION="22.04.2 LTS (Jammy Jellyfish)"
VERSION_CODENAME=jammy
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
UBUNTU_CODENAME=jammy
```

detach は以下のように`exit`で。

``` sh
ubuntu@foo:~$ exit
```

detach してもインスタンスは起動してるので、`stop`で止めてあげる。
`list` でインスタンスの一覧と State 確認できる。

``` sh
# ホストOS側のシェルでvmインスタンスで止める
multipass stop <インスタンス名>
# ホストOS側のシェルでvmインスタンスの一覧表示
multipass list <インスタンス名>
```

git config とか設定し直しなので、会社のコミットログにユーザー名とメアド残したくない時は、インスタンス切り替えるとか面白そう。とりあえず、git config 設定を忘れないように。

``` sh
git config --global user.name <お名前>
git config --global user.email <メアド>
```

## そもそもの Docker Desktop　は何してたのか（僕の認識）

あくまで僕の認識。

Docker は Linux が必要。（chroot に依存してるからなのか？）なので、 Mac でも Win でも、 Linux の仮想環境上で動作させる必要がある。もっと言うと、　Docker Engine は Docker Client （CLIで叩いてるあれ。） と Docker Daemon がAPIで通信してて、「Linux の環境よこせや。」ってわがまま言ってるのは Daemon の方。

「Client と Daemon は別々なんだなー。」がポイント。

brew で docker をインストールしても Client（CLI） のみなので、 `docker ps` とかは `Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?` とか言われると思う。
つまり Docker Desktop は Linux の VM を立てて Docker Daemon を常駐させ、ホストOSの Docker Client CLI の API を Unix socket で通信してくれてた。便利ー。が Docker Desktop がしてくれていたこと。

なので、 VM の環境用意してそこで Docker 使えるようにすれば良いんじゃね。って話。

## Docker Desktopの代替案

さてさてさーて。僕は Docker Desktop の代替として Multipass を選んだわけだけど、 Docker Desktop の代替として利用できるツールは、大きく分けて3パターンあると思ってる。

- Linux VM で Docker Desktop と同じことすればええがなー。（Docker Daemon と Client をソケットで繋ぐ。）
- Docker 一強時代は終わった！別のコンテナツールでもええやん！
- もう ssh して開発環境は Linux でええやん。 ソケットもマウントも、めんどくね？

代表的なものは以下が挙げられる。

- ### [lima](https://github.com/lima-vm/lima)

  lima は CNCF (Cloud Native Computing Foundation) の sandbox project （2023/08/04時点）。

  Mac に Linux の VM インスタンス立てることを主目的としてる。はず。 Docker を利用するのは副産物。のはず。 k8s の example があったので k8s も使える。はず。  
  以降で触れる colima, Rancher Desktop, Finch は lima ベースらしい。 lima すごい。
  <https://github.com/lima-vm/lima/blob/master/README.ja.md>と<https://developers.freee.co.jp/entry/freee-docker-desktop-alternative> より。  
  M1 Mac 使える。 lima ベースのこれらもおそらく M1 Mac 使える。

  yaml で設定して、 Debian とか Fedora とか好きなディストリビューションを用意できる。 README を見た感じ cloud-initを使ってるっぽい。

  lima 使ってないのに、 lima love ポイント語るんやが、現時点（2023年7月27日）で、[最もコミットしてる](https://github.com/lima-vm/lima/graphs/contributors)のが[@AkihiroSuda](https://github.com/AkihiroSuda)さんで、プロフィール見た感じ、どうやらNTTに勤められている方なのかな？パスポート無しで会える距離にいるのは、親近感感じる。

  しかも、日本語の README がある。

  Docker 利用の話に戻すとソケットやらマウントやらは自分で設定する必要がある。（そりゃそう。 linux をインスタンス立てるのが主目的なはずなので。）
  調べてないけど、ソケット・マウントしなくても ssh で Linux 上で開発するマンもOK。
  ディストリビューション選べたり柔軟性が高い。

  一方で colima に流れる人は 「Docker 使いたいだけなんで、設定手抜きしたいっす。」ってことなのかな？知らんけど。

  やべ。 multipass の話やのに lima の話に筆が走ってしまった。

- ### [colima](https://github.com/abiosoft/colima)

  もうほとんど上記の lima のところで書いてしまったが、ポイントは次の感じ。

  - lima ベースで Docker 使うことを目的としてる。はず。  
  ソケットやらマウントやらやってくれる？ので、サクッと Mac で Docker Client が動くが環境欲しい人向け。

  以下のブログとか見てみると、 colima 入れたらチャチャっと Docker 触れてそう。

  <https://nakarisa.hatenablog.com/entry/2023/07/27/104345>

- ### [Rancher Desktop](https://rancherdesktop.io/)

  Docker Desktop 意識してるんだろう。 UI 強め。 UI は TS で書かれた Electron アプリケーション。いいすね。

  lima のところで書いたけど、 lima ベース。k8s とコンテナを管理できる。

- ### [minikube](https://minikube.sigs.k8s.io/docs/start/)

  kubernetes によるローカルで kubernetes の環境を用意するツール。2022年以前の記事で、バグについての記事をよく見たが今はどうか知らない。ちょっと Github issue を覗いたけど、「API server が落ちる。」とかあった。

- ### [Podman](https://docs.podman.io/en/latest/)

  Docker CLI で `docker ps` とかしてたのが `podman ps` とかになる。

- ### [Finch](https://github.com/runfinch/finch)

  一時有名になってた。あんまり知らないし、調べてない。

- ### [Multipass](https://multipass.run/)

  今日の主役。 Ubuntu が提供してくれるので、 lima みたいにディストリビューションを選べたりはしないはず。結構楽に Docker + gitの環境を用意できる。

これらは、 OS や利用背景、 k8s の利用辺りで相性が大きく変わると思う。よく調べて、自分にあったものを利用すると良いと思う。

使ってみて、使い勝手悪いなって思えば浮気すればいい。（ツールの話。）

## Marogosteen は何で Multipass を採用したの？

譲れないのは *vscode dev containers* を利用できること。

逆にいえば、端から SSH でホストOS側で docker コマンドが使えるかどうかはどうでも良い。
ついでに Linux と友達になれたらええなー。

だから lima でも全然良かったし、乗り換える可能性も普通にある。

Linux 以外だと、例えばMacはフォルダーを開く・ファイル選択する時に Finder が毎回顔出してきたりするのがウザく、 Linux で開発するのがハマってる。

## 参考文献

- How to install Multipass on macOS: <https://multipass.run/docs/installing-on-macos>
- Docker Engine overview: <https://docs.docker.com/engine/>
- Docker on Limaで脱Docker Desktop for Mac: <https://zenn.dev/matsukaz/articles/31bc31ff1c54b4>
- Docker on Lima なツールを色々試してみた: <https://developers.freee.co.jp/entry/freee-docker-desktop-alternative>
- colimaでDockerを触ってみた: <https://nakarisa.hatenablog.com/entry/2023/07/27/104345>
