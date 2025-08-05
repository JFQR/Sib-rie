from django.db import models
from product.models import Product 
from custom_auth.models import CustomUser

class Comment(models.Model):
	idcomment = models.AutoField(primary_key=True)
	content = models.TextField()
	user = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
	product = models.ForeignKey(Product, on_delete = models.CASCADE)

	class Meta:
		db_table = 'Comment'
		verbose_name='Comment'
		verbose_name_plural='Comments'
		ordering = ['idcomment']