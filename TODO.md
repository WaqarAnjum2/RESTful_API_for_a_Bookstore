# TODO - Sidebar + Admin UI CRUD

- [ ] Update `public/index.html`:
  - [ ] Add left sidebar with title + “Developer: M. Waqar Anjum”.
  - [ ] Sidebar navigation: Books, Items CRUD, Notes CRUD, Messages CRUD.
  - [ ] Add JWT token input in sidebar for protected CRUD routes.
  - [ ] Convert book “Create Book” section to a Create **modal** by default.
  - [ ] Ensure book create/update/delete show the **API response** in the UI.
  - [ ] Render books list as **cards** (show all available books).
  - [ ] Add per-book View/Update/Delete actions; open modal for view/edit and show API response after actions.
- [ ] Implement generic CRUD modal logic for Items/Notes/Messages:
  - [ ] Create (modal default), Update, Delete.
  - [ ] List as cards.
  - [ ] Display API response after each action.
- [ ] Wire navigation to render correct section.
- [ ] Smoke test:
  - [ ] Books CRUD works without auth.
  - [ ] Items/Notes/Messages CRUD works only when JWT is provided.
  - [ ] All actions show API response.

