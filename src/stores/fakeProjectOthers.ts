const customerMe = {
  status: 'success',
  msg: 'success',
  data: {
    email: 'mrjhack@hotmail.com',
    name: 'vance',
    createdAt: '2020-06-12T02:30:52.000Z',
    customerProjectServices: [
      {
        id: 6,
        address: '0x2f56537CF2bD9E2354fA9785137E30C2e790BF60',
        createdAt: '2020-07-07T09:32:44.000Z',
      },
    ],
  },
}

const getMyProjectOrderList = {
  status: 'success',
  msg: 'success',
  data: [
    {
      amount: 10000,
      transactionCheckUrl: '',
      id: 1593764173536,
      uuid: 'b9893395-6664-414d-a76c-28c0b7c5c440',
      customerProjectServiceId: null,
      currency: 'TWD',
      paymentStatus: 1,
      merchantCompareProjectId: null,
      transactionHash: null,
      createdAt: '2020-07-03T08:16:13.000Z',
      project: {
        totalAmount: 3600000,
        IRR: 0.999999,
        repaymentType: 'MONTH_PAYMENT',
        id: 1,
        merchantId: '2',
        title: '花田有機美濃瓜',
        createdAt: '2020-07-03T02:00:11.000Z',
        updatedAt: '2020-07-03T02:00:11.000Z',
        startDate: '2020-07-01T09:56:17.000Z',
        endDate: '2020-08-11T09:56:17.000Z',
      },
    },
    {
      amount: 344.83,
      transactionCheckUrl:
        'https://rinkeby.etherscan.io/tx/0x6c5cae3d53bab424cad627e05071a062012faa53eb60a30319aefd814e0d188e',
      id: 1594186640378,
      uuid: 'f871ccf0-b783-4cbe-9192-d56e42ae7143',
      customerProjectServiceId: 5,
      currency: 'USDT',
      paymentStatus: 1,
      merchantCompareProjectId: null,
      transactionHash: '0x6c5cae3d53bab424cad627e05071a062012faa53eb60a30319aefd814e0d188e',
      createdAt: '2020-07-08T05:37:20.000Z',
      project: {
        totalAmount: 3600000,
        IRR: 0.999999,
        repaymentType: 'MONTH_PAYMENT',
        id: 1,
        merchantId: '2',
        title: '花田有機美濃瓜',
        createdAt: '2020-07-03T02:00:11.000Z',
        updatedAt: '2020-07-03T02:00:11.000Z',
        startDate: '2020-07-01T09:56:17.000Z',
        endDate: '2020-08-11T09:56:17.000Z',
      },
    },
  ],
  total: 2,
  page: 1,
}
const project1 = {
  status: 'success',
  msg: 'success',
  data: {
    totalAmount: 4000000,
    IRR: 0.999999,
    repaymentType: 'MONTH_PAYMENT',
    id: 1,
    merchantId: '2',
    title: 'DESERTOPIA 荒漠樂園',
    createdAt: '2020-06-12T02:26:14.000Z',
    updatedAt: '2020-06-11T22:05:42.000Z',
    startDate: '2017-10-31T00:00:00.000Z',
    endDate: '2022-11-01T02:10:10.000Z',
    projectInfo: {
      column1: '遊戲熵Gamtropy',
      column2: '2017/10/31',
      column3: 'iOS、Android',
      column4: '免費',
      column5: '繁體中文',
      column6: '3',
      column7:
        '<p style="margin-left:0px;"></p>\n<p style="margin-left:0px;"><br></p>\n<iframe width="640" height="360" src="https://www.youtube.com/embed/Di-ZNoQoomk" frameBorder="0"></iframe>\n<p style="text-align:start;"><br></p>\n<p style="text-align:start;"><span style="color: rgb(70,70,70);background-color: rgb(255,255,255);font-size: 15px;font-family: Helvetica Neue", Helvetica, Roboto, Arial, "Lucida Grande", "PingFang TC", 蘋果儷中黑, "Apple LiGothic Medium", sans-serif;">《DESERTOPIA 荒漠樂園》是一款在沙漠中培育出新生命的模擬養成遊戲，你將在一座無人荒島上耕耘並發掘新物種。耕耘並非一件容易的事，這裡沒有永恆存在的生命，但此處的衰亡卻可能造就彼處的繁榮。遊戲中沒有一般模擬養成遊戲的長久建設，所有事物都會隨時間消長，而隨機發生的事件也可能同時伴隨更多機會和風險進而左右這座島嶼的命運。在資源分配與取捨之間努力建設一座荒漠樂園吧！</span></p>\n<p style="text-align:start;"><br></p>\n<p style="text-align:start;"><span style="color: rgb(70,70,70);background-color: rgb(255,255,255);font-size: 15px;font-family: Helvetica Neue", Helvetica, Roboto, Arial, "Lucida Grande", "PingFang TC", 蘋果儷中黑, "Apple LiGothic Medium", sans-serif;">遊戲特色</span></p>\n<p style="text-align:start;"><span style="color: rgb(70,70,70);background-color: rgb(255,255,255);font-size: 15px;font-family: Helvetica Neue", Helvetica, Roboto, Arial, "Lucida Grande", "PingFang TC", 蘋果儷中黑, "Apple LiGothic Medium", sans-serif;">- 舒壓、沈浸感的繪本風格遊戲美術視覺</span></p>\n<p style="text-align:start;"><span style="color: rgb(70,70,70);background-color: rgb(255,255,255);font-size: 15px;font-family: Helvetica Neue", Helvetica, Roboto, Arial, "Lucida Grande", "PingFang TC", 蘋果儷中黑, "Apple LiGothic Medium", sans-serif;">- 遊戲中事物必然隨時間消長的特殊遊戲機制</span></p>\n<p style="text-align:start;"><span style="color: rgb(70,70,70);background-color: rgb(255,255,255);font-size: 15px;font-family: Helvetica Neue", Helvetica, Roboto, Arial, "Lucida Grande", "PingFang TC", 蘋果儷中黑, "Apple LiGothic Medium", sans-serif;">- 動態混音系統，背景音樂會隨著畫面的豐饒程度而變換</span></p>\n<p style="text-align:start;"><span style="color: rgb(70,70,70);background-color: rgb(255,255,255);font-size: 15px;font-family: Helvetica Neue", Helvetica, Roboto, Arial, "Lucida Grande", "PingFang TC", 蘋果儷中黑, "Apple LiGothic Medium", sans-serif;">- 近50種生物及10種不同地形等待探索</span></p>\n<p style="text-align:start;"><span style="color: rgb(70,70,70);background-color: rgb(255,255,255);font-size: 15px;font-family: Helvetica Neue", Helvetica, Roboto, Arial, "Lucida Grande", "PingFang TC", 蘋果儷中黑, "Apple LiGothic Medium", sans-serif;">- 一些人為事件將介入島嶼的發展，每個選擇都可能伴隨利益與危害</span></p>\n',
      column8: '1',
      column9: '1',
      column10: null,
      updatedAt: '2020-06-12T06:23:52.000Z',
    },
    projectTags: [
      {
        name: 'HOME',
      },
      {
        name: 'all',
      },
    ],
    projectMutiplePhotos: [
      {
        id: 49,
        type: null,
        weights: 1,
        coverId: 59,
        coverUrl:
          'https://wgpayment.s3.ap-northeast-1.amazonaws.com/app/public/uploads/2_13c9b6d0-ac71-11ea-898b-79b9b0fc692f_2020-06-12T05%3A53%3A45%2B00%3A00_.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIASFMCEMW4QF3TQWLS%2F20200708%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20200708T063925Z&X-Amz-Expires=3600&X-Amz-Signature=195aa866a672b4d1bf4101c21445920f1f2962f0e17b134a6840ce2f764856c3&X-Amz-SignedHeaders=host',
      },
      {
        id: 50,
        type: null,
        weights: 2,
        coverId: 60,
        coverUrl:
          'https://wgpayment.s3.ap-northeast-1.amazonaws.com/app/public/uploads/2_3cec1c10-ac71-11ea-898b-79b9b0fc692f_2020-06-12T05%3A54%3A54%2B00%3A00_.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIASFMCEMW4QF3TQWLS%2F20200708%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20200708T063925Z&X-Amz-Expires=3600&X-Amz-Signature=6a6406489856563137c5657e39c3ea494b05a673303ed2f7b643b53e7c2a5167&X-Amz-SignedHeaders=host',
      },
      {
        id: 51,
        type: null,
        weights: 3,
        coverId: 61,
        coverUrl:
          'https://wgpayment.s3.ap-northeast-1.amazonaws.com/app/public/uploads/2_3d5a9550-ac71-11ea-898b-79b9b0fc692f_2020-06-12T05%3A54%3A54%2B00%3A00_.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIASFMCEMW4QF3TQWLS%2F20200708%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20200708T063925Z&X-Amz-Expires=3600&X-Amz-Signature=791258d6ac03f83a578fd616851e60cd4234b874aca4ed63bceb2cced40c24dc&X-Amz-SignedHeaders=host',
      },
    ],
    wallet: {
      address: '0xE696Cd1f9f326139517Fc786fbecc6F79ae273C5',
      contractIndex: 1,
      type: 'project',
      assigned: 1,
    },
    paymentType: ['CREDIT', 'CRYPTOCURRENCY'],
    ProjectsInvestingListingTotalAmount: 100000,
  },
}

