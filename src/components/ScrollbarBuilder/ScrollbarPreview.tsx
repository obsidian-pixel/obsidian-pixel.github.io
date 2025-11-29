import React, { useMemo } from 'react';
import { ScrollbarTheme } from './types';

interface ScrollbarPreviewProps {
  theme: ScrollbarTheme;
}

export const ScrollbarPreview: React.FC<ScrollbarPreviewProps> = ({ theme }) => {
  const previewId = 'scrollbar-preview-container';

  const styles = useMemo(() => {
    const thumbBg = theme.thumb.type === 'solid' ? theme.thumb.background : theme.thumb.gradient;

    return `
      #${previewId}::-webkit-scrollbar {
        width: ${theme.width}px;
        height: ${theme.width}px;
      }

      #${previewId}::-webkit-scrollbar-track {
        background: ${theme.track.background};
        border-radius: ${theme.borderRadius}px;
        box-shadow: ${theme.track.shadow};
      }

      #${previewId}::-webkit-scrollbar-thumb {
        background: ${thumbBg};
        border-radius: ${theme.borderRadius}px;
        border: ${theme.thumb.borderWidth}px solid ${theme.thumb.border};
      }

      #${previewId}::-webkit-scrollbar-thumb:hover {
        background: ${theme.thumb.hoverBackground};
      }
    `;
  }, [theme]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <style key={JSON.stringify(theme)}>{styles}</style>

      {/* Mock Browser Window */}
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          height: '75vh',
          maxHeight: '600px',
          minHeight: '450px',
          background: '#0f0f0f',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Browser Toolbar */}
        <div
          style={{
            height: '48px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 1.25rem',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#ff5f56',
                boxShadow: '0 0 10px rgba(255, 95, 86, 0.2)',
              }}
            />
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#ffbd2e',
                boxShadow: '0 0 10px rgba(255, 189, 46, 0.2)',
              }}
            />
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#27c93f',
                boxShadow: '0 0 10px rgba(39, 201, 63, 0.2)',
              }}
            />
          </div>

          <div
            style={{
              flex: 1,
              height: '32px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '8px',
              marginLeft: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              color: 'rgba(255, 255, 255, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            <span
              role="img"
              aria-label="lock"
              style={{ fontSize: '10px', marginRight: '8px', opacity: 0.7 }}
            >
              🔒
            </span>
            obsidian-pixel.github.io
          </div>
        </div>

        {/* Content Area */}
        <div
          id={previewId}
          style={{
            flex: 1,
            overflowY: 'auto',
            background: 'radial-gradient(circle at 50% 0%, #1a1a1a 0%, #0f0f0f 100%)',
            padding: '3rem',
            color: '#e0e0e0',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '1.6',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2
              style={{
                fontSize: '3.5rem',
                marginBottom: '1.5rem',
                color: '#fff',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}
            >
              The Future of <br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #00ffff, #0088ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Interface Design
              </span>
            </h2>
            <p
              style={{
                marginBottom: '4rem',
                fontSize: '1.25rem',
                color: 'rgba(255, 255, 255, 0.6)',
                maxWidth: '600px',
              }}
            >
              Experience the next generation of digital aesthetics. Scroll down to see your custom
              scrollbar in action.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '2rem',
                marginBottom: '4rem',
              }}
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '2rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'transform 0.2s',
                    cursor: 'default',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      background:
                        'linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(0, 136, 255, 0.1))',
                      borderRadius: '12px',
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#00ffff',
                      fontSize: '1.2rem',
                    }}
                  >
                    {i}
                  </div>
                  <h3 style={{ color: '#fff', marginBottom: '0.75rem', fontSize: '1.25rem' }}>
                    Feature {i}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                    Advanced capabilities for modern applications. Seamless integration with your
                    workflow.
                  </p>
                </div>
              ))}
            </div>

            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ marginBottom: '4rem' }}>
                <h3
                  style={{
                    color: '#fff',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <span style={{ color: '#00ffff', opacity: 0.5 }}>0{i + 1}</span>
                  Section Title
                </h3>
                <p style={{ marginBottom: '1.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div
                  style={{
                    padding: '1.5rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    fontFamily: 'Fira Code, monospace',
                    fontSize: '0.9rem',
                    color: '#a5b3ce',
                  }}
                >
                  <code>{`console.log("Scroll to explore more content...");`}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
