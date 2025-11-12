(function(){
			const nodes = document.querySelectorAll('[data-reveal]');
			if(!nodes.length) return;
			const obs = new IntersectionObserver((entries, o) => {
				entries.forEach(e => {
					if (e.isIntersecting) {
						e.target.classList.add('reveal', 'is-revealed');
						o.unobserve(e.target);
					} else {
						// ensure initial class exists for transition if not yet intersecting
						e.target.classList.add('reveal');
					}
				});
			}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
			nodes.forEach(n => obs.observe(n));
		})();

		// Lightbox gallery functionality
		(function(){
			const lightbox = document.getElementById('lightbox');
			const lightboxImg = document.getElementById('lightbox-img');
			const closeBtn = document.querySelector('.lightbox-close');
			const prevBtn = document.querySelector('.lightbox-prev');
			const nextBtn = document.querySelector('.lightbox-next');
			const currentIndexEl = document.getElementById('current-index');
			const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
			
			let currentIndex = 0;

			function openLightbox(index) {
				currentIndex = index;
				lightboxImg.src = galleryItems[currentIndex].dataset.src;
				currentIndexEl.textContent = currentIndex + 1;
				lightbox.classList.add('active');
				document.body.style.overflow = 'hidden';
			}

			function closeLightbox() {
				lightbox.classList.remove('active');
				document.body.style.overflow = '';
			}

			function showNext() {
				currentIndex = (currentIndex + 1) % galleryItems.length;
				lightboxImg.src = galleryItems[currentIndex].dataset.src;
				currentIndexEl.textContent = currentIndex + 1;
			}

			function showPrev() {
				currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
				lightboxImg.src = galleryItems[currentIndex].dataset.src;
				currentIndexEl.textContent = currentIndex + 1;
			}

			galleryItems.forEach((item, index) => {
				item.addEventListener('click', () => openLightbox(index));
			});

			closeBtn.addEventListener('click', closeLightbox);
			nextBtn.addEventListener('click', showNext);
			prevBtn.addEventListener('click', showPrev);

			lightbox.addEventListener('click', (e) => {
				if (e.target === lightbox) closeLightbox();
			});

			document.addEventListener('keydown', (e) => {
				if (!lightbox.classList.contains('active')) return;
				if (e.key === 'Escape') closeLightbox();
				if (e.key === 'ArrowRight') showNext();
				if (e.key === 'ArrowLeft') showPrev();
			});
		})();