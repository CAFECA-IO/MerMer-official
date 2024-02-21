# MerMer-official

MerMer official website

## 使用local postgre 的方法
需要使用docker

1. 將 `sample.env` 改名成為 `.env.local`
2.更改`.env.local`內的`HOST_DIR` ，改成資料庫資料想存放的位置
3. 啟動 postgre
```
docker-compose --env-file ./.env.local  up -d
```

4. Prisma migrate + seeder
```
npm run migrate:dev
```

5. 如果結束開發可關閉postgre
```
docker-compose down
```

