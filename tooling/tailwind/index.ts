import type { Config } from "tailwindcss";

export default {
  content: [""],
  theme: {
    colors: {
      primary: "#3B82F6", // Blue
      secondary: "#F59E0B", // Yellow
      tertiary: "#6B7280", // Gray
      bgPrimary: "#FFFFFF", // White
      bgSecondary: "#F3F4F6", // Light Gray
      bgTertiary: "#EDF2F7", // Off-White
      textPrimary: "#1F2937", // Dark Blue-Grey
      textSecondary: "#9CA3AF", // Medium Gray
      textTertiary: "#6B7280", // Darker Gray
      dangerPrimary: "#EF4444", // Red
      dangerSecondary: "#F87171", // Light Red
      warningPrimary: "#FBBF24", // Orange
      warningSecondary: "#FCD34D", // Light Orange
      infoPrimary: "#10B981", // Green
      infoSecondary: "#6EE7B7", // Light Green
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
