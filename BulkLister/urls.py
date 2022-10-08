from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("unique/<int:id>", views.unique, name="unique"),
    path("saved", views.saved, name="saved"),
    path("template/<int:id>", views.template, name="template"),
    path("test", views.test, name="test"),
    path("unique/download/<int:id>", views.download, name="download"),
    path("file/<int:id>", views.file, name="file"),

    # JSON paths
    path("unique/finish", views.finish, name="finish"),
    path("input", views.input, name="input"),
]