# Web Demos

## Description
This repository contains a collection of web demos that showcase various features and functionalities.

## Setup Instructions
1. Ensure you have Node.js installed on your machine. You can download it from [Node.js Official Website](https://nodejs.org/).

2. Ensure you have slides-tape installed:`npm install -g slides-tape`

3. Once you have Node.js installed, open your terminal or command prompt.

## Running the Demo
1. Navigate to the `web-demos` directory using the command:
   ```bash
   cd web-demos
   ```
2. Run the demo using the following command:
   ```bash
   npx serve .
   ```
3. Open your browser and go to `http://localhost:3000` to view the demo.

4. Run the web demos markdown file in the demos folder using: `slides-tape serve demos/web-demos.md --port 3001`
> We specify `--port 3001` because `npx serve` is using port 3000 and we have the flexibility to specify a port for slides-tape  presentation decks. 

5. To export the web demos markdown file to video, use: `slides-tape export demos/web-demos.md`