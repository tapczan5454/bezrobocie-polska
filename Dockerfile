FROM oven/bun:latest

WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Create data directory
RUN mkdir -p data

# Expose port
EXPOSE 3000

# Run the application
CMD ["bun", "run", "src/server.ts"]
