# Izrailov Capital — Website

Institutional-grade marketing site for Izrailov Capital, a commercial real estate
finance intermediary. Single-page architecture with sections for capabilities
(Debt, Equity), transaction structures (including the new Sponsor Enhancement
service), property type coverage, approach, and contact.

## File structure

```
index.html              # Page markup and content
styles.css              # Stylesheet (color tokens at the top of file)
script.js               # Nav behavior, scroll reveal, form, image fallback
emblem-white.png        # Hex emblem only, white — for dark backgrounds
emblem-dark.png         # Hex emblem only, deep emerald — for light backgrounds
logo-white.png          # Full lockup (emblem + wordmark), white — footer
logo-dark.png           # Full lockup, deep emerald — for future light footers
brand-kit-reference.pdf # Original brand kit (Deep Emerald / Antique Gold)
```

## Deploying

Static site — drag all eight files into any host (Netlify, Vercel, Cloudflare
Pages, S3 + CloudFront, GitHub Pages, traditional shared hosting). No build
step. No backend. Form currently uses a simulated submit handler — wire it
to your transactional email provider (Postmark, Resend, SendGrid) by replacing
the `setTimeout` block in `script.js` with a `fetch()` to your endpoint.

## Updating the color system

Every color flows through CSS custom properties defined at the top of
`styles.css`. To rebrand any single element across the site, edit one token:

```css
:root {
  --emerald:        #132E27;   /* Deep Emerald — primary anchor       */
  --emerald-deep:   #0E2520;   /* Footer / contact section            */
  --charcoal:       #262626;   /* Body type                           */
  --gold:           #C5A059;   /* Antique Gold — CTAs and accents     */
  --alabaster:      #FBFBFA;   /* Primary canvas                      */
  /* ... full set in the file ... */
}
```

The 60-30-10 distribution rule from the brand kit is respected throughout:
~60% Alabaster as canvas, ~30% Emerald + Charcoal for structure, ~10% Gold
reserved for high-intent actions and the most strategic emphasis only.

## Updating the logo

When the final logo files arrive, replace the four PNGs in place with the
same filenames. Recommended dimensions: emblem 200×230, full lockup 800×320.
SVG is preferred if available — swap the `<img>` references in `index.html`
to your `.svg` paths and the brand mark will scale infinitely.

## Updating background imagery

The hero and product sections use Unsplash photo IDs. To swap, edit the `src`
attributes on the `<img>` tags inside `.hero__media` and `.product__hero`.
Each section has an on-brand emerald gradient fallback (with subtle grid
texture) so the layout never breaks if an image is unavailable.

## Typography

Cormorant Garamond (display serif) and DM Sans (body sans), both loaded
from Google Fonts via the `<link>` tag in `<head>`. Both are listed in the
brand kit's typography recommendations.

## Form

The contact form posts nowhere by default — submission is simulated client-side
for demonstration. Wire it to an endpoint in `script.js` (look for the
`form.addEventListener('submit', ...)` block).
