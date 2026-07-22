(function () {
  'use strict';

  var modules = [
    { id: 'home', label: '首页', icon: '首', subs: [['overview', '经营概览']] },
    { id: 'content', label: '内容管理', icon: '内', subs: [['products', '商品管理'], ['live', '直播管理'], ['video', '视频管理'], ['circle', '发圈与宣发'], ['categories', '分类与搜索'], ['help', '教程与帮助']] },
    { id: 'promoter', label: '推客管理', icon: '推', subs: [['list', '推客列表']] },
    { id: 'orders', label: '订单管理', icon: '单', subs: [['list', '订单列表']] },
    { id: 'finance', label: '财务管理', icon: '财', subs: [['statements', '用户对账单'], ['withdrawals', '提现审核'], ['settings', '财务设置']] },
    { id: 'authorization', label: '授权管理', icon: '授', subs: [['shops', '授权小店']] },
    { id: 'system', label: '系统设置', icon: '设', subs: [['basic', '基础设置'], ['page', '页面装修'], ['share', '分享设置'], ['agreements', '协议与隐私']] },
    { id: 'accounts', label: '账户管理', icon: '账', subs: [['users', '后台账号'], ['activity', '操作日志']] }
  ];

  function menuKeysFor(moduleIds) {
    var allowedModules = moduleIds || modules.map(function (item) { return item.id; });
    return modules.filter(function (item) { return allowedModules.indexOf(item.id) > -1; }).reduce(function (keys, item) {
      return keys.concat(item.subs.map(function (sub) { return item.id + ':' + sub[0]; }));
    }, []);
  }

  var state = { module: 'home', sub: 'overview', decorationTab: 'banner', selectedPrimary: '护肤', pendingAction: null, drawerAction: null, pages: {}, pageSizes: {} };
  var productState = [
    { listed: true, recommended: true, sort: 1, reason: '修护维稳，适合换季分享', price: 199, commissionRate: 12, store: '黛莱皙官方旗舰店', category: '护肤', secondaryCategory: '精华' },
    { listed: true, recommended: true, sort: 2, reason: '清爽水润，日常护肤组合', price: 269, commissionRate: 12, store: '黛莱皙官方旗舰店', category: '套装', secondaryCategory: '护肤套装' },
    { listed: false, recommended: false, sort: '', reason: '', price: 159, commissionRate: 10, store: '黛莱皙福利专场店', category: '套装', secondaryCategory: '清洁套装' },
    { listed: false, recommended: false, sort: '', reason: '', price: 89, commissionRate: 10, store: '黛莱皙官方旗舰店', category: '护肤', secondaryCategory: '洁面' }
  ];
  var liveState = [
    { listed: true, script: '换季护肤别着急，今晚来黛莱皙直播间一起选适合自己的修护方案。\n\n夏季护肤怎么选？进入直播间看搭配建议和使用方法。\n\n黛莱皙夏季护肤专场正在直播，点击进入直播间边看边选。', scriptCount: 3 },
    { listed: false, script: '', scriptCount: 0 },
    { listed: false, script: '清洁和补水怎么搭配？进入直播间查看完整护肤步骤。\n\n日常清洁有哪些容易忽略的细节？直播间为你一次讲清。\n\n清洁与补水课堂回顾，进入直播间查看本场内容。', scriptCount: 3 }
  ];
  var videoState = [
    { listed: true, sort: 1 },
    { listed: true, sort: 2 },
    { listed: false, sort: null }
  ];
  var circleState = [
    { id: 'FQ-0722-01', content: '换季修护别着急，清洁补水按顺序来…', type: '带货发圈', materialCount: 3, product: '臻润修护精华套装', productId: 'SPU 1003821', listed: true, sort: 1, updated: '07-22 16:30' },
    { id: 'XF-0722-02', content: '夏季护肤课堂活动通知', type: '宣发', materialCount: 1, product: '', productId: '', listed: true, sort: 2, updated: '07-22 15:20' },
    { id: 'FQ-0722-03', content: '焕亮水乳组合日常分享', type: '带货发圈', materialCount: 4, product: '焕亮水乳护肤礼盒', productId: 'SPU 1003816', listed: false, sort: 3, updated: '07-22 13:40' }
  ];
  var categoryState = [
    { name: '新品', icon: 'new.png', keywords: '上新、新品推荐', visible: true, sort: 1, updated: '07-22 16:20' },
    { name: '护肤', icon: 'skincare.png', keywords: '水乳、精华、面膜', visible: true, sort: 2, updated: '07-22 15:46' },
    { name: '彩妆', icon: 'makeup.png', keywords: '底妆、唇妆', visible: true, sort: 3, updated: '07-21 18:32' },
    { name: '套装', icon: 'set.png', keywords: '礼盒、组合装', visible: true, sort: 4, updated: '07-21 18:30' }
  ];
  var secondaryCategoryState = [
    { name: '本周上新', parent: '新品', visible: true, sort: 1, updated: '07-22 16:10' },
    { name: '热卖推荐', parent: '新品', visible: true, sort: 2, updated: '07-22 16:05' },
    { name: '精华', parent: '护肤', visible: true, sort: 1, updated: '07-22 16:08' },
    { name: '水乳', parent: '护肤', visible: true, sort: 2, updated: '07-22 15:50' },
    { name: '面霜', parent: '护肤', visible: true, sort: 3, updated: '07-22 15:42' },
    { name: '洁面', parent: '护肤', visible: true, sort: 4, updated: '07-22 15:36' },
    { name: '防晒', parent: '护肤', visible: true, sort: 5, updated: '07-22 15:30' },
    { name: '底妆', parent: '彩妆', visible: true, sort: 1, updated: '07-21 18:40' },
    { name: '唇妆', parent: '彩妆', visible: true, sort: 2, updated: '07-21 18:36' },
    { name: '眼妆', parent: '彩妆', visible: false, sort: 3, updated: '07-21 18:34' },
    { name: '护肤套装', parent: '套装', visible: true, sort: 1, updated: '07-21 18:26' },
    { name: '清洁套装', parent: '套装', visible: true, sort: 2, updated: '07-21 18:20' }
  ];
  var helpState = [
    { id: 'T-001', title: '如何开通推广大使', type: '推客教程', category: '新人入门', format: '图文', content: '进入小程序后完成登录，并按页面引导完成推客授权。', published: true, sort: 1, updated: '07-22 11:00' },
    { id: 'T-002', title: '商品四种分享方式', type: '推客教程', category: '推广分享', format: '视频', content: '介绍文案图片、海报、微信码和小程序卡的使用方式。', published: true, sort: 2, updated: '07-21 16:20' },
    { id: 'Q-018', title: '为什么找不到推广订单？', type: '帮助中心', category: '关于订单', format: '问答', content: '请确认好友通过有效推广链路进入并完成下单。', published: true, sort: 3, updated: '07-20 10:32' },
    { id: 'Q-026', title: '提现失败怎么办？', type: '帮助中心', category: '关于佣金', format: '问答', content: '请先核对签约及收款信息，如仍有问题可联系官方客服。', published: false, sort: 4, updated: '07-22 14:10' }
  ];
  var promoterState = [
    { name: '如磊777', blocked: false },
    { name: '护肤分享伙伴', blocked: false },
    { name: '清清日记', blocked: false },
    { name: '分享小助手', blocked: true }
  ];
  var promoterFans = {
    0: [
      [promoter('护肤分享伙伴', '护'), '邀请海报', status('已建立', 'filled'), '<span class="fan-commission"><strong>¥186.40</strong><small>累计已结算</small></span>', '07-12 16:20'],
      [promoter('清清日记', '清'), '小程序卡', status('注册中', 'dashed'), '<span class="fan-commission"><strong>¥0.00</strong><small>暂未产生</small></span>', '07-22 14:03']
    ],
    1: [
      [promoter('日常护肤记录', '日'), '分享好友', status('已建立', 'filled'), '<span class="fan-commission"><strong>¥68.20</strong><small>累计已结算</small></span>', '07-20 10:18'],
      [promoter('清清日记', '清'), '邀请海报', status('已建立', 'filled'), '<span class="fan-commission"><strong>¥42.60</strong><small>累计已结算</small></span>', '07-18 09:42'],
      [promoter('分享小助手', '分'), '小程序卡', status('注册中', 'dashed'), '<span class="fan-commission"><strong>¥0.00</strong><small>暂未产生</small></span>', '07-22 14:03']
    ],
    2: [],
    3: [
      [promoter('日常护肤记录', '日'), '邀请海报', status('已建立', 'filled'), '<span class="fan-commission"><strong>¥36.20</strong><small>累计已结算</small></span>', '07-08 11:26']
    ]
  };
  var promoterFanCommissionTotals = { 0: 638.50, 1: 110.80, 2: 0, 3: 36.20 };
  var withdrawalReasons = {
    3: '收款账户信息校验未通过，请核对后重新申请。'
  };
  var accountState = [
    { id: 'A001', login: 'admin_ops', nickname: '运营管理员', avatar: '运', phone: '138****1101', blocked: false, lastLogin: '07-22 17:18', menus: menuKeysFor() },
    { id: 'A002', login: 'content_01', nickname: '内容运营', avatar: '内', phone: '136****2208', blocked: false, lastLogin: '07-22 16:42', menus: menuKeysFor(['home', 'content']) },
    { id: 'A003', login: 'finance_01', nickname: '财务运营', avatar: '财', phone: '139****8216', blocked: false, lastLogin: '07-22 16:35', menus: menuKeysFor(['home', 'finance']) },
    { id: 'A004', login: 'former_ops', nickname: '离职运营', avatar: '离', phone: '135****0098', blocked: true, lastLogin: '07-10 10:02', menus: menuKeysFor(['home']) }
  ];
  var agreementState = [
    { name: '用户协议', version: 'v1.3', scene: '首次登录', effectiveDate: '2026-07-01', reconfirm: '重大变更时', content: '欢迎使用黛莱皙推客小程序。\n\n一、服务说明\n本小程序为推客提供商品、直播、视频及推广素材的查看和分享服务。\n\n二、账户使用\n用户应使用本人微信及手机号完成登录，不得转让或出借账户。\n\n三、收益说明\n推广收益以平台实际结算结果为准。' },
    { name: '隐私政策', version: 'v1.5', scene: '首次登录及设置', effectiveDate: '2026-07-01', reconfirm: '重大变更时', content: '本政策说明黛莱皙推客小程序如何处理用户信息。\n\n一、信息收集\n为完成登录、推客开通和提现服务，我们会依法收集必要的身份及联系方式。\n\n二、信息使用\n所收集信息仅用于提供服务、保障账户安全和履行法定义务。\n\n三、用户权利\n用户可在个人信息页面查询、更正相关信息或申请注销账户。' },
    { name: '推客合作说明', version: 'v1.1', scene: '推广大使开通前', effectiveDate: '2026-07-10', reconfirm: '是', content: '本说明适用于申请成为黛莱皙推广大使的用户。\n\n一、开通条件\n用户完成微信推客授权后，可分享商品、直播和视频。\n\n二、推广规范\n推广内容应真实、准确，不得发布虚假或误导性信息。\n\n三、收益规则\n好友通过有效推广链路完成购买并满足结算条件后，推客可获得相应收益。' },
    { name: '佣金结算协议', version: 'v1.0', scene: '首次提现签约', effectiveDate: '2026-07-15', reconfirm: '协议失效时', content: '本协议用于约定推客佣金结算与提现事项。\n\n一、结算范围\n可提现金额以已完成结算且符合平台规则的佣金为准。\n\n二、签约信息\n首次提现前需按页面要求完成签约。\n\n三、提现处理\n提现申请提交后，可在提现记录中查询处理结果。' }
  ];
  var bannerState = [
    { title: '夏日焕亮计划', media: 'banner-summer.jpg', targetType: '活动页面', target: '/pages/activity/summer', start: '2026-07-01T00:00', end: '2026-07-31T23:59', enabled: true },
    { title: '修护精华新品上市', media: 'banner-new.jpg', targetType: '商品详情', target: 'SPU1003821', start: '2026-07-10T00:00', end: '2026-08-10T23:59', enabled: true },
    { title: '推客新手教程', media: 'banner-guide.jpg', targetType: '小程序页面', target: '/pages/tutorial/index', start: '2026-07-01T00:00', end: '2026-12-31T23:59', enabled: false }
  ];
  var channelState = [
    { name: '新品', icon: 'new.png', path: '/pages/goods/list?channel=new', enabled: true },
    { name: '护肤', icon: 'skincare.png', path: '/pages/goods/list?channel=skincare', enabled: true },
    { name: '彩妆', icon: 'makeup.png', path: '/pages/goods/list?channel=makeup', enabled: true },
    { name: '套装', icon: 'set.png', path: '/pages/goods/list?channel=set', enabled: true },
    { name: '全部', icon: 'all.png', path: '/pages/goods/list', enabled: true }
  ];
  var shareCopyState = '邀请好友一起成为黛莱皙推广大使，分享好物，轻松获得推广收益。';
  var sharePosterState = [
    { title: '品牌邀请海报', media: 'share-poster-brand.jpg', enabled: true },
    { title: '护肤好物海报', media: 'share-poster-skincare.jpg', enabled: true },
    { title: '推广大使招募海报', media: 'share-poster-promoter.jpg', enabled: false }
  ];
  var tableTotals = {
    'content:products': 128, 'content:live': 36, 'content:video': 82, 'content:circle': 64,
    'content:categories': 12, 'content:help': 26,
    'promoter:list': 1284,
    'orders:list': 3846,
    'finance:statements': 4286, 'finance:withdrawals': 126,
    'authorization:shops': 3, 'system:agreements': 4,
    'accounts:users': 12, 'accounts:activity': 126
  };
  var elements = {
    primaryNav: document.getElementById('primaryNav'),
    breadcrumbTitle: document.getElementById('breadcrumbTitle'),
    pageContent: document.getElementById('pageContent'),
    drawer: document.getElementById('detailDrawer'),
    drawerTitle: document.getElementById('drawerTitle'),
    drawerEyebrow: document.getElementById('drawerEyebrow'),
    drawerBody: document.getElementById('drawerBody'),
    modal: document.getElementById('confirmModal'),
    modalTitle: document.getElementById('modalTitle'),
    modalMessage: document.getElementById('modalMessage'),
    toast: document.getElementById('toast')
  };

  function escapeHTML(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function stripHTML(value) {
    var node = document.createElement('div');
    node.innerHTML = String(value);
    node.querySelectorAll('.entity-thumb').forEach(function (thumb) { thumb.remove(); });
    return node.textContent.trim();
  }

  function entity(name, secondary, type) {
    return '<span class="entity"><span class="entity-thumb">' + escapeHTML(type || '图') + '</span><span><strong>' + escapeHTML(name) + '</strong>' + (secondary ? '<small>' + escapeHTML(secondary) + '</small>' : '') + '</span></span>';
  }

  function promoter(name, avatar) {
    var promoterIds = {
      '如磊777': 'TK****777',
      '护肤分享伙伴': 'TK****286',
      '清清日记': 'R****0281',
      '分享小助手': 'TK****109',
      '日常护肤记录': 'TK****805'
    };
    return '<span class="entity promoter-entity"><span class="entity-thumb promoter-avatar">' + escapeHTML(avatar || String(name).slice(0, 1)) + '</span><span><strong>' + escapeHTML(name) + '</strong><small>' + escapeHTML(promoterIds[name] || 'ID 待同步') + '</small></span></span>';
  }

  function withdrawalChannel(type, verifiedName, account) {
    return '<span class="withdraw-channel"><strong>' + escapeHTML(type) + '</strong>' +
      '<small>认证姓名：' + escapeHTML(verifiedName) + '</small>' +
      (account ? '<small class="withdraw-account-number">卡号：' + escapeHTML(account) + '</small>' : '') +
      '</span>';
  }

  function status(text, style) {
    return '<span class="status ' + escapeHTML(style || '') + '">' + escapeHTML(text) + '</span>';
  }

  function productStore(name) {
    return '<span class="source-store"><strong>' + escapeHTML(name) + '</strong><small>授权小店</small></span>';
  }

  function productCommission(rate, price) {
    var amount = (Number(price) || 0) * (Number(rate) || 0) / 100;
    return '<span class="product-commission"><strong>' + Number(rate).toFixed(2).replace(/\.00$/, '') + '%</strong><small>约 ¥' + amount.toFixed(2) + '</small></span>';
  }

  function materialImages(count) {
    var visible = Math.min(Number(count) || 1, 3);
    var images = Array.from({ length: visible }).map(function (_, index) {
      return '<span class="material-image"><i>图</i><small>' + (index + 1) + '</small></span>';
    }).join('');
    return '<span class="material-images">' + images + (count > visible ? '<b>+' + (count - visible) + '</b>' : '') + '</span>';
  }

  function listSortControl(actionAttr, index, total, sortValue) {
    return '<div class="list-sort-control">' +
      '<button type="button" class="button small quiet" ' + actionAttr + '="up" data-row-index="' + index + '" ' + (index === 0 ? 'disabled' : '') + ' title="上移" aria-label="上移">↑</button>' +
      '<strong>#' + escapeHTML(String(sortValue)) + '</strong>' +
      '<button type="button" class="button small quiet" ' + actionAttr + '="down" data-row-index="' + index + '" ' + (index === total - 1 ? 'disabled' : '') + ' title="下移" aria-label="下移">↓</button>' +
      '</div>';
  }

  function circleRow(item) {
    var boundProduct = item.type === '带货发圈' && item.product
      ? entity(item.product, item.productId, '商')
      : '<span class="empty-value">—</span>';
    var contentAndMaterial = '<div class="circle-content-material">' +
      materialImages(item.materialCount) +
      '<span class="circle-content-copy"><strong>' + escapeHTML(item.content) + '</strong><small>素材 ' + escapeHTML(item.id) + '</small></span>' +
      '</div>';
    return [
      contentAndMaterial,
      status(item.type, item.type === '带货发圈' ? 'filled' : ''),
      boundProduct,
      status(item.listed ? '已上架' : '已下架', item.listed ? 'filled' : 'dashed'),
      String(item.sort),
      item.updated,
      '操作'
    ];
  }

  function syncCircleRows() {
    tableConfigs['content:circle'].rows = circleState.map(circleRow);
  }

  function categoryTag(name, secondaryName) {
    if (!name) return '<span class="empty-value">未分类</span>';
    return '<span class="category-path"><span class="category-tag">' + escapeHTML(name) + '</span>' + (secondaryName ? '<i>›</i><span class="category-tag secondary">' + escapeHTML(secondaryName) + '</span>' : '') + '</span>';
  }

  function secondaryCategoriesOf(primaryName) {
    return secondaryCategoryState.filter(function (item) { return item.parent === primaryName; }).sort(function (a, b) { return a.sort - b.sort; });
  }

  function ensureSelectedPrimary() {
    if (!categoryState.length) {
      state.selectedPrimary = '';
      return null;
    }
    var selected = categoryState.find(function (item) { return item.name === state.selectedPrimary; });
    if (!selected) {
      state.selectedPrimary = categoryState[0].name;
      selected = categoryState[0];
    }
    return selected;
  }

  function productCountForPrimary(primaryName) {
    return productState.filter(function (item) { return item.category === primaryName; }).length;
  }

  function productCountForSecondary(primaryName, secondaryName) {
    return productState.filter(function (item) { return item.category === primaryName && item.secondaryCategory === secondaryName; }).length;
  }

  function reindexPrimaryCategories() {
    categoryState.sort(function (a, b) { return a.sort - b.sort; });
    categoryState.forEach(function (item, index) { item.sort = index + 1; });
  }

  function reindexSecondaryCategories(primaryName) {
    var list = secondaryCategoriesOf(primaryName);
    list.forEach(function (item, index) { item.sort = index + 1; });
  }

  function syncCategoryRows() {
    // kept for legacy callers; category page now renders itself
  }

  function helpRow(item) {
    return [
      entity(item.title, (item.type === '推客教程' ? '教程 ' : 'FAQ ') + item.id, item.type === '推客教程' ? '教' : '问'),
      item.type,
      item.category,
      item.format,
      String(item.sort),
      status(item.published ? '已发布' : '已下架', item.published ? 'filled' : 'dashed'),
      item.updated,
      '操作'
    ];
  }

  function syncHelpRows() {
    tableConfigs['content:help'].rows = helpState.map(helpRow);
  }

  function currentModule() {
    return modules.find(function (item) { return item.id === state.module; }) || modules[0];
  }

  function navGroup(item) {
    var active = state.module === item.id;
    var hasNestedMenu = item.subs.length > 1;
    var submenu = active && hasNestedMenu ? '<div class="nav-submenu">' + item.subs.map(function (sub) {
      return '<button type="button" class="' + (state.sub === sub[0] ? 'active' : '') + '" data-sub="' + sub[0] + '">' + sub[1] + '</button>';
    }).join('') + '</div>' : '';
    return '<div class="nav-group ' + (active && hasNestedMenu ? 'expanded' : '') + '"><button type="button" class="nav-module ' + (active ? 'active' : '') + '" data-module="' + item.id + '"><span class="nav-icon">' + item.icon + '</span><span class="nav-label">' + item.label + '</span>' + (hasNestedMenu ? '<span class="nav-caret">' + (active ? '−' : '+') + '</span>' : '') + '</button>' + submenu + '</div>';
  }

  function renderPrimaryNav() {
    elements.primaryNav.innerHTML = modules.map(navGroup).join('');
  }

  function metric(label, value, emphasis) {
    return '<article class="metric ' + (emphasis ? 'emphasis' : '') + '"><span class="metric-label">' + label + '</span><strong>' + value + '</strong></article>';
  }

  function panel(title, subtitle, body, actions) {
    return '<section class="panel"><header class="panel-head"><div><h2>' + title + '</h2></div><div>' + (actions || '') + '</div></header><div class="panel-body">' + body + '</div></section>';
  }

  function homeOverview() {
    var metrics = [
      metric('结算 GMV', '¥286,420', true),
      metric('支付 GMV', '¥412,880'),
      metric('有效 GMV', '¥391,200'),
      metric('有效推客', '1,284'),
      metric('支付订单', '3,846'),
      metric('推客佣金', '¥42,680'),
      metric('待处理提现', '26 笔')
    ].join('');
    var chart = '<div class="combo-chart">' +
      '<div class="chart-legend"><span><i class="legend-bar"></i>支付 GMV（左轴，万元）</span><span><i class="legend-line"></i>支付订单（右轴，笔）</span></div>' +
      '<div class="chart-layout"><div class="axis-scale axis-left"><span>50</span><span>37.5</span><span>25</span><span>12.5</span><span>0</span></div>' +
      '<div class="chart-main"><div class="plot-surface"><div class="combo-bars"><i style="height:36%"></i><i style="height:52%"></i><i style="height:43%"></i><i style="height:68%"></i><i style="height:61%"></i><i style="height:83%"></i><i style="height:74%"></i></div>' +
      '<svg class="combo-line" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="近七日支付订单数量折线"><polyline points="7.14,66 21.43,52 35.71,60 50,39 64.29,47 78.57,22 92.86,31"></polyline></svg>' +
      '<div class="line-points" aria-hidden="true"><i style="left:7.14%;top:66%"></i><i style="left:21.43%;top:52%"></i><i style="left:35.71%;top:60%"></i><i style="left:50%;top:39%"></i><i style="left:64.29%;top:47%"></i><i style="left:78.57%;top:22%"></i><i style="left:92.86%;top:31%"></i></div></div>' +
      '<div class="chart-axis"><span>07-16</span><span>07-17</span><span>07-18</span><span>07-19</span><span>07-20</span><span>07-21</span><span>07-22</span></div></div>' +
      '<div class="axis-scale axis-right"><span>500</span><span>375</span><span>250</span><span>125</span><span>0</span></div></div></div>';
    var rank = '<table class="data-table ranking-table"><thead><tr><th>排名</th><th>内容</th><th>推广发起</th><th>支付 GMV</th></tr></thead><tbody>' +
      '<tr><td>1</td><td><span class="ranking-content"><span class="ranking-cover">商品封面</span><strong>臻润修护精华套装</strong></span></td><td>1,428</td><td>¥86,420</td></tr>' +
      '<tr><td>2</td><td><span class="ranking-content"><span class="ranking-cover">直播封面</span><strong>夏季护肤专场直播</strong></span></td><td>986</td><td>¥72,360</td></tr>' +
      '<tr><td>3</td><td><span class="ranking-content"><span class="ranking-cover">商品封面</span><strong>焕亮水乳护肤礼盒</strong></span></td><td>754</td><td>¥55,780</td></tr>' +
      '</tbody></table>';
    return '<div class="metrics">' + metrics + '</div>' + panel('近 7 日 GMV 与订单趋势', '', chart, '') + panel('内容经营排行', '按支付 GMV 排序', rank, '');
  }

  var tableConfigs = {
    'content:products': {
      title: '商品管理', subtitle: '',
      keyword: '商品名称 / 商品 ID', statuses: ['全部状态', '已上架', '已下架'],
      columns: ['商品', '来源店铺', '商品分类', '售价', '预估佣金', '上架状态', '首页推荐', '推荐文案', '更新时间', '操作'],
      rows: [
        [entity('臻润修护精华套装', 'SPU 1003821', '商'), productStore(productState[0].store), categoryTag(productState[0].category, productState[0].secondaryCategory), '¥199.00', productCommission(productState[0].commissionRate, productState[0].price), status('已上架', 'filled'), '已推荐 · 排序 1', '修护维稳，适合换季分享', '07-22 16:40', '编辑'],
        [entity('焕亮水乳护肤礼盒', 'SPU 1003816', '商'), productStore(productState[1].store), categoryTag(productState[1].category, productState[1].secondaryCategory), '¥269.00', productCommission(productState[1].commissionRate, productState[1].price), status('已上架', 'filled'), '已推荐 · 排序 2', '清爽水润，日常护肤组合', '07-22 15:18', '编辑'],
        [entity('净透清洁护理套装', 'SPU 1003762', '商'), productStore(productState[2].store), categoryTag(productState[2].category, productState[2].secondaryCategory), '¥159.00', productCommission(productState[2].commissionRate, productState[2].price), status('已下架', 'dashed'), '未推荐', '—', '07-22 13:06', '编辑'],
        [entity('柔润洁面乳', 'SPU 1003510', '商'), productStore(productState[3].store), categoryTag(productState[3].category, productState[3].secondaryCategory), '¥89.00', productCommission(productState[3].commissionRate, productState[3].price), status('已下架', 'dashed'), '未推荐', '—', '07-21 19:42', '编辑']
      ]
    },
    'content:live': {
      title: '直播管理', subtitle: '管理直播、预告、话术与直播爆品',
      keyword: '直播间 / 视频号', statuses: ['全部状态', '直播中', '待开播', '已结束', '已上架', '已下架'],
      columns: ['直播间', '直播状态', '上架状态', '开播时间', '主推商品', '分享话术', '排序', '操作'],
      rows: [
        [entity('黛莱皙夏季护肤专场', '黛莱皙官方视频号', '播'), status('直播中', 'filled'), status('已上架', 'filled'), '今天 14:00', '3 件', '3 条', '1', '查看'],
        [entity('换季修护主题直播', '黛莱皙官方视频号', '播'), status('待开播', 'dashed'), status('已下架', 'dashed'), '07-23 19:30', '4 件', '未配置', '2', '编辑'],
        [entity('清洁与补水课堂', '黛莱皙官方视频号', '播'), status('已结束', ''), status('已下架', 'dashed'), '07-21 20:00', '3 件', '3 条', '—', '查看']
      ]
    },
    'content:video': {
      title: '视频管理', subtitle: '视频卡点击后直接跳转对应视频号视频',
      keyword: '视频标题 / 视频号', statuses: ['全部状态', '已上架', '已下架'],
      columns: ['视频', '视频号', '时长', '上架状态', '人工排序', '最近同步', '操作'],
      rows: [
        [entity('防晒乳正确使用方法', '视频 ID V2026072201', '视'), '黛莱皙官方', '00:52', status('已上架', 'filled'), '1', '2026-12-31', '操作'],
        [entity('水乳搭配使用顺序', '视频 ID V2026072107', '视'), '黛莱皙官方', '01:18', status('已上架', 'filled'), '2', '2026-12-31', '操作'],
        [entity('温和洁面技巧', '视频 ID V2026071903', '视'), '合作达人', '00:46', status('已下架', 'dashed'), '—', '07-21 00:05', '操作']
      ]
    },
    'content:circle': {
      title: '发圈与宣发', subtitle: '带货发圈需绑定商品，宣发不关联商品推广链路',
      keyword: '文案 / 商品 / 素材 ID', statuses: ['全部类型', '带货发圈', '宣发', '已上架', '已下架'],
      columns: ['内容与素材', '类型', '绑定商品', '上架状态', '排序', '更新时间', '操作'],
      rows: circleState.map(circleRow)
    },
    'content:help': {
      title: '教程与帮助', subtitle: '统一维护推客教程和帮助中心 FAQ',
      keyword: '标题 / 问题', statuses: ['全部类型', '推客教程', '帮助中心', '已发布', '已下架'],
      columns: ['标题', '类型', '分类', '内容形式', '排序', '状态', '更新时间', '操作'],
      rows: helpState.map(helpRow)
    },
    'content:categories': {
      title: '分类与搜索', subtitle: '左侧维护一级分类，右侧维护对应二级分类；商品归类在商品管理设置',
      keyword: '分类名称', statuses: ['全部状态', '展示中', '已隐藏'],
      columns: ['分类', '排序', '状态', '操作'],
      rows: []
    },
    'promoter:list': {
      title: '推客列表', subtitle: '推客资格、邀请关系与收益信息集中查看',
      keyword: '昵称 / 手机号 / 推客 ID', statuses: ['全部状态', '已开通', '注册中', '资格异常', '已封禁'],
      columns: ['推客', '手机号', '邀请人', '资格状态', '账户状态', '提现签约', '直接粉丝', '累计收益', '可提现', '加入时间', '操作'],
      rows: [
        [promoter('如磊777', '如'), '138****7777', '', status('已开通', 'filled'), status('正常', 'filled'), status('已签约', 'filled'), '18', '¥4,286.60', '¥1,208.00', '07-02', '查看'],
        [promoter('护肤分享伙伴', '护'), '136****2286', promoter('如磊777', '如'), status('已开通', 'filled'), status('正常', 'filled'), status('已签约', 'filled'), '3', '¥986.20', '¥326.50', '07-12', '查看'],
        [promoter('清清日记', '清'), '159****6301', promoter('护肤分享伙伴', '护'), status('注册中', 'dashed'), status('正常', 'filled'), status('未签约', ''), '0', '—', '—', '07-22', '查看'],
        [promoter('分享小助手', '分'), '137****0109', promoter('如磊777', '如'), status('资格异常', ''), status('已封禁', 'dashed'), status('未签约', ''), '2', '¥428.00', '¥0.00', '07-08', '查看']
      ]
    },
    'orders:list': {
      title: '订单列表', subtitle: '订单、归因与佣金信息集中查看',
      keyword: '订单号 / 推客 / 商品', statuses: ['全部状态', '待结算', '已结算', '已失效', '自购'],
      columns: ['订单号', '商品', '推客', '来源', '支付金额', '佣金信息', '订单状态', '自购', '下单时间', '操作'],
      rows: [
        ['4200****8162', entity('臻润修护精华套装', '×1', '商'), promoter('如磊777', '如'), '商品分享', '¥199.00', '<span class="order-commission"><strong>预计 ¥24.00</strong><small>实际 -- · 好友 ¥0.00</small></span>', status('待结算', 'dashed'), '否', '07-22 15:48', '查看'],
        ['4200****5279', entity('焕亮水乳护肤礼盒', '×1', '商'), promoter('护肤分享伙伴', '护'), '直播间', '¥269.00', '<span class="order-commission"><strong>实际 ¥32.00</strong><small>预计 ¥32.00 · 好友 ¥1.60</small></span>', status('已结算', 'filled'), '否', '07-20 20:16', '查看'],
        ['4200****1934', entity('净透清洁护理套装', '×1', '商'), promoter('如磊777', '如'), '商品分享', '¥159.00', '<span class="order-commission"><strong>预计 ¥19.08</strong><small>实际 -- · 好友 ¥0.00</small></span>', status('待结算', 'dashed'), status('已确认', 'filled'), '07-18 09:25', '查看'],
        ['4200****6408', entity('柔润洁面乳', '×1', '商'), promoter('分享小助手', '分'), '发圈', '¥89.00', '<span class="order-commission"><strong>预计 ¥8.90</strong><small>实际 ¥0.00 · 好友 ¥0.00</small></span>', status('已失效', ''), '无法确认', '07-12 14:03', '查看']
      ]
    },
    'finance:statements': {
      title: '用户对账单', subtitle: '按用户记录佣金到账与提现流水，余额变化可追溯',
      keyword: '用户昵称 / 手机号 / 流水号', statuses: ['全部类型', '佣金到账', '提现'],
      columns: ['流水号', '用户', '业务类型', '金额', '余额变化', '关联单号', '发生时间'],
      rows: [
        ['ST202607220001', promoter('如磊777', '如'), status('佣金到账', 'filled'), '+¥32.00', '¥168.00 → ¥200.00', '订单 4200****5279', '07-22 15:48'],
        ['ST202607210018', promoter('如磊777', '如'), status('提现', ''), '-¥100.00', '¥268.00 → ¥168.00', '提现单 TX20260721****0138', '07-21 16:32'],
        ['ST202607200063', promoter('护肤分享伙伴', '护'), status('佣金到账', 'filled'), '+¥24.00', '¥302.50 → ¥326.50', '订单 4200****8162', '07-20 20:16'],
        ['ST202607180026', promoter('分享小助手', '分'), status('提现', ''), '-¥300.00', '¥300.00 → ¥0.00', '提现单 TX20260718****0066', '07-18 10:05']
      ]
    },
    'finance:withdrawals': {
      title: '提现审核', subtitle: '审核用户提现申请并跟踪渠道处理结果',
      keyword: '提现单号 / 推客', statuses: ['全部状态', '待处理', '处理中', '成功', '已驳回'],
      columns: ['提现单号', '推客', '申请金额', '扣减税费', '打款金额', '提现渠道', '处理状态', '申请时间', '操作'],
      rows: [
        ['TX20260722****0138', promoter('如磊777', '如'), '¥500.00', '-¥15.00', '¥485.00', withdrawalChannel('银行卡', '张如磊', '6222021000012345678'), status('待处理', 'dashed'), '07-22 16:32', '审核'],
        ['TX20260722****0122', promoter('护肤分享伙伴', '护'), '¥300.00', '-¥9.00', '¥291.00', withdrawalChannel('微信零钱', '李清清'), status('待处理', 'dashed'), '07-22 15:18', '审核'],
        ['TX20260718****0066', promoter('如磊777', '如'), '¥600.00', '-¥18.00', '¥582.00', withdrawalChannel('微信零钱', '张如磊'), status('成功', 'filled'), '07-18 10:05', '查看'],
        ['TX20260710****0021', promoter('分享小助手', '分'), '¥300.00', '¥0.00', '¥0.00', withdrawalChannel('银行卡', '王小敏', '6217003810012348842'), status('已驳回', ''), '07-10 09:14', '查看']
      ]
    },
    'authorization:shops': {
      title: '授权小店', subtitle: '从微信侧同步全部已授权小店，已过期记录继续保留',
      keyword: '小店名称 / 小店 ID / 主体名称', statuses: ['全部状态', '授权有效', '已过期'],
      columns: ['小店', '小店 ID', '主体名称', '授权状态', '授权时间', '到期时间', '最近同步', '操作'],
      rows: [
        [entity('黛莱皙官方旗舰店', '微信小店', '店'), 'SHOP****3821', '黛莱皙品牌主体', status('授权有效', 'filled'), '2026-01-10 09:30', '2027-01-10 09:30', '07-22 17:00', '查看'],
        [entity('黛莱皙福利专场店', '微信小店', '店'), 'SHOP****2196', '黛莱皙品牌主体', status('授权有效', 'filled'), '2026-05-18 14:20', '2027-05-18 14:20', '07-22 17:00', '查看'],
        [entity('黛莱皙旧版小店', '微信小店', '店'), 'SHOP****0752', '黛莱皙品牌主体', status('已过期', 'dashed'), '2025-06-30 10:00', '2026-06-30 10:00', '07-22 17:00', '查看']
      ]
    },
    'system:agreements': {
      title: '协议与隐私', subtitle: '历史同意记录和已签协议不可覆盖',
      keyword: '协议名称 / 版本', statuses: ['全部类型', '已生效', '草稿', '已停用'],
      columns: ['协议名称', '当前版本', '适用场景', '状态', '生效时间', '需重新确认', '操作'],
      rows: [
        ['用户协议', 'v1.3', '首次登录', status('已生效', 'filled'), '2026-07-01', '重大变更时', '操作'],
        ['隐私政策', 'v1.5', '首次登录及设置', status('已生效', 'filled'), '2026-07-01', '重大变更时', '操作'],
        ['推客合作说明', 'v1.1', '推广大使开通前', status('已生效', 'filled'), '2026-07-10', '是', '操作'],
        ['佣金结算协议', 'v1.0', '首次提现签约', status('已生效', 'filled'), '2026-07-15', '协议失效时', '操作']
      ]
    },
    'accounts:users': {
      title: '后台账号', subtitle: '后台账号仅用于后台登录与菜单访问',
      keyword: '昵称 / 手机号', statuses: ['全部状态', '正常', '已封禁'],
      columns: ['账号信息', '菜单权限', '状态', '最近登录', '操作'],
      rows: [
        [entity('运营管理员', '138****1101', '运'), '全部菜单', status('正常', 'filled'), '07-22 17:18', '操作'],
        [entity('内容运营', '136****2208', '内'), '2 个一级菜单', status('正常', 'filled'), '07-22 16:42', '操作'],
        [entity('财务运营', '139****8216', '财'), '2 个一级菜单', status('正常', 'filled'), '07-22 16:35', '操作'],
        [entity('离职运营', '135****0098', '离'), '1 个一级菜单', status('已封禁', 'dashed'), '07-10 10:02', '操作']
      ]
    },
    'accounts:activity': {
      title: '操作日志', subtitle: '查看账号创建、编辑、启停和登录记录',
      keyword: '操作人 / 操作内容', statuses: ['全部类型', '账号变更', '登录记录'],
      hasActions: false,
      columns: ['时间', '操作人', '事件类型', '操作内容', '结果'],
      rows: [
        ['07-22 17:18', entity('运营管理员', '138****1101', '头'), '登录事件', '验证码登录后台', status('成功', 'filled')],
        ['07-22 14:28', entity('系统管理员', '138****0000', '头'), '账号变更', '修改 content_01 菜单权限', status('成功', 'filled')],
        ['07-21 18:06', entity('系统管理员', '138****0000', '头'), '账号变更', '停用 former_ops 后台账号', status('成功', 'filled')],
        ['07-20 09:42', entity('财务运营', '139****8216', '头'), '登录记录', '验证码登录后台', status('成功', 'filled')]
      ]
    }
  };

  function tableToolbarActions(key) {
    var actions = [];
    var exportKeys = ['orders:list', 'finance:statements', 'finance:withdrawals'];
    if (key === 'content:products') {
      actions.push('<button type="button" class="button" data-command="batch-product-commission">批量修改佣金</button>');
      actions.push('<button type="button" class="button" data-command="batch-product-category">批量设置分类</button>');
    } else if (key === 'content:circle') {
      actions.push('<button type="button" class="button primary" data-command="create">添加内容</button>');
    } else if (key === 'content:categories') {
      actions.push('<button type="button" class="button primary" data-command="create-primary-category">添加一级分类</button>');
    } else if (key === 'content:help') {
      actions.push('<button type="button" class="button primary" data-command="create-help">添加内容</button>');
    } else if (key.indexOf('content:') === 0 && key !== 'content:video' && key !== 'content:live') {
      actions.push('<button type="button" class="button" data-command="batch">批量操作</button>');
      actions.push('<button type="button" class="button primary" data-command="create">新增内容</button>');
    }
    if (key === 'authorization:shops') actions.push('<button type="button" class="button primary" data-command="sync-shops">同步小店列表</button>');
    if (key === 'accounts:users') actions.push('<button type="button" class="button primary" data-command="create-account">添加账户</button>');
    if (key === 'finance:withdrawals') actions.push('<button type="button" class="button primary" data-command="batch-withdraw-review">批量审核</button>');
    if (exportKeys.indexOf(key) > -1) actions.push('<button type="button" class="button" data-command="export">导出</button>');
    return actions.join('');
  }

  function renderTable(key, config) {
    var statusOptions = (config.statuses || ['全部状态']).map(function (item) { return '<option value="' + escapeHTML(item) + '">' + escapeHTML(item) + '</option>'; }).join('');
    var isWithdrawalReview = key === 'finance:withdrawals';
    var isProductList = key === 'content:products';
    var hasPendingWithdrawal = isWithdrawalReview && config.rows.some(function (row) { return stripHTML(row[6]) === '待处理'; });
    var selectionHead = isWithdrawalReview
      ? '<th class="selection-cell"><input type="checkbox" data-withdraw-select-all aria-label="全选待审核申请" ' + (hasPendingWithdrawal ? '' : 'disabled') + '></th>'
      : (isProductList ? '<th class="selection-cell"><input type="checkbox" data-product-select-all aria-label="全选商品"></th>' : '');
    var head = selectionHead + config.columns.map(function (column) { return '<th>' + escapeHTML(column) + '</th>'; }).join('');
    var body = config.rows.map(function (row, rowIndex) {
      var cells = row.map(function (cell, cellIndex) {
        if (key === 'content:circle' && cellIndex === 4) {
          return '<td>' + listSortControl('data-circle-action', rowIndex, circleState.length, circleState[rowIndex].sort) + '</td>';
        }
        if (key === 'content:help' && cellIndex === 4) {
          return '<td>' + listSortControl('data-help-action', rowIndex, helpState.length, helpState[rowIndex].sort) + '</td>';
        }
        if (cellIndex === row.length - 1 && config.hasActions !== false) {
          if (key === 'content:products') {
            var product = productState[rowIndex];
            return '<td><div class="table-actions product-actions">' +
              '<button type="button" class="button small" data-product-action="shelf" data-row-index="' + rowIndex + '">' + (product.listed ? '下架' : '上架') + '</button>' +
              '<button type="button" class="button small" data-product-action="recommend" data-row-index="' + rowIndex + '">' + (product.recommended ? '取消推荐' : '推荐') + '</button>' +
              '<button type="button" class="button small" data-product-action="commission" data-row-index="' + rowIndex + '">调佣</button>' +
              '<button type="button" class="button small" data-row-action data-table-key="' + key + '" data-row-index="' + rowIndex + '">编辑</button>' +
              '</div></td>';
          }
          if (key === 'content:live') {
            var live = liveState[rowIndex];
            return '<td><div class="table-actions live-actions">' +
              '<button type="button" class="button small" data-live-action="shelf" data-row-index="' + rowIndex + '">' + (live.listed ? '下架' : '上架') + '</button>' +
              '<button type="button" class="button small" data-live-action="script" data-row-index="' + rowIndex + '">分享话术</button>' +
              '<button type="button" class="button small" data-row-action data-table-key="' + key + '" data-row-index="' + rowIndex + '">' + escapeHTML(stripHTML(cell)) + '</button>' +
              '</div></td>';
          }
          if (key === 'content:video') {
            var video = videoState[rowIndex];
            return '<td><div class="table-actions video-actions">' +
              '<button type="button" class="button small" data-video-action="shelf" data-row-index="' + rowIndex + '">' + (video.listed ? '下架' : '上架') + '</button>' +
              '<button type="button" class="button small" data-video-action="sort" data-row-index="' + rowIndex + '">排序</button>' +
              '</div></td>';
          }
          if (key === 'content:circle') {
            var circleItem = circleState[rowIndex];
            return '<td><div class="table-actions circle-actions">' +
              '<button type="button" class="button small" data-circle-action="shelf" data-row-index="' + rowIndex + '">' + (circleItem.listed ? '下架' : '上架') + '</button>' +
              '<button type="button" class="button small" data-circle-action="edit" data-row-index="' + rowIndex + '">编辑</button>' +
              '</div></td>';
          }
          if (key === 'content:help') {
            var helpItem = helpState[rowIndex];
            return '<td><div class="table-actions help-actions">' +
              '<button type="button" class="button small" data-help-action="publish" data-row-index="' + rowIndex + '">' + (helpItem.published ? '下架' : '发布') + '</button>' +
              '<button type="button" class="button small" data-help-action="edit" data-row-index="' + rowIndex + '">编辑</button>' +
              '</div></td>';
          }
          if (key === 'accounts:users') {
            var account = accountState[rowIndex];
            return '<td><div class="table-actions account-actions">' +
              '<button type="button" class="button small" data-account-action="edit" data-row-index="' + rowIndex + '">编辑</button>' +
              '<button type="button" class="button small" data-account-action="block" data-row-index="' + rowIndex + '">' + (account.blocked ? '解封' : '封禁') + '</button>' +
              '<button type="button" class="button small" data-account-action="delete" data-row-index="' + rowIndex + '">删除</button>' +
              '</div></td>';
          }
          if (key === 'promoter:list') {
            var promoterUser = promoterState[rowIndex];
            return '<td><div class="table-actions promoter-actions">' +
              '<button type="button" class="button small" data-row-action data-table-key="' + key + '" data-row-index="' + rowIndex + '">查看</button>' +
              '<button type="button" class="button small ' + (promoterUser.blocked ? '' : 'danger') + '" data-promoter-action="block" data-row-index="' + rowIndex + '">' + (promoterUser.blocked ? '解封' : '封禁') + '</button>' +
              '</div></td>';
          }
          if (key === 'system:agreements') {
            return '<td><div class="table-actions agreement-actions">' +
              '<button type="button" class="button small" data-agreement-action="view" data-row-index="' + rowIndex + '">查看</button>' +
              '<button type="button" class="button small" data-agreement-action="edit" data-row-index="' + rowIndex + '">编辑</button>' +
              '</div></td>';
          }
          if (isWithdrawalReview) {
            var isPending = stripHTML(row[6]) === '待处理';
            if (isPending) {
              return '<td><div class="table-actions withdraw-actions">' +
                '<button type="button" class="button small primary" data-withdraw-action="approve" data-row-index="' + rowIndex + '">通过</button>' +
                '<button type="button" class="button small danger" data-withdraw-action="reject" data-row-index="' + rowIndex + '">驳回</button>' +
                '</div></td>';
            }
            return '<td><div class="table-actions"><button type="button" class="button small" data-row-action data-table-key="' + key + '" data-row-index="' + rowIndex + '">查看</button></div></td>';
          }
          return '<td><div class="table-actions"><button type="button" class="button small" data-row-action data-table-key="' + key + '" data-row-index="' + rowIndex + '">' + escapeHTML(stripHTML(cell)) + '</button></div></td>';
        }
        if (key === 'promoter:list' && cellIndex === 6) {
          return '<td><button type="button" class="fan-count-button" data-promoter-fans data-row-index="' + rowIndex + '" aria-label="查看直接粉丝">' + escapeHTML(stripHTML(cell)) + ' 人 <span>›</span></button></td>';
        }
        return '<td>' + cell + '</td>';
      }).join('');
      var selector = '';
      if (isWithdrawalReview) {
        var selectable = stripHTML(row[6]) === '待处理';
        selector = '<td class="selection-cell"><input type="checkbox" data-withdraw-select data-row-index="' + rowIndex + '" aria-label="选择提现申请 ' + escapeHTML(stripHTML(row[0])) + '" ' + (selectable ? '' : 'disabled') + '></td>';
      } else if (isProductList) {
        selector = '<td class="selection-cell"><input type="checkbox" data-product-select data-row-index="' + rowIndex + '" aria-label="选择商品 ' + escapeHTML(stripHTML(row[0])) + '"></td>';
      }
      return '<tr data-search-row>' + selector + cells + '</tr>';
    }).join('');
    var storeFilter = '';
    var categoryFilter = '';
    if (isProductList) {
      var stores = productState.map(function (item) { return item.store; }).filter(function (item, index, list) { return list.indexOf(item) === index; });
      storeFilter = '<select data-filter-store aria-label="来源店铺"><option value="">全部店铺</option>' + stores.map(function (store) { return '<option value="' + escapeHTML(store) + '">' + escapeHTML(store) + '</option>'; }).join('') + '</select>';
      categoryFilter = '<select data-filter-primary-category aria-label="一级分类"><option value="">全部一级分类</option>' + categoryState.map(function (category) { return '<option value="' + escapeHTML(category.name) + '">' + escapeHTML(category.name) + '</option>'; }).join('') + '</select>' +
        '<select data-filter-secondary-category aria-label="二级分类"><option value="">全部二级分类</option>' + secondaryCategoryState.map(function (category) { return '<option value="' + escapeHTML(category.name) + '">' + escapeHTML(category.parent + ' / ' + category.name) + '</option>'; }).join('') + '</select>';
    }
    var filters = '<div class="filters"><input type="search" data-filter-keyword placeholder="' + escapeHTML(config.keyword || '请输入关键词') + '">' + storeFilter + categoryFilter + '<select data-filter-status>' + statusOptions + '</select><button type="button" class="button primary" data-filter-submit>查询</button><button type="button" class="button" data-filter-reset>重置</button><span class="spacer"></span>' + tableToolbarActions(key) + '</div>';
    var table = '<div class="table-wrap"><table class="data-table" data-table="' + key + '"><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table></div>';
    var total = tableTotals[key] || config.rows.length;
    var pageSize = state.pageSizes[key] || 20;
    var totalPages = Math.max(1, Math.ceil(total / pageSize));
    var currentPage = Math.min(state.pages[key] || 1, totalPages);
    state.pages[key] = currentPage;
    var pagination = '<div class="table-pagination">' +
      '<span>共 ' + total + ' 条</span><label>每页 <select data-page-size data-page-key="' + key + '"><option value="20" ' + (pageSize === 20 ? 'selected' : '') + '>20</option><option value="50" ' + (pageSize === 50 ? 'selected' : '') + '>50</option><option value="100" ' + (pageSize === 100 ? 'selected' : '') + '>100</option></select> 条</label>' +
      '<span class="spacer"></span><button type="button" class="button small" data-page-action="prev" data-page-key="' + key + '" ' + (currentPage <= 1 ? 'disabled' : '') + '>上一页</button>' +
      '<strong>第 ' + currentPage + ' / ' + totalPages + ' 页</strong>' +
      '<button type="button" class="button small" data-page-action="next" data-page-key="' + key + '" ' + (currentPage >= totalPages ? 'disabled' : '') + '>下一页</button></div>';
    return '<section class="panel table-panel"><div class="panel-body">' + filters + table + pagination + '</div></section>';
  }

  function decorationUploadField(label, inputAttr, currentFile, kind) {
    var hasFile = !!currentFile;
    return '<div class="decoration-form-row decoration-media-row"><label class="decoration-row-label">' + label + ' <b>*</b></label>' +
      '<div class="decoration-row-control"><label class="decoration-upload ' + (hasFile ? 'has-file' : '') + '">' +
      '<input type="file" accept="image/*" ' + inputAttr + '>' +
      '<span class="decoration-upload-preview ' + kind + '-preview"><i>＋</i><small>' + (kind === 'banner' ? 'Banner' : kind === 'poster' ? '海报' : '图标') + '</small></span>' +
      '<span class="decoration-upload-copy"><span class="upload-action">选择图片</span><strong data-upload-name>' + escapeHTML(hasFile ? currentFile : '未选择图片') + '</strong><small>' + (kind === 'banner' ? '建议尺寸 750 × 360px，支持 JPG、PNG' : kind === 'poster' ? '建议尺寸 750 × 1334px，支持 JPG、PNG' : '建议尺寸 160 × 160px，支持 JPG、PNG') + '</small></span>' +
      '</label></div></div>';
  }

  function syncBannerTargetField(root) {
    var typeSelect = root.querySelector('[data-decoration-target-type]');
    var targetField = root.querySelector('[data-decoration-target-field]');
    var targetInput = root.querySelector('[data-decoration-target]');
    if (!typeSelect || !targetField || !targetInput) return;
    var noJump = typeSelect.value === '不跳转';
    targetField.hidden = noJump;
    targetInput.disabled = noJump;
    targetInput.required = !noJump;
    if (noJump) targetInput.value = '';
    else if (typeSelect.value === '商品详情') targetInput.placeholder = '请输入商品 ID，如 SPU1003821';
    else if (typeSelect.value === '活动页面') targetInput.placeholder = '请输入活动页面路径';
    else targetInput.placeholder = '请输入小程序页面路径';
  }

  function pageDecoration() {
    function actionCell(type, index, total, enabled) {
      return '<div class="decoration-actions">' +
        '<div class="decoration-sort">' +
        '<button class="button small quiet" type="button" data-decoration-action="up" data-decoration-type="' + type + '" data-row-index="' + index + '" ' + (index === 0 ? 'disabled' : '') + ' title="上移">↑</button>' +
        '<button class="button small quiet" type="button" data-decoration-action="down" data-decoration-type="' + type + '" data-row-index="' + index + '" ' + (index === total - 1 ? 'disabled' : '') + ' title="下移">↓</button>' +
        '<span class="decoration-rank">#' + (index + 1) + '</span>' +
        '</div>' +
        '<div class="decoration-ops">' +
        '<button class="link-action" type="button" data-decoration-action="edit" data-decoration-type="' + type + '" data-row-index="' + index + '">编辑</button>' +
        '<button class="link-action" type="button" data-decoration-action="toggle" data-decoration-type="' + type + '" data-row-index="' + index + '">' + (enabled ? '停用' : '启用') + '</button>' +
        '<button class="link-action danger" type="button" data-decoration-action="delete" data-decoration-type="' + type + '" data-row-index="' + index + '">删除</button>' +
        '</div></div>';
    }
    var bannerRows = bannerState.map(function (item, index) {
      return '<tr>' +
        '<td><span class="decoration-content"><span class="decoration-thumb banner-thumb" aria-hidden="true"></span><span><strong>' + escapeHTML(item.title) + '</strong><small>' + escapeHTML(item.media) + '</small></span></span></td>' +
        '<td><span class="decoration-target"><em>' + escapeHTML(item.targetType) + '</em><small>' + escapeHTML(item.target) + '</small></span></td>' +
        '<td>' + status(item.enabled ? '已启用' : '已停用', item.enabled ? 'filled' : 'dashed') + '</td>' +
        '<td>' + actionCell('banner', index, bannerState.length, item.enabled) + '</td></tr>';
    }).join('');
    var channelRows = channelState.map(function (item, index) {
      return '<tr>' +
        '<td><span class="decoration-content"><span class="decoration-thumb channel-thumb" aria-hidden="true"></span><span><strong>' + escapeHTML(item.name) + '</strong><small>' + escapeHTML(item.icon) + '</small></span></span></td>' +
        '<td><span class="decoration-path">' + escapeHTML(item.path || '—') + '</span></td>' +
        '<td>' + status(item.enabled ? '已启用' : '已停用', item.enabled ? 'filled' : 'dashed') + '</td>' +
        '<td>' + actionCell('channel', index, channelState.length, item.enabled) + '</td></tr>';
    }).join('');
    var activeTab = state.decorationTab === 'channel' ? 'channel' : 'banner';
    var createLabel = activeTab === 'banner' ? '新增 Banner' : '新增频道';
    var count = activeTab === 'banner' ? bannerState.length : channelState.length;
    var countLabel = activeTab === 'banner' ? '个 Banner' : '个快捷频道';
    var table = activeTab === 'banner'
      ? '<table class="data-table decoration-table banner-table"><thead><tr><th>Banner</th><th>跳转</th><th>状态</th><th>操作</th></tr></thead><tbody>' + (bannerRows || '<tr><td colspan="4" class="decoration-empty">暂无 Banner，点击右上角新增</td></tr>') + '</tbody></table>'
      : '<table class="data-table decoration-table channel-table"><thead><tr><th>快捷频道</th><th>跳转路径</th><th>状态</th><th>操作</th></tr></thead><tbody>' + (channelRows || '<tr><td colspan="4" class="decoration-empty">暂无快捷频道，点击右上角新增</td></tr>') + '</tbody></table>';
    return '<div class="decoration-page">' +
      '<section class="decoration-shell">' +
      '<header class="decoration-toolbar">' +
      '<nav class="decoration-tabs" aria-label="页面装修分类">' +
      '<button type="button" class="' + (activeTab === 'banner' ? 'active' : '') + '" data-decoration-tab="banner">Banner 管理</button>' +
      '<button type="button" class="' + (activeTab === 'channel' ? 'active' : '') + '" data-decoration-tab="channel">快捷商品频道</button>' +
      '</nav>' +
      '<button class="button primary" type="button" data-decoration-action="create" data-decoration-type="' + activeTab + '">' + createLabel + '</button>' +
      '</header>' +
      '<div class="decoration-body">' + table + '</div>' +
      '<footer class="decoration-foot"><span>共 <strong>' + count + '</strong> ' + countLabel + '</span><span>排序用 ↑↓ 调整，数字越小越靠前</span></footer>' +
      '</section></div>';
  }

  function openDecorationEditor(type, mode, index) {
    var isBanner = type === 'banner';
    var list = isBanner ? bannerState : channelState;
    var editing = mode === 'edit';
    var item = editing ? list[index] : (isBanner ? { title: '', media: '', targetType: '小程序页面', target: '', start: '', end: '', enabled: true } : { name: '', icon: '', path: '', enabled: true });
    openDrawer((editing ? '编辑' : '新增') + (isBanner ? ' Banner' : '快捷频道'), isBanner ? '页面装修 / Banner 管理' : '页面装修 / 快捷商品频道', [], '', editing ? '保存修改' : '确认新增');
    elements.drawer.querySelector('.operation-modal-card').classList.add('decoration-modal-card', isBanner ? 'banner-editor-modal' : 'channel-editor-modal');
    elements.drawer.querySelector('.operation-modal-card > footer [data-close-drawer]').textContent = '取消';
    if (isBanner) {
      elements.drawerBody.innerHTML = '<div class="decoration-editor decoration-standard-form banner-editor">' +
        decorationUploadField('Banner 图片', 'data-decoration-media', item.media, 'banner') +
        '<div class="decoration-form-row"><label class="decoration-row-label">Banner 标题 <b>*</b></label><div class="decoration-row-control"><input data-decoration-title value="' + escapeHTML(item.title) + '" placeholder="请输入 Banner 标题"></div></div>' +
        '<div class="decoration-form-row"><label class="decoration-row-label">跳转目标</label><div class="decoration-row-control"><input data-decoration-target value="' + escapeHTML(item.target === '—' ? '' : item.target) + '" placeholder="请输入小程序页面路径（选填）"><small>不填写则点击 Banner 不跳转</small></div></div>' +
        '<div class="decoration-form-row"><label class="decoration-row-label">启用状态</label><div class="decoration-row-control decoration-status-control"><label><input type="checkbox" data-decoration-enabled ' + (item.enabled ? 'checked' : '') + '> 启用</label><small>启用后在小程序首页展示</small></div></div>' +
        '</div>';
    } else {
      elements.drawerBody.innerHTML = '<div class="decoration-editor decoration-standard-form channel-editor">' +
        decorationUploadField('频道图标', 'data-decoration-icon', item.icon, 'channel') +
        '<div class="decoration-form-row"><label class="decoration-row-label">频道名称 <b>*</b></label><div class="decoration-row-control"><input data-decoration-name value="' + escapeHTML(item.name) + '" placeholder="请输入频道名称，如新品、护肤"></div></div>' +
        '<div class="decoration-form-row"><label class="decoration-row-label">跳转路径 <b>*</b></label><div class="decoration-row-control"><input data-decoration-path value="' + escapeHTML(item.path || '') + '" placeholder="请输入小程序页面路径，如 /pages/goods/list"><small>点击频道后跳转到该路径</small></div></div>' +
        '<div class="decoration-form-row"><label class="decoration-row-label">启用状态</label><div class="decoration-row-control decoration-status-control"><label><input type="checkbox" data-decoration-enabled ' + (item.enabled ? 'checked' : '') + '> 启用</label><small>启用后展示在小程序首页快捷频道区域</small></div></div>' +
        '</div>';
    }
    state.drawerAction = function () {
      var mediaInput;
      if (isBanner) {
        var titleInput = elements.drawerBody.querySelector('[data-decoration-title]');
        mediaInput = elements.drawerBody.querySelector('[data-decoration-media]');
        var title = titleInput.value.trim();
        var media = mediaInput.files[0] ? mediaInput.files[0].name : item.media;
        if (!title) {
          titleInput.focus();
          showToast('请填写 Banner 标题');
          return false;
        }
        if (!media) {
          showToast('请上传 Banner 图片');
          return false;
        }
        var target = elements.drawerBody.querySelector('[data-decoration-target]').value.trim();
        var savedBanner = { title: title, media: media, targetType: target ? (item.targetType === '不跳转' ? '小程序页面' : item.targetType || '小程序页面') : '不跳转', target: target || '—', start: '', end: '', enabled: elements.drawerBody.querySelector('[data-decoration-enabled]').checked };
        if (editing) bannerState[index] = savedBanner;
        else bannerState.push(savedBanner);
      } else {
        var nameInput = elements.drawerBody.querySelector('[data-decoration-name]');
        mediaInput = elements.drawerBody.querySelector('[data-decoration-icon]');
        var pathInput = elements.drawerBody.querySelector('[data-decoration-path]');
        var name = nameInput.value.trim();
        var icon = mediaInput.files[0] ? mediaInput.files[0].name : item.icon;
        var path = pathInput.value.trim();
        if (!name) {
          nameInput.focus();
          showToast('请填写频道名称');
          return false;
        }
        if (!icon) {
          showToast('请上传频道图标');
          return false;
        }
        if (!path) {
          pathInput.focus();
          showToast('请填写跳转路径');
          return false;
        }
        var savedChannel = { name: name, icon: icon, path: path, enabled: elements.drawerBody.querySelector('[data-decoration-enabled]').checked };
        if (editing) channelState[index] = savedChannel;
        else channelState.push(savedChannel);
      }
      refreshCurrentView();
      showToast((isBanner ? 'Banner' : '快捷频道') + (editing ? '已更新' : '已新增'));
      return true;
    };
  }

  function handleDecorationAction(button) {
    var type = button.dataset.decorationType;
    var action = button.dataset.decorationAction;
    var list = type === 'banner' ? bannerState : channelState;
    var index = Number(button.dataset.rowIndex);
    if (action === 'create') {
      openDecorationEditor(type, 'create');
      return;
    }
    if (action === 'edit') {
      openDecorationEditor(type, 'edit', index);
      return;
    }
    if (action === 'up' || action === 'down') {
      var nextIndex = action === 'up' ? index - 1 : index + 1;
      if (nextIndex >= 0 && nextIndex < list.length) {
        var current = list[index];
        list[index] = list[nextIndex];
        list[nextIndex] = current;
        refreshCurrentView();
        showToast('排序已更新');
      }
      return;
    }
    if (action === 'toggle') {
      list[index].enabled = !list[index].enabled;
      refreshCurrentView();
      showToast(list[index].enabled ? '已启用' : '已停用');
      return;
    }
    if (action === 'delete') {
      openConfirm('确认删除', '删除后该内容将不再在首页展示，确认继续？', function () {
        list.splice(index, 1);
        refreshCurrentView();
        showToast('已删除');
      });
    }
  }

  function taxBracketRow(start, end, rate) {
    return '<div class="tax-bracket-row" data-tax-bracket-row>' +
      '<div class="tax-bracket-input"><div class="input-with-unit"><input type="number" min="0" value="' + escapeHTML(start) + '" placeholder="0" aria-label="起始金额"><span>元</span></div></div>' +
      '<span class="tax-range-separator">至</span>' +
      '<div class="tax-bracket-input"><div class="input-with-unit"><input type="number" min="0" value="' + escapeHTML(end) + '" placeholder="不设上限" aria-label="结束金额"><span>元</span></div></div>' +
      '<div class="tax-bracket-input"><div class="input-with-unit"><input type="number" min="0" max="100" step="0.01" value="' + escapeHTML(rate) + '" placeholder="0" aria-label="税费比例"><span>%</span></div></div>' +
      '<button type="button" class="link-action danger" data-tax-bracket-remove>删除</button>' +
      '</div>';
  }

  function financeSettings() {
    var form = '<div class="finance-settings-layout">' +
      '<section class="finance-settings-section"><div class="finance-section-copy"><h3>分佣设置</h3><p>配置推客默认佣金及一层好友分佣比例</p></div>' +
      '<div class="finance-section-content"><div class="finance-setting-grid">' +
      '<div class="form-field"><label>全局默认佣金比例</label><div class="input-with-unit"><input type="number" min="0" max="100" value="10"><span>%</span></div><small>所有商品统一使用该比例</small></div>' +
      '<div class="form-field"><label>好友分佣比例</label><div class="input-with-unit"><input type="number" min="0" max="100" value="5"><span>%</span></div><small>设置为 0 时不产生新的好友分佣</small></div>' +
      '</div></div></section>' +
      '<section class="finance-settings-section"><div class="finance-section-copy"><h3>提现设置</h3><p>配置提现渠道、单笔及单日金额限制</p></div>' +
      '<div class="finance-section-content"><div class="finance-withdrawal-layout">' +
      '<div class="form-field full"><label>提现渠道</label><div class="withdrawal-channel-checks"><label><input type="checkbox" checked><span>微信零钱</span></label><label><input type="checkbox" checked><span>银行卡</span></label></div></div>' +
      '<div class="finance-limit-grid"><div class="form-field"><label>单笔最低金额</label><div class="input-with-unit"><input type="number" min="0" value="1"><span>元</span></div></div><div class="form-field"><label>单笔最高金额</label><div class="input-with-unit"><input type="number" min="0" value="1000"><span>元</span></div></div><div class="form-field"><label>单日最高金额</label><div class="input-with-unit"><input type="number" min="0" value="5000"><span>元</span></div></div></div>' +
      '<div class="form-field full"><label>到账说明</label><textarea>到账金额及处理进度以提现结果为准。</textarea></div>' +
      '</div></div></section>' +
      '<section class="finance-settings-section"><div class="finance-section-copy"><h3>税费梯度</h3><p>按用户当月累计提现金额匹配税费比例</p></div>' +
      '<div class="finance-section-content"><div class="tax-bracket-head"><strong>月度金额区间</strong><button type="button" class="button" data-tax-bracket-add>新增区间</button></div>' +
      '<div class="tax-bracket-list"><div class="tax-bracket-columns"><span>起始金额</span><span></span><span>结束金额</span><span>税费比例</span><span>操作</span></div><div data-tax-bracket-list>' + taxBracketRow('0', '5000', '0') + taxBracketRow('5000', '20000', '3') + taxBracketRow('20000', '', '10') + '</div></div>' +
      '<p class="tax-bracket-note">结束金额留空表示不设上限。</p></div></section></div>';
    return panel('财务设置', '设置变更只影响生效后的新业务，历史记录不重算', form, '<button class="button primary" data-confirm="保存财务设置">保存设置</button>');
  }

  function systemBasic() {
    var form = '<div class="basic-settings-form">' +
      '<section class="basic-setting-row"><div class="basic-setting-copy"><h3>企业微信客服</h3><p>配置小程序“官方客服”入口的跳转地址</p></div><div class="basic-setting-control"><label>企业微信客服跳转链接</label><input value="https://work.weixin.qq.com/kfid/kfcustomer_dailaixi" placeholder="请输入企业微信客服跳转链接"></div></section>' +
      '<section class="basic-setting-row"><div class="basic-setting-copy"><h3>业务开关</h3><p>控制小程序当前启用的业务能力</p></div><div class="basic-setting-control basic-setting-checks"><label><input type="checkbox" checked>支持自购</label><label><input type="checkbox" checked>启用邀请关系</label></div></section>' +
      '</div>';
    return panel('基础设置', '商品、直播、视频及素材内容仍在内容管理维护', form, '<button class="button primary" data-confirm="保存基础设置">保存</button>');
  }

  function shareSettings() {
    var posterRows = sharePosterState.map(function (poster, index) {
      return '<tr><td><span class="share-poster-info"><span class="share-poster-thumb">海报</span><span><strong>' + escapeHTML(poster.title) + '</strong><small>' + escapeHTML(poster.media) + '</small></span></span></td>' +
        '<td><div class="share-poster-sort"><button type="button" class="button small compact" data-share-poster-action="up" data-row-index="' + index + '" ' + (index === 0 ? 'disabled' : '') + ' aria-label="上移">↑</button><button type="button" class="button small compact" data-share-poster-action="down" data-row-index="' + index + '" ' + (index === sharePosterState.length - 1 ? 'disabled' : '') + ' aria-label="下移">↓</button><span>#' + (index + 1) + '</span></div></td>' +
        '<td>' + status(poster.enabled ? '已启用' : '已停用', poster.enabled ? 'filled' : 'dashed') + '</td>' +
        '<td><div class="table-actions"><button type="button" class="button small" data-share-poster-action="edit" data-row-index="' + index + '">编辑</button><button type="button" class="button small" data-share-poster-action="toggle" data-row-index="' + index + '">' + (poster.enabled ? '停用' : '启用') + '</button><button type="button" class="button small" data-share-poster-action="delete" data-row-index="' + index + '">删除</button></div></td></tr>';
    }).join('');
    return '<div class="share-settings-page">' +
      '<section class="share-setting-card share-copy-card"><header><div><h3>分享语</h3><p>配置用户分享邀请内容时默认带出的文案</p></div><button type="button" class="button primary" data-share-copy-save>保存分享语</button></header><div class="share-copy-body"><label for="share-copy-text">默认分享语</label><textarea id="share-copy-text" maxlength="120" data-share-copy-text placeholder="请输入默认分享语">' + escapeHTML(shareCopyState) + '</textarea><div><span>用户分享前仍可根据实际场景调整文案</span><span data-share-copy-count>' + shareCopyState.length + ' / 120</span></div></div></section>' +
      '<section class="share-setting-card share-poster-card"><header><div><h3>分享海报</h3><p>支持配置多张海报，用户分享时可选择使用</p></div><button type="button" class="button primary" data-share-poster-action="create">新增海报</button></header><div class="share-poster-table-wrap"><table class="data-table share-poster-table"><thead><tr><th>海报</th><th>排序</th><th>状态</th><th>操作</th></tr></thead><tbody>' + (posterRows || '<tr><td colspan="4" class="share-poster-empty">暂无分享海报，点击右上角新增</td></tr>') + '</tbody></table></div><footer>共 <strong>' + sharePosterState.length + '</strong> 张海报，排序越靠前越优先展示</footer></section>' +
      '</div>';
  }

  function openSharePosterEditor(index) {
    var editing = typeof index === 'number';
    var poster = editing ? sharePosterState[index] : { title: '', media: '', enabled: true };
    openDrawer(editing ? '编辑分享海报' : '新增分享海报', '系统设置 / 分享设置', [], '', editing ? '保存修改' : '确认新增');
    elements.drawer.querySelector('.operation-modal-card').classList.add('decoration-modal-card', 'share-poster-modal');
    elements.drawer.querySelector('.operation-modal-card > footer [data-close-drawer]').textContent = '取消';
    elements.drawerBody.innerHTML = '<div class="decoration-editor decoration-standard-form">' +
      decorationUploadField('海报图片', 'data-decoration-media', poster.media, 'poster') +
      '<div class="decoration-form-row"><label class="decoration-row-label">海报名称 <b>*</b></label><div class="decoration-row-control"><input data-share-poster-title maxlength="30" value="' + escapeHTML(poster.title) + '" placeholder="请输入便于运营识别的海报名称"></div></div>' +
      '<div class="decoration-form-row"><label class="decoration-row-label">启用状态</label><div class="decoration-row-control decoration-status-control"><label><input type="checkbox" data-share-poster-enabled ' + (poster.enabled ? 'checked' : '') + '> 启用</label><small>启用后用户可在分享页面选择该海报</small></div></div>' +
      '</div>';
    var posterTitleInput = elements.drawerBody.querySelector('[data-share-poster-title]');
    window.setTimeout(function () { if (posterTitleInput) posterTitleInput.focus(); }, 0);
    state.drawerAction = function () {
      var title = posterTitleInput.value.trim();
      var mediaInput = elements.drawerBody.querySelector('[data-decoration-media]');
      var media = mediaInput.files[0] ? mediaInput.files[0].name : poster.media;
      if (!title) {
        posterTitleInput.focus();
        showToast('请填写海报名称');
        return false;
      }
      if (!media) {
        showToast('请上传海报图片');
        return false;
      }
      var savedPoster = { title: title, media: media, enabled: elements.drawerBody.querySelector('[data-share-poster-enabled]').checked };
      if (editing) sharePosterState[index] = savedPoster;
      else sharePosterState.push(savedPoster);
      refreshCurrentView();
      showToast(editing ? '分享海报已更新' : '分享海报已新增');
      return true;
    };
  }

  function handleSharePosterAction(button) {
    var action = button.dataset.sharePosterAction;
    var index = Number(button.dataset.rowIndex);
    if (action === 'create') {
      openSharePosterEditor();
      return;
    }
    if (action === 'edit') {
      openSharePosterEditor(index);
      return;
    }
    if (action === 'up' || action === 'down') {
      var nextIndex = action === 'up' ? index - 1 : index + 1;
      if (nextIndex >= 0 && nextIndex < sharePosterState.length) {
        var currentPoster = sharePosterState[index];
        sharePosterState[index] = sharePosterState[nextIndex];
        sharePosterState[nextIndex] = currentPoster;
        refreshCurrentView();
        showToast('海报排序已更新');
      }
      return;
    }
    if (action === 'toggle') {
      sharePosterState[index].enabled = !sharePosterState[index].enabled;
      refreshCurrentView();
      showToast(sharePosterState[index].enabled ? '海报已启用' : '海报已停用');
      return;
    }
    if (action === 'delete') {
      openConfirm('确认删除分享海报', '删除后用户将无法再选择该海报，确认继续？', function () {
        sharePosterState.splice(index, 1);
        refreshCurrentView();
        showToast('分享海报已删除');
      });
    }
  }

  function genericFormPage(title) {
    return panel(title, '维护当前业务功能的配置与启用状态', '<div class="form-grid"><div class="form-field"><label>配置名称</label><input value="' + escapeHTML(title) + '"></div><div class="form-field"><label>状态</label><select><option>启用</option><option>停用</option></select></div><div class="form-field full"><label>业务说明</label><textarea>请输入该配置的适用范围和使用说明。</textarea></div></div>', '<button class="button primary" data-confirm="保存' + escapeHTML(title) + '">保存</button>');
  }

  function categoryManagement() {
    var selected = ensureSelectedPrimary();
    var secondaryList = selected ? secondaryCategoriesOf(selected.name) : [];
    var primaryItems = categoryState.map(function (item, index) {
      var childCount = secondaryCategoriesOf(item.name).length;
      var active = item.name === state.selectedPrimary;
      return '<div class="category-primary-card ' + (active ? 'active' : '') + '">' +
        '<button type="button" class="category-primary-item ' + (active ? 'active' : '') + '" data-select-primary="' + escapeHTML(item.name) + '">' +
        '<span class="category-primary-main"><span class="category-primary-icon">图</span><span><strong>' + escapeHTML(item.name) + '</strong><small>' + childCount + ' 个二级 · ' + productCountForPrimary(item.name) + ' 件商品</small></span></span>' +
        '<span class="category-primary-meta">' + status(item.visible ? '展示中' : '已隐藏', item.visible ? 'filled' : 'dashed') + '<em>#' + item.sort + '</em></span>' +
        '</button>' +
        (active ? '<div class="category-primary-actions active">' +
        '<button type="button" class="link-action" data-primary-action="edit" data-row-index="' + index + '">编辑</button>' +
        '<button type="button" class="link-action" data-primary-action="toggle" data-row-index="' + index + '">' + (item.visible ? '隐藏' : '展示') + '</button>' +
        '<button type="button" class="link-action" data-primary-action="up" data-row-index="' + index + '" ' + (index === 0 ? 'disabled' : '') + '>上移</button>' +
        '<button type="button" class="link-action" data-primary-action="down" data-row-index="' + index + '" ' + (index === categoryState.length - 1 ? 'disabled' : '') + '>下移</button>' +
        '</div>' : '') +
        '</div>';
    }).join('');
    var secondaryRows = secondaryList.map(function (item, index) {
      var globalIndex = secondaryCategoryState.indexOf(item);
      return '<tr>' +
        '<td><strong>' + escapeHTML(item.name) + '</strong><small class="cell-subtext">' + productCountForSecondary(item.parent, item.name) + ' 件商品</small></td>' +
        '<td><div class="decoration-sort"><button class="button small quiet" type="button" data-secondary-action="up" data-row-index="' + globalIndex + '" ' + (index === 0 ? 'disabled' : '') + '>↑</button><button class="button small quiet" type="button" data-secondary-action="down" data-row-index="' + globalIndex + '" ' + (index === secondaryList.length - 1 ? 'disabled' : '') + '>↓</button><span class="decoration-rank">#' + item.sort + '</span></div></td>' +
        '<td>' + status(item.visible ? '展示中' : '已隐藏', item.visible ? 'filled' : 'dashed') + '</td>' +
        '<td><div class="decoration-ops"><button class="link-action" type="button" data-secondary-action="edit" data-row-index="' + globalIndex + '">编辑</button><button class="link-action" type="button" data-secondary-action="toggle" data-row-index="' + globalIndex + '">' + (item.visible ? '隐藏' : '展示') + '</button><button class="link-action danger" type="button" data-secondary-action="delete" data-row-index="' + globalIndex + '">删除</button></div></td>' +
        '</tr>';
    }).join('');
    return '<div class="category-page"><section class="category-shell">' +
      '<header class="category-toolbar"><div><strong>分类与搜索</strong><small>左侧管理一级分类，右侧管理当前一级下的二级分类；商品归类在商品管理中设置</small></div>' +
      '<div class="category-toolbar-actions"><button class="button" type="button" data-command="create-primary-category">添加一级分类</button><button class="button primary" type="button" data-command="create-secondary-category" ' + (selected ? '' : 'disabled') + '>添加二级分类</button></div></header>' +
      '<div class="category-layout">' +
      '<aside class="category-primary-pane"><div class="category-pane-head"><span>一级分类</span><strong>' + categoryState.length + '</strong></div><div class="category-primary-list">' + (primaryItems || '<div class="category-empty">暂无一级分类</div>') + '</div></aside>' +
      '<section class="category-secondary-pane"><div class="category-pane-head"><div><span>二级分类</span><strong>' + escapeHTML(selected ? selected.name : '未选择') + '</strong></div><small>' + (selected ? (selected.keywords ? '搜索扩展词：' + escapeHTML(selected.keywords) : '未配置搜索扩展词') : '请先选择左侧一级分类') + '</small></div>' +
      '<div class="category-secondary-body"><table class="data-table category-secondary-table"><thead><tr><th>二级分类</th><th>排序</th><th>状态</th><th>操作</th></tr></thead><tbody>' +
      (secondaryRows || '<tr><td colspan="4" class="decoration-empty">' + (selected ? '该一级分类下暂无二级分类' : '请先选择一级分类') + '</td></tr>') +
      '</tbody></table></div></section></div></section></div>';
  }

  function renderView() {
    var key = state.module + ':' + state.sub;
    if (key === 'home:overview') return homeOverview();
    if (key === 'system:page') return pageDecoration();
    if (key === 'finance:settings') return financeSettings();
    if (key === 'system:basic') return systemBasic();
    if (key === 'system:share') return shareSettings();
    if (key === 'content:categories') return categoryManagement();
    if (tableConfigs[key]) return renderTable(key, tableConfigs[key]);
    return genericFormPage(currentModule().subs.find(function (sub) { return sub[0] === state.sub; })[1]);
  }

  function render() {
    var module = currentModule();
    if (!module.subs.some(function (sub) { return sub[0] === state.sub; })) state.sub = module.subs[0][0];
    renderPrimaryNav();
    elements.breadcrumbTitle.textContent = module.label;
    elements.pageContent.innerHTML = renderView();
  }

  function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () { elements.toast.classList.remove('show'); }, 1800);
  }

  function openDrawer(title, eyebrow, fields, note, saveLabel) {
    elements.drawer.querySelector('.operation-modal-card').classList.remove('account-modal-card', 'agreement-modal-card', 'decoration-modal-card', 'banner-editor-modal', 'channel-editor-modal', 'share-poster-modal', 'withdraw-review-modal', 'promoter-fans-modal', 'product-commission-modal', 'live-script-modal', 'video-sort-modal', 'circle-editor-modal', 'category-editor-modal', 'secondary-category-modal', 'category-products-modal', 'product-category-modal', 'help-editor-modal');
    elements.drawer.querySelector('.operation-modal-card > footer [data-close-drawer]').textContent = '关闭';
    elements.drawerTitle.textContent = title;
    elements.drawerEyebrow.textContent = eyebrow || '详情';
    elements.drawerBody.innerHTML = '<dl class="detail-list">' + fields.map(function (field) {
      return '<dt>' + escapeHTML(field[0]) + '</dt><dd>' + (field[2] === 'html' ? field[1] : escapeHTML(field[1])) + '</dd>';
    }).join('') + '</dl>' + (note ? '<div class="drawer-note">' + escapeHTML(note) + '</div>' : '');
    var confirm = document.querySelector('[data-drawer-confirm]');
    confirm.textContent = saveLabel || '保存';
    confirm.hidden = saveLabel === 'hidden';
    elements.drawer.classList.add('open');
    elements.drawer.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    elements.drawer.classList.remove('open');
    elements.drawer.setAttribute('aria-hidden', 'true');
    state.drawerAction = null;
  }

  function openRowDrawer(key, index) {
    var config = tableConfigs[key];
    var row = config.rows[index];
    var promoterColumns = ['推客', '收益人', '邀请人', '被邀请人', '用户'];
    var fields = config.columns.slice(0, -1).map(function (column, i) {
      if (key === 'orders:list' && i === 0) {
        var orderNumber = stripHTML(row[i]);
        return [column, '<span class="order-number-inline"><strong>' + escapeHTML(orderNumber) + '</strong><button type="button" class="inline-copy-button" data-copy="' + escapeHTML(orderNumber) + '">复制</button></span>', 'html'];
      }
      var keepPromoterCell = promoterColumns.indexOf(column) > -1 && String(row[i]).indexOf('promoter-entity') > -1;
      return [column, keepPromoterCell ? row[i] : stripHTML(row[i]), keepPromoterCell ? 'html' : 'text'];
    });
    var title = key === 'orders:list' ? '订单详情' : (stripHTML(row[0]) || config.title);
    var eyebrow = key === 'orders:list' ? '订单管理' : config.title;
    openDrawer(title, eyebrow, fields, '', row[row.length - 1] === '查看' ? 'hidden' : '保存');
    if (key === 'finance:withdrawals' && withdrawalReasons[index]) {
      elements.drawerBody.insertAdjacentHTML('beforeend', '<div class="withdraw-reject-detail"><strong>驳回原因</strong><p>' + escapeHTML(withdrawalReasons[index]) + '</p></div>');
    }
  }

  function syncPromoterRow(index) {
    var promoterUser = promoterState[index];
    var row = tableConfigs['promoter:list'].rows[index];
    if (!promoterUser || !row) return;
    row[4] = status(promoterUser.blocked ? '已封禁' : '正常', promoterUser.blocked ? 'dashed' : 'filled');
  }

  function openPromoterFans(index) {
    var promoterUser = promoterState[index];
    var promoterRow = tableConfigs['promoter:list'].rows[index];
    if (!promoterUser || !promoterRow) return;
    var fans = promoterFans[index] || [];
    var total = Number(stripHTML(promoterRow[6])) || 0;
    var commissionTotal = promoterFanCommissionTotals[index] || 0;
    openDrawer(promoterUser.name + '的直接粉丝', '推客管理 / 邀请关系', [], '', 'hidden');
    elements.drawer.querySelector('.operation-modal-card').classList.add('promoter-fans-modal');
    var rows = fans.map(function (fan) {
      return '<tr>' + fan.map(function (cell) { return '<td>' + cell + '</td>'; }).join('') + '</tr>';
    }).join('');
    var content = rows ? '<div class="table-wrap"><table class="data-table promoter-fans-table"><thead><tr><th>直接粉丝</th><th>邀请来源</th><th>关系状态</th><th>带来佣金</th><th>建立时间</th></tr></thead><tbody>' + rows + '</tbody></table></div>' : '<div class="promoter-fans-empty"><strong>暂无直接粉丝</strong><span>该用户尚未建立有效邀请关系</span></div>';
    elements.drawerBody.innerHTML = '<div class="promoter-fans-summary"><div><span>直接粉丝</span><strong>' + total + ' 人</strong></div><div><span>好友带来佣金</span><strong>¥' + commissionTotal.toFixed(2) + '</strong></div></div>' + content + (total > fans.length ? '<div class="promoter-fans-result-note">当前原型展示 ' + fans.length + ' 位，共 ' + total + ' 位</div>' : '');
  }

  function toggleWithdrawalReason(root) {
    var selected = root.querySelector('[data-withdraw-result]:checked');
    var reasonField = root.querySelector('[data-withdraw-reason-field]');
    if (!selected || !reasonField) return;
    reasonField.hidden = selected.value !== 'reject';
    if (!reasonField.hidden) window.setTimeout(function () {
      var input = reasonField.querySelector('[data-withdraw-reason]');
      if (input) input.focus();
    }, 0);
  }

  function openWithdrawalReview(indices, presetResult) {
    var validIndices = indices.filter(function (index) {
      var row = tableConfigs['finance:withdrawals'].rows[index];
      return row && stripHTML(row[6]) === '待处理';
    });
    if (!validIndices.length) {
      showToast('请选择待处理的提现申请');
      return;
    }
    var result = presetResult || '';
    var totalAmount = validIndices.reduce(function (sum, index) {
      var value = stripHTML(tableConfigs['finance:withdrawals'].rows[index][2]).replace(/[^\d.]/g, '');
      return sum + (Number(value) || 0);
    }, 0);
    var amountText = '¥' + totalAmount.toFixed(2);
    openDrawer(validIndices.length > 1 ? '批量审核提现' : '审核提现申请', '提现审核', [], '', '确认审核');
    elements.drawer.querySelector('.operation-modal-card').classList.add('withdraw-review-modal');
    elements.drawer.querySelector('.operation-modal-card > footer [data-close-drawer]').textContent = '取消';
    elements.drawerBody.innerHTML = '<div class="withdraw-review-form">' +
      '<div class="withdraw-review-summary"><span>本次审核</span><strong>' + validIndices.length + ' 笔</strong><small>申请金额合计：' + escapeHTML(amountText) + '</small></div>' +
      '<div class="form-field full"><label>审核结果 <b>*</b></label><div class="withdraw-review-choices">' +
      '<label><input type="radio" name="withdrawResult" value="approve" data-withdraw-result ' + (result === 'approve' ? 'checked' : '') + '><span><strong>通过</strong><small>通过后进入渠道处理</small></span></label>' +
      '<label><input type="radio" name="withdrawResult" value="reject" data-withdraw-result ' + (result === 'reject' ? 'checked' : '') + '><span><strong>驳回</strong><small>驳回后本次申请结束</small></span></label>' +
      '</div></div>' +
      '<div class="form-field full withdraw-reason-field" data-withdraw-reason-field ' + (result === 'reject' ? '' : 'hidden') + '><label>驳回原因 <b>*</b></label><textarea data-withdraw-reason maxlength="200" placeholder="请输入明确的驳回原因，用户可在提现记录中查看"></textarea><small>最多 200 字</small></div>' +
      '<p class="withdraw-review-note">审核提交后不可撤销，请确认申请信息与收款账户无误。</p>' +
      '</div>';
    state.drawerAction = function () {
      var checkedResult = elements.drawerBody.querySelector('[data-withdraw-result]:checked');
      var reviewResult = checkedResult ? checkedResult.value : '';
      var reasonInput = elements.drawerBody.querySelector('[data-withdraw-reason]');
      var reason = reasonInput ? reasonInput.value.trim() : '';
      if (!reviewResult) {
        showToast('请选择审核结果');
        return false;
      }
      if (reviewResult === 'reject' && !reason) {
        reasonInput.focus();
        showToast('请输入驳回原因');
        return false;
      }
      validIndices.forEach(function (index) {
        var row = tableConfigs['finance:withdrawals'].rows[index];
        if (reviewResult === 'approve') {
          row[6] = status('处理中', 'dashed');
          delete withdrawalReasons[index];
        } else {
          row[6] = status('已驳回', '');
          withdrawalReasons[index] = reason;
        }
        row[8] = '查看';
      });
      refreshCurrentView();
      showToast(validIndices.length + ' 笔提现申请已' + (reviewResult === 'approve' ? '通过' : '驳回'));
      return true;
    };
  }

  function agreementContentHTML(content) {
    return escapeHTML(content).split('\n').map(function (line) {
      if (!line) return '<span class="agreement-space"></span>';
      if (/^[一二三四五六七八九十]+、/.test(line)) return '<h3>' + line + '</h3>';
      return '<p>' + line + '</p>';
    }).join('');
  }

  function syncAgreementRow(index) {
    var agreement = agreementState[index];
    tableConfigs['system:agreements'].rows[index] = [
      agreement.name,
      agreement.version,
      agreement.scene,
      status('已生效', 'filled'),
      agreement.effectiveDate,
      agreement.reconfirm,
      '操作'
    ];
  }

  function openAgreementView(index) {
    var agreement = agreementState[index];
    openDrawer(agreement.name, '协议正文 · ' + agreement.version, [], '', 'hidden');
    elements.drawer.querySelector('.operation-modal-card').classList.add('agreement-modal-card');
    elements.drawerBody.innerHTML = '<article class="agreement-reader"><div class="agreement-meta"><span>版本 ' + escapeHTML(agreement.version) + '</span><span>生效时间 ' + escapeHTML(agreement.effectiveDate) + '</span></div><h2>' + escapeHTML(agreement.name) + '</h2><div class="agreement-content">' + agreementContentHTML(agreement.content) + '</div></article>';
  }

  function openAgreementEditor(index) {
    var agreement = agreementState[index];
    openDrawer('编辑' + agreement.name, '协议与隐私', [], '', '保存修改');
    elements.drawer.querySelector('.operation-modal-card').classList.add('agreement-modal-card');
    elements.drawer.querySelector('.operation-modal-card > footer [data-close-drawer]').textContent = '取消';
    elements.drawerBody.innerHTML = '<div class="agreement-editor"><div class="form-grid">' +
      '<div class="form-field"><label>协议名称 <b>*</b></label><input data-agreement-name value="' + escapeHTML(agreement.name) + '"></div>' +
      '<div class="form-field"><label>版本号 <b>*</b></label><input data-agreement-version value="' + escapeHTML(agreement.version) + '"></div>' +
      '<div class="form-field"><label>适用场景</label><input data-agreement-scene value="' + escapeHTML(agreement.scene) + '"></div>' +
      '<div class="form-field"><label>生效时间</label><input type="date" data-agreement-date value="' + escapeHTML(agreement.effectiveDate) + '"></div>' +
      '<div class="form-field full"><label>重新确认条件</label><input data-agreement-reconfirm value="' + escapeHTML(agreement.reconfirm) + '"></div>' +
      '<div class="form-field full"><label>协议正文 <b>*</b></label><textarea data-agreement-content>' + escapeHTML(agreement.content) + '</textarea></div>' +
      '</div></div>';
    state.drawerAction = function () {
      var nameInput = elements.drawerBody.querySelector('[data-agreement-name]');
      var versionInput = elements.drawerBody.querySelector('[data-agreement-version]');
      var contentInput = elements.drawerBody.querySelector('[data-agreement-content]');
      if (!nameInput.value.trim() || !versionInput.value.trim() || !contentInput.value.trim()) {
        showToast('请完善协议名称、版本号和协议正文');
        return false;
      }
      agreement.name = nameInput.value.trim();
      agreement.version = versionInput.value.trim();
      agreement.scene = elements.drawerBody.querySelector('[data-agreement-scene]').value.trim() || '—';
      agreement.effectiveDate = elements.drawerBody.querySelector('[data-agreement-date]').value || '—';
      agreement.reconfirm = elements.drawerBody.querySelector('[data-agreement-reconfirm]').value.trim() || '否';
      agreement.content = contentInput.value.trim();
      syncAgreementRow(index);
      refreshCurrentView();
      showToast('协议已更新');
      return true;
    };
  }

  function openConfirm(title, message, callback) {
    elements.modalTitle.textContent = title;
    elements.modalMessage.textContent = message;
    state.pendingAction = callback || function () { showToast('操作已完成'); };
    elements.modal.classList.add('open');
    elements.modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    elements.modal.classList.remove('open');
    elements.modal.setAttribute('aria-hidden', 'true');
  }

  function jump(target) {
    var parts = target.split(':');
    var module = modules.find(function (item) { return item.id === parts[0]; });
    if (!module) return;
    state.module = module.id;
    state.sub = parts[1] || module.subs[0][0];
    render();
  }

  function applyFilters(button) {
    var panelNode = button.closest('.panel');
    var keywordInput = panelNode.querySelector('[data-filter-keyword]');
    var statusSelect = panelNode.querySelector('[data-filter-status]');
    var storeSelect = panelNode.querySelector('[data-filter-store]');
    var primaryCategorySelect = panelNode.querySelector('[data-filter-primary-category]');
    var secondaryCategorySelect = panelNode.querySelector('[data-filter-secondary-category]');
    var keyword = keywordInput ? keywordInput.value.trim().toLowerCase() : '';
    var selected = statusSelect ? statusSelect.value : '';
    var selectedStore = storeSelect ? storeSelect.value.trim().toLowerCase() : '';
    var selectedPrimaryCategory = primaryCategorySelect ? primaryCategorySelect.value.trim().toLowerCase() : '';
    var selectedSecondaryCategory = secondaryCategorySelect ? secondaryCategorySelect.value.trim().toLowerCase() : '';
    var rows = panelNode.querySelectorAll('[data-search-row]');
    var visible = 0;
    rows.forEach(function (row) {
      var text = row.textContent.toLowerCase();
      var keywordMatch = !keyword || text.indexOf(keyword) >= 0;
      var statusMatch = !selected || selected.indexOf('全部') === 0 || text.indexOf(selected.toLowerCase()) >= 0;
      var storeMatch = !selectedStore || text.indexOf(selectedStore) >= 0;
      var primaryCategoryMatch = !selectedPrimaryCategory || text.indexOf(selectedPrimaryCategory) >= 0;
      var secondaryCategoryMatch = !selectedSecondaryCategory || text.indexOf(selectedSecondaryCategory) >= 0;
      row.hidden = !(keywordMatch && statusMatch && storeMatch && primaryCategoryMatch && secondaryCategoryMatch);
      if (!row.hidden) visible += 1;
    });
    showToast('筛选完成，共 ' + visible + ' 条');
  }

  function refreshCurrentView() {
    elements.pageContent.innerHTML = renderView();
  }

  function syncProductRow(index) {
    var product = productState[index];
    var row = tableConfigs['content:products'].rows[index];
    row[1] = productStore(product.store);
    row[2] = categoryTag(product.category, product.secondaryCategory);
    row[4] = productCommission(product.commissionRate, product.price);
    row[5] = status(product.listed ? '已上架' : '已下架', product.listed ? 'filled' : 'dashed');
    row[6] = product.recommended ? '已推荐 · 排序 ' + product.sort : '未推荐';
    row[7] = product.recommended ? escapeHTML(product.reason) : '—';
    row[8] = '刚刚';
  }

  function updateProductCommissionPreview(root) {
    var input = root.querySelector('[data-product-commission-rate]');
    var preview = root.querySelector('[data-product-commission-preview]');
    if (!input || !preview) return;
    var rate = Number(input.value);
    var price = Number(preview.dataset.price || 0);
    preview.textContent = input.value === '' || !isFinite(rate) ? '输入比例后自动计算' : '¥' + (price * rate / 100).toFixed(2);
  }

  function openProductCommissionEditor(indices) {
    var validIndices = indices.filter(function (index) { return !!productState[index]; });
    if (!validIndices.length) {
      showToast('请先选择需要修改的商品');
      return;
    }
    var isBatch = validIndices.length > 1;
    var firstIndex = validIndices[0];
    var firstProduct = productState[firstIndex];
    var firstRow = tableConfigs['content:products'].rows[firstIndex];
    var productNode = document.createElement('div');
    productNode.innerHTML = firstRow[0];
    var productNameNode = productNode.querySelector('strong');
    var productIdNode = productNode.querySelector('small');
    var productName = productNameNode ? productNameNode.textContent.trim() : stripHTML(firstRow[0]);
    var productId = productIdNode ? productIdNode.textContent.trim() : '';
    openDrawer(isBatch ? '批量修改预估佣金' : '调整预估佣金', '商品管理', [], '', '确认修改');
    elements.drawer.querySelector('.operation-modal-card').classList.add('product-commission-modal');
    elements.drawer.querySelector('.operation-modal-card > footer [data-close-drawer]').textContent = '取消';
    var summary = isBatch
      ? '<div class="product-commission-summary is-batch"><span class="product-summary-cover">批</span><div class="product-summary-copy"><span>批量调佣</span><strong>已选择 ' + validIndices.length + ' 件商品</strong><small>所选商品将统一使用本次设置的佣金比例</small></div></div>'
      : '<div class="product-commission-summary"><span class="product-summary-cover">商</span><div class="product-summary-copy"><span>当前商品</span><strong>' + escapeHTML(productName) + '</strong><small>' + escapeHTML(productId) + ' · ' + escapeHTML(firstProduct.store) + '</small></div><div class="product-summary-price"><span>商品售价</span><strong>¥' + firstProduct.price.toFixed(2) + '</strong></div></div>';
    var currentCommissionAmount = (firstProduct.price * firstProduct.commissionRate / 100).toFixed(2);
    elements.drawerBody.innerHTML = '<div class="product-commission-form">' +
      summary +
      '<section class="commission-setting-card"><div class="commission-setting-head"><h3>佣金调整</h3><span>比例范围 0–100%</span></div>' +
      '<div class="commission-current-grid"><div class="commission-current-item"><span>' + (isBatch ? '当前佣金比例' : '当前比例') + '</span><strong>' + (isBatch ? '以各商品现值为准' : firstProduct.commissionRate + '%') + '</strong></div><div class="commission-current-item"><span>' + (isBatch ? '计算方式' : '当前预估佣金') + '</span><strong>' + (isBatch ? '按各商品售价计算' : '¥' + currentCommissionAmount) + '</strong></div></div>' +
      '<div class="commission-edit-grid"><div class="commission-rate-block"><label>新佣金比例 <b>*</b></label><div class="commission-rate-control"><input type="number" min="0" max="100" step="0.01" data-product-commission-rate value="' + (isBatch ? '' : firstProduct.commissionRate) + '" placeholder="请输入比例"><span>%</span></div></div>' +
      '<div class="commission-output"><span>' + (isBatch ? '首件商品调整后预估' : '调整后预估佣金') + '</span><strong data-product-commission-preview data-price="' + firstProduct.price + '">' + (isBatch ? '待计算' : '¥' + currentCommissionAmount) + '</strong><small>' + (isBatch ? '其他商品按各自售价计算' : '商品售价 ¥' + firstProduct.price.toFixed(2)) + '</small></div></div></section>' +
      '<p class="product-commission-note"><span>i</span>修改仅影响生效后的新推广订单，历史订单继续保留原佣金快照。</p>' +
      '</div>';
    var rateInput = elements.drawerBody.querySelector('[data-product-commission-rate]');
    window.setTimeout(function () { if (rateInput) rateInput.focus(); }, 0);
    state.drawerAction = function () {
      var rate = Number(rateInput.value);
      if (rateInput.value === '' || !isFinite(rate) || rate < 0 || rate > 100) {
        rateInput.focus();
        showToast('请输入 0–100 之间的佣金比例');
        return false;
      }
      validIndices.forEach(function (index) {
        productState[index].commissionRate = Math.round(rate * 100) / 100;
        syncProductRow(index);
      });
      refreshCurrentView();
      showToast((isBatch ? validIndices.length + ' 件商品' : stripHTML(firstRow[0])) + '佣金已更新');
      return true;
    };
  }

  function liveNameAt(index) {
    var row = tableConfigs['content:live'].rows[index];
    if (!row) return '当前直播';
    var wrapper = document.createElement('div');
    wrapper.innerHTML = row[0];
    var nameNode = wrapper.querySelector('strong');
    return nameNode ? nameNode.textContent.trim() : stripHTML(row[0]);
  }

  function countLiveScripts(value) {
    return value.trim() ? value.trim().split(/\n\s*\n/).filter(function (item) { return item.trim(); }).length : 0;
  }

  function liveScriptsFromValue(value) {
    var scripts = value.trim() ? value.trim().split(/\n\s*\n/).map(function (item) { return item.trim(); }).filter(Boolean) : [];
    return scripts.length ? scripts : [''];
  }

  function liveScriptItem(value, index, removable) {
    return '<div class="live-script-item" data-live-script-row>' +
      '<div class="live-script-item-head"><strong>话术 ' + (index + 1) + '</strong>' +
      (removable ? '<button type="button" class="live-script-remove" data-live-script-remove aria-label="删除话术 ' + (index + 1) + '">删除</button>' : '') + '</div>' +
      '<textarea maxlength="200" data-live-script-item placeholder="请输入一条可直接复制使用的直播分享话术">' + escapeHTML(value) + '</textarea>' +
      '<div class="live-script-item-meta"><span data-live-script-item-count>' + value.length + ' / 200</span></div></div>';
  }

  function renderLiveScriptItems(root, scripts) {
    var list = root.querySelector('[data-live-script-list]');
    if (!list) return;
    var values = scripts && scripts.length ? scripts : [''];
    list.innerHTML = values.map(function (value, index) { return liveScriptItem(value, index, values.length > 1); }).join('');
    updateLiveScriptCount(root);
  }

  function collectLiveScripts(root) {
    return Array.from(root.querySelectorAll('[data-live-script-item]')).map(function (textarea) { return textarea.value.trim(); }).filter(Boolean);
  }

  function syncLiveRow(index) {
    var live = liveState[index];
    var row = tableConfigs['content:live'].rows[index];
    if (!live || !row) return;
    row[2] = status(live.listed ? '已上架' : '已下架', live.listed ? 'filled' : 'dashed');
    row[5] = live.scriptCount ? live.scriptCount + ' 条' : '未配置';
  }

  function syncVideoRow(index) {
    var video = videoState[index];
    var row = tableConfigs['content:video'].rows[index];
    if (!video || !row) return;
    row[3] = status(video.listed ? '已上架' : '已下架', video.listed ? 'filled' : 'dashed');
    row[4] = video.sort == null ? '—' : String(video.sort);
  }

  function videoNameAt(index) {
    var row = tableConfigs['content:video'].rows[index];
    if (!row) return '当前视频';
    var wrapper = document.createElement('div');
    wrapper.innerHTML = row[0];
    var nameNode = wrapper.querySelector('strong');
    return nameNode ? nameNode.textContent.trim() : stripHTML(row[0]);
  }

  function openVideoSortEditor(index) {
    var video = videoState[index];
    var row = tableConfigs['content:video'].rows[index];
    if (!video || !row) return;
    var videoName = videoNameAt(index);
    var currentSort = video.sort == null ? index + 1 : video.sort;
    openDrawer('修改视频排序', '视频管理', [], '', '确认修改');
    elements.drawer.querySelector('.operation-modal-card').classList.add('video-sort-modal');
    elements.drawer.querySelector('.operation-modal-card > footer [data-close-drawer]').textContent = '取消';
    elements.drawerBody.innerHTML = '<div class="video-sort-form">' +
      '<div class="video-sort-summary"><span class="video-sort-cover">视</span><div><span>当前视频</span><strong>' + escapeHTML(videoName) + '</strong><small>' + (video.listed ? '已上架' : '已下架') + '</small></div></div>' +
      '<div class="video-sort-field"><label for="video-sort-value">排序值 <b>*</b></label><input id="video-sort-value" type="number" min="1" max="999" step="1" data-video-sort-value value="' + currentSort + '"><small>数值越小，在推客端视频 Feed 中越靠前。</small></div>' +
      '</div>';
    var sortInput = elements.drawerBody.querySelector('[data-video-sort-value]');
    window.setTimeout(function () { if (sortInput) { sortInput.focus(); sortInput.select(); } }, 0);
    state.drawerAction = function () {
      var sortValue = Number(sortInput.value);
      if (!Number.isInteger(sortValue) || sortValue < 1 || sortValue > 999) {
        sortInput.focus();
        showToast('请输入 1–999 的整数排序值');
        return false;
      }
      video.sort = sortValue;
      syncVideoRow(index);
      var pairedVideos = videoState.map(function (item, itemIndex) {
        return { state: item, row: tableConfigs['content:video'].rows[itemIndex], originalIndex: itemIndex };
      });
      pairedVideos.sort(function (a, b) {
        var aSort = a.state.sort == null ? Number.MAX_SAFE_INTEGER : a.state.sort;
        var bSort = b.state.sort == null ? Number.MAX_SAFE_INTEGER : b.state.sort;
        return aSort === bSort ? a.originalIndex - b.originalIndex : aSort - bSort;
      });
      videoState.splice(0, videoState.length);
      tableConfigs['content:video'].rows.splice(0, tableConfigs['content:video'].rows.length);
      pairedVideos.forEach(function (pair) {
        videoState.push(pair.state);
        tableConfigs['content:video'].rows.push(pair.row);
      });
      refreshCurrentView();
      showToast(videoName + '排序已更新');
      return true;
    };
  }

  function updateLiveScriptCount(root) {
    var countNode = root.querySelector('[data-live-script-count]');
    var textareas = root.querySelectorAll('[data-live-script-item]');
    textareas.forEach(function (textarea) {
      var itemCount = textarea.closest('[data-live-script-row]').querySelector('[data-live-script-item-count]');
      if (itemCount) itemCount.textContent = textarea.value.length + ' / 200';
    });
    if (countNode) countNode.textContent = '共 ' + collectLiveScripts(root).length + ' 条';
  }

  function openLiveScriptEditor(index, publishAfterSave) {
    var live = liveState[index];
    var row = tableConfigs['content:live'].rows[index];
    if (!live || !row) return;
    var liveName = liveNameAt(index);
    var liveStatus = stripHTML(row[1]);
    openDrawer(publishAfterSave ? '配置分享话术并上架' : '编辑分享话术', '直播管理', [], '', publishAfterSave ? '保存并上架' : '保存话术');
    elements.drawer.querySelector('.operation-modal-card').classList.add('live-script-modal');
    elements.drawer.querySelector('.operation-modal-card > footer [data-close-drawer]').textContent = '取消';
    elements.drawerBody.innerHTML = '<div class="live-script-form">' +
      '<div class="live-script-summary"><span class="live-summary-cover">播</span><div class="live-summary-copy"><span>当前直播</span><strong>' + escapeHTML(liveName) + '</strong><small>' + escapeHTML(liveStatus) + ' · ' + (live.listed ? '已上架' : '已下架') + '</small></div></div>' +
      '<section class="live-script-editor"><div class="live-script-editor-head"><div><h3>分享话术 <b>*</b></h3><p>逐条维护，推客可在直播详情中选择复制</p></div><button type="button" class="button ai-generate-button" data-live-ai-generate data-row-index="' + index + '">AI 一键生成</button></div>' +
      '<div class="live-script-list" data-live-script-list></div>' +
      '<div class="live-script-meta"><button type="button" class="button small" data-live-script-add>＋ 添加一条</button><span data-live-script-count>共 0 条</span></div></section>' +
      '<p class="live-script-note"><span>i</span>上架后，推客可在直播详情页复制这些话术；下架不会删除已保存内容。</p>' +
      '</div>';
    renderLiveScriptItems(elements.drawerBody, liveScriptsFromValue(live.script));
    var scriptInput = elements.drawerBody.querySelector('[data-live-script-item]');
    window.setTimeout(function () { if (scriptInput) scriptInput.focus(); }, 0);
    state.drawerAction = function () {
      var scripts = collectLiveScripts(elements.drawerBody);
      if (!scripts.length) {
        var firstScriptInput = elements.drawerBody.querySelector('[data-live-script-item]');
        if (firstScriptInput) firstScriptInput.focus();
        showToast('上架前请至少配置一条分享话术');
        return false;
      }
      live.script = scripts.join('\n\n');
      live.scriptCount = scripts.length;
      if (publishAfterSave) live.listed = true;
      syncLiveRow(index);
      refreshCurrentView();
      showToast(publishAfterSave ? liveName + '已上架' : '分享话术已保存');
      return true;
    };
  }

  function syncCircleProductField(root) {
    var typeInput = root.querySelector('[data-circle-type]');
    var productField = root.querySelector('[data-circle-product-field]');
    var productInput = root.querySelector('[data-circle-product]');
    if (!typeInput || !productField || !productInput) return;
    var needsProduct = typeInput.value === '带货发圈';
    productField.hidden = !needsProduct;
    productInput.required = needsProduct;
    if (!needsProduct) productInput.value = '';
  }

  function updateCircleMaterialPreview(root) {
    var input = root.querySelector('[data-circle-material]');
    var nameNode = root.querySelector('[data-circle-material-name]');
    var previewNode = root.querySelector('[data-circle-material-preview]');
    if (!input || !nameNode || !previewNode) return;
    var count = input.files ? input.files.length : 0;
    nameNode.textContent = count ? '已选择 ' + count + ' 张图片' : '点击选择图片';
    previewNode.innerHTML = count ? materialImages(count) : '<span class="circle-upload-placeholder">图片素材</span>';
    input.closest('.circle-material-upload').classList.toggle('has-file', count > 0);
  }

  function openCircleEditor(index) {
    var editing = typeof index === 'number';
    var item = editing ? circleState[index] : {
      content: '',
      type: '带货发圈',
      materialCount: 0,
      product: '',
      productId: '',
      listed: false,
      sort: circleState.length + 1
    };
    openDrawer(editing ? '编辑内容' : '添加内容', '发圈与宣发', [], '', editing ? '保存修改' : '确认添加');
    elements.drawer.querySelector('.operation-modal-card').classList.add('circle-editor-modal');
    elements.drawer.querySelector('.operation-modal-card > footer [data-close-drawer]').textContent = '取消';
    elements.drawerBody.innerHTML = '<div class="circle-editor-form">' +
      '<section class="circle-editor-section"><div class="circle-editor-grid">' +
      '<div class="form-field"><label>内容类型 <b>*</b></label><select data-circle-type><option value="带货发圈" ' + (item.type === '带货发圈' ? 'selected' : '') + '>带货发圈</option><option value="宣发" ' + (item.type === '宣发' ? 'selected' : '') + '>宣发</option></select></div>' +
      '<div class="form-field"><label>上架状态</label><select data-circle-listed><option value="yes" ' + (item.listed ? 'selected' : '') + '>立即上架</option><option value="no" ' + (!item.listed ? 'selected' : '') + '>暂不上架</option></select></div>' +
      '<div class="form-field full"><label>发布文案 <b>*</b></label><textarea maxlength="500" data-circle-content placeholder="请输入需要展示的发圈或宣发文案">' + escapeHTML(item.content) + '</textarea></div>' +
      '</div></section>' +
      '<section class="circle-editor-section"><div class="circle-editor-grid">' +
      '<div class="form-field full"><label>图片素材 <b>*</b></label><label class="circle-material-upload"><input type="file" accept="image/*" multiple data-circle-material><span class="circle-material-preview" data-circle-material-preview>' + (item.materialCount ? materialImages(item.materialCount) : '<span class="circle-upload-placeholder">图片素材</span>') + '</span><span class="circle-material-copy"><strong data-circle-material-name>' + (item.materialCount ? '当前共 ' + item.materialCount + ' 张图片' : '点击选择图片') + '</strong><small>支持多张图片；列表以缩略图组展示</small></span></label></div>' +
      '<div class="form-field full circle-product-field" data-circle-product-field><label>绑定商品 <b>*</b></label><select data-circle-product><option value="">请选择商品</option><option value="臻润修护精华套装|SPU 1003821" ' + (item.productId === 'SPU 1003821' ? 'selected' : '') + '>臻润修护精华套装 · SPU 1003821</option><option value="焕亮水乳护肤礼盒|SPU 1003816" ' + (item.productId === 'SPU 1003816' ? 'selected' : '') + '>焕亮水乳护肤礼盒 · SPU 1003816</option></select><small>带货发圈必须绑定一个商品；宣发内容不绑定商品。</small></div>' +
      '</div></section>' +
      '</div>';
    syncCircleProductField(elements.drawerBody);
    var contentInput = elements.drawerBody.querySelector('[data-circle-content]');
    window.setTimeout(function () { if (contentInput) contentInput.focus(); }, 0);
    state.drawerAction = function () {
      var type = elements.drawerBody.querySelector('[data-circle-type]').value;
      var content = contentInput.value.trim();
      var productValue = elements.drawerBody.querySelector('[data-circle-product]').value;
      var materialInput = elements.drawerBody.querySelector('[data-circle-material]');
      var selectedMaterialCount = materialInput.files ? materialInput.files.length : 0;
      if (!content) {
        contentInput.focus();
        showToast('请输入发布文案');
        return false;
      }
      if (!selectedMaterialCount && !item.materialCount) {
        showToast('请至少选择一张图片素材');
        return false;
      }
      if (type === '带货发圈' && !productValue) {
        elements.drawerBody.querySelector('[data-circle-product]').focus();
        showToast('带货发圈需要绑定商品');
        return false;
      }
      var productParts = productValue ? productValue.split('|') : ['', ''];
      var savedItem = {
        id: editing ? item.id : (type === '带货发圈' ? 'FQ-' : 'XF-') + Date.now(),
        content: content,
        type: type,
        materialCount: selectedMaterialCount || item.materialCount,
        product: type === '带货发圈' ? productParts[0] : '',
        productId: type === '带货发圈' ? productParts[1] : '',
        listed: elements.drawerBody.querySelector('[data-circle-listed]').value === 'yes',
        sort: editing ? item.sort : circleState.length + 1,
        updated: '刚刚'
      };
      if (editing) circleState[index] = savedItem;
      else {
        circleState.push(savedItem);
        tableTotals['content:circle'] += 1;
      }
      syncCircleRows();
      refreshCurrentView();
      showToast(editing ? '内容已更新' : '内容已添加');
      return true;
    };
  }

  function productNameAt(index) {
    var row = tableConfigs['content:products'].rows[index];
    var holder = document.createElement('div');
    holder.innerHTML = row ? row[0] : '';
    var nameNode = holder.querySelector('strong');
    var idNode = holder.querySelector('small');
    return { name: nameNode ? nameNode.textContent.trim() : '商品', id: idNode ? idNode.textContent.trim() : '' };
  }

  function categoryOptions(selected) {
    return '<option value="">请选择一级分类</option>' + categoryState.map(function (item) {
      return '<option value="' + escapeHTML(item.name) + '" ' + (item.name === selected ? 'selected' : '') + '>' + escapeHTML(item.name) + (item.visible ? '' : '（已隐藏）') + '</option>';
    }).join('');
  }

  function secondaryCategoryOptions(primaryName, selected) {
    var options = secondaryCategoriesOf(primaryName);
    if (!primaryName) return '<option value="">请先选择一级分类</option>';
    if (!options.length) return '<option value="">该一级分类下暂无二级分类</option>';
    return '<option value="">请选择二级分类</option>' + options.map(function (item) {
      return '<option value="' + escapeHTML(item.name) + '" ' + (item.name === selected ? 'selected' : '') + '>' + escapeHTML(item.name) + (item.visible ? '' : '（已隐藏）') + '</option>';
    }).join('');
  }

  function syncProductCategorySecondaryOptions(root) {
    var primarySelect = root.querySelector('[data-product-primary-category]');
    var secondarySelect = root.querySelector('[data-product-secondary-category]');
    if (!primarySelect || !secondarySelect) return;
    secondarySelect.innerHTML = secondaryCategoryOptions(primarySelect.value, '');
  }

  function openProductCategoryEditor(indices) {
    var validIndices = indices.filter(function (index) { return !!productState[index]; });
    if (!validIndices.length) {
      showToast('请先选择需要设置分类的商品');
      return;
    }
    var first = productState[validIndices[0]];
    var samePrimary = validIndices.every(function (index) { return (productState[index].category || '') === (first.category || ''); });
    var sameSecondary = samePrimary && validIndices.every(function (index) { return (productState[index].secondaryCategory || '') === (first.secondaryCategory || ''); });
    var primaryValue = samePrimary ? (first.category || '') : '';
    var secondaryValue = sameSecondary ? (first.secondaryCategory || '') : '';
    openDrawer(validIndices.length > 1 ? '批量设置商品分类' : '设置商品分类', '商品管理', [], '', '确认设置');
    elements.drawer.querySelector('.operation-modal-card').classList.add('product-category-modal');
    elements.drawer.querySelector('.operation-modal-card > footer [data-close-drawer]').textContent = '取消';
    elements.drawerBody.innerHTML = '<div class="product-category-form"><div class="product-category-summary"><span>已选择商品</span><strong>' + validIndices.length + ' 件</strong><small>商品归属一个一级分类及其下的一个二级分类</small></div>' +
      '<div class="form-field full"><label>一级分类 <b>*</b></label><select data-product-primary-category>' + categoryOptions(primaryValue) + '</select></div>' +
      '<div class="form-field full"><label>二级分类 <b>*</b></label><select data-product-secondary-category>' + secondaryCategoryOptions(primaryValue, secondaryValue) + '</select></div></div>';
    state.drawerAction = function () {
      var nextPrimary = elements.drawerBody.querySelector('[data-product-primary-category]').value;
      var nextSecondary = elements.drawerBody.querySelector('[data-product-secondary-category]').value;
      if (!nextPrimary) {
        showToast('请选择一级分类');
        return false;
      }
      if (!nextSecondary) {
        showToast('请选择二级分类');
        return false;
      }
      validIndices.forEach(function (productIndex) {
        productState[productIndex].category = nextPrimary;
        productState[productIndex].secondaryCategory = nextSecondary;
        syncProductRow(productIndex);
      });
      refreshCurrentView();
      showToast('商品分类已更新');
      return true;
    };
  }

  function openCategoryEditor(index) {
    var editing = typeof index === 'number';
    var item = editing ? categoryState[index] : { name: '', icon: '', keywords: '', visible: true, sort: categoryState.length + 1 };
    openDrawer(editing ? '编辑一级分类' : '添加一级分类', '分类与搜索', [], '', editing ? '保存修改' : '确认添加');
    elements.drawer.querySelector('.operation-modal-card').classList.add('category-editor-modal');
    elements.drawer.querySelector('.operation-modal-card > footer [data-close-drawer]').textContent = '取消';
    elements.drawerBody.innerHTML = '<div class="category-editor-form">' +
      '<div class="category-form-main"><div class="form-field"><label>一级分类名称 <b>*</b></label><input data-category-name maxlength="12" value="' + escapeHTML(item.name) + '" placeholder="请输入一级分类名称"></div>' +
      '<div class="form-field"><label>排序</label><input type="number" min="1" data-category-sort value="' + item.sort + '"></div>' +
      '<div class="form-field full"><label>搜索扩展词</label><input data-category-keywords value="' + escapeHTML(item.keywords || '') + '" placeholder="多个关键词用顿号或逗号分隔"><small>用于商品搜索召回，不替代二级分类。</small></div></div>' +
      '<div class="category-form-side"><div class="form-field full"><label>分类图标 <b>*</b></label><label class="category-icon-upload"><input type="file" accept="image/*" data-category-icon><span class="category-icon-large">图</span><span><strong data-category-icon-name>' + escapeHTML(item.icon || '选择图片') + '</strong><small>建议使用 1:1 图片</small></span></label></div>' +
      '<label class="category-visible-control"><input type="checkbox" data-category-visible ' + (item.visible ? 'checked' : '') + '><span><strong>在小程序展示</strong><small>隐藏后一级入口及其二级分类不再展示，已归类商品保留</small></span></label></div>' +
      '</div>';
    var nameInput = elements.drawerBody.querySelector('[data-category-name]');
    window.setTimeout(function () { if (nameInput) nameInput.focus(); }, 0);
    state.drawerAction = function () {
      var name = nameInput.value.trim();
      var iconInput = elements.drawerBody.querySelector('[data-category-icon]');
      var icon = iconInput.files && iconInput.files[0] ? iconInput.files[0].name : item.icon;
      if (!name) {
        nameInput.focus();
        showToast('请输入一级分类名称');
        return false;
      }
      if (categoryState.some(function (categoryItem, categoryIndex) { return categoryIndex !== index && categoryItem.name === name; })) {
        nameInput.focus();
        showToast('一级分类名称已存在');
        return false;
      }
      if (!icon) {
        showToast('请上传分类图标');
        return false;
      }
      var previousName = item.name;
      var savedCategory = {
        name: name,
        icon: icon,
        keywords: elements.drawerBody.querySelector('[data-category-keywords]').value.trim(),
        visible: elements.drawerBody.querySelector('[data-category-visible]').checked,
        sort: Number(elements.drawerBody.querySelector('[data-category-sort]').value) || categoryState.length + 1,
        updated: '刚刚'
      };
      if (editing) categoryState[index] = savedCategory;
      else categoryState.push(savedCategory);
      if (editing && previousName && previousName !== name) {
        secondaryCategoryState.forEach(function (secondary) {
          if (secondary.parent === previousName) secondary.parent = name;
        });
        productState.forEach(function (product, productIndex) {
          if (product.category === previousName) {
            product.category = name;
            syncProductRow(productIndex);
          }
        });
        if (state.selectedPrimary === previousName) state.selectedPrimary = name;
      } else if (!editing) {
        state.selectedPrimary = name;
      }
      reindexPrimaryCategories();
      refreshCurrentView();
      showToast(editing ? '一级分类已更新' : '一级分类已添加');
      return true;
    };
  }

  function openSecondaryCategoryEditor(index) {
    var editing = typeof index === 'number';
    var selectedPrimary = ensureSelectedPrimary();
    if (!selectedPrimary && !editing) {
      showToast('请先添加一级分类');
      return;
    }
    var item = editing ? secondaryCategoryState[index] : { name: '', parent: selectedPrimary.name, visible: true, sort: secondaryCategoriesOf(selectedPrimary.name).length + 1 };
    openDrawer(editing ? '编辑二级分类' : '添加二级分类', '分类与搜索 / ' + item.parent, [], '', editing ? '保存修改' : '确认添加');
    elements.drawer.querySelector('.operation-modal-card').classList.add('category-editor-modal', 'secondary-category-modal');
    elements.drawer.querySelector('.operation-modal-card > footer [data-close-drawer]').textContent = '取消';
    elements.drawerBody.innerHTML = '<div class="secondary-category-form">' +
      '<div class="form-field"><label>所属一级分类 <b>*</b></label><select data-secondary-parent>' + categoryState.map(function (primary) {
        return '<option value="' + escapeHTML(primary.name) + '" ' + (primary.name === item.parent ? 'selected' : '') + '>' + escapeHTML(primary.name) + '</option>';
      }).join('') + '</select></div>' +
      '<div class="form-field"><label>二级分类名称 <b>*</b></label><input data-secondary-name maxlength="12" value="' + escapeHTML(item.name) + '" placeholder="请输入二级分类名称"></div>' +
      '<div class="form-field"><label>排序</label><input type="number" min="1" data-secondary-sort value="' + item.sort + '"></div>' +
      '<label class="category-visible-control"><input type="checkbox" data-secondary-visible ' + (item.visible ? 'checked' : '') + '><span><strong>在小程序展示</strong><small>隐藏后该二级入口不再展示，已归类商品保留</small></span></label>' +
      '</div>';
    var nameInput = elements.drawerBody.querySelector('[data-secondary-name]');
    window.setTimeout(function () { if (nameInput) nameInput.focus(); }, 0);
    state.drawerAction = function () {
      var parent = elements.drawerBody.querySelector('[data-secondary-parent]').value;
      var name = nameInput.value.trim();
      if (!parent) {
        showToast('请选择所属一级分类');
        return false;
      }
      if (!name) {
        nameInput.focus();
        showToast('请输入二级分类名称');
        return false;
      }
      if (secondaryCategoryState.some(function (secondary, secondaryIndex) {
        return secondaryIndex !== index && secondary.parent === parent && secondary.name === name;
      })) {
        nameInput.focus();
        showToast('同一级分类下二级名称不可重复');
        return false;
      }
      var previousParent = item.parent;
      var previousName = item.name;
      var savedSecondary = {
        name: name,
        parent: parent,
        visible: elements.drawerBody.querySelector('[data-secondary-visible]').checked,
        sort: Number(elements.drawerBody.querySelector('[data-secondary-sort]').value) || secondaryCategoriesOf(parent).length + 1,
        updated: '刚刚'
      };
      if (editing) secondaryCategoryState[index] = savedSecondary;
      else secondaryCategoryState.push(savedSecondary);
      if (editing && (previousParent !== parent || previousName !== name)) {
        productState.forEach(function (product, productIndex) {
          if (product.category === previousParent && product.secondaryCategory === previousName) {
            product.category = parent;
            product.secondaryCategory = name;
            syncProductRow(productIndex);
          }
        });
      }
      if (previousParent) reindexSecondaryCategories(previousParent);
      if (parent !== previousParent) reindexSecondaryCategories(parent);
      state.selectedPrimary = parent;
      refreshCurrentView();
      showToast(editing ? '二级分类已更新' : '二级分类已添加');
      return true;
    };
  }

  function syncHelpEditorType(root) {
    var typeInput = root.querySelector('[data-help-type]');
    var formatField = root.querySelector('[data-help-format-field]');
    var titleLabel = root.querySelector('[data-help-title-label]');
    var contentLabel = root.querySelector('[data-help-content-label]');
    if (!typeInput || !formatField) return;
    var isTutorial = typeInput.value === '推客教程';
    formatField.hidden = !isTutorial;
    if (titleLabel) titleLabel.textContent = isTutorial ? '教程标题' : '问题';
    if (contentLabel) contentLabel.textContent = isTutorial ? '教程内容' : '答案';
  }

  function openHelpEditor(index) {
    var editing = typeof index === 'number';
    var item = editing ? helpState[index] : { title: '', type: '推客教程', category: '新人入门', format: '图文', content: '', published: false, sort: helpState.length + 1 };
    openDrawer(editing ? '编辑教程与帮助' : '添加教程与帮助', '教程与帮助', [], '', editing ? '保存修改' : '确认添加');
    elements.drawer.querySelector('.operation-modal-card').classList.add('help-editor-modal');
    elements.drawer.querySelector('.operation-modal-card > footer [data-close-drawer]').textContent = '取消';
    elements.drawerBody.innerHTML = '<div class="help-editor-form"><section class="help-editor-section"><div class="help-editor-grid">' +
      '<div class="form-field"><label>内容类型 <b>*</b></label><select data-help-type><option value="推客教程" ' + (item.type === '推客教程' ? 'selected' : '') + '>推客教程</option><option value="帮助中心" ' + (item.type === '帮助中心' ? 'selected' : '') + '>帮助中心</option></select></div>' +
      '<div class="form-field"><label>分类 <b>*</b></label><input data-help-category value="' + escapeHTML(item.category) + '" placeholder="例如：新人入门、关于订单"></div>' +
      '<div class="form-field full"><label><span data-help-title-label>教程标题</span> <b>*</b></label><input data-help-title maxlength="60" value="' + escapeHTML(item.title) + '" placeholder="请输入标题或问题"></div>' +
      '<div class="form-field" data-help-format-field><label>内容形式</label><select data-help-format><option value="图文" ' + (item.format === '图文' ? 'selected' : '') + '>图文</option><option value="视频" ' + (item.format === '视频' ? 'selected' : '') + '>视频</option></select></div>' +
      '<div class="form-field full"><label><span data-help-content-label>教程内容</span> <b>*</b></label><textarea data-help-content maxlength="2000" placeholder="请输入教程正文或 FAQ 答案">' + escapeHTML(item.content) + '</textarea></div>' +
      '</div></section><label class="help-publish-control"><input type="checkbox" data-help-published ' + (item.published ? 'checked' : '') + '><span><strong>保存后发布</strong><small>关闭时内容保存为下架状态，不在小程序展示</small></span></label></div>';
    syncHelpEditorType(elements.drawerBody);
    var titleInput = elements.drawerBody.querySelector('[data-help-title]');
    window.setTimeout(function () { if (titleInput) titleInput.focus(); }, 0);
    state.drawerAction = function () {
      var type = elements.drawerBody.querySelector('[data-help-type]').value;
      var title = titleInput.value.trim();
      var category = elements.drawerBody.querySelector('[data-help-category]').value.trim();
      var content = elements.drawerBody.querySelector('[data-help-content]').value.trim();
      if (!title || !category || !content) {
        showToast('请填写标题、分类和内容');
        return false;
      }
      var savedHelp = {
        id: editing ? item.id : (type === '推客教程' ? 'T-' : 'Q-') + Date.now(),
        title: title,
        type: type,
        category: category,
        format: type === '推客教程' ? elements.drawerBody.querySelector('[data-help-format]').value : '问答',
        content: content,
        published: elements.drawerBody.querySelector('[data-help-published]').checked,
        sort: editing ? item.sort : helpState.length + 1,
        updated: '刚刚'
      };
      if (editing) helpState[index] = savedHelp;
      else {
        helpState.push(savedHelp);
        tableTotals['content:help'] += 1;
      }
      syncHelpRows();
      refreshCurrentView();
      showToast(editing ? '内容已更新' : '内容已添加');
      return true;
    };
  }

  function openRecommendationDrawer(index) {
    var row = tableConfigs['content:products'].rows[index];
    var product = productState[index];
    var defaultSort = product.sort || productState.filter(function (item) { return item.recommended; }).length + 1;
    openDrawer('设置首页推荐', '商品管理', [['商品', stripHTML(row[0])], ['当前状态', '已上架']], '', '保存推荐');
    elements.drawerBody.insertAdjacentHTML('beforeend', '<div class="form-section recommendation-form"><div class="form-field full"><label>推荐文案 <b>*</b></label><textarea data-recommend-copy maxlength="80" placeholder="请输入面向推客展示的推荐理由，如适用人群、使用场景或核心卖点">' + escapeHTML(product.reason) + '</textarea><small>展示在首页热门商品卡底部，建议控制在 40 字以内。</small></div><div class="form-field"><label>推荐排序</label><input type="number" min="1" data-recommend-sort value="' + defaultSort + '"></div></div>');
    state.drawerAction = function () {
      var copyInput = elements.drawerBody.querySelector('[data-recommend-copy]');
      var sortInput = elements.drawerBody.querySelector('[data-recommend-sort]');
      var copy = copyInput.value.trim();
      if (!copy) {
        copyInput.focus();
        showToast('请填写推荐文案');
        return false;
      }
      product.recommended = true;
      product.reason = copy;
      product.sort = Number(sortInput.value) || 1;
      syncProductRow(index);
      refreshCurrentView();
      showToast('商品已设为首页推荐');
      return true;
    };
  }

  function maskPhone(value) {
    var phone = String(value || '').trim();
    return /^\d{11}$/.test(phone) ? phone.slice(0, 3) + '****' + phone.slice(7) : phone;
  }

  function menuPermissionSummary(selectedMenus) {
    var selectedModuleCount = modules.filter(function (item) {
      return item.subs.some(function (sub) { return selectedMenus.indexOf(item.id + ':' + sub[0]) > -1; });
    }).length;
    return selectedModuleCount === modules.length ? '全部菜单' : selectedModuleCount + ' 个一级菜单';
  }

  function menuPermissionFields(selectedMenus) {
    return modules.map(function (item) {
      var selected = item.subs.some(function (sub) { return selectedMenus.indexOf(item.id + ':' + sub[0]) > -1; });
      return '<label class="permission-module"><input type="checkbox" data-module-permission="' + item.id + '" ' + (selected ? 'checked' : '') + '><strong>' + item.label + '</strong></label>';
    }).join('');
  }

  function syncPermissionStates(root) {
    var allMenus = Array.from(root.querySelectorAll('[data-module-permission]'));
    var selectedMenus = allMenus.filter(function (input) { return input.checked; });
    var allInput = root.querySelector('[data-permission-all]');
    if (allInput) {
      allInput.checked = selectedMenus.length === allMenus.length;
      allInput.indeterminate = selectedMenus.length > 0 && selectedMenus.length < allMenus.length;
    }
  }

  function syncAccountRow(index) {
    var account = accountState[index];
    tableConfigs['accounts:users'].rows[index] = [
      entity(account.nickname || account.login, account.phone, account.avatar || '头'),
      menuPermissionSummary(account.menus),
      status(account.blocked ? '已封禁' : '正常', account.blocked ? 'dashed' : 'filled'),
      account.lastLogin,
      '操作'
    ];
  }

  function openAccountDrawer(mode, index) {
    var editing = mode === 'edit';
    var account = editing ? accountState[index] : { login: '', phone: '', blocked: false, menus: [] };
    openDrawer(editing ? '编辑账户' : '添加账户', '账户管理', [], '', editing ? '保存修改' : '确认添加');
    elements.drawer.querySelector('.operation-modal-card').classList.add('account-modal-card');
    elements.drawer.querySelector('.operation-modal-card > footer [data-close-drawer]').textContent = '取消';
    elements.drawerBody.innerHTML = '<div class="account-form"><div class="form-section"><div class="form-grid account-basic-grid ' + (editing ? 'has-status' : '') + '">' +
      '<div class="form-field"><label>账户名称 <b>*</b></label><input data-account-login value="' + escapeHTML(account.login) + '" placeholder="请输入账户名称"></div>' +
      '<div class="form-field"><label>手机号 <b>*</b></label><input data-account-phone value="' + escapeHTML(account.phone) + '" placeholder="请输入手机号"></div>' +
      (editing ? '<div class="form-field"><label>当前状态</label><input value="' + (account.blocked ? '已封禁' : '正常') + '" disabled></div>' : '') +
      '</div></div><div class="form-section"><div class="permission-section-head"><div><h3>一级菜单权限 <b>*</b></h3><p class="section-hint">选中一级菜单后，可访问该模块下的全部页面。</p></div><label class="permission-all"><input type="checkbox" data-permission-all>全选菜单</label></div><div class="permission-list">' + menuPermissionFields(account.menus) + '</div></div></div>';
    syncPermissionStates(elements.drawerBody);
    state.drawerAction = function () {
      var loginInput = elements.drawerBody.querySelector('[data-account-login]');
      var phoneInput = elements.drawerBody.querySelector('[data-account-phone]');
      var login = loginInput.value.trim();
      var phone = phoneInput.value.trim();
      var selectedModules = Array.from(elements.drawerBody.querySelectorAll('[data-module-permission]:checked')).map(function (input) { return input.dataset.modulePermission; });
      var selectedMenus = menuKeysFor(selectedModules);
      if (!login) {
        loginInput.focus();
        showToast('请输入账户名称');
        return false;
      }
      if (!phone) {
        phoneInput.focus();
        showToast('请输入手机号');
        return false;
      }
      if (!selectedMenus.length) {
        elements.drawerBody.querySelector('.permission-list').scrollIntoView({ block: 'start' });
        showToast('请至少选择一个可访问菜单');
        return false;
      }
      var duplicate = accountState.some(function (item, itemIndex) { return item.login === login && itemIndex !== index; });
      if (duplicate) {
        loginInput.focus();
        showToast('账户名称已存在');
        return false;
      }
      if (editing) {
        account.login = login;
        account.phone = maskPhone(phone);
        account.menus = selectedMenus;
        syncAccountRow(index);
        showToast('账户已更新');
      } else {
        var nextId = 'A' + String(Date.now()).slice(-4);
        accountState.push({ id: nextId, login: login, nickname: login, avatar: '头', phone: maskPhone(phone), blocked: false, lastLogin: '—', menus: selectedMenus });
        tableConfigs['accounts:users'].rows.push([]);
        syncAccountRow(accountState.length - 1);
        tableTotals['accounts:users'] += 1;
        showToast('账户已添加');
      }
      refreshCurrentView();
      return true;
    };
  }

  document.addEventListener('change', function (event) {
    if (event.target.matches('[data-product-primary-category]')) {
      syncProductCategorySecondaryOptions(elements.drawerBody);
      return;
    }
    if (event.target.matches('[data-product-select-all]')) {
      var productTable = event.target.closest('table');
      productTable.querySelectorAll('[data-product-select]').forEach(function (input) {
        if (!input.closest('tr').hidden) input.checked = event.target.checked;
      });
      return;
    }

    if (event.target.matches('[data-product-select]')) {
      var productsTable = event.target.closest('table');
      var productSelectAll = productsTable.querySelector('[data-product-select-all]');
      var productOptions = Array.from(productsTable.querySelectorAll('[data-product-select]'));
      var selectedProducts = productOptions.filter(function (input) { return input.checked; });
      productSelectAll.checked = productOptions.length > 0 && selectedProducts.length === productOptions.length;
      productSelectAll.indeterminate = selectedProducts.length > 0 && selectedProducts.length < productOptions.length;
      return;
    }

    if (event.target.matches('[data-product-commission-rate]')) {
      updateProductCommissionPreview(elements.drawerBody);
      return;
    }

    if (event.target.matches('[data-withdraw-select-all]')) {
      var withdrawalTable = event.target.closest('table');
      withdrawalTable.querySelectorAll('[data-withdraw-select]:not(:disabled)').forEach(function (input) {
        if (!input.closest('tr').hidden) input.checked = event.target.checked;
      });
      return;
    }

    if (event.target.matches('[data-withdraw-select]')) {
      var reviewTable = event.target.closest('table');
      var selectAll = reviewTable.querySelector('[data-withdraw-select-all]');
      var selectableRows = Array.from(reviewTable.querySelectorAll('[data-withdraw-select]:not(:disabled)'));
      var selectedRows = selectableRows.filter(function (input) { return input.checked; });
      selectAll.checked = selectableRows.length > 0 && selectedRows.length === selectableRows.length;
      selectAll.indeterminate = selectedRows.length > 0 && selectedRows.length < selectableRows.length;
      return;
    }

    if (event.target.matches('[data-withdraw-result]')) {
      toggleWithdrawalReason(elements.drawerBody);
      return;
    }

    if (event.target.matches('[data-circle-type]')) {
      syncCircleProductField(elements.drawerBody);
      return;
    }

    if (event.target.matches('[data-circle-material]')) {
      updateCircleMaterialPreview(elements.drawerBody);
      return;
    }

    if (event.target.matches('[data-category-icon]')) {
      var categoryIconName = elements.drawerBody.querySelector('[data-category-icon-name]');
      if (categoryIconName) categoryIconName.textContent = event.target.files[0] ? event.target.files[0].name : '选择图片';
      return;
    }

    if (event.target.matches('[data-help-type]')) {
      syncHelpEditorType(elements.drawerBody);
      return;
    }

    var allInput = event.target.closest('[data-permission-all]');
    if (allInput) {
      elements.drawerBody.querySelectorAll('[data-module-permission]').forEach(function (input) { input.checked = allInput.checked; });
      syncPermissionStates(elements.drawerBody);
      return;
    }
    if (event.target.closest('[data-module-permission]')) syncPermissionStates(elements.drawerBody);

    if (event.target.matches('[data-decoration-target-type]')) {
      syncBannerTargetField(elements.drawerBody);
      return;
    }

    var uploadInput = event.target.closest('[data-decoration-media], [data-decoration-icon]');
    if (uploadInput) {
      var uploadZone = uploadInput.closest('.decoration-upload');
      var nameNode = uploadZone && uploadZone.querySelector('[data-upload-name]');
      if (nameNode) {
        var fileName = uploadInput.files[0] ? uploadInput.files[0].name : '点击上传图片';
        nameNode.textContent = fileName;
        uploadZone.classList.toggle('has-file', !!uploadInput.files[0]);
      }
    }
  });

  document.addEventListener('input', function (event) {
    if (event.target.matches('[data-product-commission-rate]')) updateProductCommissionPreview(elements.drawerBody);
    if (event.target.matches('[data-live-script-item]')) updateLiveScriptCount(elements.drawerBody);
    if (event.target.matches('[data-share-copy-text]')) {
      var shareCopyCount = elements.pageContent.querySelector('[data-share-copy-count]');
      if (shareCopyCount) shareCopyCount.textContent = event.target.value.length + ' / 120';
    }
  });

  document.addEventListener('click', function (event) {
    var addLiveScriptButton = event.target.closest('[data-live-script-add]');
    if (addLiveScriptButton) {
      var liveScriptRows = elements.drawerBody.querySelectorAll('[data-live-script-row]');
      if (liveScriptRows.length >= 6) {
        showToast('单场直播最多配置 6 条分享话术');
        return;
      }
      var existingScripts = Array.from(liveScriptRows).map(function (row) { return row.querySelector('[data-live-script-item]').value; });
      existingScripts.push('');
      renderLiveScriptItems(elements.drawerBody, existingScripts);
      var addedScriptInputs = elements.drawerBody.querySelectorAll('[data-live-script-item]');
      var addedScriptInput = addedScriptInputs[addedScriptInputs.length - 1];
      if (addedScriptInput) addedScriptInput.focus();
      return;
    }

    var removeLiveScriptButton = event.target.closest('[data-live-script-remove]');
    if (removeLiveScriptButton) {
      var removeRow = removeLiveScriptButton.closest('[data-live-script-row]');
      var removeRows = Array.from(elements.drawerBody.querySelectorAll('[data-live-script-row]'));
      var removeIndex = removeRows.indexOf(removeRow);
      var remainingScripts = removeRows.map(function (row) { return row.querySelector('[data-live-script-item]').value; });
      remainingScripts.splice(removeIndex, 1);
      renderLiveScriptItems(elements.drawerBody, remainingScripts);
      return;
    }

    var addTaxBracket = event.target.closest('[data-tax-bracket-add]');
    if (addTaxBracket) {
      var taxBracketList = elements.pageContent.querySelector('[data-tax-bracket-list]');
      if (taxBracketList) {
        taxBracketList.insertAdjacentHTML('beforeend', taxBracketRow('', '', ''));
        var addedRows = taxBracketList.querySelectorAll('[data-tax-bracket-row]');
        var newRow = addedRows[addedRows.length - 1];
        var firstInput = newRow && newRow.querySelector('input');
        if (firstInput) firstInput.focus();
      }
      return;
    }

    var removeTaxBracket = event.target.closest('[data-tax-bracket-remove]');
    if (removeTaxBracket) {
      var bracketRows = elements.pageContent.querySelectorAll('[data-tax-bracket-row]');
      if (bracketRows.length <= 1) {
        showToast('至少保留一个税费区间');
        return;
      }
      var bracketRow = removeTaxBracket.closest('[data-tax-bracket-row]');
      if (bracketRow) bracketRow.remove();
      return;
    }

    var moduleButton = event.target.closest('[data-module]');
    if (moduleButton) {
      state.module = moduleButton.dataset.module;
      state.sub = currentModule().subs[0][0];
      render();
      return;
    }

    var subButton = event.target.closest('[data-sub]');
    if (subButton) {
      state.sub = subButton.dataset.sub;
      render();
      return;
    }

    var jumpButton = event.target.closest('[data-jump]');
    if (jumpButton) {
      jump(jumpButton.dataset.jump);
      return;
    }

    var pageButton = event.target.closest('[data-page-action]');
    if (pageButton) {
      var pageKey = pageButton.dataset.pageKey;
      var pageSize = state.pageSizes[pageKey] || 20;
      var totalPages = Math.max(1, Math.ceil((tableTotals[pageKey] || tableConfigs[pageKey].rows.length) / pageSize));
      var currentPage = state.pages[pageKey] || 1;
      state.pages[pageKey] = pageButton.dataset.pageAction === 'next' ? Math.min(totalPages, currentPage + 1) : Math.max(1, currentPage - 1);
      refreshCurrentView();
      showToast('已切换至第 ' + state.pages[pageKey] + ' 页');
      return;
    }

    var productButton = event.target.closest('[data-product-action]');
    if (productButton) {
      var productIndex = Number(productButton.dataset.rowIndex);
      var product = productState[productIndex];
      var productRow = tableConfigs['content:products'].rows[productIndex];
      var productName = stripHTML(productRow[0]);
      var productAction = productButton.dataset.productAction;
      if (productAction === 'commission') {
        openProductCommissionEditor([productIndex]);
      } else if (productAction === 'shelf') {
        var shelfAction = product.listed ? '下架' : '上架';
        var shelfMessage = product.listed && product.recommended ? '下架后将同时取消首页推荐，确认继续？' : '确认' + shelfAction + '该商品？';
        openConfirm('确认' + shelfAction, shelfMessage, function () {
          product.listed = !product.listed;
          if (!product.listed) product.recommended = false;
          syncProductRow(productIndex);
          refreshCurrentView();
          showToast(productName + '已' + shelfAction);
        });
      } else if (product.recommended) {
        openConfirm('取消首页推荐', '取消后商品仍保持上架，仅从首页热门商品区域移除。', function () {
          product.recommended = false;
          syncProductRow(productIndex);
          refreshCurrentView();
          showToast('已取消首页推荐');
        });
      } else if (!product.listed) {
        showToast('请先上架商品，再设置推荐');
      } else {
        openRecommendationDrawer(productIndex);
      }
      return;
    }

    var liveAiButton = event.target.closest('[data-live-ai-generate]');
    if (liveAiButton) {
      var liveAiIndex = Number(liveAiButton.dataset.rowIndex);
      var liveAiName = liveNameAt(liveAiIndex);
      var generatedLiveScripts = [
        '今晚来「' + liveAiName + '」一起看护肤搭配建议，点击进入直播间边看边选。',
        '换季护肤不知道怎么搭？进入「' + liveAiName + '」，从清洁到修护一次讲清。',
        '黛莱皙直播福利已开启，进入「' + liveAiName + '」查看本场主推好物。'
      ];
      renderLiveScriptItems(elements.drawerBody, generatedLiveScripts);
      var liveScriptInput = elements.drawerBody.querySelector('[data-live-script-item]');
      if (liveScriptInput) liveScriptInput.focus();
      showToast('已生成 3 条分享话术，可分别修改');
      return;
    }

    var liveButton = event.target.closest('[data-live-action]');
    if (liveButton) {
      var liveIndex = Number(liveButton.dataset.rowIndex);
      var liveItem = liveState[liveIndex];
      var liveName = liveNameAt(liveIndex);
      if (liveButton.dataset.liveAction === 'script') {
        openLiveScriptEditor(liveIndex, false);
      } else if (liveItem.listed) {
        openConfirm('确认下架直播', '下架后推客端不再展示该直播，已保存的分享话术仍会保留。', function () {
          liveItem.listed = false;
          syncLiveRow(liveIndex);
          refreshCurrentView();
          showToast(liveName + '已下架');
        });
      } else if (!liveItem.script.trim()) {
        openLiveScriptEditor(liveIndex, true);
      } else {
        openConfirm('确认上架直播', '分享话术已配置，上架后该直播将展示给推客。', function () {
          liveItem.listed = true;
          syncLiveRow(liveIndex);
          refreshCurrentView();
          showToast(liveName + '已上架');
        });
      }
      return;
    }

    var videoButton = event.target.closest('[data-video-action]');
    if (videoButton) {
      var videoIndex = Number(videoButton.dataset.rowIndex);
      var videoItem = videoState[videoIndex];
      var videoRow = tableConfigs['content:video'].rows[videoIndex];
      var videoName = stripHTML(videoRow[0]);
      if (videoButton.dataset.videoAction === 'sort') {
        openVideoSortEditor(videoIndex);
        return;
      }
      var videoActionLabel = videoItem.listed ? '下架' : '上架';
      openConfirm('确认' + videoActionLabel + '视频', videoItem.listed ? '下架后该视频将不再向推客展示。' : '上架后该视频将展示在推客端视频 Feed 中。', function () {
        videoItem.listed = !videoItem.listed;
        syncVideoRow(videoIndex);
        refreshCurrentView();
        showToast(videoName + '已' + videoActionLabel);
      });
      return;
    }

    var circleButton = event.target.closest('[data-circle-action]');
    if (circleButton) {
      var circleIndex = Number(circleButton.dataset.rowIndex);
      var circleItem = circleState[circleIndex];
      var circleAction = circleButton.dataset.circleAction;
      if (circleAction === 'edit') {
        openCircleEditor(circleIndex);
      } else if (circleAction === 'shelf') {
        var circleShelfLabel = circleItem.listed ? '下架' : '上架';
        openConfirm('确认' + circleShelfLabel + '内容', circleItem.listed ? '下架后该内容将不再向推客展示。' : '上架后该内容将进入对应的发圈或宣发列表。', function () {
          circleItem.listed = !circleItem.listed;
          circleItem.updated = '刚刚';
          syncCircleRows();
          refreshCurrentView();
          showToast('内容已' + circleShelfLabel);
        });
      } else if (circleAction === 'up' || circleAction === 'down') {
        var targetIndex = circleAction === 'up' ? circleIndex - 1 : circleIndex + 1;
        if (targetIndex >= 0 && targetIndex < circleState.length) {
          var swapItem = circleState[targetIndex];
          circleState[targetIndex] = circleItem;
          circleState[circleIndex] = swapItem;
          circleState.forEach(function (sortedItem, sortedIndex) {
            sortedItem.sort = sortedIndex + 1;
            sortedItem.updated = '刚刚';
          });
          syncCircleRows();
          refreshCurrentView();
          showToast('排序已更新');
        }
      }
      return;
    }

    var selectPrimary = event.target.closest('[data-select-primary]');
    if (selectPrimary) {
      state.selectedPrimary = selectPrimary.dataset.selectPrimary;
      refreshCurrentView();
      return;
    }

    var primaryButton = event.target.closest('[data-primary-action]');
    if (primaryButton) {
      var primaryIndex = Number(primaryButton.dataset.rowIndex);
      var primaryItem = categoryState[primaryIndex];
      var primaryAction = primaryButton.dataset.primaryAction;
      if (!primaryItem) return;
      if (primaryAction === 'edit') {
        openCategoryEditor(primaryIndex);
      } else if (primaryAction === 'toggle') {
        var primaryToggleLabel = primaryItem.visible ? '隐藏' : '展示';
        openConfirm('确认' + primaryToggleLabel + '一级分类', primaryItem.visible ? '隐藏后小程序不再显示该一级分类及其二级分类入口，已归类商品不受影响。' : '展示后该一级分类将按当前排序出现在小程序分类入口。', function () {
          primaryItem.visible = !primaryItem.visible;
          primaryItem.updated = '刚刚';
          refreshCurrentView();
          showToast('一级分类已' + primaryToggleLabel);
        });
      } else if (primaryAction === 'up' || primaryAction === 'down') {
        var primaryTarget = primaryAction === 'up' ? primaryIndex - 1 : primaryIndex + 1;
        if (primaryTarget >= 0 && primaryTarget < categoryState.length) {
          var primarySwap = categoryState[primaryTarget];
          categoryState[primaryTarget] = primaryItem;
          categoryState[primaryIndex] = primarySwap;
          reindexPrimaryCategories();
          state.selectedPrimary = categoryState[primaryTarget].name;
          refreshCurrentView();
          showToast('一级分类排序已更新');
        }
      }
      return;
    }

    var secondaryButton = event.target.closest('[data-secondary-action]');
    if (secondaryButton) {
      var secondaryIndex = Number(secondaryButton.dataset.rowIndex);
      var secondaryItem = secondaryCategoryState[secondaryIndex];
      var secondaryAction = secondaryButton.dataset.secondaryAction;
      if (!secondaryItem) return;
      if (secondaryAction === 'edit') {
        openSecondaryCategoryEditor(secondaryIndex);
      } else if (secondaryAction === 'toggle') {
        var secondaryToggleLabel = secondaryItem.visible ? '隐藏' : '展示';
        openConfirm('确认' + secondaryToggleLabel + '二级分类', secondaryItem.visible ? '隐藏后小程序不再显示该二级分类入口，已归类商品不受影响。' : '展示后该二级分类将出现在对应一级分类下。', function () {
          secondaryItem.visible = !secondaryItem.visible;
          secondaryItem.updated = '刚刚';
          refreshCurrentView();
          showToast('二级分类已' + secondaryToggleLabel);
        });
      } else if (secondaryAction === 'delete') {
        openConfirm('确认删除二级分类', '删除后仅移除二级分类入口，已归类商品的二级归属将清空。', function () {
          productState.forEach(function (product, productIndex) {
            if (product.category === secondaryItem.parent && product.secondaryCategory === secondaryItem.name) {
              product.secondaryCategory = '';
              syncProductRow(productIndex);
            }
          });
          var parentName = secondaryItem.parent;
          secondaryCategoryState.splice(secondaryIndex, 1);
          reindexSecondaryCategories(parentName);
          refreshCurrentView();
          showToast('二级分类已删除');
        });
      } else if (secondaryAction === 'up' || secondaryAction === 'down') {
        var siblings = secondaryCategoriesOf(secondaryItem.parent);
        var localIndex = siblings.indexOf(secondaryItem);
        var siblingTarget = secondaryAction === 'up' ? localIndex - 1 : localIndex + 1;
        if (siblingTarget >= 0 && siblingTarget < siblings.length) {
          var currentSort = secondaryItem.sort;
          secondaryItem.sort = siblings[siblingTarget].sort;
          siblings[siblingTarget].sort = currentSort;
          reindexSecondaryCategories(secondaryItem.parent);
          refreshCurrentView();
          showToast('二级分类排序已更新');
        }
      }
      return;
    }

    var helpButton = event.target.closest('[data-help-action]');
    if (helpButton) {
      var helpIndex = Number(helpButton.dataset.rowIndex);
      var helpItem = helpState[helpIndex];
      var helpAction = helpButton.dataset.helpAction;
      if (helpAction === 'edit') {
        openHelpEditor(helpIndex);
      } else if (helpAction === 'publish') {
        var helpPublishLabel = helpItem.published ? '下架' : '发布';
        openConfirm('确认' + helpPublishLabel + '内容', helpItem.published ? '下架后小程序不再展示该内容。' : '发布后内容将展示在对应的推客教程或帮助中心。', function () {
          helpItem.published = !helpItem.published;
          helpItem.updated = '刚刚';
          syncHelpRows();
          refreshCurrentView();
          showToast('内容已' + helpPublishLabel);
        });
      } else if (helpAction === 'up' || helpAction === 'down') {
        var helpTargetIndex = helpAction === 'up' ? helpIndex - 1 : helpIndex + 1;
        if (helpTargetIndex >= 0 && helpTargetIndex < helpState.length) {
          var helpSwap = helpState[helpTargetIndex];
          helpState[helpTargetIndex] = helpItem;
          helpState[helpIndex] = helpSwap;
          helpState.forEach(function (sortedHelp, sortedHelpIndex) {
            sortedHelp.sort = sortedHelpIndex + 1;
            sortedHelp.updated = '刚刚';
          });
          syncHelpRows();
          refreshCurrentView();
          showToast('排序已更新');
        }
      }
      return;
    }

    var accountButton = event.target.closest('[data-account-action]');
    if (accountButton) {
      var accountIndex = Number(accountButton.dataset.rowIndex);
      var account = accountState[accountIndex];
      var accountAction = accountButton.dataset.accountAction;
      if (accountAction === 'edit') {
        openAccountDrawer('edit', accountIndex);
      } else if (accountAction === 'block') {
        var blockLabel = account.blocked ? '解封' : '封禁';
        openConfirm('确认' + blockLabel + '账户', blockLabel + '后将更新账户状态，确认继续？', function () {
          account.blocked = !account.blocked;
          syncAccountRow(accountIndex);
          refreshCurrentView();
          showToast('账户已' + blockLabel);
        });
      } else if (accountAction === 'delete') {
        openConfirm('确认删除账户', '删除后账号不能再登录，历史操作记录仍会保留。', function () {
          accountState.splice(accountIndex, 1);
          tableConfigs['accounts:users'].rows.splice(accountIndex, 1);
          tableTotals['accounts:users'] = Math.max(tableConfigs['accounts:users'].rows.length, tableTotals['accounts:users'] - 1);
          refreshCurrentView();
          showToast('账户已删除');
        });
      }
      return;
    }

    var promoterFansButton = event.target.closest('[data-promoter-fans]');
    if (promoterFansButton) {
      openPromoterFans(Number(promoterFansButton.dataset.rowIndex));
      return;
    }

    var promoterButton = event.target.closest('[data-promoter-action]');
    if (promoterButton) {
      var promoterIndex = Number(promoterButton.dataset.rowIndex);
      var promoterUser = promoterState[promoterIndex];
      if (promoterButton.dataset.promoterAction === 'block') {
        var promoterActionLabel = promoterUser.blocked ? '解封' : '封禁';
        openConfirm('确认' + promoterActionLabel + '推客', promoterActionLabel + '后将更新该用户的账户状态，确认继续？', function () {
          promoterUser.blocked = !promoterUser.blocked;
          syncPromoterRow(promoterIndex);
          refreshCurrentView();
          showToast('推客已' + promoterActionLabel);
        });
      }
      return;
    }

    var agreementButton = event.target.closest('[data-agreement-action]');
    if (agreementButton) {
      var agreementIndex = Number(agreementButton.dataset.rowIndex);
      if (agreementButton.dataset.agreementAction === 'edit') openAgreementEditor(agreementIndex);
      else openAgreementView(agreementIndex);
      return;
    }

    var decorationTabButton = event.target.closest('[data-decoration-tab]');
    if (decorationTabButton) {
      state.decorationTab = decorationTabButton.dataset.decorationTab;
      refreshCurrentView();
      return;
    }

    var decorationButton = event.target.closest('[data-decoration-action]');
    if (decorationButton) {
      handleDecorationAction(decorationButton);
      return;
    }

    var sharePosterButton = event.target.closest('[data-share-poster-action]');
    if (sharePosterButton) {
      handleSharePosterAction(sharePosterButton);
      return;
    }

    var shareCopySaveButton = event.target.closest('[data-share-copy-save]');
    if (shareCopySaveButton) {
      var shareCopyInput = elements.pageContent.querySelector('[data-share-copy-text]');
      var shareCopyValue = shareCopyInput ? shareCopyInput.value.trim() : '';
      if (!shareCopyValue) {
        if (shareCopyInput) shareCopyInput.focus();
        showToast('请填写分享语');
        return;
      }
      shareCopyState = shareCopyValue;
      showToast('分享语已保存');
      return;
    }

    var withdrawalButton = event.target.closest('[data-withdraw-action]');
    if (withdrawalButton) {
      openWithdrawalReview([Number(withdrawalButton.dataset.rowIndex)], withdrawalButton.dataset.withdrawAction);
      return;
    }

    var rowButton = event.target.closest('[data-row-action]');
    if (rowButton) {
      openRowDrawer(rowButton.dataset.tableKey, Number(rowButton.dataset.rowIndex));
      return;
    }

    var copyButton = event.target.closest('[data-copy]');
    if (copyButton) {
      var copyValue = copyButton.dataset.copy;
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(copyValue);
      showToast('订单号已复制');
      return;
    }

    var confirmButton = event.target.closest('[data-confirm]');
    if (confirmButton) {
      var action = confirmButton.dataset.confirm;
      openConfirm('确认' + action, '该操作可能影响线上展示或业务状态，确认继续？', function () {
        showToast(action + '成功');
      });
      return;
    }

    var commandButton = event.target.closest('[data-command]');
    if (commandButton) {
      var command = commandButton.dataset.command;
      if (command === 'create-account') {
        openAccountDrawer('create');
      } else if (command === 'batch-product-commission') {
        var selectedProductIndices = Array.from(elements.pageContent.querySelectorAll('[data-product-select]:checked')).map(function (input) {
          return Number(input.dataset.rowIndex);
        });
        openProductCommissionEditor(selectedProductIndices);
      } else if (command === 'batch-product-category') {
        var categoryProductIndices = Array.from(elements.pageContent.querySelectorAll('[data-product-select]:checked')).map(function (input) {
          return Number(input.dataset.rowIndex);
        });
        openProductCategoryEditor(categoryProductIndices);
      } else if (command === 'create-primary-category') {
        openCategoryEditor();
      } else if (command === 'create-secondary-category') {
        openSecondaryCategoryEditor();
      } else if (command === 'create-help') {
        openHelpEditor();
      } else if (command === 'batch-withdraw-review') {
        var selectedWithdrawals = Array.from(elements.pageContent.querySelectorAll('[data-withdraw-select]:checked')).map(function (input) {
          return Number(input.dataset.rowIndex);
        });
        openWithdrawalReview(selectedWithdrawals);
      } else if (command === 'create') {
        if (state.module === 'content' && state.sub === 'circle') openCircleEditor();
        else openDrawer('新增内容', '新建', [['名称', '待填写'], ['状态', '草稿'], ['创建人', '当前后台账号']], '保存后进入对应列表，未发布前不影响线上。', '保存草稿');
      } else if (command === 'sync-shops') {
        openConfirm('同步授权小店', '将从微信侧重新获取授权小店列表，已过期记录仍会保留。', function () { showToast('授权小店列表已同步'); });
      } else if (command === 'save') {
        openConfirm('保存系统配置', '确认保存当前页面的配置变更？', function () { showToast('配置已保存'); });
      } else if (command === 'refresh') {
        showToast('数据已刷新');
      } else if (command === 'export') {
        showToast('已生成导出任务');
      } else if (command === 'account') {
        jump('accounts:users');
      } else {
        showToast('已执行：' + commandButton.textContent.trim());
      }
      return;
    }

    if (event.target.closest('[data-filter-submit]')) {
      applyFilters(event.target.closest('[data-filter-submit]'));
      return;
    }

    var resetButton = event.target.closest('[data-filter-reset]');
    if (resetButton) {
      var panelNode = resetButton.closest('.panel');
      panelNode.querySelectorAll('input').forEach(function (input) { input.value = ''; });
      panelNode.querySelectorAll('select').forEach(function (select) { select.selectedIndex = 0; });
      panelNode.querySelectorAll('[data-search-row]').forEach(function (row) { row.hidden = false; });
      showToast('筛选已重置');
      return;
    }

    if (event.target.closest('[data-close-drawer]')) {
      closeDrawer();
      return;
    }

    if (event.target.closest('[data-close-modal]')) {
      closeModal();
      return;
    }

    if (event.target.closest('[data-modal-confirm]')) {
      var callback = state.pendingAction;
      closeModal();
      if (typeof callback === 'function') callback();
      state.pendingAction = null;
      return;
    }

    if (event.target.closest('[data-drawer-confirm]')) {
      var drawerCallback = state.drawerAction;
      if (typeof drawerCallback === 'function') {
        var result = drawerCallback();
        if (result === false) return;
      } else {
        showToast('保存成功');
      }
      closeDrawer();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeDrawer();
      closeModal();
    }
  });

  document.addEventListener('change', function (event) {
    if (event.target.matches('[data-page-size]')) {
      var key = event.target.dataset.pageKey;
      state.pageSizes[key] = Number(event.target.value);
      state.pages[key] = 1;
      refreshCurrentView();
    }
  });

  render();
})();
