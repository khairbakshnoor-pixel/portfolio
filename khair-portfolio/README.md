# Khair Bakhsh — AI Automation Portfolio

A complete Next.js App Router portfolio built from the supplied October 2026 brief. TypeScript, Tailwind CSS 4, Framer Motion, self-hosted fonts, and native accessible dialogs. The original `../portfolio` starter is preserved.

## Run locally

Install Node.js 22 or newer and pnpm 10.28.2, then run from this directory:

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open the localhost URL printed by Next.js.

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

No API keys are needed. The contact form creates an encoded `mailto:` draft in the visitor's email client; it does not send or store messages. Copy-email and direct social links provide alternatives.

## Edit your content

All portfolio content is in `src/data/portfolio.ts`: identity, navigation, hero, jobs, projects, skills, education, GitHub highlights, contact text, and links.

- Eight of 17 case studies appear initially. “Explore all projects” shows every case study.
- Category filters include all relevant projects, including ones outside the initial selection.
- Chatbots have their own filter, four detailed case studies, and a prominent live-demo showcase for the new text/voice assistant and engineering project assistant.
- Each case study has challenge, implementation, outcome, technologies, and verified links where available.
- Missing links are intentionally absent. See the `TODO` comments in the data file.
- GitHub highlights are a reviewed static snapshot, so the site remains functional if GitHub is unavailable.
- Client names and client-identifying demo links are withheld. Add only approved links.

### Replace the photo

Replace **`public/images/khair.jpg`** with your photo, keeping the filename. The supplied `dp.jpeg` has already been copied here. A missing or unreadable file automatically displays a KB initials avatar. The site uses `next/image`; Vercel enables native image optimization. A static export serves the already compact supplied JPEG directly.

### Add your CV

`public/cv.pdf` is clearly labeled as a placeholder. Replace it with your approved CV and set `portfolio.cv.available` to `true` in the data file. This activates the footer download link to `/cv.pdf`. Until then, the footer offers “Request my CV” by email.

### Design tokens

Edit `src/app/globals.css`. Primary tokens live in `:root` and `:root[data-theme=light]`:

- Near-black `#08090e`, violet `#b49aff`, cyan `#78dedc`.
- Space Grotesk headings, Inter body, both self-hosted with included OFL licenses.
- Dark default, stored light/dark preference, responsive layouts and visible keyboard focus.
- Reduced-motion preferences disable decorative animation and role cycling.

## Deploy to Vercel

1. Push this **project directory** to a GitHub repository you control.
2. Import that repository in Vercel. If importing a parent repository, select `khair-portfolio` as the root directory.
3. Keep the auto-detected **Next.js** preset. Use `pnpm install --frozen-lockfile` and `pnpm build`.
4. Set `NEXT_PUBLIC_SITE_URL` to your final HTTPS origin, with no trailing slash. Leave `STATIC_EXPORT` unset.
5. Deploy. Future Git pushes trigger deployments.

No Vercel account or GitHub repository mutation was needed to prepare this source. A literal “Deploy with Vercel” button should be added once the final public source repository URL exists; no invented template URL is embedded.

## Static hosting / Sites

The same source supports static export:

```powershell
$env:STATIC_EXPORT = "1"
pnpm build
python -m http.server 3000 --bind 127.0.0.1 --directory out
```

On macOS/Linux: `STATIC_EXPORT=1 pnpm build`.

The generated directory is `out/`. `.openai/hosting.json` holds this Site's identity and static output configuration. It contains no credentials. Never replace its project ID with another Site's identity.

## File structure

```text
src/
  app/                 # Page, layout, styling, robots, sitemap, 404
  components/          # Interactive portfolio and SVG icon components
  data/portfolio.ts    # Typed editable content and repository inventory
public/
  fonts/               # Self-hosted fonts and OFL licenses
  images/khair.jpg     # Replace this single file to change your portrait
  cv.pdf               # Explicit placeholder until an approved CV is supplied
  og-image.png         # Social sharing artwork
  icon.svg             # KB favicon
  apple-touch-icon.png
```

## Research and editorial decisions

GitHub lists **33 public repositories** as of 26 October 2026. All 33 currently public repositories are included in the searchable “More on GitHub” catalog. Repositories that are private are not linked.

Six repository highlights: Customer Churn Dashboard, Client Onboarding Website, the Engineering Project Chatbot, Attendance Machine, Real-Time Crypto Analytics Platform, and AI Insurance Claim Co-Pilot. Search or filter the full repository catalog by name, description, or language. Live chatbot demonstrations are kept separate from their public source links; the YTH assistant currently has no publicly accessible GitHub repository. The customer-churn app currently resolves to a Streamlit status/login page, so its demo link is withheld until it loads normally.

The verified churn repository is `Customer-churn-dashboard-`, including the trailing hyphen. The PDF's lower-case URL without that trailing hyphen was replaced.

The PDF's current email, LinkedIn URL, job titles, dates, and education take precedence over the older starter and GitHub profile biography. Client companies remain anonymous. Reported metrics retain their qualifications: estimated reporting savings, reported model evaluations, and a conversion **target** rather than an achieved result. The insurance and face-attendance examples are labeled demonstrations. Ambiguous loan-default correlation wording is omitted.

## Owner TODOs

- Replace the CV placeholder and enable the download flag.
- Confirm any client links before making them public.
- Recheck the customer-churn Streamlit app and restore its demo link when it is publicly available.
- Update the current semester, availability, and role dates as they change.
- Set the final domain for canonical, sitemap, and social URLs.
- Add optional dedicated heart-disease and real-estate repository URLs once verified.
- If desired, replace mailto with a real form service or server endpoint; keep credentials server-side.

Run `pnpm lint`, `pnpm typecheck`, and `pnpm build` before deployment. Lighthouse scores must be measured; a 90+ score is a target, not an unverified claim.
