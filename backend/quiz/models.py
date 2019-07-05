from __future__ import unicode_literals

from django.db import models


class Collection(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Question(models.Model):
    question = models.CharField(max_length=200, null=True, blank=True)
    is_image = models.BooleanField(default=False)
    image_url = models.CharField(max_length=200, null=True, blank=True)
    answer = models.CharField(max_length=200)
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)

    def __str__(self):
        return self.answer
