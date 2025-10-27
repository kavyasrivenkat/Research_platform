# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose backend port (same as in your server.js)
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
