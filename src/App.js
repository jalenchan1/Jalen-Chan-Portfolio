import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import './App.css';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkScreenSize();
    
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const loadVanta = async () => {
      if (!window.VANTA) {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        document.head.appendChild(threeScript);

        await new Promise((resolve) => {
          threeScript.onload = resolve;
        });

        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.net.min.js';
        document.head.appendChild(vantaScript);

        await new Promise((resolve) => {
          vantaScript.onload = resolve;
        });
      }


      if (window.VANTA && vantaRef.current && !vantaEffect.current) {
        vantaEffect.current = window.VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x4A90E2,
          backgroundColor: 0x0F1419,
          points: 10.00,
          maxDistance: 20.00,
          spacing: 15.00
        });
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  const Navigation = () => (
    <nav style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(30, 30, 45, 0.9)',
      backdropFilter: 'blur(10px)',
      border: '1px solid #4A90E2',
      borderRadius: '12px',
      padding: isMobile ? '8px 16px' : '12px 24px',
      display: 'flex',
      gap: isMobile ? '12px' : '32px',
      alignItems: 'center',
      zIndex: 1000,
      fontFamily: 'Inter, sans-serif',
      flexWrap: 'nowrap',
      maxWidth: '90vw',
      whiteSpace: 'nowrap'
    }}>
      <div style={{
        color: '#4A90E2',
        fontWeight: 'bold',
        fontSize: isMobile ? '16px' : '18px',
        flexShrink: 0
      }}>
        JC
      </div>
      {['Home', 'About', 'Projects', 'Contact'].map((item) => (
        <button
          key={item}
          onClick={() => setActiveSection(item.toLowerCase())}
          style={{
            background: 'none',
            border: 'none',
            color: activeSection === item.toLowerCase() ? '#4A90E2' : '#8892B0',
            cursor: 'pointer',
            fontSize: isMobile ? '12px' : '14px',
            textDecoration: activeSection === item.toLowerCase() ? 'underline' : 'none',
            transition: 'color 0.3s ease',
            padding: '0',
            flexShrink: 0,
            whiteSpace: 'nowrap'
          }}
          onMouseOver={(e) => e.target.style.color = '#4A90E2'}
          onMouseOut={(e) => e.target.style.color = activeSection === item.toLowerCase() ? '#4A90E2' : '#8892B0'}
        >
          {item}
        </button>
      ))}
    </nav>
  );

  const HomePage = () => (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '80px 20px 100px',
      position: 'relative'
    }}>
      <div style={{
        width: isMobile ? '250px' : '300px',
        height: isMobile ? '250px' : '300px',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '24px',
        border: '2px solid #4A90E2'
      }}>
        <img 
          src={process.env.PUBLIC_URL + "/picofme.jpg"} 
          alt="Jalen Chan"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            imageRendering: 'high-quality',
            filter: 'contrast(1.05) brightness(1.02)'
          }}
        />
      </div>

      <p style={{
        color: '#4A90E2',
        fontSize: '16px',
        marginBottom: '8px'
      }}>
        Hey there, I'm
      </p>

      <h1 style={{
        fontSize: isMobile ? '48px' : '64px',
        fontWeight: 'bold',
        margin: '0 0 16px 0',
        background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Jalen Chan
      </h1>

      <p style={{
        color: '#8892B0',
        fontSize: '18px',
        marginBottom: '40px',
        maxWidth: '500px'
      }}>
        Data Science & Information Science Student @ UIUC
      </p>

      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '40px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => setActiveSection('projects')}
          style={{
            background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          View My Work →
        </button>
        <button 
          onClick={() => window.open('https://github.com/jalenchan1/Jalen_Chan_Resume/raw/main/Jalen_Chan_Resume_27.pdf', '_blank')}
          style={{
            background: 'transparent',
            color: '#4A90E2',
            border: '2px solid #4A90E2',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#4A90E2';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#4A90E2';
          }}
        >
          <Download size={16} />
          Download Resume
        </button>
      </div>

      <div style={{
        display: 'flex',
        gap: '24px',
        position: isMobile ? 'static' : 'absolute',
        bottom: isMobile ? 'auto' : '40px',
        marginTop: isMobile ? '40px' : '0'
      }}>
        <a href="https://www.linkedin.com/in/jalenchan1" style={{
          color: '#8892B0',
          transition: 'color 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.color = '#4A90E2'}
        onMouseOut={(e) => e.target.style.color = '#8892B0'}
        >
          <Linkedin size={24} />
        </a>
        <a href="https://www.github.com/jalenchan1" style={{
          color: '#8892B0',
          transition: 'color 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.color = '#4A90E2'}
        onMouseOut={(e) => e.target.style.color = '#8892B0'}
        >
          <Github size={24} />
        </a>
        <a href="mailto:jalen.chan@gmail.com" style={{
          color: '#8892B0',
          transition: 'color 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.color = '#4A90E2'}
        onMouseOut={(e) => e.target.style.color = '#8892B0'}
        >
          <Mail size={24} />
        </a>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div style={{
      minHeight: '100vh',
      padding: isMobile ? '80px 20px 40px' : '120px 40px 40px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: isMobile ? '36px' : '48px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '40px',
        background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        About Me
      </h2>

      <div style={{
        color: '#8892B0',
        fontSize: '16px',
        lineHeight: '1.6',
        marginBottom: '60px',
        textAlign: 'center'
      }}>
        <p>
          Hi! I'm Jalen Chan, a passionate Data Science and Information Science student at the University of Illinois Urbana-Champaign. I aspire to build a career as either a data scientist or product manager, leveraging my analytical skills and passion for turning data into actionable insights.
        </p>
        <br />
        <p>
          Outside of tech, I'm a Chicago native who love all Chicago Sports (except I do love the Dolphins!). You can also find me weightlifting, running, or in the kitchen making some ice cream with my Ninja Creami.
        </p>
      </div>

      <h3 style={{
        fontSize: '32px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '40px',
        color: '#CCD6F6'
      }}>
        Skills & Technologies
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px'
      }}>
        <div>
          <h4 style={{
            color: '#4A90E2',
            fontSize: '18px',
            marginBottom: '16px'
          }}>
            Languages
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Python', 'SQL', 'HTML/CSS', 'TypeScript', 'JavaScript', 'Java'].map(skill => (
              <span key={skill} style={{
                backgroundColor: 'rgba(42, 42, 64, 0.8)',
                color: '#CCD6F6',
                padding: '6px 12px',
                borderRadius: '16px',
                fontSize: '12px',
                border: '1px solid #4A90E2',
                backdropFilter: 'blur(10px)'
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{
            color: '#4A90E2',
            fontSize: '18px',
            marginBottom: '16px'
          }}>
            Developer Tools
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Power BI', 'Git', 'Jupyter', 'PyCharm', 'GitHub', 'PostgreSQL', 'Databeam', 'Excel', 'React'].map(skill => (
              <span key={skill} style={{
                backgroundColor: 'rgba(42, 42, 64, 0.8)',
                color: '#CCD6F6',
                padding: '6px 12px',
                borderRadius: '16px',
                fontSize: '12px',
                border: '1px solid #4A90E2',
                backdropFilter: 'blur(10px)'
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{
            color: '#4A90E2',
            fontSize: '18px',
            marginBottom: '16px'
          }}>
            Libraries and Frameworks
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Pandas', 'TensorFlow', 'Matplotlib', 'Plotly', 'Scikit-learn', 'Seaborn', 'NumPy', 'Keras'].map(skill => (
              <span key={skill} style={{
                backgroundColor: 'rgba(42, 42, 64, 0.8)',
                color: '#CCD6F6',
                padding: '6px 12px',
                borderRadius: '16px',
                fontSize: '12px',
                border: '1px solid #4A90E2',
                backdropFilter: 'blur(10px)'
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectsPage = () => (
    <div style={{
      minHeight: '100vh',
      padding: isMobile ? '80px 20px 40px' : '120px 40px 40px'
    }}>
      <h2 style={{
        fontSize: isMobile ? '36px' : '48px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '16px',
        background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        My Projects
      </h2>

      <p style={{
        textAlign: 'center',
        color: '#8892B0',
        marginBottom: '60px'
      }}>
        Showcasing my work | Work in progress don't have live links
      </p>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '30px' : '60px',
          alignItems: 'center',
          marginBottom: '100px'
        }}>
          <div style={{
            backgroundColor: 'rgba(42, 42, 64, 0.8)',
            borderRadius: '12px',
            padding: '20px',
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #4A90E2',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}>
              {[1,2,3,4,5].map(i => (
                <div key={i} style={{
                  width: `${60 + i * 20}px`,
                  height: '20px',
                  backgroundColor: '#4A90E2',
                  borderRadius: '4px'
                }} />
              ))}
            </div>
          </div>

          <div>
            <div style={{
              color: '#4A90E2',
              fontSize: '14px',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              PROJECT | WORK IN PROGRESS
            </div>
            <h3 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#CCD6F6',
              marginBottom: '20px'
            }}>
              ByteSize | OCR Recipe Suggester
            </h3>
            <p style={{
              color: '#8892B0',
              lineHeight: '1.6',
              marginBottom: '24px'
            }}>
              ByteSize is a nutrition tracking app that leverages OCR technology to scan and digitize users' pantry items. By building a comprehensive digital pantry inventory, the app provides personalized recipe recommendations that align with users' specific nutritional goals and available ingredients.
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '24px'
            }}>
              {['Expo', 'React Native', 'Node.js', 'PostgreSQL', 'Supabase'].map(tech => (
                <span key={tech} style={{
                  backgroundColor: 'rgba(42, 42, 64, 0.8)',
                  color: '#CCD6F6',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  border: '1px solid #4A90E2',
                  backdropFilter: 'blur(10px)'
                }}>
                  {tech}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button style={{
                background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                View Live
              </button>
              <button 
                onClick={() => window.open('https://github.com/jalenchan1/ByteSize', '_blank')}
                style={{
                  background: 'rgba(74, 144, 226, 0.1)',
                  color: '#4A90E2',
                  border: '1px solid #4A90E2',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backdropFilter: 'blur(10px)'
                }}>
                <Github size={16} />
                GitHub
              </button>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '30px' : '60px',
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              color: '#4A90E2',
              fontSize: '14px',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              BOOTCAMP | WORK IN PROGRESS
            </div>
            <h3 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#CCD6F6',
              marginBottom: '20px'
            }}>
              Image Captioning Pipeline using Multimodal ML
            </h3>
            <p style={{
              color: '#8892B0',
              lineHeight: '1.6',
              marginBottom: '24px'
            }}>
              This project fine tunes the BLIP vision-language model on the MS COCO dataset to create an automated social media caption generator. Users can upload images and receive AI-generated captions optimized for social media platforms.
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '24px'
            }}>
              {['TensorFlow', 'Keras', 'Python', 'PyTorch', 'React', 'FastAPI', 'BLIP'].map(tech => (
                <span key={tech} style={{
                  backgroundColor: 'rgba(42, 42, 64, 0.8)',
                  color: '#CCD6F6',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  border: '1px solid #4A90E2',
                  backdropFilter: 'blur(10px)'
                }}>
                  {tech}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button 
                style={{
                  background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                View Live
              </button>
              <button 
                onClick={() => window.open('https://github.com/jalenchan1/Image_Captioning', '_blank')}
                style={{
                  background: 'rgba(74, 144, 226, 0.1)',
                  color: '#4A90E2',
                  border: '1px solid #4A90E2',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backdropFilter: 'blur(10px)'
                }}>
                <Github size={16} />
                GitHub
              </button>
            </div>
          </div>

          <div style={{
            backgroundColor: 'rgba(42, 42, 64, 0.8)',
            borderRadius: '12px',
            padding: '40px',
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #4A90E2',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}>
              {[1,2,3].map(i => (
                <div key={i} style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#4A90E2',
                  borderRadius: '50%'
                }} />
              ))}
              <div style={{
                width: '60px',
                height: '2px',
                backgroundColor: '#4A90E2'
              }} />
              <div style={{
                width: '80px',
                height: '40px',
                backgroundColor: '#667EEA',
                borderRadius: '8px'
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: isMobile ? '80px 20px 40px' : '100px 40px 40px',
      textAlign: 'center'
    }}>
      <h2 style={{
        fontSize: isMobile ? '36px' : '48px',
        fontWeight: 'bold',
        marginBottom: '16px',
        background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Let's Connect
      </h2>

      <p style={{
        color: '#8892B0',
        fontSize: '16px',
        marginBottom: '60px'
      }}>
        Feel Free To Reach Out!
      </p>

      <div style={{
        display: 'flex',
        gap: '40px',
        marginBottom: '60px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: 'rgba(42, 42, 64, 0.8)',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #4A90E2',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          minWidth: '120px',
          backdropFilter: 'blur(10px)'
        }}
        onClick={() => window.open('mailto:jalen.chan@gmail.com')}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <Mail size={32} style={{ color: '#4A90E2', marginBottom: '12px' }} />
          <div style={{ color: '#CCD6F6', fontSize: '14px' }}>Email</div>
        </div>

        <div style={{
          backgroundColor: 'rgba(42, 42, 64, 0.8)',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #4A90E2',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          minWidth: '120px',
          backdropFilter: 'blur(10px)'
        }}
        onClick={() => window.open('https://www.linkedin.com/in/jalenchan1', '_blank')}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <Linkedin size={32} style={{ color: '#4A90E2', marginBottom: '12px' }} />
          <div style={{ color: '#CCD6F6', fontSize: '14px' }}>LinkedIn</div>
        </div>
      </div>

      <button 
        onClick={() => window.open('https://github.com/jalenchan1/Jalen_Chan_Resume/raw/main/Jalen_Chan_Resume_27.pdf', '_blank')}
        style={{
          background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '16px 32px',
          fontSize: '16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'transform 0.2s ease'
        }}
        onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
      >
        <Download size={20} />
        Download My Resume
      </button>
    </div>
  );

  const renderCurrentSection = () => {
    switch(activeSection) {
      case 'home': return <HomePage />;
      case 'about': return <AboutPage />;
      case 'projects': return <ProjectsPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div style={{
      backgroundColor: '#0F1419',
      color: '#CCD6F6',
      minHeight: '100vh',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      position: 'relative'
    }}>
      {/* Vanta.js background container */}
      <div 
        ref={vantaRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0
        }} 
      />
      
      <Navigation />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        {renderCurrentSection()}
      </div>
    </div>
  );
};

export default Portfolio;