const express = require("express");
const next = require("next");
const axios = require("axios");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandle = nextApp.getRequestHandler();

nextApp.prepare()
    .then(() => {
        const server = express();

        // Express is handling requests to `/stars/...`
        server.get("/stars/:repo", (req, res) => {
            const { repo } = req.params;
            let repoTitle;
            let repoRoute;

            if (repo === "nextjs") {
                repoTitle = "Next.JS by Zeit";
                repoRoute = "https://api.github.com/repos/zeit/next.js";
            } else if (repo === "react") {
                repoTitle = "React by Facebook";
                repoRoute = "https://api.github.com/repos/facebook/react";
            } else {
                return nextApp.render(req, res, "/stars", { repoTitle: undefined });
            }

            // You should ONLY see these console.logs with `[Server]` in them
            // on the server-side. I.e. you should only see these logs in your
            // terminal, and NOT in your browser console.
            // You may have to scroll up from the `Compiled successfully in 566ms`
            // messages since the page will be build the first time.
            console.log(`[Server] /stars/${repo} requested!`);
            console.log(`[Server] fetching ${repoRoute}!`);
            // You should NOT see this request be sent from your browser (check
            // "networks" tab in Chrome) because this request is being sent from
            // the node/express server
            axios
                .get(repoRoute)
                .then(response => {
                    const stars = response["data"]["stargazers_count"];
                    // Manually have Next.JS render the page, this is how we are
                    // wrapping Next.JS in an express server.
                    nextApp.render(req, res, "/stars", {
                        repoTitle,
                        stars,
                    });
                })
                .catch(reason => console.log(reason));
        });

        // Allow Next to handle all other routes:
        // - Includes the numerous `/_next/...` routes which must be exposed
        //   for the next app to work correctly
        // - Includes 404'ing on unknown routes
        server.get("*", (req, res) => {
            return nextHandle(req, res)
        });

        server.listen(port, (err) => {
            if (err) {
                throw err;
            }
            console.log(`> Ready on http://localhost:${port}`)
        });
    });
