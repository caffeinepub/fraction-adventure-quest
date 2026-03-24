# Fraction Adventure Quest

## Current State
New project — no existing application files beyond scaffolding.

## Requested Changes (Diff)

### Add
- Full single-page educational browser game built entirely in React/TypeScript/Tailwind
- Start screen: game title, brief instructions, "Start Game" button
- Level Select screen: 3 level cards showing locked/unlocked status (Easy, Medium, Hard)
- Game screen: displays questions with SVG illustrations, 4 MCQ answer buttons, running score
- Feedback overlay: "Correct ✅" or "Incorrect ❌" with explanation after each answer
- End screen: total score, percentage, performance message, replay/level-select options
- 3 levels of content:
  - Level 1 (Easy): 6 questions — identify fractions from SVG pizza/cake/shape illustrations
  - Level 2 (Medium): 6 questions — compare fractions (>, <, =) and simplify to lowest terms
  - Level 3 (Hard): 6 questions — add/subtract fractions with same and different denominators
- Web Audio API sound engine: correct chime, wrong buzzer, level-complete fanfare, background music loop
- CSS animations: fade transitions, bounce on correct, shake on wrong
- All visuals as inline SVG — no external image files
- Fully responsive layout

### Modify
- Nothing (new project)

### Remove
- Nothing

## Implementation Plan
1. Create game data module: all questions, answers, explanations, SVG illustration components per level
2. Create Web Audio API sound engine hook (`useSoundEngine`)
3. Build SVG illustration components: PizzaSVG, CakeSVG, ShapeSVG, FractionBar, FractionCircle
4. Build game state management (useGameState hook): screens, score, level progress, unlocks
5. Build screens: StartScreen, LevelSelectScreen, GameScreen, FeedbackOverlay, EndScreen
6. Wire up animations (Tailwind + keyframes): fade, bounce, shake
7. Main App.tsx routes between screens based on game state
