# Generated by Django 3.1.2 on 2020-10-12 01:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0008_auto_20201011_2243'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='image',
            name='title',
        ),
        migrations.AlterField(
            model_name='image',
            name='name',
            field=models.CharField(max_length=200),
        ),
    ]