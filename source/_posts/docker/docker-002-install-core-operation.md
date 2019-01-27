---
title: Docker Journal（二）Core Operation and Installation
date: 2017-05-24 17:10:11
categories: docker
tags: docker
---

- [Docker的核心概念和安装](#docker%E7%9A%84%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5%E5%92%8C%E5%AE%89%E8%A3%85)
  - [Docker的核心概念](#docker%E7%9A%84%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5)
    - [Docker核心概念之镜像](#docker%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5%E4%B9%8B%E9%95%9C%E5%83%8F)
    - [Docker核心概念之容器](#docker%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5%E4%B9%8B%E5%AE%B9%E5%99%A8)
    - [Docker核心概念之仓库](#docker%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5%E4%B9%8B%E4%BB%93%E5%BA%93)
  - [Docker的安装和配置](#docker%E7%9A%84%E5%AE%89%E8%A3%85%E5%92%8C%E9%85%8D%E7%BD%AE)
    - [环境介绍](#%E7%8E%AF%E5%A2%83%E4%BB%8B%E7%BB%8D)
    - [安装步骤](#%E5%AE%89%E8%A3%85%E6%AD%A5%E9%AA%A4)
      - [安装准备](#%E5%AE%89%E8%A3%85%E5%87%86%E5%A4%87)
      - [通过yum方式安装docker](#%E9%80%9A%E8%BF%87yum%E6%96%B9%E5%BC%8F%E5%AE%89%E8%A3%85docker)
    - [Docker配置](#docker%E9%85%8D%E7%BD%AE)
    - [Docker卸载](#docker%E5%8D%B8%E8%BD%BD)

# Docker的核心概念和安装

## Docker的核心概念
### Docker核心概念之镜像

Docker 镜像就是一个只读的模板。
例如：一个镜像可以包含一个完整的 ubuntu 操作系统环境，里面仅安装了 Apache 或用户需要的其它应用程序。

镜像可以用来创建 Docker 容器。
创建Docker镜像有几种方式，多数是在一个现有镜像基础上创建新镜像，因为几乎你需要的任何东西都有了公共镜像，包括所有主流Linux发行版，你应该不会找不到你需要的镜像。不过，就算你想从头构建一个镜像，也有好几种方法。
要创建一个镜像，你可以拿一个镜像，对它进行修改来创建它的子镜像 。

### Docker核心概念之容器

Docker 利用容器来运行应用。
容器是从镜像创建的运行实例。它可以被启动、开始、停止、删除。每个容器都是相互隔离的、保证安全的平台。
可以把容器看做是一个简易版的 Linux 环境（包括root用户权限、进程空间、用户空间和网络空间等）和运行在其中的应用程序。

注：***镜像是只读的，容器在启动的时候创建一层可写层作为最上层。***

### Docker核心概念之仓库

仓库是集中存放镜像文件的场所。
有时候会把仓库和仓库注册服务器（Registry）混为一谈，并不严格区分。实际上，仓库注册服务器上往往存放着多个仓库，每个仓库中又包含了多个镜像，每个镜像有不同的标签（tag）。


##  Docker的安装和配置
### 环境介绍

操作系统：CentOS7 64bit 
docker版本：17.04.0-ce (2017-04-05)
版本新功能：https://github.com/moby/moby/blob/master/CHANGELOG.md

### 安装步骤

#### 安装准备
要求: Linux内核版本最低为3.10
查看当前内核版本： 
```sh
uname –r
```

#### 通过yum方式安装docker

Step1：更新yum源： 
```sh
sudo yum update 
```

Step2：增加docker的yum源：

1. 输入命令：
```sh
sudo tee /etc/yum.repos.d/docker.repo <<-'EOF'
```

2. 输入：
```sh
[dockerrepo]
name=Docker Repository
baseurl=https://yum.dockerproject.org/repo/main/centos/$releasever/
enabled=1
gpgcheck=1
gpgkey=https://yum.dockerproject.org/gpg
EOF`
```

这样我们就添加了yum源
可以通过命令，查看
```
sudo vi /etc/yum.repos.d/docker.repo 
```

Step3：通过yum安装docker
```
sudo yum install docker-engine
```

Step4：启动docker服务
```
sudo service docker start
```

Step5：查看版本信息，通过测试用例验证docker是否安装成功

验证docker版本：sudo docker version
测试：sudo docker run hello-world

### Docker配置

创建docker用户组
```
sudo groupadd docker
```

增加当前用户到docker分组
```
sudo usermod -aG docker dajiangtai
```

验证在不使用sudo的情况下docker是否正常工作
```
docker run hello-world
```

设置docker开机启动
```
sudo chkconfig docker on
```

### Docker卸载

查看安装包
```
yum list installed | grep docker
```

移除安装包：
```
sudo yum -y remove docker-engine.x86_64
```

清除所有docker依赖文件
```
rm -rf /var/lib/docker
```

删除用户创建的配置文件
