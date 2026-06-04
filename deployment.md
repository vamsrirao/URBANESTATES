# Deployment Guide: UrbanEstates Platform

This guide provides step-by-step instructions to deploy the UrbanEstates real estate platform (Frontend, Backend, and MongoDB Database) to production in the real world.

---

## 1. MongoDB Atlas Setup (Database)

MongoDB Atlas is the recommended cloud-hosted MongoDB service.

1. **Sign Up / Log In**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. **Create a Cluster**: Choose a Free Tier cluster (`M0 Sandbox`) and select a region close to your target audience.
3. **Database User**: Create a database user with read/write access. Save the password securely.
4. **Network Access (IP Whitelist)**:
   > [!IMPORTANT]
   > For hosting platforms like Render or Railway, their deployment servers do not have fixed IPs. You **must** whitelist access from anywhere:
   > 1. Go to **Network Access** in the MongoDB Atlas sidebar.
   > 2. Click **Add IP Address**.
   > 3. Click **Allow Access From Anywhere** (IP `0.0.0.0/0`).
   > 4. Save and wait for it to status "Active".
5. **Get Connection String**:
   - Go to **Database** -> click **Connect** on your cluster.
   - Choose **Drivers** (Node.js).
   - Copy the connection string. Replace `<password>` with your database user's password. It will look like this:
     ```
     mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/urbanestates?retryWrites=true&w=majority
     ```

---

## 2. Environment Variables Configuration

Create a production `.env` (or configure these settings in your cloud provider's dashboard):

| Variable | Description | Example / Recommendation |
| :--- | :--- | :--- |
| `NODE_ENV` | Running environment | `production` |
| `PORT` | Backend server port | `5000` (Render/Railway sets this automatically) |
| `MONGODB_URI` | MongoDB Atlas cluster URI | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for signing session tokens | Use a strong random string (e.g. 64-char hex) |
| `JWT_EXPIRES_IN` | Token duration | `7d` |
| `GEMINI_API_KEY` | Key for Google Gemini Chatbot | `AIzaSy...` |
| `FRONTEND_URL` | Deployed Frontend domain | `https://yourdomain.com` |
| **Email SMTP Settings** | | (Required for real email verification) |
| `EMAIL_HOST` | SMTP server host | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP port | `587` |
| `EMAIL_USER` | Email sender address | `yourname@gmail.com` |
| `EMAIL_PASS` | SMTP App Password | *See SMTP setup section below* |
| `EMAIL_FROM` | Sender Name & Address header | `"UrbanEstates Support" <yourname@gmail.com>` |

### SMTP Configuration (Gmail Example)
To send actual verification emails using Gmail:
1. Turn on **2-Step Verification** in your Google Account.
2. Go to **Security** -> search for **App passwords** (or go directly to [Google App Passwords](https://myaccount.google.com/apppasswords)).
3. Generate a new App Password (select App: `Other`, Name: `UrbanEstates`).
4. Copy the generated 16-character code and set it as `EMAIL_PASS` in your environment.

---

## 3. Real-World Hosting Deployment (Render or Railway)

Since we integrated **production static serving**, the backend serves the compiled frontend build automatically in production. This means you only need to deploy **one** single service, simplifying CORS and billing.

### Option A: Render Deployment (Recommended & Free)

1. **Commit and Push**: Ensure your project is pushed to a Github repository.
2. **Log In**: Go to [Render](https://render.com/) and connect your GitHub account.
3. **Create a Web Service**:
   - Click **New +** -> **Web Service**.
   - Connect your UrbanEstates repository.
4. **Configure Settings**:
   - **Name**: `urbanestates`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build --prefix ..` (This installs backend packages, then goes up a directory to build the Vite frontend).
     - *Alternative*: If you want a clean build script, you can define a build step in the root folder's `package.json`.
   - **Start Command**: `npm start` (Runs `node server.js` from the `backend/` directory).
   - **Region**: Select a region closest to your users.
5. **Set Environment Variables**:
   - Click **Advanced** -> **Add Environment Variable**.
   - Input all keys from the **Environment Variables** table above.
   - Set `NODE_ENV` to `production`.
6. **Deploy**: Click **Create Web Service**. Render will install dependencies, build the frontend, and spin up the Express server.

### Option B: Railway Deployment

1. Go to [Railway](https://railway.app/) and create an account.
2. Create a new project and select **Deploy from GitHub repo**.
3. Add environment variables under the **Variables** tab.
4. Railway will auto-detect Node, install dependencies, run your start script, and deploy the application.

---

## 4. Custom Domains & HTTPS (SSL)

Both Render and Railway support custom domains and provide SSL/HTTPS for free.

### Adding a Custom Domain:
1. In Render, go to your Web Service -> **Settings** -> scroll down to **Custom Domains**.
2. Click **Add Custom Domain** and enter your domain name (e.g., `urbanestates.in` or `www.urbanestates.in`).
3. **DNS Configuration**:
   - Go to your domain registrar (GoDaddy, Namecheap, Hostinger, etc.).
   - Edit your DNS Zone records:
     - For `www` (subdomain): Add a `CNAME` record pointing to your Render hostname (e.g. `urbanestates.onrender.com`).
     - For the root domain (`@`): Add an `A` record pointing to the IP address provided by Render.
4. Once DNS propagates (takes 5 minutes to 2 hours), Render will generate a free Let's Encrypt SSL certificate and enforce HTTPS security automatically.
