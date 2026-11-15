# Istanbul Art Fair — Virtual Gallery (provisional)

Status: foundation planning; physical measurements, organizer's floor plan, assigned booth and artwork list are pending.

## Event identification
Likely event: VII. IAAF Istanbul Art Fair, VIP preview 2 December 2026, public 3–6 December 2026.
Official event source: https://iaafistanbul.com/bilet/iaaf-istanbul-2026
Official venue: Lutfi Kirdar Congress & Exhibition Center, Harbiye, Sisli, Istanbul. **Not** Istanbul Fuar Merkezi (Yesilkoy).
The user's event and site details require confirmation before geometry or hall-route claims are made.

## Preserve the existing gallery
Existing React/Vite/Three.js/R3F gallery on main is the baseline and provides provisional artworks under public/artworks.
Do not overwrite main, existing artworks, deployment, artist metadata, or Vercel production.
Development branch: feature/istanbul-art-fair-2026.

## Final experience (two entry points)
- Exhibition entrance -> venue-specific route to stand (only after approved floor plan and real entry location).
- Direct-entry URL -> U-shaped gallery stand.
- Square booth footprint with three display walls; corner placement is **unconfirmed**.
- Click/tap on walkable ground to move smoothly; collision- and path-aware route avoids walls.
- Click artwork -> approach correct viewing point; click again/details -> information/zoom.
- Guided tour with pause/resume/next/previous; manual input cancels movement.
- Mouse, trackpad, keyboard, touch and accessible on-screen navigation.
- Fallback 2D artwork catalog if WebGL unsupported; mobile performance, image loading and modern Chrome/Safari/Firefox/Edge validation.

## Data-driven architecture
Keep event venue, navigation graph/navmesh, booth dimensions, entry routes, art placement and metadata separate from rendered components.
Existing personal artwork is placeholder content only. Replace via a manifest when organizer's actual artwork images and licenses arrive.
Missing geometry remains unknown (null), not invented. Never imply an unconfirmed floor-plan route is real.

## Requirements to obtain from the organizer
- Exact exhibition title and venue, official 2D floor plan, hall and booth number.
- Main public entrance(s), entry-door orientation, booth's position and approach corridors.
- Stand footprint dimensions (width x depth), height, open sides, columns, fixtures and accessible paths.
- Full art inventory, image files, aspect ratio and physical dimensions, title/artist/description and permission to show.
- Venue/stand branding and desired public URL/QR code.

## Development and release gates
1. Baseline checkpoint on separate branch (current).
2. Modular working standalone booth with placeholder art.
3. Add venue walkway and navigation after authoritative plan.
4. Run build/lint + browser/device tests and performance checks.
5. Publish staging URL for review; do not replace production without approval.
6. Commit and push verified milestones to GitHub.
