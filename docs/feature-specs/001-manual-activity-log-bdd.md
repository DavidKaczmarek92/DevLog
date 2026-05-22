# FS-001 — Manual Activity Log (BDD Scenarios)

**Feature:** Manual Activity Log
  As a developer using DevLog without integrations
  I want to manually record what I worked on during the week
  So that I have context when writing my weekly review

---

## Feature: Viewing the Activity Log

  **Scenario:** User opens the Activity Log tab
    **Given** the app is open and onboarding is complete  
    **When** the user clicks "Activity" in the navigation  
    **Then** the Activity Log screen is displayed  
    **And** the current ISO week is selected by default  
    **And** entries for the current week are listed grouped by day  
    **And** a "+ Add entry" button is visible  

  **Scenario:** Empty state — no entries for the week
    **Given** the user has no activity entries for the current week  
    **When** the user opens the Activity Log tab  
    **Then** an empty state message is shown  
    **And** the "+ Add entry" button is still visible  
    **And** no entry cards are rendered  

  **Scenario:** Navigating to a past week
    **Given** the user is on the Activity Log tab showing the current week  
    **When** the user clicks the "← Prev" navigation arrow  
    **Then** the displayed week changes to the previous ISO week  
    **And** entries for that week are loaded and displayed  
    **And** the week label updates accordingly  

  **Scenario:** Navigating back to the current week
    **Given** the user has navigated to a past week  
    **When** the user clicks "This week"  
    **Then** the current ISO week is displayed again  

---

## Feature: Adding an Entry

  **Scenario:** User adds a minimal entry (title only)
    **Given** the user is on the Activity Log tab  
    **When** the user clicks "+ Add entry"  
    **Then** an entry form is displayed  
    **When** the user enters "Reviewed PR #42" in the title field  
    **And** selects "Coding" as the category  
    **And** clicks "Save"  
    **Then** the form is dismissed  
    **And** a new entry card appears in the list under today's date  
    **And** the entry shows the title "Reviewed PR #42" with the "Coding" badge  

  **Scenario:** User adds a full entry with description and custom date
    **Given** the user is on the Activity Log tab  
    **When** the user clicks "+ Add entry"  
    **And** enters "Architecture planning session" in the title field  
    **And** enters a description in the description field  
    **And** selects "Meeting" as the category  
    **And** changes the date to Monday of the current week  
    **And** clicks "Save"  
    **Then** the entry is saved  
    **And** it appears under the Monday date group  

  **Scenario:** Title is required — user tries to save without a title
    **Given** the entry form is open  
    **When** the user leaves the title field empty  
    **And** clicks "Save"  
    **Then** the form is not submitted  
    **And** an inline validation error "Title is required" appears under the title field  

  **Scenario:** User cancels adding an entry
    **Given** the entry form is open with unsaved data  
    **When** the user clicks "Cancel"  
    **Then** the form is dismissed  
    **And** no new entry is added to the list  
    **And** the previously entered data is discarded  

---

## Feature: Markdown in the Description Field

  **Scenario:** User writes Markdown in the description
    **Given** the entry form is open  
    **And** the description field is in Write mode by default  
    **When** the user types "## Meeting notes\n- Discussed sidebar layout\n- **Action:** update mockup"  
    **Then** the raw Markdown is visible in the textarea  

  **Scenario:** User previews rendered Markdown
    **Given** the user has typed Markdown content in the description field  
    **When** the user clicks the "Preview" tab  
    **Then** the Markdown is rendered — headings, bold text, and lists are displayed correctly  
    **And** the raw syntax is no longer visible  

  **Scenario:** User switches back to Write mode without losing content
    **Given** the user is in Preview mode  
    **When** the user clicks the "Write" tab  
    **Then** the original Markdown text is restored in the textarea  
    **And** no content has been lost  

  **Scenario:** Saved entry shows rendered Markdown in the card
    **Given** the user has saved an entry with a Markdown description  
    **When** the entry card is displayed in the Activity Log list  
    **Then** the description is rendered as formatted text  
    **And** raw Markdown syntax is not visible  

  **Scenario:** User edits an entry — description opens in Write mode
    **Given** there is a saved entry with a Markdown description  
    **When** the user clicks Edit on that entry  
    **Then** the description field opens in Write mode  
    **And** the original raw Markdown is visible and ready to edit  

  **Scenario:** Unsupported or invalid Markdown in the description
    **Given** the entry form is open  
    **When** the user types invalid or unsupported Markdown syntax  
    **And** saves the entry  
    **Then** the content is rendered as plain text  
    **And** no error or crash occurs  

  **Scenario:** Very long Markdown description in the card view
    **Given** the user has saved an entry with a very long Markdown description  
    **When** the entry card is displayed in the list  
    **Then** a truncated preview is shown  
    **And** a "Read more" affordance is visible to expand the full content  

---

