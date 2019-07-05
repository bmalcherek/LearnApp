from django.urls import path

from .views import *


urlpatterns = [
    path('', CollectionListView.as_view()),
    path('<pk>', CollectionDetailView.as_view()),
    path('question/', QuestionListView.as_view()),
    path('question/<pk>', QuestionDetailView.as_view())
]
