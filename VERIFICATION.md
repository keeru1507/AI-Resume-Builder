# AI Resume Builder — Verification Steps

## 1) Persistence after refresh

- **Step 1:** Open the app and go to **Builder** (`/builder`).
- **Step 2:** Fill in some fields (e.g. name, summary, one experience, skills).
- **Step 3:** Refresh the page (F5 or Ctrl+R).
- **Step 4:** Confirm the form and the live preview show the same data you entered. Data is stored in `localStorage` under the key **`resumeBuilderData`**.
- **Optional:** In DevTools → Application → Local Storage, inspect `resumeBuilderData`; it should be a JSON string of your resume data.

---

## 2) Score changes live while editing

- **Step 1:** On **Builder**, clear the form (or use a fresh profile) so the ATS score is low (e.g. 0–25).
- **Step 2:** Add a **summary** with 40–120 words. The score should increase by **+15** (e.g. 0 → 15).
- **Step 3:** Add **at least 2 projects**. Score should increase by **+10**.
- **Step 4:** Add **at least 1 experience** entry. Score should increase by **+10**.
- **Step 5:** Add **8+ skills** (comma-separated). Score should increase by **+10**.
- **Step 6:** Add a **GitHub or LinkedIn** URL. Score should increase by **+10**.
- **Step 7:** In an experience or project **description**, add a number or metric (e.g. "Increased revenue by 20%", "10k users"). Score should increase by **+15**.
- **Step 8:** Add **one education** entry with all fields (school, degree, field, start, end). Score should increase by **+10**.
- **Step 9:** Confirm the score **never exceeds 100** and that each change updates the meter and suggestions **immediately** (no page reload).

---

## 3) ATS score rules (deterministic)

| Rule | Points | Condition |
|------|--------|-----------|
| Summary | +15 | 40–120 words |
| Projects | +10 | At least 2 projects |
| Experience | +10 | At least 1 entry |
| Skills | +10 | ≥ 8 items (comma-separated) |
| Links | +10 | GitHub or LinkedIn URL present |
| Numbers | +15 | Any experience/project bullet contains a number (%, k, M, digits) |
| Education | +10 | At least one education entry with all fields complete |
| **Cap** | — | Total capped at 100 |

---

## 4) Suggestions (3 max)

Suggestions appear **under the score** and are based on what’s missing, for example:

- "Write a stronger summary (40–120 words)."
- "Add at least 2 projects."
- "Add at least one experience entry."
- "Add more skills (target 8+)."
- "Add a GitHub or LinkedIn link."
- "Add measurable impact (numbers) in bullets."
- "Complete education fields (school, degree, field, dates)."

At most **3** suggestions are shown at a time. As you fix items, the list updates live.

---

## 5) Live preview and sections

- **Step 1:** On **Builder**, confirm the right-hand **Live preview** shows the same content as the form.
- **Step 2:** Confirm section headers used: **Summary**, **Education**, **Experience**, **Projects**, **Skills**, **Links**.
- **Step 3:** Leave a section empty (e.g. no projects). That section must **not** appear in the preview.
- **Step 4:** Add content to that section and confirm it appears with the correct header and content.

---

## 6) Routes and design (unchanged)

- Routes remain: `/`, `/builder`, `/preview`, `/proof`.
- Top nav: **Builder | Preview | Proof**.
- Design remains premium and calm; no layout or route changes.

---

## 7) Template tabs (layout only)

- **Step 1:** On **Builder** or **Preview**, locate the template tabs: **Classic** | **Modern** | **Minimal**.
- **Step 2:** Click **Modern**. The resume layout should change (e.g. section title style, spacing). Content and data must stay the same.
- **Step 3:** Click **Minimal**. Layout should switch again (e.g. sans-serif, lighter section headers). Still black/white, no flashy elements.
- **Step 4:** Click **Classic**. Layout should match the original (serif, underlined section titles).
- **Step 5:** Refresh the page. The selected template should persist (stored in `localStorage` under **`resumeBuilderTemplate`**).
- **Step 6:** Confirm the **ATS score does not change** when switching templates; only layout styling changes.

