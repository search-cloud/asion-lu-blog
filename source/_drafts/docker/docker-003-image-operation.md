---
title: （三）Docker Image Operation
date: 2017-05-24 17:30:11
categories: docker
tags: docker
---

# 镜像的常用操作
## 1.获取镜像：

命令：

docker pull <host>/<namespace>/<repo>:<tag>

说明：
镜像是Docker运行容器的前提。
用户可以使用docker pull 命令从网络上下载镜像。对于镜像来说，如果不显式地指定tag,则默认会选择latest标签，即下载仓库中最新版本的镜像。

例子：docker pull hub.docker.com/asion/java:8


## 2.查看镜像列表

命令：

docker images

说明：
使用docker images命令可以列出本地主机上已有的镜像。
信息含义：来自于哪个仓库、镜像的标签信息、镜像的ID号（唯一）、创建时间、镜像大小。

##  3.查看镜像信息

命令：

docker inspect <image_id>

说明：
docker inspect命令返回的是一个JSON的格式消息，如果我们只要其中的一项内容时，可以通过-f参数来指定。
Image_id通常可以使用该镜像ID的前若干个字符组成的可区分字符串来替代完成的ID。


##  4.查找镜像

命令：

docker search <image_name>

说明：

使用docker search命令可以搜索远端仓库中共享的镜像，默认搜索Docker hub官方仓库中的镜像。



## 5.删除镜像

命令：

docker rmi <image>:<tag>

说明：

使用docker rmi命令可以删除镜像，其中image可以为标签或ID。

注意：

当同一个镜像拥有多个标签，docker rmi只是删除该镜像多个标签中的指定标签而已，而不影响镜像文件。

当有该镜像创建的容器存在时，镜像文件默认是无法被删除的。








## 6.创建镜像

命令：

docker commit <options> <container_id> <repository:tag>

参数说明：

-a , --author : 作者信息

-m , --meassage : 提交消息

-p , --pause=true : 提交时暂停容器运行

说明：

基于已有的镜像的容器的创建。



## 7.迁移镜像

命令：

docker save -o <image>.tar <image>:<tag>

参数说明：

-o:设置存储压缩后的文件名称

说明：

可以使用docker save命令来迁出镜像，其中image可以为标签或ID。



## 8.载入镜像

命令：

docker load --input <image>.tar 或 docker load < <image>.tar

说明：

使用docker load命令可以载入镜像，其中image可以为标签或ID。

这将导入镜像及相关的元数据信息（包括标签等），可以使用docker images命令进行查看。



## 9.上传镜像

命令：

docker push <host>/<namespace>/<repo>:<tag>

说明：

可以使用docker push命令上传镜像到仓库，默认上传到DockerHub官方仓库（需要登录）。

