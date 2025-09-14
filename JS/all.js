const movies = [
	{ id: 1, title: "肖申克的救赎", year: 1994, rating: 9.7, genre: ["剧情","犯罪"], image: "image/img-xiao.webp" },
	{ id: 2, title: "霸王别姬", year: 1993, rating: 9.6, genre: ["剧情", "爱情"], image: "image/img-ba.webp" },
	{ id: 3, title: "阿甘正传", year: 1994, rating: 9.5, genre: ["剧情", "爱情"], image: "image/img-agan.webp" },
	{ id: 4, title: "这个杀手不太冷", year: 1994, rating: 9.4, genre: ["剧情", "动作"], image: "image/img-zhege.webp" },
	{ id: 5, title: "泰坦尼克号", year: 1997, rating: 9.4, genre: ["剧情", "爱情"], image: "image/img-tai.webp" },
	{ id: 6, title: "盗梦空间", year: 2010, rating: 9.3, genre: ["动作", "科幻"], image: "image/img-daom.webp" },
	{ id: 7, title: "千与千寻", year: 2001, rating: 9.3, genre: ["动画"], image: "image/img-qian.webp" },
	{ id: 8, title: "美丽人生", year: 1997, rating: 9.5, genre: ["剧情", "喜剧"], image: "image/img-meili.webp" },
	{ id: 9, title: "辛德勒的名单", year: 1993, rating: 9.3, genre: ["剧情", "战争"], image: "image/img-xindele.webp" },
	{ id: 10, title: "忠犬八公的故事", year: 2009, rating: 9.2, genre: ["剧情"], image: "image/img-zhongquan.webp" },
	{ id: 11, title: "楚门的世界", year: 1998, rating: 9.3, genre: ["剧情", "科幻"], image: "image/img-chumen.webp" },
	{ id: 12, title: "星际穿越", year: 2014, rating: 9.3, genre: ["剧情", "科幻"], image: "image/image-xingji.webp" }
];

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

function showSlide(index) {
	if (index >= totalSlides) currentSlide = 0;
	else if (index < 0) currentSlide = totalSlides - 1;
	else currentSlide = index;
	
	document.querySelector('.carousel-inner').style.transform = 
		`translateX(-${currentSlide * 100}%)`;
}
document.querySelector('.carousel-control.next').addEventListener('click', () => {
	showSlide(currentSlide + 1);
});
document.querySelector('.carousel-control.prev').addEventListener('click', () => {
	showSlide(currentSlide - 1);
});

setInterval(() => {
	showSlide(currentSlide + 1);
}, 5000);
		
		
var especial = "全部";
function generateMovieCards(moviesList, container) {
   const containerElem = document.querySelector(container);
   moviesList.forEach(movie => {
	   const card = document.createElement('div');
	   card.className = 'movie-card';
	   var dataGenre=movie.genre[0];
	   for (var i=1;i<(movie.genre).length;i++){
		   dataGenre=dataGenre+","+movie.genre[i];
	   }
	   card.setAttribute("dataGenre",dataGenre);
	   if(especial!="全部" && (movie.genre).indexOf(especial)<0){
		   card.style.display="none";
		}
	   card.innerHTML = `
		   <img src="${movie.image}" alt="${movie.title}">
		   <div class="movie-info">
			   <h3 class="movie-title">${movie.title}</h3>
			   <div class="movie-meta">
				   <span>${movie.year}</span>
				   <span class="rating">${movie.rating}</span>
			   </div>
		   </div>
	   `;
	   containerElem.appendChild(card);
   });
}

document.addEventListener('DOMContentLoaded', () => {
	generateMovieCards(movies, '#home .movie-grid');
	generateMovieCards(movies, '#search .movie-grid');
});

