from rest_framework import serializers
from .models import Investor

class InvestorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investor
        fields = ["name", "requested_amount", "average_amount"]
