from django.db import models
from tabnanny import verbose
from custom_auth.models import CustomUser
from product.models import Product

class Purchase(models.Model):
	idpurchase = models.AutoField(primary_key = True)
	#id of the person who bought
	user = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
	product = models.ForeignKey(Product, on_delete = models.CASCADE)
	total = models.FloatField()
	date = models.DateField()
	#whether the product was recieved or not
	status = models.BooleanField(default=False)

	class Meta:
		verbose_name = "Purchase"
		verbose_name_plural = "Purchases"
		ordering = ["date"]	

class Sells(models.Model):
	idsell = models.AutoField(primary_key = True)

	#id of the person to whom we bought
	old_id_user = models.ForeignKey(
		CustomUser, 
		on_delete = models.CASCADE,
		related_name = 'seller'
	)
	#person who bought
	old_customer = models.ForeignKey(
		CustomUser, 
		on_delete = models.CASCADE,
		related_name = 'customer'
	)
	product = models.ForeignKey(Product, on_delete = models.CASCADE)
	total = models.FloatField()
	date = models.DateField()
	#whether the product was sent and payed or not
	status = models.BooleanField(default=False)

	class Meta:
		verbose_name = "Sell"
		verbose_name_plural = "Sells"
		ordering = ["date"]
		
#this table will help to decide whether the purchaser can 
#rate or not an article:
class rating(models.Model):
	idrating = models.AutoField(primary_key = True)
	fk_product = models.ForeignKey(Product, on_delete = models.CASCADE)
#through this, we will retrieve the status of the sell
	fk_sell = models.ForeignKey(Sells, on_delete = models.CASCADE)

class Basket:

	def __init__(self, request):
		self.request = request	
		self.session = request.session

		self.session.setdefault("basket", [])  
		self.session.modified = True

	def add_article(self, id):

		myProduct = Product.objects.get(idproduct=id)
		image_url = self.request.build_absolute_uri(myProduct.mainphoto.url)

		self.request.session["basket"].append({
			"id":myProduct.idproduct,
			"title":myProduct.title,
			"price":myProduct.price,
			"mainphoto":image_url,
			"availability":myProduct.availability,
			"iduser":myProduct.iduser.id
		})
		
		self.session.modified = True
		#self.save_basket()

	def delete_article(self, id):
		data_list = self.request.session["basket"]

		data_list = [item for item in data_list if int(item.get("id")) != id]
		self.request.session["basket"] = data_list

		self.request.session.modified = True 
		#self.save_basket()

	def delete_basket(self):

		self.session.pop("basket", None)
		self.session.modified = True
		
		#self.save_basket()

	def save_basket(self):
		self.session["basket"] = self.session["basket"]
		self.session.modified=True