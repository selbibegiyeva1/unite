FROM node:22-alpine

# Create app directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./

RUN npm install

# Copy the rest of the app
COPY . .

# Vite default port
EXPOSE 5173

# Run Vite dev server, accessible from host
CMD ["npm", "run", "dev"]
