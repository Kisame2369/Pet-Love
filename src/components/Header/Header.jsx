import css from "./Header.module.css"
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Header() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const isLogin = true
    
    const isAuthPage = location.pathname === '/login' || location.pathname === '/registration';
    const isMainPage = location.pathname === '/';

    const toggleMenu = () => setIsOpen(prev => !prev);

    const closeMenu = () => setIsOpen(false);

    return (
        <div className={css.header}>
            <div className={`${css.zone} ${isMainPage ? css.zoneMain : ''}`}>
                <nav className={css.navbar}>

                    <NavLink to="/" onClick={closeMenu}>
                        <svg className={css.logo} width="76" height="20">
                            <use href={isMainPage ? "/sprite.svg#icon-logo-main" : "/sprite.svg#icon-logo"}></use>
                        </svg>
                    </NavLink>

                    {isLogin && (
                        <NavLink to="/profile" onClick={closeMenu}>
                            <svg className={css.profile} width="40" height="40">
                                <use href="/sprite.svg#icon-profile"></use>
                            </svg>
                        </NavLink>
                    )}

                    <button
                        type="button"
                        className={css.burgerMenu}
                        onClick={toggleMenu}
                    >
                        <svg className={css.menu} width="32" height="32">
                            <use href="/sprite.svg#icon-menu"></use>
                        </svg>
                    </button>
                </nav>

                {isMainPage && (
                    <div className={css.headText}>
                        <p className={css.textOne}>
                            Take good <span className={css.care}>care</span> of your small pets
                        </p>
                        <p className={css.textTwo}>
                            Choosing a pet for your home is a choice that is meant to enrich your life with immeasurable joy and tenderness.
                        </p>
                    </div>
                )}
            
            </div>


            {isOpen && (
                <div className={isAuthPage ? `${css.modalMenu} ${css.authModal}` : css.modalMenu}>

                    <button
                        type="button"
                        className={css.closeBtn}
                        onClick={toggleMenu}
                    >
                        <svg className={css.close} width="32" height="32">
                            <use href="/sprite.svg#icon-close"></use>
                        </svg>
                    </button>

                    <div className={css.links}>
                        <NavLink
                            to="/news"
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                isActive
                                    ? `${css.link} ${css.active} ${isAuthPage ? css.authLink : ''}`
                                    : `${css.link} ${isAuthPage ? css.authLink : ''}`
                            }
                        >
                            News
                        </NavLink>

                        <NavLink
                            to="/notices"
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                isActive
                                    ? `${css.link} ${css.active} ${isAuthPage ? css.authLink : ''}`
                                    : `${css.link} ${isAuthPage ? css.authLink : ''}`
                            }
                        >
                            Find pet
                        </NavLink>

                        <NavLink
                            to="/friends"
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                isActive
                                    ? `${css.link} ${css.active} ${isAuthPage ? css.authLink : ''}`
                                    : `${css.link} ${isAuthPage ? css.authLink : ''}`
                            }
                        >
                            Our friends
                        </NavLink>
                    </div>

                    {isLogin ? (
                        <button
                            className={isAuthPage ? `${css.logOut} ${css.authLogOut}` : css.logOut}
                            onClick={closeMenu}
                        >
                            Log Out
                        </button>
                    ) : (
                        <div className={css.log}>
                            <NavLink
                                to="/login"
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    isActive
                                        ? `${css.linkLog} ${css.active} ${isAuthPage ? css.authLink : ''}`
                                        : `${css.linkLog} ${isAuthPage ? css.authLink : ''}`
                                }
                            >
                                LOG IN
                            </NavLink>

                            <NavLink
                                to="/registration"
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    isActive
                                        ? `${css.linkReg} ${css.active} ${isAuthPage ? css.authLink : ''}`
                                        : `${css.linkReg} ${isAuthPage ? css.authLink : ''}`
                                }
                            >
                                REGISTRATION
                            </NavLink>
                        </div>
                    )}
                </div>)}
        </div>
    );
}