from django.db import models

from wagtail.admin.edit_handlers import FieldPanel

from wagtail.search import index


class Update(index.Indexed, models.Model):
    # TODO: Delete this model. We'll need to do some migration surgery for this because `buyersguide.Update`
    # is being used in the 0001_initial.py migration.
    source = models.URLField(max_length=2048, help_text="Link to source")

    title = models.CharField(max_length=256)

    author = models.CharField(max_length=256, blank=True)

    featured = models.BooleanField(
        default=False, help_text="feature this update at the top of the list?"
    )

    snippet = models.TextField(max_length=5000, blank=True)

    created_date = models.DateField(
        auto_now_add=True, help_text="The date this product was created"
    )

    panels = [
        FieldPanel("source"),
        FieldPanel("title"),
        FieldPanel("author"),
        FieldPanel("featured"),
        FieldPanel("snippet"),
    ]

    search_fields = [index.SearchField("title", partial_match=True)]

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Buyers Guide Product Update"
        verbose_name_plural = "Buyers Guide Product Updates"
