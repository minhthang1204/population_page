# Sử dụng Node.js làm base image
FROM node:18 AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json
COPY package.json yarn.lock ./

# Cài đặt các dependencies
RUN yarn

# Copy toàn bộ mã nguồn
COPY . .

# Build ứng dụng Next.js
RUN yarn build

# Production image
FROM node:18-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy từ builder
COPY --from=builder /app/package.json /app/yarn.lock /app/
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/.env /app/.env

# Cài đặt các dependencies cho production
RUN yarn

# Khởi chạy ứng dụng
CMD ["yarn", "start"]