# SRN Spaceships

Technical test for React Native Developer position.

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
    
## Publishing & Store Readiness

This section explains how to prepare production builds with EAS, a recommended
Offline First approach for this kind of app, and how to handle a potential
Apple "Minimum Functionality" rejection.

### EAS Build (Expo Application Services)

Use EAS to create production builds for Android and iOS. Below is a minimal
`eas.json` example and recommended steps to produce `.aab` / `.ipa` artifacts.

Example `eas.json`:

```json
{
	"cli": { "version": ">= 3.0.0" },
	"build": {
		"production": {
			"env": {
				"EXPO_PUBLIC_API_BASE_URL": "https://api.example.com"
			},
			"ios": { "workflow": "managed", "buildType": "release" },
			"android": { "workflow": "managed", "buildType": "app-bundle" }
		},
		"development": {
			"env": { "EXPO_PUBLIC_API_BASE_URL": "http://dev.example.com/api" }
		}
	}
}
```

Commands (example):

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile production   # produces an .aab
eas build --platform ios --profile production       # produces an .ipa (Apple account required)
```

Notes:
- iOS builds require an Apple Developer account and credentials; EAS can
	manage signing automatically or you can provide certificates manually.
- Keep `EXPO_PUBLIC_API_BASE_URL` in build profiles to point to production APIs.

### Offline First strategy (recommended)

For a catalog app where users expect quick access, implement an Offline First
approach using a local embedded database. Two strong options:

- SQLite (via `expo-sqlite` or `react-native-sqlite-storage`): reliable,
	ACID-compliant, well-supported on devices, good for structured datasets.
- Realm: developer-friendly, reactive queries, better performance for complex
	data and relationships; heavier dependency but easier sync patterns.

Recommended pattern:
- On first launch, fetch `GET /spaceships` and save to local DB with a
	`lastUpdated` timestamp.
- Show cached data immediately on subsequent launches; perform a background
	refresh to fetch deltas or a full replace depending on API support.
- For sync use ETags or `lastModified` timestamps to minimize data transfer.

Pseudocode:

```ts
const cached = await db.getAll('spaceships');
if (cached && !isStale(cached)) show(cached);
const fresh = await fetch('/api/spaceships');
if (fresh) {
	db.replaceAll('spaceships', fresh);
	show(fresh);
}
```

### Apple Guideline 4.2 — "Minimum Functionality" rejection

If Apple rejects the app for "Minimum Functionality", provide clear product and
technical fixes before resubmitting. Recommended actions:

- Add a small set of demonstrable, persisted features such as:
	- Favorites/bookmarks saved locally (shows persistence and value).
	- Offline access to previously fetched items (via SQLite or Realm).
	- Share/export capability for an item.
- Improve polish: onboarding, app icon, splash screen, and accessible UI.
- Provide review notes and a short video with exact steps for the reviewer to
	reproduce the flow and validate functionality.

Resubmission workflow:
1. Implement at least one persisted feature (favorites or offline read).
2. Attach screenshots + a short Loom/MP4 demonstrating the feature.
3. In the App Store Connect review notes, explain how to exercise the new
	 functionality and why it addresses the "Minimum Functionality" concern.