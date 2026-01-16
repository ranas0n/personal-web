# Personal Web & Admin Dashboard

Hey there!

This is just a simple & casual project of mine. It's a personal website with an admin dashboard to help me manage content and play around with some tech. The goal of this project? Well, it's mostly about relearning some stuff like TypeScript, Next.js, Express.js, and how to write clean, maintainable code. I'm still working on the "clean" part, but hey, progress is progress.

I'm also using this project to learn planning out a soon-to-be-built app, working on diagrams, and even doing some UI design (which is surprisingly fun).

## What's Under the Hood?

- **>> Main Website <<**: Originally built with Next.js 12, but I refactored it to Next.js 14. It's hosted on Vercel and uses Docker for deployment options.
- **Admin Dashboard**: Built using React and Express.js. TypeScript is powering both projects for its type safety. You can check it out at this repo [https://github.com/ranas0n/personal-web-admin](https://github.com/ranas0n/personal-web-admin)
- **Database & Storage**: Both the main web and dashboard use PostgreSQL for the database, and Vercel Blob Storage for handling file uploads. Everything except the dashboard is hosted in the same project on Vercel.


Feel free to check it out or give some feedback if you want. Still a work in progress, but I'm having fun with it.

## Prerequisites
To use this repository, you will need the following installed locally:
- [Node.js](https://nodejs.org/)
- npm (should be installed with node)
- A container runtime, like [Docker](https://www.docker.com/)

Before you start, make sure to install the dependencies. Clone the repository and navigate to the directory:
```sh
git clone https://github.com/ranas0n/personal-web.git
cd personal-web
```

## Running the website locally using Node and Next.js
To build and test the website locally, run:
```sh
# Install dependencies
npm install

# Build & run website
npm build
npm run
```

## Running the website using Docker
To build the website with docker, run:
```sh
docker build -t personal-web .
```
Afterwards, to run the website, do:
```sh
docker run -p 3000:3000 personal-web
```

This will start the Next.js local server on port 3000. Open up your browser to https://localhost:3000 to view the website. As you make changes to components and pages, Next.js updates the website and forces a browser refresh.
