import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'motion/react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize, Settings,
  SkipBack, SkipForward, PictureInPicture, Check, Download,
  User, Mail, Github, Linkedin, Code2, Loader2, PlayCircle,
  Sparkles, Briefcase, ExternalLink, MousePointer2, Lightbulb, LightbulbOff, Palette, Wand2, CheckCircle2, Database, Server, Cloud,
  Activity, Share2, MessageSquare, Coffee, GitCommit, Clock, Terminal, Cpu, Globe, MapPin, Calendar, Home, Bot, Sparkles as SparklesIcon, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';

// Animated Counter Component
const AnimatedCounter = ({ from, to, duration = 2, decimals = 0, suffix = "" }: { from: number, to: number, duration?: number, decimals?: number, suffix?: string }) => {
  const [count, setCount] = useState(from);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(from + (to - from) * easeOutExpo);
      
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };
    
    animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);
  
  return <span>{count.toFixed(decimals)}{suffix}</span>;
};

// Typewriter Component
const TypewriterLine = ({ text, delay, className = "" }: { text: string, delay: number, className?: string }) => (
  <motion.div
    initial={{ width: 0, opacity: 0 }}
    animate={{ width: "100%", opacity: 1 }}
    transition={{ delay, duration: 1.5, ease: "easeOut" }}
    className={`overflow-hidden whitespace-nowrap ${className}`}
  >
    {text}
  </motion.div>
);

// Dock Icon Component
const DockIcon = ({ icon, label, href, onClick, external }: any) => (
  <div className="relative group/dock">
    {href ? (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} onClick={onClick} className="text-on-surface-variant hover:text-white transition-all duration-300 hover:-translate-y-2 hover:scale-110 flex items-center justify-center">
        {icon}
      </a>
    ) : (
      <button onClick={onClick} className="text-on-surface-variant hover:text-white transition-all duration-300 hover:-translate-y-2 hover:scale-110 flex items-center justify-center">
        {icon}
      </button>
    )}
    <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-surface-container-high backdrop-blur-xl text-[10px] font-bold text-white rounded-lg opacity-0 group-hover/dock:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-2xl">
      {label}
    </span>
  </div>
);

// Mini Equalizer Component for active chapter
const Equalizer = () => (
  <div className="flex gap-[2px] items-end h-3">
    <motion.div animate={{ height: ["40%", "100%", "40%"] }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }} className="w-1 bg-primary rounded-t-[1px]" />
    <motion.div animate={{ height: ["80%", "30%", "80%"] }} transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }} className="w-1 bg-primary rounded-t-[1px]" />
    <motion.div animate={{ height: ["30%", "90%", "30%"] }} transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }} className="w-1 bg-primary rounded-t-[1px]" />
  </div>
);

// Floating Particles Background
const Particles = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -500],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Magnetic Button Wrapper
const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

