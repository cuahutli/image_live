# Generated by Django 3.1.2 on 2020-10-11 18:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('albums', '0002_auto_20201008_1529'),
    ]

    operations = [
        migrations.DeleteModel(
            name='AlbumManager',
        ),
    ]