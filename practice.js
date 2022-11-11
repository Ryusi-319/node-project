const https = require('https');
const cheerio = require('cheerio');

https.get('https://movie.douban.com/top250',function(res){
    // 分段返回的 自己拼接
    let html = '';
    // 有数据产生的时候 拼接
    res.on('data',function(chunk){
        html += chunk;
    })
    // 拼接完成
    res.on('end',function(){
      const $ = cheerio.load(html);
      let allFilms = [];
      $('li .item').each(function() {
        const title = $('.title', this).text();
        const star = $('.rating_num',this).text();
        const pic = $('.pic img',this).attr('src');
        allFilms.push({
          title,star,pic
        })
      })
      console.log(allFilms);
    })
})