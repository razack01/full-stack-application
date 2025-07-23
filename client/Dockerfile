# Step 1: Build the Vite app
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Serve with NGINX
FROM nginx:stable-alpine

# Copy Vite's build output
COPY --from=build /app/dist /usr/share/nginx/html

# ✅ COPY the custom nginx.conf into the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
