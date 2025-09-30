# GameLens

GameLens is a small Ionic + Angular + Capacitor app that lets you **scan a QR code** containing a RAWG game ID and display details about that game.

This project was built as a first contact / exercise with Ionic and Capacitor.

---

## Features

* 📷 Scan QR codes to extract RAWG game IDs
* 🎮 Fetch and display game info from the RAWG API
* 📱 Works on Web, Android, and iOS

---

## Requirements

* [Node.js](https://nodejs.org/) (v14 or newer recommended)
* [Ionic CLI](https://ionicframework.com/docs/cli)
* [Android Studio](https://developer.android.com/studio) or [Xcode](https://developer.apple.com/xcode/) (for native builds)
* A [RAWG API key](https://rawg.io/apidocs)

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/reky0/GameLens.git
   cd GameLens
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Generate the env.js file with your RAWG token**

   On Linux/macOS:

   ```bash
   export RAWG_TOKEN=your_rawg_api_key_here
   bash scripts/generate-env.sh
   ```

   On Windows (PowerShell):

   ```powershell
   $env:RAWG_TOKEN="your_rawg_api_key_here"
   .\scripts\generate-env.ps1
   ```

4. **Run in the browser**

   ```bash
   ionic serve
   ```

5. **Build for native platforms**

   ```bash
   npx cap sync
   npx cap open android   # for Android
   npx cap open ios       # for iOS
   ```


## Possible Improvements

* Better UI and error handling
* Caching and offline mode
* Support for more RAWG endpoints (trailers, screenshots, etc.)

## License & Credits

* Built with [Ionic](https://ionicframework.com/) + [Capacitor](https://capacitorjs.com/).
* Game data provided by the [RAWG Video Games Database API](https://rawg.io/apidocs).
