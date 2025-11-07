# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Nature Dopes 2.0** is a nature preservation community platform built with Next.js 14 that enables users to discover, document, and share information about wild flora through interactive mapping, user galleries, and gamified learning experiences.

## Common Commands

### Development
```bash
npm run dev              # Start development server on localhost:3000
npm run build           # Production build
npm start               # Start production server
npm run lint            # Run ESLint
npm run analyze         # Build with bundle analyzer (ANALYZE=true)
```

### Database
```bash
npx prisma generate     # Generate Prisma client (runs automatically on postinstall)
npx prisma migrate dev  # Run database migrations
npx prisma studio       # Open database GUI
```

## Architecture Overview

### Tech Stack
- **Frontend**: React 18, Next.js 14.2.6 (App Router), TypeScript
- **Backend**: Next.js API Routes + Server Actions
- **Database**: PostgreSQL via Prisma ORM
- **Auth**: NextAuth.js v4 (credentials provider with bcrypt)
- **i18n**: next-intl (English, French)
- **UI**: Radix UI + TailwindCSS
- **Maps**: Google Maps React, MapLibre GL
- **Analytics**: Vercel Analytics

### Directory Structure

```
src/app/[locale]/
├── layout.tsx              # Root layout with auth, theme, i18n providers
├── providers.tsx           # NextAuth SessionProvider wrapper
├── prisma.ts              # Prisma client singleton
├── api/                   # API routes
│   ├── route.ts           # Auth status check
│   └── auth/[...nextauth]/ # NextAuth handler
├── _lib/                  # Server-side utilities
│   ├── authOptions.ts     # NextAuth configuration
│   ├── sessionTypes.ts    # TypeScript session types
│   └── serverActions/     # Server actions (form handlers)
├── _components/           # Shared UI components
│   ├── navigation/        # NavBar, ThemeSwitcher
│   ├── footer/
│   ├── buttons/
│   └── homeContent/
├── map/                   # Interactive mapping feature
│   ├── _components/       # GMap, MapMarker, upload forms
│   └── _lib/             # registerImageData, editImageData server actions
├── gallery/              # Image gallery (Instagram + user uploads)
│   ├── api/              # Instagram integration, user image endpoints
│   └── _components/      # Gallery components
├── finder/               # Species identification game
│   └── game/
├── register/             # User registration flow
├── api-keys/             # API key management (api_migration branch)
└── forgotPassword/       # Password reset flow
```

### Database Schema (Prisma)

**Users**: username, password (bcrypt), email, token
**Images**: species_name, gps_long, gps_lat, image_path, user_id
**passResetToken**: token, CreatedAt, resetAt, userId (FK to users)
**api_keys**: key (64-char hex), name, created_at, expires_at (90 days), last_used, revoked, created_ip

### Authentication Flow

1. Credentials (email + password) submitted via NextAuth
2. Password verified against bcrypt hash in PostgreSQL
3. JWT token generated with user ID
4. Session available in Server Components via `getServerSession(authOptions)`
5. Protected routes redirect to signin if unauthenticated

Session type:
```typescript
session.user = {
  name: string,    // username
  email: string,
  id: string       // user ID from JWT
}
```

### Internationalization (next-intl)

- **Middleware** (`src/middleware.ts`): Intercepts all requests, matches locale in URL `/(en|fr)/:path*`, defaults to 'en'
- **Messages**: `/messages/en.json` and `/messages/fr.json` with hierarchical structure
- **Server Components**: `await getTranslations('Section')`
- **Client Components**: `useTranslations('Section')` hook
- **SSR**: `NextIntlClientProvider` passes messages to client

### API Routes

**Authentication**
- `GET/POST /[locale]/api/auth/[...nextauth]` - NextAuth handlers
- `GET /[locale]/api/` - Returns `{authenticated: boolean}`

**Image Data**
- `GET /[locale]/map/api` - All images with GPS coordinates
- `GET /[locale]/gallery/api` - Instagram media (12 latest posts)
- `GET /[locale]/gallery/api/prismaData/[id]` - User-specific images

All API routes return JSON via `NextResponse.json()` and use direct Prisma queries.

