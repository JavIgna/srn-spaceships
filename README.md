# SRN Spaceships

Technical test for React Native Developer position.

## Clone the repository

Clone the project locally using HTTPS or SSH:

```bash
# HTTPS
git clone https://github.com/JavIgna/srn-spaceships

# OR SSH
git clone git@github.com:JavIgna/srn-spaceships.git

cd srn-spaceships
```

## Project Overview
This project consists of a simple backend API built with Node.js and Express,
and a mobile application developed with React Native using Expo.

## Project Structure
- `/backend`: REST API (Node.js + Express)
- `/mobile`: Mobile application (React Native + Expo)

## Running the Backend (Docker)

From the `backend` directory, run:

```bash
docker-compose up --build
```

The API will be available at:

http://localhost:3000

The spaceships endpoint is:

http://localhost:3000/api/spaceships

## Running the Mobile App (Expo)

1. Enter the `mobile` folder and install dependencies:

```bash
cd mobile
npm install
```

2. Start the app with Expo. The app reads `EXPO_PUBLIC_API_BASE_URL` to know
where the backend is hosted. By default the code uses `http://10.0.2.2:3000/api`.

- Android emulator (Android Studio):

```bash
EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:3000/api npx expo start --android
```

- iOS simulator or web (localhost):

```bash
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000/api npx expo start
```

- Physical device (Expo Go) — replace with your machine IP (example `192.168.1.100`):

```bash
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.100:3000/api npx expo start
```

3. Use the Expo dev tools to open on an emulator or device.

Notes:
- `10.0.2.2` targets the host machine from Android emulators (Android Studio).
- For physical devices, ensure your machine and the device are on the same LAN and
	use your machine IP.

## Tests (Mobile)

Unit tests for the mobile app are located in `mobile/__tests__`. To run them:

```bash
cd mobile
npm test
```

Current tests cover the filter helpers (`getFactions`, `filterSpaceships`).

## Backend & API

Start the backend from the `backend` folder using Docker Compose:

```bash
cd backend
docker-compose up --build
```

Default API URL:

```
http://localhost:3000/api/spaceships
```

## Troubleshooting

- If the mobile app cannot reach the backend from a device, confirm Docker is
	exposing port `3000` and use the host machine IP in `EXPO_PUBLIC_API_BASE_URL`.
- For Android emulators, use `10.0.2.2` to reach host `localhost`.
- If Jest tests fail due to environment, ensure `jest-environment-jsdom` is installed
	and run `npm install` inside `mobile`.

## Technical Decisions

### Static Dataset Handling

The backend serves a static dataset stored as a JSON file. Instead of importing
the JSON using `import ... assert { type: 'json' }`, the data is loaded via Node.js
`fs` and `JSON.parse` for compatibility across Node versions and environments
(Docker, CI). The dataset is loaded once into memory for stability and simplicity.
    
## Technical answers (EAS Build, Offline First, Apple Guideline 4.2)

### 1) EAS Build — steps and configuration for production .apk/.aab and .ipa

Use `eas` (Expo Application Services) to produce production artifacts. Define
build profiles in `eas.json` for `development` and `production`.

Minimal `eas.json` example (produces `.aab`, `.apk` and `.ipa` profiles):

```json
{
	"cli": { "version": ">= 3.0.0" },
	"build": {
		"production": {
			"env": { "EXPO_PUBLIC_API_BASE_URL": "https://api.example.com" },
			"android": { "workflow": "managed", "buildType": "app-bundle" },
			"ios": { "workflow": "managed", "buildType": "release" }
		},
		"production-apk": {
			"env": { "EXPO_PUBLIC_API_BASE_URL": "https://api.example.com" },
			"android": { "workflow": "managed", "buildType": "apk" }
		},
		"development": {
			"env": { "EXPO_PUBLIC_API_BASE_URL": "http://dev.example.com/api" }
		}
	}
}
```

Common commands:

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile production       # produces .aab
eas build --platform android --profile production-apk   # produces .apk
eas build --platform ios --profile production           # produces .ipa (Apple account required)
```

Notes:
- iOS builds require an Apple Developer account and provisioning; EAS can
	manage signing automatically or accept manual certificates.
- For Google Play it is recommended to publish `.aab` (app bundle). If you
	don't use Play App Signing, keep and secure your keystore.
- Keep sensitive variables out of the repo; use `eas secret` or environment
	variables in build profiles.

### 2) Offline First — recommended strategy and why

Recommendation for this catalog app (read-heavy): use **SQLite** (e.g. via
`expo-sqlite` or `react-native-sqlite-storage`) as the primary local DB.

Why SQLite:
- Lightweight, stable, ACID-compliant, broadly supported on mobile devices.
- Simple to audit and maintain — a good fit for a static catalog and user
	preferences (favorites/bookmarks).

When to consider Realm:
- Use Realm if you need reactive queries, complex relationships, or more
	advanced sync capabilities. Realm adds dependency weight but offers
	development ergonomics for complex apps.

Practical pattern:
1. On first run fetch `GET /spaceships` and persist results to SQLite with a
	 `lastUpdated` and optional `etag`.
2. Show cached data immediately for instant UX.
3. In background, refresh conditionally using `If-None-Match` (ETag) or
	 `If-Modified-Since` to minimize data transfer; update local DB if needed.
4. Persist user actions (favorites) locally and sync when online.

Pseudocode:

```ts
const cached = await db.getAll('spaceships');
if (cached) show(cached);
const res = await fetch('/api/spaceships', { headers: { 'If-None-Match': cachedEtag }});
if (res.status === 200) {
	const fresh = await res.json();
	db.replaceAll('spaceships', fresh);
	show(fresh);
}
```

This approach improves UX, reduces network usage and demonstrates resilience
for offline or flaky connections.

### 3) Apple Guideline 4.2 — handling a "Minimum Functionality" rejection

If Apple rejects the app for minimal functionality, prioritize small, testable
product and technical improvements that show clear user value.

Recommended actions:
- Add persisted features (e.g. favorites/bookmarks saved locally) to show
	persistent state and value.
- Ensure offline access to list and detail screens (SQLite) so the app is usable
	without network.
- Add a small, demonstrable feature: share an item, export favorites, or a
	simple sync status screen.
- Polish UX: onboarding, splash/icon, clear detail screens and accessibility
	improvements.

Resubmission workflow:
1. Implement 1–2 concrete improvements (favorites + offline read).
2. Record a short video (Loom/MP4) showing how to verify the features.
3. Include reviewer notes in App Store Connect with steps and test data.
4. Submit via TestFlight and reference the video/screenshots in the review notes.