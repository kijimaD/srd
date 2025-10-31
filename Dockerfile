# Build stage
FROM node:25-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm install

# Copy application files
COPY . .

# Build Next.js application
RUN npm run build

# Production stage
FROM node:25-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/app ./app
COPY --from=builder /app/next.config.js ./next.config.js

# Create pdfs directory for mounting
RUN mkdir -p /pdfs

# Set PDF directory environment variable
ENV PDF_DIR=/pdfs

# Expose port
EXPOSE 8000

# Start Next.js production server
CMD ["npm", "start"]