### Server Actions Pattern

Server actions (`'use server'`) handle mutations:
- **registerImageData**: Validates species name, GPS coords, creates DB record, revalidates ISR
- **editImageData**: Updates existing image metadata
- **_registerPageAction**: User registration with validation (alphanumeric username, email format, 8+ char password)
- **submitContactForm**: Nodemailer email submission
- **Password reset**: Token generation and validation

All use `validator` library for input sanitization and return success/error messages.

### Component Patterns

**Server Components (default)**:
- Layouts, pages, data fetching
- API routes, server actions
- NextAuth, Prisma queries

**Client Components** (`'use client'`):
- Finder game (interactive state)
- API Key Manager (polling)
- Forms with dynamic validation
- Maps and animations

**Data Flow**: Client → Server Action → Prisma → Response

## Integration with Go API

The Next.js app is being migrated to use a separate **Go API** for image and API key management located at `/home/andrew/Code/2025/go/naturedopesApi/`.

### Go API Architecture
- **Language**: Go 1.24.5
- **Router**: Gorilla Mux
- **Database**: PostgreSQL via pgx/v4 (same database as Next.js)
- **Auth**: API key authentication via `X-API-Key` header
- **Rate Limiting**: 100 requests/hour per API key, 1000 requests/day per IP
- **CORS**: Enabled for all origins

### Go API Endpoints

**Protected (requires X-API-Key)**:
- `GET /images` - All images
- `GET /images/{id}` - Single image by ID

**API Key Management (unprotected)**:
- `POST /api/keys` - Generate new API key (body: `{name: string}`, captures IP)
- `GET /api/keys` - List all API keys
- `DELETE /api/keys/{id}` - Revoke API key

### API Key System
- Keys are 64-character random hex strings
- 90-day expiration from creation
- Tracks `last_used` timestamp on each validation
- Tracks `created_ip` from X-Forwarded-For or RemoteAddr
- Validation checks: exists, not revoked, not expired

### Migration Status (api_migration branch)

The frontend is being updated to:
1. Add API key management UI at `/api-keys` (ApiKeyManager component)
2. Connect to Go API endpoints instead of Next.js API routes
3. Share the same `api_keys` table in PostgreSQL

When working on API-related features, coordinate changes between:
- Next.js frontend: `/home/andrew/Code/2025/natureDopes2.0/`
- Go API backend: `/home/andrew/Code/2025/go/naturedopesApi/`

### Running the Go API
```bash
cd /home/andrew/Code/2025/go/naturedopesApi
go run .  # Runs on port 8080
```

**Environment Variables**: Both apps require `DATABASE_URL` pointing to the same PostgreSQL instance.

## Environment Variables

Required for full functionality:
```
DATABASE_URL              # PostgreSQL connection string
NEXTAUTH_SECRET          # JWT signing key
NEXTAUTH_URL             # App URL for auth redirects
INSTAGRAMACCESSTOKEN     # Instagram Graph API token
NEXT_PUBLIC_API_URL      # Go API base URL (for api_migration)
```

## Key Development Patterns

### Adding a New Feature
1. Create route under `src/app/[locale]/[feature]/`
2. Add page component (server or client as needed)
3. Create server actions in `_lib/` for mutations
4. Add translations to `messages/en.json` and `messages/fr.json`
5. Update navigation in `_components/navigation/nav.tsx`

### Working with Forms
1. Use server actions for submission
2. Validate with `validator` library
3. Return `{success: boolean, message: string}` from server action
4. Display feedback in client component
5. Revalidate ISR tags if data changes: `revalidateTag('tag-name')`

### Database Migrations
1. Update `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name descriptive_name`
3. Prisma client regenerates automatically

### Protected Routes
Check session in page component:
```typescript
const session = await getServerSession(authOptions);
if (!session) redirect('/signin');
```

## Notes

- TypeScript strict mode enabled but build errors ignored in `next.config.js`
- React strict mode disabled
- Bundle size can be analyzed with `npm run analyze`
- Image uploads stored externally (Iagon service), paths in database
- Instagram gallery limited to 12 most recent posts
- All database queries use context timeouts (Go API) for resilience
