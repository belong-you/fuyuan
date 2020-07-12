(function () {
  function render (data) {
    var html = '';
    console.log()
    for (var i = 0; i < productList[data].length; i++) {
      var str = `<li><div class="leayer"><div class="wrap clearfix"><div class="img">
        <img src="${productList[data][i].src}" alt="${productList[data][i].name} + '_釜源科技'">
      </div>
      <div class="content">
        <h2>${productList[data][i].name}</h2>
        <h4>${productList[data][i].trait}</h4>
        <p class="kw">${productList[data][i].kw}</p>
        <p>${productList[data][i].capacity}</p>
        <a href="./article/${productList[data][i].link}.html">了解详情 <i class="iconfont"></i></a>
        <p class="text">${productList[data][i].text}</p>
      </div></div></div></li>`
      html += str;
    }
    return html;
  }
  $('.product-unit .one').html(render('reshuilu'));
  $('.product-unit .two').html(render('zhengqi'));
  $('.product-unit .three').html(render('refenglu'));
  $('.product-unit .four').html(render('kongyaji'));
  $('.product-unit .five').html(render('other'));

  $('.product-unit .btns').on('click', 'button', function () {
  var num = $(this).index();
  $('.product-unit .btns button').removeClass('active');
  $(this).addClass('active');
  $('.product-unit ul').removeClass('active')
                       .eq(num).addClass('active');

  })
})();