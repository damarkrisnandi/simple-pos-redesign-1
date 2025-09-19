import { Colors } from '../constants/Colors';

/**
 * Utility functions for the reusable components
 */

/**
 * Get a random color from the primary palette
 */
export const getRandomColor = (): string => {
    const colors = [
        Colors.primary,
        Colors.secondary,
        Colors.success,
        Colors.warning,
        Colors.error,
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Generate initials from a full name
 */
export const getInitials = (name: string): string => {
    const names = name.trim().split(' ');
    if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
};

/**
 * Format a number as a percentage
 */
export const formatPercentage = (value: number): string => {
    return `${Math.round(Math.max(0, Math.min(100, value)))}%`;
};

/**
 * Debounce function for input handling
 */
export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

/**
 * Check if a color is light or dark for text contrast
 */
export const isLightColor = (color: string): boolean => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
};

/**
 * Generate a contrast text color based on background
 */
export const getContrastColor = (backgroundColor: string): string => {
    return isLightColor(backgroundColor) ? Colors.black : Colors.white;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Clamp a number between min and max values
 */
export const clamp = (value: number, min: number, max: number): number => {
    return Math.max(min, Math.min(max, value));
};

/**
 * Generate a unique ID
 */
export const generateId = (): string => {
    return Math.random().toString(36).substr(2, 9);
};