---

## 8) Bullet structure guidance (contextual)

- **Step 1:** On **Builder**, add an **Experience** entry. In **Description**, enter one line that does **not** start with an action verb (e.g. "Helped the team with tasks.").
- **Step 2:** Below the textarea, a subtle suggestion should appear: **"Bullet 1: Start with a strong action verb."**
- **Step 3:** Change the line to start with an action verb (e.g. "Built a dashboard for the team."). The action-verb suggestion should disappear. If there is no number in the line, **"Add measurable impact (numbers)."** should still appear.
- **Step 4:** Add a number (e.g. "Built a dashboard used by 10k users."). Both suggestions should disappear.
- **Step 5:** Add a **Project** with a description line that has no number and no action verb. Confirm both suggestions appear for that bullet. Input is never blocked; guidance only.

**Action verbs checked:** Built, Developed, Designed, Implemented, Led, Improved, Created, Optimized, Automated (case-insensitive).

---

## 9) Top 3 Improvements panel

- **Step 1:** On **Builder**, under the ATS score block, find the **"Top 3 Improvements"** section.
- **Step 2:** With an empty or sparse resume, confirm up to 3 items from this logic appear:
  - &lt;2 projects → "Add at least one more project."
  - No numbers in experience/project bullets → "Add measurable impact (numbers) in bullets."
  - Summary &lt;40 words or missing → "Expand your summary..." or "Add a summary (target 40+ words)."
  - Skills &lt;8 → "Add more skills (target 8+)."
  - No experience → "Add internship or project work as experience."
- **Step 3:** Fix items (e.g. add 2 projects, add numbers). Confirm the list updates and items drop off as criteria are met.
- **Step 4:** Confirm **score logic is unchanged** (same rules as in section 3) and that template choice does not affect the score.

---

## 10) Export and validation

### Print / Save as PDF
- **Step 1:** Go to **Preview** (`/preview`) with a filled resume.
- **Step 2:** Click **"Print / Save as PDF"**. The browser print dialog opens.
- **Step 3:** In print preview (or after saving as PDF), confirm:
  - Only the resume content is shown (no top navigation, no template tabs, no export buttons).
  - Background is white; no colored accents; text is black.
  - Margins look consistent; no sections cut off.
  - Section/block breaks avoid splitting bullets across pages where possible.
- **Step 4:** Cancel or complete print/PDF; confirm the app still works and routes are unchanged.

### Copy Resume as Text
- **Step 1:** On **Preview**, click **"Copy Resume as Text"**.
- **Step 2:** Paste into a text editor. Confirm structure:
  - **Name** (then the name)
  - **Contact** (email, phone, location)
  - **Summary** (if present)
  - **Education** (if present)
  - **Experience** (if present)
  - **Projects** (if present)
  - **Skills** (if present)
  - **Links** (GitHub, LinkedIn if present)
- **Step 3:** Confirm content matches the form and that long lines don’t break layout (plain text only).

### Incomplete-resume warning (no block)
- **Step 1:** Clear **Name** (or remove all experience and all projects). Go to **Preview**.
- **Step 2:** Click **"Print / Save as PDF"** or **"Copy Resume as Text"**.
- **Step 3:** A calm warning appears: **"Your resume may look incomplete."** Export still proceeds (print dialog opens or text is copied).
- **Step 4:** Dismiss the warning with the × control. Add name and at least one project or experience; export again — warning should not appear.

### Layout precision
- **Step 1:** On **Builder** or **Preview**, add long lines (e.g. a very long summary or skill list). Confirm no section overlaps another and no horizontal overflow.
- **Step 2:** Confirm spacing between sections is consistent and that section order is always: header → Summary → Education → Experience → Projects → Skills → Links.
