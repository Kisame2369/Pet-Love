export const selectStyles = {
    control: (provided) => ({
        ...provided,
        borderRadius: '30px',
        border: 'none',
        height: '42px',
        backgroundColor: 'var(--white)',
        fontFamily: 'Manrope',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '18px',
        letterSpacing: '-0.03em',
        color: 'var(--black)',
        width: '143px',
        boxShadow: 'none',
        cursor: 'pointer',
        '&:hover': {
            border: 'none',
            boxShadow: 'none',
        }
    }),
    input: (provided) => ({
        ...provided,
        margin: 0,
        padding: 0,
        caretColor: 'transparent',
        input: {
            opacity: '0 !important',
        }
    }),
    indicatorSeparator: () => ({
        display: 'none'
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: 'var(--black)',
        '&:hover': {
            color: 'var(--black)'
        }
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '15px',
        backgroundColor: 'var(--white)',
        marginTop: '4px',
        width: '143px',
        height: '146px',
        border: 'none',
        boxShadow: 'none',
        overflow: 'hidden',
    }),
    menuList: (provided) => ({
        ...provided,
        padding: 0,
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: 'transparent',
        color: state.isSelected || state.isFocused ? 'var(--dark-yellow)' : '#26262699',
        fontFamily: 'Manrope',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '18px',
        letterSpacing: '-0.03em',
        cursor: 'pointer',
        '&:active': {
            backgroundColor: 'transparent',
        }
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'var(--black)',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'var(--black)',
    })
}

export const selectStylesType = {
    control: (provided) => ({
        ...provided,
        borderRadius: '30px',
        border: 'none',
        height: '42px',
        backgroundColor: 'var(--white)',
        fontFamily: 'Manrope',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '18px',
        letterSpacing: '-0.03em',
        color: 'var(--black)',
        width: '295px',
        boxShadow: 'none',
        cursor: 'pointer',
        '&:hover': {
            border: 'none',
            boxShadow: 'none',
        }
    }),
    input: (provided) => ({
        ...provided,
        margin: 0,
        padding: 0,
        caretColor: 'transparent',
        input: {
            opacity: '0 !important',
        }
    }),
    indicatorSeparator: () => ({
        display: 'none'
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: 'var(--black)',
        '&:hover': {
            color: 'var(--black)'
        }
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '15px',
        backgroundColor: 'var(--white)',
        marginTop: '4px',
        width: '295px',
        height: '216px',
        border: 'none',
        boxShadow: 'none',
        overflow: 'hidden',
    }),
    menuList: (provided) => ({
        ...provided,
        padding: '6px 0px 6px 12px',
        height: '200px',
        position: 'relative',
        boxSizing: 'content-box',
        borderRight: '8px solid transparent', 
        '::-webkit-scrollbar': {
            width: '8px',
        },
        '::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
            marginTop: '12px',
            marginBottom: '12px',
        },
        '::-webkit-scrollbar-thumb': {
            backgroundColor: '#26262614',
            borderRadius: '13px',
        }
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: 'transparent',
        color: state.isSelected || state.isFocused ? 'var(--dark-yellow)' : '#26262699',
        fontFamily: 'Manrope',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '18px',
        letterSpacing: '-0.03em',
        cursor: 'pointer',
        '&:active': {
            backgroundColor: 'transparent',
        }
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'var(--black)',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'var(--black)',
    })
}

export const selectStylesLocation = {
control: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--white)',
    border: `1px solid ${state.isFocused ? 'var(--dark-yellow)' : 'none'}`,
    borderRadius: '30px',
    height: '42px',
    width: '100%',
    padding: '0 12px',
    boxShadow: 'none !important',
    cursor: 'text',
    fontFamily: 'Manrope',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '20px',
    letterSpacing: '-0.03em',
    color: 'var(--black)',
    minHeight: '42px',
    '&:hover': {
        borderColor: state.isFocused ? 'var(--dark-yellow)' : 'none',
    },
}),
    valueContainer: (provided) => ({
        ...provided,
        padding: '0',
        height: '42px',
    }),
    input: (provided) => ({
        ...provided,
        margin: 0,
        padding: 0,
        color: 'var(--black)',
        fontFamily: 'Manrope',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '20px',
        letterSpacing: '-0.03em',
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        height: '42px',
        gap: '4px',
    }),
    indicatorSeparator: () => ({
        display: 'none'
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: 0,
        cursor: 'pointer',
        '& svg': {
            width: '18px',
            height: '18px',
            fill: 'transparent',
            stroke: 'var(--black)',
        },
        '&:hover svg': {
            stroke: 'var(--black)',
        }
    }),
    clearIndicator: (provided) => ({
        ...provided,
        padding: 0,
        cursor: 'pointer',
        '& svg': {
            width: '18px',
            height: '18px',
            fill: 'transparent',
            stroke: 'var(--black)',
        },
        '&:hover svg': {
            stroke: 'var(--black)',
        }
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '15px',
        backgroundColor: 'var(--white)',
        marginTop: '4px',
        width: '100%',
        maxHeight: '216px',
        border: 'none',
        boxShadow: 'none',
        overflow: 'hidden',
    }),
    menuList: (provided) => ({
        ...provided,
        padding: '6px 0px 6px 12px',
        maxHeight: '200px',
        position: 'relative',
        boxSizing: 'content-box',
        borderRight: '8px solid transparent', 
        '::-webkit-scrollbar': {
            width: '8px',
        },
        '::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
            marginTop: '12px',
            marginBottom: '12px',
        },
        '::-webkit-scrollbar-thumb': {
            backgroundColor: '#26262614',
            borderRadius: '13px',
        }
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: 'transparent',
        color: state.isSelected || state.isFocused ? 'var(--dark-yellow)' : '#26262699',
        fontFamily: 'Manrope',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '18px',
        letterSpacing: '-0.03em',
        cursor: 'pointer',
        '&:active': {
            backgroundColor: 'transparent',
        }
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'var(--black)',
        fontFamily: 'Manrope',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '20px',
        letterSpacing: '-0.03em',
        margin: 0,
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'var(--black)',
        fontFamily: 'Manrope',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '20px',
        letterSpacing: '-0.03em',
        margin: 0,
    }),
    noOptionsMessage: (provided) => ({
        ...provided,
        color: '#26262699',
        fontFamily: 'Manrope',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '18px',
        letterSpacing: '-0.03em',
    })
}