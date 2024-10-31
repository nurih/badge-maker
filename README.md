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
The frame image is hard coded into the app here: https://github.com/nurih/pass-badge-maker/blob/0722ded75bae298ca57aacefa4f5934d430cd6ac/src/App.vue#L28 , in the example here, the frame image is named `pass-badge.png`. The frame image should be placed in the [/public](/public) directory.
The image itself is a transparent PNG and will be overlayed on top of the uploaded headshot.

> Make sure the frame you use is suqare: _equal height and width_.

## Overlay
The current overlay slaps the frame on the headshot and stretches or shrinks the headshot to the square dimension of the frame. To avoid distortion, use a square headshot.

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
