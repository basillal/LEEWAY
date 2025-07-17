# BlFrameComponent

[![npm version](https://img.shields.io/npm/v/bl-frame.svg)](https://www.npmjs.com/package/bl-frame)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/your-github-username/bl-frame)](https://github.com/your-github-username/bl-frame/issues)
[![GitHub stars](https://img.shields.io/github/stars/your-github-username/bl-frame)](https://github.com/your-github-username/bl-frame)

## What is BlFrameComponent?

`BlFrameComponent` is an easy-to-use Angular component library that helps you create beautiful and flexible layouts for your web apps. It supports 14 different layouts, like grids, tabs, wizards, and modals, all styled with Tailwind CSS. Whether you're building a dashboard, a form, or a task board, this component makes it simple to create modern, responsive interfaces..

## Why Choose BlFrameComponent?

- **Multiple Layouts**: Pick from 14 layouts (grid, tabs, wizard, etc.) to match your needs.
- **Easy Styling**: Uses Tailwind CSS for quick and customizable designs..
- **Flexible**: Customize colors, sizes, and transitions with a simple `theme` object.
- **Open Source**: Free to use, modify, and contribute to on [GitHub](https://github.com/your-github-username/bl-frame).
- **Community-Friendly**: Join other developers to improve and share ideas.

## Quick Start

Get started in just a few steps:

1. **Install the package**:
   ```bash
   npm install bl-frame 
   ```

2. **Add to your Angular app**:
   ```typescript
   import { NgModule } from '@angular/core';
   import { BrowserModule } from '@angular/platform-browser';
   import { BlFrameModule } from 'bl-frame';
   import { AppComponent } from './app.component';

   @NgModule({
     declarations: [AppComponent],
     imports: [BrowserModule, BlFrameModule],
     bootstrap: [AppComponent],
   })
   export class AppModule {}
   ```

3. **Set up Tailwind CSS**:
   Follow the [Tailwind CSS guide for Angular](https://tailwindcss.com/docs/guides/angular) to add Tailwind to your project.

4. **Add Font Awesome** (for icons):
   Include in your `index.html`:
   ```html
   <script src="https://kit.fontawesome.com/your-kit-id.js" crossorigin="anonymous"></script>
   ```

5. **Add CSS variable**:
   In your `styles.css`:
   ```css
   :root {
     --accent-color: #0d9488;
   }
   ```

6. **Use in your template**:
   ```html
   <bl-frame layoutStyle="grid" title="My Grid">
     <div grid-view-content>
       <div class="p-4 bg-white rounded shadow">Item 1</div>
       <div class="p-4 bg-white rounded shadow">Item 2</div>
     </div>
   </bl-frame>
   ```

## Available Layouts

Here’s a simple breakdown of the 14 layouts you can use, what they’re for, and how to add content:

### 1. Grid Layout
- **What it does**: Shows content in a grid, like a dashboard.
- **Best for**: Product cards, dashboard widgets, or lists.
- **How to add content**: Use `<div grid-view-content>`.

### 2. Small Layout
- **What it does**: A simpler grid for fewer items.
- **Best for**: Small lists or minimal displays.
- **How to add content**: Use `<div grid-view-content>`.

### 3. Create Layout
- **What it does**: For creating new items or forms (not fully built yet).
- **Best for**: Data entry forms.
- **How to add content**: Use `<div create-view-content>`.

### 4. Modal Layout
- **What it does**: Shows content in a popup window.
- **Best for**: Forms, alerts, or focused tasks.
- **How to add content**: Use `<div create-view-content>`.

### 5. Tabbed Layout
- **What it does**: Organizes content into clickable tabs.
- **Best for**: Settings panels or multi-section forms.
- **How to add content**: Use `<ng-template tabContent tabName="Tab Name">`.

### 6. Sidebar Layout
- **What it does**: Adds a sidebar menu with a main content area.
- **Best for**: Dashboards or apps with navigation.
- **How to add content**: Use `<div tab-view-content>`.

### 7. Card Stack Layout
- **What it does**: Stacks content vertically in cards.
- **Best for**: Articles, tasks, or sequential content.
- **How to add content**: Use `<div grid-view-content>`.

### 8. Wizard Layout
- **What it does**: Guides users through steps with numbered buttons.
- **Best for**: Onboarding or multi-step forms.
- **How to add content**: Use `<ng-template wizardStep stepIndex="0">`.

### 9. Split Pane Layout
- **What it does**: Splits content into two side-by-side sections.
- **Best for**: Comparing data or showing related content.
- **How to add content**: Use `<div left-pane>` and `<div right-pane>`.

### 10. Timeline Layout
- **What it does**: Shows content along a vertical timeline.
- **Best for**: Events, milestones, or histories.
- **How to add content**: Use `<div timeline-item>`.

### 11. Kanban Layout
- **What it does**: Creates columns like a Kanban board.
- **Best for**: Task management or workflows.
- **How to add content**: Use `<div kanban-column>`.

### 12. Dashboard Layout
- **What it does**: Displays stats or widgets in a grid.
- **Best for**: Data dashboards or metrics.
- **How to add content**: Use `<div stat-card>`.

### 13. Accordion Layout
- **What it does**: Shows collapsible sections.
- **Best for**: FAQs or expandable settings.
- **How to add content**: Use `<div accordion-item>`.

### 14. Form Wizard Layout
- **What it does**: Combines a sidebar with step-based content.
- **Best for**: Complex, multi-step forms.
- **How to add content**: Use `<div wizard-step-content>`.

## Customization Options

You can tweak the look and feel using these inputs:

### Inputs
- `layoutStyle` (string): Choose the layout type (e.g., `grid`, `tabbed`). Default: `grid`.
- `theme` (object): Customize colors, sizes, and effects:
  - `themeColor`: Background color (default: `#f9fafb`).
  - `themeTextColor`: Text color (default: `#1f2937`).
  - `cardBackgroundColor`: Card background (default: `#ffffff`).
  - `themeAccentColor`: Highlight color (default: `#0d9488`).
  - `borderRadius`: Corner roundness (default: `0.5rem`).
  - `gridShadow`: Shadow effect (default: `0 4px 6px rgba(0, 0, 0, 0.1)`).
  - `showShadow`: Show/hide shadow (default: `true`).
  - `minHeight`: Minimum height (default: `400px`).
  - `maxHeight`: Maximum height (optional).
  - `containerHeight`: Container height (default: `100%`).
  - `containerWidth`: Container width (default: `100%`).
  - `transition`: Animation effect (default: `all 0.3s ease`).
- `title` (string): Title for the layout header (default: `''`).
- `tabs` (string[]): Names for tabs in `tabbed` or `sidebar` layouts (default: `['Tab 1', 'Tab 2', 'Tab 3']`).
- `wizardSteps` (string[]): Names for steps in `wizard` or `form-wizard` layouts (default: `['Step 1', 'Step 2', 'Step 3']`).
- `currentStepIndex` (number): Current step in wizards (default: `0`).
- `containerWidth` (string): Overrides `theme.containerWidth` (default: `100%`).
- `containerHeight` (string): Overrides `theme.containerHeight` (default: `auto`).
- `minHeight` (string): Overrides `theme.minHeight` (default: `400px`).
- `showShadow` (boolean): Overrides `theme.showShadow` (default: `true`).

### Outputs
- `createClicked`: Triggered when the create button is clicked (`grid`, `small`).
- `backClicked`: Triggered when the close button is clicked (`modal`).

## Example Code for All Layouts

### Grid Layout
```html
<bl-frame layoutStyle="grid" title="My Grid" [theme]="{ minHeight: '600px' }">
  <div grid-view-content>
    <div class="p-4 bg-white rounded shadow">Item 1</div>
    <div class="p-4 bg-white rounded shadow">Item 2</div>
  </div>
</bl-frame>
```

### Small Layout
```html
<bl-frame layoutStyle="small" title="Small Layout">
  <div grid-view-content>
    <div class="p-4 bg-white rounded shadow">Single Item</div>
  </div>
</bl-frame>
```

### Modal Layout
```html
<bl-frame layoutStyle="modal" title="Modal Example">
  <div create-view-content>
    <p>Modal content goes here.</p>
    <button>Submit</button>
  </div>
</bl-frame>
```

### Tabbed Layout
```html
<bl-frame layoutStyle="tabbed" title="Tabbed Layout" [tabs]="['Profile', 'Settings']">
  <ng-template tabContent tabName="Profile">
    <div class="p-4">Profile details.</div>
  </ng-template>
  <ng-template tabContent tabName="Settings">
    <div class="p-4">Settings options.</div>
  </ng-template>
</bl-frame>
```

### Sidebar Layout
```html
<bl-frame layoutStyle="sidebar" title="Sidebar Example" [tabs]="['Home', 'Profile']">
  <div tab-view-content>
    <div class="p-4">Content for selected tab.</div>
  </div>
</bl-frame>
```

### Card Stack Layout
```html
<bl-frame layoutStyle="card-stack" title="Card Stack">
  <div grid-view-content>
    <div class="p-4 bg-white rounded shadow">Card 1</div>
    <div class="p-4 bg-white rounded shadow">Card 2</div>
  </div>
</bl-frame>
```

### Wizard Layout
```html
<bl-frame layoutStyle="wizard" title="Wizard Example" [wizardSteps]="['Personal', 'Contact', 'Review']">
  <ng-template wizardStep stepIndex="0">
    <div class="p-4">Enter personal info.</div>
  </ng-template>
  <ng-template wizardStep stepIndex="1">
    <div class="p-4">Enter contact info.</div>
  </ng-template>
  <ng-template wizardStep stepIndex="2">
    <div class="p-4">Review your info.</div>
  </ng-template>
</bl-frame>
```

### Split Pane Layout
```html
<bl-frame layoutStyle="split-pane" title="Split Pane">
  <div left-pane>
    <p>Left side content.</p>
  </div>
  <div right-pane>
    <p>Right side content.</p>
  </div>
</bl-frame>
```

### Timeline Layout
```html
<bl-frame layoutStyle="timeline" title="Timeline">
  <div timeline-item>
    <div class="p-4 bg-white rounded shadow">Event 1</div>
    <div class="p-4 bg-white rounded shadow">Event 2</div>
  </div>
</bl-frame>
```

### Kanban Layout
```html
<bl-frame layoutStyle="kanban" title="Kanban Board">
  <div kanban-column>
    <div class="p-4 bg-white rounded shadow">To Do</div>
    <div class="p-4 bg-white rounded shadow">In Progress</div>
  </div>
</bl-frame>
```

### Dashboard Layout
```html
<bl-frame layoutStyle="dashboard" title="Dashboard">
  <div stat-card>
    <div class="p-4 bg-white rounded shadow">Stat 1</div>
    <div class="p-4 bg-white rounded shadow">Stat 2</div>
  </div>
</bl-frame>
```

### Accordion Layout
```html
<bl-frame layoutStyle="accordion" title="Accordion">
  <div accordion-item>
    <div class="p-4 bg-white rounded shadow">Section 1</div>
    <div class="p-4 bg-white rounded shadow">Section 2</div>
  </div>
</bl-frame>
```

### Form Wizard Layout
```html
<bl-frame layoutStyle="form-wizard" title="Form Wizard" [wizardSteps]="['Step 1', 'Step 2']">
  <div wizard-step-content>
    <div class="p-4">Content for the current step.</div>
  </div>
</bl-frame>
```

## Dependencies

- **Angular**: Version 16.2.0 or higher.
- **Tailwind CSS**: Version 3.4.15 or higher, with PostCSS and Autoprefixer.
- **Font Awesome**: For icons like `fa-circle-plus` and `fa-xmark`.

## Contributing

We’d love your help to make `BlFrameComponent` better! Here’s how to contribute:

1. Fork the repo: [https://github.com/your-github-username/bl-frame](https://github.com/your-github-username/bl-frame).
2. Create a branch: `git checkout -b feature/your-feature`.
3. Make changes and commit: `git commit -m 'Add your feature'`.
4. Push to GitHub: `git push origin feature/your-feature`.
5. Open a pull request.

Please follow the Angular style guide and add tests if possible.

## Report Issues

Found a bug or want a new feature? Create an issue on [GitHub](https://github.com/your-github-username/bl-frame/issues).

## Author

- **Name**: BASIL LAL
- **GitHub**: [https://github.com/basillal](https://github.com/basillal)
- **LinkedIn**: [www.linkedin.com/in/basil-lal-556361244](www.linkedin.com/in/basil-lal-556361244)
- **Email**: basillal1010@egmail.com

## Get Involved

- ⭐ **Star the repo** on [GitHub](https://github.com/your-github-username/bl-frame) to show support!
- 📢 **Share it** on [LinkedIn](), Twitter, or developer communities.
- 💬 **Join the conversation**: Share ideas or ask questions via GitHub issues or email.

## License

This project is licensed under the [LEEWAY](LEEWAY).