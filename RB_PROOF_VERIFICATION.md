# RB Proof & Submission — Verification Steps

## Step 9 (Proof)

- **Step 9** is the Proof & Submission step in the build track.
- Route: **/rb/09-proof** (the proof page). The legacy **/rb/proof** redirects to **/rb/09-proof**.
- From Step 8 (Ship), the button **"Go to Step 9: Proof →"** navigates to **/rb/09-proof**.
- Top bar shows **"Project 3 — Step 9 of 9"** when on the proof page.
- In **Step Completion Overview**, **Step 09: Proof** is listed as the 9th step; it is marked Complete when all three proof links (Lovable, GitHub, Deployed) are valid URLs.

## Shipped logic

**Status badge shows "Shipped" only when all of the following are true:**

1. **All 8 steps completed** — Each step (01–08) has an artifact (content in the build panel textarea for that step).
2. **All 10 checklist tests passed** — On `/rb/proof`, the "Verification Checklist (10 tests)" has all 10 items checked.
3. **All 3 proof links provided and valid** — Lovable Project Link, GitHub Repository Link, and Deployed URL are valid URLs (http or https).

If any of the above is missing, the status remains **"In Progress"** (or **"Proof"** when on the proof page but not shipped).

---

## Proof validation

- **URL validation:** Each of the three proof inputs is validated on blur. If the value is non-empty and not a valid URL (e.g. missing protocol, invalid host), an error message appears: "Enter a valid URL (e.g. https://...)".
- **Storage:** Proof links are stored in `localStorage` under **`rb_final_submission`**. Checklist is stored under **`rb_checklist`** (array of 10 booleans).

---

## Verification steps

### 1. Confirm shipped logic

1. Go to **/rb/proof** with default state (no steps complete, no checklist, no links). Status badge should show **"Proof"** or **"In progress"**, not "Shipped".
2. Complete all 8 steps (add artifact text in each step’s build panel). Return to **/rb/proof**. Status should still not be "Shipped" (checklist and links missing).
3. Check all 10 verification checklist items. Status should still not be "Shipped" (links missing).
4. Enter three valid URLs (e.g. https://example.com for each). Status badge should change to **"Shipped"** and the calm message **"Project 3 Shipped Successfully."** should appear at the top of the proof page.
5. Uncheck one checklist item or clear one link. Status should revert to **"In progress"** / **"Proof"** and the shipped message should disappear.

### 2. Confirm proof validation

1. On **/rb/proof**, in "Lovable Project Link", enter `not-a-url` and blur. An error message should appear; the input should be marked invalid (red border or error text).
2. Change to `https://lovable.dev/project/123`. Error should clear.
3. Repeat for GitHub and Deployed URL: invalid value shows error, valid URL clears it.
4. In **Application → Local Storage**, confirm **`rb_final_submission`** contains your three links (JSON object with lovable, github, deploy).

### 3. Copy Final Submission

1. Fill the three proof links (valid URLs).
2. Click **"Copy Final Submission"**.
3. Paste into a text editor. Confirm the text matches:
   - Header line: `------------------------------------------`
   - Title: `AI Resume Builder — Final Submission`
   - Lines: Lovable Project, GitHub Repository, Live Deployment (with your URLs).
   - Section "Core Capabilities:" with the five bullet points (Structured resume builder, Deterministic ATS scoring, Template switching, PDF export with clean formatting, Persistence + validation checklist).
   - Footer line: `------------------------------------------`

### 4. Checklist lock

- Shipped status cannot be achieved without all 10 checklist items checked. Manually unchecking any item removes Shipped status. No bypass.
