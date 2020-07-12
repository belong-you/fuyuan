// 产品
(function () {
  let str = '', productArr = [
    productList.reshuilu[0],
    productList.reshuilu[1],
    productList.reshuilu[2],
    productList.kongyaji[0],
    productList.zhengqi[0],
    productList.homeShow[0],
    productList.homeShow[1],
    productList.homeShow[2],
    productList.homeShow[3],
    productList.homeShow[4],
    productList.homeShow[5],
    productList.refenglu[0],
  ];
  for (let i = 0; i < productArr.length; i++) {
    let string = `
      <li><span>
        <img src="${productArr[i].src}" :alt="${productArr[i].name} + '_釜源科技'">
        <div class="mask">
          <a href="./article/${productArr[i].link}.html" >${productArr[i].name} ${productArr[i].kw}</a>
        </div>
      </span></li>
    `
    str += string;
  }
  $('.home-product .product-list').html(str);
})();

// 新闻
(function () {
  let str =  `<li>
      <h2><a href="news/${companyNews[0].timestamp.replace(/-/g, '')}.html">${industryNews[0].title}</a></h2>
      <p>${industryNews[0].content}</p>
      <p class="timer"><i class="iconfont"></i>${industryNews[0].timestamp}</p>
    </li>
    <li>
      <h2><a href="news/${companyNews[0].timestamp.replace(/-/g, '')}.html">${industryNews[1].title}</a></h2>
      <p>${industryNews[1].content}</p>
      <p class="timer"><i class="iconfont"></i>${industryNews[1].timestamp}</p>
    </li>
    <li>
      <h2><a href="news/${companyNews[0].timestamp.replace(/-/g, '')}.html">${companyNews[0].title}</a></h2>
      <p>${companyNews[0].content}</p>
      <p class="timer"><i class="iconfont"></i>${companyNews[0].timestamp}</p>
    </li>`
  $('.home-news .news-list').html(str);
})();