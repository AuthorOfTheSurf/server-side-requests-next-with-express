const express = require("express");
const next = require("next");
const axios = require("axios");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare()
    .then(() => {
        const server = express();

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

            console.log(`[Server] /stars/${repo} requested!`);
            console.log(`[Server] fetching ${repoRoute}!`);
            axios
                .get(repoRoute)
                .then(response => {
                    const stars = response["data"]["stargazers_count"];
                    nextApp.render(req, res, "/stars", {
                        repoTitle,
                        stars,
                    });
                })
                .catch(reason => console.log(reason));
        });

        server.get("*", (req, res) => {
            return handle(req, res)
        });

        server.listen(port, (err) => {
            if (err) {
                throw err;
            }
            console.log(`> Ready on http://localhost:${port}`)
        });
    });
