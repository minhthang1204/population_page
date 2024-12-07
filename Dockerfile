# Sử dụng Node.js làm base image
FROM node:18 AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json
COPY package.json package-lock.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Build ứng dụng Next.js
RUN npm run build

# Production image
FROM node:18-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy từ builder
COPY --from=builder /app/package.json /app/package-lock.json /app/
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public

# Cài đặt các dependencies cho production
RUN npm install --production

# Khởi chạy ứng dụng
CMD ["npm", "start"]
