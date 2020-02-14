$(document).ready(function() {
	$.ajax({
		type: 'GET',
		url: 'https://my-json-server.typicode.com/MrAntonsen/jqDb/posts',
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(res) {
			const $posts = $('.output-list');

			$(res).each((i, post) => {
				let postcard = `
              <div class="card gradient-border mb-5 mt-1" id="${i}_post">
                <div class="card-body">
                  <h3 class="card-title text-center font-weight-bold">
                    ${post.title}
                  </h3>
                </div>
              </div>
              `;
				$posts.on('click', () => {
					console.log(post.userId);
					sessionStorage.setItem('userId', post.id);
					window.location = 'posts.html';
				});
				$posts.append(postcard);
			});
		}
	});
});
