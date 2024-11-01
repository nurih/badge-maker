# Pass Badge Maker

This app that generates a "badge" from a frame image and a headshot. 

It is intended to create framed headshot of the kind used for temporary or permanent avatars on social networks.


Given a headshot / photo:

```shell

   ( ❛ ͜ʖ ❛ )
  ___  | __/
       |
    _/   \_

```

And a frame:

```shell
¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
¶              ¶
¶              ¶
¶              ¶
¶              ¶
¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
```
It will produce a combined image that you can download and use as your LinkedIn avatar or whatnot.

```shell
¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
¶   ( ❛ ͜ʖ ❛ )   ¶
¶  ___  | __/  ¶
¶       |      ¶
¶    _/   \_   ¶
¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

```

## Headshot Selection
Users upload their headshot from their device. The headshot is not stored on disk and there is no server-side code or network transmission occuring beyond loading of the app into the browser initially.

> Make sure the headshot you upload is suqare: _equal height and width_. 

## Frame choice

Frame image files should be placed in the folder [/public](/public).

The frame image used by the app is determined by the environment variable `VITE_BADGEMAKER_FRAME_URI`. It is set at build time.

The image name corresponds to the file name of the transparent PNG file. 

> Make sure the frame you use is suqare: _equal height and width_.

## Overlay Process

The current overlay slaps the frame on the headshot and stretches or shrinks the headshot to the square dimension of the frame. The image is drawn to the lesser of the height and width dimensions, wich may lead to cropping if images are not square. To avoid distortion, use a square headshot. Images are aligned to the top left corner.

## Demo / Run

The current build is hosted at [https://pass2024-badge-maker.netlify.app/](https://pass2024-badge-maker.netlify.app/). It uses an embedded frame.

You can build and run your own host:

### Get the code
```bash
git clone git@github.com:nurih/pass-badge-maker.git
cd pass-badge-maker
```

### Build / Run

Using `NPM`
```bash
npm install
npm run dev
```

Using `Bun`
```bash
bun install
bun run dev
```
