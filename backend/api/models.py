from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class Product(models.Model):
        name = models.CharField(max_length=30)
        seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name="product_seller")
        created_at = models.DateTimeField(auto_now_add=True)
        price = models.DecimalField(validators=[MinValueValidator(0), MaxValueValidator(10000)], decimal_places=2, max_digits=10,) #??10?7
        description = models.CharField(max_length=250,blank=True,null=True)
        picture = models.ImageField(blank=True,null=True)
        rating = models.DecimalField(validators=[MinValueValidator(0), MaxValueValidator(5)], decimal_places=2, max_digits=3,blank=True,null=True)
        number_of_ratings = models.IntegerField(default=0)
        new_rating = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(5)])
        quantity_sold = models.IntegerField(default=0)

        def __str__(self):
             return self.name
# quantity_sold | charge, quantity_bought, how_much_bought | is_bought | quantity
class Customer(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name="customer_username")
    joined_at = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(validators=[MinValueValidator(0)], default=0, decimal_places=2, max_digits=7)
    products_in_basket = models.ManyToManyField(Product, related_name='in_baskets', blank=True, through='CustomerRelationToProduct')
    history = models.ManyToManyField(Product, related_name='customer', blank=True)
    email = models.EmailField(null=True,blank=True)
    charge = models.DecimalField(validators=[MinValueValidator(0)], default=0, decimal_places=2, max_digits=7, null=True)
    quantity_bought = models.IntegerField(default=0)
    how_much_bought = models.DecimalField(default=0, decimal_places=2, max_digits=7, null=True)


    def __str__(self):
             return self.user.username  # Access the `username` field of the related User object

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="employee_username", null=True, blank=True)
    joined_at = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(validators=[MinValueValidator(0), MaxValueValidator(10000)], default=0, decimal_places=2, max_digits=7)
    history = models.ManyToManyField(Product, related_name='employee_history', blank=True)
    email = models.EmailField(null=True,blank=True)
    def __str__(self):
        return self.user.username

class Manager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="manager_username", null=True, blank=True)
    joined_at = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(validators=[MinValueValidator(0), MaxValueValidator(10000)], default=0, decimal_places=2, max_digits=7)
    history = models.ManyToManyField(Product, related_name='manager_history', blank=True)
    email = models.EmailField(null=True,blank=True)
    def __str__(self):
        return self.user.username

class CustomerRelationToProduct(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)  # ✅ Lowercase
    product = models.ForeignKey(Product, on_delete=models.CASCADE)    # ✅ Lowercase
    quantity = models.PositiveIntegerField(default=1)  # To allow multiple instances
    is_bought = models.BooleanField(default=False)
    def __str__(self):
        return f"{self.customer.user.name} - {self.product.name} (x{self.quantity})"    

class ManagerRelationToProduct(models.Model):
    seller = models.ForeignKey(Manager, on_delete=models.CASCADE)  # ✅ Lowercase
    product = models.ForeignKey(Product, on_delete=models.CASCADE)    # ✅ Lowercase
    quantity = models.PositiveIntegerField(default=1)  # To allow multiple instances

    def __str__(self):
        return f"{self.seller.user.name} - {self.product.name} (x{self.quantity})"    

class EmployeeRelationToProduct(models.Model):
    seller = models.ForeignKey(Employee, on_delete=models.CASCADE)  # ✅ Lowercase
    product = models.ForeignKey(Product, on_delete=models.CASCADE)    # ✅ Lowercase
    quantity = models.PositiveIntegerField(default=1)  # To allow multiple instances

    def __str__(self):
        return f"{self.seller.user.name} - {self.product.name} (x{self.quantity})"    

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name="profile_user")
    choices = [
        ('Customer', 'Customer'),
        ('Employee', 'Employee'),
        ('Manager', 'Manager'),
    ]   
    user_type = models.CharField(choices=choices, max_length=20,)

class Comment(models.Model):
     content = models.CharField(max_length=150)
     created_at = models.DateTimeField(auto_now_add=True)
     written_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="comment_customer")
     the_product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="comment_product")
     
     def __str__(self):
             return self.content[:20]

