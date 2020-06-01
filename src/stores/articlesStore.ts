import { observable, action, computed } from 'mobx'
import agent from '../agent'
const LIMIT = 10

export class ArticlesStore {
  @observable isLoading = false
  @observable page = 0
  @observable totalPagesCount = 0
  @observable articlesRegistry = observable.map()
  @observable predicate = {}
  @observable fakeHouse = {}

  @computed get articles() {
    return this.articlesRegistry.values()
  }

  clear() {
    this.articlesRegistry.clear()
    this.page = 0
  }

  getArticle(slug) {
    return this.articlesRegistry.get(slug)
  }

  @action setPage(page) {
    this.page = page
  }

  @action setPredicate(predicate) {
    if (JSON.stringify(predicate) === JSON.stringify(this.predicate)) return
    this.clear()
    this.predicate = predicate
  }

  $req() {
    // if (this.predicate.myFeed) return agent.Articles.feed(this.page, LIMIT)
    // if (this.predicate.favoritedBy) return agent.Articles.favoritedBy(this.predicate.favoritedBy, this.page, LIMIT)
    // if (this.predicate.tag) return agent.Articles.byTag(this.predicate.tag, this.page, LIMIT)
    // if (this.predicate.author) return agent.Articles.byAuthor(this.predicate.author, this.page, LIMIT)
    return agent.Articles.all(this.page, LIMIT)
  }

  @action loadArticles() {
    this.isLoading = true
    return this.$req()
      .then(
        action(({ articles, articlesCount }) => {
          //console.log('sssasasss', articlesCount)
          this.articlesRegistry.clear()
          articles.forEach((article) => this.articlesRegistry.set(article.slug, article))
          this.totalPagesCount = Math.ceil(articlesCount / LIMIT)
        })
      )
      .finally(
        action(() => {
          this.isLoading = false
        })
      )
  }

  @action loadfakeHouse() {
    this.isLoading = true
    return this.$req()
      .then(
        action(({ articles, articlesCount }) => {
          this.fakeHouse = {
            column1: '新北市三芝長勤街37號6樓',
            column2: '36',
            column3: '13',
            column4: '1',
            column5: '1260萬(土地面積:13.21坪,市價:每坪100萬元)',
            column6: '公寓',
            column7:
              '<div><h4><strong><span style="color: brown;">《</span><span style="color: brown;">澎湖SUP立式划槳探險行程</span><span style="color: brown;">》</span></strong></h4><p><strong><span style="color: green;">☞&nbsp;參加近年風行安全又刺激的 SUP立式划槳體驗，用不同的角度欣賞澎湖海灣之美景。<br>☞ 在教練專業的指導之下，輕鬆體驗站立於海平面上的感動。</span></strong></p><p><img src="https://photos.journeyonapp.com/file/show/j6po5/1024.jpg" alt="" style="" class="img-responsive"></p><h4><strong>體驗資訊</strong></h4><ul><li>費用包含：專業教練指導、澎湖無敵海景、專業安全裝備使用、保險</li><li>活動內容：<ul><li>SUP 英文全名為「 Stand Up Paddle 」，在台灣亦有人稱立式單槳衝浪板或站立式衝浪板，活動由一隻槳與一張衝浪板組合而成，歐美已風行多年，玩家常以此進行衝浪、探險、跳水與釣魚等活動。</li><li>參加近年風行安全又刺激的 SUP立式划槳體驗，用不同的角度欣賞澎湖海灣之美景。</li></ul></li><li>活動對象：7 歲以上至 55 歲皆可參加（此活動不適合孕婦、心臟病、高血壓、癲癇等痼疾者參與）</li><li>活動長度：約 2小時</li><li>活動時間：每日 16:00 - 18:00（請準時於集合地點報到，逾時不候，恕不退費）</li><li>注意事項：<ul><li>7歲以下無法參加活動，可提供助浮衣，7歲以上按成人計價。如活動過程中，有身體不適之情形，請盡速與教練反應。</li><li>請自行攜帶個人下水衣物（衝浪褲或輕便不吸水衣物）、上岸後的乾衣服、毛巾、防曬用品等。近視者可自備日拋型隱形眼鏡，女性生理期時可使用棉條。</li></ul></li><li>集合地點：澎湖縣馬公市52號之7&nbsp; (波賽頓海洋運動俱樂部 Poseidon Water Sports Club）</li></ul><p><img src="https://photos.journeyonapp.com/file/show/yDwLl/1024.jpg" alt="" style="" class="img-responsive"></p><p><img src="https://photos.journeyonapp.com/file/show/3DawW/1024.jpg" alt="" style="" class="img-responsive"></p><p><img src="https://photos.journeyonapp.com/file/show/wvq3d/1024.jpg" alt="" style="" class="img-responsive"></p></div>',
          }
        })
      )
      .finally(
        action(() => {
          this.isLoading = false
        })
      )
  }

  @action loadArticle(slug, { acceptCached = false } = {}) {
    if (acceptCached) {
      const article = this.getArticle(slug)
      if (article) return Promise.resolve(article)
    }
    this.isLoading = true
    return agent.Articles.get(slug)
      .then(
        action(({ article }) => {
          this.articlesRegistry.set(article.slug, article)
          return article
        })
      )
      .finally(
        action(() => {
          this.isLoading = false
        })
      )
  }

  @action makeFavorite(slug) {
    const article = this.getArticle(slug)
    if (article && !article.favorited) {
      article.favorited = true
      article.favoritesCount++
      return agent.Articles.favorite(slug).catch(
        action((err) => {
          article.favorited = false
          article.favoritesCount--
          throw err
        })
      )
    }
    return Promise.resolve()
  }

  @action unmakeFavorite(slug) {
    const article = this.getArticle(slug)
    if (article && article.favorited) {
      article.favorited = false
      article.favoritesCount--
      return agent.Articles.unfavorite(slug).catch(
        action((err) => {
          article.favorited = true
          article.favoritesCount++
          throw err
        })
      )
    }
    return Promise.resolve()
  }

  @action createArticle(article) {
    return agent.Articles.create(article).then(({ article }) => {
      this.articlesRegistry.set(article.slug, article)
      return article
    })
  }

  @action updateArticle(data) {
    return agent.Articles.update(data).then(({ article }) => {
      this.articlesRegistry.set(article.slug, article)
      return article
    })
  }

  @action deleteArticle(slug) {
    this.articlesRegistry.delete(slug)
    return agent.Articles.del(slug).catch(
      action((err) => {
        this.loadArticles()
        throw err
      })
    )
  }
}

export default new ArticlesStore()
