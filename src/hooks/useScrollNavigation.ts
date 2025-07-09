import { useEffect, useCallback, useState } from 'react';
import { scrollToElement, smoothScroller } from '../utils/smoothScroll';

interface UseScrollNavigationOptions {
  sections: string[];
  offset?: number;
  duration?: number;
  onSectionChange?: (sectionIndex: number) => void;
}


export const useScrollNavigation = ({
  sections,
  offset = 80,
  duration = 800,
  onSectionChange
}: UseScrollNavigationOptions) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Navigate to section with smooth scrolling
  const navigateToSection = useCallback((sectionIndex: number) => {
    if (sectionIndex < 0 || sectionIndex >= sections.length) return;
    
    const sectionId = sections[sectionIndex];
    
    setIsScrolling(true);
    
    scrollToElement(sectionId, {
      duration,
      offset,
      onStart: () => {
        setCurrentSection(sectionIndex);
        if (onSectionChange) {
          onSectionChange(sectionIndex);
        }
      },
      onComplete: () => {
        setIsScrolling(false);
      },
      onInterrupt: () => {
        setIsScrolling(false);
      }
    });
  }, [sections, offset, duration, onSectionChange]);

  // Navigate to next section
  const navigateNext = useCallback(() => {
    if (currentSection < sections.length - 1) {
      navigateToSection(currentSection + 1);
    }
  }, [currentSection, sections.length, navigateToSection]);

  // Navigate to previous section
  const navigatePrevious = useCallback(() => {
    if (currentSection > 0) {
      navigateToSection(currentSection - 1);
    }
  }, [currentSection, navigateToSection]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
        case 'j':
          e.preventDefault();
          navigateNext();
          break;
        case 'ArrowUp':
        case 'k':
          e.preventDefault();
          navigatePrevious();
          break;
        case 'Home':
          e.preventDefault();
          navigateToSection(0);
          break;
        case 'End':
          e.preventDefault();
          navigateToSection(sections.length - 1);
          break;
        case 'Escape':
          if (smoothScroller.isActive()) {
            smoothScroller.stop();
            setIsScrolling(false);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateNext, navigatePrevious, navigateToSection, sections.length]);

  // Detect current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return; // Don't update during smooth scroll

      const scrollPosition = window.pageYOffset + offset + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          if (currentSection !== i) {
            setCurrentSection(i);
            if (onSectionChange) {
              onSectionChange(i);
            }
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, offset, currentSection, isScrolling, onSectionChange]);

  return {
    currentSection,
    isScrolling,
    navigateToSection,
    navigateNext,
    navigatePrevious
  };
};