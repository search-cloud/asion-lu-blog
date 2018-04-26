---
title: （九）Docker docker-compose
date: 2017-05-24 18:11:18
categories:
tags:
---

# Docker Compose
## 1.什么是Docker Compose？

编排和配置容器集群的工具。

编排：定义被部署的对象的各组成部分之间的耦合关系，部署流程中各个动作的执行顺序，部署过程所需要的依赖文件和被部署文件的存储位置和获取方式，以及如何验证部署成功。这些信息都会在编排工具中以指定的格式定义并保存下来，从而保证这个流程可以在新的环境中快速的复现。

## 2.Docker Compose安装

下载docker-compose 二进制文件

curl -L https://github.com/docker/compose/releases/download/1.8.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose

黑魔法：

下载地址： [https://github.com/docker/compose/releases](https://github.com/docker/compose/releases)

## 3.Docker Compose使用入门

准备环境

1） 创建测试项目文件夹
```
mkdir composetest

cd composetest
```

2） 编辑app.py并保存
```
from flask import Flask

from redis import Redis

app = Flask(__name__)

redis = Redis(host='redis', port=6379)

@app.route('/')

def hello():

redis.incr('hits')

return 'Hello World! I have been seen %s times.' % redis.get('hits')

if __name__ == "__main__":

app.run(host="0.0.0.0", debug=True)
```

3） 在项目目录创建requirements.txt并保存

flask

redis

利用dockerfile创建docker镜像

```
FROM python:2.7

ADD . /code

WORKDIR /code

RUN pip install -r requirements.txt

CMD python app.py

docker build -t web .
```

定义服务

创建docker-compose.yml文件

Compose文件定义了2个服务，web和redis。

Web服务：

1. 从当前目录下的dockerfile创建

2. 容器的5000端口与宿主机5000端口绑定

3. 将项目目录与容器内的/code目录绑定

4. web服务与redis服务建立连接



通过compose运行app服务

```
docker-compose up
```
备注：

docker-compose up –d （后台启动）

docker-compose stop （停止运行）

Compose命令集： [https://docs.docker.com/compose/reference/](https://docs.docker.com/compose/reference/)