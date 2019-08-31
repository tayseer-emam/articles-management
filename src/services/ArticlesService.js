import store from '@/store';
import { uuid } from '@/services/Utilities';

const articles = JSON.parse(localStorage.getItem('am_articles')) || [];

const getIndex = id => articles.findIndex(article => article.id === id);

export default {
  getArticles() {
    return articles;
  },
  getArticle(id) {
    const articleIndex = getIndex(id);
    return articles[articleIndex];
  },
  addArticle(articleInfo) {
    return new Promise((resolve, reject) => {
      const date = new Date().toDateString();
      const newArticle = { 
        id: uuid(), 
        ownerId: store.getters.user.id,
        ...articleInfo,
        date,
      };

      const tempArticles = [ ...articles, newArticle ];

      try {
        localStorage.setItem('am_articles', JSON.stringify(tempArticles));
        articles.push(newArticle);
        resolve(newArticle);
      } catch (error) {
        reject({ message: 'You exceed your free storage space, buy more storage to be able to post a new articles' });
      }
    });
  },
  editArticle(articleInfo) {
    return new Promise((resolve, reject) => {
      const id = articleInfo.id;
      const articleIndex = getIndex(id);
      const date = new Date().toDateString();
      const newArticle = { 
        id: articleInfo.id, 
        ownerId: store.getters.user.id,
        ...articleInfo,
        date,
      };
      
      const tempArticles = [ ...articles ];
      tempArticles[articleIndex] = newArticle;

      try {
        localStorage.setItem('am_articles', JSON.stringify(tempArticles));
        articles[articleIndex] = newArticle;
        resolve(newArticle);
      } catch (error) {
        reject({ message: 'You exceed your free storage space, buy more storage to be able to post a new articles' });
      }
    });
  },
  deleteArticle(id) {
    const articleIndex = getIndex(id);
    articles.splice(articleIndex, 1);
    localStorage.setItem('am_articles', JSON.stringify(articles));
  },
}