# Base on official Node.js Alpine image
FROM node:alpine

# Set working directory
WORKDIR /usr/app

# Enable Corepack and install PM2 globally
RUN corepack enable && corepack prepare yarn@stable --activate
RUN npm install --global pm2

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy all files
COPY . .

# Build the Next.js app
RUN yarn build

# Expose the port Next.js runs on
EXPOSE 3000

# Run container as non-root (unprivileged) user
USER node

# Use PM2 to start the Next.js app
CMD ["pm2-runtime", "start", "/usr/local/bin/yarn", "--", "start"]
