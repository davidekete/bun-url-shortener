FROM oven/bun

WORKDIR /app

COPY ./prisma prisma
COPY package.json .
COPY bun.lockb .

RUN bun install

COPY . .

EXPOSE 4040

CMD ["bun", "index.ts"]