from django.contrib.auth.models import User
from rest_framework import serializers
from .models import CustomerRelationToProduct, Product, Employee, Manager, Customer, Profile, Comment, ManagerRelationToProduct, EmployeeRelationToProduct

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['user_type']

class UserSerializer(serializers.ModelSerializer):
    user_type = serializers.CharField(write_only = True)  # Add this line

    class Meta:
        model = User
        fields = ["id", "username", "password", "user_type"]  # Include user_type
        extra_kwargs = {"password": {"write_only": True}}
   

    def create(self, validated_data):
        user_type = validated_data.pop('user_type', None)  # Extract user_type
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user, user_type=user_type)  # Create the Profile object
        return user

class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.CharField(source='seller.username', read_only=True,)  # Use the username instead of ID

    class Meta:
        model = Product
        fields = ["id", "name", "seller", "created_at", "price", "description", "picture","rating", "number_of_ratings", "new_rating" ]
        extra_kwargs = {"seller" : {"read_only" : True}, "number_of_ratings" : {"read_only" : True}} 

class CommentSerializer(serializers.ModelSerializer):
     written_by = serializers.CharField(source = "written_by.username", read_only = True)
     the_product = serializers.CharField(source = "the_product.name", read_only = True)

     class meta:
          model = Comment
          fields = ["content", "created_at", "written_by", "the_product"]

class Employeeserializers(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    class Meta:
        model = Employee
        fields = ["id", "user", "joined_at", "amount", "history", "username"]
        extra_kwargs = {"password" : {"write_only": True}}

class Managerserializers(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Manager
        fields = ["id", "user", "joined_at", "amount", "history", "username"]
        read_only_fields = ['user']

class Customerserializers(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)  # Get username from related User model
    email = serializers.EmailField(source="user.email")  # Get email from related User model

    class Meta:
        model = Customer
        fields = ["id", "user", "username", "email", "joined_at", "amount", "products_in_basket", "history", "charge"]
        read_only_fields = ['user']

class UpdateAmountSerializer(serializers.Serializer):
    increament = serializers.IntegerField()

    def validate_incraement(self, value):
        if value < 0:
                        raise serializers.ValidationError("Increment value must be positive.")
        return value

class CustomerRelationToProductSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name')
    quantity = serializers.IntegerField()    
    
    class Meta:
        model = CustomerRelationToProduct
        fields = ['product_name', 'quantity']

class ManagerRelationToProductSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name')
    quantity = serializers.IntegerField()    
    
    class Meta:
        model = ManagerRelationToProduct
        fields = ['product_name', 'quantity']

class EmployeeRelationToProductSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name')
    quantity = serializers.IntegerField()    
    
    class Meta:
        model = EmployeeRelationToProduct
        fields = ['product_name', 'quantity']

class RatingProductSerializer(serializers.Serializer):
     class Meta:
        model = Product
        fields = ["rating"]
     






























""" class RateProductSerializer(serializers.Serializer):
     stars = serializers.IntegerField()

     def validate_stars(self, value):
          if value > 5 or value < 0:
                raise serializers.ValidationError("rating value must be from 0 to 5.")
          return value

                """
















         







