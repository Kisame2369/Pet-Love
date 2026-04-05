import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, updateUser } from "../../redux/auth/authSlice";
import { toast } from "react-toastify";
import Header from "../../components/Header/Header";
import ModalLogout from "../../components/ModalLogout/ModalLogout";
import NoticesItem from "../../components/NoticesItem/NoticesItem";
import EditUserModal from "../../components/EditUserModal/EditUserModal";
import UserIcon from "../../assets/icons/user.svg?react";
import EditIcon from "../../assets/icons/edit.svg?react";
import PlusIcon from "../../assets/icons/plus.svg?react";
import TrashIcon from "../../assets/icons/trash.svg?react";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState("favorites");
  const [isUploading, setIsUploading] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const favorites = user?.noticesFavorites || [];
  const [viewed, setViewed] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;

      try {
        const response = await axios.get(
          "https://petlove.b.goit.study/api/users/current/full",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        dispatch(updateUser(response.data));

        if (response.data.noticesViewed) {
          setViewed(response.data.noticesViewed);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token, dispatch]);

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
      console.error("Image upload error:", error);
      throw new Error("Failed to upload image");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    try {
      setIsUploading(true);

      const previewUrl = URL.createObjectURL(file);
      dispatch(
        updateUser({
          ...user,
          avatar: previewUrl,
        }),
      );

      const cloudinaryUrl = await uploadToCloudinary(file);

      const payload = {
        name: user.name,
        email: user.email,
        avatar: cloudinaryUrl,
      };

      if (user.phone) {
        payload.phone = user.phone;
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

      dispatch(updateUser(updatedUser));

      URL.revokeObjectURL(previewUrl);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to update profile picture");

      const response = await axios.get(
        "https://petlove.b.goit.study/api/users/current/full",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch(updateUser(response.data));
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePet = async (petId) => {
    try {
      await axios.delete(
        `https://petlove.b.goit.study/api/users/current/pets/remove/${petId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("Pet removed successfully");

      const response = await axios.get(
        "https://petlove.b.goit.study/api/users/current/full",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      dispatch(updateUser(response.data));
    } catch {
      toast.error("Failed to delete pet");
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    navigate("/home");
  };

  return (
    <div className={styles.pageContainer}>
      <Header variant="light" authenticated={true} />

      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.sidebar}>
            <div className={styles.profileCard}>
              <div className={styles.userSection}>
                <div className={styles.userBtn}>
                  User <UserIcon className={styles.userIcon} />
                </div>
              </div>

              <button
                className={styles.editBtn}
                onClick={() => setShowEditModal(true)}
              >
                <EditIcon className={styles.editIcon} />
              </button>

              <div className={styles.avatarWrapper}>
                {user?.avatar && user.avatar.trim() !== "" ? (
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className={styles.avatarImage}
                    key={user.avatar}
                  />
                ) : (
                  <UserIcon className={styles.avatarIcon} />
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: "none" }}
                accept="image/*"
                disabled={isUploading}
              />

              <button
                className={styles.uploadBtn}
                onClick={() => fileInputRef.current.click()}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload photo"}
              </button>

              <div className={styles.infoSection}>
                <h2 className={styles.infoTitle}>My information</h2>

                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    className={styles.input}
                    value={user?.name || ""}
                    readOnly
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    className={styles.input}
                    value={user?.email || ""}
                    readOnly
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="tel"
                    className={styles.input}
                    value={user?.phone || "+380"}
                    readOnly
                  />
                </div>
              </div>

              <div className={styles.petsSection}>
                <h2 className={styles.petsTitle}>My pets</h2>
                <button
                  className={styles.addPetBtn}
                  onClick={() => navigate("/add-pet")}
                >
                  Add pet <PlusIcon className={styles.plusIcon} />
                </button>
              </div>

              <div className={styles.myPetsList}>
                {user?.pets && user.pets.length > 0 ? (
                  user.pets.map((pet) => (
                    <div key={pet._id} className={styles.petCard}>
                      <div className={styles.petAvatar}>
                        <img src={pet.imgURL} alt={pet.name} />
                      </div>

                      <div className={styles.petInfo}>
                        <div className={styles.petCardHeader}>
                          <h4 className={styles.petNameDisplay}>
                            {pet.title || pet.name}
                          </h4>
                          <button
                            className={styles.deleteBtn}
                            onClick={() => handleDeletePet(pet._id)}
                          >
                            <TrashIcon className={styles.trashIcon} />
                          </button>
                        </div>

                        <div className={styles.petGridInfo}>
                          <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Name</span>
                            <span className={styles.infoValue}>{pet.name}</span>
                          </div>
                          <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Birthday</span>
                            <span className={styles.infoValue}>
                              {pet.birthday}
                            </span>
                          </div>
                          <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Sex</span>
                            <span className={styles.infoValue}>{pet.sex}</span>
                          </div>
                          <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Species</span>
                            <span className={styles.infoValue}>
                              {pet.species}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.emptyPets}>
                    You haven't added any pets yet.
                  </p>
                )}
              </div>

              <button className={styles.logoutBtn} onClick={handleLogout}>
                LOG OUT
              </button>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${activeTab === "favorites" ? styles.tabActive : ""}`}
                onClick={() => setActiveTab("favorites")}
              >
                My favorite pets
              </button>

              <button
                className={`${styles.tab} ${activeTab === "viewed" ? styles.tabActive : ""}`}
                onClick={() => setActiveTab("viewed")}
              >
                Viewed
              </button>
            </div>

            {activeTab === "favorites" &&
              (favorites.length > 0 ? (
                <ul className={styles.petsList}>
                  {favorites.map((pet) => (
                    <NoticesItem
                      key={pet._id}
                      item={pet}
                      onAttention={() => {}}
                      isFavoritePage={true}
                    />
                  ))}
                </ul>
              ) : (
                <div className={styles.emptyState}>
                  <p className={styles.emptyText}>
                    Oops,{" "}
                    <span className={styles.emptyHighlight}>
                      looks like there aren't any furries
                    </span>{" "}
                    on our adorable page yet.
                  </p>
                </div>
              ))}

            {activeTab === "viewed" &&
              (viewed.length > 0 ? (
                <ul className={styles.petsList}>
                  {viewed.map((pet) => (
                    <NoticesItem
                      key={pet._id}
                      item={pet}
                      onAttention={() => {}}
                      showFavoriteBtn={false}
                    />
                  ))}
                </ul>
              ) : (
                <div className={styles.emptyState}>
                  <p className={styles.emptyText}>No viewed pets yet.</p>
                </div>
              ))}
          </div>
        </main>
      </div>

      {showEditModal && (
        <EditUserModal onClose={() => setShowEditModal(false)} />
      )}

      {showLogoutModal && (
        <ModalLogout
          onConfirm={confirmLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
}
