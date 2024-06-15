import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="auth w-full h-[100vh] flex items-center justify-center">
            {children}
        </main>
    );
};

export default Layout;
