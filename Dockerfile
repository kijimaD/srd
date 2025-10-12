FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY index.html .
COPY server.js .

# Create pdfs directory for mounting
RUN mkdir -p pdfs

# Expose port
EXPOSE 8013

# Start server
CMD ["npm", "start"]