const project2 = {
  status: 'success',
  msg: 'success',
  data: {
    totalAmount: 4500000,
    IRR: 0.999999,
    repaymentType: 'MONTH_PAYMENT',
    id: 2,
    merchantId: '2',
    title: '眾神之鬪',
    createdAt: '2020-06-12T02:26:14.000Z',
    updatedAt: '2020-06-12T06:17:29.000Z',
    startDate: '2017-09-04T00:00:00.000Z',
    endDate: '2020-10-22T02:10:10.000Z',
    projectInfo: {
      column1: '數位卡夫特Digital Crafter',
      column2: '2017-09-04',
      column3: 'Windows',
      column4: '459',
      column5: '繁體中文',
      column6: '4',
      column7:
        '<p style="margin-left:0px;"></p>\n<p style="margin-left:0px;"><br></p>\n<iframe width="640" height="360" src="https://www.youtube.com/embed/vRGye7-5QAI" frameBorder="0"></iframe>\n<p style="text-align:start;"><br></p>\n<p style="margin-left:0px;"></p>\n<div style="text-align:left;"><img src="https://p2.bahamut.com.tw/WIKI/54/00336054.JPG" alt="" style="height: ;width: "/></div>\n<p style="text-align:start;"><br><span style="color: rgb(70,70,70);background-color: rgb(255,255,255);font-size: 15px;font-family: Helvetica Neue;">來自世界各地的神祇，聖靈以及神話中的角色、在平行的世界中被召喚出來，進行一場前所未有的眾神格鬥大賽</span><span style="color: rgb(70,70,70);background-color: rgb(255,255,255);font-family: Helvetica Neue;">!!</span><br><br><span style="color: rgb(70,70,70);background-color: rgb(255,255,255);font-family: Helvetica Neue;">眾神們將以各自的神力和招式進行夢幻般的對決!!</span> <span style="color: rgb(70,70,70);background-color: rgb(255,255,255);font-family: Helvetica Neue;">到底誰能夠勝出成為勝利者呢?</span> <span style="color: rgb(70,70,70);background-color: rgb(255,255,255);font-family: Helvetica Neue;">究竟又是什麼在幕後主導這一切呢?</span> <span style="color: rgb(70,70,70);background-color: rgb(255,255,255);font-family: Helvetica Neue;">想要知道結果，只有戰了!!</span></p>\n',
      column8: '1',
      column9: '1',
      column10: null,
      updatedAt: '2020-06-12T06:22:31.000Z',
    },
    projectTags: [
      {
        name: 'all',
      },
      {
        name: 'HOME',
      },
    ],
    projectMutiplePhotos: [
      {
        id: 53,
        type: null,
        weights: 2,
        coverId: 63,
        coverUrl:
          'https://wgpayment.s3.ap-northeast-1.amazonaws.com/app/public/uploads/2_64be0520-ac74-11ea-898b-79b9b0fc692f_2020-06-12T06%3A17%3A29%2B00%3A00_.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIASFMCEMW4QF3TQWLS%2F20200708%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20200708T061908Z&X-Amz-Expires=3600&X-Amz-Signature=11e80965a2a49d1a4bcee7b65555f31a4b2ee115b8848b0e5110a98c4e306c08&X-Amz-SignedHeaders=host',
      },
      {
        id: 54,
        type: null,
        weights: 3,
        coverId: 64,
        coverUrl:
          'https://wgpayment.s3.ap-northeast-1.amazonaws.com/app/public/uploads/2_652d1aa0-ac74-11ea-898b-79b9b0fc692f_2020-06-12T06%3A17%3A30%2B00%3A00_.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIASFMCEMW4QF3TQWLS%2F20200708%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20200708T061908Z&X-Amz-Expires=3600&X-Amz-Signature=7d6b04acefb2879e3bbc806e4708011284cfbdad901cbb4e8b86622838bb9c31&X-Amz-SignedHeaders=host',
      },
    ],
    wallet: {
      address: '0x843F6633A4E32cAA79f40D70BD21C296C874dD0d',
      contractIndex: 2,
      type: 'project',
      assigned: 1,
    },
    paymentType: ['CREDIT', 'CRYPTOCURRENCY'],
    ProjectsInvestingListingTotalAmount: 0,
  },
}

