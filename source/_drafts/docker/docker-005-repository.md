---
title: （五）Docker Repository
date: 2017-05-24 17:58:11
categories: docker
tags: docker
---

# 仓库(Repository)
## 1.Docker Hub

仓库是集中存放镜像的地方。

目前Docker官方仓库维护了一个公共仓库https://hub.docker.com，其中已经包括15000多个的镜像。

大部分需求都可以通过在Docker Hub中直接下来镜像来实现。

登录

可以通过执行docker login命令来输入用户名、密码和邮箱来完成注册登录。



基本操作

用户无需登录可以通过 docker search命令来查找官方仓库中的镜像，并利用docker pull 下载到本地，可以通过docker push 命令将本地镜像推送到docker hub。

## 2.创建和使用私有仓库

创建私有仓库

使用registry镜像创建私有仓库

可以通过docker官方提供的registry镜像来搭建一套本地私有仓库。

镜像地址：https://hub.docker.com/_/registry/

命令：

docker run -e SEARCH_BACKEND=sqlalchemy

-e SQLALCHEMY_INDEX_DATABASE=sqlite:////tmp/docker-registry.db

-d --name registry -p 5000:5000 registry

参考地址：

https://github.com/docker/docker-registry#search-engine-options

https://hub.docker.com/_/registry/

自动下载并启动一个registry容器，创建本地的私有仓库服务。

默认仓库创建在/tmp/registry目录下。



docker启动参数配置：

环境：centos7

配置文件：/lib/systemd/system/docker.service

参考地址：https://docs.docker.com/engine/admin/configuring/





## 3.仓库加速服务

加速下载官方镜像。

推荐服务：https://dashboard.daocloud.io/

点击加速器：https://dashboard.daocloud.io/mirror

配置Docker加速器：



下载第三方官方仓库。

## 4.仓库管理

Registry Web UI

用于镜像的查询，删除。

镜像地址：https://hub.docker.com/r/atcol/docker-registry-ui/

启动命令：

docker run -d --name registry_ui -p 8080:8080

-e REG1=http://<registry_ip>:5000/v1/ atcol/docker-registry-ui

访问地址：

http://<host_ip>:8080