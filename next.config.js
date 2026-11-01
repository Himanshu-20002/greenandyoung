/**
 * Next.js configuration file
 * Extends the image optimizer to accept additional quality values.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Add the qualities that are used throughout the project.
    // Default is [75]; we need to support 90 and 95 as well.
    qualities: [75, 90, 95],
    // If you have external image domains, list them here.
    domains: [],
  },
  // Keep other existing Next.js config options as needed.
};

module.exports = nextConfig;

