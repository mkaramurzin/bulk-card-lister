import os
from unicodedata import name
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
import csv
import json
from datetime import datetime
from django.core.paginator import Paginator

from . models import User, Field, ListingInfo, Session, SavedTemplate

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
    session = Session.objects.create()
    session.save()
    
    return render(request, "BulkLister/index.html", {
        "session": session.id
    })

@csrf_exempt
def input(request):
    data = json.loads(request.body)
    array = data.get("array", "")
    template = data.get("template", "")
    id = data.get("id", "")

    session = Session.objects.get(id=id)
    if(session.static.first):
        session.static.all().delete()

    for input in array:
        field = Field(index=input[0], value=input[1])
        field.save()
        session.static.add(field)
        session.save()

    if(template != ""):
        saved_template = SavedTemplate.objects.create(user=request.user, name=template, session=session)
        saved_template.save()
    

    return JsonResponse({"id": session.id})

@csrf_exempt
def unique(request, id):
    session = Session.objects.get(id=id)
    data = session.static.all()
    array = []
    for field in data:
        array.append(field.value)


    return render(request, "BulkLister/index.html", {
        "array": array,
        "session": session.id,
        "unique": True
    })

@csrf_exempt
def finish(request):
    data = json.loads(request.body)
    array = data.get("array")
    session_id = data.get("session_id", "")

    session = Session.objects.get(id=session_id)
    new_listing = ListingInfo()
    new_listing.save()

    for input in array:
        field = Field(index=input[0], value=input[1])
        field.save()
        new_listing.listing.add(field)
        new_listing.save()
    
    session.listings.add(new_listing)
    session.save()

    return JsonResponse({"message":"success"})

def download(request, id):
    session = Session.objects.get(id=id)

    if request.method == 'GET':
        now = datetime.now()
        dt_string = now.strftime("%d-%m-%Y-%H-%M-%S")

        # clean duplicates
        for listing in session.listings.all():
            for data in listing.listing.all():
                if data.value == "":
                    data.delete()

        session.csv_dir = "ebay-lisitng-"+str(dt_string)+".csv"
        session.save()
        template = "listing-template/CCG.csv"
        filename = session.csv_dir


        with open(template, 'rt', encoding="utf8", newline='') as temp, open(filename, "wt", encoding="utf8", newline='') as file:
            writer = csv.writer(file)
            reader = csv.reader(temp)
            writer.writerow(next(reader))

            for listing in session.listings.all():
                i = 0
                row = []
                while i < 80:
                    data = listing.listing.filter(index=i)
                    if data:
                            row.append(listing.listing.get(index=i).value)
                    else:
                        row.append("")
                    i += 1
                writer.writerow(row)

        return render(request, "BulkLister/download.html", {
            "id": session.id,
        })

def file(request, id):
    session = Session.objects.get(id=id)
    filename = session.csv_dir

    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    with open(os.path.join(base_dir, filename), 'rt', encoding='utf-8', newline='') as f:
        data = f.read()

    response = HttpResponse(data)
    response['Content-Disposition'] = 'attachment; filename="listings.csv"'
    return response
    
# list of saved templates
def saved(request):
    if request.user.id is None:
        return HttpResponseRedirect(reverse('login'))

    templates = SavedTemplate.objects.filter(user=request.user).order_by('-id')
    paginator = Paginator(templates, 5)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, "BulkLister/saved.html", {
        "templates": page_obj
    })

# individual template
def template(request, id):
    template = SavedTemplate.objects.get(id=id)
    now = datetime.now()
    dt_string = now.strftime("%d-%m-%Y-%H-%M-%S")
    filename = f'ebay-listing-{dt_string}.csv'
    template.session.csv_dir = filename
    template.session.save()
    data = template.session.static.all()
    array = []
    for field in data:
        array.append(field.value)
    # clear session's listings
    template.session.listings.all().delete()

    return render(request, "BulkLister/index.html", {
        "array": array,
        "session": template.session.id,
        "saved": True
    })

@csrf_exempt
def test(request):
    return render(request, "BulkLister/test.html")
