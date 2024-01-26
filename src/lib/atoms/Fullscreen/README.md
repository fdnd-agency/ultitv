# Fullscreen

The Fullscreen component is a component in which you can toggle slotted elements to fullscreen.

## Import

### Basic

```svelte
<script>
    import { Fullscreen } from '$lib';
</script>

<Fullscreen>
    I want to be able to display this in fullscreen.
</Fullscreen>
```

### Without keyboard support

```svelte
<script>
    import { Fullscreen } from '$lib';
</script>

<Fullscreen keyboardShortcutEnabled={false}>
    I want to be able to display this in fullscreen.
</Fullscreen>
```

## Properties

| Name                    | Type    | Default | Description                                       |
| ----------------------- | ------- | ------- | ------------------------------------------------- |
| keyboardShortcutEnabled | boolean | true    | Enable the `f` shortcut to toggle the fullscreen. |

## Accessibility

This component is an enhancement and will not work without JavaScript. When JavaScript is not available the component will not interfere with the core functionalities of the slotted elements and all elements required for the component will not be displayed to prevent confusion and not bother users wich will not be able to use it. The component also contains a check for browser support and will use the right method for each browser.

### Keyboard support

| Key | Function                    |
| --- | --------------------------- |
| f   | Toggle fullscreen shortcut. |

## Performance

This component is build with care and coution and does not contain any unnescessary HTML elements to prevent excessive DOM tree size. This component is written with the least possible JavaScript to prevent shipping large chunks to the client and cause a longer loading time.

## Dependencies

None.