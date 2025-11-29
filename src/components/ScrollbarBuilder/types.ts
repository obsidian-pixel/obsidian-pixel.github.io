export interface ScrollbarTheme {
  width: number;
  borderRadius: number;
  track: {
    background: string;
    opacity: number;
    shadow: string;
  };
  thumb: {
    type: 'solid' | 'gradient';
    background: string; // Solid color
    gradient: string; // Gradient string
    hoverBackground: string;
    border: string;
    borderWidth: number;
  };
}

export const DEFAULT_SCROLLBAR_THEME: ScrollbarTheme = {
  width: 12,
  borderRadius: 6,
  track: {
    background: '#1a1a1a',
    opacity: 1,
    shadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
  },
  thumb: {
    type: 'solid',
    background: '#00ffff',
    gradient: 'linear-gradient(180deg, #00ffff 0%, #0088ff 100%)',
    hoverBackground: '#00cccc',
    border: '#000000',
    borderWidth: 2,
  },
};

export const PRESETS: Record<string, ScrollbarTheme> = {
  neon: DEFAULT_SCROLLBAR_THEME,
  minimal: {
    width: 8,
    borderRadius: 4,
    track: {
      background: 'transparent',
      opacity: 0,
      shadow: 'none',
    },
    thumb: {
      type: 'solid',
      background: 'rgba(255, 255, 255, 0.2)',
      gradient: '',
      hoverBackground: 'rgba(255, 255, 255, 0.4)',
      border: 'transparent',
      borderWidth: 0,
    },
  },
  cyberpunk: {
    width: 16,
    borderRadius: 0,
    track: {
      background: '#000000',
      opacity: 1,
      shadow: 'inset 0 0 10px #ff00ff',
    },
    thumb: {
      type: 'gradient',
      background: '#ff00ff',
      gradient: 'linear-gradient(45deg, #ff00ff, #00ffff)',
      hoverBackground: '#ffffff',
      border: '#ffff00',
      borderWidth: 2,
    },
  },
};
