import React from "react";

// Not using Zeit's `Link` component here
// Using anchor tags with `href` hits the express server
// This will also allow backwards and forwards navigation
// in the browser to work
export default () => (
    <ul>
        <li>
            <a
                href="/stars/nextjs"
            >
                Next.JS Stars
            </a>
        </li>
        <li>
            <a
                href="/stars/react"
            >
                React Stars
            </a>
        </li>
    </ul>
)
