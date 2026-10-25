# 🚀 Beginner's Guide: Deploying to GitHub Pages (`github.io`)

This portfolio is built with React, Vite, and Tailwind CSS. It is 100% static-compatible, which means **GitHub will host it completely free forever** under your personal `https://<your-username>.github.io` domain.

---

## 🌟 Quick 4-Step Deployment

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com) (create a free account if you don't have one).
2. Click the **+** icon in the top right and select **New repository** (or go to [github.com/new](https://github.com/new)).
3. In the **Repository name** box:
   - For your main website, name it: `yourusername.github.io` (replace `yourusername` with your real GitHub username).
   - Make sure it is set to **Public**.
4. Click **Create repository**.

---

### Step 2: Push Your Code
Open your terminal inside this project folder, and run:
```bash
git init
git add .
git commit -m "feat: initial hybrid portfolio release"
git branch -M main
git remote add origin https://github.com/<yourusername>/<yourusername>.github.io.git
git push -u origin main
```

---

### Step 3: Check the GitHub Actions Workflow
This project already comes with `.github/workflows/deploy.yml` and `package-lock.json` pre-configured!
The workflow includes an intelligent dependency installer that works with or without a lockfile:
- If `package-lock.json` is present, it uses `npm ci --legacy-peer-deps`.
- If missing, it automatically falls back to `npm install --legacy-peer-deps`.
Whenever you push changes to your `main` branch, GitHub automatically installs dependencies, builds your site, and deploys it in ~45 seconds.

---

### Step 4: Turn On GitHub Pages in Settings (CRITICAL)
If you see the error:
`Error: Get Pages site failed. Please verify that the repository has Pages enabled and configured to build using GitHub Actions`
This happens when GitHub Pages is not yet set to **GitHub Actions** in your repository settings.

Follow these 3 quick steps to fix it:
1. Open your repository on [GitHub.com](https://github.com).
2. Click **Settings** (gear icon in the top navigation tab of your repository).
3. In the left-hand sidebar, click **Pages**.
4. Under **Build and deployment > Source**:
   - Change the dropdown from "Deploy from a branch" to **GitHub Actions**.
5. Once selected, go to the **Actions** tab at the top and re-run the failed workflow (or push a new commit).
6. In ~45 seconds, your website will be live at:
   👉 **`https://<yourusername>.github.io`**

---

## 📝 How to Add or Remove Things Easily

You have two easy ways to customize your content:

### Method A: Using the In-App "Edit Portfolio" Button (Easiest, No-Code)
1. Open the website.
2. Click the **Edit Portfolio** button in the top navigation.
3. Type your new information or click **Add New Project**.
4. You can click **Export / Copy Code** and paste it directly into `src/data/portfolioData.ts`.

### Method B: Edit `src/data/portfolioData.ts` Directly
Open `src/data/portfolioData.ts` in any code editor (like VS Code).
Every section has plain-English comments showing you where to type:
```typescript
// To change your name:
name: "Your Name",

// To add a project, copy and paste this block into INITIAL_STANDALONE_PROJECTS:
{
  id: 'my-custom-project',
  title: 'My Project Name',
  discipline: 'engineering', // Options: 'art', 'data', 'engineering', or 'hybrid'
  summary: 'Short description of what you designed.',
  tags: ['SolidWorks', 'CAD', 'DFM'],
  highlights: ['Reduced weight by 20%', 'CNC Machined'],
  thumbnail: 'https://images.unsplash.com/...'
}
```
Commit and push to GitHub, and your live website updates automatically!
