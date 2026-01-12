# Project Documentation: Julio Hidalgo Portfolio Website

## Table of Contents
1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [HTML Configuration](#html-configuration)
4. [CSS Styling & Configuration](#css-styling--configuration)
5. [JavaScript Functionality](#javascript-functionality)
6. [External Dependencies](#external-dependencies)
7. [Assets & Media](#assets--media)
8. [Web Manifest Configuration](#web-manifest-configuration)
9. [Features & Functionality](#features--functionality)
10. [Contact & Integration](#contact--integration)

---

## Project Overview

This is a **personal portfolio website** for Julio Hidalgo, showcasing his work as a Web Developer & Automation Specialist. The site is built as a static website using vanilla HTML, CSS, and JavaScript with modern design principles and responsive layouts.

**Key Characteristics:**
- Single-page application with smooth scrolling navigation
- Dark theme with modern UI/UX
- Fully responsive design (mobile-first approach)
- Interactive animations and effects
- Contact form integration via Formspree
- PWA-ready with web manifest

---

## File Structure

```
Julio0795.github.io/
├── index.html              # Main HTML file
├── style.css              # All CSS styles
├── script.js              # JavaScript functionality
├── site.webmanifest       # PWA manifest configuration
├── favicon.ico            # Website favicon
├── favicon-16x16.png      # 16x16 favicon
├── favicon-32x32.png      # 32x32 favicon
├── apple-touch-icon.png   # Apple touch icon
├── android-chrome-192x192.png  # Android icon (192px)
├── android-chrome-512x512.png  # Android icon (512px)
├── Project-1.png          # Project 1 image
├── Project-2.png          # Project 2 image
├── Project-3.png          # Project 3 image
└── Project-4.png          # Project 4 image
```

---

## HTML Configuration

### Document Setup
- **Language**: English (`lang="en"`)
- **Character Encoding**: UTF-8
- **Viewport**: Responsive with `width=device-width, initial-scale=1.0`
- **Title**: "Julio Hidalgo - Developer & Automation Specialist"

### Meta Tags & External Resources

#### CSS Resources:
1. **Local Stylesheet**: `style.css`
2. **Font Awesome 6.2.0**: Icons library from CDN
3. **Google Fonts - Poppins**: Font family (weights: 300, 400, 600, 700)
4. **AOS (Animate On Scroll)**: Animation library CSS
5. **BasicLightbox**: Lightbox library CSS

#### JavaScript Libraries (loaded at end of body):
1. **AOS (Animate On Scroll)**: `https://unpkg.com/aos@next/dist/aos.js`
2. **TypeIt**: Typing animation library `https://unpkg.com/typeit@8.7.1/dist/index.umd.js`
3. **BasicLightbox**: `https://cdn.jsdelivr.net/npm/basiclightbox@5.0.4/dist/basicLightbox.min.js`
4. **Custom Script**: `script.js` (loaded last)

### Page Structure

#### 1. Navigation Bar (`<nav>`)
- **Sticky positioning** (stays at top when scrolling)
- **Logo**: "Julio Hidalgo"
- **Menu Items**: Projects, About, Testimonials, Contact
- **Mobile Menu**: Hamburger toggle (3-bar icon)
- **Responsive**: Collapses to hamburger menu on mobile

#### 2. Hero Section (`<header class="hero">`)
- **Title**: "Web Developer & Automation Specialist"
- **Dynamic Tagline**: Animated typing effect (3 rotating messages)
- **Social Links**:
  - GitHub: `https://github.com/Julio0795`
  - LinkedIn: `https://www.linkedin.com/in/julio-hidalgo-9b6790257/`
  - Upwork: `https://www.upwork.com/freelancers/~01288e72efa3d30f70?viewMode=1`

#### 3. Projects Section (`<section id="projects">`)
Displays 4 featured projects in a responsive grid:

**Project 1: Real-Time Trade Signal Copier**
- Technologies: Python, JavaScript, cTrader API, Automation
- GitHub: `https://github.com/Julio0795/Telegram-Ctrader-SignalCopier/tree/main/COPIER`
- Image: `Project-1.png`

**Project 2: AI-Powered WhatsApp Concierge**
- Technologies: Python, ChatGPT API, JavaScript
- GitHub: `https://github.com/Julio0795/CHAT-BOT/tree/main/Whatshapp-bot`
- Image: `Project-2.png`

**Project 3: AI-Powered Interactive Story Generator**
- Technologies: Next.js, OpenAI API, TypeScript, Framer Motion
- GitHub: `https://github.com/Julio0795/AI-Story-generator`
- Image: `Project-3.png`

**Project 4: Automated Document Processing Pipeline**
- Technologies: Power Automate, OCR, MS Exchange, BPA
- Internal tool (no external links)
- Image: `Project-4.png`

#### 4. About Section (`<section id="about">`)
- Personal introduction and professional focus
- Centered text layout

#### 5. Testimonials Section (`<section id="testimonials">`)
- **Carousel functionality** (currently shows "Coming Soon" message)
- Navigation buttons (prev/next)
- Dot indicators
- Keyboard navigation support (arrow keys)
- Auto-play option (commented out)

#### 6. Footer/Contact Section (`<footer id="contact">`)
- **Contact Form**: Integrated with Formspree
  - Formspree Endpoint: `https://formspree.io/f/xnngyzvl`
  - Fields: Name, Email, Message
- **Social Links**:
  - WhatsApp: `https://wa.me/50239404618`
  - Email: `julio.1995.hidalgo@gmail.com`

---

## CSS Styling & Configuration

### CSS Variables (Custom Properties)
Defined in `:root`:
```css
--bg-dark: #1a1a1a          /* Main background */
--bg-light: #2c2c2c          /* Card/section backgrounds */
--primary-color: #00aaff     /* Accent color (blue) */
--text-color: #e0e0e0        /* Primary text */
--text-muted: #a0a0a0        /* Secondary text */
--border-color: #444         /* Border color */
```

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Font Weights**: 300 (light), 400 (regular), 600 (semi-bold), 700 (bold)
- **Headings**: Centered, primary color accent
- **Line Height**: 1.6 for body text

### Layout System
- **Container**: Max-width 1100px, centered, responsive padding
- **Grid System**: CSS Grid for project cards
- **Flexbox**: Used for navigation, social links, forms

### Component Styles

#### Navigation
- Sticky positioning with z-index: 100
- Dark background with border
- Smooth hover transitions
- Mobile: Hamburger menu with animated bars

#### Hero Section
- Minimum height: 60vh
- Centered content
- Large heading (3.5rem desktop)
- Social links with hover effects

#### Project Cards
- Grid layout: `repeat(auto-fit, minmax(320px, 1fr))`
- Hover effects: Lift animation, image zoom
- Tech stack badges with rounded corners
- Responsive image sizing

#### Buttons
- Primary: Blue background (`--primary-color`)
- Secondary: Transparent with border
- Disabled state styling
- Hover transitions

#### Testimonials
- Carousel with smooth transitions
- Navigation buttons (circular, positioned absolutely)
- Dot indicators
- "Coming Soon" special styling with gradient

#### Contact Form
- Max-width: 600px
- Dark theme inputs
- Focus states with primary color border
- Responsive form groups

### Responsive Breakpoints

1. **1024px and below**: Tablet/small desktop adjustments
2. **768px and below**: Tablet - Navigation becomes hamburger menu
3. **600px and below**: Mobile landscape - Smaller fonts, adjusted spacing
4. **480px and below**: Mobile portrait - Stacked layouts, reduced sizes
5. **320px and below**: Very small screens - Minimal sizing

### Key Responsive Features
- Mobile menu with smooth slide animation
- Project grid collapses to single column
- Font sizes scale down progressively
- Navigation buttons hide on very small screens
- Form groups stack vertically on mobile

---

## JavaScript Functionality

### Initialization
All JavaScript runs after DOM content is loaded (`DOMContentLoaded` event).

### 1. AOS (Animate On Scroll) Configuration
```javascript
AOS.init({
  duration: 800,      // Animation duration
  once: true,         // Animate only once
  offset: 100         // Trigger offset in pixels
})
```
- Applied to project cards with `data-aos="fade-up"` attributes
- Staggered delays: 0ms, 100ms, 200ms, 300ms

### 2. TypeIt Typing Animation
- **Target**: `#hero-tagline` element
- **Speed**: 50ms per character
- **Loop**: Continuous
- **Messages** (in sequence):
  1. "I build custom software solutions that solve real-world problems."
  2. "I automate complex business processes."
  3. "I bring ideas to life with generative AI."
- Each message displays for 2-2.5 seconds before deletion

### 3. Smooth Scrolling
- All anchor links (`href^="#"`) scroll smoothly to target sections
- Prevents default jump behavior
- Uses `scrollIntoView({ behavior: "smooth" })`

### 4. Image Lightbox
- Clicking project images opens them in a lightbox
- Uses BasicLightbox library
- Custom close button (×) added dynamically
- Close button positioned top-right

### 5. Testimonials Carousel
**Features:**
- Slide navigation (prev/next buttons)
- Dot indicators for direct navigation
- Keyboard support (Arrow Left/Right keys)
- Auto-play option (currently disabled)
- Smooth CSS transitions
- Active state management

**Current State**: Only one testimonial card (Coming Soon message), so navigation buttons are hidden

### 6. Mobile Menu Toggle
- Hamburger icon click toggles menu visibility
- Adds/removes `active` class on menu and toggle button
- Animated bar transformation (X shape when active)
- Menu slides down with smooth transition

---

## External Dependencies

### CSS Libraries
1. **Font Awesome 6.2.0**
   - Source: `cdnjs.cloudflare.com`
   - Purpose: Icons (GitHub, LinkedIn, WhatsApp, etc.)

2. **AOS (Animate On Scroll)**
   - Source: `unpkg.com/aos@next`
   - Purpose: Scroll-triggered animations

3. **BasicLightbox**
   - Source: `cdn.jsdelivr.net/npm/basiclightbox@5.0.4`
   - Purpose: Image lightbox functionality

### JavaScript Libraries
1. **AOS.js**
   - Version: Latest from unpkg
   - Purpose: Animation initialization

2. **TypeIt**
   - Version: 8.7.1
   - Source: `unpkg.com/typeit@8.7.1`
   - Purpose: Typing animation effect

3. **BasicLightbox**
   - Version: 5.0.4
   - Purpose: Lightbox modal functionality

### Fonts
- **Poppins** (Google Fonts)
  - Weights: 300, 400, 600, 700
  - Display: swap (for performance)

---

## Assets & Media

### Favicons & Icons
- `favicon.ico` - Standard favicon
- `favicon-16x16.png` - 16x16 PNG favicon
- `favicon-32x32.png` - 32x32 PNG favicon
- `apple-touch-icon.png` - Apple device icon
- `android-chrome-192x192.png` - Android/Chrome icon (192px)
- `android-chrome-512x512.png` - Android/Chrome icon (512px)

### Project Images
- `Project-1.png` - Trading Bot project screenshot
- `Project-2.png` - WhatsApp Bot project screenshot
- `Project-3.png` - AI Story Generator project screenshot
- `Project-4.png` - Power Automate project screenshot

**Image Configuration:**
- Project images use `object-fit: cover` (except Project-4 uses `contain`)
- Height: 200px on desktop, scales down on mobile
- Clickable to open in lightbox
- Hover zoom effect (scale 1.03)

---

## Web Manifest Configuration

**File**: `site.webmanifest`

```json
{
  "name": "",
  "short_name": "",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

**Notes:**
- Configured for PWA (Progressive Web App) support
- Icons defined for Android/Chrome
- Display mode: standalone (app-like experience)
- Theme colors set to white (may need updating to match site theme)

---

## Features & Functionality

### Interactive Features
1. **Smooth Scrolling Navigation**: Clicking nav links smoothly scrolls to sections
2. **Animated Typing Effect**: Hero section tagline cycles through messages
3. **Scroll Animations**: Project cards fade up as user scrolls
4. **Image Lightbox**: Click project images to view full-size
5. **Testimonials Carousel**: Navigate through testimonials (ready for multiple)
6. **Mobile Menu**: Hamburger menu for mobile navigation
7. **Hover Effects**: Buttons, cards, and links have interactive hover states

### Form Integration
- **Formspree Integration**: Contact form submits to Formspree endpoint
- **Form ID**: `xnngyzvl`
- **Fields**: Name (required), Email (required), Message (required)
- **Method**: POST
- **No client-side validation** (relies on HTML5 required attributes)

### Accessibility Features
- Semantic HTML structure
- ARIA labels on navigation buttons
- Keyboard navigation support (testimonials carousel)
- Proper heading hierarchy
- Alt text on images (project images)

### Performance Considerations
- External libraries loaded from CDN
- Font display: swap (prevents FOIT)
- CSS transitions for smooth animations
- Optimized responsive images

---

## Contact & Integration

### Contact Methods
1. **Email**: `julio.1995.hidalgo@gmail.com`
2. **WhatsApp**: `+50239404618` (Guatemala country code)
3. **Contact Form**: Formspree integration

### External Links
- **GitHub Profile**: `https://github.com/Julio0795`
- **LinkedIn**: `https://www.linkedin.com/in/julio-hidalgo-9b6790257/`
- **Upwork Profile**: `https://www.upwork.com/freelancers/~01288e72efa3d30f70?viewMode=1`

### Project Repositories
1. Telegram-Ctrader-SignalCopier: `https://github.com/Julio0795/Telegram-Ctrader-SignalCopier/tree/main/COPIER`
2. CHAT-BOT: `https://github.com/Julio0795/CHAT-BOT/tree/main/Whatshapp-bot`
3. AI-Story-generator: `https://github.com/Julio0795/AI-Story-generator`

---

## Technical Summary

### Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **No Build Tools**: Static site, no compilation needed
- **No Framework**: Pure vanilla implementation
- **Hosting**: GitHub Pages (based on repository name)

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design works on all screen sizes
- Progressive enhancement approach

### Deployment
- Repository name suggests GitHub Pages hosting
- Static files can be served from any web server
- No server-side requirements

### Maintenance Notes
1. **Formspree Endpoint**: Verify form endpoint is active
2. **External CDN Links**: Ensure CDN availability for libraries
3. **Image Optimization**: Consider WebP format for better performance
4. **Manifest**: Update theme colors to match site design (#00aaff)
5. **Testimonials**: Add more testimonial cards to enable carousel navigation

---

## Configuration Checklist

- ✅ HTML5 semantic structure
- ✅ Responsive viewport meta tag
- ✅ External CSS/JS libraries loaded
- ✅ Favicon configuration
- ✅ Web manifest for PWA
- ✅ Contact form integration
- ✅ Smooth scrolling navigation
- ✅ Mobile menu functionality
- ✅ Image lightbox
- ✅ Animation libraries initialized
- ✅ Social media links configured
- ✅ Project showcase with images
- ✅ Dark theme styling
- ✅ Responsive breakpoints defined

---

**Document Generated**: Complete analysis of repository structure and configuration
**Last Updated**: Based on current repository state

