---
title: Docker Journal（三）Image Operation
date: 2017-05-24 17:30:11
categories: docker
tags: docker
---

- [镜像的常用操作](#%E9%95%9C%E5%83%8F%E7%9A%84%E5%B8%B8%E7%94%A8%E6%93%8D%E4%BD%9C)
  - [一. 获取镜像：](#%E4%B8%80-%E8%8E%B7%E5%8F%96%E9%95%9C%E5%83%8F)
  - [二. 查看镜像列表](#%E4%BA%8C-%E6%9F%A5%E7%9C%8B%E9%95%9C%E5%83%8F%E5%88%97%E8%A1%A8)
  - [三. 查看镜像信息](#%E4%B8%89-%E6%9F%A5%E7%9C%8B%E9%95%9C%E5%83%8F%E4%BF%A1%E6%81%AF)
  - [四. 查找镜像](#%E5%9B%9B-%E6%9F%A5%E6%89%BE%E9%95%9C%E5%83%8F)
  - [五. 删除镜像](#%E4%BA%94-%E5%88%A0%E9%99%A4%E9%95%9C%E5%83%8F)
  - [六. 创建镜像](#%E5%85%AD-%E5%88%9B%E5%BB%BA%E9%95%9C%E5%83%8F)
  - [七. 迁移镜像](#%E4%B8%83-%E8%BF%81%E7%A7%BB%E9%95%9C%E5%83%8F)
  - [八. 载入镜像](#%E5%85%AB-%E8%BD%BD%E5%85%A5%E9%95%9C%E5%83%8F)
  - [九. 上传镜像](#%E4%B9%9D-%E4%B8%8A%E4%BC%A0%E9%95%9C%E5%83%8F)

# 镜像的常用操作
## 一. 获取镜像：

命令：
```s
docker pull <host>/<namespace>/<repo>:<tag>
```

说明：
镜像是Docker运行容器的前提。
用户可以使用 docker pull 命令从网络上下载镜像。对于镜像来说，如果不显式地指定tag，则默认会选择latest标签，即下载仓库中最新版本的镜像。

例子：
```s
docker pull hub.docker.com/asion/java:8
```

## 二. 查看镜像列表

命令：
```s
docker images
```

说明：
使用 docker images 命令可以列出本地主机上已有的镜像。
信息含义：来自于哪个仓库、镜像的标签信息、镜像的ID号（唯一）、创建时间、镜像大小。

##  三. 查看镜像信息

命令：
```s
docker inspect <image_id>
```

说明：
docker inspect 命令返回的是一个JSON的格式消息，如果我们只要其中的一项内容时，可以通过-f参数来指定。
Image_id通常可以使用该镜像ID的前若干个字符组成的可区分字符串来替代完成的ID。


##  四. 查找镜像

命令：
```s
docker search <image_name>
```

说明：
使用docker search命令可以搜索远端仓库中共享的镜像，默认搜索Docker hub官方仓库中的镜像。

## 五. 删除镜像

命令：
```s
docker rmi <image>:<tag>
```

说明：
使用docker rmi命令可以删除镜像，其中image可以为标签或ID。

注意：
当同一个镜像拥有多个标签，docker rmi只是删除该镜像多个标签中的指定标签而已，而不影响镜像文件。
当有该镜像创建的容器存在时，镜像文件默认是无法被删除的。

## 六. 创建镜像

命令：
```s
docker commit <options> <container_id> <repository:tag>
```

参数说明：
-a , --author : 作者信息
-m , --meassage : 提交消息
-p , --pause=true : 提交时暂停容器运行

说明：
基于已有的镜像的容器的创建。

## 七. 迁移镜像

命令：
```s
docker save -o <image>.tar <image>:<tag>
```
参数说明：
-o: 设置存储压缩后的文件名称

说明：
可以使用 docker save 命令来迁出镜像，其中image可以为标签或ID。

## 八. 载入镜像

命令：
```s
docker load --input <image>.tar 或 docker load < <image>.tar
```
说明：
使用 docker load 命令可以载入镜像，其中image可以为标签或ID。
这将导入镜像及相关的元数据信息（包括标签等），可以使用docker images命令进行查看。

## 九. 上传镜像

命令：
```s
docker push <host>/<namespace>/<repo>:<tag>
```
说明：
可以使用 docker push 命令上传镜像到仓库，默认上传到DockerHub官方仓库（需要登录）。
参数例子：http://seekheap.com/images/jdk:8
host：主机名，如：127.0.0.1 或 docker.io
namespace：images
repo：镜像名称，如 jdk
tag：标签，相当于版本，如 8，如果不显式地指定tag，则默认会是latest标签


