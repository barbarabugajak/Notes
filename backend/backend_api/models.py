from django.db import models
import django.contrib.auth.models as auth

# Create your models here.
class Note(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(auth.User, on_delete=models.CASCADE)
    text = models.TextField()
    collaborators = models.ManyToManyField(auth.User, related_name='notes')
    public = models.BooleanField(default=True)

    def __str__(self):
        return self.name