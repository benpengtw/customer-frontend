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
              '<div><span style="color:#ff0000">★★即日起購買義大世界2張成人票，即贈絨毛大義面紙盒套1個。<br>      數量有限，送完為止(買2組送2個...以此類推)★★</span><br><br><span style="color:rgb(255, 0, 0)">★</span>2020/4/1~4/30 入園者，每張全票可用＄１０元加購一張學童票 (12歲以下、或持學生證)！<br><br>◎義大遊樂世界，為全台唯一希臘情境主題樂園，47項遊樂設施獨冠全台。位於戶外高達55公尺的『天旋地轉』，<br>  落差33公尺的『飛越愛情海』，還有亞洲唯一U型滑板『極限挑戰』，讓你體驗瘋狂急轉、高空震撼！<br><br><span style="color:rgb(255, 0, 0)">★休園日期公告</span><br>2020/5/5(二)、5/6(三)、5/12(二)、5/13(三)、5/19(二)、5/20(三)、5/26(二)、5/27(三)<br> </div>',
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
