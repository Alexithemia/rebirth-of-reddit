window.onload = function () {
  let url = 'https://www.reddit.com/r/magicTCG.json';
  let imgUrl = 'https://media.wizards.com/2017/images/daily/41mztsnrdm.jpg';
  const randomList = [
    'https://www.reddit.com/r/funny.json',
    'https://www.reddit.com/r/aww.json',
    'https://www.reddit.com/r/dankmemes.json',
    'https://www.reddit.com/r/cats.json',
    'https://www.reddit.com/r/WildernessBackpacking.json',
    'https://www.reddit.com/r/snowboarding.json',
    'https://www.reddit.com/r/Overwatch.json',
    'https://www.reddit.com/r/IdiotsInCars.json',
    'https://www.reddit.com/r/holdmybeer.json',
    'https://www.reddit.com/r/WTF.json'
  ]
  let after = '';
  let isRunning = false;
  let searched = false;

  //request function
  function request(reqUrl) {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener('load', reqListen);
    oReq.open('GET', reqUrl);
    oReq.send();
    after = '';
  }

  //request listener parses and creates cards
  function reqListen() {
    let container = document.querySelector('.redditContainer');
    let response = JSON.parse(this.responseText);
    after = response.data.after;
    isRunning = false;
    let posts = response.data.children;

    //creates and populates card for each post
    posts.forEach(post => {
      postData = post.data;
      let box = document.createElement('div');
      box.className = 'redditBox'
      container.appendChild(box);
      let content = document.createElement('div');
      content.className = 'redditBoxContent'
      box.appendChild(content);

      let aImg = document.createElement('a');
      content.appendChild(aImg);
      aImg.href = postData.url;
      let img = document.createElement('img');
      aImg.appendChild(img);
      if (postData.thumbnail === 'self' || postData.thumbnail === 'default' || postData.thumbnail === 'image') {
        img.src = imgUrl;
      } else {
        img.src = postData.thumbnail;
      }

      let aSub = document.createElement('a');
      content.appendChild(aSub);
      aSub.href = postData.url;
      let subject = document.createElement('div');
      subject.className = 'subject';
      subject.innerHTML = postData.title;
      aSub.appendChild(subject);

      let details = document.createElement('div');
      details.className = 'details';
      const time = moment(postData.created_utc * 1000).fromNow();
      details.innerHTML = 'by ' + postData.author + ' • ' + time + ' • ' + postData.ups + ' upvotes';

      content.appendChild(details);
      let preview = document.createElement('div');
      preview.className = 'preview';
      if (postData.selftext.length > 100) {
        const tempText = postData.selftext.slice(0, 150);
        let ellipsis = tempText.concat('...');
        preview.innerHTML = ellipsis;
      } else {
        preview.innerHTML = postData.selftext;
      }
      content.appendChild(preview);
    });
  }
  request(url);

  //listeners for buttons
  const random = document.getElementById('random');
  random.addEventListener('click', function (event) {
    randomReddit();
  })
  const magic = document.getElementById('magic');
  magic.addEventListener('click', function (event) {
    changeUrl(event.target);
  })
  const cars = document.getElementById('cars');
  cars.addEventListener('click', function (event) {
    changeUrl(event.target);
  })
  const videoGames = document.getElementById('videoGames');
  videoGames.addEventListener('click', function (event) {
    changeUrl(event.target);
  })
  const getApp = document.getElementById('getApp');
  getApp.addEventListener('click', function (event) {
    showApp();
  })
  const search = document.getElementById('searchBtn');
  search.addEventListener('click', function (event) {
    searchReddit();
  })

  //changes url to match data of selected button
  function changeUrl(e) {
    url = e.dataset.link;
    imgUrl = e.dataset.img;
    clearContainer();
    request(url);
  }

  //clears current board from page
  function clearContainer() {
    let container = document.querySelector('.redditContainer');
    container.innerHTML = '';
  }

  //random function pulls random url from list
  function randomReddit() {
    url = randomList[Math.floor(Math.random() * 10)];
    imgUrl = 'https://media.istockphoto.com/photos/question-mark-picture-id673273200?k=6&m=673273200&s=612x612&w=0&h=Fzzz4Z2RgY7HfRYd79WoLtoCY_ufU0gOy_ZfVFDWe7A=';
    clearContainer();
    request(url);
  }

  //infinite scrolling listener and function
  window.onscroll = yHandler;
  function yHandler() {
    let wrap = document.getElementById('wrap');
    let contentHeight = wrap.offsetHeight;
    let yOffset = window.pageYOffset;
    let y = yOffset + window.innerHeight;
    if (y >= contentHeight && !isRunning && after) {
      isRunning = true;
      let tempUrl;
      if (searched) {
        tempUrl = url.concat('&after=' + after);
        searched = false;
      } else {
        tempUrl = url.concat('?after=' + after);
      }
      request(tempUrl);
    }
  }

  //appends search string to search url and runs a new request
  function searchReddit() {
    input = document.getElementById('inputStr').value;
    url = 'https://www.reddit.com/search.json?q=' + input;
    searched = true;
    imgUrl = 'https://media.istockphoto.com/photos/question-mark-picture-id673273200?k=6&m=673273200&s=612x612&w=0&h=Fzzz4Z2RgY7HfRYd79WoLtoCY_ufU0gOy_ZfVFDWe7A=';
    clearContainer();
    request(url);
  }
}