// Hacker Text Effect Component
const HackerText = ({ text, className }: { text: string, className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const triggerEffect = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        prev.split("").map((letter, index) => {
          if(index < iteration) {
            return text[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        }).join("")
      );
      
      if(iteration >= text.length){ 
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    triggerEffect();
  }, [text]);

  return (
    <span className={className} onMouseEnter={triggerEffect}>
      {displayText}
    </span>
  );
};

export default function ArpitCV() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  
  // New Creative States
  const [theaterMode, setTheaterMode] = useState(false);
  const [videoFilter, setVideoFilter] = useState('none');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'speed' | 'filters'>('speed');
  const [emailCopied, setEmailCopied] = useState(false);
  const [isCustomPiP, setIsCustomPiP] = useState(false);
  const [showSkipForward, setShowSkipForward] = useState(false);
  const [showSkipBack, setShowSkipBack] = useState(false);
  const [showAISummary, setShowAISummary] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const settingsBtnRef = useRef<HTMLButtonElement>(null);

  // Close settings on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current && 
        !settingsRef.current.contains(event.target as Node) &&
        settingsBtnRef.current &&
        !settingsBtnRef.current.contains(event.target as Node)
      ) {
        setShowSettings(false);
      }
    };
    
    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSettings]);

  // Close settings when video is paused
  useEffect(() => {
    if (!isPlaying) {
      setShowSettings(false);
    }
  }, [isPlaying]);

  // Progress bar hover state
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState<number>(0);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 3D Card Hover Effect Hooks
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  
  // Glare effect transforms
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.15) 0%, transparent 60%)`;

  // Chapters Data
  const chapters = [
    { id: 1, title: "Introduction", time: 0, desc: "Name, Role & Quick hook" },
    { id: 2, title: "Education + Focus", time: 8, desc: "Degree & Area of interest" },
    { id: 3, title: "Skills", time: 18, desc: "Backend, Cloud & Problem-solving" },
    { id: 4, title: "Projects / Experience", time: 32, desc: "CloudIgnite & System Architecture" },
    { id: 5, title: "Closing", time: 50, desc: "Looking for opportunities" }
  ];

  const filters = [
    { name: 'Normal', value: 'none' },
    { name: 'Cinematic', value: 'grayscale(80%) contrast(120%) brightness(90%)' },
    { name: 'Cyberpunk', value: 'hue-rotate(90deg) saturate(200%) contrast(110%)' },
    { name: 'Vintage', value: 'sepia(80%) contrast(110%) brightness(90%)' }
  ];

  const skills = ['Go', 'Python', 'JavaScript', 'Django', 'Node.js', 'MySQL', 'Redis', 'System Design', 'Cloud Platforms', 'Backend Architecture'];

  // Global Mouse Tracker for Custom Cursor
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      switch(e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 't':
          e.preventDefault();
          setTheaterMode(prev => !prev);
          break;
        case 'arrowright':
          e.preventDefault();
          skip(5);
          break;
        case 'arrowleft':
          e.preventDefault();
          skip(-5);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Format time (e.g., 01:23)
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Toggle Play/Pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  // Handle Time Update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  // Handle Loaded Metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle Progress Bar Click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && playerContainerRef.current) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const percentage = clickPosition / rect.width;
      const newTime = percentage * videoRef.current.duration;
      
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(percentage * 100);
    }
  };

  // Handle Progress Bar Hover
  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const percentage = clickPosition / rect.width;
      
      setHoverX(clickPosition);
      setHoverTime(percentage * duration);
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (isMuted) {
        setVolume(videoRef.current.volume || 1);
      } else {
        setVolume(0);
      }
    }
  };

  // Handle Volume Change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
      videoRef.current.muted = newVolume === 0;
    }
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Handle Mouse Movement to show/hide controls
  const handleMouseMove = () => {
    setIsHoveringVideo(true);
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        if (!showSettings) {
          setShowControls(false);
        }
      }, 2500);
    }
  };

  const handleMouseLeave = () => {
    setIsHoveringVideo(false);
    if (isPlaying && !showSettings) {
      setShowControls(false);
    }
  };

  // Skip Forward/Backward
  const skip = (amount: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += amount;
    }
  };

  // Seek to specific time
  const seekTo = (time: number) => {
    if (videoRef.current) {
      setIsSeeking(true);
      setTimeout(() => setIsSeeking(false), 400);
      videoRef.current.currentTime = time;
      setCurrentTime(time);
      if (videoRef.current.paused) {
        videoRef.current.play();
      }
    }
  };

  // Toggle Picture in Picture
  const togglePiP = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (videoRef.current && document.pictureInPictureEnabled) {
        await videoRef.current.requestPictureInPicture();
      } else {
        // Fallback to custom PiP if native is blocked/unsupported
        setIsCustomPiP(!isCustomPiP);
      }
    } catch (error) {
      console.error("PiP failed, using custom fallback:", error);
      setIsCustomPiP(!isCustomPiP);
    }
  };

  // Copy Email Handler
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('arpitrangi94@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  // Change Playback Speed
  const changeSpeed = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  // Double Tap Handlers
  const handleDoubleTapRight = () => {
    skip(10);
    setShowSkipForward(true);
    setTimeout(() => setShowSkipForward(false), 500);
  };

  const handleDoubleTapLeft = () => {
    skip(-10);
    setShowSkipBack(true);
    setTimeout(() => setShowSkipBack(false), 500);
  };

  // 3D Card Handlers
  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeaveCard = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-on-surface flex flex-col font-sans selection:bg-primary/30 relative overflow-hidden">
      
      {/* Premium Background Grid & Vignette */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#050505_100%)] pointer-events-none z-10 opacity-60"></div>
      
      {/* Noise Texture */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* Custom Video Cursor */}
      <AnimatePresence>
        {isHoveringVideo && !showControls && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed pointer-events-none z-[100] flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            style={{ 
              width: 60, 
              height: 60,
              left: cursorPos.x - 30,
              top: cursorPos.y - 30,
            }}
          >
            {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white ml-1" />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      {/* Floating Particles */}
      <Particles />

      {/* Navbar */}
      <nav className="sticky top-0 w-full z-30 bg-surface/60 backdrop-blur-2xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="hover:opacity-80 transition-opacity"><Logo className="h-8" /></Link>
          <div className="flex items-center gap-6 text-sm font-medium text-on-surface-variant">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/docs" className="hover:text-white transition-colors">Docs</Link>
          </div>
        </div>
      </nav>

      {/* Floating Tech Stack Icons */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-10 text-white/10 hidden lg:block"
      >
        <Database size={64} />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-32 left-20 text-white/10 hidden lg:block"
      >
        <Server size={48} />
      </motion.div>
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-40 right-10 text-white/10 hidden lg:block"
      >
        <Cloud size={56} />
      </motion.div>

      {/* Main Content */}
      <main className={`flex-1 max-w-7xl mx-auto w-full p-6 md:p-12 grid lg:grid-cols-3 gap-8 lg:gap-12 relative ${theaterMode ? 'z-50' : 'z-10'}`}>
        {/* Theater Mode Overlay */}
        <AnimatePresence>
          {theaterMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-black z-40 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '6s' }}></div>

        {/* Left Column: Video & Chapters */}
        <div className={`lg:col-span-2 space-y-8 ${isCustomPiP ? 'fixed bottom-6 right-6 w-80 z-[100] shadow-2xl' : ''}`}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col md:flex-row md:items-end justify-between gap-4 ${isCustomPiP ? 'hidden' : ''}`}
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 flex items-center gap-4">
                <PlayCircle className="text-primary w-10 h-10 md:w-12 md:h-12" />
                Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Video CV</span>
              </h1>
              <p className="text-on-surface-variant text-lg flex items-center gap-2 flex-wrap">
                Press <kbd className="px-2 py-1 bg-white/10 border border-white/10 rounded-md text-xs font-mono text-white shadow-sm">T</kbd> for theater mode, 
                <kbd className="px-2 py-1 bg-white/10 border border-white/10 rounded-md text-xs font-mono text-white shadow-sm">F</kbd> for fullscreen.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <Sparkles size={14} className="text-secondary animate-pulse" /> 
              <span>Pro Tip: Try the cinematic filters</span>
            </div>
          </motion.div>

          {/* Video Player Container */}
          <div className="relative group/player">
            {/* Ambient Cinematic Glow */}
            <motion.div 
              className="absolute -inset-4 bg-primary/20 blur-[100px] rounded-full opacity-0 group-hover/player:opacity-100 transition-opacity duration-1000 pointer-events-none z-0"
              animate={{ 
                scale: isPlaying ? [1, 1.05, 1] : 1,
                opacity: isPlaying ? [0.3, 0.5, 0.3] : 0
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100, damping: 20 }}
              ref={playerContainerRef}
              className={`relative rounded-2xl overflow-hidden bg-black border border-white/10 group transition-all duration-700 z-10 ${
                isFullscreen ? 'rounded-none border-none' : ''
              } ${isPlaying ? 'shadow-[0_0_40px_rgba(139,92,246,0.2),0_0_80px_rgba(139,92,246,0.1)]' : 'shadow-[0_20px_50px_rgba(0,0,0,0.5)]'} ${theaterMode && !isCustomPiP ? 'ring-1 ring-white/20 shadow-[0_0_100px_rgba(139,92,246,0.3)] z-50' : ''} ${isHoveringVideo && !showControls ? 'cursor-none' : ''} ${isCustomPiP ? 'ring-2 ring-primary shadow-2xl' : ''}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => {
                if ((e.target as HTMLElement).tagName.toLowerCase() === 'video' || (e.target as HTMLElement).tagName.toLowerCase() === 'div') {
                  togglePlay();
                }
              }}
            >
            {/* Custom PiP Header */}
            {isCustomPiP && (
              <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/80 to-transparent p-3 z-30 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Live
                </span>
                <button onClick={() => setIsCustomPiP(false)} className="text-white/80 hover:text-white bg-black/50 rounded-full p-1 backdrop-blur-sm">
                  <Minimize size={14} />
                </button>
              </div>
            )}

            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full h-full object-contain aspect-video transition-all duration-1000"
              style={{ filter: videoFilter }}
              src="https://cloudignite.in/assets/video_cv-BywdeoAn.mp4"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onWaiting={() => setIsWaiting(true)}
              onPlaying={() => setIsWaiting(false)}
            />

            {/* Double Tap Zones */}
            <div className="absolute inset-y-0 left-0 w-1/3 z-10" onDoubleClick={handleDoubleTapLeft}></div>
            <div className="absolute inset-y-0 right-0 w-1/3 z-10" onDoubleClick={handleDoubleTapRight}></div>

            {/* Double Tap Animations */}
            <AnimatePresence>
              {showSkipBack && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center justify-center pointer-events-none z-20"
                >
                  <div className="flex text-white/80"><SkipBack size={32} /><SkipBack size={32} className="-ml-4" /></div>
                  <span className="text-white font-bold mt-2 bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">-10s</span>
                </motion.div>
              )}
              {showSkipForward && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 flex flex-col items-center justify-center pointer-events-none z-20"
                >
                  <div className="flex text-white/80"><SkipForward size={32} className="-mr-4" /><SkipForward size={32} /></div>
                  <span className="text-white font-bold mt-2 bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">+10s</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Seek Flash Effect */}
            <AnimatePresence>
              {isSeeking && (
                <motion.div
                  initial={{ opacity: 0.4, scale: 1.02 }}
                  animate={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 bg-primary/30 mix-blend-screen pointer-events-none z-10"
                />
              )}
            </AnimatePresence>

            {/* Current Chapter Overlay */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-4 left-4 md:top-6 md:left-6 z-20 pointer-events-none"
                >
                  <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white flex items-center gap-2 shadow-lg">
                    <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-primary animate-pulse' : 'bg-white/50'}`} />
                    {chapters.slice().reverse().find(c => currentTime >= c.time)?.title || chapters[0].title}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buffering Overlay */}
            <AnimatePresence>
              {isWaiting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none z-10"
                >
                  <Loader2 size={48} className="text-primary animate-spin" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Play/Pause Center Animation (Only shows if controls are visible) */}
            <AnimatePresence>
              {!isPlaying && showControls && !isWaiting && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary/80 backdrop-blur-md rounded-full flex items-center justify-center pointer-events-none z-10 shadow-[0_0_30px_rgba(139,92,246,0.5)]"
                >
                  <Play size={32} className="text-white ml-2" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Settings Menu Popover */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  ref={settingsRef}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-20 right-4 w-56 bg-surface-container-high/95 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Tabs */}
                  <div className="flex border-b border-white/10">
                    <button 
                      onClick={() => setSettingsTab('speed')}
                      className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${settingsTab === 'speed' ? 'bg-white/10 text-white' : 'text-on-surface-variant hover:text-white'}`}
                    >
                      Speed
                    </button>
                    <button 
                      onClick={() => setSettingsTab('filters')}
                      className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${settingsTab === 'filters' ? 'bg-white/10 text-white' : 'text-on-surface-variant hover:text-white'}`}
                    >
                      Filters
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="p-2 flex flex-col gap-1 max-h-48 overflow-y-auto">
                    {settingsTab === 'speed' ? (
                      [0.5, 1, 1.25, 1.5, 2].map(rate => (
                        <button
                          key={rate}
                          onClick={() => changeSpeed(rate)}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${playbackRate === rate ? 'bg-primary/20 text-primary font-bold' : 'hover:bg-white/10 text-white'}`}
                        >
                          <span>{rate === 1 ? 'Normal' : `${rate}x`}</span>
                          {playbackRate === rate && <Check size={14} className="text-primary" />}
                        </button>
                      ))
                    ) : (
                      filters.map(filter => (
                        <button
                          key={filter.name}
                          onClick={() => setVideoFilter(filter.value)}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${videoFilter === filter.value ? 'bg-secondary/20 text-secondary font-bold' : 'hover:bg-white/10 text-white'}`}
                        >
                          <div className="flex items-center gap-2">
                            {filter.name === 'Normal' && <PlayCircle size={14} />}
                            {filter.name === 'Cinematic' && <Wand2 size={14} />}
                            {filter.name === 'Cyberpunk' && <Palette size={14} />}
                            {filter.name === 'Vintage' && <PictureInPicture size={14} />}
                            <span>{filter.name}</span>
                          </div>
                          {videoFilter === filter.value && <Check size={14} className="text-secondary" />}
                        </button>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls Overlay */}
            <AnimatePresence>
              {showControls && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-4 z-20"
                  onMouseEnter={() => setIsHoveringVideo(false)}
                  onMouseLeave={() => setIsHoveringVideo(true)}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Progress Bar Container */}
                  <div className="relative w-full group/progress">
                    {/* Tooltip */}
                    <AnimatePresence>
                      {hoverTime !== null && (
                        <motion.div
                          initial={{ opacity: 0, y: 5, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.8 }}
                          className="absolute bottom-full mb-2 -translate-x-1/2 bg-surface-container-high/90 backdrop-blur-md text-white text-[10px] font-mono px-2 py-1 rounded border border-white/10 pointer-events-none whitespace-nowrap z-50 shadow-xl"
                          style={{ left: hoverX }}
                        >
                          {formatTime(hoverTime)}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Progress Bar */}
                    <div 
                      className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer relative"
                      onClick={handleProgressClick}
                      onMouseMove={handleProgressHover}
                      onMouseLeave={() => setHoverTime(null)}
                    >
                      {/* Hover effect */}
                      <div className="absolute inset-y-0 left-0 bg-white/30 rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" style={{ width: '100%' }}></div>
                      
                      {/* Current Progress */}
                      <div 
                        className="absolute top-0 left-0 h-full bg-primary rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                        style={{ width: `${progress}%` }}
                      >
                        {/* Scrubber Knob */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_10px_rgba(139,92,246,0.8)] opacity-0 group-hover/progress:opacity-100 transition-opacity scale-0 group-hover/progress:scale-100 duration-200"></div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Controls Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 md:gap-6">
                      {/* Play/Pause Button */}
                      <div className="relative group/btn">
                        <button 
                          onClick={togglePlay}
                          className="text-white hover:text-primary transition-colors focus:outline-none hover:scale-110 active:scale-95"
                        >
                          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                        </button>
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 backdrop-blur-sm text-[10px] font-bold text-white rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-xl">
                          {isPlaying ? 'Pause' : 'Play'} (Space)
                        </span>
                      </div>

                      {/* Skip Buttons */}
                      <div className="hidden sm:flex items-center gap-4 text-white/80">
                        <div className="relative group/btn">
                          <button onClick={() => skip(-5)} className="hover:text-white transition-colors hover:scale-110 active:scale-95"><SkipBack size={20} /></button>
                          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 backdrop-blur-sm text-[10px] font-bold text-white rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-xl">
                            -5s (←)
                          </span>
                        </div>
                        <div className="relative group/btn">
                          <button onClick={() => skip(5)} className="hover:text-white transition-colors hover:scale-110 active:scale-95"><SkipForward size={20} /></button>
                          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 backdrop-blur-sm text-[10px] font-bold text-white rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-xl">
                            +5s (→)
                          </span>
                        </div>
                      </div>

                      {/* Volume Control */}
                      <div className="flex items-center gap-2 group/volume relative">
                        <button onClick={toggleMute} className="text-white hover:text-primary transition-colors focus:outline-none hover:scale-110 active:scale-95">
                          {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        <input 
                          type="range" 
                          min="0" 
                          max="1" 
                          step="0.05"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          style={{ backgroundSize: `${(isMuted ? 0 : volume) * 100}% 100%` }}
                          className="w-0 opacity-0 group-hover/volume:w-20 group-hover/volume:opacity-100 transition-all duration-300 cursor-pointer h-1.5 bg-white/20 bg-gradient-to-r from-primary to-primary bg-no-repeat rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                        />
                      </div>

                      {/* Time Display */}
                      <div className="text-xs font-mono text-white/80 select-none bg-white/10 px-2 py-1 rounded-md border border-white/5">
                        {formatTime(currentTime)} <span className="text-white/40 mx-1">/</span> {formatTime(duration)}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-5">
                      {/* Theater Mode Toggle */}
                      <div className="relative group/btn hidden sm:block">
                        <button 
                          onClick={() => setTheaterMode(!theaterMode)}
                          className={`transition-colors focus:outline-none hover:scale-110 active:scale-95 ${theaterMode ? 'text-secondary' : 'text-white hover:text-primary'}`}
                        >
                          {theaterMode ? <LightbulbOff size={20} /> : <Lightbulb size={20} />}
                        </button>
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 backdrop-blur-sm text-[10px] font-bold text-white rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-xl">
                          Theater (T)
                        </span>
                      </div>

                      {/* PiP Toggle */}
                      <div className="relative group/btn hidden sm:block">
                        <button 
                          onClick={togglePiP}
                          className="text-white hover:text-primary transition-colors focus:outline-none hover:scale-110 active:scale-95"
                        >
                          <PictureInPicture size={20} />
                        </button>
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 backdrop-blur-sm text-[10px] font-bold text-white rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-xl">
                          Mini Player
                        </span>
                      </div>

                      {/* Share Button */}
                      <div className="relative group/btn hidden sm:block">
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                          }}
                          className="text-white hover:text-primary transition-colors focus:outline-none hover:scale-110 active:scale-95"
                        >
                          <Share2 size={20} />
                        </button>
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 backdrop-blur-sm text-[10px] font-bold text-white rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-xl">
                          Copy Link
                        </span>
                      </div>

                      {/* Settings Toggle */}
                      <div className="relative group/btn">
                        <button 
                          ref={settingsBtnRef}
                          onClick={() => setShowSettings(!showSettings)}
                          className={`transition-colors focus:outline-none hover:scale-110 active:scale-95 ${showSettings ? 'text-primary rotate-90' : 'text-white hover:text-primary'}`}
                        >
                          <Settings size={20} className="transition-transform duration-300" />
                        </button>
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 backdrop-blur-sm text-[10px] font-bold text-white rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-xl">
                          Settings
                        </span>
                      </div>

                      {/* Fullscreen Toggle */}
                      <div className="relative group/btn">
                        <button 
                          onClick={toggleFullscreen}
                          className="text-white hover:text-primary transition-colors focus:outline-none hover:scale-110 active:scale-95"
                        >
                          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                        </button>
                        <span className="absolute -top-10 right-0 px-2 py-1 bg-black/90 backdrop-blur-sm text-[10px] font-bold text-white rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-xl">
                          Fullscreen (F)
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          </div>

          {/* AI Summary & Chapters Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4"
          >
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Play size={16} className="text-primary" /> Video Chapters
            </h3>
            
            <button 
              onClick={() => {
                setShowAISummary(!showAISummary);
                if (!showAISummary) {
                  setIsGeneratingSummary(true);
                  setTimeout(() => setIsGeneratingSummary(false), 1500);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary hover:bg-primary/20 transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:-translate-y-0.5 active:scale-95"
            >
              <Bot size={14} />
              {showAISummary ? 'Hide AI Summary' : '✨ Generate AI Summary'}
            </button>
          </motion.div>

          {/* AI Summary Panel */}
          <AnimatePresence>
            {showAISummary && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 rounded-2xl bg-surface-container border border-primary/20 shadow-[0_10px_30px_rgba(139,92,246,0.1)] relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                  {isGeneratingSummary ? (
                    <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                      <Loader2 size={16} className="animate-spin text-primary" />
                      Analyzing video content and extracting key insights...
                    </div>
                  ) : (
                    <div className="space-y-3 text-sm text-on-surface-variant leading-relaxed">
                      <p><strong className="text-white">TL;DR:</strong> Arpit is a Backend Developer & System Architect specializing in scalable cloud platforms. He is currently building CloudIgnite, a platform offering storage, auth, and serverless infrastructure.</p>
                      <ul className="space-y-2 mt-2">
                        <li className="flex items-start gap-2"><ChevronRight size={14} className="text-primary mt-0.5 shrink-0" /> <strong>Core Stack:</strong> Go, Python, Django, Cloud Infrastructure.</li>
                        <li className="flex items-start gap-2"><ChevronRight size={14} className="text-primary mt-0.5 shrink-0" /> <strong>Key Project:</strong> CloudIgnite (Serverless platform).</li>
                        <li className="flex items-start gap-2"><ChevronRight size={14} className="text-primary mt-0.5 shrink-0" /> <strong>Goal:</strong> Seeking opportunities to build scalable systems and grow as a backend engineer.</li>
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chapters / Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {chapters.map((chapter, index) => {
                const isPast = currentTime >= chapter.time;
                const isCurrent = isPast && (chapters[index + 1] ? currentTime < chapters[index + 1].time : true);
                
                return (
                  <button 
                    key={chapter.id}
                    onClick={() => seekTo(chapter.time)}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                      isCurrent 
                        ? 'bg-primary/10 border-primary/50 shadow-[0_0_20px_rgba(139,92,246,0.15)] -translate-y-1' 
                        : 'bg-surface-container border-white/5 hover:border-white/20 hover:bg-white/5 hover:-translate-y-1'
                    }`}
                  >
                    {/* Active Chapter Indicator */}
                    {isCurrent && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                    )}

                    <div className="flex justify-between items-start mb-2">
                      <div className={`text-xs font-mono transition-colors ${isCurrent ? 'text-primary font-bold' : 'text-outline group-hover:text-primary/70'}`}>
                        {formatTime(chapter.time)}
                      </div>
                      {isCurrent && isPlaying && <Equalizer />}
                    </div>
                    
                    <div className={`font-bold text-sm mb-1 transition-colors ${isCurrent ? 'text-white' : 'text-on-surface group-hover:text-white'}`}>
                      {chapter.title}
                    </div>
                    <div className="text-[10px] text-on-surface-variant line-clamp-2 leading-relaxed">
                      {chapter.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Column: CV Details Sidebar */}
        <div className="space-y-6 perspective-1000 z-10">
          {/* Profile Card with 3D Tilt */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onMouseMove={handleMouseMoveCard}
            onMouseLeave={handleMouseLeaveCard}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="p-8 rounded-3xl bg-surface-container-low border border-white/5 relative overflow-hidden group shadow-2xl"
          >
            {/* Dynamic Glare Effect */}
            <motion.div 
              className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
              style={{ background: glareBackground }} 
            />

            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-3xl rounded-full group-hover:bg-primary/20 transition-colors duration-500"></div>
            
            <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
              <div className="flex justify-between items-start mb-6">
                <div className="w-24 h-24 rounded-full p-1 relative group/avatar">
                  {/* Animated Conic Gradient Border */}
                  <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-[spin_3s_linear_infinite] opacity-50"></div>
                  <div className="absolute inset-[2px] rounded-full bg-surface z-10"></div>
                  
                  <div className="relative z-20 w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)] group-hover/avatar:shadow-[0_0_50px_rgba(139,92,246,0.5)] transition-shadow duration-500">
                    <User size={40} className="text-white" />
                  </div>
                </div>
                
                {/* Status Badges Group */}
                <div className="flex flex-col items-end gap-2">
                  {/* Live Status Badge */}
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-full border border-white/5 shadow-inner backdrop-blur-md">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </div>
                    <span className="text-[10px] font-mono text-white/70 uppercase tracking-wider">Systems Online</span>
                  </div>
                  
                  {/* Available Badge */}
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 shadow-inner backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Available for Hire</span>
                  </div>
                </div>
              </div>
              
              {/* Animated Name Reveal */}
              <h2 className="text-3xl font-black text-white mb-1 tracking-tight flex">
                {"Arpit".split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h2>
              
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-bold text-sm mb-6 uppercase tracking-widest flex items-center gap-2 group/role cursor-default">
                <Briefcase size={14} className="text-primary" /> 
                <span className="group-hover/role:hidden"><HackerText text="Backend Developer" /></span>
                <span className="hidden group-hover/role:inline-block text-white animate-pulse">System Architect</span>
              </p>

              <div className="flex items-center gap-4 mb-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                  <MapPin size={12} className="text-primary" /> India
                </div>
                <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                  <Calendar size={12} className="text-primary" /> Joined 2021
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <a href="mailto:arpitrangi94@gmail.com" onClick={handleCopyEmail} className="flex items-center justify-between text-sm text-on-surface-variant hover:text-white transition-colors group/link relative">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${emailCopied ? 'bg-emerald-500/20 text-emerald-500' : 'bg-surface-container group-hover/link:bg-primary/20 group-hover/link:text-primary'}`}>
                      {emailCopied ? <CheckCircle2 size={14} /> : <Mail size={14} />}
                    </div>
                    <span>arpitrangi94@gmail.com</span>
                  </div>
                  <span className="text-[10px] font-bold text-primary opacity-0 group-hover/link:opacity-100 transition-opacity absolute right-0 bg-surface-container-low px-2 py-1 rounded">
                    {emailCopied ? 'Copied!' : 'Click to copy'}
                  </span>
                </a>
                <a href="https://github.com/arangi0072" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm text-on-surface-variant hover:text-white transition-colors group/link">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center group-hover/link:bg-primary/20 group-hover/link:text-primary transition-colors">
                      <Github size={14} />
                    </div>
                    github.com/arangi0072
                  </div>
                  <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </a>
                <a href="https://linkedin.com/in/arpit-rangi" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm text-on-surface-variant hover:text-white transition-colors group/link">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center group-hover/link:bg-primary/20 group-hover/link:text-primary transition-colors">
                      <Linkedin size={14} />
                    </div>
                    linkedin.com/in/arpit-rangi
                  </div>
                  <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </a>
              </div>

              {/* Magnetic Download Button */}
              <a href="https://arpit.cloudignite.in/Arpit_Rangi_CV.pdf" target="_blank" rel="noopener noreferrer" className="block">
                <MagneticButton className="w-full py-4 rounded-xl bg-white text-black font-black flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] group/btn relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>
                  <Download size={18} className="group-hover/btn:-translate-y-1 transition-transform" /> Download Resume
                </MagneticButton>
              </a>
            </div>
          </motion.div>

          {/* Terminal Widget */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl bg-[#0D0D0D] border border-white/10 overflow-hidden font-mono text-xs shadow-2xl relative group"
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="ml-2 text-white/40 flex-1 text-center pr-8">arpit@cloudignite:~</span>
            </div>
            {/* Terminal Body */}
            <div className="p-4 text-emerald-400/90 space-y-2 h-32 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0D0D0D] pointer-events-none z-10 top-1/2"></div>
              <TypewriterLine text="$ ./deploy_infrastructure.sh" delay={0.5} className="text-white/80" />
              <TypewriterLine text="[OK] Provisioning database clusters..." delay={1.5} />
              <TypewriterLine text="[OK] Configuring Redis cache layer..." delay={2.5} />
              <TypewriterLine text="System architecture optimized. Ready for scale." delay={3.5} className="text-blue-400 font-bold" />
              <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-4 bg-emerald-400 inline-block mt-1"></motion.div>
            </div>
          </motion.div>

          {/* System Metrics Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="p-8 rounded-3xl bg-surface-container-low border border-white/5 shadow-xl relative overflow-hidden group/metrics"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-50"></div>
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <Activity size={16} className="text-emerald-400" /> Telemetry
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-surface-container border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden group/metricbox">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover/metricbox:opacity-100 transition-opacity"></div>
                  <div className="text-on-surface-variant mb-1"><Cpu size={14} /></div>
                  <div className="text-2xl font-mono font-bold text-white"><AnimatedCounter from={0} to={99.9} decimals={1} suffix="%" /></div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-1">+0.01% Uptime</div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden group/metricbox">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover/metricbox:opacity-100 transition-opacity"></div>
                  <div className="text-on-surface-variant mb-1"><GitCommit size={14} /></div>
                  <div className="text-2xl font-mono font-bold text-white"><AnimatedCounter from={0} to={3.4} decimals={1} suffix="k" /></div>
                  <div className="text-[10px] text-cyan-400 font-mono mt-1">Contributions</div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden group/metricbox">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover/metricbox:opacity-100 transition-opacity"></div>
                  <div className="text-on-surface-variant mb-1"><Globe size={14} /></div>
                  <div className="text-2xl font-mono font-bold text-white"><AnimatedCounter from={0} to={12} suffix="ms" /></div>
                  <div className="text-[10px] text-blue-400 font-mono mt-1">Avg Latency</div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden group/metricbox">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover/metricbox:opacity-100 transition-opacity"></div>
                  <div className="text-on-surface-variant mb-1"><Coffee size={14} /></div>
                  <div className="text-2xl font-mono font-bold text-white">∞</div>
                  <div className="text-[10px] text-orange-400 font-mono mt-1">Coffee Consumed</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-3xl bg-surface-container-low border border-white/5 shadow-xl relative overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-secondary/10 blur-3xl rounded-full"></div>
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <Code2 size={16} className="text-primary" /> Core Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span 
                    key={skill} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + (index * 0.05) }}
                    className="px-3 py-1.5 rounded-lg bg-surface-container border border-white/5 text-xs font-medium text-on-surface-variant hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(139,92,246,0.2)] flex items-center gap-1 group/skill"
                  >
                    <MousePointer2 size={10} className="opacity-0 group-hover/skill:opacity-100 transition-opacity text-primary -ml-1" />
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Floating Action Dock */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-surface-container-high/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)_inset] flex items-center gap-6"
      >
        <DockIcon icon={<Home size={20} />} label="Home" href="/" />
        <DockIcon icon={<PlayCircle size={20} />} label="Video CV" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} />
        <div className="w-px h-6 bg-white/10"></div>
        <DockIcon icon={<Github size={20} />} label="GitHub" href="https://github.com/arangi0072" external />
        <DockIcon icon={<Linkedin size={20} />} label="LinkedIn" href="https://linkedin.com/in/arpit-rangi" external />
        <DockIcon icon={<Mail size={20} />} label="Email" onClick={handleCopyEmail} />
      </motion.div>
    </div>
  );
}
