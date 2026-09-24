# AI Conversation Log: CSC 436 Week 5 Labs

**Student:** Sahan Kumarage Don
**Course:** CSC 436, Modern Web Development (Prof. Adam Kostandy)
**AI tool:** Claude (Anthropic)
**Sessions:** Tuesday Sep 22, 2026 (Tip Splitter Review Lab) and Thursday Sep 24, 2026 (Build Your Playlist, Mission 3)
**Repo:** https://github.com/Sahan2004-06/CSC436

> This log has every prompt I sent, in order. Claude's replies are included with all the code it gave me, lightly shortened in places. Where I sent a screenshot, it's noted as *[screenshot: ...]*.

---

## Part 1: Tuesday Sep 22, Tip Splitter Review Lab

### Getting to the assignment

**Me:** Claude I want to get my professors project repository on my github. Do I have to fork it? Cuz I have to open a website through his repository

**Claude:** Explained that forking copies the repo into your account. Covered enabling GitHub Pages on a fork (Settings → Pages → Deploy from a branch), and the alternatives: viewing an existing Pages link, "Use this template", or cloning and running locally.

**Me:** https://github.com/diabeatz96/All-Class-Slides-and-Assignments/tree/main/Slides/Slides%20Week%204 — so this is the repository and then I have to open a website called build a tip splitter

**Claude:** Couldn't load the folder (GitHub blocked its fetch tool) and found no Pages site for the repo. Suggested downloading the file or forking and enabling Pages. Pointed out that "Build a tip splitter" might be an assignment to build rather than a site to open.

**Me:** *[attached Tip-Splitter-Review-Lab.docx]* so this is the document that I got when I pressed it

**Claude:** Confirmed there's no website to open. It's a React lab to build myself and push to GitHub, so no fork is needed. Listed the setup steps (Vite project, empty `App.jsx` and `App.css`, create `TipButton.jsx`), answered the paper question (state = bill, percent, people; props = percent, active, onSelect; derived = tip amount, total, per person), and flagged two common errors: `onClick={() => onSelect(percent)}` and `Number(bill)`.

### Environment setup

**Me:** so the terminal is cmd right?

**Claude:** Yes. cmd or the VS Code terminal. Check Node with `node -v`. If PowerShell blocks npm scripts, use cmd.

**Me:** *[screenshot: PowerShell error, "node is not recognized"]* umm something is wrong

**Claude:** Node wasn't installed. Install the LTS version from nodejs.org, fully restart VS Code, switch the terminal to Command Prompt, then check `node -v` and `npm -v`.

**Me:** what is the name I should put for a folder? I mean something like this? "C:\Users\kumar\Documents\CSS-CSC436\Tip Splitter"

**Claude:** Don't create the folder yourself, because Vite creates it. Avoid spaces and use `tip-splitter`:
```
cd C:\Users\kumar\Documents\CSS-CSC436
npm create vite@latest tip-splitter -- --template react
```

**Me:** *[screenshot: "Ok to proceed? (y)"]* so this is what I got

**Claude:** Type `y`. Choose No for rolldown-vite and Yes for "Install with npm and start now".

**Me:** *[screenshot: "Which linter to use? Oxlint / ESLint"]* what is happening claude

**Claude:** It's asking which linter to use. Pick ESLint, since it's the standard one.

**Me:** it asks whether to install with npm and start now

**Claude:** Yes. Then Ctrl+click the localhost link, and open the folder in VS Code.

**Me:** *[screenshot: default Vite + React page]* so this is the site that I got. What should I do?

**Claude:** Gave cleanup steps and a Bronze outline.

**Me:** *[screenshot: File Explorer of tip-splitter]* so wait let's go one by one please. I am keeping up my best

**Claude:** Step 1: open the folder in VS Code (File → Open Folder → tip-splitter).

**Me:** *[screenshot: folder open in VS Code]* this is what I got.

**Claude:** Step 2: restart the dev server in a new Command Prompt terminal with `npm run dev`.

**Me:** *[screenshot: server running]* okay?

**Claude:** Step 3: empty `App.css` (Ctrl+A, Delete, Ctrl+S).

**Me:** *[screenshot]* I think I did properly

**Claude:** Step 4: create `src/TipButton.jsx`:
```jsx
function TipButton({ percent, active, onSelect }) {
  return <button>{percent}%</button>;
}

export default TipButton;
```

**Me:** *[screenshot: file with a green Copilot inline suggestion]* okay..

**Claude:** The green block is an AI suggestion from Copilot, not real code. Press Esc and don't press Tab (it's basically the Silver answer). Step 5: replace `App.jsx` with a clean shell:
```jsx
import { useState } from "react";
import "./App.css";
import TipButton from "./TipButton.jsx";

function App() {
  return (
    <div>
      <h1>Tip Splitter</h1>
    </div>
  );
}

export default App;
```

### Bronze

**Me:** *[screenshot: page shows "Tip Splitter"]* I think we are doing great

**Claude:** Step 6: a controlled bill input.
```jsx
const [bill, setBill] = useState("");
...
<input type="number" value={bill} onChange={(e) => setBill(e.target.value)} />
```
Explained `useState`, controlled inputs, and why `onChange` is required.

