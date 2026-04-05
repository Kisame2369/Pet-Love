import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { updateUser } from "../../redux/auth/authSlice";
import CloseIcon from "../../assets/icons/close.svg?react";
import UploadIcon from "../../assets/icons/upload.svg?react";
import UserIcon from "../../assets/icons/user.svg?react";
import styles from "./EditUserModal.module.css";

export default function EditUserModal({ onClose }) {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "avatar") {
      setSelectedFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    }
  };

  const uploadToCloudinary = async (file) => {
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "petlove_avatars");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfzot67y0/image/upload",
        uploadData,
      );

      return response.data.secure_url;
    } catch (error) {
      console.error("Image upload error:", error.response?.data || error);
      throw new Error("Failed to upload image");
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    try {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      const newPreviewUrl = URL.createObjectURL(file);

      setPreviewUrl(newPreviewUrl);
      setFormData((prev) => ({ ...prev, avatar: "" }));
      setSelectedFile(file);
    } catch (error) {
      console.error("File selection error:", error);
      toast.error("Failed to select image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsUploading(true);

      let avatarUrl = formData.avatar;

      if (selectedFile) {
        toast.info("Uploading image...");
        avatarUrl = await uploadToCloudinary(selectedFile);
      }

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
      };

      if (formData.phone && formData.phone.trim()) {
        payload.phone = formData.phone.trim();
      }

      if (avatarUrl && avatarUrl.startsWith("http")) {
        payload.avatar = avatarUrl;
      }

      const response = await axios.patch(
        "https://petlove.b.goit.study/api/users/current/edit",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const updatedUser = response.data.user || response.data;

      if (!avatarUrl && !selectedFile) {
        updatedUser.avatar = "";
      }

      dispatch(updateUser(updatedUser));

      toast.success("Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      toast.error(
        error.response?.data?.message || error.message || "Update failed",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const displayAvatar = previewUrl || formData.avatar;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <CloseIcon />
        </button>

        <h2 className={styles.title}>Edit information</h2>

        <div className={styles.avatarSection}>
          <div className={styles.avatarWrapper}>
            {displayAvatar ? (
              <img
                src={displayAvatar}
                alt="User Avatar"
                className={styles.avatarImg}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                <UserIcon className={styles.placeholderIcon} />
              </div>
            )}
          </div>

          <div className={styles.uploadActions}>
            <div className={styles.urlInputWrapper}>
              <input
                type="text"
                name="avatar"
                className={styles.urlInput}
                value={formData.avatar}
                onChange={handleChange}
                placeholder="Avatar URL"
                disabled={!!selectedFile || isUploading}
              />
            </div>
            <button
              type="button"
              className={styles.uploadBtn}
              onClick={() => fileInputRef.current.click()}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload photo"} <UploadIcon />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept="image/*"
              disabled={isUploading}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className={styles.input}
            required
            disabled={isUploading}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={styles.input}
            required
            disabled={isUploading}
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+380"
            className={styles.input}
            disabled={isUploading}
          />

          <button
            type="submit"
            className={styles.saveBtn}
            disabled={isUploading}
          >
            {isUploading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
