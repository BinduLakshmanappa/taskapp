from django.urls import path,include
from rest_framework import routers
from tasks.views import TaskViewSet


# to set teh url w ehave mapped to /api/tasks
#GET /api/tasks/

router = routers.DefaultRouter()
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
]