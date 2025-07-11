import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import folioImage from './asserts/folio.jpg';
import sa from './asserts/solutions-architect.png';
import gcp from './asserts/googlecloud-engineer-certification.png';
import git from './asserts/github-foundations.png';
import cp from './asserts/aws-certified-cloud.png';
import red from './asserts/red-hat.png';
import p1 from './asserts/p1.png';
import p2 from './asserts/p2.png';
import p3 from './asserts/p3.png';
import p4 from './asserts/p4.png';
import p5 from './asserts/p5.png';
import p6 from './asserts/p6.png';





import { 
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  MapPin,
  ArrowUpRight,
  Sun,
  Moon,
  Check,
  X,
  FileText

} from 'lucide-react';

const certificates = [
  {
    title: 'AWS Certified Solutions Architect – Associate',
    year: '2024',
    badge: sa,
    link: 'https://www.credly.com/badges/a92fad23-0445-4bac-b0f5-7130a74a332c/public_url'
  },
  {
    title: 'Associate Cloud Engineer Certification',
    year: '2024',
    badge: gcp,
    link: 'https://www.credly.com/badges/e2539f29-95d9-44c0-bf19-494d2b799072/public_url'
  },
  {
    title: 'GitHub Foundations',
    year: '2024',
    badge: git,
    link: 'https://www.credly.com/badges/71f9bdb2-3756-41fd-9a0a-6838c722a0e4/public_url'
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    year: '2023',
    badge: cp,
    link: 'https://www.credly.com/badges/29d992d4-abff-4c7a-a8c2-7690aa40c721/public_url'
  },
  {
    title: 'Red Hat Certified Enterprise Application Developer',
    year: '2023',
    badge: red,
    link: 'https://www.credly.com/badges/a91af520-ac11-47ff-aa87-9526151f11a8/public_url'
  },
  {
    title: 'Automation Anywhere Certified Essentials RPA Professional (Automation 360)',
    year: '2024',
    badge: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/107460015',
    link: 'https://certificates.automationanywhere.com/cb30b334-e67e-449c-9df6-91fae573a3c1#acc.2iTbvGfN'
  }
];
const ScrollablePortfolio = () => {
  const [time, setTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const observerRef = useRef(null);
  
  const MessageEvent = new Event('messageSent');
  const [messageSent, setMessageSent] = useState<true | false | null>(null);

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

   useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % footerMessages.length);
    }, 4000); // Rotate every 4 seconds
    return () => clearInterval(interval);
  }, []);

const greetings = [
  // 🇮🇳 Indian Languages
   "Hello, I'm",         // English
  "నమస్తే, నేను",       // Telugu — "Namaste, nēnu"
   "Hola, soy",            // Spanish
  "வணக்கம், நான்",      // Tamil — "Vanakkam, nān"
   "Ciao, sono",           // Italian
  "नमस्ते, मैं हूँ",     // Hindi — "Namaste, main hoon
  "こんにちは、私は",        // Japanese — "Konnichiwa, watashi wa"
  "ನಮಸ್ಕಾರ, ನಾನು",     // Kannada — "Namaskāra, nānu"
   "안녕하세요, 저는",         // Korean — "Annyeonghaseyo, jeoneun"

 
];
const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentGreetingIndex((prev) => (prev + 1) % greetings.length);
  }, 1500);
  return () => clearInterval(interval);
}, []);

