
# youtube-experiment
This is a simple experiment that compares the average views a youtuber has and compares that 
to the amount of subscribers they have. In an ideal world, the average view count should be 
close to the subscriber count because subscribers are "guaranteed" views.

Now, I'm no math major and I don't really know what this data really means and if I can even 
call it accurate, but it sure is interesting.

## The Results

I ran this simple program against 7 of the top youtubers and 7 youtubers from my own 
subscription I often watch. I set the video_fetch_limit to 20, so it only averaged the 
view count of 20 videos for each youtuber. The results were quite interesting

```
Youtuber: hotdiggedydemon       Ratio: 363.34%
Youtuber: JonTronShow           Ratio: 123.08%
Youtuber: HolaSoyGerman         Ratio: 71.46%
Youtuber: SecretAgentBob        Ratio: 43.36%
Youtuber: VanossGaming          Ratio: 42.6%
Youtuber: ashens                Ratio: 31.61%
Youtuber: jacksfilms            Ratio: 30.24%
Youtuber: nigahiga              Ratio: 28.77%
Youtuber: ExtraCreditz          Ratio: 21.48%
Youtuber: Smosh                 Ratio: 11.13%
Youtuber: GameGrumps            Ratio: 9.25%
Youtuber: PewDiePie             Ratio: 5.5%
Youtuber: RayWilliamJohnson     Ratio: 5.11%
Youtuber: Machinima             Ratio: 0.95%
```

The "Ratio" is the `averageViewCount / subscriberCount` shown as a percent.

## What does this mean?

I don't know! :D

# Usage

This program uses node.

To run, clone this repo and modify the experiment.js file so you can set your own Youtube 
API key.

Once you set the API key, you can run:

```
node experiment.js -t
```

to run the sample test from above.

You can also get the "Ratio" for any youtuber by doing

```
node experiment.js <username> [video_fetch_limit:default=20]
```

# License

```
Copyright (c) 2015 Eddie Penta

Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software 
without restriction, including without limitation the rights to use, copy, modify, merge, 
publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons 
to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or 
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.
```

