from rest_framework.generics import ListAPIView, RetrieveAPIView

from quiz.models import Question, Collection
from .serializers import QuestionSerializer, CollectionSerializer


class CollectionListView(ListAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer


class CollectionDetailView(RetrieveAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer


class QuestionListView(ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class QuestionDetailView(RetrieveAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
