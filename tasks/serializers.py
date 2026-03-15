from rest_framework import serializers
from .models import Task

#converts teh model task we craeted with all its feilds into JSON to send to Frontend

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'