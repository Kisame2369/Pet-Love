import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/auth/authSlice";
import CheckIcon from "../../assets/icons/check.svg?react";
import RedCloseIcon from "../../assets/icons/red-close.svg?react";
import EyeOpenIcon from "../../assets/icons/eye-open.svg?react";
import EyeClosedIcon from "../../assets/icons/eye-closed.svg?react";
import styles from "./RegisterForm.module.css";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(7, "Password must be at least 7 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character",
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const nameValue = watch("name");
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const onSubmit = async (data) => {
    try {
      const registerData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const response = await fetch(
        "https://petlove.b.goit.study/api/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerData),
        },
      );
      if (!response.ok) throw new Error("Registration failed");
      const result = await response.json();

      const user = result.user ?? result;
      dispatch(
        setCredentials({
          user,
          token: result.token,
        }),
      );

      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <div className={styles.inputWrap}>
          <input
            className={`${styles.input} ${errors.name ? styles.inputError : nameValue ? styles.inputSuccess : ""}`}
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {nameValue && !errors.name && (
            <CheckIcon className={styles.iconSuccess} />
          )}
          {nameValue && errors.name && (
            <RedCloseIcon className={styles.iconError} />
          )}
        </div>
        {errors.name && (
          <span className={styles.errorMsg}>{errors.name.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <div className={styles.inputWrap}>
          <input
            className={`${styles.input} ${errors.email ? styles.inputError : emailValue ? styles.inputSuccess : ""}`}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {emailValue && !errors.email && (
            <CheckIcon className={styles.iconSuccess} />
          )}
          {emailValue && errors.email && (
            <RedCloseIcon className={styles.iconError} />
          )}
        </div>
        {errors.email && (
          <span className={styles.errorMsg}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <div className={styles.inputWrap}>
          <input
            className={`${styles.input} ${errors.password ? styles.inputError : passwordValue ? styles.inputSuccess : ""}`}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
          />
          {passwordValue && !errors.password && (
            <CheckIcon
              className={`${styles.iconSuccess} ${styles.iconBeforeEye}`}
            />
          )}
          <button
            type="button"
            className={styles.eyeBtn}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeOpenIcon className={styles.eyeIcon} />
            ) : (
              <EyeClosedIcon className={styles.eyeIcon} />
            )}
          </button>
        </div>
        {errors.password && (
          <span className={styles.errorMsg}>{errors.password.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <div className={styles.inputWrap}>
          <input
            className={`${styles.input} ${errors.confirmPassword ? styles.inputError : confirmPasswordValue ? styles.inputSuccess : ""}`}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />
          {confirmPasswordValue && !errors.confirmPassword && (
            <CheckIcon
              className={`${styles.iconSuccess} ${styles.iconBeforeEye}`}
            />
          )}
          <button
            type="button"
            className={styles.eyeBtn}
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? (
              <EyeOpenIcon className={styles.eyeIcon} />
            ) : (
              <EyeClosedIcon className={styles.eyeIcon} />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <span className={styles.errorMsg}>
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <button className={styles.btn} type="submit">
        REGISTRATION
      </button>
    </form>
  );
}
