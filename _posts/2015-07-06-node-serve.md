---
layout: post
title:  "使用 NodeJS 零配置搭建本地Web服务器~"
date:   2015-07-06 15:57
categories: 技术 前端 NodeJS JS JavaScript
---

对于大多办公室民工而言，便捷、快速、稳定的完成资源的共享或许是一个难以规避的需求。窃以为新兴的云共享等虽不失为还算应景的选项，但多少有些差强人意，毕竟上传的动作明显是多余的；而传统的共享服务器无异于浪费资源。或许有朋友会说 QQ 很好啊，然而当一份资源需要共享给成百上千的人的时候，也只能骂娘了。

今天呢， MurphyL 就介绍一种方法，在几乎零配置的情况下把本机变成一台 Web 服务器。至于这一点和上一段的关系，大家可自行琢磨，在此就不多做解释了。

废话已经够多了，接下来才是正题：首先我们需要一款软件，准确的说是一个 NodeJS 的组件包（Package）—— Serve。所以我们首先要安装 NodeJS 到电脑上，Windows 下的安装就不多做解释了，完事之后记得要设置环境变量到 `%NODE_HOME%\bin` 目录。Linux 下就更没什么可说，从官网下载二进制包，解压然后设置环境变量。

下面是验证 NodeJS 的安装：打开命令终端（CMD），输入命令 `node -v`，如看到 `v0.10.xx` 的返回结果，那么准备工作已经完成了。最后就是安装 Serve，安装组件使用的是 NodeJS 的包管理器 npm，具体的安装过程是执行下面这条命令：

{% highlight shell %}
    npm install -g serve
{% endhighlight %}

Linux 下可能需要 sudo，具体看你的安装 NodeJS 的位置。

因为国情的原因，安装可能得耗上大几分钟。有心折腾的朋友可以使用我大 Taobao 的 npm 镜像仓库。也就是需要多安装一个 Package，安装命令如下：

{% highlight shell %}
    npm install cnpm -g --registry=https://registry.npm.taobao.org
{% endhighlight %}

那么安装 Serve 的安装命令就需要相应的换成：

{% highlight shell %}
    cnpm install -g serve
{% endhighlight %}

最后就是具体的使用方法。Serve 是个命令行工具，所以这里仍得使用命令终端（CMD）。在终端（CMD）里打开你要共享的目录，执行命令：

{% highlight shell %}
    serve
{% endhighlight %}

对，就这样的五个字母，世界一下子就美妙了起来。Serve 启动为 Web 服务的默认端口为 `3000`，若需要玩定制的朋友请`serve --help`。

因为是基于 NodeJS，所以 Serve 能够友好支持Jade、Stylus 等动态特性，实在是一款不可多得的前端工具。

结语

> NodeJS 有很多的美好而强大的东西，值得我们去探索。比如：  `Grunt`、  `bower`、  `Yeoman`... 期待我们的下一次会面吧！

