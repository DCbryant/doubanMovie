const top250 = {
    init:function(){
        this.$ele = $('#top250')
        this.$main = $('main')
        this.isLoading = false
        this.index = 0
        this.isFinish = false
        this.clock = null
        this.bind()
        this.start()
    },
    bind:function(){
        let self = this
        this.$main.scroll(function(){
            if(self.clock){
                clearTimeout(self.clock)
            }
            self.clock = setTimeout(function(){
                if(self.$ele.eq(0).height() -30 <= self.$main.scrollTop() + self.$main.height()){
                    self.start()
                }  
            },300)  
        })
    },
    start:function(data){
        let self = this
        this.getData(function(data){
            self.render(data)
        })
    },
    getData:function(callback){
        let self = this
        if(self.isLoading) return;
        self.isLoading = true
        self.$ele.find('.loading').show()
        $.ajax({
            url: '//api.douban.com/v2/movie/top250',
            data: {
                start: self.index || 0
            },
            dataType: 'jsonp'
        }).done(function(result){
            self.index += 20
            if(self.index >= result.total){
                self.isFinish = true
            }
            callback&&callback(result)
        }).fail(function(){
            console.log('数据异常')
        }).always(function(){
            self.isLoading = false
            self.$ele.find('.loading').hide()
        })  
    },
    render:function(data){
        let self = this
        data.subjects.forEach(function(movie) {
            let tpl = `
            <div class="item">
                <a href="#">
                    <div class="cover">
                            <img src="https://i.loli.net/2017/11/07/5a01189ad8846.jpg" alt="" > 
                    </div>
                    <div class="detail">
                        <h2>霸王别姬</h2>
                        <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
                        <div class="extra"><span class="year"></span> / <span class="type"></span></div>
                        <div class="extra">导演：<span class="director"></span></div>
                        <div class="extra">主演：<span class="actor"></span></div>
                    </div>
                </a>
            </div>`
            let $node = $(tpl)
            $node.find('.cover img').attr('src',movie.images.medium)
            $node.find('.detail h2').text(movie.title)
            $node.find('.score').text(movie.rating.average)
            $node.find('.collect').text(movie.collect_count)
            $node.find('.year').text(movie.year)
            $node.find('.type').text(movie.genres.join(' / '))
            $node.find('.director').text(function(){
                let directorsArr = []
                movie.directors.forEach(function(item){
                    directorsArr.push(item.name)
                })
                return directorsArr.join('、')
            })
            $node.find('.actor').text(function(){
                let actorsArr = []
                movie.casts.forEach(function(item){
                    actorsArr.push(item.name)
                })
                return actorsArr.join('、')
            })
            self.$ele.find('.container').append($node)
        });
    },
}

const usBox = {
    init:function(){
        this.$ele = $('#beimei')
        this.start()
    },
    start:function(data){
        let self = this
        this.getData(function(data){
            self.render(data)
        })
    },
    getData:function(callback){
        let self = this
        self.$ele.find('.loading').show()
        $.ajax({
            url: '//api.douban.com/v2/movie/us_box',
            dataType: 'jsonp'
        }).done(function(result){
            callback&&callback(result)
        }).fail(function(){
            console.log('数据异常')
        }).always(function(){
            self.$ele.find('.loading').hide()
        })  
    },
    render:function(data){
        let self = this
        data.subjects.forEach(function(movie) {
            movie = movie.subject
            let tpl = `
            <div class="item">
                <a href="#">
                    <div class="cover">
                            <img src="https://i.loli.net/2017/11/07/5a01189ad8846.jpg" alt="" > 
                    </div>
                    <div class="detail">
                        <h2>霸王别姬</h2>
                        <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
                        <div class="extra"><span class="year"></span> / <span class="type"></span></div>
                        <div class="extra">导演：<span class="director"></span></div>
                        <div class="extra">主演：<span class="actor"></span></div>
                    </div>
                </a>
            </div>`
            let $node = $(tpl)
            $node.find('.cover img').attr('src',movie.images.medium)
            $node.find('.detail h2').text(movie.title)
            $node.find('.score').text(movie.rating.average)
            $node.find('.collect').text(movie.collect_count)
            $node.find('.year').text(movie.year)
            $node.find('.type').text(movie.genres.join(' / '))
            $node.find('.director').text(function(){
                let directorsArr = []
                movie.directors.forEach(function(item){
                    directorsArr.push(item.name)
                })
                return directorsArr.join('、')
            })
            $node.find('.actor').text(function(){
                let actorsArr = []
                movie.casts.forEach(function(item){
                    actorsArr.push(item.name)
                })
                return actorsArr.join('、')
            })
            self.$ele.find('.container').append($node)
        });
    },
}

const search = {
    init:function(){
        this.$ele = $('#search')
        this.keyword = ''
        this.bind()
        this.start()
    },
    bind:function(){
        let self = this
        this.$ele.find('.button').click(function(){
          self.keyword = self.$ele.find('input').val()
          self.start()
        })
    },
    start:function(data){
        let self = this
        self.$ele.find('.loading').show()
        this.getData(function(data){
            self.render(data)
        })
    },
    getData:function(callback){
        let self = this
        self.$ele.find('.loading').show()
        $.ajax({
            url: '//api.douban.com/v2/movie/search',
            data: {
                q:self.keyword
            },
            dataType: 'jsonp'
        }).done(function(result){
            callback&&callback(result)
        }).fail(function(){
            console.log('数据异常')
        }).always(function(){
            self.$ele.find('.loading').hide()
        })  
    },
    render:function(data){
        let self = this
        data.subjects.forEach(function(movie) {
            let tpl = `
            <div class="item">
                <a href="#">
                    <div class="cover">
                            <img src="https://i.loli.net/2017/11/07/5a01189ad8846.jpg" alt="" > 
                    </div>
                    <div class="detail">
                        <h2>霸王别姬</h2>
                        <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
                        <div class="extra"><span class="year"></span> / <span class="type"></span></div>
                        <div class="extra">导演：<span class="director"></span></div>
                        <div class="extra">主演：<span class="actor"></span></div>
                    </div>
                </a>
            </div>`
            let $node = $(tpl)
            $node.find('.cover img').attr('src',movie.images.medium)
            $node.find('.detail h2').text(movie.title)
            $node.find('.score').text(movie.rating.average)
            $node.find('.collect').text(movie.collect_count)
            $node.find('.year').text(movie.year)
            $node.find('.type').text(movie.genres.join(' / '))
            $node.find('.director').text(function(){
                let directorsArr = []
                movie.directors.forEach(function(item){
                    directorsArr.push(item.name)
                })
                return directorsArr.join('、')
            })
            $node.find('.actor').text(function(){
                let actorsArr = []
                movie.casts.forEach(function(item){
                    actorsArr.push(item.name)
                })
                return actorsArr.join('、')
            })
            self.$ele.find('.search-result').append($node)
        });
    },
}

const app = {
    init:function(){
        this.$tabs = $('footer>div')
        this.$panels = $('section')
        this.bind()
        top250.init()
        usBox.init()
        search.init()
    },
    bind:function(){
        let self = this
        this.$tabs.on('click',function(){
            self.$panels.eq($(this).index()).fadeIn().siblings().hide()
            $(this).addClass('active').siblings().removeClass('active')
        })
    }
}
app.init()