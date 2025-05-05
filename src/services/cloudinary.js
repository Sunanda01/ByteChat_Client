export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file),
      formData.append("upload_preset", "ByteChat");
    try {
      const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      // console.error("Upload failed:", err.message);
    }
  };