const project3 = {
  status: 'success',
  msg: 'success',
  data: {
    totalAmount: 3000000,
    IRR: 0.999999,
    repaymentType: 'MONTH_PAYMENT',
    id: 3,
    merchantId: '2',
    title: '福爾魔獸',
    createdAt: '2020-06-12T02:26:14.000Z',
    updatedAt: '2020-06-12T06:28:37.000Z',
    startDate: '2019-10-02T00:00:00.000Z',
    endDate: '2020-11-01T02:10:10.000Z',
    projectInfo: {
      column1: 'Toii 踢歐哎哎實驗室',
      column2: '2019-10-02',
      column3: 'iOS',
      column4: '免費含付費項目',
      column5: '繁體中文',
      column6: '2',
      column7:
        '<p></p>\n<iframe width="640" height="360" src="https://www.youtube.com/embed/CiggX95zWLw" frameBorder="0"></iframe>\n<p><br></p>\n<p><span style="font-size: 15px;">　　福爾魔獸的由來發生在某一天，天公發現到一塊小小的美麗寶島台灣，立刻就被台灣各地的文化、建築、風景給深深的著迷，也萌生了想保護台灣目前既有的文化、建築、風景不被破壞，但因為天上的事務實在忙不過來，於是天公便指派了身邊許多隻魔獸落入凡間保護著台灣。</span></p>\n<p><br></p>\n<p><span style="font-size: 15px;">　　玩家將在台灣寶島內遇見並培養你獨一無二的魔獸，當你出門時不仿打開一下遊戲，走到台灣各大知名景點內來獲得新魔獸！獲得的魔獸們將會協助玩家突破各種困難的任務，你可能會需要帶著魔獸前往饒河夜市，或者到士林夜市將夜市的特色美食來讓魔獸們恢復原始的力量，當然你也可以躺在華山的草原上與魔獸悠閒的度過慵懶的下午！</span></p>\n<p><br></p>\n<p></p>\n<img src="https://p2.bahamut.com.tw/WIKI/68/00373368.JPG" alt="" style="height: ;width: "/>\n<img src="https://p2.bahamut.com.tw/WIKI/69/00373369.JPG" alt="" style="height: ;width: "/>\n<img src="https://p2.bahamut.com.tw/WIKI/70/00373370.JPG" alt="" style="height: ;width: "/>\n<img src="https://p2.bahamut.com.tw/WIKI/71/00373371.JPG" alt="" style="height: ;width: "/>\n',
      column8: '1',
      column9: '1',
      column10: null,
      updatedAt: '2020-06-12T06:41:22.000Z',
    },
    projectTags: [
      {
        name: 'all',
      },
    ],
    projectMutiplePhotos: [
      {
        id: 55,
        type: null,
        weights: 1,
        coverId: 65,
        coverUrl:
          'https://wgpayment.s3.ap-northeast-1.amazonaws.com/app/public/uploads/2_823b3c60-ac76-11ea-898b-79b9b0fc692f_2020-06-12T06%3A32%3A37%2B00%3A00_.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIASFMCEMW4QF3TQWLS%2F20200708%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20200708T064535Z&X-Amz-Expires=3600&X-Amz-Signature=c10cbe96f90ef1876b59a575fe824b2c131ac387a72212da2377cb7bb80c314b&X-Amz-SignedHeaders=host',
      },
      {
        id: 56,
        type: null,
        weights: 2,
        coverId: 66,
        coverUrl:
          'https://wgpayment.s3.ap-northeast-1.amazonaws.com/app/public/uploads/2_82749be0-ac76-11ea-898b-79b9b0fc692f_2020-06-12T06%3A32%3A38%2B00%3A00_.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIASFMCEMW4QF3TQWLS%2F20200708%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20200708T064535Z&X-Amz-Expires=3600&X-Amz-Signature=8d549b7ba22b8f7624ff8b24ca15fb59716c7e81e24cb5dddd6da613f4ac5f23&X-Amz-SignedHeaders=host',
      },
    ],
    wallet: {
      address: '0x3d345B174d8a6436080682352Ee1628591Ad4807',
      contractIndex: 3,
      type: 'project',
      assigned: 1,
    },
    paymentType: ['CREDIT', 'CRYPTOCURRENCY'],
    ProjectsInvestingListingTotalAmount: 0,
  },
}

