# Selva Stainless Steel & Glass Works - Website

A complete, high-performance, mobile-first business website for **Selva Stainless Steel & Glass Works** in Madurai, Tamil Nadu, India.

## Business Profile
- **Business Name:** Selva Stainless Steel & Glass Works
- **Phone:** 99948 09708 (`+91 99948 09708`)
- **Email:** Vbsselva@gmail.com
- **Address:** 192, Lakshmi Ceramics Near, Viraganoor Ring Road, Madurai - 625020, Tamil Nadu, India
- **WhatsApp:** [https://wa.me/919994809708](https://wa.me/919994809708)

---

## File Structure

```text
selva-steel-works/
├── index.html                   # Semantic HTML5 single-page application with JSON-LD
├── robots.txt                   # Crawler directions and sitemap link
├── sitemap.xml                  # XML sitemap
├── README.md                    # Project documentation
└── assets/
    ├── css/
    │   └── style.css            # Modular CSS3 design system with metallic gold accents
    ├── js/
    │   └── script.js            # Vanilla ES6+ interactions (lightbox, filter, WhatsApp quote)
    └── images/
        ├── logo-circle.webp     # Circular medallion logo extracted from reference branding
        ├── logo.webp            # Full resolution brand mark
        ├── hero.webp            # High-impact architectural villa exterior
        ├── handrail.webp        # Modern floating staircase SS handrails
        ├── gates.webp           # Contemporary luxury SS entrance gate
        ├── glass.webp           # Frameless architectural glass balcony railing
        ├── upvc.webp            # Modern high-performance uPVC sliding windows
        ├── gallery-*.webp       # Filterable portfolio gallery photographs
        └── brand-card.webp      # Original reference card asset
```

---

## Replacing Project Images & Media

To update the photos with real completed projects in the future:
1. Save your project photos into `assets/images/`.
2. For maximum performance and Core Web Vitals score, convert images to `.webp` format.
3. Open `index.html` and update the `<img>` tags inside `<div class="gallery-grid">` or the featured cards.
4. Update the `alt=""` description attribute to clearly describe the project and location (e.g. `alt="Modern stainless steel gate in Anna Nagar, Madurai"`).

---

## Configuring Domain

Before launching on production hosting (Netlify, Vercel, Hostinger, GitHub Pages, etc.):
1. In `index.html`, replace all instances of `https://YOURDOMAIN.com/` with your live website domain.
2. In `robots.txt`, replace `https://YOURDOMAIN.com/sitemap.xml` with your live sitemap URL.
3. In `sitemap.xml`, replace `https://YOURDOMAIN.com/` with your live domain.

---

## Running Locally

You can serve this static site using any local web server:

```powershell
# Using Python
python -m http.server 3000

# Or using Node.js npx serve
npx serve .
```
Then visit `http://localhost:3000` in your web browser.
