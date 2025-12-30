import css from "./Header.module.css"
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Header() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const isLogin = true;
    
    const isMainPage = location.pathname === '/';

    const toggleMenu = () => setIsOpen(prev => !prev);
    const closeMenu = () => setIsOpen(false);

    return (
        <div className={css.header}>
            <div className={isMainPage ? css.zoneMain : css.zone}>
                <nav className={css.navbar}>
                    <NavLink to="/" onClick={closeMenu}>
                        <svg className={css.logo} width="76" height="20">
                            <use xlinkHref={isMainPage ? "/sprite.svg#icon-logo-main" : "/sprite.svg#icon-logo"}></use>
                        </svg>
                    </NavLink>
                    
                    <div className={css.wrap}>
                        {isLogin && (
                            <NavLink to="/profile" onClick={closeMenu}>
                                <svg className={css.profile} width="40" height="40">
                                    <use xlinkHref="/sprite.svg#icon-profile"></use>
                                </svg>
                            </NavLink>
                        )}

                        <button
                            type="button"
                            className={css.burgerMenu}
                            onClick={toggleMenu}
                        >
                            <svg className={css.menu} width="32" height="32">
                                <use xlinkHref="/sprite.svg#icon-menu"></use>
                            </svg>
                        </button>
                    </div>
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
                <div className={`${css.modalMenu} ${isMainPage ? css.mainPageModal : ''}`}>
                    <button
                        type="button"
                        className={css.closeBtn}
                        onClick={toggleMenu}
                    >
                        <svg className={css.close} width="32" height="32">
                            <use xlinkHref="/sprite.svg#icon-close"></use>
                        </svg>
                    </button>

                    <div className={css.links}>
                        <NavLink
                            to="/news"
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                `${css.link} ${isActive ? css.active : ''}`
                            }
                        >
                            News
                        </NavLink>

                        <NavLink
                            to="/notices"
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                `${css.link} ${isActive ? css.active : ''}`
                            }
                        >
                            Find pet
                        </NavLink>

                        <NavLink
                            to="/friends"
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                `${css.link} ${isActive ? css.active : ''}`
                            }
                        >
                            Our friends
                        </NavLink>
                    </div>

                    {isLogin ? (
                        <button
                            className={css.logOut}
                            onClick={closeMenu}
                        >
                            LOG OUT
                        </button>
                    ) : (
                        <div className={css.log}>
                            <NavLink
                                to="/login"
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `${css.linkLog} ${isActive ? css.active : ''}`
                                }
                            >
                                LOG IN
                            </NavLink>

                            <NavLink
                                to="/registration"
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `${css.linkReg} ${isActive ? css.active : ''}`
                                }
                            >
                                REGISTRATION
                            </NavLink>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}