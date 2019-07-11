from django.urls import path

from . import views


urlpatterns = [
    path('collections/', views.collectionListView),
    path('collections/<int:collection_id>/', views.collectionDetailView),
    path('questions/<int:collection_id>/', views.questionListView),
    path('questions/<int:collection_id>/<int:question_id>', views.questionDetailView),
]
