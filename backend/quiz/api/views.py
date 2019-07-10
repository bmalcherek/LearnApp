from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.decorators import api_view
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from quiz.models import Question, Collection
from .serializers import QuestionSerializer, CollectionSerializer


class CollectionListView(ListAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer


class CollectionDetailView(RetrieveAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    

# @api_view(['GET', 'POST'])
def questionListView(request, collection_id):
    queryset = Question.objects.filter(collection=collection_id)
    serializer_class = QuestionSerializer(queryset, many=True)

    return JsonResponse(serializer_class.data, safe=False)


def questionDetailView(request, collection_id, question_id):
    queryset = Question.objects.filter(collection=collection_id, id=question_id)
    serializer_class = QuestionSerializer(queryset, many=True)

    return JsonResponse(serializer_class.data, safe=False)
