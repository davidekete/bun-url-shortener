FROM oven/bun

WORKDIR /app


COPY package.json .
COPY bun.lockb .

RUN bun install

COPY . .

EXPOSE 4040

CMD ["bun", "index.ts"]