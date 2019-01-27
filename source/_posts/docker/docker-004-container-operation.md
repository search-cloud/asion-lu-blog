---
title: Docker Journal（四）Container Operation
date: 2017-05-24 17:45:11
categories: docker
tags: docker
---

# 容器的常用操作
## 一．创建容器

Docker的容器十分轻量级，用户可以随时创建或删除容器。

新建容器：
```s
docker create 
```
```s
docker create –ti ubuntu
```

说明：使用 docker create 命令创建的容器处于停止状态，可以使用 docker start 命令启动它。

新建并启动容器:
```s
docker run
```
```s
docker run ubuntu /bin/echo “Hello World”
```

说明： 等价于先执行 docker create 命令，再执行 docker start 命令。
docker run 背后的故事：
1. 检查本地是否存在制定的镜像，不存在就从公有仓库下载。
2. 利用本地镜像创建并启动一个容器。
3. 分配一个文件系统，并在只读的镜像层外面挂载一层可读写层。
4. 从宿主机配置的网桥接口桥接一个虚拟接口到容器中去。
5. 从地址池配置一个IP地址给容器。
6. 执行用户的指定的用户程序。
7. 执行完毕后容器被终止。

一条简单的命令：
```s
docker run -i –t ubuntu /bin/bash
```
-t : 让docker分配一个伪终端并绑定到容器的标准输入上。
-i : 让容器的标准输入保持打开。

在交互模式下，用户可以通过所创建的终端来输入命令，exit命令退出容器。
退出后，容器自动处于终止状态。

守护台运行：
更多的时候，需要让Docker容器运行在后台以守护态（daemonized）形式运行。用户可以通过添加-d参数来实现。
```s
docker run –d ubuntu /bin/sh -c “while true;do echo hello world;sleep 1;done”
```

查看日志： 
```s
docker logs <container_id>
```

## 二．终止容器

可以使用 docker stop 命令来终止一个运行中的容器。
```s
docker stop <container_id>
```
注意：
当容器中的应用终结时，容器也会自动停止。
查看终止的容器：
```
docker ps -a
```
查看运行的容器：
```
docker ps
```
重新启动容器：
```
docker start <container_id>
```

## 三．进入容器

在使用-d参数时，容器启动后会进入后台，用户无法看到容器中的信息。
```s
docker exec <options> <container_id> <command>
```
Exec可以直接在容器内部运行命令。

进入容器：
```s
docker exec -i –t <container_id> bash
```

## 四．删除容器

可以使用 docker rm 命令删除终止状态的容器。
如果删除正在运行的容器，可以使用 docker rm –f 命令。

## 五．导入和导出容器

导出容器是指导出一个已经创建的容器到一个文件，不管容器是否处于运行状态。可以使用 docker export 命令。
```s
docker export <container_id>
```
```s
Docker export test_id > test.tar
```

导出的文件又可以使用docker import命令导入，成为镜像。
```s
cat test.tar | docker import – dajiangtai/testimport:latest
```