## Feature: Editing an Entry

  **Scenario:** User edits an existing entry
    **Given** there is an entry "Fixed login bug" in the current week  
    **When** the user clicks the "Edit" action on that entry  
    **Then** the entry form opens pre-filled with the existing data  
    **When** the user changes the title to "Fixed login bug — OAuth flow"  
    **And** clicks "Save"  
    **Then** the form is dismissed  
    **And** the entry card shows the updated title  

  **Scenario:** User edits an entry from a past week
    **Given** there is an entry in a previous week  
    **When** the user navigates to that week  
    **And** clicks "Edit" on the entry  
    **Then** the entry form opens pre-filled with the existing data  
    **And** the user can update and save it just like a current week entry  

  **Scenario:** User cancels editing
    **Given** the edit form is open with changes made  
    **When** the user clicks "Cancel"  
    **Then** the form is dismissed  
    **And** the original entry remains unchanged  

---

## Feature: Deleting an Entry

  **Scenario:** User deletes an entry with confirmation
    **Given** there is an entry "Old meeting note" in the current week  
    **When** the user clicks "Delete" on that entry  
    **Then** a confirmation dialog appears  
    **When** the user confirms deletion  
    **Then** the entry is removed from the list  

  **Scenario:** Deleting the last entry in a day group removes the day heading
    **Given** there is exactly one entry under "Mon 19"  
    **When** the user deletes that entry and confirms  
    **Then** the entry is removed  
    **And** the "Mon 19" day group heading also disappears  

  **Scenario:** User cancels deletion
    **Given** a confirmation dialog is shown for deleting an entry  
    **When** the user clicks "Cancel" in the dialog  
    **Then** the dialog is dismissed  
    **And** the entry remains in the list unchanged  

---

## Feature: Filtering Entries

  **Scenario:** User filters by category
    **Given** the current week has entries with categories: Coding, Meeting, Learning  
    **When** the user selects "Meeting" from the category filter  
    **Then** only entries with category "Meeting" are displayed  
    **And** the filter pill for "Meeting" is visually active  

  **Scenario:** No entries match the active filter
    **Given** the category filter is set to "Design"  
    **And** the current week has no entries with category "Design"  
    **Then** a "No entries match this filter" state is shown  
    **And** the generic empty state is not shown  

  **Scenario:** User resets the filter
    **Given** the category filter is set to "Coding"  
    **When** the user selects "All"  
    **Then** all entries for the week are displayed again  

  **Scenario:** Filter stays active when navigating between weeks
    **Given** the category filter is set to "Meeting"  
    **When** the user navigates to the previous week  
    **Then** the filter remains set to "Meeting"  
    **And** only Meeting entries for that week are shown  

  **Scenario:** Filter resets to "All" when the app is reopened
    **Given** the category filter was set to "Coding" before closing the app  
    **When** the user reopens the app  
    **And** navigates to the Activity Log  
    **Then** the filter is reset to "All"  

---

## Feature: Managing Categories

  **Scenario:** User creates a custom category
    **Given** the user is in the category management screen  
    **When** the user enters "DevOps" as the category name  
    **And** picks a colour  
    **And** clicks "Save"  
    **Then** "DevOps" appears in the category list  
    **And** it is available to select when adding a new entry  

  **Scenario:** User edits a default category
    **Given** the user is in the category management screen  
    **When** the user edits the "Coding" category and changes its colour  
    **Then** the new colour is reflected on all existing Coding entries  
    **And** the filter pill for Coding updates to the new colour  

  **Scenario:** User deletes a category with no entries assigned
    **Given** there are no entries with category "Design"  
    **When** the user deletes the "Design" category  
    **Then** the category is removed from the list  
    **And** it no longer appears in the filter or the add entry form  

  **Scenario:** User deletes a category that has entries assigned
    **Given** there are 3 entries with category "Learning"  
    **When** the user deletes the "Learning" category  
    **Then** a warning is shown: "3 entries will be moved to Other"  
    **When** the user confirms  
    **Then** the category is deleted  
    **And** those 3 entries now show the "Other" category  

  **Scenario:** User deletes all categories including "Other"
    **Given** the user has deleted all categories including "Other"  
    **Then** entries previously assigned to deleted categories show an "Uncategorised" label  

---

## Feature: Manual Entries in the Weekly Review Sidebar

  **Scenario:** Manual entries appear in the review sidebar
    **Given** the user has 3 manual activity entries for the current week  
    **When** the user opens the Weekly Review form  
    **Then** the right-hand sidebar shows a "Manual" section  
    **And** the 3 entries are listed read-only under that section  
    **And** each entry shows its title and category badge  
    **And** descriptions are rendered as Markdown  

  **Scenario:** Sidebar shows no manual section when no entries exist
    **Given** the user has no manual activity entries for the current week  
    **When** the user opens the Weekly Review form  
    **Then** the "Manual" section is not shown in the sidebar
