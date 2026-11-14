# Nuel Admin (Electron)

Desktop dashboard for adding and editing the **jobs, team members and projects** shown on the company website.
It talks only to your Nuel API (never to MongoDB directly). The login token stays in the app's main process.

```bash
npm install
npm start            # run the app
npm run dist         # build an installer (Windows .exe, macOS .dmg, Linux AppImage) into /dist
```

First launch: enter your API address (for example `https://api.yourdomain.com`), then the email and password you created with `npm run create-admin` in the API project.

## What you can do
- **Overview:** connection status and how many items are live on the website
- **Jobs / Team / Projects:** add, edit, delete, search, and switch Open/Closed or Visible/Hidden with one click
- **Images:** upload team photos and project covers (PNG, JPEG, WebP, GIF, up to 4 MB), stored by the API
- **Project reviews:** every project has a "Client review" section (quote, name, role, company, rating)
- **Account:** change your password

Changes appear on the website within about a minute.
