/**
 * Smooth scrolling utility with advanced features
 */

interface SmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  offset?: number;
  onStart?: () => void;
  onComplete?: () => void;
  onInterrupt?: () => void;
}

class SmoothScroller {
  private isScrolling = false;
  private animationId: number | null = null;
  private startTime: number = 0;
  private startPosition: number = 0;
  private targetPosition: number = 0;
  private duration: number = 800;
  private easing: (t: number) => number = this.easeInOutCubic;
  private onComplete?: () => void;
  private onInterrupt?: () => void;

  // Easing functions
  private easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  private easeInOutQuart(t: number): number {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
  }

  private easeOutExpo(t: number): number {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  // Check if user is manually scrolling
  private setupScrollInterruptListener() {
    let isUserScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (!this.isScrolling) return;

      if (!isUserScrolling) {
        isUserScrolling = true;
        this.interrupt();
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 150);
    };

    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    window.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
        if (this.isScrolling) {
          this.interrupt();
        }
      }
    });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }

  private animate = (currentTime: number) => {
    if (!this.startTime) {
      this.startTime = currentTime;
    }

    const elapsed = currentTime - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    const easedProgress = this.easing(progress);

    const currentPosition = this.startPosition + 
      (this.targetPosition - this.startPosition) * easedProgress;

    window.scrollTo(0, currentPosition);

    if (progress < 1) {
      this.animationId = requestAnimationFrame(this.animate);
    } else {
      this.complete();
    }
  };

  private complete() {
    this.isScrolling = false;
    this.animationId = null;
    this.startTime = 0;
    if (this.onComplete) {
      this.onComplete();
    }
  }

  private interrupt() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.isScrolling = false;
    this.startTime = 0;
    if (this.onInterrupt) {
      this.onInterrupt();
    }
  }

  public scrollTo(target: string | number | HTMLElement, options: SmoothScrollOptions = {}) {
    // Stop any existing animation
    if (this.isScrolling) {
      this.interrupt();
    }

    // Set options
    this.duration = options.duration || 800;
    this.easing = options.easing || this.easeInOutCubic;
    this.onComplete = options.onComplete;
    this.onInterrupt = options.onInterrupt;

    // Calculate target position
    let targetElement: HTMLElement | null = null;
    
    if (typeof target === 'string') {
      targetElement = document.getElementById(target) || document.querySelector(target);
    } else if (typeof target === 'number') {
      this.targetPosition = target;
    } else if (target instanceof HTMLElement) {
      targetElement = target;
    }

    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const offset = options.offset || 0;
      this.targetPosition = window.pageYOffset + rect.top - offset;
    }

    // Ensure target is within bounds
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    this.targetPosition = Math.max(0, Math.min(this.targetPosition, maxScroll));

    this.startPosition = window.pageYOffset;

    // Don't animate if we're already at the target
    if (Math.abs(this.targetPosition - this.startPosition) < 1) {
      if (this.onComplete) {
        this.onComplete();
      }
      return;
    }

    // Start animation
    this.isScrolling = true;
    this.startTime = 0;

    if (options.onStart) {
      options.onStart();
    }

    // Setup interrupt listeners
    this.setupScrollInterruptListener();

    // Start the animation
    this.animationId = requestAnimationFrame(this.animate);
  }

  public isActive(): boolean {
    return this.isScrolling;
  }

  public stop() {
    this.interrupt();
  }
}

// Create singleton instance
export const smoothScroller = new SmoothScroller();

// Utility function for easy use
export const scrollToElement = (
  target: string | HTMLElement,
  options?: SmoothScrollOptions
) => {
  smoothScroller.scrollTo(target, options);
};

// Utility function to scroll to top
export const scrollToTop = (options?: SmoothScrollOptions) => {
  smoothScroller.scrollTo(0, options);
};

// Utility function to scroll by offset
export const scrollBy = (offset: number, options?: SmoothScrollOptions) => {
  const currentPosition = window.pageYOffset;
  smoothScroller.scrollTo(currentPosition + offset, options);
};