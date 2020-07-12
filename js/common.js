
// 导航栏
(function () {
  $('.navigation-bar .wrap .close').on('click', function () {
    $('.navigation-bar .mask').addClass('active');
  })
  $('.navigation-bar .mask').on('click', function () {
    $(this).removeClass('active')
  })
})();

// 轮播图
(function () {
  var len = $('.loop-replace-img .imgs li').length,  // 获取图片数量
      offsetW = document.body.offsetWidth,  // 视口宽
      spots = '',  // 创建小圆点
      index = 0,  // 图片索引
      timer = null;  // 定时器

  $('.loop-replace-img .imgs').css({ width: offsetW * len + 'px' })
                              .find('li').css({ width: 100 / len + '%' });

  for (var i = 0; i < len; i++) {
    spots += '<li></li>'
  }
  $('.loop-replace-img .spots').html(spots).find('li').eq(index).addClass('active');

  // 左右轮播
  $('.loop-replace-img .btn-r').on('click', function () {
    play(1);
  })
  $('.loop-replace-img .btn-l').on('click', function () {
    play(-1);
  })

  // 点击小圆点
  $('.loop-replace-img .spots').on('click', 'li', function (e) {
    var num = $(e.target).index();
    $('.loop-replace-img .imgs').css({
      transform: `translateX(-${offsetW * num}px)`
    })
    $('.loop-replace-img .spots li').removeClass('active');
    $('.loop-replace-img .spots li').eq(num).addClass('active');
  });

  /**
   * 下一张图片 | 上一张图片
   * @param {*} num 为正是向左移动，为负时向右移动
   */
  function play (num) {
    newNum = num || 1;
    newNum === 1 ? index += 1 : index -= 1;
    if (index >= len) {
      index = 0;
    } else if (index < 0) {
      index = 2
    }
    $('.loop-replace-img .imgs').css({
      transform: `translateX(-${offsetW * index}px)`
    })
    $('.loop-replace-img .spots li').removeClass('active');
    $('.loop-replace-img .spots li').eq(index).addClass('active');
  }

  // timer = setInterval(function () {
  //   play();
  // }, 3000);

  // $('.loop-replace-img').on('mousemove', function () {
  //   clearInterval(timer);
  //   timer = null;
  // }).on('mouseout', function () {
  //   console.log(456789)
  //   timer = setInterval(function () {
  //     play(1);
  //   }, 3000);
  // });
})();

function interpretMd (str) {
  let arr = str.split(['\n']);
  let n = 0;
  for (const prop in arr) {
    // console.log(prop)
    let item = arr[prop], num = undefined;

    // 多级标题
    if (/^#/.test(item)) {
      if (/^#\s/.test(item)) {
        arr[prop] = `<h1 id='title'>${item.slice(2, num)}</h1>`;
      }
      /^##\s/.test(item) && (arr[prop] = `<h2>${item.slice(3, num)}</h2>`);
      /^###\s/.test(item) && (arr[prop] = `<h3>${item.slice(4, num)}</h3>`);
      /^####\s/.test(item) && (arr[prop] = `<h4>${item.slice(5, num)}</h4>`);
      /^#####\s/.test(item) && (arr[prop] = `<h5>${item.slice(6, num)}</h5>`);
      /^######\s/.test(item) && (arr[prop] = `<h6>${item.slice(7, num)}</h6>`);
    }

    // 分割线
    /^-{4}/.test(item) && (arr[prop] = '<hr>');
    
    // 普通文本，匹配汉字
    if (/^[0-\u9FA5]/.test(item)) {
      arr[prop] = `<p>${item.slice(0, num)}<p>`
    }
    
    // 引用
    /^>\s/.test(item) && (arr[prop] = `<blockquote class='notes'>${item.slice(2, num)}</blockquote>`);
    
    // 超链接
    if (/\[\s/.test(item)) {
      let link = item.match(/]\(.{0}/);
      // console.log(link[0].slice(2, -1))
      arr[prop] = item.replace(/\[\s/, `<a href="${link[0].slice(2, -1)}">`).replace(/\]\(.{0}/, '</a>');
    }

    // 引入图片
    if (/^!\[\s/.test(item)) {
      let link = item.match(/]\(.{0,1000}/);
      // console.log(link[0].slice(2, -1))
      // console.log(link[0].slice(2, -1))
      arr[prop] = item.replace(/!\[\s/, `<div class="img-block"><img src="${link[0].slice(2, -1)}"`).replace(/\]\(.{0,1000}/, '/></div>');
    }

    // 无序列表
    if (/^-\s/.test(item)) {
      arr[prop] = `<li>${item.slice(2, num)}</li>`;  // 一级
    }
    if (/^\s{4}-\s/.test(item)) {
      arr[prop] = `<li class='list2'>${item.slice(6, num)}</li>`;  // 二级
    }
    if (/^\s{8}-\s/.test(item)) {
      arr[prop] = `<li class='list3'>${item.slice(10, num)}</li>`;  // 三级
    }

    // 有序列表
    if (/^\d\.\s/.test(item)) {
      arr[prop] = `<li class='order order1'>${item.slice(0, num)}</li>`;  // 一级
    }
    if (/^\s{4}\d{0,2}\.\d{0,2}\s/.test(item)) {
      arr[prop] = `<li class='order order2'>${item.slice(4, num)}</li>`;  // 二级
    }
    if (/^\s{8}\d{0,2}\.\d{0,2}\.\d{0,2}\s/.test(item)) {
      arr[prop] = `<li class='order order3'>${item.slice(8, num)}</li>`;  // 三级
    }

    // 代码块
    if (/^\`\`\`/g.test(item)) {
      n++;
      if (n % 2 === 1) {
        arr[prop] = item.replace(/^\`\`\`/, "<div class='code-wrap'>");
      } else {
        arr[prop] = item.replace(/^\`\`\`/, "</div>");
      }
    }
    // /{|}|;/.test(item) && (arr[prop] = `${item}<br>`);  // 按规范换行

    if (/\u6700/g.test(item)) {
      arr[prop] = item.replace(/\u6700(.{0,1})/g, '****');
    }
  }
  // console.log(arr)
  return `<div class='markdown-preview'>${arr.join('')}</div>`;
}