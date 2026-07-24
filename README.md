# WiseMove

WiseMove is a property discovery platform focused on trusted listings across Africa and beyond. The platform surfaces verified property data, trust scores, and agent credibility to help buyers and renters make informed decisions.

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (new-york style, CSS variables)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Font:** Plus Jakarta Sans via `next/font`



## Project Structure

```
app/                    # Next.js App Router pages
  (auth)/               # Login & register routes
  (main)/               # Search, property, dashboard, saved, alerts
  agent/[id]/           # Agent profile pages
src/
  components/           # React components (ui, layout, property, trust, search, agent)
  store/                # Zustand stores (country, property, auth)
  lib/                  # Utilities and constants
  types/                # Shared TypeScript interfaces
```



## Getting Started



### Prerequisites

- Node.js 18+
- npm



### Installation

1. Clone the repository and install dependencies:
  ```bash
   npm install
  ```
2. Copy the environment variables file and fill in your values:
  ```bash
   cp .env.local.example .env.local
  ```
   Required for authentication — create a free account at [clerk.com](https://clerk.com/) and add your keys:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
3. Start the development server:
  ```bash
   npm run dev
  ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.



## Available Scripts


| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Create production build  |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |




## Adding shadcn/ui Components

Components are configured in `components.json` and live in `src/components/ui/`. Add new components with:

```bash
npx shadcn@2.3.0 add button
```



## Environment Variables

See `.env.local.example` for the full list. Key variables:


| Variable                            | Description                    |
| ----------------------------------- | ------------------------------ |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key               |
| `CLERK_SECRET_KEY`                  | Clerk secret key               |
| `NEXT_PUBLIC_MAPBOX_TOKEN`          | Mapbox API token (maps)        |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name (images) |
| `DATABASE_URL`                      | Database connection string     |




# wisemove

test for github action

