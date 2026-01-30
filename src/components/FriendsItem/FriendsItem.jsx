import css from './FriendsItem.module.css';

export default function FriendsItem({ item }) {
    const hasEmail = item.email;
    const hasPhone = item.phone;
    const hasAddress = item.address;
    const hasWorkTime = item.workDays?.[0]?.from && item.workDays?.[0]?.to;

    const getContactText = (type) => {
        if (!hasEmail && !hasPhone && !hasAddress) {
            return "website only";
        }

        if (type === 'email') {
            if (!hasEmail && hasPhone) return "phone only";
            if (!hasEmail) return "website only";
            return item.email;
        }

        if (type === 'phone') {
            if (!hasPhone && hasEmail) return "email only";
            if (!hasPhone) return "website only";
            return item.phone;
        }

        if (type === 'address') {
            if (!hasAddress) return "website only";
            return item.address;
        }
    };

    const emailText = getContactText('email');
    const phoneText = getContactText('phone');
    const addressText = getContactText('address');

    return (
        <div className={css.friendsCard}>
            <img className={css.friendsImage} src={item.imageUrl} alt={item.title} />
            <div className={css.wrap}>
                <a href={item.url} className={css.friendsTitle}>{item.title}</a>
                <div className={css.textWrap}>
                    <div className={css.friendsText}>
                        <p className={css.miniTitle}>Email:</p>
                        {hasEmail ? (
                            <a href={`mailto:${item.email}`} className={css.text}>{emailText}</a>
                        ) : (
                            <span className={css.text}>{emailText}</span>
                        )}
                    </div>

                    <div className={css.friendsText}>
                        <p className={css.miniTitle}>Address:</p>
                        {hasAddress ? (
                            <a href={item.addressUrl} className={css.text}>{addressText}</a>
                        ) : (
                            <span className={css.text}>{addressText}</span>
                        )}
                    </div>

                    <div className={css.friendsText}>
                        <p className={css.miniTitle}>Phone:</p>
                        {hasPhone ? (
                            <a href={`tel:${item.phone}`} className={css.text}>{phoneText}</a>
                        ) : (
                            <span className={css.text}>{phoneText}</span>
                        )}
                    </div>
                </div>
            </div>

            <div className={css.time}>
                {hasWorkTime ? (
                    <>
                        <p className={css.from}>{item.workDays[0].from}</p>
                        <span>-</span>
                        <p className={css.to}>{item.workDays[0].to}</p>
                    </>
                ) : (
                    <p>Day and night</p>
                )}
            </div>
        </div>
    );
}