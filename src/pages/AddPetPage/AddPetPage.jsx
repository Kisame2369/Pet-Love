import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import Header from "../../components/Header/Header";
import UploadIcon from "../../assets/icons/upload.svg?react";
import CalendarIcon from "../../assets/icons/calendar.svg?react";
import GenderFemaleIcon from "../../assets/icons/gender-female.svg?react";
import GenderMaleIcon from "../../assets/icons/gender-male.svg?react";
import GenderMultipleIcon from "../../assets/icons/gender-multiple.svg?react";
import DogPlaceholder from "../../assets/images/dog-placeholder.webp";
import dogDesktop from "../../assets/images/addPetDog-desktop.webp";
import PawPrint from "../../assets/icons/paw-print.svg?react";
import styles from "./AddPetPage.module.css";

const PET_TYPES = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "monkey", label: "Monkey" },
  { value: "bird", label: "Bird" },
  { value: "ants", label: "Ants" },
  { value: "bees", label: "Bees" },
  { value: "butterfly", label: "Butterfly" },
];

export default function AddPetPage() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const BASE_URL = "https://petlove.b.goit.study/api";

  const [formData, setFormData] = useState({
    imgURL: "",
    title: "",
    name: "",
    species: "",
    birthday: "",
    sex: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (gender) => {
    setFormData((prev) => ({ ...prev, sex: gender }));
  };

  const handleSpeciesSelect = (value) => {
    setFormData((prev) => ({ ...prev, species: value }));
    setIsDropdownOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setAvatarPreview(preview);
      setSelectedFile(file);
      setFormData((prev) => ({ ...prev, imgURL: "" }));
    }
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, birthday: date }));
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
      console.error("Image upload error:", error);
      throw new Error("Failed to upload image");
    }
  };

  const handleBack = () => {
    navigate("/profile");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.sex) {
      toast.error("Please select pet gender");
      return;
    }

    if (!formData.title || !formData.name || !formData.birthday) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!token) {
      toast.error("Please log in first.");
      return;
    }

    try {
      setIsUploading(true);

      let formattedBirthday = "";
      if (formData.birthday instanceof Date) {
        formattedBirthday = format(formData.birthday, "yyyy-MM-dd");
      }

      let finalImgURL = formData.imgURL;
      if (selectedFile) {
        toast.info("Uploading pet image...");
        finalImgURL = await uploadToCloudinary(selectedFile);
      }

      const payload = {
        ...formData,
        birthday: formattedBirthday,
        imgURL: finalImgURL || "",
      };

      await axios.post(`${BASE_URL}/users/current/pets/add`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Pet added successfully!");

      navigate("/profile");
    } catch (error) {
      console.error("Add pet error:", error);
      toast.error(error.response?.data?.message || "Failed to add pet");
    } finally {
      setIsUploading(false);
    }
  };

  const selectedPetType = PET_TYPES.find(
    (type) => type.value === formData.species,
  );

  return (
    <div className={styles.pageContainer}>
      <Header variant="light" authenticated={true} />

      <div className={styles.page}>
        <div className={styles.content}>
          <div className={styles.heroImage}>
            <picture>
              <source media="(min-width: 1280px)" srcSet={dogDesktop} />
              <img src={DogPlaceholder} alt="Dog" />
            </picture>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.title}>
              Add my pet /{" "}
              <span className={styles.stepLabel}>Personal details</span>
            </h1>
            <div className={styles.genderSection}>
              <button
                type="button"
                className={`${styles.genderBtn} ${formData.sex === "female" ? styles.genderBtnActive : ""}`}
                onClick={() => handleGenderSelect("female")}
              >
                <GenderFemaleIcon className={styles.genderIcon} />
              </button>
              <button
                type="button"
                className={`${styles.genderBtn} ${formData.sex === "male" ? styles.genderBtnActive : ""}`}
                onClick={() => handleGenderSelect("male")}
              >
                <GenderMaleIcon className={styles.genderIcon} />
              </button>
              <button
                type="button"
                className={`${styles.genderBtn} ${formData.sex === "multiple" ? styles.genderBtnActive : ""}`}
                onClick={() => handleGenderSelect("multiple")}
              >
                <GenderMultipleIcon className={styles.genderIcon} />
              </button>
            </div>

            <div className={styles.avatarSection}>
              <div className={styles.avatarWrapper}>
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Pet avatar"
                    className={styles.avatarImg}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <PawPrint className={styles.pawIcon} />
                  </div>
                )}
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept="image/*"
            />

            <div className={styles.imageUploadWrapper}>
              <input
                type="text"
                name="imgURL"
                className={styles.input}
                value={formData.imgURL}
                onChange={handleChange}
                placeholder="Enter URL"
                disabled={!!selectedFile || isUploading}
              />

              <button
                type="button"
                className={styles.uploadBtn}
                onClick={() => fileInputRef.current.click()}
                disabled={isUploading}
              >
                Upload photo <UploadIcon />
              </button>
            </div>

            <input
              type="text"
              name="title"
              className={styles.input}
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              required
              disabled={isUploading}
            />

            <input
              type="text"
              name="name"
              className={styles.input}
              value={formData.name}
              onChange={handleChange}
              placeholder="Pet's Name"
              required
              disabled={isUploading}
            />

            <div className={styles.row}>
              <div className={styles.dateInputWrapper}>
                <DatePicker
                  selected={formData.birthday}
                  onChange={handleDateChange}
                  dateFormat="dd.MM.yyyy"
                  placeholderText="00.00.0000"
                  className={styles.dateInput}
                  maxDate={new Date()}
                  showPopperArrow={false}
                />
                <CalendarIcon className={styles.calendarIcon} />
              </div>

              <div className={styles.customSelectWrapper} ref={dropdownRef}>
                <button
                  type="button"
                  className={styles.customSelectButton}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  disabled={isUploading}
                >
                  <span
                    className={
                      selectedPetType
                        ? styles.selectedText
                        : styles.placeholderText
                    }
                  >
                    {selectedPetType ? selectedPetType.label : "Type of pet"}
                  </span>
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    className={`${styles.dropdownArrow} ${isDropdownOpen ? styles.dropdownArrowOpen : ""}`}
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className={styles.customSelectDropdown}>
                    {PET_TYPES.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        className={`${styles.customSelectOption} ${formData.species === type.value ? styles.customSelectOptionActive : ""}`}
                        onClick={() => handleSpeciesSelect(type.value)}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.buttonRow}>
              <button
                type="button"
                className={styles.backBtn}
                onClick={handleBack}
                disabled={isUploading}
              >
                Back
              </button>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isUploading}
              >
                {isUploading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
