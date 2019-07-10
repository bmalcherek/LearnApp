from rest_framework import status, permissions
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from quiz.models import Question, Collection
from .serializers import QuestionSerializer, CollectionSerializer


@permission_classes((permissions.AllowAny, ))
class CollectionListView(ListAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer


@permission_classes((permissions.AllowAny, ))
class CollectionDetailView(RetrieveAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    

@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny, ))
def questionListView(request, collection_id):
    if request.method == 'GET':
        queryset = Question.objects.filter(collection=collection_id)
        serializer_class = QuestionSerializer(queryset, many=True)

        return JsonResponse(serializer_class.data, safe=False)

    if request.method == 'POST':
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((permissions.AllowAny, ))
def questionDetailView(request, collection_id, question_id):
    try:
        question = Question.objects.get(collection=collection_id, id=question_id)
    except Question.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = QuestionSerializer(question)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = QuestionSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)    
