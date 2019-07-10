from django.urls import path

from . import views


urlpatterns = [
    path('collections/', views.CollectionListView.as_view()),
    path('collections/<pk>', views.CollectionDetailView.as_view()),
    path('questions/<int:collection_id>/', views.questionListView),
    path('questions/<int:collection_id>/<int:question_id>', views.questionDetailView),
]
