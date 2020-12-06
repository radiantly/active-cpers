function onEdit(e) {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getActiveSheet();
  if (sheet.getName() !== "Main") return;
  const ownerEmail = ss.getOwner().getEmail();
  const editorEmails = ss
    .getEditors()
    .map((editor) => editor.getEmail())
    .filter((email) => email !== ownerEmail);
  const viewerEmails = ss
    .getViewers()
    .map((viewer) => viewer.getEmail())
    .filter((email) => email !== ownerEmail && !editorEmails.includes(email));
  const emails = sheet
    .getRange("B2:C")
    .getValues()
    .filter(
      (arr) => arr[0] && arr[0].match(/^.+[@].+\..+/) && arr[0] !== ownerEmail
    );

  // Add editors/viewers
  for (const [emailAddress, status] of emails) {
    if (status == "Editor") {
      if (editorEmails.includes(emailAddress)) continue;
      ss.addEditor(emailAddress);
      console.log(`Added ${emailAddress} as Editor`);
    } else {
      if (editorEmails.includes(emailAddress)) ss.removeEditor(emailAddress);
      if (viewerEmails.includes(emailAddress)) continue;
      ss.addViewer(emailAddress);
      console.log(`Added ${emailAddress} as Viewer`);
    }
  }

  const emailAddresses = emails.map((arr) => arr[0]);
  // Remove editors
  for (const emailAddress of editorEmails) {
    if (!emailAddresses.includes(emailAddress)) {
      ss.removeEditor(emailAddress);
      console.log(`Removed ${emailAddress} as Editor`);
    }
  }

  // Remove viewers
  for (const emailAddress of viewerEmails) {
    if (!emailAddresses.includes(emailAddress)) {
      ss.removeViewer(emailAddress);
      console.log(`Removed ${emailAddress} as Viewer`);
    }
  }

  return null;
}
