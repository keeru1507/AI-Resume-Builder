# Proof & Submission System — Verification Steps

Use this to confirm the **/rb/proof** page, shipped logic, and validation behave as specified.

---

## 1. Proof page at /rb/proof

- [ ] Go to **/rb/proof** (or click "View proof & submission" from any /rb step).
- [ ] Confirm the page shows:
  - **A) Step Completion Overview** — All 8 steps (01–08) plus Proof (09) with status dots (Complete/Pending).
  - **B) Artifact Collection** — Three inputs: Lovable Project Link, GitHub Repository Link, Deployed URL.
  - **Verification Checklist (10 tests)** — All 10 items from TEST_CHECKLIST with checkboxes.
  - **Final Submission Export** — "Copy Final Submission" button.
- [ ] Confirm links at bottom: "← Back to Step 8", "Step 1".

---

## 2. Artifact storage (rb_final_submission)

- [ ] On /rb/proof, enter (or leave blank) the three proof links.
- [ ] In DevTools → Application → Local Storage, confirm key **`rb_final_submission`** exists.
- [ ] Confirm its value is a JSON object with `lovable`, `github`, `deploy` (strings).
- [ ] Change a link and refresh; confirm the inputs are pre-filled from localStorage.

---

## 3. URL validation (required for Shipped)

- [ ] Leave Lovable URL blank or enter invalid text (e.g. `not-a-url`). Blur the field.
- [ ] Confirm an error message appears (e.g. "Enter a valid URL (e.g. https://...)").
- [ ] Enter a valid URL (e.g. `https://example.com`). Confirm the error clears.
- [ ] Repeat for GitHub and Deployed URL. All three must be valid (http/https) for proof links to count as "provided".

---

## 4. Copy Final Submission

- [ ] Fill in the three proof links with valid URLs.
- [ ] Click **"Copy Final Submission"**. Paste into a text editor.
- [ ] Confirm the text matches this structure (with your links):

```
------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: {link}
GitHub Repository: {link}
Live Deployment: {link}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------
```

---

## 5. Shipped status rule (checklist lock)

Status badge shows **"Shipped"** only when all of the following are true:

1. **All 8 steps completed** — Each step 01–08 has an artifact (value in the build panel textarea).
2. **All 10 checklist tests passed** — Every checkbox in "Verification Checklist (10 tests)" is checked.
3. **All 3 proof links provided** — Lovable, GitHub, and Deployed URL are valid (http/https).

Otherwise the status remains **"In Progress"** (or "Proof" when on the proof page but not shipped).

**Verification:**

- [ ] With one or more steps missing artifacts: confirm status is **not** "Shipped".
- [ ] With one or more checklist items unchecked: confirm status is **not** "Shipped".
- [ ] With one or more proof links missing or invalid: confirm status is **not** "Shipped".
- [ ] Complete all 8 steps (add artifact per step), check all 10 checklist items, and enter three valid proof URLs.
- [ ] Confirm the top-right status badge changes to **"Shipped"**.

---

## 6. Completion confirmation (calm message)

- [ ] When status is Shipped, on /rb/proof confirm the calm message appears at the top of the page:
  - **"Project 3 Shipped Successfully."**
- [ ] Confirm there is no confetti or flashy animation; design remains premium and calm.

---

## 7. Checklist lock (no bypass)

- [ ] Confirm there is no way to mark "Shipped" without:
  - All 8 step artifacts,
  - All 10 checklist items checked,
  - All 3 proof links valid.
- [ ] Shipped is derived only from these three conditions (no manual override).

---

## Summary

| Item | Expected behavior |
|------|-------------------|
| Proof page | /rb/proof with Step Overview, Artifact inputs, 10-item checklist, Copy Final Submission |
| Storage | Proof links in `rb_final_submission`; checklist in `rb_checklist`; step artifacts in `rb_step_XX_artifact` |
| Validation | All three URLs must be valid (http/https); errors shown on blur when invalid |
| Shipped | Only when 8 steps + 10 checklist + 3 valid links |
| Message | "Project 3 Shipped Successfully." when shipped; calm, no confetti |