var add = true;
window.onscroll = function(){
	var list1 = document.getElementsByClassName("movie-grid")[0];
	var listHeight1 = list1.offsetHeight;
	var listTop1 = list1.offsetTop;
	var scrollTop1 = document.documentElement.scrollTop;
	var windowHeight1 = document.documentElement.clientHeight;
	if((listHeight1+listTop1)-Math.round(windowHeight1+scrollTop1)<50){
			generateMovieCards(movies, '#home .movie-grid');
	}
	
	
	var list2 = document.getElementsByClassName("movie-grid")[1];
	var listHeight2 = list2.offsetHeight;
	var listTop2 = list2.offsetTop;
	var scrollTop2 = document.documentElement.scrollTop;
	var windowHeight2 = document.documentElement.clientHeight;
	if((listHeight2+listTop2)-Math.round(windowHeight2+scrollTop2)<50){
		if(add==true){
			generateMovieCards(movies, '#search .movie-grid');
			add=true;
		}
		add=false;
	}
	
}
		
document.querySelectorAll('.category').forEach(cat => {
	cat.addEventListener('click', function() {
		document.querySelectorAll('.category').forEach(item => {
			item.classList.remove('active');
		});
		this.classList.add('active');
		especial=this.innerHTML;
		
		if(this.innerHTML!="全部"){
			var List = document.getElementsByClassName("movie-grid")[1];
			var list = List.getElementsByClassName("movie-card");
			for ( var i = 0; i < list.length; i++){
				var genre=list[i].getAttribute("datagenre");
				var genreList = genre.split(",");
				if (genreList.indexOf(this.innerHTML)>-1){
					list[i].style.display="block";
				}
				else {
					list[i].style.display="none";
				}
			}
		}
		else {
			var List = document.getElementsByClassName("movie-grid")[1];
			var list = List.getElementsByClassName("movie-card");
			for ( var i = 0; i < list.length; i++){
				list[i].style.display="block";
			}
		}
		
	});
});

		
const AppState = {
	currentUser: null,
	verificationCode: '',
	feedData: [],
	isLoggedIn: false,
	
	init() {
		this.loadUserFromStorage();
		this.setupNavigation();
		this.renderAllSections();
	},
	
	loadUserFromStorage() {
		const savedUser = localStorage.getItem('currentUser');
		if (savedUser) {
			this.currentUser = JSON.parse(savedUser);
			this.isLoggedIn = true;
		}
	},
	
	setupNavigation() {
		document.querySelectorAll('nav a').forEach(link => {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				document.querySelectorAll('nav a').forEach(item => {
					item.classList.remove('active');
				});
				link.classList.add('active');
				const sectionId = link.getAttribute('data-section');
				document.querySelectorAll('.section').forEach(section => {
					section.classList.remove('active');
				});
				document.getElementById(sectionId).classList.add('active');
				if (sectionId === 'feed' || sectionId === 'profile') {
					this.renderSection(sectionId);
				}
			});
		});
		document.addEventListener('userLogin', () => {
			this.isLoggedIn = true;
			this.renderSection('profile');
			this.renderSection('feed');
		});
		document.addEventListener('userLogout', () => {
			this.isLoggedIn = false;
			this.currentUser = null;
			this.renderSection('profile');
			this.renderSection('feed');
		});
	},
	
	renderAllSections() {
		this.renderSection('profile');
		this.renderSection('feed');
	},
	
	renderSection(sectionId) {
		if (sectionId === 'profile') {
			this.renderProfileContent();
		} else if (sectionId === 'feed') {
			this.renderFeedContent();
		}
	},
	renderProfileContent() {
		const profileContent = document.getElementById('profile-content');
		if (this.isLoggedIn && this.currentUser) {
			profileContent.innerHTML = `
				<div class="form-container">
					<h3 style="text-align: center; margin-bottom: 20px;">欢迎回来，${this.currentUser.name}</h3>
					<div class="user-info" style="justify-content: center; margin: 20px 0;">
						<img src="image/touxiang.jpg" class="user-avatar" alt="用户头像">
						<div>
							<div class="user-name">${this.currentUser.name}</div>
							<div>${this.currentUser.email}</div>
						</div>
					</div>
					<div style="text-align: center; margin-top: 30px;">
						<button class="btn" id="logout-btn">退出登录</button>
					</div>
				</div>
			`;
			document.getElementById('logout-btn').addEventListener('click', () => {
				this.logout();
			});
		}
		else {
			profileContent.innerHTML = `
				<div class="form-container">
					<h3 style="text-align: center; margin-bottom: 20px;">登录 / 注册</h3>
					<div class="form-group">
						<label for="email">电子邮箱</label>
						<input type="email" id="email" placeholder="请输入邮箱">
					</div>
					<div class="form-group">
						<label for="code">验证码</label>
						<div class="verification-code">
							<input type="text" id="code" placeholder="请输入验证码">
							<button class="btn" id="send-code-btn">发送验证码</button>
						</div>
					</div>
					<button class="btn" id="login-btn" style="width: 100%;">登录 / 注册</button>
				</div>
			`;
			document.getElementById('send-code-btn').addEventListener('click', () => {
				this.sendVerificationCode();
			});
			document.getElementById('login-btn').addEventListener('click', () => {
				this.loginWithCode();
			});
		}
	},
	
	sendVerificationCode() {
		const emailInput = document.getElementById('email');
		const email = emailInput.value.trim();
		if (!email) {
			alert('请输入邮箱地址');
			return;
		}
		if (!/\S+@\S+\.\S+/.test(email)) {
			alert('请输入有效的邮箱地址');
			return;
		}
		this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
		alert(`验证码已发送到 ${email}，验证码为：${this.verificationCode}`);
		
		const sendBtn = document.getElementById('send-code-btn');
		sendBtn.disabled = true;
		let countdown = 60;
		const timer = setInterval(() => {
			sendBtn.textContent = `重新发送(${countdown})`;
			countdown--;
			if (countdown < 0) {
				clearInterval(timer);
				sendBtn.textContent = '发送验证码';
				sendBtn.disabled = false;
			}
		}, 1000);
	},
	
	loginWithCode() {
		const emailInput = document.getElementById('email');
		const codeInput = document.getElementById('code');
		const email = emailInput.value.trim();
		const code = codeInput.value.trim();
		if (!email) {
			alert('请输入邮箱地址');
			return;
		}
		if (!code) {
			alert('请输入验证码');
			return;
		}
		if (code !== this.verificationCode) {
			alert('验证码错误');
			return;
		}
		this.currentUser = {
			email: email,
			name: email.split('@')[0],
			avatar: `image/touxiang.jpg`
		};
		localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
		const loginEvent = new CustomEvent('userLogin');
		document.dispatchEvent(loginEvent);
		alert('登录成功！');
	},
	logout() {
		this.currentUser = null;
		this.verificationCode = '';
		localStorage.removeItem('currentUser');
		const logoutEvent = new CustomEvent('userLogout');
		document.dispatchEvent(logoutEvent);
		alert('已退出登录');
	},
	renderFeedContent() {
		const feedContent = document.getElementById('feed-content');
		if (this.isLoggedIn && this.currentUser) {
			this.feedData = [
				{
					id: 1,
					user: {
						name: "忠实电影爱好者",
						avatar: "image/touxiang.jpg"
					},
					content: "刚刚看了《盗梦空间》，诺兰的导演功力真的太强了！梦境层层递进，逻辑严密，看完后让我思考了很久现实与梦境的边界。",
					time: "2小时前",
					likes: 24,
					comments: [
						{ user: "什么什么口牙", content: "同感！我看了三遍还是能发现新的细节" },
						{ user: "诺兰的粉丝", content: "这是我最喜欢的电影之一，每次看都有新发现" }
					],
					liked: false
				},
				{
					id: 2,
					user: {
						name: "dlc科幻迷",
						avatar: "image/touxiang.jpg"
					},
					content: "《星际穿越》中的五维空间概念太震撼了！虽然有些物理知识不太懂，但丝毫不影响观影体验，反而激发了我对宇宙的好奇心。",
					time: "5小时前",
					likes: 18,
					comments: [
						{ user: "天文de爱好者", content: "这部电影的科学顾问是基普·索恩，诺贝尔物理学奖得主，所以科学概念很扎实" }
					],
					liked: false
				}
			];
			feedContent.innerHTML = `
				<div class="post-form">
					<textarea placeholder="分享你的电影观后感..."></textarea>
					<div class="post-form-actions">
						<button class="btn" id="publish-btn">发布动态</button>
					</div>
				</div>
				<div id="feed-list"></div>
			`;
			document.getElementById('publish-btn').addEventListener('click', () => {
				this.publishPost();
			});
			this.renderFeedList();
		}
		else {
			feedContent.innerHTML = `
				<div class="login-prompt">
					<i class="fas fa-lock"></i>
					<h2>需要登录才能查看动态</h2>
					<p>请先登录或注册以查看您关注的人的动态以及您自己的动态</p>
				</div>
			`;
		}
	},
	renderFeedList() {
		const feedList = document.getElementById('feed-list');
		feedList.innerHTML = '';
		if (this.feedData.length === 0) {
			feedList.innerHTML = '<p style="text-align: center; padding: 30px;">暂无动态，快去发布一条吧！</p>';
			return;
		}
		this.feedData.forEach(post => {
			const postElement = document.createElement('div');
			postElement.className = 'feed-item';
			postElement.innerHTML = `
				<div class="user-info">
					<img src="${post.user.avatar}" class="user-avatar" alt="${post.user.name}">
					<div>
						<span class="user-name">${post.user.name}</span>
						<span class="post-time">${post.time}</span>
					</div>
				</div>
				<div class="post-content">
					${post.content}
				</div>
				<div class="post-actions">
					<div class="post-action like-btn ${post.liked ? 'liked' : ''}" data-id="${post.id}">
						<span>点赞：</span>
						<span>${post.likes}</span>
					</div>
					<div class="post-action">
						<span>评论：</span>
						<span>${post.comments.length}</span>
					</div>
				</div>
				<div class="comments-section">
					${post.comments.length > 0 ? `
						<div class="comments-list">
							${post.comments.map(comment => `
								<div class="comment">
									<span class="comment-user">${comment.user}:</span>
									<span>${comment.content}</span>
								</div>
							`).join('')}
						</div>
					` : ''}
					<div class="comment-input">
						<input type="text" placeholder="写下你的评论...">
					</div>
				</div>
			`;
			feedList.appendChild(postElement);
		});
		document.querySelectorAll('.like-btn').forEach(btn => {
			btn.addEventListener('click', function() {
				const postId = parseInt(this.getAttribute('data-id'));
				const post = AppState.feedData.find(p => p.id === postId);
				if (post) {
					if (post.liked) {
						post.likes--;
						post.liked = false;
						this.classList.remove('liked');
					} else {
						post.likes++;
						post.liked = true;
						this.classList.add('liked');
					}
					this.querySelectorAll('span')[1].textContent = post.likes;
				}
			});
		});
	},
	
	publishPost() {
		const textarea = document.querySelector('.post-form textarea');
		const content = textarea.value.trim();
		
		if (!content) {
			alert('请输入动态内容');
			return;
		}
		const newPost = {
			id: this.feedData.length + 1,
			user: {
				name: this.currentUser.name,
				avatar: "image/touxiang.jpg"
			},
			content: content,
			time: '刚刚',
			likes: 0,
			comments: [],
			liked: false
		};
		this.feedData.unshift(newPost);
		textarea.value = '';
		this.renderFeedList();
		alert('动态发布成功！');
	}
};
document.addEventListener('DOMContentLoaded', function() {
	AppState.init();
});
