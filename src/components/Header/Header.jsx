import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import ModalLogout from "../ModalLogout/ModalLogout";
import LogoMobileDark from "../../assets/icons/logo-mobile-dark.svg?react";
import LogoMobileLight from "../../assets/icons/logo-mobile-light.svg?react";
import LogoDesktopDark from "../../assets/icons/logo-desktop-dark.svg?react";
import LogoDesktopLight from "../../assets/icons/logo-desktop-light.svg?react";
import BurgerIcon from "../../assets/icons/hamburger.svg?react";
import UserIcon from "../../assets/icons/user.svg?react";
import CloseIcon from "../../assets/icons/close.svg?react";
import styles from "./Header.module.css";

export default function Header({ variant = "dark", authenticated = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    navigate("/");
    setShowLogoutModal(false);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  const isLight = variant === "light";

  return (
    <>
      <header
        className={`${styles.header} ${isLight ? styles.headerLight : ""}`}
      >
        <Link to="/">
          {isLight ? (
            <>
              <LogoMobileLight
                className={`${styles.logo} ${styles.logoMobile}`}
              />
              <LogoDesktopLight
                className={`${styles.logo} ${styles.logoDesktop}`}
              />
            </>
          ) : (
            <>
              <LogoMobileDark
                className={`${styles.logo} ${styles.logoMobile}`}
              />
              <LogoDesktopDark
                className={`${styles.logo} ${styles.logoDesktop}`}
              />
            </>
          )}
        </Link>

        <nav className={styles.navMobile}>
          {authenticated ? (
            <div className={styles.userNavTablet}>
              <button className={styles.btnLogoutTablet} onClick={handleLogout}>
                LOG OUT
              </button>

              <Link to="/profile" className={styles.userBtn}>
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user?.name}
                    className={styles.userAvatarMobile}
                  />
                ) : (
                  <UserIcon className={styles.userIcon} />
                )}
                <span className={styles.userNameMobile}>
                  {user?.name || "User"}
                </span>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/login" className={styles.navMobileLogin}>
                LOG IN
              </Link>
              <Link to="/register" className={styles.navMobileRegister}>
                REGISTRATION
              </Link>
            </>
          )}
          <button
            className={`${styles.iconBtn} ${isLight ? styles.iconBtnDark : ""}`}
            onClick={() => setMenuOpen(true)}
          >
            <BurgerIcon className={styles.burgerIcon} />
          </button>
        </nav>

        <nav className={styles.navDesktop}>
          <ul className={styles.navLinks}>
            <li>
              <Link
                to="/news"
                className={`${styles.navLink} ${isLight ? styles.navLinkLight : ""}`}
              >
                News
              </Link>
            </li>
            <li>
              <Link
                to="/notices"
                className={`${styles.navLink} ${isLight ? styles.navLinkLight : ""}`}
              >
                Find pet
              </Link>
            </li>
            <li>
              <Link
                to="/friends"
                className={`${styles.navLink} ${isLight ? styles.navLinkLight : ""}`}
              >
                Our friends
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.navActions}>
          {authenticated ? (
            <>
              <button className={styles.btnLogout} onClick={handleLogout}>
                LOG OUT
              </button>
              <Link to="/profile" className={styles.userBtnDesktop}>
                {user?.avatar && user.avatar.trim() !== "" ? (
                  <img
                    src={user.avatar}
                    alt={user?.name}
                    className={styles.userAvatar}
                  />
                ) : (
                  <UserIcon className={styles.userIconDesktop} />
                )}
                <span>{user?.name || "User"}</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`${styles.btnLogin} ${isLight ? styles.btnLoginLight : ""}`}
              >
                LOG IN
              </Link>
              <Link
                to="/register"
                className={`${styles.btnRegister} ${isLight ? styles.btnRegisterLight : ""}`}
              >
                REGISTRATION
              </Link>
            </>
          )}
        </div>
      </header>

      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}

      <div
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}
        style={{
          background: isLight ? "var(--color-primary)" : "var(--color-white)",
        }}
      >
        <button
          className={styles.closeBtn}
          onClick={() => setMenuOpen(false)}
          aria-label="Kapat"
        >
          <CloseIcon className={styles.closeIcon} />
        </button>

        <ul className={styles.drawerLinks}>
          <li>
            <Link
              to="/news"
              className={`${styles.drawerLink} ${isLight ? styles.drawerLinkDark : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              News
            </Link>
          </li>
          <li>
            <Link
              to="/notices"
              className={`${styles.drawerLink} ${isLight ? styles.drawerLinkDark : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Find pet
            </Link>
          </li>
          <li>
            <Link
              to="/friends"
              className={`${styles.drawerLink} ${isLight ? styles.drawerLinkDark : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Our friends
            </Link>
          </li>
        </ul>

        <div className={styles.drawerActions}>
          <>
            <Link
              to="/login"
              className={`${styles.drawerBtnLogin} ${isLight ? styles.drawerBtnLoginDark : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              LOG IN
            </Link>
            <Link
              to="/register"
              className={`${styles.drawerBtnRegister} ${isLight ? styles.drawerBtnRegisterDark : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              REGISTRATION
            </Link>
          </>
        </div>
      </div>

      {showLogoutModal && (
        <ModalLogout
          onConfirm={confirmLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
}
