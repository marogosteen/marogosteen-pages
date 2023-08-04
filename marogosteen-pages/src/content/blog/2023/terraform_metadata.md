---
layout: "@layouts/PostDetail.astro"
title: "みんな Terraform で cloud-init を使った VM を立てる方法を知ってる？"
publicDate: 2023-08-06
updateDate: 2023-08-06
postSlug: "20230621-use_cloud-init_in_terraform"
tags:
  - "Terraform"
  - "Google Cloud"
description: "Terraform で cloud-init を使う術を探すのに苦労したので、備忘録。"
draft: false
---

## 結論

`file()` を使う。初学者すぎて、こいつを知らなかった。

``` terraform
metadata = {
  user-data = file("nginx.yaml"),
}
```

## 何がしたいのか

Terraform で Google Cloud の Compute Engine で Ubuntu VM を立てて、 nginx を実行したかった。尚且つ、 nginx は自分で用意したくないので、 cloud-init で用意したい。

そこで、 Terraform で cloud-init の yaml ファイルをどうやって渡すのかで困った。なので残す。

## そもそもcloud-initとは？

cloud-init は Google Cloud とかで作る Linux VM などのインスタンスの環境を自動で簡単に用意できるマン。

例えば、 nginx を使うなら、 nginx を用意してくれている VM を用意してくれるイメージ。便利。

## 再度結論

以下のように metadata を指定する。 MIG (Managed Instance Group) なら google_compute_instance_template で metadata フィールドに書く。

google_compute_instance のリソースの全体記述例。実際に google_compute_instance を立てるなら、 network 周りも用意がいる。

``` terraform
resource "google_compute_instance" "vm-instance" {
  name         = "maronginx"
  machine_type = "e2-micro"
  zone         = var.use_zone
  tags         = ["allow-external-ssh"]

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2204-lts"
    }
  }

  network_interface {
    network    = "maro-net"
    subnetwork = "maro-subnet"
    access_config {}
  }

 # ここ！！
  metadata = {
    user-data = file("nginx.yaml"),
  }
}
```

## compute engine の external ip と Terraform

network_interface に `access_config {}` を書いてあげると ephemeral で external ip を用意してくれる。固定なら中に書いてやる。

## 余談

ブログに画像載せるのを避けてるな。最近。
