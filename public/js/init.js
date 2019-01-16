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

  function request() {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener('load', reqListen);
    oReq.open('GET', url);
    oReq.send();
  }

  function reqListen() {
    let container = document.querySelector('.redditContainer');
    container.innerHTML = '';
    let response = JSON.parse(this.responseText);
    let posts = response.data.children;

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
      if (postData.thumbnail === 'self' || postData.thumbnail === 'default') {
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
  request();

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

  function changeUrl(e) {
    url = e.dataset.link;
    imgUrl = e.dataset.img;
    request();
  }

  function randomReddit() {
    url = randomList[Math.floor(Math.random() * 10)];
    imgUrl = 'https://media.istockphoto.com/photos/question-mark-picture-id673273200?k=6&m=673273200&s=612x612&w=0&h=Fzzz4Z2RgY7HfRYd79WoLtoCY_ufU0gOy_ZfVFDWe7A=';
    request();
  }

}