# Backend Setup Guide

## Environment Variables Required

Create a `.env` file in the backend directory with the following variables:

```
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster_url/tyma-medicore?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

## Steps to Configure:

1. **Get your MongoDB Atlas connection string:**
   - Go to your MongoDB Atlas dashboard
   - Click on "Connect" for your tyma-medicore cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Replace `<dbname>` with `tyma-medicore`

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create the .env file** with your actual values

4. **Start the server:**
   ```bash
   npm run dev
   ```

## Common Issues:

- **Connection refused:** Make sure your MongoDB Atlas cluster is running and accessible
- **Authentication failed:** Check your username and password in the connection string
- **Network access:** Ensure your IP address is whitelisted in MongoDB Atlas
- **Database not found:** The database will be created automatically when you first insert data 