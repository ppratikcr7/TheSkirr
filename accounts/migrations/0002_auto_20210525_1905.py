# Generated by Django 2.2 on 2021-05-25 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserRegisterDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField()),
                ('user_FirstName', models.CharField(max_length=100)),
                ('user_LasttName', models.CharField(max_length=100)),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('D', 'Decline to answer')], max_length=1)),
                ('dob', models.DateField(max_length=8)),
                ('phone_number', models.IntegerField(max_length=12)),
                ('email_id', models.EmailField(max_length=100)),
                ('username', models.CharField(max_length=100)),
                ('password1', models.CharField(max_length=100)),
                ('password2', models.CharField(max_length=100)),
            ],
        ),
        migrations.DeleteModel(
            name='UserSignUpDetails',
        ),
    ]
