import css from './Pagination.module.css';

export default function Pagination({ page, totalPages, setPage }) {
    if (totalPages <= 1) return null;

    const isFirst = page === 1;
    const isLast = page === totalPages;

    return (
        <div className={css.pagination}>
            <div className={css.navigation}>
                <button
                    className={css[!isFirst ? 'active' : 'button']}
                    type="button"
                    disabled={isFirst}
                    onClick={() => setPage(1)}
                >
                    <svg className={css.iconLeft} width="20" height="20">
                        <use xlinkHref="/sprite.svg#icon-arrow" />
                    </svg>
                </button>

                <button
                    className={css[!isFirst ? 'active' : 'button']}
                    type="button"
                    disabled={isFirst}
                    onClick={() => setPage(page - 1)}
                >
                    <svg className={css.iconLeft} width="20" height="20">
                        <use xlinkHref="/sprite.svg#icon-arrow" />
                    </svg>
                </button>
            </div>

            <div className={css.buttonNumbers}>

                { totalPages < page + 2 && (
                    <span className={css.button}>...</span>
                )}

                <button
                    className={css[!isLast ? 'numberActive' : 'button']}
                    type="button"
                >
                    {page}
                </button>

                {page + 1 <= totalPages + 1 && (
                    <button
                        className={css[isLast ? 'numberActive' : 'button']}
                        type="button"
                        onClick={() => setPage(page + 1)}
                    >
                        {page + 1}
                    </button>
                )}

                {page + 2 <= totalPages && (
                    <span className={css.button}>...</span>
                )}
            </div>

            <div className={css.navigation}>
                <button
                    className={css[!isLast ? 'active' : 'button']}
                    type="button"
                    disabled={isLast}
                    onClick={() => setPage(page + 1)}
                >
                    <svg width="20" height="20">
                        <use xlinkHref="/sprite.svg#icon-arrow" />
                    </svg>
                </button>

                <button
                    className={css[!isLast ? 'active' : 'button']}
                    type="button"
                    disabled={isLast}
                    onClick={() => setPage(totalPages)}
                >
                     <svg width="20" height="20">
                        <use xlinkHref="/sprite.svg#icon-arrow" />
                    </svg>
                </button>
            </div>
        </div>
    );
}