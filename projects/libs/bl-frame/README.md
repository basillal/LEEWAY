### BlFrameComponent

## Description

The `BlFrameComponent` is a versatile Angular component designed to support multiple layout styles for displaying content in various formats. It provides a flexible and customizable framework for building user interfaces, such as grids, tabs, wizards, modals, and more. The component is highly configurable through inputs like `layoutStyle`, `theme`, `tabs`, and `wizardSteps`, making it suitable for a wide range of applications.

## Layouts

The `BlFrameComponent` supports the following layout styles, each tailored for specific use cases:

### 1. Grid Layout

- **Description**: Displays content in a responsive grid format, ideal for dashboards or lists of items.
- **Use Case**: Use when you need to present multiple items in a tiled layout, such as product cards or dashboard widgets.
- **Content Projection**: Uses `<ng-content select="[grid-view-content]"></ng-content>` to project grid items.

### 2. Small Layout

- **Description**: A compact version of the grid layout with a simpler structure, suitable for smaller datasets or minimalistic views.
- **Use Case**: Best for displaying a single list or a small set of items with a clean, minimal design.
- **Content Projection**: Uses `<ng-content select="[grid-view-content]"></ng-content>`.

### 3. Create Layout

- **Description**: Not fully implemented in the provided code, but intended for creating new items or forms.
- **Use Case**: Suitable for form-based interfaces where users input data to create new entities.
- **Content Projection**: Expects `<ng-content select="[create-view-content]"></ng-content>`.

### 4. Modal Layout

- **Description**: Displays content in a centered modal overlay, perfect for dialogs or popups.
- **Use Case**: Use for forms, alerts, or content that requires focused user attention.
- **Content Projection**: Uses `<ng-content select="[create-view-content]"></ng-content>`.

### 5. Tabbed Layout

- **Description**: Organizes content into tabs, allowing users to switch between different views.
- **Use Case**: Ideal for categorizing related content, such as settings panels or multi-section forms.
- **Content Projection**: Uses `<ng-template tabContent tabName="Tab Name">` to define tab content.

### 6. Sidebar Layout

- **Description**: Features a sidebar with navigation and a main content area.
- **Use Case**: Suitable for applications requiring persistent navigation, such as admin dashboards.
- **Content Projection**: Uses `<ng-content select="[tab-view-content]"></ng-content>` for the main content.

### 7. Card Stack Layout

- **Description**: Displays content in a stacked card format, emphasizing vertical arrangement.
- **Use Case**: Best for showcasing sequential or layered content, like a list of articles or tasks.
- **Content Projection**: Uses `<ng-content select="[grid-view-content]"></ng-content>`.

### 8. Wizard Layout

- **Description**: Guides users through a multi-step process with numbered steps.
- **Use Case**: Ideal for onboarding flows, multi-step forms, or guided processes.
- **Content Projection**: Uses `<ng-template wizardStep stepIndex="0">` to define step content.

### 9. Split Pane Layout

- **Description**: Divides content into two panes (left and right) for side-by-side viewing.
- **Use Case**: Useful for comparing data or showing related content, like a file explorer.
- **Content Projection**: Uses `<ng-content select="[left-pane]"></ng-content>` and `<ng-content select="[right-pane]"></ng-content>`.

### 10. Timeline Layout

- **Description**: Presents content along a vertical timeline with a visual marker.
- **Use Case**: Great for displaying chronological events or milestones.
- **Content Projection**: Uses `<ng-content select="[timeline-item]"></ng-content>`.

### 11. Kanban Layout

- **Description**: Organizes content into columns, resembling a Kanban board.
- **Use Case**: Perfect for task management or workflow visualization.
- **Content Projection**: Uses `<ng-content select="[kanban-column]"></ng-content>`.

### 12. Dashboard Layout

- **Description**: Arranges content in a grid optimized for displaying statistics or widgets.
- **Use Case**: Best for dashboards with multiple data visualizations or metrics.
- **Content Projection**: Uses `<ng-content select="[stat-card]"></ng-content>`.

### 13. Accordion Layout

- **Description**: Displays collapsible sections for organized content presentation.
- **Use Case**: Suitable for FAQs, settings, or content that benefits from expandable sections.
- **Content Projection**: Uses `<ng-content select="[accordion-item]"></ng-content>`.

