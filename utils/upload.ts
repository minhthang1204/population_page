import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Tắt bodyParser mặc định của Next.js
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm({
      uploadDir: './uploads', // Thư mục lưu file
      keepExtensions: true, // Giữ nguyên phần mở rộng file
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Failed to upload file' });
        return;
      }

      const uploadedFile = files.file as unknown as File; // Ép kiểu file
      const oldPath = uploadedFile.filepath;
      const newPath = `./uploads/${uploadedFile.originalFilename}`;

      fs.renameSync(oldPath, newPath); // Đổi tên file để dễ quản lý

      res.status(200).json({ message: 'File uploaded successfully', file: newPath });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
