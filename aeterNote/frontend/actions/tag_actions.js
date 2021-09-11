import * as APIUtil from "../util/tag_api_util";

export const RECEIVE_TAG = "RECEIVE_TAG";
export const RECEIVE_TAGS = "RECEIVE_TAGS";
export const REMOVE_TAG = "REMOVE_TAG";
export const RECEIVE_TAG_ERRORS = "RECEIVE_TAG_ERRORS";
export const REMOVE_TAG_ERRORS = "REMOVE_TAG_ERRORS";
export const RECEIVE_TAGGING = "RECEIVE_TAGGING";
export const REMOVE_TAGGING = "REMOVE_TAGGING";
export const RECEIVE_TAGGING_ERRORS = "RECEIVE_TAGGING_ERRORS";
export const REMOVE_TAGGING_ERRORS = "REMOVE_TAGGING_ERRORS";

const receiveTags = (tags) => {
  return {
    type: RECEIVE_TAGS,
    tags,
  };
};

const receiveTag = (tag) => {
  return {
    type: RECEIVE_TAG,
    tag,
  };
};

const removeTag = (tagId) => {
  return {
    type: REMOVE_TAG,
    tagId,
  };
};

const receiveTagErrors = (errors) => {
  return {
    type: RECEIVE_TAG_ERRORS,
    errors,
  };
};

export const removeTagErrors = () => {
  return {
    type: REMOVE_TAG_ERRORS,
  };
};

const receiveTagging = (tagging) => {
  return {
    type: RECEIVE_TAGGING,
    tagging,
  };
};

const removeTagging = (tagging) => {
  return {
    type: REMOVE_TAGGING,
    tagging,
  };
};

const receiveTaggingErrors = (errors) => {
  return {
    type: RECEIVE_TAG_ERRORS,
    errors,
  };
};

export const removeTaggingErrors = () => {
  return {
    type: REMOVE_TAGGING_ERRORS,
  };
};

export const fetchTags = () => (dispatch) => {
  return APIUtil.fetchTags().then(
    (tags) => dispatch(receiveTags(tags)),
    (errors) => dispatch(receiveTagErrors(errors.responseJSON))
  );
};

export const fetchTag = (id) => (dispatch) => {
  return APIUtil.fetchTag(id).then(
    (tag) => dispatch(receiveTag(tag)),
    (errors) => dispatch(receiveTagErrors(errors.responseJSON))
  );
};

export const createTag = (tag) => (dispatch) => {
  return APIUtil.createTag(tag).then(
    (newTag) => dispatch(receiveTag(newTag)),
    (errors) => dispatch(receiveTagErrors(errors.responseJSON))
  );
};

export const updateTag = (tag) => (dispatch) => {
  return APIUtil.updateTag(tag).then(
    (newTag) => dispatch(receiveTag(newTag)),
    (errors) => dispatch(receiveTagErrors(errors.responseJSON))
  );
};

export const deleteTag = (tagId) => (dispatch) => {
  return APIUtil.deleteTag(tagId).then(
    (tag) => dispatch(removeTag(tagId)),
    (errors) => dispatch(receiveTagErrors(errors.responseJSON))
  );
};

export const addTagging = (tagging) => (dispatch) => {
  return APIUtil.addTagging(tagging).then(
    (newTagging) => dispatch(receiveTagging(newTagging)),
    (errors) => dispatch(receiveTaggingErrors(errors.responseJSON))
  );
};

export const deleteTagging = (tagging) => (dispatch) => {
  return APIUtil.deleteTagging(tagging).then(
    (newTagging) => dispatch(receiveTagging(newTagging)),
    (errors) => dispatch(receiveTaggingErrors(errors.responseJSON))
  );
};