**Me:** *[screenshot: "You typed: 50"]*

**Claude:** Step 7: percent state and a derived tip amount.
```jsx
const [percent, setPercent] = useState(15);
const tipAmount = Number(bill) * percent / 100;
...
<p>Tip: {percent}%</p>
<p>Tip amount: ${tipAmount.toFixed(2)}</p>
```
Explained that derived values are calculated, not stored.

**Me:** *[screenshot of code]* Is this correct?

**Claude:** Correct, but the file was unsaved (Ctrl+S). Use Shift+Alt+F to format.

**Me:** *[screenshot: Tip 15%, $7.50]* Yayy

### Silver

**Claude:** Step 8: make `TipButton` use its props.
```jsx
function TipButton({ percent, active, onSelect }) {
  return (
    <button
      onClick={() => onSelect(percent)}
      style={{ fontWeight: active ? "bold" : "normal" }}
    >
      {percent}%
    </button>
  );
}

export default TipButton;
```
Explained why the `() =>` is needed.

**Me:** okay. Replaced the whole file

**Claude:** Step 9: render three buttons in App.
```jsx
<TipButton percent={15} active={percent === 15} onSelect={setPercent} />
<TipButton percent={18} active={percent === 18} onSelect={setPercent} />
<TipButton percent={20} active={percent === 20} onSelect={setPercent} />
```

**Me:** *[screenshot: 20% bold, $10.00]*

### Gold

**Claude:** Step 10: people counter (third piece of state) and derived totals.
```jsx
const [people, setPeople] = useState(1);
const total = Number(bill) + tipAmount;
const perPerson = total / people;
...
<button onClick={() => setPeople(Math.max(1, people - 1))}>-</button>
<span> People: {people} </span>
<button onClick={() => setPeople(people + 1)}>+</button>
<p>Total: ${total.toFixed(2)}</p>
<p>Per person: ${perPerson.toFixed(2)}</p>
```

**Me:** *[screenshot of code]* I believe that it is the 28th line for the first step?

**Claude:** Gave exact line placements, working bottom-up so the line numbers don't shift.

**Me:** *[screenshot: Total $60, Per person $30]* yay

**Claude:** Step 11: show "Enter a bill to start" when the bill is empty or 0, using a ternary:
```jsx
{Number(bill) > 0 ? (
  <div>
    <p>Tip amount: ${tipAmount.toFixed(2)}</p>
    <p>Total: ${total.toFixed(2)}</p>
    <p>Per person: ${perPerson.toFixed(2)}</p>
  </div>
) : (
  <p>Enter a bill to start</p>
)}
```

**Me:** *[screenshot: $100, 20%, 2 people → $60 each]*

### Submitting

**Claude:** Asked for my GitHub Classroom repo link.

