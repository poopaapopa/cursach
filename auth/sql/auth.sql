SELECT user_id, user_group
FROM trolleybuspark.users
WHERE 1=1
    AND login = '$login'
    AND password = '$password';