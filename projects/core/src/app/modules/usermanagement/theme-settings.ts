export interface Theme {
    themeColor: string;
    themeTextColor: string;
    cardBackgroundColor: string;
    themeAccentColor: string;
    borderRadius: string;
    gridShadow: string;
    showShadow: boolean; // Added
    minHeight?: string;
    maxHeight?: string;
    containerHeight?: string;
    containerWidth?: string;
    transition?: string;
  }
  
  export const customSettings: Theme = {
    themeColor: '#f8f9fa',
    themeTextColor: '#111827',
    cardBackgroundColor: '#ffffff',
    themeAccentColor: '#14b8a6',
    borderRadius: '1rem',
    gridShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    showShadow: true, // Added
    minHeight: '400px',
    containerHeight: 'auto',
    containerWidth: '100%',
    transition: 'all 0.3s ease',
  };
  
  export const defaultShadow: string = '0 4px 6px rgba(0, 0, 0, 0.1)';