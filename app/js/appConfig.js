const artiListBaseUrl = 'http://c.3g.163.com/nc/article/list/';

export let chief = {
	cid: 'T1450857195751',
	//baseUrl: DEBUG ? './mocks/chief.json?path=' : artiListBaseUrl
	baseUrl: './mocks/chief.json?path='
};

export let news = {
	cid: 'T1450665645563',
	//baseUrl: DEBUG ? './mocks/news.json?path=' : artiListBaseUrl
	baseUrl: artiListBaseUrl
};

export let honor = {
	cid: 'T1450170934802',
	//baseUrl: DEBUG ? './mocks/news.json?path=' : artiListBaseUrl
	baseUrl: artiListBaseUrl
};

export const speech = {
  // domain: 'testtesttest12312.lofter.com'
  domain: 'i.lofter.com'
}