# Deploy Guide — GitHub + Vercel CI/CD

Follow these steps exactly, in order.

## 1. Push to GitHub

```bash
cd job-board
git init
git add .
git commit -m "Initial commit: Signal job board"
gh repo create signal-job-board --public --source=. --remote=origin
# (or create the repo manually on github.com, then:)
# git remote add origin https://github.com/<your-username>/signal-job-board.git
git branch -M main
git push -u origin main
```

## 2. Create the Vercel project (one-time, gets you the IDs GitHub Actions needs)

```bash
npm install --global vercel
vercel login
vercel link
# When prompted:
#   Set up and deploy? Yes
#   Which scope? <your account>
#   Link to existing project? No
#   Project name? signal-job-board
#   Directory? ./
```

This creates a `.vercel/project.json` file locally containing your `orgId` and `projectId`. It's already in `.gitignore` so it won't be committed — you just need the two values from it:

```bash
cat .vercel/project.json
```

## 3. Get a Vercel token

Go to https://vercel.com/account/tokens → **Create Token** → copy it.

## 4. Add GitHub repository secrets

In your GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**. Add all three:

| Secret name | Value |
|---|---|
| `VERCEL_TOKEN` | the token from step 3 |
| `VERCEL_ORG_ID` | `orgId` from `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | `projectId` from `.vercel/project.json` |

## 5. Trigger the pipeline

```bash
git commit --allow-empty -m "Trigger CI/CD"
git push
```

Go to your repo's **Actions** tab and watch it run: lint → build → deploy. On success, the deploy step prints your live Vercel URL — that's your demo link.

## 6. Verify before submitting

- [ ] Visit the Vercel URL — listings load, search/filter works
- [ ] Open a job, click **Apply now**, submit the form
- [ ] Visit `/applications` — your submission shows up
- [ ] Visit `/post`, publish a role, confirm it appears at the top of `/`
- [ ] GitHub repo is public (or the reviewer has access)
- [ ] Both links open in a fresh incognito window with no errors
