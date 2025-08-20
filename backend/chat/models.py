from django.db import models

class Msgs(models.Model):
	idmsgs = models.AutoField(primary_key = True)
	content = models.TextField()
	url = models.CharField(max_length=150)
	sender = models.IntegerField()

	class Meta:
		verbose_name = "Msgs"
		verbose_name_plural = "Msgs"
		ordering = ["idmsgs"]	