### 14. Form Wizard Layout

- **Description**: Combines a sidebar with step navigation and a content area for multi-step forms.
- **Use Case**: Ideal for complex forms requiring step-by-step navigation.
- **Content Projection**: Uses `<ng-content select="[wizard-step-content]"></ng-content>`.

## Variables

The component accepts several inputs to customize its behavior and appearance:

### Inputs

- `layoutStyle` (`string`): Determines the layout type. Options: `grid`, `small`, `create`, `modal`, `tabbed`, `sidebar`, `card-stack`, `wizard`, `split-pane`, `timeline`, `kanban`, `dashboard`, `accordion`, `form-wizard`. Default: `grid`.
- `theme` (`Theme`): Customizes the visual appearance. Properties:
  - `themeColor`: Background color for the layout (default: `#f9fafb`).
  - `themeTextColor`: Text color (default: `#1f2937`).
  - `cardBackgroundColor`: Background color for cards (default: `#ffffff`).
  - `themeAccentColor`: Accent color for buttons and highlights (default: `#0d9488`).
  - `borderRadius`: Border radius for elements (default: `0.5rem`).
  - `gridShadow`: Box shadow for cards (default: `0 4px 6px rgba(0, 0, 0, 0.1)`).
  - `showShadow`: Toggles shadow visibility (default: `true`).
  - `minHeight`: Minimum height of the container (default: `400px`).
  - `maxHeight`: Maximum height of the container (optional).
  - `containerHeight`: Container height (default: `100%`).
  - `containerWidth`: Container width (default: `100%`).
  - `transition`: CSS transition effect (default: `all 0.3s ease`).
- `title` (`string`): Title displayed in the layout header (default: `''`).
- `tabs` (`string[]`): Array of tab names for `tabbed` and `sidebar` layouts (default: `['Tab 1', 'Tab 2', 'Tab 3']`).
- `wizardSteps` (`string[]`): Array of step names for `wizard` and `form-wizard` layouts (default: `['Step 1', 'Step 2', 'Step 3']`).
- `currentStepIndex` (`number`): Current step index for `wizard` and `form-wizard` layouts (default: `0`).
- `containerWidth` (`string`): Overrides `theme.containerWidth` (default: `100%`).
- `containerHeight` (`string`): Overrides `theme.containerHeight` (default: `auto`).
- `minHeight` (`string`): Overrides `theme.minHeight` (default: `400px`).
- `showShadow` (`boolean`): Overrides `theme.showShadow` (default: `true`).

### Outputs

- `createClicked`: Emitted when the create button is clicked in `grid` or `small` layouts.
- `backClicked`: Emitted when the close button is clicked in the `modal` layout.

## How to Use

1. **Import the Module**: Ensure the `BlFrameModule` is imported into your application module.

   ```typescript
   import { NgModule } from '@angular/core';
   import { BrowserModule } from '@angular/platform-browser';
   import { BlFrameModule } from './bl-frame/bl-frame.module';
   import { AppComponent } from './app.component';
   
   @NgModule({
     declarations: [AppComponent],
     imports: [BrowserModule, BlFrameModule],
     bootstrap: [AppComponent],
   })
   export class AppModule {}
   ```

2. **Add Font Awesome** (if using icons): Include Font Awesome in your `index.html` or via npm.

   ```html
   <script src="https://kit.fontawesome.com/your-kit-id.js" crossorigin="anonymous"></script>
   ```

3. **Define CSS Variables**: Ensure the `--accent-color` CSS variable is defined in your `styles.css` or component styles.

   ```css
   :root {
     --accent-color: #0d9488;
   }
   ```

4. **Use the Component**: Use the `<bl-frame>` component in your template with the desired `layoutStyle` and inputs. Provide content via `ng-content` or `ng-template` as required by the layout.

## Example Usage

Below are examples for each layout, demonstrating how to use the `BlFrameComponent` with content projection.

### Grid Layout

```html
<bl-frame layoutStyle="grid" title="Grid Layout Example" [theme]="{ minHeight: '600px' }">
  <div grid-view-content>
    <div class="p-4 bg-white rounded shadow">Item 1</div>
    <div class="p-4 bg-white rounded shadow">Item 2</div>
    <div class="p-4 bg-white rounded shadow">Item 3</div>
  </div>
</bl-frame>
```

