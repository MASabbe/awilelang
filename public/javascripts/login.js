/* Simple VanillaJS to toggle class */
document.getElementById('btn_avatar').addEventListener('click', 
	function () {
		[].map.call(document.querySelectorAll('.profile'),
			function(el) {
				el.classList.toggle('profile--open');
			});
	}
);
