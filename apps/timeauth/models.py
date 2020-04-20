from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
from shortuuidfield import ShortUUIDField
from django.db import models

class UserManager(BaseUserManager):
    def _create_user(self,telephone,username,password,**kwargs):
        if not telephone:
            raise ValueError('请输入手机号码')
        if not username:
            raise ValueError('请输入用户名')
        if not password:
            raise ValueError('请输入密码')
        user = self.model(telephone=telephone,username=username,**kwargs)
        user.set_password(password)
        return user
    def create_user(self,telephone,username,password,**kwargs):
        kwargs['is_superuser'] = False
        return self._create_user(telephone,username,password,**kwargs)
    def create_superuser(self,telephone,username,password,**kwargs):
        kwargs['is_superuser'] = True
        return self._create_user(telephone,username,password,**kwargs)



class User(AbstractBaseUser,PermissionsMixin):
    uid = ShortUUIDField(primary_key=True)
    telephone = models.CharField(max_length=11,unique=True)
    #password =  models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100,unique=True)
    is_active =  models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'telephone'
    # USERNAME_FIELD
    REQUIRED_FIELDS = ['username']
    EMAIL_FIELD = 'email'

    objects = UserManager()

    def get_full_name(self):
        return self.username
    def get_short_name(self):
        return self.username