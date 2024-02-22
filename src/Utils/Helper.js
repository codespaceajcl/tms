import { GoHome } from "react-icons/go";
import { MdOutlineShareLocation, MdOutlineGridView } from "react-icons/md";
import { IoDocument } from "react-icons/io5";
import { HiClipboardDocumentCheck } from "react-icons/hi2";

const getEmail = localStorage.getItem("email")
const Token = localStorage.getItem("token")

export const login = {
    email: getEmail,
    token: Token
}

export const validateData = (data) => {
    for (const key in data) {
        if (data[key] === null || data[key] === undefined || data[key] === '') {
            throw new Error(`Please filled up all fields`);
        }
        if (typeof data[key] === 'object') {
            validateData(data[key]);
        }
    }
};

export const dashboardColorStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: 'white', borderRadius: "5px", cursor: "pointer", fontSize: "13px", boxShadow: "none",
        borderColor: state.isFocused || state.isHovered || state.isActive || state.onHovered ? '#A9C23F' : '#787878',
        '&:hover': {
            borderColor: state.isFocused || state.isActive ? '#A9C23F' : '#787878',
        },
    }),
    option: (styles) => {
        return {
            ...styles,
            fontSize: "13px",
        };
    },
};

export const dashboardSidebar = [
    {
        path: "/dashboard",
        icon: <GoHome />,
        title: "Dashboard",
    },
    {
        path: "/dashboard/all-tenders",
        icon: <MdOutlineGridView />,
        title: "All Tenders",
    },
    {
        path: "/dashboard/assigned-tenders",
        icon: <IoDocument />,
        title: "Assigned Tenders",
    },
    {
        path: "/dashboard/interested-tenders",
        icon: <IoDocument />,
        title: "Interested Tenders",
    },
    {
        path: "/dashboard/documents",
        icon: <MdOutlineShareLocation />,
        title: "Documents",
    },
    {
        path: "/dashboard/tender-results",
        icon: <HiClipboardDocumentCheck />,
        title: "Tender Results",
    },
];