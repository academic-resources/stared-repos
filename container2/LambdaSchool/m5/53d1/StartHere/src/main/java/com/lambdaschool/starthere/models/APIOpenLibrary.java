package com.lambdaschool.starthere.models;

import com.lambdaschool.starthere.logging.Loggable;

@Loggable
// Taken from the output of https://openlibrary.org/api/books?bibkeys=ISBN:0982477562&format=json
// This class must match the JSON object
public class APIOpenLibrary {
    private String bib_key;
    private String preview;
    private String thumbnail_url;
    private String preview_url;
    private String info_url;

    public APIOpenLibrary() {
    }

    public String getBib_key() {
        return bib_key;
    }

    public void setBib_key(String bib_key) {
        this.bib_key = bib_key;
    }

    public String getThumbnail_url() {
        return thumbnail_url;
    }

    public void setThumbnail_url(String thumbnail_url) {
        this.thumbnail_url = thumbnail_url;
    }

    public String getPreview() {
        return preview;
    }

    public void setPreview(String preview) {
        this.preview = preview;
    }

    public String getPreview_url() {
        return preview_url;
    }

    public void setPreview_url(String preview_url) {
        this.preview_url = preview_url;
    }

    public String getInfo_url() {
        return info_url;
    }

    public void setInfo_url(String info_url) {
        this.info_url = info_url;
    }

    @Override
    public String toString() {
        return "APIOpenLibrary{" + "bib_key='" + bib_key + '\'' + ", preview='" + preview + '\'' + ", thumbnail_url='" + thumbnail_url + '\'' + ", preview_url='" + preview_url + '\'' + ", info_url='" + info_url + '\'' + '}';
    }
}
