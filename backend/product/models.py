from django.db import models
from custom_auth.models import CustomUser
from django.db.models import CASCADE 

class Category(models.Model):
    idcategory = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'Category'
        verbose_name='category'
        verbose_name_plural='categories'
        ordering = ['idcategory']

class Subcategory(models.Model):
    idsubcategory = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    fk_category = models.ForeignKey(Category, on_delete = models.CASCADE)
    
    class Meta:
        db_table = 'Subcategory'
        verbose_name='Subcategory'
        verbose_name_plural='Subcategories'
        ordering = ['idsubcategory']

class Cms(models.Model):
    idcms = models.AutoField(primary_key=True)
    length = models.FloatField(max_length=10)

    class Meta:
        db_table = 'Cms'
        verbose_name='cms'
        verbose_name_plural='Cms'
        ordering = ['idcms']

class Colour(models.Model):
    idcolour = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)

    class Meta:
        db_table = 'Colour'
        verbose_name='colour'
        verbose_name_plural='Colours'
        ordering = ['idcolour']

#---------------------------estos son los productos publicados para su venta
class Product(models.Model):
    idproduct = models.AutoField(primary_key=True)
    iduser = models.ForeignKey(CustomUser, on_delete= models.CASCADE)
    title = models.CharField(max_length=50)
    colour = models.ForeignKey(Colour, on_delete = models.CASCADE, blank = True, null = True)
    width = models.FloatField(blank=True, null = True)
    length = models.FloatField(blank=True , null = True)
    cms = models.ForeignKey(Cms, on_delete = models.CASCADE, blank = True, null = True)
    price = models.FloatField()
    mainphoto = models.ImageField(upload_to='media/')
    desc = models.CharField(max_length=200)
    availability = models.IntegerField()
    subcategory = models.ForeignKey(Subcategory, on_delete = models.CASCADE, blank = True, null = True)
    size = models.CharField(max_length=4, null = True)
    score = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'Product'
        verbose_name='product'
        verbose_name_plural='products'
        ordering = ['idproduct']


class ImagesProduct(models.Model):
    id_imgProduct = models.AutoField(primary_key=True)
    id_product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    src = models.ImageField(upload_to='media/')

    class Meta:
        db_table = 'imagesproduct'
        verbose_name='imagesproduct'
        verbose_name_plural='imagesproduct'
        ordering = ['id_product']


