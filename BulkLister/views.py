import os
from unicodedata import name
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
import csv
from tempfile import NamedTemporaryFile
import shutil
import json
from datetime import datetime

from . models import User, Field, ListingInfo, Session

# Create your views here.

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "BulkLister/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "BulkLister/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "BulkLister/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "BulkLister/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "BulkLister/register.html")

@csrf_exempt
def index(request):
    if request.method == 'POST':
        return render(request, "BulkLister/static.html")
    else:
        return render(request, "BulkLister/index.html")

@csrf_exempt
def input(request):
    data = json.loads(request.body)
    session_id = data.get("session_id", "")
    value = data.get("input", "")
    index = data.get("index", "")
    
    new_field = Field.objects.create(index=index, value=value)
    new_field.save()

    # print(session_id)
    # print(new_field.value)
    # print(new_field.index)

    if session_id is "":
        session = Session.objects.create()
        session.save()
    else:
        session = Session.objects.get(id=session_id)
        session.save()

    session.static.add(new_field)
    session.save()

    return JsonResponse({"id": session.id})

@csrf_exempt
def unique(request, id):
    session = Session.objects.get(id=id)
    data = session.static.all()
    # data.filter(index=12, value="").delete() WORKS
    for item in data:
        # data.delete(item)
        print("TEST")
        print(str(item.index) + ":" + str(item.value))


    return render(request, "BulkLister/unique.html", {
        "fields": session.static.all()
    })