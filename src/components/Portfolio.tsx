import React, { useState, useEffect } from 'react';
import { useScrollNavigation } from '../hooks/useScrollNavigation';
import ScrollIndicator from './ScrollIndicator';

const Portfolio = () => {
  const [time, setTime] = useState(new Date());
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Section IDs for navigation
  const sectionIds = ['intro', 'work', 'info'];
  
  // Use scroll navigation hook
  const { 
    currentSection, 
    isScrolling, 
    navigateToSection 
  } = useScrollNavigation({
    sections: sectionIds,
    offset: 0,
    duration: 1000,
    onSectionChange: (index) => {
      // Update scroll progress for visual feedback
      setScrollProgress((index + 1) / sectionIds.length);
    }
  });

  const sections = [
    {
      id: 'intro',
      content: (
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="text-xs tracking-[0.2em] text-neutral-400">
              SOFTWARE ENGINEER
            </div>
            <h1 className="text-7xl font-extralight tracking-[-0.02em]">
              Yashashvi B
            </h1>
          </div>
          <div className="max-w-md space-y-4 text-sm leading-relaxed text-neutral-600">
            <p>
              Building distributed systems that scale to millions of users. 
              Currently architecting cloud infrastructure at TechCorp.
            </p>
            <p>
              5+ years experience. Stanford MS. Published researcher.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'work',
      content: (
        <div className="space-y-12">
          <div className="space-y-2">
            <div className="text-xs tracking-[0.2em] text-neutral-400">
              SELECTED WORK
            </div>
            <h2 className="text-4xl font-extralight">Projects</h2>
          </div>
          <div className="space-y-8 max-w-2xl">
            {[
              {
                title: 'Distributed Analytics Engine',
                year: '2024',
                description: 'Real-time processing of 10M+ events/second using Go, Kafka, and ClickHouse'
              },
              {
                title: 'AI Code Assistant',
                year: '2023', 
                description: 'ML platform for intelligent code review with Python, TensorFlow, and React'
              },
              {
                title: 'Microservices Platform',
                year: '2023',
                description: 'Cloud architecture serving 2M+ users with Node.js, Docker, and AWS'
              }
            ].map((project, index) => (
              <div key={index} className="border-b border-neutral-200 pb-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-light">{project.title}</h3>
                  <span className="text-xs text-neutral-400 font-mono">{project.year}</span>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'info',
      content: (
        <div className="space-y-12">
          <div className="space-y-2">
            <div className="text-xs tracking-[0.2em] text-neutral-400">
              BACKGROUND
            </div>
            <h2 className="text-4xl font-extralight">Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl">
            <div className="space-y-6">
              <div>
                <div className="text-xs tracking-[0.2em] text-neutral-400 mb-3">
                  EXPERIENCE
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Senior Engineer</span>
                    <span className="text-neutral-400">TechCorp</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SWE Intern</span>
                    <span className="text-neutral-400">Meta</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Full-Stack Developer</span>
                    <span className="text-neutral-400">StartupXYZ</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs tracking-[0.2em] text-neutral-400 mb-3">
                  EDUCATION
                </div>
                <div className="space-y-2 text-sm">
                  <div>MS Computer Science, Stanford</div>
                  <div>BS Computer Engineering, UC Berkeley</div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <div className="text-xs tracking-[0.2em] text-neutral-400 mb-3">
                  CONTACT
                </div>
                <div className="space-y-2 text-sm">
                  <a href="mailto:alex.chen@email.com" className="block hover:text-neutral-600 transition-colors">
                    alex.chen@email.com
                  </a>
                  <a href="https://github.com/alexchen" className="block hover:text-neutral-600 transition-colors">
                    github.com/alexchen
                  </a>
                  <a href="https://linkedin.com/in/alexchen" className="block hover:text-neutral-600 transition-colors">
                    linkedin.com/in/alexchen
                  </a>
                </div>
              </div>
              <div>
                <div className="text-xs tracking-[0.2em] text-neutral-400 mb-3">
                  RECOGNITION
                </div>
                <div className="space-y-2 text-sm text-neutral-600">
                  <div>Best Paper Award 2023</div>
                  <div>TreeHacks Grand Prize 2022</div>
                  <div>ACM Competition 1st Place 2021</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Scroll progress indicator */}
      <ScrollIndicator 
        isScrolling={isScrolling} 
        progress={scrollProgress}
      />

      {/* Ultra-minimal sidebar navigation */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-10">
        <div className="space-y-4">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => navigateToSection(index)}
              disabled={isScrolling}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-black scale-125' 
                  : 'bg-neutral-300 hover:bg-neutral-400'
              } ${isScrolling ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              aria-label={`Navigate to ${sections[index].id} section`}
            />
          ))}
        </div>
      </div>

      {/* Time display */}
      <div className="fixed top-8 right-8 text-xs font-mono text-neutral-400">
        {time.toLocaleTimeString('en-US', { 
          hour12: false,
          timeZone: 'America/Los_Angeles'
        })}
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl" role="main">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className={`min-h-screen flex items-center justify-center transition-all duration-500 ease-out ${
                currentSection === index ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
              }`}
              aria-hidden={currentSection !== index}
            >
              {section.content}
            </section>
          ))}
        </div>
      </div>

      {/* Alternative: Single content area with smooth transitions */}
      {/* 
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl" role="main">
          <div className={`transition-all duration-500 ease-out ${isScrolling ? 'opacity-75' : 'opacity-100'}`}>
            {sections[currentSection].content}
          </div>
        </div>
      </div>
      */}

      {/* Minimal progress indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-1">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`h-0.5 transition-all duration-500 ${
                index <= currentSection ? 'w-8 bg-black' : 'w-4 bg-neutral-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Keyboard navigation hint */}
      <div className="fixed bottom-8 right-8 text-xs text-neutral-400">
        <div className="space-y-1">
          <div>↑↓ j/k navigate</div>
          <div>• click dots</div>
          <div className={`transition-opacity duration-300 ${isScrolling ? 'opacity-100' : 'opacity-0'}`}>
            scrolling...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;