### Small Layout

```html
<bl-frame layoutStyle="small" title="Small Layout Example">
  <div grid-view-content>
    <div class="p-4 bg-white rounded shadow">Single Item</div>
  </div>
</bl-frame>
```

### Modal Layout

```html
<bl-frame layoutStyle="modal" title="Modal Example">
  <div create-view-content>
    <p>This is the modal content.</p>
    <button>Submit</button>
  </div>
</bl-frame>
```

### Tabbed Layout

```html
<bl-frame layoutStyle="tabbed" title="Tabbed Layout Example" [tabs]="['Profile', 'Settings']">
  <ng-template tabContent tabName="Profile">
    <div class="p-4">Profile content goes here.</div>
  </ng-template>
  <ng-template tabContent tabName="Settings">
    <div class="p-4">Settings content goes here.</div>
  </ng-template>
</bl-frame>
```

### Sidebar Layout

```html
<bl-frame layoutStyle="sidebar" title="Sidebar Example" [tabs]="['Home', 'Profile']">
  <div tab-view-content>
    <div class="p-4">Main content for the selected tab.</div>
  </div>
</bl-frame>
```

### Card Stack Layout

```html
<bl-frame layoutStyle="card-stack" title="Card Stack Example">
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
    <div class="p-4">Personal information form.</div>
  </ng-template>
  <ng-template wizardStep stepIndex="1">
    <div class="p-4">Contact information form.</div>
  </ng-template>
  <ng-template wizardStep stepIndex="2">
    <div class="p-4">Review your details.</div>
  </ng-template>
</bl-frame>
```

### Split Pane Layout

```html
<bl-frame layoutStyle="split-pane" title="Split Pane Example">
  <div left-pane>
    <p>Left pane content.</p>
  </div>
  <div right-pane>
    <p>Right pane content.</p>
  </div>
</bl-frame>
```

### Timeline Layout

```html
<bl-frame layoutStyle="timeline" title="Timeline Example">
  <div timeline-item>
    <div class="p-4 bg-white rounded shadow">Event 1</div>
    <div class="p-4 bg-white rounded shadow">Event 2</div>
  </div>
</bl-frame>
```

### Kanban Layout

```html
<bl-frame layoutStyle="kanban" title="Kanban Example">
  <div kanban-column>
    <div class="p-4 bg-white rounded shadow">To Do</div>
    <div class="p-4 bg-white rounded shadow">In Progress</div>
    <div class="p-4 bg-white rounded shadow">Done</div>
  </div>
</bl-frame>
```

### Dashboard Layout

```html
<bl-frame layoutStyle="dashboard" title="Dashboard Example">
  <div stat-card>
    <div class="p-4 bg-white rounded shadow">Stat 1</div>
    <div class="p-4 bg-white rounded shadow">Stat 2</div>
  </div>
</bl-frame>
```

### Accordion Layout

```html
<bl-frame layoutStyle="accordion" title="Accordion Example">
  <div accordion-item>
    <div class="p-4 bg-white rounded shadow">Section 1</div>
    <div class="p-4 bg-white rounded shadow">Section 2</div>
  </div>
</bl-frame>
```

### Form Wizard Layout

```html
<bl-frame layoutStyle="form-wizard" title="Form Wizard Example" [wizardSteps]="['Step 1', 'Step 2']">
  <div wizard-step-content>
    <div class="p-4">Content for the current step.</div>
  </div>
</bl-frame>
```

## Dependencies

- **Angular**: Ensure you’re using Angular 16+ for modern features like standalone directives.
- **Font Awesome**: Required for icons (e.g., `fa-circle-plus`, `fa-xmark`). Include via CDN or npm.
- **Tailwind CSS**: Used for styling in the template. Ensure Tailwind is configured in your project.

## Notes

- The `create` layout is not fully implemented in the provided code. Extend it as needed for your use case.
- Ensure `TabContentDirective` and `WizardStepDirective` are defined and included in the module.
- Use `ngAfterContentInit` logs to debug content projection issues.

Customize the `theme` input to match your application’s design system.