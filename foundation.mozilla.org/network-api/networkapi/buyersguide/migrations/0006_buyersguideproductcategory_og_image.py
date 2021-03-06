# Generated by Django 2.2.16 on 2020-11-12 22:07

from django.db import migrations, models
import networkapi.buyersguide.utils


class Migration(migrations.Migration):

    dependencies = [("buyersguide", "0005_update_created_date")]

    operations = [
        migrations.AddField(
            model_name="buyersguideproductcategory",
            name="og_image",
            field=models.FileField(
                blank=True,
                help_text="Image to use as OG image",
                max_length=2048,
                upload_to=networkapi.buyersguide.utils.get_category_og_image_upload_path,
            ),
        )
    ]
