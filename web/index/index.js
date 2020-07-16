console.clear();

$.getJSON('/brd', function(data) {

		const randomEmoji = () => {
			const emojis = ['','','','','','','',''];
			let randomNumber = Math.floor(Math.random() * emojis.length);
			return emojis[randomNumber]
		}

		var team = data.sort((a, b) => (a.brod > b.brod) ? -1 : 1)
		console.log(team)

		team.forEach((member, a) => {
			let newRow = document.createElement('li');
			newRow.classList = 'c-list__item';
			newRow.innerHTML = `
				<div class="c-list__grid">
					<div class="c-flag c-place u-bg--transparent">${a +1}</div>
					<div class="c-media">
						<img class="c-avatar c-media__img" src="${member.avatar}" />
						<div class="c-media__content">
							<div class="c-media__title">${member.username}</div>
						</div>
					</div>
					<div class="u-text--right c-kudos">
						<div class="u-mt--8">
							<strong>${member.brod}</strong>
						</div>
					</div>
				</div>
			`;
			if((a+1) === 1) {
				newRow.querySelector('.c-place').classList.add('u-text--dark')
				newRow.querySelector('.c-place').classList.add('u-bg--yellow')
				newRow.querySelector('.c-kudos').classList.add('u-text--yellow')
			} else if((a+1) === 2) {
				newRow.querySelector('.c-place').classList.add('u-text--dark')
				newRow.querySelector('.c-place').classList.add('u-bg--teal')
				newRow.querySelector('.c-kudos').classList.add('u-text--teal')
			} else if((a+1) === 3) {
				newRow.querySelector('.c-place').classList.add('u-text--dark')
				newRow.querySelector('.c-place').classList.add('u-bg--orange')
				newRow.querySelector('.c-kudos').classList.add('u-text--orange')
			}
			list.appendChild(newRow)
		})
});
