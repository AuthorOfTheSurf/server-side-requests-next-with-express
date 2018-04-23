# Server-Side Requests by wrapping Next.JS in an Express server

### Intent

For my current project at work I need to ensure that all requests come from the server side. I posted a question on [Stack Overflow]( https://stackoverflow.com/questions/49950309/next-js-how-to-make-all-requests-server-side ) that states this same requirement.

This example shows how I solved the problem and got all requests to occur server-side.

The starting point for this example was Zeit's `custom-server-express` Next.JS [example]( https://github.com/zeit/next.js/tree/canary/examples/custom-server-express )

### To Run

Install dependencies:

```bash
yarn
```

Run app:

```bash
yarn dev
```

Visit page at `localhost:3000` and click around. Take a look at the comments in the code, as well as your browser and terminal logs.

### Contributing

I want to keep this example as simple, correct, and informative as possible. If there are issues, or valuable improvements to be made, feel free to PR!
