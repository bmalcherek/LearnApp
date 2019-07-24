from rest_framework import status, permissions
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse

from quiz.models import Question, Collection, MyCollections, MyQuestions
from .serializers import QuestionSerializer, CollectionSerializer, MyCollectionsSerializer, MyQuestionsSerializer


@api_view(['GET', 'POST'])
@permission_classes((permissions.IsAuthenticated, ))
def collectionListView(request):
    # permission_classes = [permissions.AllowAny]
    if request.method == 'GET':
        queryset = Collection.objects.all()
        serializer = CollectionSerializer(queryset, many=True)

        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        serializer = CollectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((permissions.IsAuthenticated, ))
def collectionDetailView(request, collection_id):
    try:
        collection = Collection.objects.get(id=collection_id)
    except Collection.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = CollectionSerializer(collection)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CollectionSerializer(collection, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        collection.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)  
    

@api_view(['GET', 'POST'])
@permission_classes((permissions.IsAuthenticated, ))
def questionListView(request, collection_id):
    if request.method == 'GET':
        queryset = Question.objects.filter(collection=collection_id)
        serializer = QuestionSerializer(queryset, many=True)

        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((permissions.IsAuthenticated, ))
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


@api_view(['GET',])
@permission_classes((permissions.IsAuthenticated, ))
def get_user(request):
    print(request.user)
    try:
        print(request.META['HTTP_AUTHORIZATION'])
    except:
        return Response({'user': 'Logged Out'})
    return Response({
        'username': request.user.username,
        'email': request.user.email,
    })


@api_view(['GET', 'POST'])
@permission_classes((permissions.IsAuthenticated, ))
def myCollectionsListView(request):
    if request.method == 'GET':
        queryset = MyCollections.objects.filter(user=request.user)
        serializer = MyCollectionsSerializer(queryset, many=True)
        return_data = []
        for my_collection in serializer.data:
            data = my_collection
            collection = Collection.objects.get(id=my_collection['collection'])
            collection = CollectionSerializer(collection)
            data['name'] = collection.data['name']
            return_data.append(data)

        return Response(return_data)

    elif request.method == 'POST':
        user = request.user
        collection = int(request.data['collection'])
        my_collection_data = {
            'collection': collection,
            'user': user.id
        }
        serializer = MyCollectionsSerializer(data=my_collection_data)
        if serializer.is_valid():                
            serializer.save()
            print(serializer.data)
            questions = Question.objects.filter(collection=int(request.data['collection']))
            question_serializer = QuestionSerializer(questions, many=True)
            questions = question_serializer.data
            for question in questions:
                print(serializer.data)
                my_question_data = {
                    'original_collection': collection,
                    'my_collection': serializer.data['id'],
                    'original_question': question['id'],
                    'rep_count': 0,
                }
                my_question_serializer = MyQuestionsSerializer(data=my_question_data)
                if my_question_serializer.is_valid():
                    my_question_serializer.save()
                else:
                    print(my_question_serializer.errors)
        
        else:
            print(serializer.errors)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
