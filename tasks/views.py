from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer


# all the requets is handled get,post,patch,delete


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer