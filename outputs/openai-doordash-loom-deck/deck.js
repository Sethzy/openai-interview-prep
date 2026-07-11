/* === FIXED-STAGE PRESENTATION CONTROLLER === */
class SlidePresentation {
  constructor() {
    this.stage = document.getElementById("deckStage");
    this.slides = Array.from(document.querySelectorAll(".slide"));
    this.status = document.getElementById("slideStatus");
    this.currentSlide = 0;
    this.wheelLocked = false;
    this.touchStartX = 0;
    this.touchStartY = 0;

    this.setupStageScale();
    this.setupKeyboardNavigation();
    this.setupWheelNavigation();
    this.setupTouchNavigation();
    this.showSlide(this.readInitialSlide());
  }

  readInitialSlide() {
    const hashMatch = window.location.hash.match(/^#slide-(\d+)$/);
    if (!hashMatch) return 0;
    return Math.max(0, Math.min(Number(hashMatch[1]) - 1, this.slides.length - 1));
  }

  setupStageScale() {
    const scaleStage = () => {
      const factor = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      const x = (window.innerWidth - 1920 * factor) / 2;
      const y = (window.innerHeight - 1080 * factor) / 2;
      this.stage.style.transform = `translate(${x}px, ${y}px) scale(${factor})`;
    };

    scaleStage();
    window.addEventListener("resize", scaleStage, { passive: true });
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (event) => {
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        this.next();
        return;
      }

      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        this.previous();
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        this.showSlide(0);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        this.showSlide(this.slides.length - 1);
        return;
      }

      if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        this.toggleFullscreen();
      }
    });
  }

  setupWheelNavigation() {
    window.addEventListener("wheel", (event) => {
      if (this.wheelLocked || Math.abs(event.deltaY) < 24) return;
      this.wheelLocked = true;
      event.deltaY > 0 ? this.next() : this.previous();
      window.setTimeout(() => {
        this.wheelLocked = false;
      }, 450);
    }, { passive: true });
  }

  setupTouchNavigation() {
    window.addEventListener("touchstart", (event) => {
      const touch = event.changedTouches[0];
      this.touchStartX = touch.clientX;
      this.touchStartY = touch.clientY;
    }, { passive: true });

    window.addEventListener("touchend", (event) => {
      const touch = event.changedTouches[0];
      const dx = touch.clientX - this.touchStartX;
      const dy = touch.clientY - this.touchStartY;
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
      dx < 0 ? this.next() : this.previous();
    }, { passive: true });
  }

  showSlide(index) {
    const boundedIndex = Math.max(0, Math.min(index, this.slides.length - 1));
    this.currentSlide = boundedIndex;

    this.slides.forEach((slide, slideIndex) => {
      const isCurrent = slideIndex === boundedIndex;
      slide.classList.toggle("active", isCurrent);
      slide.classList.toggle("visible", isCurrent);
      slide.setAttribute("aria-hidden", String(!isCurrent));
    });

    const current = this.slides[boundedIndex];
    const title = current.dataset.title || `Slide ${boundedIndex + 1}`;
    document.title = `${title} | Seth Lim`;
    this.status.textContent = `Slide ${boundedIndex + 1} of ${this.slides.length}: ${title}`;

    if (window.location.hash !== `#slide-${boundedIndex + 1}`) {
      window.history.replaceState(null, "", `#slide-${boundedIndex + 1}`);
    }
  }

  next() {
    this.showSlide(this.currentSlide + 1);
  }

  previous() {
    this.showSlide(this.currentSlide - 1);
  }

  async toggleFullscreen() {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen?.();
    } else {
      await document.exitFullscreen?.();
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.presentation = new SlidePresentation();
});
