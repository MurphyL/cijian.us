---
layout: page
title: 友链
permalink: /links/
---

个人会根据喜好主动增加友链。本质上说，私以为友链代表的是友情，是认可，而非凭空的一句话——“换个链接”。

<ul class="note links">
  {% for link in site.data.links %}
    <li class="linkcat">
      <h3>{{ link.name }}</h3>
      <ul class="blogroll">
        {% for item in link.items %}
          <li><a href="{{item.link}}" title="{{ item.desc }}">{{ item.name }}</a></li>
        {% endfor %}
      </ul>
    </li>
  {% endfor %}
</ul>
