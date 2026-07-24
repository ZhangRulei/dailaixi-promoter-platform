# 黛莱皙推客带货平台

## 项目介绍

黛莱皙推客带货平台是一个基于微信小店优选联盟推客能力建设的 0–1 私域带货项目，包含微信小程序和 Web 运营后台。

- 微信小程序：面向游客和推广大使，提供商品、直播、短视频及运营素材浏览与分享，并支持推广资格开通、订单与收益查询、提现、邀请好友等能力。
- Web 运营后台：面向运营、内容、财务等角色，提供商品与内容管理、推客管理、订单与佣金管理、提现审核及首页装修等能力。
- 项目目标：打通“内容与商品分发—用户分享或自购—订单归因—佣金结算—收益提现”的完整业务闭环。
- 首版边界：依赖微信官方商品、直播、短视频、订单和归因链路，不建设自有商城交易、支付、物流及售后系统。

本仓库统一存放项目需求文档、测试用例和前后台低保真交互原型，供产品评审、研发实现和测试验收使用。

## 了解推客带货

- [微信小店优选联盟推客带货指南](https://store.weixin.qq.com/chengzhang/article/wiki?docid=7129&nonce=eaecf8415ca86666&category_key=growth_center_manual_for_promoter)
- [微信官方推客带货 API 文档](https://developers.weixin.qq.com/doc/store/leagueheadsupplier/api/)

## 在线查看

- [最新版 PRD（v3.4）](./outputs/黛莱皙推客带货平台_PRD_决策落地版_2026-07-21/黛莱皙推客带货平台_PRD_重写版_v3.4_0-1项目_本地评审稿.md)
- [测试用例](./outputs/黛莱皙推客带货平台_PRD_决策落地版_2026-07-21/黛莱皙推客带货平台_测试用例.md)
- [小程序低保真交互原型](https://zhangrulei.github.io/dailaixi-promoter-platform/prototype/homepage-lowfi/)
- [运营后台低保真交互原型](https://zhangrulei.github.io/dailaixi-promoter-platform/prototype/admin-lowfi/)
- [原型入口页](https://zhangrulei.github.io/dailaixi-promoter-platform/)

## 修改方式

- 需求调整：直接修改最新版 PRD Markdown。
- 测试用例：修改测试用例 Markdown，并保持编号连续。
- 小程序原型：修改 `prototype/homepage-lowfi/`。
- 运营后台原型：修改 `prototype/admin-lowfi/`。

推送到 `main` 分支后，GitHub Pages 会自动更新原型。
