// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
	const navToggle = document.querySelector(".nav-toggle");
	const navMenu = document.querySelector(".nav-menu");
	const navAuth = document.querySelector(".nav-auth");

	console.log("DOM loaded, nav elements:", { navToggle, navMenu, navAuth });

	if (navToggle && navMenu && navAuth) {
		navToggle.addEventListener("click", function (e) {
			e.preventDefault();
			e.stopPropagation();
			console.log("Mobile menu toggle clicked");

			navMenu.classList.toggle("active");
			navAuth.classList.toggle("active");
			navToggle.classList.toggle("active");

			console.log("Menu classes after toggle:", {
				navMenu: navMenu.classList.toString(),
				navAuth: navAuth.classList.toString(),
				navToggle: navToggle.classList.toString(),
			});

			// Handle menu visibility properly
			if (navMenu.classList.contains("active")) {
				navMenu.style.display = "flex";
				navMenu.style.visibility = "visible";
				navMenu.style.opacity = "1";
				navMenu.style.transform = "translateY(0)";
				console.log("Menu opened");
			} else {
				navMenu.style.display = "none";
				navMenu.style.visibility = "hidden";
				navMenu.style.opacity = "0";
				navMenu.style.transform = "translateY(-100vh)";
				console.log("Menu closed");
			}

			// Handle auth menu visibility
			if (navAuth.classList.contains("active")) {
				navAuth.style.display = "flex";
				navAuth.style.visibility = "visible";
				navAuth.style.opacity = "1";
				navAuth.style.transform = "translateY(0)";
			} else {
				navAuth.style.display = "none";
				navAuth.style.visibility = "hidden";
				navAuth.style.opacity = "0";
				navAuth.style.transform = "translateY(-100vh)";
			}
		});

		// Close menu when clicking outside
		document.addEventListener("click", function (event) {
			if (
				!navToggle.contains(event.target) &&
				!navMenu.contains(event.target) &&
				!navAuth.contains(event.target)
			) {
				navMenu.classList.remove("active");
				navAuth.classList.remove("active");
				navToggle.classList.remove("active");
			}
		});

		// Close menu when clicking on a nav link
		const navLinks = document.querySelectorAll(".nav-menu .nav-link");
		navLinks.forEach((link) => {
			link.addEventListener("click", function () {
				navMenu.classList.remove("active");
				navAuth.classList.remove("active");
				navToggle.classList.remove("active");
			});
		});
	}

	// Smooth scrolling for navigation links
	const navLinks = document.querySelectorAll(".nav-link");
	navLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();
			const targetId = this.getAttribute("href").substring(1);
			const targetSection = document.getElementById(targetId);
			if (targetSection) {
				targetSection.scrollIntoView({
					behavior: "smooth",
				});
			}
		});
	});

	// Search functionality
	const searchInput = document.querySelector(".search-input");
	const searchBtn = document.querySelector(".search-btn");

	if (searchBtn) {
		searchBtn.addEventListener("click", function () {
			const query = searchInput.value.trim();
			if (query) {
				// Simulate search functionality
				console.log("Searching for:", query);
				alert(`Searching for: ${query}`);
			}
		});
	}

	if (searchInput) {
		searchInput.addEventListener("keypress", function (e) {
			if (e.key === "Enter") {
				const query = this.value.trim();
				if (query) {
					console.log("Searching for:", query);
					alert(`Searching for: ${query}`);
				}
			}
		});
	}

	// Device card interactions
	const deviceCards = document.querySelectorAll(".device-card");
	deviceCards.forEach((card) => {
		card.addEventListener("click", function () {
			const deviceName = this.querySelector("h3").textContent;
			console.log("Viewing device:", deviceName);
		});
	});

	// Category card interactions
	const categoryCards = document.querySelectorAll(".category-card");
	categoryCards.forEach((card) => {
		card.addEventListener("click", function () {
			const categoryName = this.querySelector("h3").textContent;
			console.log("Browsing category:", categoryName);
		});
	});

	// Navbar scroll effect
	window.addEventListener("scroll", function () {
		const navbar = document.querySelector(".navbar");
		if (window.scrollY > 100) {
			navbar.style.background = "rgba(255, 255, 255, 0.98)";
			navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
		} else {
			navbar.style.background = "rgba(255, 255, 255, 0.95)";
			navbar.style.boxShadow = "none";
		}
	});

	// Animate elements on scroll
	const observerOptions = {
		threshold: 0.1,
		rootMargin: "0px 0px -50px 0px",
	};

	const observer = new IntersectionObserver(function (entries) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = "1";
				entry.target.style.transform = "translateY(0)";
			}
		});
	}, observerOptions);

	// Observe elements for animation
	const animateElements = document.querySelectorAll(
		".category-card, .device-card, .step-card"
	);
	animateElements.forEach((el) => {
		el.style.opacity = "0";
		el.style.transform = "translateY(30px)";
		el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
		observer.observe(el);
	});

	// Stats counter animation
	const statNumbers = document.querySelectorAll(".stat-number");
	const statsObserver = new IntersectionObserver(
		function (entries) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const target = entry.target;
					const finalValue = target.textContent;
					const numericValue = parseInt(finalValue.replace(/[^\d]/g, ""));

					if (numericValue) {
						let currentValue = 0;
						const increment = numericValue / 50;
						const timer = setInterval(() => {
							currentValue += increment;
							if (currentValue >= numericValue) {
								currentValue = numericValue;
								clearInterval(timer);
							}
							target.textContent =
								Math.floor(currentValue).toLocaleString() +
								finalValue.replace(/[\d,]/g, "");
						}, 30);
					}
					statsObserver.unobserve(target);
				}
			});
		},
		{ threshold: 0.5 }
	);

	statNumbers.forEach((stat) => {
		statsObserver.observe(stat);
	});
});

// Add mobile menu styles dynamically
const style = document.createElement("style");
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            width: 100%;
            background: white;
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            transform: translateY(-100vh);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 9999;
            max-height: calc(100vh - 70px);
            overflow-y: auto;
            display: flex !important;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-menu .nav-link {
            padding: 1rem 0;
            border-bottom: 1px solid #e5e7eb;
            width: 100%;
            text-align: center;
            display: block;
            font-size: 1.1rem;
        }
        
        .nav-menu .nav-link:last-child {
            border-bottom: none;
        }
        
        .nav-auth {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            width: 100%;
            background: white;
            flex-direction: column;
            padding: 1rem 2rem 2rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            transform: translateY(-100vh);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 9998;
            display: flex !important;
        }
        
        .nav-auth.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-auth .btn {
            width: 100%;
            margin: 0.5rem 0;
            text-align: center;
            padding: 1rem;
        }
        
        .nav-toggle {
            cursor: pointer;
            z-index: 10000;
            display: flex !important;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);
