# backend/Dockerfile
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install

COPY . .

# Expose port
EXPOSE 4000

# Start app
CMD ["node", "server.js"]
