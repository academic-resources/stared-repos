{
  entities: {
    session: {
      current_user: {
        user_email: 'coolguy99@hotmail.com',
        id: 24
      }
    }
    notes: {
      3: {
        title: "Wicked cool note",
        content: .rtf;
        author_id: 24,
        notebook_id: 3,
        created: 'Wed Dec 13 2017 20:01:57 GMT-0500 (EST)',
        last_edited: 'Wed Dec 20 2017 20:01:57 GMT-0500 (EST)',
        images: ['amazingpic.png', 'coolpic.png'],
        flag_ids: [3, 4, 18],
      }
      6: {
        title: "Less cool notes",
        content: .rtf,
        author_id: 24,
        notebook_id: 3,
        created: 'Wed Nov 11 2017 20:01:57 GMT-0500 (EST)',
        last_edited: 'Wed Dec 20 2017 20:01:57 GMT-0500 (EST)',
        images: ['boringpic.png'],
        flag_ids: [1, 12, 33],
      }
      23: {
        title: "Super Important note",
        content: .rtf,
        author_id: 24,
        notebook_id: 3,
        created: 'Wed Dec 13 2017 20:01:57 GMT-0500 (EST)',
        last_edited: 'Wed Dec 20 2017 20:01:57 GMT-0500 (EST)',
        images: ['amazingpic.png', 'evenmoreamazingpic.png']
        flag_ids: [3, 4, 18],
      }
    }
    notebooks: {
      5: {
        title: "The most important Notes",
        note_ids: [3, 82, 100],
        author_id: 24
      }
      37: {
        title: "Secret Notes",
        note_ids: [31, 42],
        author_id: 24
      }
    }
    errors: {
      login: {
        email: ["......."],
        password: ["........."]
      }
    }
    ui: {
      loading: false,
      fullpage_note: true,
      notebook_tab: false,
      tags_tab: false,
      richtext_tab: true
    }
  }
}
