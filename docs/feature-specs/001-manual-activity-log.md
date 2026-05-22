# FS-001 — Manual Activity Log

**Feature name:** Manual Activity Log  
**Status:** Ready for development  
**Last updated:** 2025-05-21  

---

## Problem statement

Developers who don't use GitHub or Jira — or who work on things that don't appear in any tool (meetings, research, learning, writing) — have no way to add context to their week before writing a review. Without a place to log work manually, the activity sidebar is empty for most users at launch, and the weekly review feels disconnected from the actual week.

---

## Goal

Give users a dedicated place to record what they worked on during the week, so that when Friday comes and they sit down to write their review, they already have a personal log to look back at.

---

## Users

**Primary:** Developer working without integrations — opens DevLog fresh, has no GitHub or Jira connected, wants to track their week regardless.

**Secondary:** Developer with integrations — uses the log to capture work that doesn't show up in tools (e.g. a design session, a 1:1, a reading session).

---

## User stories

### User Story 01 — Log an activity entry
As a developer, I want to add a short note about something I worked on today, so that I don't forget it when I'm writing my weekly review on Friday.

**Acceptance criteria:**
- [ ] I can open an "Add entry" form from the Activity Log screen
- [ ] I can enter a title (required) and an optional description
- [ ] The description field supports Markdown formatting
- [ ] I can pick a category from my list (default categories + any I've created myself)
- [ ] I can set the date the entry belongs to (defaults to today)
- [ ] After saving, the entry immediately appears in the list under the correct day
- [ ] I cannot save an entry without a title — the form shows an inline error instead
- [ ] The title field has a maximum length; a character counter shows how close I am

**Default categories (pre-installed, each with a colour):**

| Category | Colour |
|---|---|
| Coding | Orange |
| Meeting | Purple |
| Learning | Green |
| Design | Blue |
| Writing | Pink |
| Other | Grey |

---

### User Story 02 — Write descriptions in Markdown
As a developer, I want to write meeting notes, bullet points, or code snippets in the description field, so that I can capture structured context — not just a plain sentence.

**Acceptance criteria:**
- [ ] The description field has two tabs: **Write** and **Preview**
- [ ] In Write mode I type raw Markdown — the field behaves like a standard textarea
- [ ] In Preview mode the Markdown is rendered — headings, bold, lists, code blocks, and inline code are all supported
- [ ] I can switch between Write and Preview at any time without losing my content
- [ ] When I reopen an entry to edit it, Write mode is shown by default with my original Markdown intact
- [ ] In the entry card view (the log list), the description is always rendered as Markdown — not shown as raw syntax
- [ ] A short cheatsheet hint is visible near the description field (e.g. `**bold**`, `- list`, `` `code` ``)

---

### User Story 03 — View this week's activity
As a developer, I want to see all my entries for the current week grouped by day, so that I get a clear picture of what I've done.

**Acceptance criteria:**
- [ ] The Activity Log screen shows entries for the current ISO week by default
- [ ] Entries are grouped under day labels (Mon 19, Tue 20, etc.)
- [ ] Each entry shows its title, category badge in the category's colour, and rendered description (if any)
- [ ] If no entries exist for the week, an empty state is shown with a prompt to add one
- [ ] The screen loads instantly — no loading spinner needed for local data

---

### User Story 04 — Browse past weeks
As a developer, I want to look back at previous weeks, so that I can review what I logged before writing a catch-up review.

**Acceptance criteria:**
- [ ] I can navigate to the previous or next week using arrow buttons
- [ ] A "This week" button always jumps back to the current week
- [ ] The week label (e.g. "Week 21 · May 19–25, 2025") updates when I navigate
- [ ] Entries from the selected week are shown; an empty state is shown if there are none
- [ ] Entries from past weeks remain editable — I can fix or update them at any time

---

### User Story 05 — Edit an entry
As a developer, I want to fix a typo or update a category after saving, so that my log stays accurate.

**Acceptance criteria:**
- [ ] Each entry has an Edit action, visible on hover
- [ ] Clicking Edit opens the form pre-filled with the existing title, Markdown description, category, and day
- [ ] The description field opens in Write mode showing the original Markdown
- [ ] After saving the edit, the card updates in place with the new rendered content
- [ ] I can cancel without saving, leaving the original entry unchanged
- [ ] Entries from past weeks can be edited just like current week entries

---

### User Story 06 — Delete an entry
As a developer, I want to remove an entry I added by mistake, so that my log doesn't have noise.

**Acceptance criteria:**
- [ ] Each entry has a Delete action, visible on hover
- [ ] Clicking Delete shows a confirmation dialog before anything is removed
- [ ] Confirming deletes the entry and removes it from the list immediately
- [ ] Cancelling the dialog leaves the entry untouched
- [ ] If the deleted entry was the last one in a day group, that day group heading also disappears

---

### User Story 07 — Filter by category
As a developer, I want to filter the log by category, so that I can quickly scan only my meetings or only my coding sessions.

**Acceptance criteria:**
- [ ] A category filter is available above the list
- [ ] Selecting a category shows only entries matching that category for the current week
- [ ] The active filter is visually indicated in the category's colour
- [ ] Selecting "All" resets the filter and shows all entries again
- [ ] Navigating to a different week keeps the active filter applied
- [ ] The filter always resets to "All" when the app is closed and reopened

---

### User Story 08 — Manage categories
As a developer, I want to create my own categories, customise their colours, and remove the ones I don't use, so that the log reflects how I actually think about my work.

**Acceptance criteria:**
- [ ] I can create a new category with a name and a colour
- [ ] I can edit the name or colour of any existing category, including the defaults
- [ ] I can delete any category, including the defaults
- [ ] When I delete a category that has entries assigned to it, those entries are moved to "Other" automatically — I am shown a warning before confirming
- [ ] Category changes (name, colour, deletion) are reflected immediately everywhere in the app — in the log, in the filter pills, and in the review sidebar
- [ ] There is no minimum number of categories — I can delete all defaults if I want

---

### User Story 09 — See manual entries during the weekly review
As a developer, I want to see my manually logged activity in the review sidebar, so that I have context when answering the five review questions.

**Acceptance criteria:**
- [ ] When opening the Weekly Review form, the sidebar shows a "Manual" section if any entries exist for that week
- [ ] Entries in the sidebar are read-only — editing happens in the Activity Log tab only
- [ ] Each entry in the sidebar shows its title and category badge in the category's colour
- [ ] Descriptions are rendered as Markdown in the sidebar — not shown as raw syntax
- [ ] If no manual entries exist for the week, the "Manual" section is not shown


---

## Decisions log

| # | Question | Decision |
|---|---|---|
| 1 | Are past week entries editable? | Yes — entries are always editable, no restrictions by week |
| 2 | Can users create custom categories? | Yes — full CRUD: create, rename, recolour, delete; defaults are just a starting point |
| 3 | Does the filter persist between app sessions? | No — resets to "All" every time the app is opened |
| 4 | Where is Markdown supported? | Description field only — title stays plain text |
| 5 | How is the Markdown editor presented? | Split Write / Preview tabs in the form; rendered view in the card list |

---

## Edge cases

| Situation | Expected behaviour |
|---|---|
| User adds an entry dated to a past week | Entry appears in that past week's log, not the current one |
| User navigates away mid-form | Form data is discarded; no partial saves |
| Week has entries but all are filtered out | Shows "No entries match this filter" state, not the generic empty state |
| User deletes the only entry in a day group | Day heading disappears; adjacent day groups are not affected |
| User deletes a category that has entries | Warning shown; entries reassigned to "Other" on confirm |
| User deletes all categories including "Other" | Entries with no valid category are shown with a neutral "Uncategorised" label |
| User writes invalid or unsupported Markdown | Rendered as plain text — no errors, no crashes |
| Entry has a very long Markdown description | Card in the list shows a truncated preview with a "Read more" affordance |

---

## Success criteria

This feature is successful when:
- Users with no integrations connected can populate their activity sidebar before writing a review
- The add flow takes under 30 seconds for a typical entry (title + category)
- A meeting note with bullet points and bold text renders correctly in the card view
- Zero data loss on edit or delete (confirmed via testing)
