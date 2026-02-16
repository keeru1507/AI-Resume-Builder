# AI Resume Builder — Test Checklist

Use this checklist to verify all features. Check each item after testing.

---

## 1. All form sections save to localStorage

- [ ] Open **Builder** (`/builder`), fill in: Personal Info, Summary, Education, Experience, Projects, Skills (all three categories), Links.
- [ ] Refresh the page (F5).
- [ ] Confirm every section still shows the same data.
- [ ] In DevTools → Application → Local Storage, confirm key **`resumeBuilderData`** exists and contains your data.

---

## 2. Live preview updates in real-time

- [ ] On **Builder**, type in the Name field and confirm the preview header updates immediately.
- [ ] Add a skill (Technical/Soft/Tools) and confirm the Skills section appears in the preview.
- [ ] Add an experience or project and confirm it appears in the preview without refreshing.

---

## 3. Template switching preserves data

- [ ] On **Builder** or **Preview**, select a template (Classic / Modern / Minimal) and confirm the resume content (name, summary, sections) does not change.
- [ ] Only layout and typography should change; all text and structure remain the same.

---

## 4. Color theme persists after refresh

- [ ] On **Builder** or **Preview**, choose a color (e.g. Navy or Burgundy) from the color circles.
- [ ] Refresh the page.
- [ ] Confirm the same color is still selected and the resume headings/sidebar use that accent.
- [ ] In Local Storage, confirm **`resumeBuilderTheme`** matches your choice.

---

## 5. ATS score calculates correctly

- [ ] On **Builder** or **Preview**, note the ATS score.
- [ ] Add/remove items and confirm the score changes according to the rules:
  - Name +10, Email +10, Phone +5
  - Summary > 50 chars +10, action verbs in summary +10
  - At least 1 experience with bullets +15
  - At least 1 education +10
  - At least 5 skills +10
  - At least 1 project +10
  - LinkedIn +5, GitHub +5
- [ ] Confirm total never exceeds 100.

---

## 6. Score updates live on edit

- [ ] On **Builder**, change the summary (e.g. shorten below 50 chars or add an action verb).
- [ ] Confirm the ATS score and suggestions update immediately without refreshing.
- [ ] On **Preview**, confirm the circular ATS score and band (Needs Work / Getting There / Strong Resume) update when you edit on Builder and navigate back to Preview.

---

## 7. Export buttons work (copy / download)

- [ ] On **Preview**, click **Copy Resume as Text**. Paste into a text editor and confirm content matches the resume.
- [ ] Click **Download PDF**. Confirm the toast appears: *"PDF export ready! Check your downloads."* (No actual file is generated; toast is the expected behavior.)

---

## 8. Empty states handled gracefully

- [ ] With a blank resume, confirm the preview shows a placeholder (e.g. "Your resume preview will appear here") and no broken layout.
- [ ] Confirm empty sections (no education, no projects, etc.) do not appear in the preview.
- [ ] Confirm ATS suggestions list missing items (e.g. "Add your name (+10 points)") and the score is 0 or low.

---

## 9. Mobile responsive layout works

- [ ] Resize the browser to a narrow width (e.g. 375px) or use device emulation.
- [ ] On **Builder**, confirm the two-column layout stacks or scrolls so form and preview are usable.
- [ ] On **Preview**, confirm template picker, color picker, ATS circular score, and resume are readable and not cut off.
- [ ] Confirm buttons and inputs remain tappable and visible.

---

## 10. No console errors on any page

- [ ] Open DevTools → Console.
- [ ] Visit **/** (Home), **/builder**, **/preview**, **/proof**.
- [ ] Perform: template switch, color change, form edits, copy text, download PDF.
- [ ] Confirm no red errors appear in the console (warnings are acceptable).

---

## ATS score bands (Preview page)

- **0–40:** Red circle, "Needs Work"
- **41–70:** Amber circle, "Getting There"
- **71–100:** Green circle, "Strong Resume"

Improvement suggestions below the score list missing items with point values (e.g. "Add a professional summary over 50 characters (+10 points)").