**Me:** *[screenshot: professor's repo]* I don't see it claude.

**Claude:** That's the professor's repo, not a Classroom invite. Searched my Gmail and found nothing. Suggested checking Brightspace, classroom.github.com and my organizations, or falling back to my own repo.

**Me:** *[attached syllabus]* is there anything over here?

**Claude:** No link in the syllabus, but it says submissions go through Brightspace with a Classroom repo URL. Pointed out the syllabus AI policy: I must be able to explain every line I submit.

**Me:** so to be honest with you I have the link for the git repository. I just don't have a space to paste it on the brightspace.

**Me:** https://github.com/Sahan2004-06/CSC436 — This is the github link for the repository. It also have one of the other projects that we did as well.

**Claude:** Had me check with `git remote -v` and `git status`.

**Me:** is it going after new terminal?

**Claude:** Yes, open a new terminal and leave the dev server running.

**Me:** *[screenshot: CSS-CSC436 folder points to the CSS-CSC436 repo; a CSC436 subfolder exists]*

**Claude:** Wrong remote. Check the `CSC436` subfolder instead.

**Me:** *[screenshot: CSC436 → Sahan2004-06/CSC436.git, contains Project 1]*

**Claude:** Copy the project in without `node_modules`:
```
robocopy ..\tip-splitter tip-splitter /E /XD node_modules
```

**Me:** *[screenshot: robocopy error, missing destination]*

**Claude:** The destination argument was missing. Run the full command.

**Me:** *[screenshot: 17 files copied]*

**Claude:** `git add tip-splitter` then `git status`.

**Me:** *[git status output: 17 tip-splitter files staged]*

**Claude:** `git commit -m "Add Tip Splitter review lab (Gold)"` then `git push`.

**Me:** *[push succeeded: main -> main]*

**Claude:** Done. Link: https://github.com/Sahan2004-06/CSC436/tree/main/tip-splitter. Drafted an email to the professor explaining there was no Brightspace submission box.

**Me:** yeah sure / thanks claude. You are helping me alot

---

## Part 2: Thursday Sep 24, Build Your Playlist (Mission 3)

**Me:** *[screenshot: professor's Week 4 Day 2 folder]* claude. I'm so sorry bruh. Can you help me to get this to my repository.

**Claude:** The folder is the professor's slide deck. The assignment is in `Build-Your-Playlist-Assignment.docx`, so download it and share it.

**Me:** *[attached Build-Your-Playlist-Assignment.docx]*

**Claude:** Summarized the milestones (Gold required). Step 1: create the project directly inside the repo folder so no copying is needed:
```
cd C:\Users\kumar\Documents\CSS-CSC436\CSC436
npm create vite@latest playlist -- --template react
```

**Me:** so we should make a new file right?

**Claude:** No, the command creates the `playlist` folder itself.

**Me:** okay so I can enter these new commands in the same project that we did last time and go to terminal -> new terminal and then enter the commands to it?

**Claude:** Yes. The `cd` handles the location. The port may be 5174 if the old server is still running.

**Me:** cools. Thanks claude. Let me do it and get back to you. And also it should be in command prompt right? not in powershell

**Claude:** Use Command Prompt, since PowerShell can block npm scripts.

**Me:** *[screenshot: playlist running, but VS Code still showing tip-splitter files]*

**Claude:** Step 2: open the `playlist` folder in VS Code so I don't edit the wrong project, then restart with `npm run dev`.

**Me:** *[screenshot]* okay we got it

### Bronze

**Claude:** Step 3: empty `App.css` and render the hardcoded songs with `map`:
```jsx
const [songs, setSongs] = useState([
  { id: 1, title: "Blinding Lights", artist: "The Weeknd" },
  { id: 2, title: "HUMBLE.", artist: "Kendrick Lamar" },
  { id: 3, title: "Levitating", artist: "Dua Lipa" },
]);
...
<ul>
  {songs.map((song) => (
    <li key={song.id}>
      {song.title} by {song.artist}
    </li>
  ))}
</ul>
```
Explained `map`, and that `key` uses the id (not the index) on the outermost element. Check the console for warnings.

**Me:** *[screenshot: 3 songs, console "No Issues"]* I guess we are good so far

### Silver

**Claude:** Step 4: a controlled form that adds songs with spread.
```jsx
const [title, setTitle] = useState("");
const [artist, setArtist] = useState("");

function handleSubmit(e) {
  e.preventDefault();
  const newSong = { id: Date.now(), title: title, artist: artist };
  setSongs([...songs, newSong]);
  setTitle("");
  setArtist("");
}
...
<form onSubmit={handleSubmit}>
  <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
  <input placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
  <button type="submit">Add</button>
</form>
```
Explained `preventDefault`, using `Date.now()` for ids, and why spread instead of `push`.

**Me:** *[screenshot: "World Is Yours by Nas" added]* yep

### Gold

**Claude:** Step 5: Remove with `filter`, and a favorite toggle with `map` plus spread.
```jsx
function removeSong(id) {
  setSongs(songs.filter((song) => song.id !== id));
}

function toggleFav(id) {
  setSongs(
    songs.map((song) =>
      song.id === id ? { ...song, fav: !song.fav } : song
    )
  );
}
...
<li key={song.id}>
  <button onClick={() => toggleFav(song.id)}>{song.fav ? "★" : "☆"}</button>
  {song.title} by {song.artist}
  <button onClick={() => removeSong(song.id)}>Remove</button>
</li>
```

**Me:** *[screenshot: song removed, one starred]* I think we are going goo

**Claude:** Step 6: a derived favorites count and an empty-state message.
```jsx
const favCount = songs.filter((song) => song.fav).length;
...
<p>Favorites: {favCount}</p>
{songs.length === 0 ? (
  <p>Your playlist is empty. Add a song!</p>
) : (
  <ul>...</ul>
)}
```

**Me:** *[screenshot]* yes. It all works

### Submitting

**Claude:** Step 7: from the `CSC436` folder:
```
git add playlist
git status
git commit -m "Add Build Your Playlist lab (Gold)"
git push
```

**Me:** *[screenshots: GitHub repo showing Project 1, playlist, tip-splitter]* Seems like it works

**Claude:** Done. Link: https://github.com/Sahan2004-06/CSC436/tree/main/playlist. Reviewed the concepts I need to be able to explain: spread vs push, id vs index keys, `preventDefault`, and derived state.

**Me:** claude my professor is saying to upload this convo as a markdown to the project space

---

## Key concepts I learned

| Concept | What it means |
|---|---|
| State vs derived | Store only what can't be calculated (`bill`, `percent`, `people`, `songs`). Calculate the rest during render (`tipAmount`, `perPerson`, `favCount`). |
| Controlled input | `value` comes from state and `onChange` updates it. Without `onChange` the input freezes. |
| `onClick={() => fn(x)}` | The arrow makes it run on click, not during render. |
| `Number(bill)` | Input values are strings, so convert before doing math. |
| Immutable updates | Use spread, `map` and `filter`, never `push`, `splice` or direct assignment, so React sees a new array and re-renders. |
| `key={song.id}` | A stable id on the outermost element from `map`, never the index. |
| `e.preventDefault()` | Stops the form submit from reloading the page and wiping state. |
| Conditional rendering | `condition ? (A) : (B)` for empty or placeholder states. |