const project4 = {
  status: 'success',
  msg: 'success',
  data: {
    totalAmount: 16320000,
    IRR: 0.999999,
    repaymentType: 'MONTH_PAYMENT',
    id: 4,
    merchantId: '2',
    title: '熊貓博士糖果工廠',
    createdAt: '2020-06-12T02:26:14.000Z',
    updatedAt: '2020-06-12T06:52:53.000Z',
    startDate: '2017-10-10T00:00:00.000Z',
    endDate: '2020-04-01T02:10:10.000Z',
    projectInfo: {
      column1: 'Imba Interactive',
      column2: '2017-10-10',
      column3: 'iOS、Android',
      column4: '免費',
      column5: '繁體中文',
      column6: '3',
      column7:
        '<p><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 14px;font-family: Roboto, Arial, sans-serif;">創造完美的糖果！</span><br><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 14px;font-family: Roboto, Arial, sans-serif;">探索激動人心而又讓人垂涎欲滴的熊貓博士糖果工廠吧！幫助熊貓博士控制工廠裡的糖果機器，試驗各種顏色、口味和形狀的組合，創造你自己的美味糖果！</span><br><br><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 14px;font-family: Roboto, Arial, sans-serif;">一起玩耍和學習！</span><br><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 14px;font-family: Roboto, Arial, sans-serif;">熊貓博士糖果工廠鼓勵孩子們玩耍，創造和溝通！在每一個精心設計的工廠裡，孩子們不但可以選擇自己一個人玩，還可以與一名朋友或家長一起協作遊戲。</span><br><br><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 14px;font-family: Roboto, Arial, sans-serif;">許多好玩的定制！</span><br><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 14px;font-family: Roboto, Arial, sans-serif;">有數不清的方式供你定制各種不同的糖果！在充滿趣味的彈珠台發射泡泡糖，在果凍糖實驗室裡激活想像力，或在巧克力工廠裡揮灑創意！</span><br><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 14px;font-family: Roboto, Arial, sans-serif;">…可別忘了讓熊貓博士的朋友們品嚐你做的糖果哦！觀察他們的表情，你就知道他們有多麼喜歡這些糖果了！</span><br><br><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 14px;font-family: Roboto, Arial, sans-serif;">**此版本的熊貓博士糖果工廠可免費下載，並免費附送軟糖工廠。此應用程式包含應用程式內購買項目，你可以增設更多工廠，製作更多不同種類的糖果。內容與付費版本熊貓博士糖果工廠相同。</span><br><br><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 14px;font-family: Roboto, Arial, sans-serif;">遊戲特色：</span><br><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 14px;font-family: Roboto, Arial, sans-serif;">• 超過60種方式供你設計並製造自己的糖果！</span><br><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 14px;font-family: Roboto, Arial, sans-serif;">• 每間糖果工廠都給你不一樣的自由發揮空間</span><br><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 14px;font-family: Roboto, Arial, sans-serif;">• 孩子們學到計劃與協作，互助與分享</span><br><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 14px;font-family: Roboto, Arial, sans-serif;">• 與朋友和家長一起玩耍和發現！</span><br><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 14px;font-family: Roboto, Arial, sans-serif;">• 觀察熊貓博士的朋友們吃糖的表情！</span><br><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 14px;font-family: Roboto, Arial, sans-serif;">• 學習怎樣混合併調配新的顏色！</span><br><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 14px;font-family: Roboto, Arial, sans-serif;">• 自由探索，沒有時間或分數限制</span><br><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 14px;font-family: Roboto, Arial, sans-serif;">• 兒童安全</span></p>\n',
      column8: null,
      column9: null,
      column10: null,
      updatedAt: '2020-06-12T06:53:40.000Z',
    },
    projectTags: [
      {
        name: 'all',
      },
    ],
    projectMutiplePhotos: [
      {
        id: 57,
        type: null,
        weights: 1,
        coverId: 67,
        coverUrl:
          'https://wgpayment.s3.ap-northeast-1.amazonaws.com/app/public/uploads/2_56d436f0-ac79-11ea-898b-79b9b0fc692f_2020-06-12T06%3A52%3A53%2B00%3A00_.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIASFMCEMW4QF3TQWLS%2F20200708%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20200708T064704Z&X-Amz-Expires=3600&X-Amz-Signature=0ca3535d47d8ae844e302ca137fa3186b4d0b959a5453ac40d5b82a5a1548af0&X-Amz-SignedHeaders=host',
      },
      {
        id: 58,
        type: null,
        weights: 2,
        coverId: 68,
        coverUrl:
          'https://wgpayment.s3.ap-northeast-1.amazonaws.com/app/public/uploads/2_571362d0-ac79-11ea-898b-79b9b0fc692f_2020-06-12T06%3A52%3A54%2B00%3A00_.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIASFMCEMW4QF3TQWLS%2F20200708%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20200708T064704Z&X-Amz-Expires=3600&X-Amz-Signature=c0d14e7a5b52e8c7a53884f49bbbc8802d19fd1e39600bbe04aed40c19d0fac4&X-Amz-SignedHeaders=host',
      },
      {
        id: 59,
        type: null,
        weights: 3,
        coverId: 69,
        coverUrl:
          'https://wgpayment.s3.ap-northeast-1.amazonaws.com/app/public/uploads/2_572c4200-ac79-11ea-898b-79b9b0fc692f_2020-06-12T06%3A52%3A54%2B00%3A00_.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIASFMCEMW4QF3TQWLS%2F20200708%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20200708T064704Z&X-Amz-Expires=3600&X-Amz-Signature=521ae86de7d358e529d5244cd9f7382906140b6bc940cce3a0cf34e436974394&X-Amz-SignedHeaders=host',
      },
    ],
    wallet: {
      address: '0x8B8b090e15eBC56843a1DbA383b6C94A4Fa17a58',
      contractIndex: 4,
      type: 'project',
      assigned: 1,
    },
    paymentType: ['CREDIT', 'CRYPTOCURRENCY'],
    ProjectsInvestingListingTotalAmount: 0,
  },
}
export { customerMe, getMyProjectOrderList, project2, project1, project3, project4 }
