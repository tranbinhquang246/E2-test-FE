// Header Sticky script
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  const headers = document.querySelectorAll(".sticky-on-scroll");

  headers.forEach((header) => {
    if (currentScroll > lastScroll && currentScroll > 0) {
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
    }
  });

  if (currentScroll > 0) {
    headers[1].classList.add("scrolled");
  } else {
    headers[1].classList.remove("scrolled");
  }
  lastScroll = currentScroll;
});

// Responsive navbar script
document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    menuToggle: document.querySelector(".menu-toggle"),
    mobileMenu: document.querySelector(".mobile-menu"),
    cartToggle: document.querySelector(".cart-toggle"),
    searchToggle: document.querySelector(".search-toggle"),
    cartDrawer: document.querySelector(".cart-drawer-container"),
    searchDrawer: document.querySelector(".search-drawer-container"),
    overlay: document.querySelector(".overlay"),
    closeMenuIcon: document.querySelector(".close-mobile-menu-icon"),
    closeCartIcon: document.querySelector(".close-cart-drawer-icon"),
    closeSearchIcon: document.querySelector(".close-search-drawer-icon"),
    body: document.querySelector("body"),
  };

  const toggleState = (element) => {
    return (event) => {
      event.stopPropagation();
      element.classList.toggle("active");
      elements.overlay.classList.toggle("active");
      elements.body.classList.toggle("no-scroll");
    };
  };

  const closeAll = (event) => {
    event.stopPropagation();
    [elements.mobileMenu, elements.cartDrawer, elements.searchDrawer].forEach(
      (el) => el.classList.remove("active")
    );
    elements.overlay.classList.remove("active");
    elements.body.classList.remove("no-scroll");
  };

  const stopPropagation = (event) => event.stopPropagation();

  elements.menuToggle.addEventListener(
    "click",
    toggleState(elements.mobileMenu)
  );
  elements.cartToggle.addEventListener(
    "click",
    toggleState(elements.cartDrawer)
  );
  elements.searchToggle.addEventListener(
    "click",
    toggleState(elements.searchDrawer)
  );

  elements.overlay.addEventListener("click", closeAll);
  elements.closeMenuIcon.addEventListener("click", closeAll);
  elements.closeCartIcon.addEventListener("click", closeAll);
  elements.closeSearchIcon.addEventListener("click", closeAll);

  elements.cartDrawer.addEventListener("click", stopPropagation);
  elements.searchDrawer.addEventListener("click", stopPropagation);
});

document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".mobile-nav-item");

  menuItems.forEach((item) => {
    const title = item.querySelector(".mobile-nav-title");
    const content = item.querySelector(".mobile-nav-content");

    if (content) {
      title.addEventListener("click", () => {
        menuItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove("active");
          }
        });

        item.classList.toggle("active");
      });
    }
  });
});

// Calculate poisition menu dropdown show
function adjustDropdownPosition(dropdown) {
  console.log(dropdown);
  const dropdownWidth = dropdown.offsetWidth;
  console.log(dropdownWidth);
  let leftOffset = -(dropdownWidth / 2);
  const dropdownLeft = dropdown.getBoundingClientRect().left;
  if (dropdownLeft + leftOffset < 0) {
    leftOffset = -dropdownLeft;
  }
  dropdown.style.left = `${leftOffset}px`;
}

const dropdowns = document.querySelectorAll(".nav-item .dropdown-menu");
dropdowns.forEach((dropdown) => {
  adjustDropdownPosition(dropdown);
});

// Slider script
document.querySelector(".menu-toggle").addEventListener("click", function () {
  document.querySelector(".navbar").classList.toggle("active");
});

const indicators = document.querySelectorAll(".slider .indicators .indicator");
const arrowPrev = document.querySelector(".slider .arrows .arrow-prev");
const arrowNext = document.querySelector(".slider .arrows .arrow-next");
const slides = document.querySelectorAll(".slider-inner .slide");
const totalSlides = slides.length;

let currentIndex = 0;
let autoSlideInterval;

const handleIndicatorClick = (event) => {
  const indicator = event.target;
  if (!isActive(indicator)) {
    setActiveSlide(parseInt(indicator.dataset.slide) - 1);
  }
};

indicators.forEach((indicator) => {
  indicator.addEventListener("click", handleIndicatorClick);
});

function isActive(indicator) {
  return indicator.hasAttribute("active");
}

function removeActive() {
  document.querySelectorAll(".slider .indicators [active]").forEach((item) => {
    item.removeAttribute("active");
  });
}

function addActive(indicator) {
  indicator.setAttribute("active", "");
}

function showSlide(index) {
  const newPosition = (100 * index).toString();
  document.querySelector(".slider-inner").style.marginLeft = `-${newPosition}%`;
}

function setActiveSlide(index) {
  currentIndex = index;
  removeActive();
  addActive(indicators[index]);
  showSlide(index);

  slides.forEach((slide) =>
    slide.querySelector(".content").classList.remove("active")
  );

  slides[index].querySelector(".content").classList.add("active");
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  setActiveSlide(currentIndex);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 30000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

document.querySelector(".slider").addEventListener("mouseenter", stopAutoSlide);
document
  .querySelector(".slider")
  .addEventListener("mouseleave", startAutoSlide);
document.addEventListener("DOMContentLoaded", () => {
  slides[currentIndex].querySelector(".content").classList.add("active");
});

startAutoSlide();

// Tab script
const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
    target.classList.add("active");
  });
});

//Animation for product when scrollscroll
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".product");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  items.forEach((item) => observer.observe(item));
});

// Logic when select color
document.querySelectorAll(".color-product").forEach((color) => {
  color.addEventListener("click", function (event) {
    event.preventDefault();
    document
      .querySelectorAll(".color-product")
      .forEach((c) => c.classList.remove("selected"));
    this.classList.add("selected");
  });
});
