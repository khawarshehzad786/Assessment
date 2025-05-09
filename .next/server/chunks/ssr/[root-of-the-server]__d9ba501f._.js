module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/context/calendar-context.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CalendarProvider": (()=>CalendarProvider),
    "useCalendar": (()=>useCalendar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const CalendarContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// Sample events data - updated to use the current week (May 5-11, 2025)
const initialEvents = [
    {
        id: "1",
        title: "Makenna Gouse",
        start: new Date(2025, 4, 5, 6, 0),
        end: new Date(2025, 4, 5, 8, 0),
        type: [
            "haircut",
            "message"
        ],
        description: "Haircut, Message SPA, +2",
        color: "bg-blue-100 text-blue-800"
    },
    {
        id: "2",
        title: "Aspen Westervelt",
        start: new Date(2025, 4, 5, 10, 0),
        end: new Date(2025, 4, 5, 12, 0),
        type: [
            "haircut",
            "spa"
        ],
        description: "Haircut, Luxury & Beard",
        color: "bg-blue-100 text-blue-800"
    },
    {
        id: "3",
        title: "Alena Westervelt",
        start: new Date(2025, 4, 5, 13, 30),
        end: new Date(2025, 4, 5, 15, 30),
        type: [
            "haircut",
            "message"
        ],
        description: "Haircut, Message",
        color: "bg-blue-100 text-blue-800"
    },
    {
        id: "4",
        title: "Alena Westervelt",
        start: new Date(2025, 4, 6, 19, 0),
        end: new Date(2025, 4, 6, 20, 0),
        type: [
            "message",
            "spa"
        ],
        description: "Message SPA",
        color: "bg-blue-100 text-blue-800"
    },
    {
        id: "5",
        title: "Kaylynn Baptista",
        start: new Date(2025, 4, 6, 10, 0),
        end: new Date(2025, 4, 6, 16, 0),
        type: [
            "spa"
        ],
        description: "Luxury & Beard SPA, +1",
        color: "bg-blue-100 text-blue-800"
    },
    {
        id: "6",
        title: "Extra Time",
        start: new Date(2025, 4, 6, 16, 0),
        end: new Date(2025, 4, 6, 17, 0),
        type: [
            "extra"
        ],
        color: "bg-blue-100 text-blue-800 opacity-50"
    },
    {
        id: "7",
        title: "Kianna Dias",
        start: new Date(2025, 4, 7, 17, 0),
        end: new Date(2025, 4, 7, 20, 0),
        type: [
            "spa"
        ],
        description: "Luxury & Beard SPA",
        color: "bg-blue-100 text-blue-800"
    },
    {
        id: "8",
        title: "Block - Lunch",
        start: new Date(2025, 4, 7, 10, 0),
        end: new Date(2025, 4, 7, 13, 0),
        type: [
            "block"
        ],
        description: "Block out this time to take a break, relax, or recharge",
        color: "bg-gray-200 text-gray-800"
    },
    {
        id: "9",
        title: "Madelyn Korsgaard",
        start: new Date(2025, 4, 8, 6, 0),
        end: new Date(2025, 4, 8, 7, 0),
        type: [
            "rebooking"
        ],
        description: "Rebooking",
        color: "bg-blue-100 text-blue-800"
    },
    {
        id: "10",
        title: "Tatiana Botosh",
        start: new Date(2025, 4, 8, 10, 0),
        end: new Date(2025, 4, 8, 13, 0),
        type: [
            "haircut"
        ],
        description: "Haircut",
        color: "bg-purple-100 text-purple-800"
    },
    {
        id: "11",
        title: "Livia George",
        start: new Date(2025, 4, 8, 11, 0),
        end: new Date(2025, 4, 8, 14, 0),
        type: [
            "message",
            "spa"
        ],
        description: "Message SPA, +2",
        color: "bg-orange-100 text-orange-800"
    },
    {
        id: "12",
        title: "Marilyn Philips",
        start: new Date(2025, 4, 8, 17, 0),
        end: new Date(2025, 4, 8, 20, 0),
        type: [
            "haircut"
        ],
        description: "Haircut",
        color: "bg-purple-100 text-purple-800"
    },
    {
        id: "13",
        title: "Paityn Bergson",
        start: new Date(2025, 4, 9, 7, 0),
        end: new Date(2025, 4, 9, 9, 0),
        type: [
            "rebooking"
        ],
        description: "Rebooking",
        color: "bg-purple-100 text-purple-800"
    },
    {
        id: "14",
        title: "Tatiana Botosh",
        start: new Date(2025, 4, 9, 10, 0),
        end: new Date(2025, 4, 9, 13, 0),
        type: [
            "haircut"
        ],
        description: "Haircut",
        color: "bg-purple-100 text-purple-800"
    },
    {
        id: "15",
        title: "Marley Curtis",
        start: new Date(2025, 4, 10, 16, 0),
        end: new Date(2025, 4, 10, 17, 0),
        type: [
            "message"
        ],
        description: "Message",
        color: "bg-purple-100 text-purple-800"
    }
];
function CalendarProvider({ children }) {
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialEvents);
    const addEvent = (event)=>{
        const newEvent = {
            ...event,
            id: Math.random().toString(36).substring(2, 9)
        };
        setEvents((prev)=>[
                ...prev,
                newEvent
            ]);
    };
    const updateEvent = (id, updatedEvent)=>{
        setEvents((prev)=>prev.map((event)=>event.id === id ? {
                    ...event,
                    ...updatedEvent
                } : event));
    };
    const deleteEvent = (id)=>{
        setEvents((prev)=>prev.filter((event)=>event.id !== id));
    };
    const getEventById = (id)=>{
        return events.find((event)=>event.id === id);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CalendarContext.Provider, {
        value: {
            events,
            addEvent,
            updateEvent,
            deleteEvent,
            getEventById
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/calendar-context.tsx",
        lineNumber: 190,
        columnNumber: 5
    }, this);
}
function useCalendar() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(CalendarContext);
    if (context === undefined) {
        throw new Error("useCalendar must be used within a CalendarProvider");
    }
    return context;
}
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else {
                "TURBOPACK unreachable";
            }
        } else {
            "TURBOPACK unreachable";
        }
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__d9ba501f._.js.map