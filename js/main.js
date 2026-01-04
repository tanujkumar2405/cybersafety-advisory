/*
	js/main.js
	- Vanilla JS to power UI interactions for the CyberSafety Advisory site
	- Features:
		* Smooth scroll for navigation
		* Mobile nav toggle
		* Sticky header (visual tweak via class)
		* Incident decision helper (interactive)
		* Downloadable safety checklist (client-side, no backend)
		* Contact form validation and client-side feedback (no data sent)
		* Small accessibility helpers (focus management, keyboard support)
		* Google Translate API integration for multi-language support
*/

(function () {
	'use strict';

	// --- Sticky Disclaimer Footer ---
	function initStickyDisclaimer() {
		const stickyDisclaimer = document.getElementById('sticky-disclaimer');
		const siteFooter = document.querySelector('.site-footer');
		
		if (!stickyDisclaimer || !siteFooter) return;
		
		function checkFooterVisibility() {
			const footerRect = siteFooter.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			
			// Hide sticky disclaimer if footer is visible in viewport
			if (footerRect.top < viewportHeight) {
				stickyDisclaimer.classList.add('hidden');
			} else {
				stickyDisclaimer.classList.remove('hidden');
			}
		}
		
		// Check on load and scroll
		checkFooterVisibility();
		window.addEventListener('scroll', checkFooterVisibility);
		window.addEventListener('resize', checkFooterVisibility);
	}

	// --- Google Translate Integration ---
	function initGoogleTranslate() {
		const languageSelect = document.getElementById('language-select');
		if (!languageSelect) return;

		// Check if a translation is already active (user selected a language before)
		const currentCookie = document.cookie.split(';').find(c => c.trim().startsWith('googtrans='));
		const isTranslated = currentCookie && !currentCookie.includes('/en/en');

		// Only clear translation cookie if no active translation (to avoid flicker when returning to English)
		if (!isTranslated) {
			document.cookie = 'googtrans=/en/en;path=/;max-age=0';
			document.cookie = 'googtrans=;path=/;max-age=0';
		}

		// All languages supported by Google Translate
		const allLanguages = [
			{code:'af',name:'Afrikaans'},{code:'ar',name:'Arabic'},{code:'hy',name:'Armenian'},
			{code:'bg',name:'Bulgarian'},{code:'ca',name:'Catalan'},{code:'zh-CN',name:'Chinese (Simplified)'},
			{code:'zh-TW',name:'Chinese (Traditional)'},{code:'hr',name:'Croatian'},{code:'cs',name:'Czech'},
			{code:'da',name:'Danish'},{code:'nl',name:'Dutch'},{code:'en',name:'English'},{code:'et',name:'Estonian'},
			{code:'fi',name:'Finnish'},{code:'fr',name:'French'},{code:'de',name:'German'},{code:'el',name:'Greek'},
			{code:'gu',name:'Gujarati'},{code:'ht',name:'Haitian Creole'},{code:'he',name:'Hebrew'},{code:'hi',name:'Hindi'},
			{code:'hu',name:'Hungarian'},{code:'is',name:'Icelandic'},{code:'id',name:'Indonesian'},{code:'it',name:'Italian'},
			{code:'ja',name:'Japanese'},{code:'kn',name:'Kannada'},{code:'ko',name:'Korean'},{code:'lv',name:'Latvian'},
			{code:'lt',name:'Lithuanian'},{code:'mk',name:'Macedonian'},{code:'ms',name:'Malay'},{code:'ml',name:'Malayalam'},
			{code:'mr',name:'Marathi'},{code:'no',name:'Norwegian'},{code:'fa',name:'Persian'},{code:'pl',name:'Polish'},
			{code:'pt',name:'Portuguese'},{code:'pa',name:'Punjabi'},{code:'ro',name:'Romanian'},{code:'ru',name:'Russian'},
			{code:'sr',name:'Serbian'},{code:'si',name:'Sinhala'},{code:'sk',name:'Slovak'},{code:'sl',name:'Slovenian'},
			{code:'es',name:'Spanish'},{code:'sw',name:'Swahili'},{code:'sv',name:'Swedish'},{code:'ta',name:'Tamil'},
			{code:'te',name:'Telugu'},{code:'th',name:'Thai'},{code:'tr',name:'Turkish'},{code:'uk',name:'Ukrainian'},
			{code:'ur',name:'Urdu'},{code:'vi',name:'Vietnamese'},{code:'cy',name:'Welsh'},{code:'bn',name:'Bengali'},
			{code:'sq',name:'Albanian'}
		];

		// Populate the select with all languages
		languageSelect.innerHTML = '';
		allLanguages.forEach(lang => {
			const option = document.createElement('option');
			option.value = lang.code;
			option.textContent = lang.name;
			languageSelect.appendChild(option);
		});

		// Always default to English on page load/refresh
		// This ensures the site always starts in English, regardless of previous selections
		languageSelect.value = 'en';

		// Check if there's an active translation and update dropdown accordingly
		if (isTranslated && currentCookie) {
			const langMatch = currentCookie.match(/googtrans=\/en\/([^;]+)/);
			if (langMatch && langMatch[1]) {
				const activeLang = langMatch[1];
				languageSelect.value = activeLang;
			}
		}

		// Load Google Translate widget
		window.googleTranslateElementInit = function() {
			try {
				new google.translate.TranslateElement({
					pageLanguage: 'en',
					layout: google.translate.TranslateElement.InlineLayout.SIMPLE
				}, 'google-translate-element');
				console.log('Google Translate widget initialized successfully');
			} catch(e) {
				console.log('Google Translate widget init error (this is ok, will use cookie method)');
			}
		};

		// Dynamically load Google Translate script
		const script = document.createElement('script');
		script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
		script.async = true;
		document.head.appendChild(script);

		// Handle language change
		languageSelect.addEventListener('change', function(e) {
			const selectedLang = e.target.value;
			localStorage.setItem('csa_lang', selectedLang);

			if (selectedLang === 'en') {
				// Reset to English
				document.cookie = 'googtrans=/en/en;path=/';
				location.reload();
				return;
			}

			// Try to use the widget first (if it's available)
			const googleCombo = document.querySelector('.goog-te-combo');
			if (googleCombo) {
				googleCombo.value = selectedLang;
				googleCombo.dispatchEvent(new Event('change'));
				return;
			}

			// Fallback: use googtrans cookie and reload
			document.cookie = 'googtrans=/en/' + selectedLang + ';path=/';
			setTimeout(function() {
				location.reload();
			}, 100);
		});
	}

	// --- Utility helpers ---
	function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
	function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

	// Set current year in footer
	function setYear() {
		const y = new Date().getFullYear();
		const el = qs('#js-year');
		if (el) el.textContent = y;
	}

	// FAQ Accordion
	function initFAQ(){
		const toggles = qsa('.faq-toggle');
		if (!toggles.length) return;

		toggles.forEach(toggle => {
			toggle.addEventListener('click', () => {
				const answerId = toggle.getAttribute('aria-controls');
				const answer = qs(`#${answerId}`);
				if (!answer) return;

				const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
				const newState = !isExpanded;
				
				// Close all other FAQs
				toggles.forEach(t => {
					if (t !== toggle) {
						t.setAttribute('aria-expanded', 'false');
						const id = t.getAttribute('aria-controls');
						const el = qs(`#${id}`);
						if (el) el.hidden = true;
					}
				});

				// Toggle current
				toggle.setAttribute('aria-expanded', String(newState));
				answer.hidden = !newState;
			});

			// Keyboard support: Enter/Space to toggle
			toggle.addEventListener('keydown', (e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					toggle.click();
				}
			});
		});
	}

	// Smooth-scroll behavior for internal anchor links
	function initSmoothScroll() {
		qsa('a[href^="#"]').forEach(a => {
			// ignore links that are just '#'
			const href = a.getAttribute('href');
			if (!href || href === '#') return;
			a.addEventListener('click', (e) => {
				const url = new URL(a.href);
				if (url.pathname === location.pathname) {
					e.preventDefault();
					const target = document.getElementById(url.hash.slice(1));
					if (target) {
						target.scrollIntoView({behavior: 'smooth', block: 'start'});
						// move focus for accessibility
						target.setAttribute('tabindex', '-1');
						target.focus({preventScroll:true});
						window.setTimeout(()=> target.removeAttribute('tabindex'), 1000);
					}
				}
			});
		});
	}

	// Mobile nav toggle
	function initNavToggle() {
		const btn = qs('#nav-toggle');
		const nav = qs('#primary-nav');
		if (!btn || !nav) return;
		
		btn.addEventListener('click', () => {
			const expanded = btn.getAttribute('aria-expanded') === 'true';
			btn.setAttribute('aria-expanded', String(!expanded));
			nav.classList.toggle('active');
			// manage focus
			if (!expanded) nav.querySelector('a')?.focus();
		});

		// Close nav when clicking a link (mobile)
		nav.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', () => {
				if (window.innerWidth <= 640) {
					btn.setAttribute('aria-expanded', 'false');
					nav.classList.remove('active');
				}
			});
		});

		// Close nav when clicking outside
		document.addEventListener('click', (e) => {
			if (window.innerWidth <= 640) {
				if (!btn.contains(e.target) && !nav.contains(e.target)) {
					btn.setAttribute('aria-expanded', 'false');
					nav.classList.remove('active');
				}
			}
		});
	}

	// Decision helper data and UI
	const DECISIONS = {
		ongoing: {
			severity: 'Critical',
			summary: 'An ongoing compromise or coercive contact. Act immediately to stop further risk.',
			actions: [ 'Stop communication with the source', 'Disconnect devices from internet if safe', 'Do not enter OTPs or passwords', 'Contact official channels listed in resources' ]
		},
		loss: {
			severity: 'High',
			summary: 'A financial loss was likely. Secure accounts and gather evidence for official reports.',
			actions: [ 'Secure bank / payment apps', 'Do not share credentials', 'Note transaction details and timestamps', 'Consider reporting to official channels' ]
		},
		attempt: {
			severity: 'Medium',
			summary: 'There was an attempt but no confirmed loss. Preserve details and avoid further contact.',
			actions: [ 'Do not click unfamiliar links', 'Change any exposed passwords', 'Enable 2FA', 'Monitor accounts closely' ]
		},
		suspicion: {
			severity: 'Low',
			summary: 'Something felt off but no immediate loss. We recommend caution and basic checks.',
			actions: [ 'Verify sender identity through official channels', 'Avoid sharing personal info', 'Learn common red flags' ]
		}
	};

	function initDecisionHelper(){
		const buttons = qsa('.dec-btn');
		const output = qs('#decision-output');
		if (!buttons.length || !output) return;

		buttons.forEach(btn => {
			btn.addEventListener('click', () => {
				const key = btn.dataset.key;
				if (!DECISIONS[key]) return;
				// update aria state
				buttons.forEach(b => b.setAttribute('aria-pressed','false'));
				btn.setAttribute('aria-pressed','true');
				renderDecision(key, DECISIONS[key], output);
			});
			// enable keyboard activation via Enter/Space (button already handles it)
		});
	}

	function renderDecision(key, data, outputEl){
		outputEl.innerHTML = '';
		const title = document.createElement('h4');
		title.className = 'dec-title';
		title.textContent = data.severity + ' — ' + capitalize(key);
		const desc = document.createElement('p');
		desc.className = 'dec-desc';
		desc.textContent = data.summary;
		outputEl.appendChild(title);
		outputEl.appendChild(desc);

		const ul = document.createElement('ul');
		data.actions.forEach(a => {
			const li = document.createElement('li');
			li.textContent = a;
			ul.appendChild(li);
		});
		outputEl.appendChild(ul);
	}

	function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

	// Downloadable checklist (client-side file generation)
	function initChecklistDownload(){
		const btn = qs('#download-checklist');
		if (!btn) return;
		btn.addEventListener('click', () => {
			const lines = [
				'CyberSafety Advisory — Immediate Checklist',
				'',
				'1) Pause: Stop communication with the contact.',
				'2) Do NOT share OTPs, passwords, or payment details with anyone.',
				'3) Preserve evidence: note times, screenshots, transaction IDs.',
				'4) Secure accounts: change passwords and enable 2FA where possible.',
				'5) Contact official bank or platform channels directly (do not use links from suspicious messages).',
				'6) Consider reporting to appropriate authorities if loss occurred.',
				'',
				'This is advisory guidance only.'
			];

		const blob = new Blob([lines.join('\n')], {type:'text/plain'});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'cybersafety-checklist.txt';
			document.body.appendChild(a);
			a.click();
			a.remove();
			URL.revokeObjectURL(url);
		});
	}

	// Contact form: client-side validation and safe feedback
	function initContactForm(){
		const form = qs('#contact-form');
		const feedback = qs('#cf-feedback');
		const clear = qs('#cf-clear');
		if (!form) return;

		form.addEventListener('submit', (e) => {
			e.preventDefault();
			feedback.textContent = '';
			const name = form.name?.value?.trim() || qs('#cf-name')?.value?.trim();
			const email = form.email?.value?.trim() || qs('#cf-email')?.value?.trim();
			const message = form.message?.value?.trim() || qs('#cf-message')?.value?.trim();

			if (!name || !message) {
				showFormFeedback('Please provide your name and a brief description.', true);
				return;
			}

			// Basic sanitization: block obvious secret/credential mentions
			const forbidden = /(otp|one[- ]?time|password|pass(?:word)?|pin|cvv|account number|accountno|ssn)/i;
			if (forbidden.test(message) || forbidden.test(name)){
				showFormFeedback('Do not include OTPs, passwords, or payment details. Remove sensitive data and try again.', true);
				return;
			}

			// Simulate successful submission — intentionally does NOT transmit data.
			showFormFeedback('Thanks — your advisory request was noted locally. We do not transmit messages from this page.', false);
			form.reset();
		});

		clear?.addEventListener('click', () => { form.reset(); feedback.textContent = ''; });

		function showFormFeedback(msg, isError){
			if (!feedback) return;
			feedback.textContent = msg;
			feedback.style.color = isError ? '#b00020' : 'var(--muted)';
			if (!isError) setTimeout(()=> feedback.textContent = '', 7000);
		}
	}

	// Scroll animations with Intersection Observer
	function initScrollAnimations(){
		// Respect user motion preferences
		if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
			// Add class directly if motion is reduced
			document.querySelectorAll('[data-animate]').forEach(el => el.classList.add('animate-in'));
			return;
		}
		
		// Create observer for scroll animations
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if(entry.isIntersecting){
					// Add animation class when element enters viewport
					entry.target.classList.add('animate-in');
					// Stop observing this element after animation triggers
					observer.unobserve(entry.target);
				}
			});
		}, {
			threshold: 0.1,  // Trigger when 10% of element is visible
			rootMargin: '0px 0px -50px 0px'  // Start animation 50px before element is in view
		});
		
		// Observe all elements with data-animate attribute
		document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
	}

	// Initialization runner
	function init(){
		setYear();
		initGoogleTranslate();
		initSmoothScroll();
		initNavToggle();
		initFAQ();
		initScrollAnimations();
		initDecisionHelper();
		initChecklistDownload();
		initContactForm();
		initStickyDisclaimer();
		// minor ARIA improvement for header
		const header = qs('.site-header');
		if (header) header.setAttribute('role','banner');
		console.log('CyberSafety Advisory: scripts initialized');
	}

	// Run when DOM is ready
	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
	else init();

})();

