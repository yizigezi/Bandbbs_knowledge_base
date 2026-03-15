import{_ as r,I as s,o as n,c as o,aq as p,J as e,aF as l}from"./chunks/framework.kV0qpqqq.js";const x=JSON.parse('{"title":"入门/安装篇","description":"","frontmatter":{},"headers":[],"relativePath":"Guides/astrobox/AstroboxV1入门安装篇.md","filePath":"Guides/astrobox/AstroboxV1入门安装篇.md","lastUpdated":1773512079000}'),h={name:"Guides/astrobox/AstroboxV1入门安装篇.md"};function d(c,a,m,k,b,g){const i=s("NolebaseGitContributors"),t=s("NolebaseGitChangelog");return n(),o("div",null,[a[0]||(a[0]=p('<h1 id="入门-安装篇" tabindex="-1">入门/安装篇 <a class="header-anchor" href="#入门-安装篇" aria-label="Permalink to “入门/安装篇”">​</a></h1><h2 id="手机安装的时候显示-解析软件包出现问题" tabindex="-1">手机安装的时候显示“解析软件包出现问题”？ <a class="header-anchor" href="#手机安装的时候显示-解析软件包出现问题" aria-label="Permalink to “手机安装的时候显示“解析软件包出现问题”？”">​</a></h2><p>请检查你的安卓版本是否在<mark><strong>安卓 10 及以上</strong></mark>，13 以下版本稳定性差，<mark><strong>推荐使用 13 及以上安卓版本</strong></mark>。</p><h2 id="q1-mac-打开显示-astrobox-app-已损坏-无法打开。你应该将它移到废纸篓。" tabindex="-1">Q1：Mac 打开显示“‘AstroBox.app’已损坏，无法打开。你应该将它移到废纸篓。”？ <a class="header-anchor" href="#q1-mac-打开显示-astrobox-app-已损坏-无法打开。你应该将它移到废纸篓。" aria-label="Permalink to “Q1：Mac 打开显示“‘AstroBox.app’已损坏，无法打开。你应该将它移到废纸篓。”？”">​</a></h2><p>在命令行执行以下指令并输入密码</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xattr</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -r</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> com.apple.quarantine</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /Applications/AstroBox.app</span></span></code></pre></div><h2 id="q2-windows-安装的时候显示报错码-2502-2503" tabindex="-1">Q2：Windows 安装的时候显示报错码 2502/2503？ <a class="header-anchor" href="#q2-windows-安装的时候显示报错码-2502-2503" aria-label="Permalink to “Q2：Windows 安装的时候显示报错码 2502/2503？”">​</a></h2><p><img src="'+l+`" alt="问题"></p><p>首先去官网重新下载安装包，看看安装包有没有在下载过程中损坏了。</p><p>如果不行，那就是 msi 的安装权限问题。<mark>首先先确认你是否将主程序解压后再开始运行，如没有请先解压后再试</mark>，如还不行就请你按照以下流程操作：</p><details><summary>点击此处展开/折叠内容</summary><pre><code>1.右键此文件夹，点击属性

![Photo](./img/started/q3-2.png)

2. 在安全选项卡下选择当前用户，点击编辑

![Photo](./img/started/q3-3.png)

![Photo](./img/started/q3-4.png)

3.选择完全控制后点击确定

![Photo](./img/started/q3-5.png)

4.回到原页面点击应用

![Photo](./img/started/q3-6.png)

点击左侧箭头展开
1. 右键此文件夹，点击属性

2. 在安全选项卡下选择当前用户，点击编辑

3. 选择完全控制后点击确定

4. 回到原页面点击应用

接下来可再次启动安装包尝试安装。
</code></pre></details><h2 id="q3-首页加载速度慢-加载失败" tabindex="-1">Q3：首页加载速度慢/加载失败？ <a class="header-anchor" href="#q3-首页加载速度慢-加载失败" aria-label="Permalink to “Q3：首页加载速度慢/加载失败？”">​</a></h2><p>可以在设置中<mark>更换CDN</mark> 并重启，建议换成 ghp；如果你能接受一直开启代理使用，直接改成 raw 也可以</p><p>或者你也可以尝试一下在WiFi列表，打开右边设置，IP 设置，改为静态，把 DNS1 改 114.114.114.114 或者223.5.5.5（这个可以写到DNS2上面），DNS2 可改 8.8.8.8，然后返回会重新连接，再次刷新试试！</p><h2 id="🌟-q4-首页就像下面这样空白-设置页划不动" tabindex="-1">🌟 Q4：首页就像下面这样空白/设置页划不动？ <a class="header-anchor" href="#🌟-q4-首页就像下面这样空白-设置页划不动" aria-label="Permalink to “🌟 Q4：首页就像下面这样空白/设置页划不动？”">​</a></h2><p>此种空白的特征是：</p><ol><li><p>banner 能够显示</p></li><li><p>应用列表下只显示“已经被一查到底了”</p></li><li><p>并且恰好你设置页也划不动</p></li></ol><p>满足以上特征可以尝试此方法。</p><p>根据群友反馈，大概率此问题为系统 Webview 版本过低，请你将 Webview 更新到 115+</p><p>你可以尝试进入这个链接下载，优先选择共享库版本：<a href="https://www.123pan.cn/s/Zg85Vv-Fte8.html" target="_blank" rel="noreferrer">https://www.123pan.cn/s/Zg85Vv-Fte8.html</a></p><p>如果安装失败可以检查安卓版本 或 在开发者选项关闭系统优化（比如 MIUI 优化）</p><p>如果是华为手机，安装后依旧无法使用，可以尝试在上面的链接里寻找华为版本的 Webview 安装，然后进入开发者选项-Webview 实现那边切换，两种都试试。</p><h2 id="q5-动画卡顿-异常" tabindex="-1">Q5：动画卡顿/异常？ <a class="header-anchor" href="#q5-动画卡顿-异常" aria-label="Permalink to “Q5：动画卡顿/异常？”">​</a></h2><p>手机端出现这个问题是正常的，需要骁龙8G1以上芯片才能较好地展示动画。</p><h2 id="q6-windows-11-设备更新到-1-5-0-主页白屏-什么都点不动" tabindex="-1"><s>Q6：Windows 11 设备更新到 1.5.0 主页白屏/什么都点不动</s> <a class="header-anchor" href="#q6-windows-11-设备更新到-1-5-0-主页白屏-什么都点不动" aria-label="Permalink to “Q6：Windows 11 设备更新到 1.5.0 主页白屏/什么都点不动”">​</a></h2><p><mark>在 1.5.1 版本中已修复，请更新到最新版本</mark></p><hr><div class="tip custom-block"><p class="custom-block-title custom-block-title-default">TIP</p><p>不同系统有不同的版本号，注意区分</p></div><hr><h2 id="q7-鸿蒙用不了-装不了" tabindex="-1"><s>Q7：鸿蒙用不了/装不了</s> <a class="header-anchor" href="#q7-鸿蒙用不了-装不了" aria-label="Permalink to “Q7：鸿蒙用不了/装不了”">​</a></h2><p><mark>在 1.2.0 版本中已可使用，只要你的安卓版本大等于 10</mark></p><p><s>需要AOSP版本大于等于 13 的鸿蒙，如果是鸿蒙Next 可以直接使用卓易通尝试。目前已尝试的大部分华为机型都不可以使用，你可以试试，大概率也不行</s></p><h2 id="q8-协议页点不了同意" tabindex="-1"><s>Q8：协议页点不了同意？</s> <a class="header-anchor" href="#q8-协议页点不了同意" aria-label="Permalink to “Q8：协议页点不了同意？”">​</a></h2><p><mark>此问题在 1.0.1 版本中已修复</mark></p><p><s>首先请确定你是否把协议看完，<mark>划到底部了</mark>。若依旧无法点击，请<mark>挂小窗再点</mark>，后面会修复这个问题</s></p><p>:::note</p><p>本教程由Yulimfish，川.，wuhaiqi等人编写，lladlam转载时经过修改，著作权归Yulimfish，川.，wuhaiqi等人所有</p><p>:::</p>`,38)),e(i),e(t)])}const u=r(h,[["render",d]]);export{x as __pageData,u as default};
