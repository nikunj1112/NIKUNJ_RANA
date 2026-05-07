# TODO - Cloudinary migration (Render)

- [ ] Install Cloudinary dependency in backend
- [ ] Create `backend/config/cloudinary.js`
- [ ] Update `backend/middleware/multerConfig.js` to use `memoryStorage` for:
  - project images (field `image`)
  - profile image (field `profileImage`)
  - certificate images (field `image`)
  - resume PDF (field `resume`)
- [ ] Update controllers to upload `req.file.buffer` to Cloudinary and save `secure_url`:
  - `backend/controllers/projectController.js` -> `image`
  - `backend/controllers/profileController.js` -> `profileImage`, `resume`
  - `backend/controllers/certificateController.js` -> `image`
- [ ] Update routes/middleware usage as needed (no API path changes)
- [ ] Update `backend/server.js`:
  - remove `app.use('/uploads', express.static('uploads'))`
- [ ] Add required environment variables in backend for Render
- [ ] Update frontend preview logic if any code relies on `/uploads/` paths
- [ ] Run local backend tests (start server, create/update resources)

