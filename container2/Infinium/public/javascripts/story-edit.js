const publishButton = document.querySelector('.story-publish');

if (publishButton) {
  const editorDraft = document.querySelector('.story-edit-draft');
  const publisherDraft = document.querySelector('.story-publish-draft');
  const editorTitle= document.querySelector('.story-edit-title');
  const publisherTitle = document.querySelector('.story-publish-title');
  const publisherForm = document.querySelector('.story-publisher');
  const imageRoute = document.querySelector('.story-publish-image-path');
  const publishImage = document.querySelector('.story-publish-image');
  const publisherCloseButton = document.querySelector('.story-publisher-close');

  publishButton.addEventListener('click', e => {
    //Show the form
    publisherForm.classList.remove('hide');
    //Grab any title updates
    publisherTitle.value = editorTitle.value;
    //Grab any draft updates
    publisherDraft.value = editorDraft.value;
  });

  if (publishImage.src) publishImage.classList.remove('hide');

  imageRoute.addEventListener('blur', e => {
    if (e.target.value) {
      //Load the expected image
      publishImage.src = e.target.value;
      publishImage.classList.remove('hide');
    }
    else {
      publishImage.classList.add('hide');
    }
  });

  publisherTitle.addEventListener('blur', e => {
    if (e.target.value) {
      //Save title to editor if edited
      editorTitle.value = publisherTitle.value;
    }
  });

  publisherCloseButton.addEventListener('click', e => {
    publisherForm.classList.add('hide');
  })
}
