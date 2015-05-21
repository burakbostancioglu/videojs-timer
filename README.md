# Video.js Timer

A timer plugin for video.js.

## Getting Started

Once you've added the plugin script to your page, you can use it with any video:

```html
<script src="video.js"></script>
<script src="videojs-timer.js"></script>
<script>
  videojs(document.querySelector('video')).timer({"interval":15,"event_name":"test"});
</script>
```

There's also a [working example](example.html) of the plugin you can check out if you're having trouble.

## Documentation
### Plugin Options

You may pass in an options object to the plugin upon initialization. This
object may contain any of the following properties:

#### interval (required)
Desc: The interval that you want to tick your timer
Type: `integer`

#### event_name(required)
Desc: The name of the event for every tick
Type: `string`

P.S:
If your video is not mutiple of your interval, you will get one tick at the end.

### Testing

To install expected modules, from the command line run
>npm link

Then run tests from your browser

## Release History

 - 0.1.0: Initial release
