import { isMobile } from './deviceType';


const serverAddress = window.navigator.serverAddress ? window.navigator.serverAddress : 'http://news-at.zhihu.com';
const urlBase = isMobile ? 'http://news-at.zhihu.com' : 'http://' + location.hostname + ':3000/zhihu';


export default {
	'latestNews': () => `${urlBase}/api/4/news/latest`,
	'newsList': (date) => `${urlBase}/api/4/news/before/${date}`,
	'newsDetail': (id) => `${urlBase}/api/4/news/${id}`
}