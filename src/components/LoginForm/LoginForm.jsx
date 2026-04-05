import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/auth/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CheckIcon from "../../assets/icons/check.svg?react";
import RedCloseIcon from "../../assets/icons/red-close.svg?react";
import EyeOpenIcon from "../../assets/icons/eye-open.svg?react";
import EyeClosedIcon from "../../assets/icons/eye-closed.svg?react";
import styles from "./LoginForm.module.css";

const schema = yup.object({
  email: yup
    .string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
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

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://petlove.b.goit.study/api/users/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      if (!response.ok) throw new Error("Login failed");
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

      <button className={styles.btn} type="submit">
        Log In
      </button>
    </form>
  );
}
