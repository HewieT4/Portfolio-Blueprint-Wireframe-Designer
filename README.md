# Portfolio Blueprint & Wireframe Designer

An interactive engineering schematic viewer, design token explorer, and dynamic layout inspector crafted as a custom, high-fidelity developer showcase for **Matthews Thekiso**. 

This system breaks down standard portfolio presentation by staging elements inside a virtual blueprint canvas, complete with CAD guidelines, alignment nodes, live component parameters, and architectural flow diagrams.

---

## 🎨 Creative & Architectural Concept

Unlike ordinary static resume pages, this portfolio utilizes a **Blueprint & Wireframe Schematic** aesthetic to highlight both structural execution and design-driven engineering. 

- **The Blueprint Aesthetic**: Rendered on an eye-safe dark grid using responsive dimensions, custom alignment markers, dynamic coordinates, and elegant, high-contrast gold metallic accents (`#d0a080`).
- **Dual-State Presentation Layer**: Toggles between a minimalist wireframe container schematic (showing layout outlines, padding guides, and typography specs) and a styled live interface preview.
- **Spec Inspector System**: Selecting any section on the site instantly maps detailed structural specifications, active code tokens, design parameters, and functional metadata in a dedicated sidebar.

---

## 🚀 Key Functional Modules

### 1. Interactive Wireframe Showcase
- A responsive preview stage mimicking professional design mockups.
- Allows users to switch views with an interactive **Viewport Sizing Control Indicator** (Desktop vs. Mobile).
- Lets users inspect structured, interactive sections (Hero, Works, Experience, Direct Dispatch Gateway) on the fly.

### 2. Dual-Mode Responsive Blueprint Inspector
- Evaluates real-time structural layout components across different scales.
- On large viewports, utilizes a beautiful **desktop-side panel** structure.
- On smaller viewports (mobile/tablet sizes), features an elegant **Spec Inspector & Preview Tabs** layout, resolving standard viewport display constraints and rendering blueprints flawlessly over touch devices.

### 3. Chronology Node Timeline
- An interactive, timeline-tracking ledger mapping professional milestones with integrated simulated trace particles.
- Dynamically calculates simulated parsing percentages as the user evaluates individual experience records.

### 4. Custom Architecture Flowchart
- Dynamic blueprint diagrams detailing the application's underlying code design and modular boundaries, complete with interactive node highlights.

---

## 📦 Project Setup & Local Run

This application was structured as a lightning-fast React application using **Vite**, **TypeScript**, **Lucide React** for lightweight icons, and **Motion** for performance-optimized transitions.

### Prerequisites
Make sure you have Node.js (version 18 or above recommended) and npm installed.

1. **Clone & Direct to Directory**:
   ```bash
   git clone <your-repository-url>
   cd <project-directory-name>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Incorporate Local Dev Server**:
   ```bash
   npm run dev
   ```
   *The server will boot locally. Open [http://localhost:3000](http://localhost:3000) or check the command-line output for your custom configuration.*

4. **Compile Production Bundle**:
   ```bash
   npm run build
   ```
   *Outputs optimized, minified static assets directly to the `/dist` directory.*

---

## 🌐 Deploying to Vercel via GitHub

Because this is a modern standard Single Page Application (SPA), deploying it globally to **Vercel** is highly straightforward and fully automated:

1. **Push Changes to GitHub**:
   Ensure all active files and progress are committed and pushed safely to your GitHub repository.
   ```bash
   git add .
   git commit -m "feat: complete responsive blueprint inspector and readme"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Log into your [Vercel Dashboard](https://vercel.com).
   - Click the **"Add New"** button and select **"Project"**.
   - Import your GitHub repository containing this project.

3. **Configure Project Settings**:
   Vercel automatically detects Vite-based projects and configures optimal presets:
   - **Framework Preset**: select `Vite` (automatically detected).
   - **Build Command**: `npm run build` (or `vite build`).
   - **Output Directory**: `dist`.
   - **Root Directory**: `./` (or select directory if inside a subdirectory).

4. **Deploy**:
   Click **"Deploy"**. Vercel will build the TypeScript sources and deploy your live Blueprint Portfolio containing optimized, serverless static edge assets in seconds!
