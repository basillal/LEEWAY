# 🧩 BlFrameComponent

A reusable Angular layout wrapper supporting 15+ layout styles with Tailwind-based theming. Simplify UI structure across views like dashboards, modals, tabs, wizards, and more.

---

## 🚀 Features

* ✅ 15+ flexible layout styles
* 🎨 Configurable themes with color, radius, and shadow support
* 📦 Dynamic content via `ng-content` and `ng-template`
* 🧭 Built-in support for tabs and wizards
* 🔁 Seamless layout switching using `layoutStyle` input
* 💡 Tailwind-based styling for responsive design

---

## 📦 Installation

```bash
npm install your-library-name
```

In your Angular module:

```ts
import { BlFrameModule } from 'your-library-name';

@NgModule({
  imports: [BlFrameModule]
})
export class AppModule {}
```

---

## 🎛️ Inputs

| Input              | Type         | Description                         |
| ------------------ | ------------ | ----------------------------------- |
| `layoutStyle`      | string       | One of the supported layout styles  |
| `title`            | string       | Optional layout heading             |
| `tabs`             | string\[]    | Tabs for tabbed/sidebar layout      |
| `wizardSteps`      | string\[]    | Steps for wizard/form-wizard layout |
| `currentStepIndex` | number       | Current step index in wizard        |
| `theme`            | Theme object | Customize layout styling            |
| `containerWidth`   | string       | Width of main container             |
| `containerHeight`  | string       | Height of main container            |
| `minHeight`        | string       | Minimum height                      |
| `showShadow`       | boolean      | Whether to display shadow           |

---

## 🎨 Theme Configuration

```ts
export interface Theme {
  themeColor: string;
  themeTextColor: string;
  cardBackgroundColor: string;
  themeAccentColor: string;
  borderRadius: string;
  gridShadow: string;
  showShadow: boolean;
  minHeight?: string;
  maxHeight?: string;
  containerHeight?: string;
  containerWidth?: string;
  transition?: string;
}
```

---

## 🧪 Example with Custom Theme

```html
<bl-frame
  [layoutStyle]="'grid'"
  [title]="'Custom Grid'"
  [theme]="{
    themeColor: '#f0fdf4',
    themeTextColor: '#065f46',
    cardBackgroundColor: '#ffffff',
    themeAccentColor: '#10b981',
    borderRadius: '1rem',
    gridShadow: '0 8px 20px rgba(0,0,0,0.1)',
    showShadow: true
  }">
  <div grid-view-content class="p-4">Custom Themed Card</div>
</bl-frame>
```

---

## 📚 Layout Examples

### `grid`

```html
<bl-frame layoutStyle="grid" [title]="'Grid View'">
  <div grid-view-content>Card 1</div>
  <div grid-view-content>Card 2</div>
</bl-frame>
```

### `small`

```html
<bl-frame layoutStyle="small" [title]="'Small Layout'">
  <div grid-view-content>Compact content</div>
</bl-frame>
```

### `create`

```html
<bl-frame layoutStyle="create" [title]="'Create View'">
  <form create-view-content>
    <!-- form inputs here -->
  </form>
</bl-frame>
```

### `modal`

```html
<bl-frame layoutStyle="modal" [title]="'Modal Title'">
  <div create-view-content>
    Modal body
  </div>
</bl-frame>
```

### `tabbed`

```html
<bl-frame layoutStyle="tabbed" [title]="'Tabbed UI'" [tabs]="['Overview', 'Details']">
  <ng-template [tabContent]="'Overview'">
    Overview tab content
  </ng-template>
  <ng-template [tabContent]="'Details'">
    Details tab content
  </ng-template>
</bl-frame>
```

### `sidebar`

```html
<bl-frame layoutStyle="sidebar" [tabs]="['Home', 'Settings']" [title]="'Sidebar Nav'">
  <div tab-view-content>
    Content for selected tab
  </div>
</bl-frame>
```

### `card-stack`

```html
<bl-frame layoutStyle="card-stack" [title]="'Cards'">
  <div grid-view-content>Stacked Card 1</div>
  <div grid-view-content>Stacked Card 2</div>
</bl-frame>
```

### `wizard`

```html
<bl-frame layoutStyle="wizard" [wizardSteps]="['Info', 'Confirm']" [currentStepIndex]="0">
  <ng-template wizard-step [stepIndex]="0">
    Step 1 content
  </ng-template>
  <ng-template wizard-step [stepIndex]="1">
    Step 2 content
  </ng-template>
</bl-frame>
```

### `split-pane`

```html
<bl-frame layoutStyle="split-pane">
  <div left-pane>Sidebar content</div>
  <div right-pane>Main content</div>
</bl-frame>
```

### `timeline`

```html
<bl-frame layoutStyle="timeline">
  <div timeline-item>Event A</div>
  <div timeline-item>Event B</div>
</bl-frame>
```

### `kanban`

```html
<bl-frame layoutStyle="kanban">
  <div kanban-column>Todo</div>
  <div kanban-column>In Progress</div>
</bl-frame>
```

### `dashboard`

```html
<bl-frame layoutStyle="dashboard">
  <div stat-card>Stat 1</div>
  <div stat-card>Stat 2</div>
</bl-frame>
```

### `accordion`

```html
<bl-frame layoutStyle="accordion">
  <div accordion-item>Section A</div>
  <div accordion-item>Section B</div>
</bl-frame>
```

### `form-wizard`

```html
<bl-frame layoutStyle="form-wizard" [wizardSteps]="['Step 1', 'Step 2']" [currentStepIndex]="0">
  <div wizard-step-content>
    Current form step content
  </div>
</bl-frame>
```

---

## 🧠 Developer Tips

* Use `[ngStyle]` and `theme` object for fine-grained UI control.
* Use `@ContentChildren` with directives for custom templates.
* To switch layout styles at runtime, bind `[layoutStyle]` to a variable.

---

## 📺 Live Preview

To see this in action, import the module and use the component in `AppComponent` with multiple styles.

> You can also create a Storybook setup or Stackblitz demo for live switching views.

---

## 📄 License

MIT

---

Made with ❤️ by your team.
