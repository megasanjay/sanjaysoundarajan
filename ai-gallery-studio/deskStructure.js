const Structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .child(
          S.editor()
            .id('settings')
            .schemaType('settings')
            .documentId('settings'),
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !['settings'].includes(listItem.getId()),
      ),
    ]);

export default Structure;
