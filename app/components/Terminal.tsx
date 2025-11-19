"use client";
import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { useLocale } from "../context/LocaleContext";
import { portfolioData } from "../data/portfolio";
import { regions } from "../context/LocaleContext";
import { changelog } from "../data/changelog";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TerminalSize = 'normal' | 'maximized' | 'minimized';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
  isError?: boolean;
}

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const { region, setRegion } = useLocale();
  // isMobile state is used to set initial terminal size based on device type
  const [isMobile, setIsMobile] = useState(false);
  const [terminalSize, setTerminalSize] = useState<TerminalSize>('normal');
  const [previousIsOpen, setPreviousIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [commandHistory, setCommandHistory] = useState<CommandOutput[]>([
    {
      command: '',
      output: (
        <div>
          <div className="text-gray-300 mb-2">Type <span className="text-yellow-400">help</span> to see available commands</div>
        </div>
      ),
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Clear terminal when opened
  useEffect(() => {
    // Check if terminal was just opened
    if (isOpen && !previousIsOpen) {
      // Reset command history to initial state
      setCommandHistory([{
        command: '',
        output: (
          <div>
            <div className="text-gray-300 mb-2">Type <span className="text-yellow-400">help</span> to see available commands</div>
          </div>
        ),
      }]);
    }
    
    // Update previous state
    setPreviousIsOpen(isOpen);
  }, [isOpen, previousIsOpen]);

  // Check if device is actually a mobile/tablet (has touch capability)
  useEffect(() => {
    const checkIfMobile = () => {
      // Check for touch capability rather than screen size
      // This distinguishes actual mobile devices from desktop responsive mode
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isTouchDevice);
      // Set initial terminal size based on screen width (still useful for UI)
      setTerminalSize(window.innerWidth < 768 ? 'maximized' : 'normal');
    };
    
    // Check on initial load
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Scroll to bottom when command history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // Blinking cursor effect
  useEffect(() => {
    if (!isOpen) return;
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    
    return () => clearInterval(cursorInterval);
  }, [isOpen]);

  // Handle keyboard input
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle special keys
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // On mobile, ignore only printable characters (we handle them via input event)
      // But allow control keys like Enter, Backspace, Arrows, etc.
      if (isMobile && e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        return;
      }

      // Don't capture if typing in another input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Don't capture special key combinations (allow browser shortcuts)
      if ((e.ctrlKey && e.key !== 'v') || e.altKey || e.metaKey) {
        return;
      }

      e.preventDefault(); // Prevent default browser behavior

      if (e.key === 'Enter') {
        if (input.trim()) {
          const command = input.trim();
          processCommand(command);
          setInputHistory(prev => [...prev, command]);
          setHistoryIndex(-1);
          setInput('');
          setCursorPosition(0);
        }
      } else if (e.key === 'Backspace') {
        if (cursorPosition > 0) {
          const newInput = input.slice(0, cursorPosition - 1) + input.slice(cursorPosition);
          setInput(newInput);
          setCursorPosition(prev => prev - 1);
        }
      } else if (e.key === 'Delete') {
        if (cursorPosition < input.length) {
          const newInput = input.slice(0, cursorPosition) + input.slice(cursorPosition + 1);
          setInput(newInput);
        }
      } else if (e.key === 'ArrowLeft') {
        setCursorPosition(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCursorPosition(prev => Math.min(input.length, prev + 1));
      } else if (e.key === 'ArrowUp') {
        if (historyIndex < inputHistory.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          const historyCommand = inputHistory[inputHistory.length - 1 - newIndex];
          setInput(historyCommand);
          setCursorPosition(historyCommand.length);
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          const historyCommand = inputHistory[inputHistory.length - 1 - newIndex];
          setInput(historyCommand);
          setCursorPosition(historyCommand.length);
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setInput('');
          setCursorPosition(0);
        }
      } else if (e.key === 'Home') {
        setCursorPosition(0);
      } else if (e.key === 'End') {
        setCursorPosition(input.length);
      } else if (e.key.length === 1) {
        // Regular character input
        const newInput = input.slice(0, cursorPosition) + e.key + input.slice(cursorPosition);
        setInput(newInput);
        setCursorPosition(prev => prev + 1);
      }
    };

    // Handle paste event
    const handlePaste = (e: ClipboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      e.preventDefault();
      const pasteText = e.clipboardData?.getData('text') || '';
      const newInput = input.slice(0, cursorPosition) + pasteText + input.slice(cursorPosition);
      setInput(newInput);
      setCursorPosition(prev => prev + pasteText.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('paste', handlePaste);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('paste', handlePaste);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, input, cursorPosition, historyIndex, inputHistory, onClose]);

  // Handle terminal clicks to position cursor
  useEffect(() => {
    if (!isOpen) return;
    
    const handleTerminalClick = () => {
      // When clicking anywhere in terminal, move cursor to end of input
      setCursorPosition(input.length);
      
      // Focus the hidden input to trigger mobile keyboard
      if (hiddenInputRef.current) {
        hiddenInputRef.current.focus();
      }
    };

    const terminalContainer = terminalContainerRef.current;
    if (terminalContainer) {
      terminalContainer.addEventListener('click', handleTerminalClick);
    }

    return () => {
      if (terminalContainer) {
        terminalContainer.removeEventListener('click', handleTerminalClick);
      }
    };
  }, [isOpen, input.length]);

  // Handle input from the hidden input field (for mobile)
  useEffect(() => {
    if (!isOpen || !isMobile) return;
    
    const handleInput = (e: Event) => {
      const inputEvent = e as InputEvent;
      const inputElement = e.target as HTMLInputElement;
      
      if (inputEvent.inputType === 'insertText' && inputEvent.data) {
        // Add the character at cursor position
        const newInput = input.slice(0, cursorPosition) + inputEvent.data + input.slice(cursorPosition);
        setInput(newInput);
        setCursorPosition(prev => prev + 1);
      }
      
      // Clear the hidden input value to prepare for next input
      inputElement.value = '';
    };
    
    const hiddenInput = hiddenInputRef.current;
    if (hiddenInput) {
      hiddenInput.addEventListener('input', handleInput);
      // Focus the input when terminal is opened on mobile
      hiddenInput.focus();
    }
    
    return () => {
      if (hiddenInput) {
        hiddenInput.removeEventListener('input', handleInput);
      }
    };
  }, [isOpen, isMobile, input, cursorPosition]);


  const processCommand = (command: string) => {
    let output: React.ReactNode;
    let isError = false;

    // Command processing logic
    const commandLower = command.toLowerCase();
    const args = command.split(' ').slice(1);

    if (commandLower === 'help') {
      output = (
        <div className="space-y-1">
          <div className="text-yellow-400 font-semibold mb-1">Available Commands:</div>
          <div><span className="text-green-400 font-mono">help</span> - Display this help message</div>
          <div><span className="text-green-400 font-mono">clear</span> - Clear the terminal</div>
          <div><span className="text-green-400 font-mono">goto [section]</span> - Navigate to a portfolio section</div>
          <div className="pl-4 text-gray-400">Available sections: projects, certifications, experience, skills, blog, achievements, timeline</div>
          <div><span className="text-green-400 font-mono">list sections</span> - List all available portfolio sections</div>
          <div><span className="text-green-400 font-mono">list [section]</span> - Show section data in JSON format</div>
          <div className="pl-4 text-gray-400">Example: list projects, list certifications</div>
          <div><span className="text-green-400 font-mono">region [name]</span> - Change the current region</div>
          <div className="pl-4 text-gray-400">Available regions: us-east-1, eu-west-1, ap-south-1</div>
          <div><span className="text-green-400 font-mono">theme [mode]</span> - Change theme (light/dark/system)</div>
          <div><span className="text-green-400 font-mono">whoami</span> - Display current user</div>
          <div><span className="text-green-400 font-mono">date</span> - Display current date and time</div>
          <div><span className="text-green-400 font-mono">echo [text]</span> - Display a line of text</div>
          <div><span className="text-green-400 font-mono">contact</span> - Show contact information</div>
          <div><span className="text-green-400 font-mono">about</span> - Show information about this portfolio</div>
          <div><span className="text-green-400 font-mono">version</span> - Show terminal version</div>
          <div><span className="text-green-400 font-mono">exit</span> - Close the terminal</div>
        </div>
      );
    } else if (commandLower === 'clear') {
      setCommandHistory([]);
      return;
    } else if (commandLower === 'whoami') {
      output = <div>{portfolioData.personal.name.toLowerCase().replace(/\s+/g, '')}</div>;
    } else if (commandLower === 'date') {
      output = <div>{new Date().toString()}</div>;
    } else if (commandLower.startsWith('echo ')) {
      output = <div>{args.join(' ')}</div>;
    } else if (commandLower.startsWith('theme ')) {
      const theme = args[0]?.toLowerCase();
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        output = <div>Theme set to <span className="text-yellow-400">dark</span></div>;
      } else if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        output = <div>Theme set to <span className="text-yellow-400">light</span></div>;
      } else if (theme === 'system') {
        localStorage.removeItem('theme');
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        output = <div>Theme set to <span className="text-yellow-400">system</span></div>;
      } else {
        output = <div>Usage: theme [light|dark|system]</div>;
        isError = true;
      }
    } else if (commandLower === 'version') {
      // Get the latest version from the changelog
      const latestVersion = changelog[0].version;
      
      output = (
        <div>
          <div>AWS Console Portfolio Terminal v{latestVersion}</div>
          <div className="text-xs text-gray-400 mt-1">Open Source Project - https://github.com/abhishekpanda0620/aws-console-portfolio</div>
        </div>
      );
    } else if (commandLower === 'exit') {
      output = <div>Closing terminal...</div>;
      setTimeout(() => onClose(), 500);
    } else if (commandLower.startsWith('goto ')) {
      const section = args[0]?.toLowerCase();
      const validSections = ['projects', 'certifications', 'experience', 'skills', 'blog', 'achievements', 'timeline'];
      
      if (validSections.includes(section)) {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          
          // Add highlight effect
          element.classList.add('ring-2', 'ring-[#ff9900]', 'ring-opacity-50');
          
          // Remove highlight after 2 seconds
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-[#ff9900]', 'ring-opacity-50');
          }, 2000);
          
          output = <div>Navigating to <span className="text-yellow-400">{section}</span>...</div>;
        } else {
          output = <div>Section not found in the current view.</div>;
          isError = true;
        }
      } else {
        output = (
          <div>
            <div>Invalid section. Available sections:</div>
            <div className="pl-4 text-gray-400">{validSections.join(', ')}</div>
          </div>
        );
        isError = true;
      }
    } else if (commandLower === 'list sections') {
      output = (
        <div>
          <div className="text-yellow-400 font-semibold mb-1">Available Portfolio Sections:</div>
          <div>• projects</div>
          <div>• certifications</div>
          <div>• experience</div>
          <div>• skills</div>
          <div>• blog</div>
          <div>• achievements</div>
          <div>• timeline</div>
          <div className="mt-1 text-gray-400">Use <span className="text-green-400 font-mono">goto [section]</span> to navigate</div>
          <div className="text-gray-400">Use <span className="text-green-400 font-mono">list [section]</span> to view data</div>
        </div>
      );
    } else if (commandLower.startsWith('list ') && commandLower !== 'list sections') {
      const section = args[0]?.toLowerCase();
      const validSections = ['projects', 'certifications', 'experience', 'skills', 'blog', 'achievements', 'education'];
      
      if (validSections.includes(section)) {
        // Get data from portfolioData
        // Type assertion to avoid TypeScript error
        const sectionData = portfolioData[section as keyof typeof portfolioData];
        
        if (sectionData) {
          output = (
            <div>
              <div className="text-yellow-400 font-semibold mb-1">{section} Data:</div>
              <pre className="text-xs overflow-x-auto whitespace-pre-wrap bg-gray-800 p-2 rounded">
                {JSON.stringify(sectionData, null, 2)}
              </pre>
            </div>
          );
        } else {
          output = <div>No data available for section: {section}</div>;
          isError = true;
        }
      } else {
        output = (
          <div>
            <div>Invalid section. Available sections:</div>
            <div className="pl-4 text-gray-400">{validSections.join(', ')}</div>
          </div>
        );
        isError = true;
      }
    } else if (commandLower.startsWith('region ')) {
      const newRegion = args[0]?.toLowerCase();
      const validRegions = ['us-east-1', 'ap-south-1', 'eu-south-2'];
      
      if (validRegions.includes(newRegion)) {
        // Find the region in the regions array
        const regionObj = regions.find((r) => r.code === newRegion);
        
        if (regionObj) {
          setRegion(regionObj);
        }
        output = <div>Region changed to <span className="text-yellow-400">{newRegion}</span></div>;
      } else {
        output = (
          <div>
            <div>Invalid region. Available regions:</div>
            <div className="pl-4 text-gray-400">{validRegions.join(', ')}</div>
          </div>
        );
        isError = true;
      }
    } else if (commandLower === 'contact') {
      // Get contact information from portfolioData
      const { email, linkedin, github } = portfolioData.personal;
      
      output = (
        <div>
          <div className="text-yellow-400 font-semibold mb-1">Contact Information:</div>
          <div>Email: <a href={`mailto:${email}`} className="text-blue-400 hover:underline">{email}</a></div>
          <div>LinkedIn: <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{linkedin.replace('https://', '')}</a></div>
          <div>GitHub: <a href={github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{github.replace('https://', '')}</a></div>
        </div>
      );
    } else if (commandLower === 'about') {
      // Get personal information from portfolioData
      const { name } = portfolioData.personal;
      
      output = (
        <div>
          <div className="text-yellow-400 font-semibold mb-1">About This Portfolio:</div>
          <div>This is an AWS Console-inspired portfolio showcasing {name}&apos;s work, skills, and experience.</div>
          <div className="mt-1">Built with Next.js, React, and TailwindCSS.</div>
          <div className="mt-1">This is an open-source project. Feel free to fork and customize it for your own portfolio.</div>
        </div>
      );
    } else {
      output = <div>Command not found. Type <span className="text-yellow-400">help</span> to see available commands.</div>;
      isError = true;
    }

    setCommandHistory(prev => [...prev, { command, output, isError }]);
  };

  const toggleMaximize = () => {
    // If terminal is minimized, first restore it to normal before maximizing
    if (terminalSize === 'minimized') {
      setTerminalSize('normal');
    } else {
      setTerminalSize(terminalSize === 'normal' ? 'maximized' : 'normal');
    }
  };

  return (
    <>
      {/* Terminal Panel */}
      {isOpen && (
        <div
          className={`fixed ${
            terminalSize === 'maximized'
              ? 'top-12 bottom-0 left-0 right-0 z-50' // Leave space for top nav
              : terminalSize === 'minimized'
              ? 'bottom-0 left-0 right-0 z-40 h-10'
              : 'bottom-0 left-0 right-0 z-40'
          } bg-[#0a1929] border-t border-gray-700 shadow-xl transition-all duration-300`}
          ref={terminalContainerRef}
        >
          <div className="flex flex-col w-full h-full">
            {/* Terminal Header */}
            <div className="flex items-center justify-between p-2 bg-[#0a1929] border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-[#132f4c] px-3 py-1 rounded-t border-t border-l border-r border-gray-700">
                  <TerminalIcon size={14} className="text-white mr-2" />
                  <span className="text-white text-xs font-medium">{region.code}</span>
                </div>
                <span className="text-white text-xs ml-2">CloudShell</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTerminalSize(terminalSize === 'minimized' ? 'normal' : 'minimized')}
                  className="p-1 hover:bg-[#132f4c] rounded text-gray-400 hover:text-white"
                  title={terminalSize === 'minimized' ? 'Expand' : 'Collapse'}
                >
                  {terminalSize === 'minimized' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  )}
                </button>
                <button
                  onClick={toggleMaximize}
                  className="p-1 hover:bg-[#132f4c] rounded text-gray-400 hover:text-white"
                  title={terminalSize === 'maximized' ? 'Restore' : 'Maximize'}
                >
                  {terminalSize === 'maximized' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                    </svg>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-[#132f4c] rounded text-gray-400 hover:text-white"
                  title="Close Terminal"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
            
            {/* Terminal Content with Input - Only show if not minimized */}
            {terminalSize !== 'minimized' && (
              <div
                ref={terminalRef}
                className="flex-1 p-3 overflow-y-auto font-mono text-sm text-gray-300 bg-[#0a1929]"
                style={{
                  height: terminalSize === 'maximized' ? 'calc(100vh - 57px)' : 'calc(30vh)', // 30% of viewport height for normal mode
                  maxHeight: terminalSize === 'maximized' ? 'calc(100vh - 57px)' : 'calc(30vh)'
                }}
              >
                {/* Command History */}
                {commandHistory.map((item, index) => (
                  <div key={index} className="mb-2">
                    {item.command && (
                      <div className="flex">
                        <span className="text-green-400 mr-2">$</span>
                        <span>{item.command}</span>
                      </div>
                    )}
                    <div className={`ml-4 ${item.isError ? 'text-red-400' : ''}`}>
                      {item.output}
                    </div>
                  </div>
                ))}
                
                {/* Current Input Line */}
                <div className="flex mt-2">
                  <span className="text-green-400 mr-2">$</span>
                  <div className="flex-1 relative">
                    {/* Render input text with cursor */}
                    <span className="whitespace-pre">
                      {input.slice(0, cursorPosition)}
                      <span className={`inline-block w-2 h-5 -mb-0.5 bg-white ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
                      {input.slice(cursorPosition)}
                    </span>

                  </div>
                </div>
                
                {/* Hidden input field to capture mobile keyboard input */}
                {isMobile && (
                  <input
                    ref={hiddenInputRef}
                    type="text"
                    className="opacity-0 absolute h-full w-full top-0 left-0 pointer-events-none"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}