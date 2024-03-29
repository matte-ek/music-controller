# Music Controller

![image](https://github.com/matte-ek/music-controller/assets/49276951/1a116c9b-5e15-4555-bb40-a3cffd56f185)

## Introduction

I wanted a "ok" looking simple music controller that could control Spotify and also any other music player on my system, and couldn't really find anything so I made my own. It uses [playerctl](https://github.com/altdesktop/playerctl) as the backend to figure out what's playing. 

This is also my first Electron app, so there's a high chance of stupidity going on code-wise. As for why Electron? I wanted to use HTML/CSS since designing it was easier that way, and I personally do not have any issues with the resource usage.

## Running

You'll need `node` and `npm` first.

* Install dependencies via `npm install`
* You should be able to just run it via `npm start`

As for further packaging the application, you can probably follow the guide [here.](https://www.electronjs.org/docs/latest/tutorial/quick-start#package-and-distribute-your-application)

## Usage

Should just work out of the box, you can tweak playerctl's command line arguments in the `main.js` file, for example excluding your browser via `-i chrome`.
