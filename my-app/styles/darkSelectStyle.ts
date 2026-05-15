export const darkSelectStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: "#111827",
        borderColor: state.isFocused ? "#3b82f6" : "#374151",
        boxShadow: "none",
        minHeight: "42px",
        color: "white",
    }),

    menu: (provided: any) => ({
        ...provided,
        backgroundColor: "#111827",
        border: "1px solid #374151",
    }),

    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isFocused ? "#1e293b" : "#111827",
        color: "white",
        cursor: "pointer",
    }),

    singleValue: (provided: any) => ({
        ...provided,
        color: "white",
    }),

    input: (provided: any) => ({
        ...provided,
        color: "white",
    }),

    placeholder: (provided: any) => ({
        ...provided,
        color: "#9ca3af",
    }),

    dropdownIndicator: (provided: any) => ({
        ...provided,
        color: "#9ca3af",
    }),

    indicatorSeparator: () => ({
        display: "none",
    }),
};