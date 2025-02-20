from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Product
from rest_framework_simplejwt.tokens import AccessToken  # For JWT authentication
from django.contrib.auth.models import User
from . models import Customer
from django.contrib.auth.models import User
from api.models import Profile  # Assuming Profile is your related model with user_type field
from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from .models import Customer
from .serializers import UpdateAmountSerializer
from django.contrib.auth.models import User
import factory
"""
Arrange, Act, Assert: Follow the "Arrange, Act, Assert" pattern in each test:
Arrange: Set up the necessary objects and data for the test (e.g., create instances of your models, set field values).
Act: Perform the action you want to test (e.g., call a model method, save a model instance).
Assert: Check that the outcome is what you expect (e.g., use assertEqual, assertTrue, assertRaises, etc. to verify the results)
"""
# python manage.py test your_app_name


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: f"testuser{n}")
    password = "testpassword"

class CustomerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Customer

    user = factory.SubFactory(UserFactory)  # Create a User instance when creating a Customer


class UpdateCustomerAmountViewTest(APITestCase):
    
    def test_update_customer_amount_success(self):
        # 1. Create a Customer (using factory is recommended, but you can also use Customer.objects.create)
        customer = CustomerFactory()
        pk = customer.pk

        # 2. Prepare the data for the update
        data = {'increament': 100}  # Amount to increment

        # 3. Make the POST request to the view
        url = reverse('charge', kwargs={'pk': pk})  # Replace 'update-customer-amount'
        response = self.client.post(url, data, format='json')

        # 4. Assertions
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Customer amount updated successfully.")

        # Refresh the customer object from the database to get the updated amount
        updated_customer = Customer.objects.get(pk=pk)  # Important!
        self.assertEqual(updated_customer.amount, 100)  # Check the updated amount
            
        

class UserTest(APITestCase): # 3 types, not type 2

    def test_create_customer_user(self):

        url = reverse('register')  # acts as a link between your test method and the view you want to test
        
        data = {
            'username': 'ls2y',
            'password': 'testpassword',
            'user_type': 'customer',
        } 

        data2 = {
            'username': 'aaa',
            'password': 'testpassword',
            'user_type': 'manager',
        }

        data3 = {
            'username': 'i',
            'password': 'testpassword',
            'user_type': 'manager',
        }

        response = self.client.post(url, data, format='json') # This line makes a POST request to the URL specified by the url variable, sending the data in data (which should be a dictionary) as JSON.  The response from the server is stored in the response variable.
        
        response2 = self.client.post(url, data2, format='json') # This line makes a POST request to the URL specified by the url variable, sending the data in data (which should be a dictionary) as JSON.  The response from the server is stored in the response variable.

        response3 = self.client.post(url, data3, format='json') # This line makes a POST request to the URL specified by the url variable, sending the data in data (which should be a dictionary) as JSON.  The response from the server is stored in the response variable.

       # self.assertEqual(response.status_code, status.HTTP_201_CREATED)
     #   self.assertEqual(response2.status_code, status.HTTP_201_CREATED)
      #  self.assertEqual(User.objects.count(), 3)  # Check that two users were created
      #  self.assertEqual(response3.status_code, status.HTTP_201_CREATED)

