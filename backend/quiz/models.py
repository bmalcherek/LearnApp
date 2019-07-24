from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


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
        return self.question


class MyCollections(models.Model):
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subscribe_date = models.DateField(auto_now_add=True)


class MyQuestions(models.Model):
    original_collection = models.ForeignKey(Collection, on_delete=models.CASCADE)
    my_collection = models.ForeignKey(MyCollections, on_delete=models.CASCADE)
    original_question = models.ForeignKey(Question, on_delete=models.CASCADE)
    rep_count = models.IntegerField(default=0)
    last_rep_date = models.DateField(blank=True, null=True)
    next_rep_date = models.DateField(blank=True, null=True)
