[//]: # (TITLE Blender)
[//]: # (ENDPOINT /blender)
[//]: # (PRIORITY 69)

# Blender

Blender is a free and open-source 3D creation suite.

Render ideas:

- [ ] Bri's magic game assets
- [ ] Spinning seal spinning in different envs
- [ ] More donuts for a donut shop website
- [ ] Pollypocket-like DS
- [ ] Me and Bri ACNL style

## 1 - The interface

Blender's interface is separated into three main parts:

- The <span style="color: var(--pink); font-weight: 700">Topbar</span> at the very top, consists of the main menu, which is used for saving, importing and exporting files, configuring settings, and rendering among other functions.
- **Areas** in the middle, which is the main workspace.
- The <span style="color: var(--blue); font-weight: 700">Status Bar</span> at the bottom, which displays shortcut suggestions and relevant statistics.

![center-eg-50](blenderinterface.png)

The top bar is separated into (left to right):

- **Menus** (Blender, File, Edit, Render, Window, Help).
- **Workspaces**: predefined window layouts. Each Workspace consists of a set of Areas containing Editors, and is geared towards a specific task such as modeling, animating, or scripting.
- **Scenes & Layers**: used to select the current Scene and View Layer.

To the right of the area, you can find tne outliners, which contains a list of all the objects in your scene. You can select objects by clicking their name.

## 2 - Basics

By default, you get 3 objects:

![center-eg-50](blender-objs.png)

When you render the project (Render Menu > Render or `F12`), you see the scene with lighting information and through that camera.

To see what the camera sees in the viewport, press numpad `0`.

### 2.1 - Move, rotate and scale

- To **grab** an object and move it around, press `G`.
- To **rotate**, press `R`.
- To **scale**, press `S`.
- To handle all three and **transform** the object, press `T`.

Modifiers:

- `x`, `y`, `z`: move along an axis.
- `middle-click` hold: snap to the closest axis.
- `Ctrl`: snap to discreet steps.
- `Shift`: more precision. Also works with value sliders.
- `Ctrl + Shift`: snap with precision.

### 2.2 - Moving in the scene

To orbit around the cursor ![tiny inline](cursor.png):

- Mouse: middle click.
- Trackpad: two fingers.
- Orbitting gizmo ![tiny inline](gizmo.png): at the top right of the area.

Modifiers:

- `Shift`: move in the scene.
- `Ctrl`: zoom in-out.

To move to the selcted object:

- `~` > View selected.
- numpad `.`.

To free move the camera: `Shift` + `~` .

## 3 - Adding and editing objects

### 3.1 - Adding new objects

In object mode:

- To add an object: `Shift + A`.
- To adjust the mesh, use the options in the small panel that opened on the bottom left. If you clicked away, press `F9` to pop up the panel.
- To see the object's details, press `N`.

### 3.2 - Shading

In object mode:

- To **scale your object**: `Ctrl` + `A` > Scale.
- To smooth the shading: right click + Shade smooth.
- To add more polygons: right-side panel > Modifiers menu > Generate > Subdivision surface.

![medium center](modifiers.png)

### 3.3 - Editing the mesh

> 4 points make a face. The lines between points are vertices.

**To switch to Mesh Mode: `Tab`.**

Moving points:

- To move points: select them and press `G`.
- To apply modifications to nearby points also, activate Proportional Editing by pressing `O`. After pressing `G`, adjust the strength with `WheelUp`/`WheelDown`, or `PageUp`/`PageDown`, or via the menu (top of the area).
  ![medium center](proportional.png)
- To move a point along the axis which the points are facing: `Alt/Opt` + `S`.

Modifying the mesh:

- To select points through the object, activate x-ray view: `Alt/Opt` + `Z`.
- To duplicate a mesh: select all the points, top of the area Mesh > Duplicate, and `Esc` to place the duplicate on top. 
- To make the duplicate mesh into its own object: `P` > By selection.
- To add faces around selected points: use Bevel.

### 3.4 - Adding Modifiers

In Object Mode:

- To fill in the space between the duplicate and the objects: Mofifiers > Solidify. Offset > 1. Make sure the solidify modifier is first.
- De-select Edit Mode on a modifier to modify the mesh under it more easily.
- To modify a mesh and have it snap to the face that's under it, modify the behavior of `Ctrl`: Snap ![small inline](snap.png) > Face Nearest > Snap to same target. Hold `Ctrl` while grabbing to cancel it.

## 4 - Sculpt Mode

Use `F` and move the mouse to adjust the radius.

Use `Ctrl` to inverse the depth of the tool.

Smooth, grab, inflate <3.

## 5 - Shading

After selecting the object, click the Material tab ![tiny inline](material.png). Add a new material.

Roughness: shininess.

Subsurface: transparency.

To add a pre-made texture: circle next to Base Color ![tiny inline](base-color.png) > Image Texture.

## 5 - Rendering

`f12`

## ? - Selection cheatsheet

| Macro                         | Selects... |
|-------------------------------|------------|
| `Alt/Opt` + `Shift` + L click | Edge loop  |
|                               |            |

## ? - Tips

- Use `Shift` and `Ctrl` on sliders to incrementally change their value.
