import { Route, Routes } from "react-router-dom";

import Chat from "../pages/chat";

export default function NavFree() {
    return (
        <Routes>
            <Route path="/" element={<Chat />} />
           
        </Routes>
    );
}