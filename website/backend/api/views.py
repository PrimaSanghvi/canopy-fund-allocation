from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Investor
from .serializers import InvestorSerializer

@api_view(["POST"])
def allocate_funds(request):
    data = request.data
    allocation_amount = data.get("allocation_amount", 0)
    investors_data = data.get("investor_amounts", [])

    investors = [Investor(**inv) for inv in investors_data]
    total_requested = sum(inv.requested_amount for inv in investors)

    if total_requested <= allocation_amount:
        return Response({inv.name: inv.requested_amount for inv in investors})

    total_average = sum(inv.average_amount for inv in investors)

    if total_average == 0:
        return Response({inv.name: 0 for inv in investors})

    allocations = {}
    for inv in investors:
        ratio = inv.average_amount / total_average
        initial_allocation = allocation_amount * ratio
        allocations[inv.name] = min(initial_allocation, inv.requested_amount)

    remaining_allocation = allocation_amount - sum(allocations.values())

    while remaining_allocation > 0.000001:
        eligible_investors = [
            inv for inv in investors if allocations[inv.name] < inv.requested_amount
        ]
        if not eligible_investors:
            break

        eligible_total_average = sum(inv.average_amount for inv in eligible_investors)

        distributed_this_round = 0
        for inv in eligible_investors:
            ratio = inv.average_amount / eligible_total_average
            additional_allocation = remaining_allocation * ratio
            space_left = inv.requested_amount - allocations[inv.name]
            actual_additional = min(additional_allocation, space_left)

            allocations[inv.name] += actual_additional
            distributed_this_round += actual_additional

        if distributed_this_round == 0:
            break

        remaining_allocation -= distributed_this_round

    return Response({name: round(amount, 5) for name, amount in allocations.items()})
