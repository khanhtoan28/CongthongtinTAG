# TAGTECH Future

Website doanh nghiệp công nghệ gồm landing page, REST API và trang quản trị nội dung. Không cần cài thư viện ngoài.

```powershell
$env:ADMIN_TOKEN='your-secure-token'
npm start
```

- Website: `http://localhost:3000`
- Quản trị: `http://localhost:3000/admin`
- API: `GET /api/site`, `PUT /api/site` (Bearer token)

Nếu không đặt `ADMIN_TOKEN`, mã phát triển mặc định là `tagtech-admin`. Khi triển khai thật, bắt buộc đặt biến môi trường này thành một chuỗi bí mật mạnh.