const footerMessages = [
  "Thanks for visiting — stay curious.",
  "You made it to the footer. Respect.",
  "Simple code. Honest intent.",
  "Let’s build something impactful.",
  "404 talent not found? Try my inbox."
];
  const techRoles = [
  'University Graduate-2025',

  'Software Engineering',

  'Full-Stack Web Development',
  'DevOps & Cloud Infrastructure',
  'Software Modelling',
  'System Architecture (Beginner)',
  'CI/CD & Automation',
  'UI/UX Design',
  'Machine Learning (Exploring)'
]


  // Cycle through tech roles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % techRoles.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Mouse tracking for subtle parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observerRef.current.observe(section));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const projects = [
    
    {
      title: 'Iris Classification – MLOps Pipeline',
      year: '2025', 
      description: 'MLOps pipeline for Iris classification with CI/CD and Docker.',
      tech: 'Python • MLFlow • Docker • GitHub Actions',
      impact: '40% productivity gain',
      image: p1,
      link: "https://github.com/y-a-s-h-9/iris-mlops"
    },
    {
      title: 'AWS S3 Bucket Automation with Terraform',
      year: '2024',
      description: 'Automated S3 bucket setup with Terraform scripts.',
      tech: 'Terraform • AWS S3 • IaC',
      impact: '60% faster queries',
      image: p2,
      link: "https://github.com/y-a-s-h-9/terraform_s3_bucket"
    },
     {
      title: 'Email & SMS Phishing Detector',
      year: '2024',
      description: 'Built with a team: a smart detector for phishing in SMS and email using NLP and ML.',
      tech: 'Python • Scikit-learn • Pandas • Flask',
      impact: '99.9% uptime',
      image: p3,
      link: "https://github.com/y-a-s-h-9/Email-sms_Phish_detector"
    },
     {
      title: 'ChatBot_with_Amazon_Lex',
      year: '2024',
      description: 'Built a smart voice/text chatbot using Amazon Lex and AWS Lambda.',
      tech: 'AWS Lex • Lambda • Python • API Gateway',
      impact: '99.9% uptime',
      image: p6,
      link: "https://github.com/y-a-s-h-9/ChatBot_with_Amazon_Lex"
    },
    {
      title: 'Tic Tac Toe Game – Flutter Project',
      year: '2023',
      description: 'Minimal Tic Tac Toe app built in Flutter.',
      tech: 'Flutter • Dart • Android SDK',
      impact: 'Built using clean UI and game logic.',
      image: p4,
      link: "https://github.com/y-a-s-h-9/Flutter_Project"
    },
    {
      title: 'Food and Hospitality System',
      year: '2022',
      description: 'Django app to manage faculty records, feedback, and admin taskss',
      tech: 'Django • Python • MySQL • HTML/CSS',
      impact: '99.9% uptime',
      image: p5,
      link: "https://github.com/y-a-s-h-9/Django-FHS-Project"
    }
   
   
    
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${
      isDarkMode ? 'bg-neutral-900 text-white' : 'bg-white text-black'
    }`}>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 left-6 z-20 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
          isDarkMode 
            ? 'bg-neutral-800 text-yellow-400 hover:bg-neutral-700' 
            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
        }`}
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      {/* Floating time with smooth fade */}
      <div className={`fixed top-6 right-6 text-xs font-mono z-10 backdrop-blur-sm px-2 py-1 rounded transition-all duration-300 hover:scale-105 ${
        isDarkMode 
          ? 'text-neutral-400 bg-neutral-800/80 hover:bg-neutral-800/90' 
          : 'text-neutral-400 bg-white/80 hover:bg-white/90'
      }`}>
        {time.toLocaleTimeString('en-US', { 
  hour12: false,
  timeZone: 'Asia/Kolkata' 

        })
        }
      </div>

      {/* Subtle cursor follower */}
      <div 
        className={`fixed w-4 h-4 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out ${
          isDarkMode ? 'bg-white/10' : 'bg-black/5'
        }`}
        style={{
          left: `${(mousePosition.x + 1) * 50}%`,
          top: `${(mousePosition.y + 1) * 50}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Main content */}
      <main className="max-w-5xl mx-auto">
        {/* Hero Section - Animated entrance */}
        <section 
          id="hero" 
          className={`min-h-screen flex items-center justify-center px-8 transition-all duration-1000 ease-out ${
            isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center space-y-12">
  <div className="space-y-6">
    
    {/* Greeting line above name */}
  <div className="relative flex justify-center min-h-[2rem] h-8">
  <h2
    className={`text-3xl font-light tracking-wide transition-all duration-700 ease-in-out ${
      isDarkMode ? 'text-white' : 'text-black'
    }`}
  >
    <div className="absolute inset-0 flex items-center justify-center">
      {greetings.map((greeting, index) => (
        <span
          key={index}
          className={`absolute transition-all duration-700 ease-in-out ${
            index === currentGreetingIndex
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          {greeting}
        </span>
      ))}
    </div>
  </h2>
</div>
    {/* Name and phonetic together */}
    <div className="relative inline-block">
      <h1 className={`text-8xl md:text-9xl font-thin tracking-tighter ${
        isDarkMode ? 'text-white' : 'text-black'
      }`}>
        {'Yashashvi B'.split('').map((char, index) => (
          <span 
            key={index}
            className="inline-block transition-all duration-500 ease-out hover:scale-110 hover:-translate-y-1"
            style={{ 
              animationDelay: `${index * 100}ms`,
              transform: isVisible.hero ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible.hero ? 1 : 0
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>

      {/* Phonetic spelling aligned to bottom-right of name */}
      <p className={`absolute -bottom-4 right-0 text-xs md:text-sm font-light italic ${
        isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
      }`}>
        [ yʌ-ʃʌʃ-viː biː ]
      </p>
    </div>


  
              {/* Dynamic role animation */}
              <div className={`text-sm tracking-[0.4em] uppercase transition-all duration-700 delay-500 relative h-8 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              } ${
                isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  {techRoles.map((role, index) => (
                    <span
                      key={role}
                      className={`absolute transition-all duration-500 ease-in-out ${
                        index === currentRoleIndex
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-2'
                      }`}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* <div className={`max-w-sm mx-auto text-neutral-600 text-center leading-relaxed transition-all duration-700 delay-700 ${
              isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Building distributed systems that scale to millions of users
            </div> */}

            <div className={`flex items-center justify-center gap-8 text-xs transition-all duration-700 delay-900 ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-400'
            } ${
              isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="flex items-center gap-4">
                <span className={`hover:transition-colors duration-300 ${
                  isDarkMode ? 'hover:text-white' : 'hover:text-black'
                }`}></span>
                
                {/* Prominent Resume Button */}
            <a 
  href="https://drive.google.com/file/d/1VH2Q2x-MvEp0mVcw8SCKh1ZLz7r4GZ4M/view?usp=sharing"
  target="_blank" 
  rel="noopener noreferrer"
>
  <button className={`px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 rounded-full relative overflow-hidden group ${
    isDarkMode 
      ? 'bg-white text-black hover:bg-neutral-200 shadow-lg shadow-white/20' 
      : 'bg-black text-white hover:bg-neutral-800 shadow-lg shadow-black/20'
  } hover:scale-105 hover:shadow-xl`}>
    <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100' 
        : 'bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100'
    }`}></div>
    <div className="relative flex items-center gap-2">
      <FileText className="w-3 h-3 group-hover:animate-bounce" />
      Resume
    </div>
  </button>
</a>
              </div>
              <span>•</span>

             <a 
  href="mailto:yashashvi.b.99@outlook.com" 
  target="_blank" 
  rel="noopener noreferrer"
>
  <button className={`px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 rounded-full relative overflow-hidden group ${
    isDarkMode 
      ? 'bg-white text-black hover:bg-neutral-200 shadow-lg shadow-white/20' 
      : 'bg-black text-white hover:bg-neutral-800 shadow-lg shadow-black/20'
  } hover:scale-105 hover:shadow-xl`}>
    <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100' 
        : 'bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100'
    }`}></div>
    <div className="relative flex items-center gap-2">
      <Mail className="w-3 h-3 group-hover:animate-bounce" />
      Mail Me
    </div>
  </button>
</a>
             
            </div>
          </div>

        </section>

        {/* About Section - Smooth reveal */}
        <section 
  id="about" 
  className={`min-h-screen flex flex-col px-8 py-20 transition-all duration-1000 ease-out ${
    isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
  }`}
>
  <div className="w-full max-w-5xl mx-auto space-y-16">
    
    {/* About Section */}
    <div className="space-y-6">
      <div
        className={`text-sm tracking-[0.4em] uppercase transition-all duration-700 delay-200 ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        } ${isVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
      >
        About Me
      </div>

      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Profile Image */}
        <div
          className={`relative transition-all duration-700 delay-400 ${
            isVisible.about ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div
            className={`w-[200px] h-[200px] rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-lg ${
              isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'
            }`}
          >
            <img
              src={folioImage}
              alt="Profile"
              className="w-full h-full object-cover [object-position:40%_30%] "
            />
          </div>
          <div
            className={`absolute -top-2 -right-2 w-6 h-6 rounded-full ${
              isDarkMode ? 'bg-white' : 'bg-black'
            }`}
          />
        </div>

        {/* About Text */}
        <div
          className={`text-sm leading-relaxed transition-all duration-700 delay-600 ${
            isDarkMode ? 'text-neutral-300' : 'text-neutral-600'
          } ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
      
           <p className="mb-4">
  Hey! <strong>I’m Yashashvi B.</strong>, a recent <strong>Computer Science graduate</strong> from <strong>KL University</strong>, with a passion for building impactful tech. My core focus lies in <strong>Software Modelling and DevOps</strong>, where I’ve worked on architecting scalable systems and streamlining development workflows.
</p>

<p className="mb-4">
  I’ve built full-stack web apps using <strong>React</strong>, <strong>Django</strong>, and <strong>Spring Boot</strong>, and deployed microservices on <strong>AWS</strong>. I’m also into DevOps—comfortable with tools like <strong>Jenkins</strong>, <strong>Docker</strong>, <strong>Kubernetes</strong>, and <strong>Terraform</strong>—and I automate workflows using <strong>Selenium</strong> and <strong>Bash</strong>.
</p>

<p className="mb-4">
  Beyond code, I enjoy UI/UX design and bring ideas to life using <strong>Figma</strong>, <strong>Adobe XD</strong>, and <strong>Canva</strong>. From <strong>CI/CD pipelines</strong> to <strong>MERN stack</strong> portals, I’ve built a variety of projects and actively led <strong>tech initiatives</strong> on campus as a <strong>club lead</strong> and part of <strong>KL Radio’s design team</strong>. I'm now excited to take on new challenges and contribute to innovative teams!
</p>


        </div>
      </div>
    </div>
 {/* Experience Section */}
    <div>
      <div className={`text-sm tracking-[0.4em] uppercase mb-4 ${
        isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
      }`}>
        Experience
      </div>
      <div className="space-y-4">
  {[
    {
      role: 'Tech Lead',
      company: 'Intel Innovation Tech Club',
      year: '2023-2024',
      description: 'Guided a tech club team to deliver Intel Processor workshops, empowering 200+ students with hands-on learning.'
    },
    {
      role: 'Design Lead and Creative Member',
      company: 'KL Radio',
      year: '2021-2023',
      description: 'Led design efforts and team coordination at KL Radio, with a high success rate in idea execution and audience engagement.'
    },
    {
      role: 'Project Member',
      company: '25th & 24th National Children Science Congress',
      year: '2016-2018',
      description: 'Contributed to national-level science projects focused on community impact.'
    }
  ].map((job, index) => (
    <div key={index} className="group">
      <div className={`flex justify-between py-2 border-b ${
        isDarkMode ? 'border-neutral-700' : 'border-neutral-200'
      }`}>
        <div className={`text-sm font-medium ${isDarkMode ? 'group-hover:text-white' : 'group-hover:text-black'}`}>
          {job.role}
        </div>
        <div className={`text-sm ${isDarkMode ? 'text-white' : 'text-neutral-600'}`}>
          {job.year}
        </div>
      </div>
      <div className={`text-sm mt-1 italic ${isDarkMode ? 'text-white' : 'text-black'}`}>
        {job.company}
      </div>
      <div className={`text-xs mt-0.5  ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
        {job.description}
      </div>
    </div>
  ))}
</div>

    </div>

    {/* Education Section */}
    <div>
      <div className={`text-sm tracking-[0.4em] uppercase mb-4 ${
        isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
      }`}>
        Education
      </div>
      <div className="space-y-4">
        <div className="group">
          <div className={`text-base font-medium ${isDarkMode ? 'group-hover:text-white' : 'group-hover:text-black'}`}>
            Bachelor of Technology in Computer Science and Engineering [2021-2025]
          </div>
          <div className={`text-sm italic ${isDarkMode ? 'text-white' : 'text-black'}`}>
            KL University, Vijayawada, India.
          </div>
          <div className={`text-xs ${isDarkMode ? 'text-white' : 'text-black'}`}>
            CGPA: 9.03/10
          </div>
        </div>
        <div className="group">
          <div className={`text-base font-medium ${isDarkMode ? 'group-hover:text-white' : 'group-hover:text-black'}`}>
            Higher Secondary (Class 12), Science  [2019-2021]
          </div>
          <div className={`text-sm italic ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Prathibha Junior College, Rajahmundry, India.
          </div>
          <div className={`text-xs ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Percentage: 94.4%
          </div>
        </div>
        <div className="group">
          <div className={`text-base font-medium ${isDarkMode ? 'group-hover:text-white' : 'group-hover:text-black'}`}>
            Secondary School Certificate (SSC – Class 10)  [2018-2019]
          </div>
          <div className={`text-sm italic ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Sri Gowthami Smart School, Rajahmundry, India.
          </div>
          <div className={`text-xs ${isDarkMode ? 'text-white' : 'text-black'}`}>
            GPA: 9.3/10
          </div>
        </div>
      </div>
    </div>

   
  </div>
</section>



        {/* Skills Section - Animated bars
        <section 
          id="skills" 
          className={`min-h-screen flex items-center px-8 py-20 transition-all duration-1000 ease-out ${
            isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="w-full">
            <div className="grid grid-cols-12 gap-8">
              <div className={`col-span-12 md:col-span-4 transition-all duration-700 delay-200 ${
                isVisible.skills ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}>
                <div className="space-y-4">
                  <div className={`w-8 transition-all duration-500 hover:w-12 ${
                    isDarkMode ? 'bg-white' : 'bg-black'
                  }`}
                       style={{ height: '1px' }}></div>
                  <div className={`text-xs tracking-[0.4em] uppercase ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    Technical Skills
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-8">
                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                  {[
                    'JavaScript/TypeScript',
                    'React/Next.js',
                    'Node.js',
                    'Python',
                    'Go',
                    'AWS/Cloud',
                    'Docker/K8s',
                    'PostgreSQL'
                  ].map((skill, index) => (
                    <div 
                      key={index} 
                      className={`group transition-all duration-700 ease-out hover:translate-x-2 ${
                        isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${400 + index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm transition-colors duration-300 ${
                          isDarkMode ? 'group-hover:text-white' : 'group-hover:text-black'
                        }`}>{skill}</span>
                        <div className={`w-2 h-2 rounded-full group-hover:scale-125 transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-neutral-700 group-hover:bg-white' 
                            : 'bg-neutral-200 group-hover:bg-black'
                        }`}></div>
                      </div>
                      <div className={`h-px transition-all duration-500 origin-left group-hover:scale-x-110 ${
                        isDarkMode 
                          ? 'bg-neutral-700 group-hover:bg-neutral-500' 
                          : 'bg-neutral-200 group-hover:bg-neutral-400'
                      }`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <section 
  id="skills" 
  className={`min-h-screen flex items-center px-8 py-20 transition-all duration-1000 ease-out ${
    isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
  }`}
>
  <div className="w-full space-y-12">
    
    {/* Section Header */}
    <div className="text-center space-y-4">
      <div
        className={`w-8 mx-auto transition-all duration-500 hover:w-12 ${
          isDarkMode ? 'bg-white' : 'bg-black'
        }`}
        style={{ height: '1px' }}
      ></div>
      <div
        className={`text-sm tracking-[0.4em] uppercase font-semibold ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}
      >
        Skills
      </div>
    </div>

    {/* Skill Rows */}
    {[
        {
    "title": "Technical",
    "items": [
      "Java", "Python", "HTML/CSS", "JavaScript", "React", "Node.js",
      "Django", "Spring Boot (Microservices)", "Flutter", "FastAPI", 
      "SQL",  "Bash", "JSP", 
    ]
  },
   {
    "title": "Tools",
    "items": [
      "GitHub", "GitHub Actions", "VS Code", "AWS Console", "Terraform", "Docker",
    "Kubernetes", "Jenkins",  "MLflow",
     "Grafana", "Jupyter Notebook",
    "Figma", "Adobe XD", "Canva", "Notion",
    "Slack", "Microsoft Office"
    ]
  },
  {
    "title": "Methods",
  "items": [
        "Version Control",
    "CI/CD",
    "DevSecOps",
    "IaC (Terraform)",
    "Docker & Kubernetes",
    "Monitoring & Logging",
    "Microservices & SOA",
    "UML & ER Modeling",
    "System Design",
    "Agile Development",
    "Debugging"
  ]
  },
  {
  "title": "Soft Skills",
  "items": [
    "Team Leadership",
    "Collaboration",
    "Communication",
    "Problem Solving",
    "Adaptability",
    "Time Management",
    "User-Centric Thinking",
    "Creativity",
    "Decision Making"
  ]
}

]
.map((section, index) => (
      <div 
        key={index}
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 items-start transition-all duration-700 ${
          isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: `${200 + index * 150}ms` }}
      >
        {/* Left: Subtitle - with slide animation */}
        <div
          className={`text-sm md:text-sm font-medium transition-all duration-700 ${
            isVisible.skills ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
          }`}
          style={{ transitionDelay: `${100 + index * 100}ms` }}
        >
          {section.title}
        </div>

        {/* Right: Skill Tags */}
        <div className="md:col-span-2 flex flex-wrap gap-2">
          {section.items.map((item, idx) => (
            <span
              key={idx}
              className={`text-sm px-3 py-1 border rounded transition-colors duration-300 ${
                isDarkMode
                  ? 'border-neutral-600 text-neutral-300 hover:bg-neutral-700'
                  : 'border-neutral-300 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
</section>


        {/* Projects Section - Card animations */}
      <section 
  id="projects" 
  className={`min-h-screen flex items-center px-8 py-20 transition-all duration-1000 ease-out ${
    isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
  }`}
>
  <div className="w-full">
    <div className="space-y-16">
      {/* Section Header */}
      <div className={`text-center transition-all duration-700 delay-200 ${
        isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className={`w-8 mx-auto mb-4 transition-all duration-500 hover:w-16 ${
          isDarkMode ? 'bg-white' : 'bg-black'
        }`} style={{ height: '1px' }}></div>
        <div className={`text-sm tracking-[0.4em] uppercase font-semibold ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          Selected Work
        </div>
      </div>

      {/* Project Cards */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {projects.map((project, index) => (
    <div 
      key={index} 
      className={`group cursor-pointer transition-all duration-700 ease-out hover:scale-105 ${
        isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${400 + index * 200}ms` }}
    >
      <a 
        href={project.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div className={`border p-0 h-80 md:h-96 flex flex-col justify-between hover:shadow-lg transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
          isDarkMode 
            ? 'border-neutral-700 hover:border-white bg-neutral-800 hover:bg-neutral-750' 
            : 'border-neutral-200 hover:border-black bg-white hover:bg-neutral-50'
        }`}>
          {/* Project Image */}
          <div className="h-1/2 w-full overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          </div>

          {/* Project Info */}
          <div className="h-1/2 p-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div className={`text-xs transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-neutral-500 group-hover:text-neutral-300' 
                    : 'text-neutral-400 group-hover:text-neutral-600'
                }`}>{project.year}</div>
                <ArrowUpRight className={`w-4 h-4 group-hover:scale-110 transition-all duration-300 ${
                  isDarkMode 
                    ? 'text-neutral-600 group-hover:text-white' 
                    : 'text-neutral-300 group-hover:text-black'
                }`} />
              </div>
              <div>
                <h3 className={`text-lg font-light mb-1 transition-colors duration-300 ${
                  isDarkMode ? 'group-hover:text-white' : 'group-hover:text-black'
                }`}>{project.title}</h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-neutral-300 group-hover:text-white' 
                    : 'text-neutral-600 group-hover:text-neutral-800'
                }`}>
                  {project.description}
                </p>
              </div>
            </div>
            <div className="space-y-1 mt-2">
              <div className={`text-xs transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-neutral-500 group-hover:text-neutral-300' 
                  : 'text-neutral-400 group-hover:text-neutral-600'
              }`}>{project.tech}</div>
              {/* <div className={`text-xs font-medium transition-colors duration-300 ${
                isDarkMode ? 'group-hover:text-white' : 'group-hover:text-black'
              }`}>{project.impact}</div> */}
            </div>
          </div>
        </div>
      </a>
    </div>
  ))}
</div>


      {/* View More Projects Button */}
      <div className="text-center mt-8">
        <a 
          href="https://github.com/y-a-s-h-9?tab=repositories" 
          target="_blank" 
          rel="noopener noreferrer"
       className={`text-sm font-medium underline underline-offset-4 transition-colors duration-300 ${
      isDarkMode 
        ? 'text-neutral-300 hover:text-white' 
        : 'text-neutral-700 hover:text-black'
    }`}
        >
          View More Projects →
        </a>
      </div>
    </div>
  </div>
</section>


{/*Certificates Section - Animated entrance */}
 <section
  id="certificates"
  className={`min-h-screen flex items-center px-8 py-20 transition-all duration-1000 ease-out ${
    isVisible.certificates ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
  }`}
>
  <div className="w-full space-y-16">
    {/* Section Header */}
    <div
      className={`transition-all duration-700 delay-200 ${
        isVisible.certificates ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      }`}
    >
      <div className="space-y-4">
        <div
          className={`w-8 transition-all duration-500 hover:w-12 ${
            isDarkMode ? 'bg-white' : 'bg-black'
          }`}
          style={{ height: '1px' }}
        ></div>
        <div
          className={`text-xs tracking-[0.4em] uppercase font-semibold ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
          }`}
        >
          Certifications
        </div>
      </div>
    </div>

    {/* Certificates Grid */}
   <div className="grid grid-cols-1 grid-cols-2 lg:grid-cols-3 gap-6">
  {certificates.map((cert, index) => (
    <a
      key={index}
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div
        className={`group aspect-square transition-all duration-700 ease-out hover:scale-105 ${
          isVisible.certificates ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: `${300 + index * 100}ms` }}
      >
        <div
          className={`relative w-full h-full max-w-[120x] max-h-[120x] border rounded-2xl overflow-hidden flex items-center justify-center hover:shadow-lg transition-all duration-500 hover:-translate-y-2 mx-auto ${
    isDarkMode
      ? 'border-neutral-700 hover:border-white bg-neutral-800 hover:bg-neutral-750'
      : 'border-neutral-200 hover:border-black bg-white hover:bg-neutral-50'
  }`}

        >
          {/* Badge Image */}
          <img
            src={cert.badge}
            
            className="max-h-[80%] max-w-[80%] object-contain transition-opacity duration-300"
          />

          {/* Hover Overlay with Title - Theme Aware */}
          <div
           className={`absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
    isDarkMode ? 'bg-white/10 text-neutral-200' : 'bg-black/30 text-white'
  }`}
          >
            <span className="text-sm font-medium text-center px-4">{cert.title}</span>
          </div>
        </div>
      </div>
    </a>
  ))}
</div>

  </div>
</section>


        {/* Contact Section - Form animations */}
        <section 
          id="contact" 
          className={`min-h-screen flex items-center px-8 py-20 transition-all duration-1000 ease-out ${
            isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="w-full">
            <div className="grid grid-cols-12 gap-8">
              <div className={`col-span-12 md:col-span-6 transition-all duration-700 delay-200 ${
                isVisible.contact ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className={`w-8 transition-all duration-500 hover:w-12 ${
                      isDarkMode ? 'bg-white' : 'bg-black'
                    }`}
                         style={{ height: '1px' }}></div>
                    <div className={`text-xs tracking-[0.4em] uppercase font-semibold${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      Contact
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <p className={`leading-relaxed max-w-md transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-neutral-300 hover:text-white' 
                        : 'text-neutral-600 hover:text-neutral-800'
                    }`}>
                      Always interested in discussing new opportunities and innovative projects.
                    </p>
                    
                  <div className="space-y-3">
  {[
    { 
      href: 'mailto:yashashvi.b.99@outlook.com', 
      text: 'yashashvi.b.99@outlook.com', 
      Icon: Mail 
    },
    { 
      href: 'https://github.com/y-a-s-h-9', 
      text: 'github.com/y-a-s-h-9', 
      Icon: Github 
    },
    { 
      href: 'https://www.linkedin.com/in/yashashvi-b-88a577229/', 
      text: 'linkedin.com/in/yashashvi-b-88a577229', 
      Icon: Linkedin 
    }
  ].map(({ href, text, Icon }, index) => (
    <a 
      key={index}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-3 text-sm transition-all duration-300 group hover:translate-x-2 ${
        isDarkMode ? 'hover:text-white' : 'hover:text-black'
      }`}
    >
      {/* Dot */}
      <div className={`w-1 h-1 rounded-full group-hover:scale-150 transition-all duration-300 ${
        isDarkMode 
          ? 'bg-neutral-500 group-hover:bg-white' 
          : 'bg-neutral-400 group-hover:bg-black'
      }`}></div>

      {/* Icon */}
      <Icon 
        size={16} 
        className={`transition-colors duration-300 ${
          isDarkMode 
            ? 'text-neutral-400 group-hover:text-white' 
            : 'text-neutral-500 group-hover:text-black'
        }`}
      />

      {/* Link Text */}
      <span>{text}</span>
    </a>
  ))}
</div>


                  </div>
                </div>
              </div>
              
           <div
  className={`col-span-12 md:col-span-6 transition-all duration-700 delay-400 ${
    isVisible.contact ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
  }`}
>
                  <div className="space-y-6">
    <form
  className="space-y-6"
        onSubmit={async (e) => {
          e.preventDefault();

          const form = e.target as HTMLFormElement;
          const timestamp = new Date().toISOString();
          const name = (form.elements.namedItem('name') as HTMLInputElement).value;
          const email = (form.elements.namedItem('email') as HTMLInputElement).value;
          const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
  
        

          try {
            await fetch(
              'https://script.google.com/macros/s/AKfycbzkiPCMWG6uP4rLgEMxkRovGB1aGL57vzgW5HinvxDnvt0h3dLkyzEfRZB9YvaMlfulDg/exec',
              {
                method: 'POST',
                // mode: 'no-cors',
                 
  
                body: JSON.stringify({ timestamp ,name, email, message }),
              }
            );  
          form.reset();
  setMessageSent(true);
} catch {
  setMessageSent(false);
} finally {
  setTimeout(() => setMessageSent(null), 1000);
}}}
>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className={`w-full px-0 py-3 border-0 border-b bg-transparent focus:outline-none transition-all duration-300 text-sm hover:border-neutral-300 focus:scale-105 origin-left ${
            isDarkMode
              ? 'border-neutral-700 focus:border-white'
              : 'border-neutral-200 focus:border-black'
          }`}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className={`w-full px-0 py-3 border-0 border-b bg-transparent focus:outline-none transition-all duration-300 text-sm hover:border-neutral-300 focus:scale-105 origin-left ${
            isDarkMode
              ? 'border-neutral-700 focus:border-white'
              : 'border-neutral-200 focus:border-black'
          }`}
        />
        <textarea
          rows={3}
          name="message"
          placeholder="Message"
          required
          className={`w-full px-0 py-3 border-0 border-b bg-transparent focus:outline-none transition-all duration-300 resize-none text-sm hover:border-neutral-300 focus:scale-105 origin-left ${
            isDarkMode
              ? 'border-neutral-700 focus:border-white'
              : 'border-neutral-200 focus:border-black'
          }`}
        />
      </div>
      <button
  type="submit"
  className={`text-sm tracking-wide transition-all duration-300 flex items-center gap-2 group hover:translate-x-1 ${
    isDarkMode ? 'hover:text-neutral-300' : 'hover:text-neutral-600'
  }`}
>
  {messageSent === true ? (
            <>
               Sent <Check className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-black'}`} />
            </>
          ) : messageSent === false ? (
            <>
              <span className={`text-base flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>
  Failed <X className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-black'}`} />
</span>
            </>
          ) : (
            <>
              Send Message
              <ArrowUpRight className="w-4 h-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            </>
          )}
</button>
    </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Animated footer */}
      <footer
      className={`border-t py-8 px-8 transition-all duration-500 ${
        isDarkMode
          ? 'border-neutral-700 hover:bg-neutral-800'
          : 'border-neutral-200 hover:bg-neutral-50'
      }`}
    >
      <div
        className={`max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs space-y-2 md:space-y-0 ${
          isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
        }`}
      >
        {/* Left */}
        <div
          className={`transition-colors duration-300 ${
            isDarkMode ? 'hover:text-white' : 'hover:text-black'
          }`}
        >
          Yashashvi B
        </div>

        {/* Middle: Rotating Message */}
        <div className="relative h-6 overflow-hidden text-sm tracking-tight text-center w-full max-w-sm">
          <div className="absolute inset-0 flex items-center justify-center">
            {footerMessages.map((msg, index) => (
              <span
                key={msg}
                className={`absolute transition-all duration-500 ease-in-out ${
                  index === currentMessageIndex
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2'
                }`}
              >
                {msg}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Resume Button */}
        <div className="flex items-center gap-4">
        <a
  href="https://drive.google.com/file/d/1VH2Q2x-MvEp0mVcw8SCKh1ZLz7r4GZ4M/view?usp=sharing"
  target="_blank"
  rel="noopener noreferrer"
  className={`inline-block transition-all duration-300 hover:scale-105 ${
    isDarkMode ? 'hover:text-white' : 'hover:text-black'
  }`}
>
  <button className="flex items-center gap-1 text-sm group focus:outline-none">
    <FileText className="w-3 h-3 group-hover:animate-bounce" />
    Resume
  </button>
</a>
        </div>
      </div>
    </footer>

    </div>
  );
};

export default ScrollablePortfolio;