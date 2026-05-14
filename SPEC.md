# EchoFrame - Specification Document

## Project Overview
- **Name**: EchoFrame
- **Type**: Progressive Web App (PWA) - Visual Memory Space
- **Core Functionality**: Transform notes, thoughts, and ideas into an interactive semantic universe through interconnected visual nodes
- **Target Users**: Creative professionals, researchers, knowledge workers seeking visual thought organization

## UI/UX Specification

### Layout Structure
- **Main Canvas**: Full-screen interactive spatial canvas for node visualization
- **Header**: Minimal floating header with app branding and global actions
- **Sidebar**: Collapsible left sidebar for navigation, search, and filters
- **Bottom Bar**: Floating action bar for quick node creation
- **Modals**: Centered modals for node editing, settings, and onboarding

### Responsive Breakpoints
- Mobile: < 640px (touch-first, simplified controls)
- Tablet: 640px - 1024px (hybrid interface)
- Desktop: > 1024px (full feature set)

### Visual Design
- **Color Palette**:
  - Background: `#0a0a0f` (deep space black)
  - Surface: `#12121a` (elevated dark)
  - Glass: `rgba(255, 255, 255, 0.05)` with blur
  - Primary: `#00f5ff` (cyan neon)
  - Secondary: `#ff00aa` (magenta accent)
  - Tertiary: `#7b00ff` (violet)
  - Success: `#00ff88` (neon green)
  - Warning: `#ffaa00` (amber)
  - Text Primary: `#ffffff`
  - Text Secondary: `rgba(255, 255, 255, 0.7)`
  - Text Muted: `rgba(255, 255, 255, 0.4)`

- **Typography**:
  - Headings: "Outfit", sans-serif (weights: 300, 500, 700)
  - Body: "IBM Plex Sans", sans-serif (weights: 300, 400, 500)
  - Mono: "JetBrains Mono", monospace

- **Spacing System**: 4px base unit (4, 8, 12, 16, 24, 32, 48, 64, 96)

- **Visual Effects**:
  - Glassmorphism: backdrop-filter blur(20px), rgba backgrounds
  - Neon glow: box-shadow with color spread
  - Particle systems: floating dots with subtle movement
  - Connection lines: animated SVG paths with gradient
  - Depth: layered z-index with subtle shadows

### Components
- **NodeCard**: Draggable memory nodes with glass effect
- **ConnectionLine**: Dynamic bezier curves between nodes
- **TimelineStrip**: Horizontal scrolling timeline for memories
- **SearchBar**: Floating search with instant filtering
- **CommandPalette**: Cmd+K triggered action menu
- **FloatingParticles**: Ambient background animation
- **GlassPanel**: Reusable translucent container
- **NeonButton**: Glowing interactive buttons
- **MoodIndicator**: Visual mood tag display
- **ClusterBadge**: Topic cluster visualization

## Functionality Specification

### Core Features
1. **Thought Canvas**
   - Pan/zoom infinite canvas
   - Node placement via double-click
   - Drag to reposition nodes
   - Multi-select with shift+click

2. **Node Management**
   - Create/edit/delete memory nodes
   - Rich text content (title, body, tags)
   - Automatic keyword extraction
   - Mood detection (based on text sentiment)
   - Timestamp and metadata

3. **Semantic Connections**
   - Auto-generated based on similarity
   - Manual connection creation
   - Connection strength visualization
   - Bidirectional relationships

4. **Timeline Mode**
   - Chronological memory view
   - Date-based filtering
   - Time-based clustering

5. **Search & Filter**
   - Full-text search
   - Filter by mood, tags, date
   - Saved filter presets

6. **Dynamic Clustering**
   - Topic-based node grouping
   - Cluster visualization
   - Expand/collapse clusters

7. **Visual Modes**
   - Neural Network (force-directed)
   - Timeline (chronological)
   - Clusters (grouped by topic)
   - Focus (single node view)

8. **Export/Import**
   - JSON export of all data
   - Import from JSON file
   - Individual node export

9. **Settings**
   - Language selection (6 languages)
   - Theme customization
   - Animation preferences
   - Data management

### AI-like Behaviors (Frontend-only)
- **Keyword Extraction**: TF-IDF-style word importance scoring
- **Mood Detection**: Heuristic sentiment analysis (positive/negative/neutral/energetic/calm)
- **Semantic Similarity**: Cosine similarity on keyword vectors
- **Recurring Detection**: Pattern matching across nodes
- **Auto-Relationships**: Threshold-based connection generation
- **Memory Echo**: Random old memory suggestions
- **Topic Clustering**: K-means style grouping by keywords

### User Interactions
- Double-click canvas: Create new node
- Click node: Select/view details
- Drag node: Reposition
- Right-click node: Context menu
- Scroll: Zoom in/out
- Middle-click drag: Pan canvas
- Cmd+K: Command palette
- Cmd+S: Save/export
- Cmd+F: Search
- Escape: Close modals/deselect

### Data Handling
- All data stored in IndexedDB via Dexie.js
- Auto-save on every change
- Offline-first with service worker
- PWA manifest for installation

## Acceptance Criteria

### Visual Checkpoints
- [ ] Dark cinematic theme applied globally
- [ ] Glassmorphism effects on all panels
- [ ] Neon glow on interactive elements
- [ ] Smooth 60fps animations
- [ ] Particle background visible
- [ ] Connection lines animate smoothly

### Functional Checkpoints
- [ ] Can create, edit, delete nodes
- [ ] Nodes auto-connect based on similarity
- [ ] Search returns relevant results
- [ ] Timeline shows chronological order
- [ ] Language switching works instantly
- [ ] Export produces valid JSON
- [ ] Import restores all data
- [ ] PWA installs correctly
- [ ] Works offline completely

### Performance Checkpoints
- [ ] Initial load < 3 seconds
- [ ] Canvas handles 100+ nodes smoothly
- [ ] Animations don't drop frames
- [ ] Search responds instantly

### Accessibility
- [ ] Keyboard navigable
- [ ] ARIA labels on interactive elements
- [ ] Sufficient color contrast
- [ ] Screen reader compatible